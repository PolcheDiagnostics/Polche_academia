-- =============================================================================
-- Polche Academia Learning Hub — PostgreSQL Schema
-- Migration 001: Initial schema
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";   -- pgvector for RAG embeddings

-- =============================================================================
-- SECTION 1: USERS AND AUTHENTICATION
-- =============================================================================

CREATE TYPE user_role AS ENUM ('student', 'faculty', 'director', 'organiser');
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_verification');

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           TEXT UNIQUE NOT NULL,
    name            TEXT NOT NULL,
    role            user_role NOT NULL,
    status          account_status NOT NULL DEFAULT 'active',
    avatar_url      TEXT,
    -- Credentials (bcrypt hash — never plaintext)
    password_hash   TEXT NOT NULL,
    mfa_enabled     BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_secret      TEXT,          -- encrypted TOTP seed
    -- Metadata
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_login_at   TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role  ON users(role);

-- Auth tokens (short-lived JWT replacement for demo; production uses JWT)
CREATE TABLE auth_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash      TEXT NOT NULL,       -- sha256 of bearer token
    expires_at      TIMESTAMPTZ NOT NULL,
    ip_address      INET,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_auth_sessions_token   ON auth_sessions(token_hash);
CREATE INDEX idx_auth_sessions_user    ON auth_sessions(user_id);
CREATE INDEX idx_auth_sessions_expires ON auth_sessions(expires_at);

-- =============================================================================
-- SECTION 2: CURRICULUM
-- =============================================================================

CREATE TYPE content_status AS ENUM ('draft', 'faculty_review', 'approved', 'published', 'archived');

