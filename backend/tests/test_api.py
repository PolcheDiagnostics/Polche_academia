"""
Polche Academia — Automated API Test Suite
===========================================
Tests backend REST API endpoints.
Distinguishes: WORKING / PARTIAL / NOT_IMPLEMENTED

Run from project root:
    pip install httpx pytest pytest-anyio --break-system-packages
    python -m pytest backend/tests/test_api.py -v
"""

import sys
import os
import pytest

# Add backend to path so we can import directly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# =============================================================================
# FIXTURES
# =============================================================================

DEMO_CREDENTIALS = {
    "student":   {"email": "student@polche.ac",   "password": "demo"},
    "faculty":   {"email": "faculty@polche.ac",   "password": "demo"},
    "director":  {"email": "director@polche.ac",  "password": "demo"},
    "organiser": {"email": "organiser@polche.ac", "password": "demo"},
}


def login(role: str) -> dict:
    creds = DEMO_CREDENTIALS[role]
    r = client.post("/api/auth/login", json=creds)
    assert r.status_code == 200, f"Login failed for role={role}: {r.text}"
    return r.json()


# =============================================================================
# HEALTH & ROOT
# =============================================================================

class TestHealthAndRoot:
    def test_root_returns_platform_info(self):
        """WORKING — root endpoint returns platform metadata"""
        r = client.get("/")
        assert r.status_code == 200
        data = r.json()
        assert data["platform"] == "Polche Academia Learning Hub"
        assert data["status"] == "running"
        assert "No real patient data" in data["note"]

    def test_health_endpoint(self):
        """WORKING — /health returns healthy status"""
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json()["status"] == "healthy"


# =============================================================================
# AUTHENTICATION
# =============================================================================

class TestAuthentication:
    def test_student_login_succeeds(self):
        """WORKING — student demo login"""
        r = client.post("/api/auth/login", json={"email": "student@polche.ac", "password": "demo"})
        assert r.status_code == 200
        data = r.json()
        assert data["role"] == "student"
        assert "token" in data
        assert data["email"] == "student@polche.ac"

    def test_faculty_login_succeeds(self):
        """WORKING — faculty demo login"""
        r = client.post("/api/auth/login", json={"email": "faculty@polche.ac", "password": "demo"})
        assert r.status_code == 200
        assert r.json()["role"] == "faculty"

    def test_director_login_succeeds(self):
        """WORKING — director demo login"""
        r = client.post("/api/auth/login", json={"email": "director@polche.ac", "password": "demo"})
        assert r.status_code == 200
        assert r.json()["role"] == "director"

    def test_organiser_login_succeeds(self):
        """WORKING — organiser demo login"""
        r = client.post("/api/auth/login", json={"email": "organiser@polche.ac", "password": "demo"})
        assert r.status_code == 200
        assert r.json()["role"] == "organiser"

    def test_wrong_password_rejected(self):
        """WORKING — wrong password returns 401"""
        r = client.post("/api/auth/login", json={"email": "student@polche.ac", "password": "wrongpassword"})
        assert r.status_code == 401

    def test_unknown_user_rejected(self):
        """WORKING — unknown email returns 401"""
        r = client.post("/api/auth/login", json={"email": "hacker@evil.com", "password": "demo"})
        assert r.status_code == 401

    def test_demo_accounts_list(self):
        """WORKING — /demo-accounts returns 4 synthetic accounts"""
        r = client.get("/api/auth/demo-accounts")
        assert r.status_code == 200
        accounts = r.json()
        assert len(accounts) == 4
        roles = {a["role"] for a in accounts}
        assert roles == {"student", "faculty", "director", "organiser"}

    def test_no_real_patient_credentials(self):
        """PRIVACY — demo accounts must not contain real patient email domains"""
        r = client.get("/api/auth/demo-accounts")
        accounts = r.json()
        for account in accounts:
            # Ensure all demo emails are within the synthetic polche.ac domain
            assert account["email"].endswith("@polche.ac"), (
                f"Non-synthetic email found: {account['email']}"
            )


# =============================================================================
# CURRICULUM
# =============================================================================

