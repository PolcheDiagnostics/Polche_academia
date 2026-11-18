-- =============================================================================
-- Polche Academia — Migration 002: Seed 24-week curriculum
-- =============================================================================
-- NOTE: Faculty UUIDs are placeholders; replace with real user IDs after
--       provisioning faculty accounts in the users table.
-- =============================================================================

-- Placeholder faculty IDs (will be replaced when real accounts exist)
DO $$
DECLARE
    -- Insert placeholder faculty so foreign keys resolve during seed
    suresh_id       UUID := 'aaaaaaaa-0001-0000-0000-000000000000';
    kannan_id       UUID := 'aaaaaaaa-0002-0000-0000-000000000000';
    beer_id         UUID := 'aaaaaaaa-0003-0000-0000-000000000000';
    sabar_id        UUID := 'aaaaaaaa-0004-0000-0000-000000000000';
    anguraj_id      UUID := 'aaaaaaaa-0005-0000-0000-000000000000';
    homicsko_id     UUID := 'aaaaaaaa-0006-0000-0000-000000000000';
    sirohi_id       UUID := 'aaaaaaaa-0007-0000-0000-000000000000';
BEGIN
    -- Insert placeholder faculty users (demo only — real accounts will override)
    INSERT INTO users (id, email, name, role, password_hash) VALUES
      (suresh_id,  'suresh@polche.ac',    'Dr. Suresh',                    'faculty', 'PLACEHOLDER'),
      (kannan_id,  'kannan@polche.ac',    'Dr. Nagarajan Kannan',          'faculty', 'PLACEHOLDER'),
      (beer_id,    'beer@polche.ac',      'Dr. Philip Beer',               'faculty', 'PLACEHOLDER'),
      (sabar_id,   'sabar@polche.ac',     'Dr. Sabarinathan Radhakrishnan','faculty', 'PLACEHOLDER'),
      (anguraj_id, 'anguraj@polche.ac',   'Prof. Anguraj Sadanandam',      'faculty', 'PLACEHOLDER'),
      (homicsko_id,'homicsko@polche.ac',  'Dr. Krisztian Homicsko',        'faculty', 'PLACEHOLDER'),
      (sirohi_id,  'sirohi@polche.ac',    'Dr. Bhawna Sirohi',             'faculty', 'PLACEHOLDER')
    ON CONFLICT (id) DO NOTHING;

    -- ==========================================================================
    -- MODULES
    -- ==========================================================================
    INSERT INTO modules (code, title, week_start, week_end, lead_faculty_id) VALUES
      ('MOD-01', 'Foundations of Molecular Oncology',      1,  3,  suresh_id),
      ('MOD-02', 'Molecular Diagnostic Technologies',      4,  6,  kannan_id),
      ('MOD-03', 'Clinical NGS and Genomic Biomarkers',    7,  9,  beer_id),
      ('MOD-04', 'Clinical Variant Interpretation',        10, 12, sabar_id),
      ('MOD-05', 'Precision Oncology',                     13, 15, anguraj_id),
      ('MOD-06', 'Liquid Biopsy and Emerging Diagnostics', 16, 18, beer_id),
      ('MOD-07', 'Advanced Molecular Oncology',            19, 20, anguraj_id),
      ('MOD-08', 'Laboratory Quality and Implementation',  21, 21, kannan_id),
      ('MOD-09', 'Molecular Tumour Board',                 22, 24, homicsko_id)
    ON CONFLICT (code) DO NOTHING;

    -- ==========================================================================
    -- WEEKS — Module 1: Foundations of Molecular Oncology (Weeks 1–3)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        1,
        (SELECT id FROM modules WHERE code='MOD-01'),
        'Introduction to Molecular Oncology',
        suresh_id,
        '["Understand the hallmarks of cancer", "Distinguish driver from passenger mutations", "Explain the two-hit hypothesis", "Describe oncogenes and tumour suppressor genes"]'::jsonb,
        '[{"time":"0–10","topic":"Welcome and course overview"},{"time":"10–25","topic":"What is molecular oncology?"},{"time":"25–40","topic":"Hallmarks of cancer (Hanahan & Weinberg)"},{"time":"40–50","topic":"Oncogenes, TSGs and the two-hit hypothesis"},{"time":"50–60","topic":"Clinical significance — why molecular matters"}]'::jsonb,
        '[{"title":"Hallmarks of Cancer: The Next Generation","source":"Cell","year":2011,"doi":"10.1016/j.cell.2011.02.013"},{"title":"The Biology of Cancer","source":"Garland Science","year":2014},{"title":"Genomic and Epigenomic Landscapes of Adult De Novo Acute Myeloid Leukemia","source":"NEJM","year":2013,"pmid":"23634996"}]'::jsonb,
        'This week introduces the molecular basis of cancer. Cancer arises through accumulation of somatic mutations in oncogenes and tumour suppressor genes, disrupting cell-cycle control, apoptosis and DNA repair. The hallmarks of cancer framework organises these diverse alterations into functional categories.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=1);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        2,
        (SELECT id FROM modules WHERE code='MOD-01'),
        'DNA Damage, Repair and Genomic Instability',
        suresh_id,
        '["Describe the main DNA repair pathways", "Explain how repair defects cause cancer", "Define microsatellite instability (MSI)", "Understand homologous recombination deficiency (HRD)"]'::jsonb,
        '[{"time":"0–10","topic":"Types of DNA damage"},{"time":"10–25","topic":"DNA repair mechanisms: BER, NER, MMR, HR, NHEJ"},{"time":"25–40","topic":"Repair pathway defects in cancer — BRCA1/2, MLH1"},{"time":"40–55","topic":"MSI and HRD: clinical implications"},{"time":"55–60","topic":"Therapeutic exploitation of DNA repair defects"}]'::jsonb,
        '[{"title":"DNA repair: an evolving landscape of new targets for cancer treatment","source":"Nature Reviews Cancer","year":2015,"doi":"10.1038/nrc3908"},{"title":"Mismatch repair deficiency predicts response of solid tumors to PD-1 blockade","source":"Science","year":2017,"pmid":"28596308"}]'::jsonb,
        'DNA repair defects are central to cancer biology and precision oncology. MMR deficiency causes MSI-H tumours that respond to immunotherapy. HRD caused by BRCA1/2 mutations renders tumours sensitive to PARP inhibitors.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=2);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        3,
        (SELECT id FROM modules WHERE code='MOD-01'),
        'Cancer Signalling Pathways',
        suresh_id,
        '["Map the RAS-MAPK and PI3K-AKT-mTOR pathways", "Identify key therapeutic targets in each pathway", "Explain resistance mechanisms", "Link pathway activation to molecular diagnostics"]'::jsonb,
        '[{"time":"0–10","topic":"Overview of receptor tyrosine kinase signalling"},{"time":"10–25","topic":"RAS-RAF-MEK-ERK cascade"},{"time":"25–40","topic":"PI3K-AKT-mTOR pathway and PTEN loss"},{"time":"40–55","topic":"Therapeutic targeting — inhibitors and resistance"},{"time":"55–60","topic":"Pathway crosstalk and synthetic lethality"}]'::jsonb,
        '[{"title":"Targeting the PI3K-AKT-mTOR pathway: progress, pitfalls and promises","source":"Nature Reviews Drug Discovery","year":2016,"doi":"10.1038/nrd.2016.56"},{"title":"RAS oncogenes: weaving a tumorigenic web","source":"Nature Reviews Cancer","year":2011,"doi":"10.1038/nrc3106"}]'::jsonb,
        'Cancer signalling pathways explain why certain mutations drive tumour growth and predict which targeted therapies may be effective. Understanding pathway architecture helps interpret molecular reports and predict resistance mechanisms.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=3);

    -- ==========================================================================
    -- WEEKS — Module 2: Molecular Diagnostic Technologies (Weeks 4–6)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        4,
        (SELECT id FROM modules WHERE code='MOD-02'),
        'PCR-Based Diagnostics',
        kannan_id,
        '["Understand PCR, RT-PCR and qPCR principles", "Explain ddPCR and its clinical advantages", "Apply these methods to oncology diagnostics", "Interpret qPCR results and Ct values"]'::jsonb,
        '[{"time":"0–10","topic":"PCR fundamentals and design"},{"time":"10–25","topic":"qPCR: Ct values, efficiency curves, normalisation"},{"time":"25–40","topic":"RT-PCR for fusion detection (e.g. BCR-ABL)"},{"time":"40–55","topic":"ddPCR: principle, partition, Poisson statistics"},{"time":"55–60","topic":"Clinical applications and limitations"}]'::jsonb,
        '[{"title":"Digital PCR as a tool for quantifying gene expression","source":"Nature Methods","year":2009,"doi":"10.1038/nmeth.1385"},{"title":"Droplet digital PCR versus quantitative PCR for analysis of rare somatic mutations","source":"Analytical Chemistry","year":2016,"doi":"10.1021/acs.analchem.6b01426"}]'::jsonb,
        'PCR-based technologies underpin many molecular diagnostic workflows. qPCR enables quantitative measurement of gene expression and mutation load, while ddPCR provides absolute quantification without a standard curve — particularly valuable for detecting mutations at low allele frequencies in liquid biopsy.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=4);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        5,
        (SELECT id FROM modules WHERE code='MOD-02'),
        'In Situ Hybridisation and Immunohistochemistry',
        kannan_id,
        '["Explain FISH and CISH principles", "Interpret FISH signals for amplification and fusion", "Understand IHC scoring systems (H-score, Allred)", "Discuss PD-L1 IHC as a companion diagnostic"]'::jsonb,
        '[{"time":"0–10","topic":"Tissue-based molecular diagnostics overview"},{"time":"10–25","topic":"FISH: probes, signals and interpretation"},{"time":"25–40","topic":"HER2 FISH and ISH scoring (ASCO/CAP guidelines)"},{"time":"40–55","topic":"IHC principles, antibody validation and scoring"},{"time":"55–60","topic":"PD-L1 as a predictive biomarker"}]'::jsonb,
        '[{"title":"ASCO/CAP HER2 Testing Guidelines","source":"Journal of Clinical Oncology","year":2018,"doi":"10.1200/JCO.2018.77.8738"},{"title":"PD-L1 as a Biomarker for Immunotherapy","source":"Journal of Clinical Oncology","year":2015,"pmid":"26261002"}]'::jsonb,
        'FISH and IHC remain the backbone of tissue-based diagnostics for HER2 amplification, ALK rearrangements and PD-L1 expression. Accurate interpretation requires knowledge of validated scoring systems and companion diagnostic approvals.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=5);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        6,
        (SELECT id FROM modules WHERE code='MOD-02'),
        'Sanger Sequencing and Fragment Analysis',
        kannan_id,
        '["Describe chain-termination sequencing", "Interpret a Sanger chromatogram", "Apply Sanger sequencing to variant confirmation", "Understand the role of fragment analysis in clinical diagnosis"]'::jsonb,
        '[{"time":"0–10","topic":"History and principle of Sanger sequencing"},{"time":"10–25","topic":"Reading chromatograms: peaks, noise and artefacts"},{"time":"25–40","topic":"Practical applications: BRCA1/2, KRAS hotspots"},{"time":"40–55","topic":"Fragment analysis: microsatellite instability testing"},{"time":"55–60","topic":"When Sanger vs NGS — decision framework"}]'::jsonb,
        '[{"title":"DNA sequencing with chain-terminating inhibitors","source":"PNAS","year":1977,"pmid":"271968"},{"title":"Microsatellite instability in cancer: a review of current evidence","source":"Oncotarget","year":2016,"doi":"10.18632/oncotarget.9612"}]'::jsonb,
        'Sanger sequencing, though superseded by NGS for comprehensive genomic profiling, remains the gold standard for confirmation of single variants. Fragment analysis provides a simple, sensitive method for MSI testing and is widely available in routine pathology laboratories.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=6);

    -- ==========================================================================
    -- WEEKS — Module 3: Clinical NGS and Genomic Biomarkers (Weeks 7–9)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        7,
        (SELECT id FROM modules WHERE code='MOD-03'),
        'Next-Generation Sequencing: Principles and Workflow',
        beer_id,
        '["Explain sequencing-by-synthesis (Illumina)", "Describe targeted panel vs WES vs WGS", "Define coverage depth, uniformity and Q30", "Understand bioinformatics alignment and variant calling"]'::jsonb,
        '[{"time":"0–10","topic":"From Sanger to massively parallel sequencing"},{"time":"10–25","topic":"Library preparation: fragmentation, adapters, capture"},{"time":"25–40","topic":"Cluster generation and sequencing-by-synthesis"},{"time":"40–50","topic":"Bioinformatics: FASTQ → BAM → VCF pipeline"},{"time":"50–60","topic":"Targeted panels vs WES vs WGS: clinical trade-offs"}]'::jsonb,
        '[{"title":"Next-generation sequencing to guide cancer therapy","source":"Nature Reviews Clinical Oncology","year":2015,"doi":"10.1038/nrclinonc.2015.65"},{"title":"Standards and Guidelines for Validating Next-Generation Sequencing Bioinformatics Pipelines","source":"Journal of Molecular Diagnostics","year":2017,"pmid":"28088590"}]'::jsonb,
        'NGS allows simultaneous interrogation of hundreds of cancer genes from a single tumour sample. Understanding the sequencing workflow from library preparation to variant calling is essential for interpreting NGS reports and understanding their limitations.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=7);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        8,
        (SELECT id FROM modules WHERE code='MOD-03'),
        'Genomic Biomarkers: TMB, MSI and HRD',
        beer_id,
        '["Define TMB and its clinical utility", "Distinguish MSI-PCR and NGS-based MSI testing", "Explain HRD scoring and genomic scar signatures", "Identify FDA-approved indications for each biomarker"]'::jsonb,
        '[{"time":"0–10","topic":"Biomarker landscape in oncology"},{"time":"10–25","topic":"TMB: definition, measurement, pembrolizumab approval"},{"time":"25–40","topic":"MSI: PCR vs NGS concordance, pan-tumour immunotherapy"},{"time":"40–55","topic":"HRD: BRCA genomic instability score (GIS), myChoice"},{"time":"55–60","topic":"Combining biomarkers: TMB-high MSS vs MSI-H"}]'::jsonb,
        '[{"title":"Tumor mutational burden as a predictive biomarker for pembrolizumab","source":"Cancer Discovery","year":2020,"doi":"10.1158/2159-8290.CD-19-0287"},{"title":"PD-1 Blockade in Tumors with Mismatch-Repair Deficiency","source":"NEJM","year":2015,"pmid":"26028255"}]'::jsonb,
        'Tumour mutational burden, microsatellite instability and homologous recombination deficiency are pan-tumour biomarkers that predict response to immunotherapy or PARP inhibition independent of histology. Their measurement by NGS is now routine in comprehensive genomic profiling.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=8);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        9,
        (SELECT id FROM modules WHERE code='MOD-03'),
        'Copy Number Variations and Structural Rearrangements',
        beer_id,
        '["Understand CNV detection from NGS data", "Identify amplification, deletion and LOH", "Describe fusion gene detection methods", "Interpret ERBB2 amplification and ALK fusion calls"]'::jsonb,
        '[{"time":"0–10","topic":"Types of genomic structural variation"},{"time":"10–25","topic":"CNV calling: read-depth methods and log-ratio plots"},{"time":"25–40","topic":"Gene fusions: RNA-seq, DNA breakpoint detection"},{"time":"40–55","topic":"Clinical examples: ERBB2 amp, ALK/ROS1/RET fusions"},{"time":"55–60","topic":"Challenges: tumour purity, ploidy and artefacts"}]'::jsonb,
        '[{"title":"Comprehensive genomic characterization defines human glioblastoma genes and core pathways","source":"Nature","year":2008,"pmid":"18772890"},{"title":"Gene Fusions in Solid Tumors","source":"Nature Reviews Cancer","year":2015,"doi":"10.1038/nrc3921"}]'::jsonb,
        'Copy number variations and structural rearrangements represent a major class of oncogenic alterations. Accurate detection requires careful bioinformatic analysis accounting for tumour purity, ploidy and assay limitations. Gene fusions such as EML4-ALK define entire therapeutic subgroups.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=9);

    -- ==========================================================================
    -- WEEKS — Module 4: Clinical Variant Interpretation (Weeks 10–12)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        10,
        (SELECT id FROM modules WHERE code='MOD-04'),
        'Somatic Variant Classification',
        sabar_id,
        '["Apply AMP/ASCO/CAP somatic variant tiers (I–IV)", "Distinguish pathogenic from VUS", "Use ClinVar, CIViC and OncoKB for classification", "Understand variant curation workflows"]'::jsonb,
        '[{"time":"0–10","topic":"Why variant classification matters clinically"},{"time":"10–25","topic":"AMP/ASCO/CAP 2017 guidelines: Tiers I–IV"},{"time":"25–40","topic":"ClinVar, CIViC and OncoKB: when to use each"},{"time":"40–55","topic":"Practical curation: worked examples"},{"time":"55–60","topic":"Challenges: VUS management and re-classification"}]'::jsonb,
        '[{"title":"Standards and Guidelines for the Interpretation and Reporting of Sequence Variants in Cancer","source":"Journal of Molecular Diagnostics","year":2017,"pmid":"27993330"},{"title":"CIViC is a community knowledgebase for expert crowdsourcing the clinical interpretation of variants in cancer","source":"Nature Genetics","year":2017,"doi":"10.1038/ng.3774"}]'::jsonb,
        'Systematic variant classification using published frameworks (AMP/ASCO/CAP) is essential for consistent, clinically actionable reporting. Databases such as CIViC and OncoKB provide curated evidence supporting variant interpretation.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=10);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        11,
        (SELECT id FROM modules WHERE code='MOD-04'),
        'Germline Variants and Hereditary Cancer Syndromes',
        sabar_id,
        '["Distinguish somatic from germline findings", "Identify key hereditary cancer genes (BRCA1/2, MLH1, APC)", "Apply ACMG germline variant classification", "Understand incidental findings and reporting obligations"]'::jsonb,
        '[{"time":"0–10","topic":"Somatic vs germline: clinical and ethical implications"},{"time":"10–25","topic":"BRCA1/2: hereditary breast and ovarian cancer"},{"time":"25–40","topic":"Lynch syndrome: MLH1, MSH2, MSH6, PMS2"},{"time":"40–55","topic":"ACMG criteria: pathogenic, likely pathogenic, VUS"},{"time":"55–60","topic":"Incidental/secondary findings: reporting and counselling"}]'::jsonb,
        '[{"title":"ACMG Standards and Guidelines for Interpretation of Sequence Variants","source":"Genetics in Medicine","year":2015,"pmid":"25741868"},{"title":"Revised ACMG/AMP criteria for BRCA1 and BRCA2 variant classification","source":"Genetics in Medicine","year":2020,"doi":"10.1038/s41436-020-0812-1"}]'::jsonb,
        'Germline variant interpretation requires application of ACMG criteria and careful consideration of inheritance patterns, variant penetrance and reporting obligations. Identification of a germline BRCA2 mutation has implications not just for therapy but for the patient''s family members.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=11);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        12,
        (SELECT id FROM modules WHERE code='MOD-04'),
        'Writing and Interpreting Molecular Pathology Reports',
        sabar_id,
        '["Understand molecular report structure and content requirements", "Interpret a comprehensive genomic profiling report", "Identify actionable tier I/II variants", "Communicate molecular findings to clinical teams"]'::jsonb,
        '[{"time":"0–10","topic":"What makes a good molecular pathology report"},{"time":"10–25","topic":"CGP report walkthrough: case example"},{"time":"25–45","topic":"Identifying actionability: on-label vs off-label"},{"time":"45–55","topic":"Communicating results: MDT and patient perspectives"},{"time":"55–60","topic":"Incidental findings and informed consent considerations"}]'::jsonb,
        '[{"title":"Minimum reporting standards for clinical cancer genomic profiling","source":"Nature Reviews Clinical Oncology","year":2019,"doi":"10.1038/s41571-019-0205-5"},{"title":"Communicating genomic test results to patients","source":"JAMA Oncology","year":2016,"doi":"10.1001/jamaoncol.2016.0032"}]'::jsonb,
        'The molecular pathology report is the primary document translating complex genomic data into actionable clinical information. It must clearly distinguish somatic from germline findings, tier variants by clinical evidence, and provide interpretive commentary supporting clinical decision-making.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=12);

    -- ==========================================================================
    -- WEEKS — Module 5: Precision Oncology (Weeks 13–15)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        13,
        (SELECT id FROM modules WHERE code='MOD-05'),
        'Targeted Therapy: EGFR, ALK, ROS1 and Beyond',
        anguraj_id,
        '["Describe the clinical development of EGFR inhibitors", "Explain resistance mechanisms to first/second/third-generation TKIs", "Identify actionable alterations for ALK, ROS1, RET, MET, NTRK", "Interpret companion diagnostic requirements"]'::jsonb,
        '[{"time":"0–10","topic":"Precision oncology: from hypothesis to practice"},{"time":"10–25","topic":"EGFR: exon 19 deletions, L858R, T790M, osimertinib"},{"time":"25–40","topic":"ALK, ROS1, RET: fusions as drug targets"},{"time":"40–55","topic":"NTRK fusions: tumour-agnostic approval"},{"time":"55–60","topic":"MET exon 14 skipping and amplification"}]'::jsonb,
        '[{"title":"Osimertinib in Untreated EGFR-Mutated Advanced Non-Small-Cell Lung Cancer","source":"NEJM","year":2018,"doi":"10.1056/NEJMoa1713137"},{"title":"Larotrectinib in TRK Fusion-Positive Cancers in Adults and Children","source":"NEJM","year":2018,"doi":"10.1056/NEJMoa1714448"}]'::jsonb,
        'Precision oncology has transformed treatment of EGFR-mutant NSCLC, ALK-positive lung cancer and NTRK fusion-positive tumours. Acquired resistance to targeted therapy is universal, and understanding resistance mechanisms drives the development of next-generation inhibitors.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=13);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        14,
        (SELECT id FROM modules WHERE code='MOD-05'),
        'Immunotherapy Biomarkers and Molecular Subtypes',
        anguraj_id,
        '["Understand PD-1/PD-L1 biology and checkpoint inhibition", "Identify molecular predictors of immunotherapy response", "Describe tumour microenvironment and immune evasion", "Apply consensus molecular subtypes (CMS) in colorectal cancer"]'::jsonb,
        '[{"time":"0–10","topic":"Immune checkpoint biology: CTLA-4, PD-1/PD-L1"},{"time":"10–25","topic":"Biomarkers: PD-L1 IHC, MSI, TMB, TIL"},{"time":"25–40","topic":"Tumour microenvironment: hot vs cold tumours"},{"time":"40–55","topic":"Consensus molecular subtypes (CRC, BRCA, gastric)"},{"time":"55–60","topic":"Combining immunotherapy with targeted therapy"}]'::jsonb,
        '[{"title":"PD-1 Blockade with Nivolumab in Relapsed or Refractory Classical Hodgkin''s Lymphoma","source":"NEJM","year":2015,"pmid":"26426971"},{"title":"The Consensus Molecular Subtypes of Colorectal Cancer","source":"Nature Medicine","year":2015,"doi":"10.1038/nm.3967"}]'::jsonb,
        'Molecular subtypes reveal the heterogeneity within histological diagnoses. Consensus molecular subtypes (CMS) in colorectal cancer and intrinsic subtypes in breast cancer have prognostic and potentially predictive value. The tumour microenvironment shapes immunotherapy response as much as the tumour cells themselves.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=14);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        15,
        (SELECT id FROM modules WHERE code='MOD-05'),
        'Acquired Resistance and Tumour Evolution',
        anguraj_id,
        '["Explain clonal evolution and ITH", "Describe mechanisms of acquired resistance to TKIs", "Identify methods to detect resistance alterations", "Outline strategies to overcome resistance"]'::jsonb,
        '[{"time":"0–10","topic":"Darwinian evolution in cancer"},{"time":"10–25","topic":"Intratumoural heterogeneity (ITH) and its clinical impact"},{"time":"25–40","topic":"Mechanisms of TKI resistance: on-target, off-target, bypass"},{"time":"40–55","topic":"Sequential biopsies and liquid biopsy for resistance monitoring"},{"time":"55–60","topic":"Combination strategies to prevent/overcome resistance"}]'::jsonb,
        '[{"title":"Tracking the Evolution of Non-Small-Cell Lung Cancer","source":"NEJM","year":2017,"doi":"10.1056/NEJMoa1616288"},{"title":"Clonal evolution in relapsed acute myeloid leukaemia revealed by whole genome sequencing","source":"Nature","year":2012,"doi":"10.1038/nature10738"}]'::jsonb,
        'Tumour evolution driven by selection pressure from therapy creates acquired resistance. Understanding ITH and evolutionary dynamics is essential for designing combination strategies and sequential treatment approaches. Liquid biopsy enables non-invasive monitoring of evolving resistance.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=15);

    -- ==========================================================================
    -- WEEKS — Module 6: Liquid Biopsy (Weeks 16–18)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        16,
        (SELECT id FROM modules WHERE code='MOD-06'),
        'Circulating Tumour DNA: Biology and Detection',
        beer_id,
        '["Explain ctDNA biology and shedding dynamics", "Describe platforms: ddPCR vs NGS vs FoundationOne Liquid", "Understand pre-analytical variables affecting ctDNA", "Apply ctDNA to treatment monitoring"]'::jsonb,
        '[{"time":"0–10","topic":"What is liquid biopsy?"},{"time":"10–25","topic":"ctDNA shedding: biology and tumour burden correlation"},{"time":"25–40","topic":"Detection platforms: ddPCR, ctDNA panels, WGS"},{"time":"40–55","topic":"Pre-analytical factors: tube type, processing, freeze-thaw"},{"time":"55–60","topic":"Clinical applications: treatment monitoring, MRD"}]'::jsonb,
        '[{"title":"Noninvasive identification and monitoring of cancer mutations by targeted deep sequencing","source":"Science Translational Medicine","year":2012,"doi":"10.1126/scitranslmed.3003726"},{"title":"Liquid biopsy in cancer patients","source":"Nature Reviews Clinical Oncology","year":2017,"doi":"10.1038/nrclinonc.2017.14"}]'::jsonb,
        'Circulating tumour DNA represents tumour-derived DNA shed into the bloodstream. Its detection enables non-invasive genotyping, treatment monitoring and early detection of resistance. ddPCR provides sensitive detection of known mutations, while ultra-deep NGS panels detect novel alterations.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=16);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        17,
        (SELECT id FROM modules WHERE code='MOD-06'),
        'Circulating Tumour Cells and Exosomes',
        beer_id,
        '["Describe CTC isolation technologies (CellSearch, DEPArray)", "Understand exosome biology and nucleic acid cargo", "Identify clinical applications of CTCs in breast and prostate cancer", "Evaluate the evidence base for CTC biomarkers"]'::jsonb,
        '[{"time":"0–10","topic":"CTC biology: epithelial to mesenchymal transition"},{"time":"10–25","topic":"CTC isolation: immunomagnetic vs microfluidic approaches"},{"time":"25–40","topic":"Clinical CTC evidence: breast, prostate, colorectal"},{"time":"40–55","topic":"Exosomes: biogenesis, cargo and isolation"},{"time":"55–60","topic":"Future directions: exosomal RNA diagnostics"}]'::jsonb,
        '[{"title":"Circulating Tumor Cells in Breast Cancer","source":"NEJM","year":2004,"pmid":"14734741"},{"title":"Exosome-mediated transfer of mRNAs and microRNAs is a novel mechanism of genetic exchange between cells","source":"Nature Cell Biology","year":2007,"doi":"10.1038/ncb1596"}]'::jsonb,
        'Circulating tumour cells and exosomes represent alternative liquid biopsy analytes. CTCs are FDA-approved for prognostication in breast, prostate and colorectal cancer. Exosomes carry tumour-derived proteins and nucleic acids, with emerging applications in early detection.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=17);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        18,
        (SELECT id FROM modules WHERE code='MOD-06'),
        'Multi-Cancer Early Detection and Screening',
        beer_id,
        '["Understand the Galleri/GRAIL approach to MCED", "Critically evaluate evidence for ctDNA-based screening", "Describe epigenomic biomarkers in cell-free DNA", "Assess regulatory and ethical considerations for MCED"]'::jsonb,
        '[{"time":"0–10","topic":"The promise and challenge of early cancer detection"},{"time":"10–25","topic":"Galleri MCED test: cancer signal origin, clinical evidence"},{"time":"25–40","topic":"Methylation signatures in cfDNA: tissue of origin"},{"time":"40–55","topic":"Screening vs diagnostic intent: different performance thresholds"},{"time":"55–60","topic":"Regulatory pathway, equity and cost-effectiveness"}]'::jsonb,
        '[{"title":"Cell-free DNA comprises an in vivo nucleosome footprint that informs its tissues-of-origin","source":"Cell","year":2016,"doi":"10.1016/j.cell.2015.11.050"},{"title":"Sensitive and specific multi-cancer detection and localization using methylation signatures in cell-free DNA","source":"Annals of Oncology","year":2020,"doi":"10.1016/j.annonc.2020.02.011"}]'::jsonb,
        'Multi-cancer early detection tests using cell-free DNA methylation signatures represent a paradigm shift in oncology. The Galleri test can detect >50 cancer types from a single blood draw, with high specificity and tissue-of-origin prediction, though sensitivity varies by cancer type and stage.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=18);

    -- ==========================================================================
    -- WEEKS — Module 7: Advanced Molecular Oncology (Weeks 19–20)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        19,
        (SELECT id FROM modules WHERE code='MOD-07'),
        'Epigenomics in Cancer Diagnostics',
        anguraj_id,
        '["Understand DNA methylation, histone modification and chromatin remodelling in cancer", "Describe epigenetic biomarkers in clinical practice", "Explain EpiSIGNATURE panels", "Apply epigenomics to tumour classification"]'::jsonb,
        '[{"time":"0–10","topic":"Epigenetics: beyond the DNA sequence"},{"time":"10–25","topic":"DNA methylation in cancer: promoter silencing, global hypomethylation"},{"time":"25–40","topic":"Histone modifications and chromatin remodelling"},{"time":"40–55","topic":"Clinical epigenomic assays: methylation arrays, CNS tumour classifier"},{"time":"55–60","topic":"EpiSIGNATURE panels for syndrome diagnosis"}]'::jsonb,
        '[{"title":"DNA Methylation and Cancer Diagnosis","source":"New England Journal of Medicine","year":2018,"doi":"10.1056/NEJMra1700737"},{"title":"A brain tumor molecular diagnostics using DNA methylation profiling","source":"Nature","year":2018,"doi":"10.1038/nature26000"}]'::jsonb,
        'Epigenomic alterations are as important as genetic mutations in driving cancer. The DNA methylation-based CNS tumour classifier is now used diagnostically in neuro-oncology, demonstrating how epigenomics has entered routine clinical practice. Future platforms may replace traditional pathology in some tumour types.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=19);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        20,
        (SELECT id FROM modules WHERE code='MOD-07'),
        'Transcriptomics and Single-Cell Analysis',
        anguraj_id,
        '["Describe bulk RNA-seq and its clinical applications", "Explain deconvolution of tumour microenvironment", "Understand single-cell RNA-seq principles", "Apply transcriptomic signatures to clinical decision-making"]'::jsonb,
        '[{"time":"0–10","topic":"Why transcriptomics in cancer?"},{"time":"10–25","topic":"Bulk RNA-seq: differential expression, pathway analysis"},{"time":"25–40","topic":"Signatures: Oncotype DX, PAM50, MammaPrint"},{"time":"40–55","topic":"Single-cell RNA-seq: technology and applications"},{"time":"55–60","topic":"Future: spatial transcriptomics in pathology"}]'::jsonb,
        '[{"title":"A multigene assay to predict recurrence of tamoxifen-treated, node-negative breast cancer","source":"NEJM","year":2004,"pmid":"15317891"},{"title":"Spatial and temporal mapping of human haematopoietic stem cells","source":"Nature","year":2019,"doi":"10.1038/s41586-019-1223-y"}]'::jsonb,
        'Transcriptomic signatures such as Oncotype DX and PAM50 have entered routine clinical practice to guide chemotherapy decisions in early breast cancer. Single-cell RNA-seq is revolutionising our understanding of tumour heterogeneity and the tumour microenvironment, with diagnostic applications emerging.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=20);

    -- ==========================================================================
    -- WEEKS — Module 8: Laboratory Quality (Week 21)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        21,
        (SELECT id FROM modules WHERE code='MOD-08'),
        'Quality Management in Molecular Diagnostics',
        kannan_id,
        '["Describe ISO 15189 accreditation for molecular labs", "Design quality control programmes for NGS", "Identify pre-analytical, analytical and post-analytical error sources", "Apply proficiency testing and EQA principles"]'::jsonb,
        '[{"time":"0–10","topic":"Why quality matters in molecular diagnostics"},{"time":"10–25","topic":"ISO 15189: scope, requirements and accreditation process"},{"time":"25–40","topic":"NGS quality metrics: depth, uniformity, VAF reproducibility"},{"time":"40–55","topic":"EQA and proficiency testing: UK NEQAS, CAP"},{"time":"55–60","topic":"Failure modes and root-cause analysis"}]'::jsonb,
        '[{"title":"Quality management in clinical laboratories","source":"Clinics in Laboratory Medicine","year":2007,"pmid":"17499944"},{"title":"Practical guidelines for NGS quality management","source":"Practical Laboratory Medicine","year":2017,"doi":"10.1016/j.plabm.2017.06.002"}]'::jsonb,
        'Quality management underpins patient safety in molecular diagnostics. ISO 15189 accreditation demonstrates competence and consistency. Robust NGS QC programmes must address pre-analytical variables, bioinformatics pipeline performance and variant calling reproducibility.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=21);

    -- ==========================================================================
    -- WEEKS — Module 9: Molecular Tumour Board (Weeks 22–24)
    -- ==========================================================================
    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        22,
        (SELECT id FROM modules WHERE code='MOD-09'),
        'Molecular Tumour Board: Structure and Practice',
        homicsko_id,
        '["Understand the role and composition of an MTB", "Describe the case discussion workflow", "Identify governance and documentation requirements", "Apply MTB principles to clinical decision-making"]'::jsonb,
        '[{"time":"0–10","topic":"What is a Molecular Tumour Board?"},{"time":"10–25","topic":"Composition: oncologist, pathologist, bioinformatician, geneticist"},{"time":"25–40","topic":"Case preparation: report, evidence summary, matched trials"},{"time":"40–55","topic":"Discussion workflow and recommendation documentation"},{"time":"55–60","topic":"Governance, audit and outcome tracking"}]'::jsonb,
        '[{"title":"Molecular tumor boards: current practice and future needs","source":"Annals of Oncology","year":2017,"doi":"10.1093/annonc/mdx221"},{"title":"The molecular tumor board in oncology: a clinician''s guide","source":"Oncologist","year":2020,"doi":"10.1634/theoncologist.2019-0657"}]'::jsonb,
        'The Molecular Tumour Board brings together multidisciplinary expertise to interpret comprehensive genomic profiling results and translate them into personalised treatment recommendations. It is now a standard component of cancer centres offering precision oncology.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=22);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        23,
        (SELECT id FROM modules WHERE code='MOD-09'),
        'MTB Case Workshop I: Solid Tumours',
        homicsko_id,
        '["Present and discuss two synthetic solid tumour cases", "Apply CGP findings to therapeutic decision-making", "Match molecular alterations to clinical trials", "Document MTB-style recommendations"]'::jsonb,
        '[{"time":"0–10","topic":"Workshop format and expectations"},{"time":"10–30","topic":"Case 1: NSCLC with EGFR T790M + TP53 — group discussion"},{"time":"30–50","topic":"Case 2: Colorectal cancer MSI-H with BRAF V600E"},{"time":"50–60","topic":"Debrief and faculty model answers"}]'::jsonb,
        '[{"title":"ESMO Scale for Clinical Actionability of molecular Targets (ESCAT)","source":"Annals of Oncology","year":2018,"doi":"10.1093/annonc/mdy263"},{"title":"ASCO TAPUR study: a phase II basket trial","source":"Journal of Clinical Oncology","year":2020,"doi":"10.1200/JCO.19.03086"}]'::jsonb,
        'Applying MTB principles to real-world-like cases develops the clinical reasoning skills needed to translate molecular findings into treatment decisions. These workshops use fully synthetic patient cases to practice evidence grading, trial matching and documentation.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=23);

    INSERT INTO weeks (week_number, module_id, title, faculty_id,
        lecture_objectives, lecture_outline, recommended_reading, student_summary)
    SELECT
        24,
        (SELECT id FROM modules WHERE code='MOD-09'),
        'MTB Case Workshop II: Haematological Malignancies and Course Synthesis',
        sirohi_id,
        '["Present synthetic haematological malignancy cases", "Integrate course knowledge across all modules", "Demonstrate competency in molecular oncology reasoning", "Prepare for final assessment"]'::jsonb,
        '[{"time":"0–10","topic":"Haematological malignancy overview: AML, CLL, lymphoma"},{"time":"10–30","topic":"Case 3: AML with FLT3-ITD + NPM1 — targeted therapy options"},{"time":"30–50","topic":"Case 4: CLL with TP53 deletion and BTK inhibitor resistance"},{"time":"50–60","topic":"Course synthesis: key take-home messages and assessment preparation"}]'::jsonb,
        '[{"title":"Targeted therapy for AML: a comprehensive review","source":"Blood Reviews","year":2019,"doi":"10.1016/j.blre.2019.100588"},{"title":"BTK inhibitor resistance mechanisms in CLL","source":"Blood","year":2019,"doi":"10.1182/blood.2019000929"}]'::jsonb,
        'The final workshop integrates learning from all 24 weeks through complex haematological malignancy cases requiring synthesis of molecular biology, diagnostics and therapeutic reasoning. Successful completion demonstrates readiness for clinical application of molecular oncology principles.'
    WHERE NOT EXISTS (SELECT 1 FROM weeks WHERE week_number=24);

END $$;