CREATE TABLE modules (
    id              SERIAL PRIMARY KEY,
    code            TEXT UNIQUE NOT NULL,   -- e.g. 'MOD-01'
    title           TEXT NOT NULL,
    week_start      SMALLINT NOT NULL,
    week_end        SMALLINT NOT NULL,
    lead_faculty_id UUID REFERENCES users(id),
    description     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE weeks (
    id              SERIAL PRIMARY KEY,
    week_number     SMALLINT NOT NULL UNIQUE,   -- 1–24
    module_id       INTEGER NOT NULL REFERENCES modules(id),
    title           TEXT NOT NULL,
    -- Workflow status (separate from content approval)
    draft_status    content_status NOT NULL DEFAULT 'draft',
    -- Assigned faculty
    faculty_id      UUID REFERENCES users(id),
    -- Teaching content (JSONB for flexibility; validated at app layer)
    lecture_objectives  JSONB,       -- array of strings
    lecture_outline     JSONB,       -- [{time, topic}]
    workshop_outline    JSONB,       -- [{time, activity}]
    recommended_reading JSONB,       -- [{title, source, year, pmid?, doi?}]
    student_summary     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_weeks_module    ON weeks(module_id);
CREATE INDEX idx_weeks_faculty   ON weeks(faculty_id);
CREATE INDEX idx_weeks_status    ON weeks(draft_status);

-- =============================================================================
-- SECTION 3: TEACHING MATERIALS (SLIDES, WORKSHOPS, NOTES)
-- =============================================================================

CREATE TYPE material_type AS ENUM (
    'lecture_slides', 'workshop_slides', 'speaker_notes',
    'facilitator_guide', 'student_summary', 'assessment_key'
);

CREATE TABLE teaching_materials (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    week_id         INTEGER NOT NULL REFERENCES weeks(id),
    material_type   material_type NOT NULL,
    title           TEXT NOT NULL,
    -- Content versioning
    version         INTEGER NOT NULL DEFAULT 1,
    status          content_status NOT NULL DEFAULT 'draft',
    -- AI generation metadata
    ai_generated    BOOLEAN NOT NULL DEFAULT FALSE,
    ai_model        TEXT,            -- model identifier used for generation
    ai_draft_at     TIMESTAMPTZ,
    -- File storage reference
    storage_path    TEXT,            -- relative path in protected object storage
    file_size_bytes BIGINT,
    mime_type       TEXT,
    -- Workflow
    reviewed_by     UUID REFERENCES users(id),
    reviewed_at     TIMESTAMPTZ,
    approved_by     UUID REFERENCES users(id),
    approved_at     TIMESTAMPTZ,
    published_at    TIMESTAMPTZ,
    -- Authorship
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_materials_week   ON teaching_materials(week_id);
CREATE INDEX idx_materials_type   ON teaching_materials(material_type);
CREATE INDEX idx_materials_status ON teaching_materials(status);

-- =============================================================================
-- SECTION 4: SCIENTIFIC RAG CORPUS
-- =============================================================================

CREATE TYPE licence_category AS ENUM (
    'cc0',              -- public domain / CC0
    'cc_by',            -- CC BY (attribution required)
    'cc_by_sa',         -- CC BY-SA
    'cc_by_nc',         -- CC BY-NC (non-commercial only — restricted use)
    'cc_by_nd',         -- CC BY-ND (no derivatives — restricted use)
    'cc_by_nc_nd',      -- most restrictive CC
    'metadata_only',    -- publicly accessible metadata; full text NOT ingested
    'controlled_access',-- requires application / DUA
    'unknown'           -- licence not determined — do not reproduce
);

CREATE TYPE evidence_level AS ENUM (
    'established_clinical_practice',
    'guideline_supported',
    'clinical_research',
    'translational_preclinical',
    'exploratory_hypothesis'
);

CREATE TABLE rag_sources (
    id              SERIAL PRIMARY KEY,
    source_name     TEXT NOT NULL,          -- 'CIViC', 'PubMed', 'Reactome', etc.
    base_url        TEXT NOT NULL,
    licence         licence_category NOT NULL,
    licence_url     TEXT,
    attribution     TEXT NOT NULL,
    -- Governance
    commercial_reuse    BOOLEAN,            -- NULL = unknown
    redistribution_ok   BOOLEAN,
    full_text_ok        BOOLEAN,
    -- Operational
    api_endpoint    TEXT,
    last_checked_at TIMESTAMPTZ,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE rag_documents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id       INTEGER NOT NULL REFERENCES rag_sources(id),
    -- Bibliographic metadata
    title           TEXT NOT NULL,
    authors         TEXT[],
    journal         TEXT,
    year            SMALLINT,
    publication_type TEXT,
    doi             TEXT,
    pmid            TEXT,
    source_url      TEXT NOT NULL,
    -- Governance
    licence         licence_category NOT NULL,
    retrieval_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    is_retracted    BOOLEAN NOT NULL DEFAULT FALSE,
    retraction_note TEXT,
    -- Content (only stored when licence permits full-text ingestion)
    abstract_text   TEXT,
    full_text       TEXT,           -- NULL if licence is metadata_only or restricted
    -- Classification
    evidence_level  evidence_level,
    relevant_modules TEXT[],        -- module codes this document supports
    -- Quality
    citation_count  INTEGER,
    quality_score   NUMERIC(3,2),   -- 0.00–1.00
    -- Indexing status
    is_indexed      BOOLEAN NOT NULL DEFAULT FALSE,
    indexed_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rag_docs_source  ON rag_documents(source_id);
CREATE INDEX idx_rag_docs_doi     ON rag_documents(doi);
CREATE INDEX idx_rag_docs_pmid    ON rag_documents(pmid);
CREATE INDEX idx_rag_docs_indexed ON rag_documents(is_indexed);
CREATE INDEX idx_rag_docs_modules ON rag_documents USING gin(relevant_modules);

-- Document chunks with vector embeddings (pgvector)
CREATE TABLE rag_chunks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id     UUID NOT NULL REFERENCES rag_documents(id) ON DELETE CASCADE,
    chunk_index     INTEGER NOT NULL,
    chunk_text      TEXT NOT NULL,
    -- Embedding (1536 dimensions for text-embedding-3-small; adjust as needed)
    embedding       vector(1536),
    -- Metadata
    section_title   TEXT,
    page_number     INTEGER,
    token_count     INTEGER,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_rag_chunks_document ON rag_chunks(document_id);
-- IVFFlat index for approximate nearest-neighbour search
-- (run ANALYZE on the table first; rebuild with more lists as corpus grows)
CREATE INDEX idx_rag_chunks_embedding ON rag_chunks
    USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Full-text search index on chunk text (for BM25-style hybrid retrieval)
CREATE INDEX idx_rag_chunks_fts ON rag_chunks
    USING gin(to_tsvector('english', chunk_text));

-- =============================================================================
-- SECTION 5: ASSESSMENTS
-- =============================================================================

CREATE TYPE question_type AS ENUM ('mcq', 'clinical_vignette', 'short_answer', 'ngs_interpretation');
CREATE TYPE difficulty AS ENUM ('foundation', 'intermediate', 'advanced');

CREATE TABLE assessment_questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    week_id         INTEGER REFERENCES weeks(id),
    module_id       INTEGER REFERENCES modules(id),
    question_type   question_type NOT NULL DEFAULT 'mcq',
    difficulty      difficulty NOT NULL DEFAULT 'intermediate',
    question_text   TEXT NOT NULL,
    -- MCQ options (JSONB array: [{id, text}])
    options         JSONB,
    correct_option_id TEXT,         -- references option id
    explanation     TEXT NOT NULL,
    -- Vignette / clinical context
    clinical_context TEXT,
    -- Competency tagging
    tags            TEXT[],
    learning_objective TEXT,
    -- Governance
    status          content_status NOT NULL DEFAULT 'draft',
    created_by      UUID REFERENCES users(id),
    reviewed_by     UUID REFERENCES users(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_questions_week       ON assessment_questions(week_id);
CREATE INDEX idx_questions_module     ON assessment_questions(module_id);
CREATE INDEX idx_questions_type       ON assessment_questions(question_type);
CREATE INDEX idx_questions_difficulty ON assessment_questions(difficulty);
CREATE INDEX idx_questions_tags       ON assessment_questions USING gin(tags);

-- Student quiz attempts
CREATE TABLE quiz_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES users(id),
    week_id         INTEGER REFERENCES weeks(id),
    -- Answers: [{questionId, selectedOptionId, isCorrect, timeTakenSecs}]
    answers         JSONB NOT NULL,
    score           NUMERIC(5,2),    -- percentage
    max_score       NUMERIC(5,2),
    started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_attempts_student ON quiz_attempts(student_id);
CREATE INDEX idx_attempts_week    ON quiz_attempts(week_id);

-- =============================================================================
-- SECTION 6: STUDENT PROGRESS AND ENROLMENT
-- =============================================================================

CREATE TYPE enrolment_status AS ENUM ('enrolled', 'deferred', 'completed', 'withdrawn');

CREATE TABLE enrolments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES users(id),
    -- For now there is one programme; expand to programmes table later
    programme_code  TEXT NOT NULL DEFAULT 'CERT-MDX-2025',
    status          enrolment_status NOT NULL DEFAULT 'enrolled',
    enrolled_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    completed_at    TIMESTAMPTZ,
    certificate_issued BOOLEAN NOT NULL DEFAULT FALSE,
    certificate_issued_at TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_enrolments_unique ON enrolments(student_id, programme_code);

-- Per-week completion tracking
CREATE TABLE week_progress (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES users(id),
    week_id         INTEGER NOT NULL REFERENCES weeks(id),
    -- Lecture and workshop attendance
    lecture_attended    BOOLEAN NOT NULL DEFAULT FALSE,
    workshop_attended   BOOLEAN NOT NULL DEFAULT FALSE,
    -- Learning activities
    lesson_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    lesson_completed_at TIMESTAMPTZ,
    -- Assessment
    best_quiz_score NUMERIC(5,2),
    quiz_attempts_count INTEGER NOT NULL DEFAULT 0,
    -- AI Tutor interactions
    ai_tutor_sessions INTEGER NOT NULL DEFAULT 0,
    -- Updated
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (student_id, week_id)
);

CREATE INDEX idx_progress_student ON week_progress(student_id);
CREATE INDEX idx_progress_week    ON week_progress(week_id);

-- =============================================================================
-- SECTION 7: FACULTY WORKFLOW AND APPROVALS
-- =============================================================================

CREATE TYPE workflow_action AS ENUM (
    'ai_draft_generated', 'submitted_for_review',
    'review_comment_added', 'approved', 'rejected',
    'published', 'archived', 'revision_requested'
);

CREATE TABLE workflow_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    material_id     UUID NOT NULL REFERENCES teaching_materials(id),
    actor_id        UUID NOT NULL REFERENCES users(id),
    action          workflow_action NOT NULL,
    comment         TEXT,
    metadata        JSONB,          -- any extra data (e.g., diff reference)
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_workflow_material ON workflow_events(material_id);
CREATE INDEX idx_workflow_actor    ON workflow_events(actor_id);
CREATE INDEX idx_workflow_action   ON workflow_events(action);

-- =============================================================================
-- SECTION 8: AI TUTOR INTERACTIONS
-- =============================================================================

CREATE TABLE ai_tutor_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES users(id),
    week_id         INTEGER REFERENCES weeks(id),
    -- Conversation stored as JSONB array of {role, content, citations, timestamp}
    messages        JSONB NOT NULL DEFAULT '[]',
    mode            TEXT,           -- 'explain_simple', 'quiz', 'socratic', etc.
    -- RAG citations used in this session
    citation_ids    UUID[],
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tutor_student ON ai_tutor_sessions(student_id);
CREATE INDEX idx_tutor_week    ON ai_tutor_sessions(week_id);

-- =============================================================================
-- SECTION 9: AUDIT LOG (SECURITY / GDPR)
-- =============================================================================

CREATE TABLE audit_log (
    id              BIGSERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id),   -- NULL for unauthenticated events
    action          TEXT NOT NULL,               -- e.g. 'LOGIN', 'DOWNLOAD_PPTX'
    resource_type   TEXT,
    resource_id     TEXT,
    ip_address      INET,
    user_agent      TEXT,
    success         BOOLEAN NOT NULL,
    detail          JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_user   ON audit_log(user_id);
CREATE INDEX idx_audit_action ON audit_log(action);
CREATE INDEX idx_audit_time   ON audit_log(created_at);

-- Partition audit_log by month in production for performance
-- (omitted here for simplicity; add with pg_partman)

-- =============================================================================
-- SECTION 10: SEED DATA — APPROVED RAG SOURCES
-- =============================================================================

INSERT INTO rag_sources (source_name, base_url, licence, licence_url, attribution,
    commercial_reuse, redistribution_ok, full_text_ok, api_endpoint, notes)
VALUES
(
    'CIViC',
    'https://civicdb.org',
    'cc0',
    'https://creativecommons.org/publicdomain/zero/1.0/',
    'Griffith et al., Nature Genetics 2017. CIViC is released under CC0 1.0 Universal.',
    TRUE, TRUE, TRUE,
    'https://civicdb.org/api',
    'Clinical interpretations of variants in cancer. Full text indexing permitted.'
),
(
    'Reactome',
    'https://reactome.org',
    'cc_by',
    'https://creativecommons.org/licenses/by/4.0/',
    'Reactome: a database of reactions, pathways and biological processes (CC BY 4.0).',
    TRUE, TRUE, TRUE,
    'https://reactome.org/ContentService',
    'Pathway database. Attribution required. Full text and diagrams may be used with attribution.'
),
(
    'PubMed',
    'https://pubmed.ncbi.nlm.nih.gov',
    'metadata_only',
    'https://www.ncbi.nlm.nih.gov/home/about/policies/',
    'PubMed is a free resource supporting the search and retrieval of biomedical literature.',
    NULL, FALSE, FALSE,
    'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/',
    'Metadata (title/authors/abstract) only. Full text requires per-article licence check via PMC.'
),
(
    'Europe PMC Open Access',
    'https://europepmc.org',
    'cc_by',
    'https://creativecommons.org/licenses/by/4.0/',
    'Europe PMC Open Access subset. Per-article licence must be verified before full-text use.',
    NULL, NULL, NULL,
    'https://www.ebi.ac.uk/europepmc/webservices/rest',
    'Per-article licence check REQUIRED. Only articles explicitly licensed CC BY or CC0 may be fully indexed.'
),
(
    'ClinVar',
    'https://www.ncbi.nlm.nih.gov/clinvar/',
    'cc0',
    'https://www.ncbi.nlm.nih.gov/clinvar/docs/faq/',
    'ClinVar: public archive of interpretations of clinically relevant variants (NCBI).',
    TRUE, TRUE, TRUE,
    'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/',
    'CC0 — no restrictions on reuse. Contains variant-disease associations from submitters.'
),
(
    'OpenAlex',
    'https://openalex.org',
    'cc0',
    'https://creativecommons.org/publicdomain/zero/1.0/',
    'OpenAlex: an open catalog of the global research system (CC0).',
    TRUE, TRUE, FALSE,
    'https://api.openalex.org',
    'Metadata CC0. Full text availability varies; link out rather than reproduce unless confirmed CC BY.'
);

-- =============================================================================
-- SECTION 11: HELPER FUNCTIONS
-- =============================================================================

-- Automatically update updated_at on row modification
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_weeks_updated_at
    BEFORE UPDATE ON weeks
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_materials_updated_at
    BEFORE UPDATE ON teaching_materials
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_rag_docs_updated_at
    BEFORE UPDATE ON rag_documents
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_questions_updated_at
    BEFORE UPDATE ON assessment_questions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_tutor_updated_at
    BEFORE UPDATE ON ai_tutor_sessions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- =============================================================================
-- END OF MIGRATION 001
-- =============================================================================