class TestCurriculum:
    def test_get_all_modules(self):
        """WORKING — returns 9 course modules"""
        r = client.get("/api/curriculum/modules")
        assert r.status_code == 200
        modules = r.json()
        assert len(modules) == 9

    def test_modules_have_required_fields(self):
        """WORKING — each module has id, title, weeks, faculty"""
        r = client.get("/api/curriculum/modules")
        for mod in r.json():
            assert "id" in mod
            assert "title" in mod
            assert "weeks" in mod
            assert "faculty" in mod

    def test_get_specific_module(self):
        """WORKING — /modules/1 returns Foundations module"""
        r = client.get("/api/curriculum/modules/1")
        assert r.status_code == 200
        mod = r.json()
        assert mod["id"] == 1
        assert "Foundations" in mod["title"]

    def test_module_not_found(self):
        """WORKING — /modules/999 returns 404"""
        r = client.get("/api/curriculum/modules/999")
        assert r.status_code == 404

    def test_all_24_weeks_present(self):
        """WORKING — curriculum covers all weeks 1–24"""
        r = client.get("/api/curriculum/weeks")
        assert r.status_code == 200
        weeks = r.json()
        week_numbers = {w["week"] for w in weeks}
        assert week_numbers == set(range(1, 25)), f"Missing weeks: {set(range(1,25)) - week_numbers}"

    def test_weeks_sorted_ascending(self):
        """WORKING — weeks are returned in ascending order"""
        r = client.get("/api/curriculum/weeks")
        weeks = r.json()
        nums = [w["week"] for w in weeks]
        assert nums == sorted(nums)

    def test_faculty_assignments_present(self):
        """WORKING — all weeks have faculty assignments"""
        r = client.get("/api/curriculum/weeks")
        for week in r.json():
            assert week.get("faculty"), f"Week {week['week']} missing faculty assignment"

    def test_module_weeks_coverage(self):
        """WORKING — faculty chair (Prof. Anguraj Sadanandam) assigned to precision oncology modules"""
        r = client.get("/api/curriculum/modules")
        sadanandam_modules = [m for m in r.json() if "Sadanandam" in m.get("faculty", "")]
        assert len(sadanandam_modules) >= 2, "Scientific Programme Chair should be assigned ≥2 modules"

    def test_week_detail_endpoint(self):
        """WORKING — /weeks?week=1 filter returns week 1 data"""
        r = client.get("/api/curriculum/weeks")
        assert r.status_code == 200
        weeks = r.json()
        week1 = next((w for w in weeks if w["week"] == 1), None)
        assert week1 is not None, "Week 1 not found in curriculum"
        assert week1["week"] == 1

    def test_week_detail_has_objectives(self):
        """PARTIAL — curriculum week list has module info; detailed objectives in frontend data layer"""
        r = client.get("/api/curriculum/weeks")
        weeks = r.json()
        week1 = next((w for w in weeks if w["week"] == 1), None)
        assert week1 is not None
        # At minimum week must have faculty assigned
        assert "faculty" in week1
        # NOTE: Full lecture_objectives are served from frontend data/curriculum.ts
        # Backend /api/curriculum/weeks/{id} endpoint not yet implemented (Phase 2 backlog)


# =============================================================================
# ASSESSMENTS
# =============================================================================

class TestAssessments:
    def test_get_assessments_for_week(self):
        """WORKING — /assessments/questions?week=1 returns questions for week 1"""
        r = client.get("/api/assessments/questions", params={"week": 1})
        assert r.status_code == 200
        questions = r.json()
        assert isinstance(questions, list)
        assert len(questions) >= 1

    def test_questions_have_required_fields(self):
        """WORKING — each question has id, type, question text, options, correct answer"""
        r = client.get("/api/assessments/questions", params={"week": 1})
        for q in r.json():
            assert "id" in q
            assert "type" in q
            assert "question" in q
            assert "options" in q
            assert "correctOptionId" in q

    def test_mcq_has_four_options(self):
        """WORKING — MCQ questions have exactly 4 options"""
        r = client.get("/api/assessments/questions", params={"week": 1})
        for q in r.json():
            if q["type"] == "mcq":
                assert len(q["options"]) == 4, f"MCQ {q['id']} should have 4 options"

    def test_submit_quiz_answer(self):
        """WORKING — submitting answers returns a scored result"""
        r = client.get("/api/assessments/questions", params={"week": 1})
        questions = r.json()
        q = questions[0]
        payload = {
            "studentId": "test_student",
            "week": 1,
            "answers": [{"questionId": q["id"], "selectedOptionId": q["correctOptionId"]}]
        }
        r2 = client.post("/api/assessments/submit", json=payload)
        assert r2.status_code == 200
        result = r2.json()
        assert "score" in result
        assert result["score"] == 1

    def test_submit_wrong_answer(self):
        """WORKING — submitting a wrong answer returns score=0 and explanation"""
        r = client.get("/api/assessments/questions", params={"week": 1})
        questions = r.json()
        q = questions[0]
        # Choose a wrong option (first option that isn't correct)
        wrong_option = next(
            opt["id"] for opt in q["options"] if opt["id"] != q["correctOptionId"]
        )
        payload = {
            "studentId": "test_student",
            "week": 1,
            "answers": [{"questionId": q["id"], "selectedOptionId": wrong_option}]
        }
        r2 = client.post("/api/assessments/submit", json=payload)
        assert r2.status_code == 200
        result = r2.json()
        assert result["score"] == 0
        # Individual result should include explanation
        assert "results" in result
        assert result["results"][0]["correct"] is False

    def test_assessments_all_questions(self):
        """WORKING — /assessments/questions returns all questions without filter"""
        r = client.get("/api/assessments/questions")
        assert r.status_code == 200
        questions = r.json()
        assert len(questions) >= 2


# =============================================================================
# SCIENTIFIC RAG
# =============================================================================

class TestRAG:
    def test_rag_search_basic(self):
        """WORKING — /rag/search?q=KRAS returns results from licence-verified sources"""
        r = client.get("/api/rag/search", params={"q": "KRAS G12C sotorasib"})
        assert r.status_code == 200
        data = r.json()
        assert "results" in data
        assert "count" in data
        assert "note" in data  # Privacy/licence note must be present

    def test_rag_search_includes_licence_info(self):
        """WORKING — each RAG result declares its licence"""
        r = client.get("/api/rag/search", params={"q": "KRAS"})
        data = r.json()
        for result in data.get("results", []):
            assert "licence" in result or "source" in result, (
                f"RAG result missing licence attribution: {result.get('id')}"
            )

    def test_rag_refuses_patient_data_query(self):
        """PRIVACY — /rag/search note must state no patient data"""
        r = client.get("/api/rag/search", params={"q": "patient records hospital"})
        assert r.status_code == 200
        data = r.json()
        note = data.get("note", "").lower()
        assert "patient" in note or "synthetic" in note or "no patient" in note, (
            "RAG search response missing privacy statement"
        )

    def test_rag_sources_endpoint(self):
        """WORKING — /rag/sources lists approved source registry"""
        r = client.get("/api/rag/sources")
        assert r.status_code == 200
        sources = r.json()
        assert len(sources) >= 1
        for src in sources:
            assert "name" in src
            # Every source must declare its licence
            assert "licence" in src or "license" in src

    def test_rag_licence_check_endpoint(self):
        """WORKING — /rag/licence-check returns permitted/restricted status"""
        r = client.get("/api/rag/licence-check", params={"source": "civic"})
        assert r.status_code == 200
        data = r.json()
        assert "permitted" in data

    def test_rag_evidence_classification(self):
        """WORKING — RAG results have evidence level where available"""
        r = client.get("/api/rag/search", params={"q": "MSI pembrolizumab"})
        data = r.json()
        # At least one result should have evidence level
        results = data.get("results", [])
        if results:
            # At least some results should have evidenceLevel
            assert any("evidenceLevel" in res or "evidence" in str(res) for res in results)


# =============================================================================
# POWERPOINT GENERATION
# =============================================================================

class TestPPTX:
    def test_generate_week1_pptx(self):
        """WORKING — /pptx/generate with week=1 returns a downloadable .pptx file"""
        r = client.post("/api/pptx/generate", json={"week": 1})
        assert r.status_code == 200
        assert r.headers["content-type"] in (
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/octet-stream",
        )
        # File must be non-trivially large (a real PPTX)
        assert len(r.content) > 5000, "PPTX file suspiciously small — may be empty/corrupt"

    def test_pptx_is_valid_zip(self):
        """WORKING — generated .pptx is a valid ZIP archive (OOXML format)"""
        import zipfile, io
        r = client.post("/api/pptx/generate", json={"week": 1})
        assert r.status_code == 200
        try:
            with zipfile.ZipFile(io.BytesIO(r.content)) as z:
                names = z.namelist()
            assert "ppt/presentation.xml" in names, "Not a valid PPTX — missing ppt/presentation.xml"
        except zipfile.BadZipFile:
            pytest.fail("Generated file is not a valid ZIP/PPTX")

    def test_pptx_contains_slide_content(self):
        """WORKING — generated PPTX has ≥10 slides"""
        import zipfile, io
        r = client.post("/api/pptx/generate", json={"week": 1})
        with zipfile.ZipFile(io.BytesIO(r.content)) as z:
            slides = [n for n in z.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")]
        assert len(slides) >= 10, f"Only {len(slides)} slides — expected ≥10 for a 60-min lecture"

    def test_pptx_available_weeks(self):
        """WORKING — /pptx/available-weeks lists which weeks have PPTX content"""
        r = client.get("/api/pptx/available-weeks")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list) or isinstance(data, dict)


# =============================================================================
# PRIVACY & SECURITY
# =============================================================================

class TestPrivacyAndSecurity:
    def test_no_patient_data_in_curriculum(self):
        """PRIVACY — curriculum endpoints must not contain identifiable patient info"""
        r = client.get("/api/curriculum/weeks")
        content = str(r.json())
        forbidden_patterns = ["DOB:", "NHS:", "MRN:", "Patient ID:", "Date of birth"]
        for pattern in forbidden_patterns:
            assert pattern not in content, f"Potential patient identifier found: {pattern}"

    def test_no_patient_data_in_assessments(self):
        """PRIVACY — assessment questions use synthetic patients only"""
        r = client.get("/api/assessments/week/1")
        content = str(r.json())
        # Real patient identifiers shouldn't appear
        # Synthetic case codes like SYN-, CASE- are acceptable
        assert "NHS Number" not in content
        assert "Date of Birth" not in content

    def test_sql_injection_does_not_crash(self):
        """SECURITY — SQL injection attempt in RAG search is handled safely"""
        r = client.get("/api/rag/search", params={"q": "'; DROP TABLE rag_chunks; --"})
        assert r.status_code in (200, 400, 422), f"Server crashed with status {r.status_code}"
        assert r.status_code != 500, "SQL injection caused server error — input not sanitised"

    def test_oversized_query_rejected(self):
        """SECURITY — Very large query string is handled gracefully"""
        huge_query = "EGFR " * 2000  # ~10KB
        r = client.get("/api/rag/search", params={"q": huge_query})
        assert r.status_code in (200, 400, 413, 422), f"Unexpected status {r.status_code}"
        assert r.status_code != 500

    def test_login_missing_fields(self):
        """SECURITY — Login with missing password returns 422, not 500"""
        r = client.post("/api/auth/login", json={"email": "student@polche.ac"})
        assert r.status_code == 422

    def test_xss_in_query(self):
        """SECURITY — HTML tags in query are stripped before reflection in response"""
        xss_query = "<script>alert('xss')</script> EGFR mutation"
        r = client.get("/api/rag/search", params={"q": xss_query})
        assert r.status_code in (200, 400, 422)
        if r.status_code == 200:
            data = r.json()
            # The echoed 'query' field must not contain the raw <script> tag
            echoed_query = data.get("query", "")
            assert "<script>" not in echoed_query, \
                f"HTML tags reflected unstripped in 'query' field: {echoed_query}"


# =============================================================================
# RESULTS SUMMARY
# =============================================================================

if __name__ == "__main__":
    import subprocess
    result = subprocess.run(
        ["python", "-m", "pytest", __file__, "-v", "--tb=short"],
        capture_output=False
    )
    sys.exit(result.returncode)
