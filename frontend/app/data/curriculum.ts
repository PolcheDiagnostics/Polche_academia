export interface Week {
  week: number;
  module: string;
  moduleId: number;
  faculty: string;
  title: string;
  lectureObjectives: string[];
  lectureOutline: { time: string; topic: string }[];
  workshopTitle: string;
  workshopObjectives: string[];
  keyTopics: string[];
  clinicalRelevance: string;
  assessmentCount: number;
  recommendedReading: { title: string; source: string; pmid?: string; doi?: string; year: number }[];
  studentSummary: string;
  draftStatus: "draft" | "in_review" | "approved" | "published";
}

export interface Module {
  id: number;
  title: string;
  weeks: number[];
  faculty: string;
  facultyEmail: string;
  description: string;
  color: string;
}

export const MODULES: Module[] = [
  {
    id: 1, title: "Foundations of Molecular Oncology", weeks: [1,2,3],
    faculty: "Dr. Suresh", facultyEmail: "suresh@polcheacademia.org",
    description: "Core concepts of cancer biology, molecular hallmarks and the genomic basis of oncogenesis.",
    color: "#00A6A6",
  },
  {
    id: 2, title: "Molecular Diagnostic Technologies", weeks: [4,5,6],
    faculty: "Dr. Nagarajan Kannan", facultyEmail: "nagarajan.kannan@polcheacademia.org",
    description: "PCR, NGS platforms, FISH, IHC and emerging molecular diagnostic methodologies.",
    color: "#3B82F6",
  },
  {
    id: 3, title: "Clinical NGS and Genomic Biomarkers", weeks: [7,8,9],
    faculty: "Dr. Philip Beer", facultyEmail: "philip.beer@polcheacademia.org",
    description: "Clinical next-generation sequencing workflows, panel design, QC metrics and genomic biomarker interpretation.",
    color: "#A78BFA",
  },
  {
    id: 4, title: "Clinical Variant Interpretation", weeks: [10,11,12],
    faculty: "Dr. Sabarinathan Radhakrishnan", facultyEmail: "sabarinathan@polcheacademia.org",
    description: "ACMG/AMP variant classification, somatic vs germline calling, VUS management and reporting standards.",
    color: "#F59E0B",
  },
  {
    id: 5, title: "Precision Oncology", weeks: [13,14,15],
    faculty: "Prof. Anguraj Sadanandam", facultyEmail: "anguraj.sadanandam@icr.ac.uk",
    description: "Actionable genomic alterations, targeted therapies, immunotherapy biomarkers and precision oncology frameworks.",
    color: "#EF4444",
  },
  {
    id: 6, title: "Liquid Biopsy and Emerging Diagnostics", weeks: [16,17,18],
    faculty: "Dr. Philip Beer", facultyEmail: "philip.beer@polcheacademia.org",
    description: "ctDNA, circulating tumour cells, cell-free DNA, MRD monitoring and emerging liquid biopsy applications.",
    color: "#10B981",
  },
  {
    id: 7, title: "Advanced Molecular Oncology", weeks: [19,20],
    faculty: "Prof. Anguraj Sadanandam", facultyEmail: "anguraj.sadanandam@icr.ac.uk",
    description: "Tumour evolution, clonal dynamics, resistance mechanisms and translational research methodologies.",
    color: "#6366F1",
  },
  {
    id: 8, title: "Laboratory Quality and Implementation", weeks: [21],
    faculty: "Dr. Nagarajan Kannan", facultyEmail: "nagarajan.kannan@polcheacademia.org",
    description: "ISO 15189, CAP/CLIA accreditation, variant curation workflows and clinical laboratory governance.",
    color: "#EC4899",
  },
  {
    id: 9, title: "Molecular Tumour Board", weeks: [22,23,24],
    faculty: "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi",
    facultyEmail: "mtb@polcheacademia.org",
    description: "Multidisciplinary molecular tumour board case presentations, evidence synthesis and treatment decision-making.",
    color: "#F97316",
  },
];

export const CURRICULUM: Week[] = [
  {
    week: 1, module: "Foundations of Molecular Oncology", moduleId: 1,
    faculty: "Dr. Suresh",
    title: "Cancer as a Genomic Disease: Hallmarks and Molecular Basis",
    lectureObjectives: [
      "Explain the molecular hallmarks of cancer and their genomic underpinnings",
      "Describe driver versus passenger mutations and clonal evolution",
      "Outline the classes of cancer genes: oncogenes, tumour suppressors and DNA repair genes",
      "Explain somatic versus germline mutations and their clinical implications",
    ],
    lectureOutline: [
      { time: "0–10 min", topic: "Introduction: Why molecular oncology matters for clinicians" },
      { time: "10–25 min", topic: "The hallmarks of cancer (Hanahan & Weinberg framework)" },
      { time: "25–40 min", topic: "Driver mutations, oncogenes and tumour suppressor genes" },
      { time: "40–50 min", topic: "Somatic vs germline mutations; clonal evolution" },
      { time: "50–60 min", topic: "Clinical examples: KRAS, TP53, BRCA1/2 and actionability" },
    ],
    workshopTitle: "Interactive Pathway Explorer: Oncogene Activation and Tumour Suppressor Loss",
    workshopObjectives: [
      "Trace RAS-MAPK and PI3K-AKT-mTOR pathway activation",
      "Identify how gain-of-function and loss-of-function mutations alter signalling",
      "Interpret a simplified somatic variant report for a synthetic colorectal cancer case",
    ],
    keyTopics: ["Hallmarks of cancer", "Driver mutations", "KRAS", "TP53", "RAS-MAPK pathway", "PI3K-AKT-mTOR pathway", "Clonal evolution"],
    clinicalRelevance: "Understanding the molecular basis of cancer directly informs targeted therapy selection, hereditary cancer risk assessment and clinical trial eligibility.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Hallmarks of Cancer: The Next Generation", source: "Cell", year: 2011, pmid: "21376230", doi: "10.1016/j.cell.2011.02.013" },
      { title: "Mutational landscape of metastatic cancer revealed from prospective clinical sequencing", source: "Nature Medicine", year: 2017, pmid: "28481359", doi: "10.1038/nm.4333" },
      { title: "Precision Oncology: The Road Ahead", source: "Trends in Cancer", year: 2017, doi: "10.1016/j.trecan.2017.08.003" },
    ],
    studentSummary: "Cancer arises through the accumulation of somatic mutations that confer growth advantages. Driver mutations in oncogenes (gain-of-function, e.g. KRAS G12D) or tumour suppressors (loss-of-function, e.g. TP53 deletion) are the therapeutic targets in precision oncology. Clonal evolution explains both tumour heterogeneity and acquired resistance.",
    draftStatus: "published",
  },
  {
    week: 2, module: "Foundations of Molecular Oncology", moduleId: 1,
    faculty: "Dr. Suresh",
    title: "DNA Repair Pathways, Genomic Instability and Hereditary Cancer",
    lectureObjectives: [
      "Describe the major DNA repair pathways and their roles in preventing cancer",
      "Explain mismatch repair deficiency and microsatellite instability (MSI) in clinical context",
      "Outline homologous recombination deficiency (HRD) and BRCA1/2 biology",
      "Classify hereditary cancer syndromes and their molecular basis",
    ],
    lectureOutline: [
      { time: "0–10 min", topic: "Overview of DNA damage and repair mechanisms" },
      { time: "10–25 min", topic: "Base excision, nucleotide excision and mismatch repair" },
      { time: "25–40 min", topic: "Homologous recombination and NHEJ; BRCA1/2 biology" },
      { time: "40–50 min", topic: "MSI, dMMR and immunotherapy implications (pembrolizumab approval)" },
      { time: "50–60 min", topic: "Hereditary cancer syndromes: Lynch, BRCA, Li-Fraumeni" },
    ],
    workshopTitle: "Case Workshop: Identifying Actionable DNA Repair Defects in a Synthetic Endometrial Cancer",
    workshopObjectives: [
      "Interpret MSI-H and dMMR results in a synthetic pathology report",
      "Apply PARPi eligibility criteria based on BRCA and HRD status",
      "Discuss germline testing indications from a somatic report",
    ],
    keyTopics: ["MMR deficiency", "MSI-H", "BRCA1/2", "HRD", "Lynch syndrome", "PARP inhibitors", "Homologous recombination"],
    clinicalRelevance: "dMMR/MSI-H status predicts response to immune checkpoint inhibitors across tumour types. HRD/BRCA deficiency predicts PARP inhibitor sensitivity in ovarian, breast, prostate and pancreatic cancers.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "MMR deficiency and MSI as biomarkers for immunotherapy", source: "New England Journal of Medicine", year: 2015, pmid: "26028255", doi: "10.1056/NEJMoa1500596" },
      { title: "BRCA1 and BRCA2: different roles in a common pathway of genome protection", source: "Nature Reviews Cancer", year: 2012, pmid: "22193408" },
    ],
    studentSummary: "DNA repair pathway defects cause genomic instability and predispose to cancer. Clinically, dMMR/MSI-H tumours respond to immune checkpoint inhibitors (pembrolizumab approved pan-tumour). HRD tumours are sensitive to PARP inhibitors. Recognition of germline versus somatic DNA repair defects has profound implications for hereditary cancer counselling.",
    draftStatus: "published",
  },
  {
    week: 3, module: "Foundations of Molecular Oncology", moduleId: 1,
    faculty: "Dr. Suresh",
    title: "Tumour Microenvironment, Epigenetics and Non-coding RNA in Cancer",
    lectureObjectives: [
      "Describe the cellular components of the tumour microenvironment",
      "Explain epigenetic mechanisms driving oncogenesis: DNA methylation, histone modification",
      "Outline the roles of non-coding RNAs in cancer biology",
      "Identify emerging therapeutic targets in the TME and epigenome",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Tumour microenvironment: immune cells, stroma and vasculature" },
      { time: "15–30 min", topic: "Cancer epigenetics: DNA methylation silencing, EZH2, DNMT mutations" },
      { time: "30–45 min", topic: "MicroRNAs, lncRNAs and circular RNAs as oncogenic regulators" },
      { time: "45–60 min", topic: "Immunotherapy biomarkers beyond MSI: TMB, PD-L1, TIL scoring" },
    ],
    workshopTitle: "Immunotherapy Biomarker Selection: Synthetic Lung Adenocarcinoma Case",
    workshopObjectives: [
      "Integrate TMB, PD-L1 and driver mutation status for immunotherapy eligibility",
      "Identify contraindications to immunotherapy from a molecular report",
      "Discuss tumour-agnostic versus tumour-specific biomarker approvals",
    ],
    keyTopics: ["TME", "PD-L1", "TMB", "Epigenetics", "DNA methylation", "EZH2", "MicroRNA", "Immune checkpoint"],
    clinicalRelevance: "PD-L1, TMB and dMMR are FDA-approved predictive biomarkers for immune checkpoint inhibitors. Epigenetic drugs (EZH2 inhibitors, DNMT inhibitors) are approved in haematological malignancies.",
    assessmentCount: 7,
    recommendedReading: [
      { title: "Tumour mutational burden as a predictive biomarker for immunotherapy", source: "ESMO Open", year: 2020, doi: "10.1136/esmoopen-2019-000617" },
      { title: "Cancer epigenetics: moving forward", source: "PLOS Genetics", year: 2021, doi: "10.1371/journal.pgen.1009348" },
    ],
    studentSummary: "The tumour microenvironment shapes therapeutic response. Immunotherapy biomarkers — PD-L1 expression, TMB, dMMR/MSI-H — guide checkpoint inhibitor selection. Epigenetic mechanisms including DNA methylation and histone modification are both disease drivers and therapeutic targets in haematological cancers.",
    draftStatus: "approved",
  },
  {
    week: 4, module: "Molecular Diagnostic Technologies", moduleId: 2,
    faculty: "Dr. Nagarajan Kannan",
    title: "PCR-Based Diagnostics: From RT-PCR to Digital PCR",
    lectureObjectives: [
      "Explain the principles of PCR, RT-PCR, qPCR and ddPCR",
      "Compare analytical sensitivity and specificity of different PCR formats",
      "Describe clinical applications in oncology: EGFR, KRAS, BCR-ABL quantification",
      "Outline quality assurance in a molecular diagnostics laboratory",
    ],
    lectureOutline: [
      { time: "0–10 min", topic: "PCR principles: target amplification and detection chemistry" },
      { time: "10–25 min", topic: "Real-time qPCR: TaqMan probes, SYBR green, Ct values, quantification" },
      { time: "25–40 min", topic: "Digital PCR: ddPCR and dPCR for absolute quantification and rare variants" },
      { time: "40–55 min", topic: "Clinical applications: BCR-ABL1 MRD monitoring, EGFR T790M liquid biopsy" },
      { time: "55–60 min", topic: "Controls, QC metrics and interpretive pitfalls" },
    ],
    workshopTitle: "Virtual qPCR Laboratory: BCR-ABL1 MRD Monitoring in CML",
    workshopObjectives: [
      "Interpret a BCR-ABL1 IS quantification result and determine molecular response depth",
      "Troubleshoot a failed qPCR run using QC metrics",
      "Design a monitoring strategy for a synthetic CML patient on imatinib",
    ],
    keyTopics: ["PCR", "qPCR", "ddPCR", "BCR-ABL1", "EGFR T790M", "MRD", "Ct value", "Digital PCR"],
    clinicalRelevance: "qPCR BCR-ABL1 IS quantification is the gold standard for CML treatment monitoring. ddPCR detects rare variants (VAF <0.1%) for liquid biopsy applications with superior analytical sensitivity.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Minimal residual disease monitoring in CML: technical aspects and clinical relevance", source: "Best Practice & Research Clinical Haematology", year: 2020, doi: "10.1016/j.beha.2020.101141" },
    ],
    studentSummary: "PCR-based diagnostics underpin both diagnosis and monitoring in oncology. The shift from qualitative PCR to quantitative (qPCR) and absolute digital quantification (ddPCR) enables sensitive monitoring of minimal residual disease and rare circulating tumour DNA variants.",
    draftStatus: "approved",
  },
  {
    week: 5, module: "Molecular Diagnostic Technologies", moduleId: 2,
    faculty: "Dr. Nagarajan Kannan",
    title: "Next-Generation Sequencing: Platforms, Chemistry and Panel Design",
    lectureObjectives: [
      "Describe the sequencing-by-synthesis workflow of Illumina platforms",
      "Compare targeted gene panels, exome and whole-genome sequencing approaches",
      "Explain key sequencing metrics: coverage, uniformity, error rates and QC thresholds",
      "Outline the rationale for panel design in clinical oncology",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "NGS technology overview: Illumina SBS, Ion Torrent, Nanopore" },
      { time: "15–30 min", topic: "Library preparation: fragmentation, adapter ligation, capture enrichment" },
      { time: "30–45 min", topic: "Sequencing metrics: mean coverage, uniformity, base quality, duplication" },
      { time: "45–60 min", topic: "Clinical panel design: hotspot panels, comprehensive panels, WGS considerations" },
    ],
    workshopTitle: "NGS Quality Assessment Workshop: Interpreting Sequencing QC Reports",
    workshopObjectives: [
      "Identify pass and fail metrics in a synthetic NGS QC report",
      "Determine whether a low-coverage sample requires resequencing",
      "Compare clinical utility of a 50-gene hotspot panel vs 500-gene comprehensive panel",
    ],
    keyTopics: ["Illumina sequencing", "NGS QC", "Library preparation", "Coverage depth", "Panel design", "WGS", "WES"],
    clinicalRelevance: "Sequencing depth and uniformity directly determine variant detection sensitivity. Understanding platform limitations is essential for interpreting NGS reports and selecting appropriate assays.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Clinical next-generation sequencing: expanding the diagnostic toolkit", source: "Clinical Chemistry", year: 2020, doi: "10.1093/clinchem/hvaa030" },
    ],
    studentSummary: "NGS generates millions of short reads from fragmented DNA. Clinical oncology uses targeted panels (50–500 genes) to detect somatic variants with 500–1000× coverage depth. QC metrics including mean coverage, uniformity and duplication rate must meet laboratory-defined thresholds before variant calling proceeds.",
    draftStatus: "in_review",
  },
  {
    week: 6, module: "Molecular Diagnostic Technologies", moduleId: 2,
    faculty: "Dr. Nagarajan Kannan",
    title: "FISH, IHC, Cytogenetics and Companion Diagnostics",
    lectureObjectives: [
      "Explain FISH and CISH for gene amplification and rearrangement detection",
      "Describe IHC principles for protein expression and clinical scoring systems",
      "Outline approved companion diagnostics and their regulatory frameworks",
      "Compare FISH, IHC and NGS in clinical decision-making",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "FISH principles: probe design, signal patterns, amplification vs rearrangement" },
      { time: "15–30 min", topic: "IHC: antibody selection, scoring (Allred, H-score, PD-L1 TPS/CPS)" },
      { time: "30–45 min", topic: "Companion diagnostics: regulatory framework, FDA/EMA approvals" },
      { time: "45–60 min", topic: "Comparative case: HER2 testing — IHC, FISH, NGS concordance" },
    ],
    workshopTitle: "HER2 Testing Algorithm: Applying 2023 ASCO/CAP Guidelines",
    workshopObjectives: [
      "Apply HER2 IHC scoring criteria to synthetic breast cancer images",
      "Determine FISH reflex testing indications from IHC score",
      "Integrate IHC 2+ FISH-positive and ultralow HER2 results into treatment decisions",
    ],
    keyTopics: ["FISH", "IHC", "HER2 testing", "PD-L1 scoring", "Companion diagnostics", "ALK FISH", "CDx"],
    clinicalRelevance: "Companion diagnostics are FDA-required for targeted therapies including trastuzumab, pertuzumab and T-DM1 (HER2), crizotinib (ALK), pembrolizumab (PD-L1 ≥50%). Concordance between testing methods and guideline-based algorithms is essential for appropriate patient selection.",
    assessmentCount: 7,
    recommendedReading: [
      { title: "ASCO/CAP HER2 Testing Guidelines: 2023 Update", source: "Journal of Clinical Oncology", year: 2023, doi: "10.1200/JCO.23.00416" },
    ],
    studentSummary: "FISH and IHC remain clinically essential for biomarker testing despite the rise of NGS. Companion diagnostic frameworks require validated assays for drug approval. HER2 testing illustrates algorithm-based decision-making combining IHC, FISH and emerging ultralow-HER2 definitions.",
    draftStatus: "draft",
  },
  {
    week: 7, module: "Clinical NGS and Genomic Biomarkers", moduleId: 3,
    faculty: "Dr. Philip Beer",
    title: "Somatic Variant Calling and Bioinformatics Pipelines",
    lectureObjectives: [
      "Describe the bioinformatics workflow from FASTQ to annotated VCF",
      "Explain variant calling algorithms for SNVs, indels, CNVs and SVs",
      "Outline sources of artefact in somatic NGS and quality filtering strategies",
      "Interpret a sample bioinformatics pipeline report",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "FASTQ → alignment (BWA-MEM) → BAM processing (GATK best practices)" },
      { time: "15–30 min", topic: "Somatic SNV/indel calling: Mutect2, tumour-normal vs tumour-only modes" },
      { time: "30–45 min", topic: "CNV detection: depth-of-coverage methods, B-allele frequency" },
      { time: "45–60 min", topic: "Artefacts: FFPE damage, strand bias, low VAF noise, contamination" },
    ],
    workshopTitle: "Bioinformatics Pipeline Review: Evaluating a Synthetic NSCLC Sequencing Run",
    workshopObjectives: [
      "Identify pass-filter and artefact variants in a synthetic VCF",
      "Assess tumour purity impact on VAF interpretation",
      "Flag FFPE-related artefacts from trinucleotide context",
    ],
    keyTopics: ["FASTQ", "BAM", "VCF", "Mutect2", "GATK", "CNV", "FFPE artefact", "Tumour purity", "VAF"],
    clinicalRelevance: "Bioinformatics quality directly determines clinical reporting accuracy. Understanding pipeline limitations prevents false-positive reporting of FFPE artefacts as actionable variants.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "GATK best practices for variant calling in somatic cancer", source: "Current Protocols in Bioinformatics", year: 2020, doi: "10.1002/cpbi.100" },
    ],
    studentSummary: "Clinical NGS bioinformatics transforms raw reads into clinically actionable variant calls through QC, alignment, duplicate removal, variant calling and annotation. FFPE-related artefacts, low tumour purity and strand bias are the most common sources of false-positive calls requiring careful filtering.",
    draftStatus: "approved",
  },
  {
    week: 8, module: "Clinical NGS and Genomic Biomarkers", moduleId: 3,
    faculty: "Dr. Philip Beer",
    title: "Genomic Biomarkers: TMB, MSI, HRD and Mutational Signatures",
    lectureObjectives: [
      "Define TMB, explain calculation methods and clinical cutoffs",
      "Describe MSI-H and dMMR detection methods by NGS",
      "Explain HRD scores, the HRD test landscape and clinical utility",
      "Identify mutational signatures and their aetiological implications",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "TMB: calculation, panel-based approximation, FDA ≥10 mut/Mb cutoff" },
      { time: "15–30 min", topic: "MSI by NGS: MSIsensor, MANTIS, comparison with IHC and PCR" },
      { time: "30–45 min", topic: "HRD: genomic scars (LOH, TAI, LST), Myriad myChoice, Foundation HRD" },
      { time: "45–60 min", topic: "Mutational signatures (COSMIC v3): SBS1, SBS4, SBS6, SBS13, clinical interpretation" },
    ],
    workshopTitle: "Genomic Biomarker Integration: Synthetic Ovarian Cancer Report",
    workshopObjectives: [
      "Calculate TMB from a simplified variant count dataset",
      "Interpret MSI-H finding and discuss pembrolizumab eligibility",
      "Apply HRD result to PARP inhibitor decision-making",
    ],
    keyTopics: ["TMB", "MSI-H", "dMMR", "HRD", "Mutational signatures", "COSMIC", "Genomic scars"],
    clinicalRelevance: "TMB ≥10 mut/Mb is an FDA-approved biomarker for pembrolizumab (pan-tumour). HRD positivity predicts olaparib and niraparib benefit in ovarian cancer. Mutational signatures guide aetiology, surveillance and hereditary testing recommendations.",
    assessmentCount: 9,
    recommendedReading: [
      { title: "Signatures of mutational processes in human cancer", source: "Nature", year: 2013, pmid: "23945592", doi: "10.1038/nature12477" },
    ],
    studentSummary: "Pan-tumour biomarkers TMB, MSI and HRD extend beyond single-gene testing to predict immunotherapy and PARP inhibitor benefit. Mutational signatures are aetiological fingerprints (tobacco: SBS4, UV: SBS7, APOBEC: SBS2/13) that inform cancer aetiology, hereditary risk and exposure history.",
    draftStatus: "in_review",
  },
  {
    week: 9, module: "Clinical NGS and Genomic Biomarkers", moduleId: 3,
    faculty: "Dr. Philip Beer",
    title: "Copy Number Variants, Structural Variants and Gene Fusions",
    lectureObjectives: [
      "Describe methods for detecting gene amplifications, deletions and structural rearrangements by NGS",
      "Explain the clinical significance of ERBB2 amplification, MYC amplification and CDKN2A deletion",
      "Identify therapeutically relevant gene fusions: ALK, ROS1, NTRK, RET, FGFR",
      "Outline RNA sequencing approaches for fusion detection",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "CNV detection: tumour-normal ratio, B-allele frequency, clonality" },
      { time: "15–30 min", topic: "Gene amplifications: ERBB2, MYC, FGFR; clinical implications" },
      { time: "30–45 min", topic: "Structural variants and gene fusions: biology and detection" },
      { time: "45–60 min", topic: "Therapeutically actionable fusions: ALK, ROS1, NTRK, RET, FGFR2/3" },
    ],
    workshopTitle: "Fusion Identification Workshop: Synthetic NSCLC and CCA Cases",
    workshopObjectives: [
      "Identify EML4-ALK fusion from a synthetic RNA-seq alignment",
      "Distinguish driver fusion from passenger rearrangement",
      "Select appropriate tyrosine kinase inhibitor based on fusion partner",
    ],
    keyTopics: ["Gene amplification", "ERBB2", "CDKN2A", "Gene fusions", "ALK", "NTRK", "RET", "FGFR", "RNA-seq"],
    clinicalRelevance: "ALK, ROS1, NTRK, RET and FGFR fusions are potently actionable with approved targeted therapies. Gene amplifications (ERBB2, FGFR) are therapeutically targeted across multiple tumour types.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Oncogenic gene fusions: classification, detection and clinical utility", source: "Cancer Research", year: 2021, doi: "10.1158/0008-5472.CAN-21-0345" },
    ],
    studentSummary: "Structural variants including gene fusions represent a therapeutically important class of oncogenic driver. RNA-seq-based fusion detection is superior to DNA-only methods for transcript-level characterisation. ALK and NTRK fusions exemplify pan-tumour actionability with approved inhibitors.",
    draftStatus: "draft",
  },
  {
    week: 10, module: "Clinical Variant Interpretation", moduleId: 4,
    faculty: "Dr. Sabarinathan Radhakrishnan",
    title: "ACMG/AMP Variant Classification and Somatic Adaptation",
    lectureObjectives: [
      "Apply ACMG/AMP 2015 and 2022 variant classification criteria for germline variants",
      "Describe the AMP/ASCO/CAP somatic variant classification framework (tiers I–IV)",
      "Distinguish pathogenic somatic from benign germline variants using VAF and allele frequency databases",
      "Explain variant of uncertain significance (VUS) management principles",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "ACMG/AMP germline framework: pathogenicity evidence criteria (PVS1, PS1-4, PM1-6, PP1-5)" },
      { time: "15–30 min", topic: "Somatic adaptation: AMP/ASCO/CAP tier I–IV classification" },
      { time: "30–45 min", topic: "Population databases: gnomAD, ClinVar, COSMIC for variant interpretation" },
      { time: "45–60 min", topic: "VUS: communication, cascade testing, variant reclassification" },
    ],
    workshopTitle: "Variant Classification Exercise: Applying ACMG/AMP Criteria to Synthetic Cases",
    workshopObjectives: [
      "Classify three synthetic variants using ACMG/AMP criteria worksheet",
      "Distinguish somatic BRCA2 from germline BRCA2 from a tumour-only report",
      "Draft a VUS communication statement for a clinical report",
    ],
    keyTopics: ["ACMG/AMP criteria", "Somatic classification", "Tier I-IV", "VUS", "gnomAD", "ClinVar", "Germline vs somatic"],
    clinicalRelevance: "Standardised variant classification prevents over-interpretation of uncertain findings and ensures appropriate hereditary cancer referrals. The AMP/ASCO/CAP framework directly informs targeted therapy eligibility reporting.",
    assessmentCount: 9,
    recommendedReading: [
      { title: "Standards and guidelines for the interpretation of sequence variants (ACMG/AMP 2015)", source: "Genetics in Medicine", year: 2015, pmid: "25741868", doi: "10.1038/gim.2015.30" },
      { title: "Standards and guidelines for the interpretation and reporting of sequence variants in cancer (AMP/ASCO/CAP)", source: "Journal of Molecular Diagnostics", year: 2017, pmid: "27993330" },
    ],
    studentSummary: "ACMG/AMP germline criteria use evidence from pathogenicity scores, protein impact, population frequency and functional studies. The somatic AMP/ASCO/CAP tier system prioritises variants by clinical actionability (Tier I: strong clinical significance; Tier II: potential clinical significance). VUS classification is a dynamic process requiring regular database re-query.",
    draftStatus: "published",
  },
  {
    week: 11, module: "Clinical Variant Interpretation", moduleId: 4,
    faculty: "Dr. Sabarinathan Radhakrishnan",
    title: "Clinical Evidence Databases and Therapeutic Actionability",
    lectureObjectives: [
      "Describe the major clinical evidence databases: CIViC, OncoKB, CGI and their curation principles",
      "Distinguish FDA-approved, off-label and investigational levels of evidence",
      "Explain variant-therapy interaction evidence and clinical trial matching",
      "Apply OncoKB levels to annotate a synthetic variant report",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Clinical evidence landscape: CIViC, OncoKB, CGI, JAX-CKB" },
      { time: "15–30 min", topic: "Levels of evidence: FDA-approved predictive biomarkers vs off-label" },
      { time: "30–45 min", topic: "Clinical trial matching based on genomic profile" },
      { time: "45–60 min", topic: "Resistance mechanisms and sequential therapy strategies" },
    ],
    workshopTitle: "OncoKB Annotation Workshop: Building a Synthetic Actionability Report",
    workshopObjectives: [
      "Assign OncoKB levels 1–4 to synthetic somatic variants",
      "Identify clinical trial eligibility from a molecular profile",
      "Annotate resistance variants (KRAS G12C acquired resistance)",
    ],
    keyTopics: ["OncoKB", "CIViC", "Therapeutic actionability", "Levels of evidence", "Clinical trial matching", "Resistance mechanisms"],
    clinicalRelevance: "Evidence databases provide structured, up-to-date clinical actionability annotations essential for molecular tumour board reporting. OncoKB Level 1 variants have FDA-approved companion diagnostic-matched therapies.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "OncoKB: A precision oncology knowledge base", source: "JCO Precision Oncology", year: 2017, pmid: "28890946", doi: "10.1200/PO.17.00011" },
      { title: "CIViC: a community knowledgebase for expert crowdsourcing the clinical interpretation of variants in cancer", source: "Nature Genetics", year: 2017, pmid: "28138153" },
    ],
    studentSummary: "Clinical knowledge bases curate variant-therapy evidence in structured formats. OncoKB levels 1-4 and CIViC evidence levels provide standardised frameworks for communicating actionability. Level 1 evidence (FDA-approved CDx-matched therapy) should always be highlighted in oncology reports.",
    draftStatus: "approved",
  },
  {
    week: 12, module: "Clinical Variant Interpretation", moduleId: 4,
    faculty: "Dr. Sabarinathan Radhakrishnan",
    title: "Molecular Oncology Reporting Standards and Communication",
    lectureObjectives: [
      "Describe CAP/AMP/ASCO molecular oncology reporting standards",
      "Structure a comprehensive molecular pathology report for a clinical audience",
      "Communicate genomic uncertainty appropriately to oncologists and patients",
      "Identify common reporting errors and their clinical consequences",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "CAP/AMP/ASCO reporting standards: required elements" },
      { time: "15–30 min", topic: "Tiered reporting structure: clinically significant vs incidental findings" },
      { time: "30–45 min", topic: "Communicating VUS, germline implications and hereditary referral triggers" },
      { time: "45–60 min", topic: "Quality metrics for molecular reports; turnaround time standards" },
    ],
    workshopTitle: "Report Writing Workshop: Drafting a Precision Oncology Report from Raw NGS Results",
    workshopObjectives: [
      "Structure a molecular pathology report from a synthetic NGS output",
      "Write a clinically actionable variant summary for a synthetic NSCLC case",
      "Review a deliberately flawed report and identify all errors",
    ],
    keyTopics: ["Reporting standards", "CAP/AMP/ASCO", "Molecular pathology report", "Report structure", "VUS communication", "Report quality"],
    clinicalRelevance: "Molecular reports directly guide oncology decisions. Standardised reporting reduces misinterpretation. Clear, structured communication of uncertainty and actionable findings is a core professional competency.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Principles of Molecular Testing Report Writing: a Practical Guide", source: "Archives of Pathology & Laboratory Medicine", year: 2022, doi: "10.5858/arpa.2021-0398-RA" },
    ],
    studentSummary: "A well-structured molecular oncology report contains a clinical summary, variant details with classification, evidence-based interpretation, therapeutic implications and appropriate caveats. VUS must be reported with explicit uncertainty statements. Germline implications require referral language.",
    draftStatus: "in_review",
  },
  {
    week: 13, module: "Precision Oncology", moduleId: 5,
    faculty: "Prof. Anguraj Sadanandam",
    title: "Personalised Medicine Frameworks and Oncotype Classification",
    lectureObjectives: [
      "Define precision oncology frameworks and molecular tumour classification systems",
      "Describe tumour-agnostic versus tumour-specific targeting strategies",
      "Explain PAM50, Oncotype DX and other expression-based classifiers",
      "Outline ESMO Scale for Clinical Actionability of molecular Targets (ESCAT)",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Precision oncology: genomic, transcriptomic and multi-omic frameworks" },
      { time: "15–30 min", topic: "Molecular tumour classification: consensus molecular subtypes, TCGA" },
      { time: "30–45 min", topic: "Expression-based classifiers: PAM50, Oncotype DX, MammaPrint" },
      { time: "45–60 min", topic: "ESCAT framework: ranking actionable targets for clinical decision-making" },
    ],
    workshopTitle: "ESCAT Application Workshop: Prioritising Molecular Targets in a Synthetic Metastatic Breast Cancer Case",
    workshopObjectives: [
      "Apply ESCAT tiers to rank targets from a synthetic molecular profile",
      "Distinguish scale I (high evidence) from scale X (not actionable) variants",
      "Develop a treatment sequencing strategy from an integrated precision oncology report",
    ],
    keyTopics: ["ESCAT", "PAM50", "Oncotype DX", "Consensus molecular subtypes", "Tumour-agnostic", "Molecular classification", "Multi-omic"],
    clinicalRelevance: "ESCAT provides a standardised framework for ranking actionability that is widely adopted in European oncology MTBs. Expression classifiers like Oncotype DX inform chemotherapy benefit in early breast cancer, reducing overtreatment.",
    assessmentCount: 9,
    recommendedReading: [
      { title: "ESCAT 2022: Ranking actionable targets for precision oncology", source: "Annals of Oncology", year: 2022, doi: "10.1016/j.annonc.2022.09.004" },
    ],
    studentSummary: "Precision oncology integrates genomic, transcriptomic and clinical data to individualise treatment. ESCAT is the leading European framework for ranking actionable targets. Expression classifiers in breast and colon cancer have changed practice by identifying patients who can safely avoid chemotherapy.",
    draftStatus: "published",
  },
  {
    week: 14, module: "Precision Oncology", moduleId: 5,
    faculty: "Prof. Anguraj Sadanandam",
    title: "Targeted Therapies, Resistance Mechanisms and Combination Strategies",
    lectureObjectives: [
      "Classify FDA-approved targeted therapies by drug class and genomic target",
      "Explain primary versus acquired resistance mechanisms for key targeted therapies",
      "Describe combination strategies to prevent or overcome resistance",
      "Discuss rational therapeutic sequencing based on molecular dynamics",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Kinase inhibitor classes: RTKIs, ALK/ROS1 inhibitors, CDK4/6 inhibitors, PARP inhibitors" },
      { time: "15–30 min", topic: "Resistance mechanisms: on-target (EGFR T790M, C797S), off-target, bypass signalling" },
      { time: "30–45 min", topic: "Liquid biopsy for resistance detection; ctDNA kinetics during treatment" },
      { time: "45–60 min", topic: "Combination and sequential therapy: osimertinib, CDK4/6i + aromatase inhibitor" },
    ],
    workshopTitle: "Resistance Mechanism Analysis: Synthetic EGFR-Mutant NSCLC Progression",
    workshopObjectives: [
      "Identify acquired resistance mechanisms in a synthetic liquid biopsy after osimertinib progression",
      "Select next-line therapy based on resistance genotype",
      "Design a monitoring strategy for a patient on osimertinib",
    ],
    keyTopics: ["EGFR inhibitors", "Osimertinib", "T790M", "C797S", "CDK4/6 inhibitors", "PARP inhibitors", "Acquired resistance", "Liquid biopsy monitoring"],
    clinicalRelevance: "EGFR T790M is the most common acquired resistance mechanism to 1st/2nd generation EGFR TKIs, addressed by osimertinib (3rd generation). Real-time resistance monitoring by liquid biopsy enables earlier treatment switches.",
    assessmentCount: 9,
    recommendedReading: [
      { title: "FLAURA: osimertinib in first-line EGFR-mutant NSCLC", source: "New England Journal of Medicine", year: 2018, pmid: "29979494", doi: "10.1056/NEJMoa1810868" },
    ],
    studentSummary: "Targeted therapy resistance is universal. Understanding on-target (secondary mutations) and off-target (bypass pathway) resistance mechanisms guides rational sequential treatment. Liquid biopsy enables non-invasive resistance mechanism detection, increasingly replacing tissue rebiopsy at progression.",
    draftStatus: "approved",
  },
  {
    week: 15, module: "Precision Oncology", moduleId: 5,
    faculty: "Prof. Anguraj Sadanandam",
    title: "Immunotherapy, Tumour-Agnostic Approvals and Biomarker-Driven Trials",
    lectureObjectives: [
      "Describe immune checkpoint inhibitor mechanisms: PD-1/PD-L1, CTLA-4",
      "Identify biomarker-driven FDA tumour-agnostic drug approvals",
      "Explain CAR-T cell therapy biomarker requirements in haematological malignancies",
      "Outline master protocols: basket, umbrella and adaptive trial designs",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Immune checkpoint biology and ICI mechanisms of action" },
      { time: "15–30 min", topic: "Tumour-agnostic approvals: pembrolizumab (dMMR/MSI-H), entrectinib (NTRK)" },
      { time: "30–45 min", topic: "CAR-T therapy: CD19, BCMA, emerging targets; cellular biomarkers" },
      { time: "45–60 min", topic: "Basket and umbrella trials: NCI-MATCH, TAPUR, ESMART" },
    ],
    workshopTitle: "Tumour-Agnostic Treatment Strategy: Building a MTB Recommendation for a Synthetic Multi-Tumour Cohort",
    workshopObjectives: [
      "Apply tumour-agnostic approval criteria across five synthetic cases",
      "Identify NTRK fusion across three tumour types",
      "Recommend ICI eligibility based on combined biomarker profiles",
    ],
    keyTopics: ["PD-1/PD-L1", "CTLA-4", "Immune checkpoint", "Tumour-agnostic", "NTRK", "CAR-T", "Basket trial", "NCI-MATCH"],
    clinicalRelevance: "The FDA NTRK and dMMR/MSI-H approvals represent the first true tumour-agnostic precision oncology indications. CAR-T cell therapies have transformed haematological oncology with curative potential.",
    assessmentCount: 9,
    recommendedReading: [
      { title: "Tumour-agnostic drug approvals: a framework for clinical translation", source: "Nature Reviews Clinical Oncology", year: 2021, doi: "10.1038/s41571-021-00499-x" },
    ],
    studentSummary: "Immune checkpoint inhibitors and tumour-agnostic targeted therapies represent the most significant recent advances in clinical oncology. NTRK fusions, dMMR/MSI-H and BRAF V600E are approved biomarkers for tumour-histology-independent treatment. Basket trial designs test these strategies efficiently across tumour types.",
    draftStatus: "in_review",
  },
  {
    week: 16, module: "Liquid Biopsy and Emerging Diagnostics", moduleId: 6,
    faculty: "Dr. Philip Beer",
    title: "Circulating Tumour DNA: Biology, Preanalytics and Clinical Applications",
    lectureObjectives: [
      "Explain the biology of ctDNA shedding and plasma cfDNA dynamics",
      "Describe pre-analytical variables affecting ctDNA quality",
      "Distinguish early detection, treatment monitoring and MRD applications",
      "Outline ctDNA sensitivity limitations and clinical interpretation challenges",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "cfDNA biology: tumour shedding mechanisms, fragment size, apoptosis vs necrosis" },
      { time: "15–30 min", topic: "Pre-analytics: collection tubes, processing, storage, extraction" },
      { time: "30–45 min", topic: "Clinical applications: treatment monitoring, MRD, early recurrence detection" },
      { time: "45–60 min", topic: "Sensitivity limitations: low-shedding tumours, CNS, early-stage cancers" },
    ],
    workshopTitle: "ctDNA Monitoring Strategy: Synthetic Colon Cancer Post-Surgery Surveillance",
    workshopObjectives: [
      "Design a post-operative ctDNA surveillance schedule for a synthetic stage III colon cancer",
      "Interpret ctDNA dynamics during adjuvant chemotherapy",
      "Determine clinical action threshold for ctDNA rise",
    ],
    keyTopics: ["ctDNA", "cfDNA", "Liquid biopsy", "MRD", "Pre-analytics", "Treatment monitoring", "Cancer early detection"],
    clinicalRelevance: "ctDNA MRD detection after curative intent surgery predicts recurrence months before clinical or radiological relapse. Multiple FDA breakthrough designations support ctDNA-guided adjuvant therapy trials (e.g., DYNAMIC-III).",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Circulating tumour DNA as a tool for assessing tumor progression", source: "ESMO Open", year: 2016, doi: "10.1136/esmoopen-2016-000106" },
    ],
    studentSummary: "ctDNA liquid biopsy enables minimally invasive tumour genomic profiling from plasma. Clinical applications span early detection, treatment monitoring, resistance detection and MRD assessment. Pre-analytical quality is critical: BCT tubes, rapid processing (<4 hours) and appropriate extraction methods preserve ctDNA integrity.",
    draftStatus: "approved",
  },
  {
    week: 17, module: "Liquid Biopsy and Emerging Diagnostics", moduleId: 6,
    faculty: "Dr. Philip Beer",
    title: "Multi-Cancer Early Detection and Circulating Biomarkers",
    lectureObjectives: [
      "Describe multi-cancer early detection (MCED) test principles and clinical trial evidence",
      "Explain methylation-based tissue-of-origin prediction in cfDNA",
      "Outline circulating tumour cells: biology, clinical applications and technical challenges",
      "Compare plasma proteomics and metabolomics as complementary diagnostic approaches",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "MCED tests: Galleri (GRAIL), CancerSEEK — principles and PATHFINDER/DETECT-A trial data" },
      { time: "15–30 min", topic: "Methylation-based tissue-of-origin (TOO) prediction" },
      { time: "30–45 min", topic: "Circulating tumour cells: EpCAM, epithelial-mesenchymal plasticity, clinical use in breast/prostate" },
      { time: "45–60 min", topic: "Emerging circulating biomarkers: exosomes, platelets, proteins, metabolites" },
    ],
    workshopTitle: "MCED Scenario Workshop: Evaluating a Positive Galleri Result in a Synthetic Screening Cohort",
    workshopObjectives: [
      "Interpret a Galleri-positive result in an asymptomatic individual",
      "Apply positive and negative predictive value concepts to MCED screening",
      "Design a confirmatory diagnostic pathway for a synthetic MCED-positive patient",
    ],
    keyTopics: ["MCED", "Galleri", "GRAIL", "Tissue-of-origin", "CTC", "Methylation cfDNA", "Exosomes", "Cancer screening"],
    clinicalRelevance: "Multi-cancer early detection tests represent a potential paradigm shift in cancer screening. The PATHFINDER trial demonstrated 1.4% positive rate with 38% true positives. Clinical integration pathways for positive MCED results require clear diagnostic workup protocols.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "PATHFINDER: Multi-cancer early detection screening in clinical practice", source: "The Lancet", year: 2023, doi: "10.1016/S0140-6736(23)01700-2" },
    ],
    studentSummary: "MCED tests based on cfDNA methylation signatures enable simultaneous multi-cancer screening from a single blood draw. Tissue-of-origin prediction directs diagnostic workup. While specificity is high (>99%), sensitivity varies by cancer type and stage. Clinical implementation requires robust confirmatory pathways.",
    draftStatus: "draft",
  },
  {
    week: 18, module: "Liquid Biopsy and Emerging Diagnostics", moduleId: 6,
    faculty: "Dr. Philip Beer",
    title: "Spatial Transcriptomics, Single-Cell Genomics and Future Diagnostics",
    lectureObjectives: [
      "Explain single-cell RNA sequencing and its applications in cancer biology and diagnostics",
      "Describe spatial transcriptomics and its clinical research applications",
      "Outline AI/machine learning applications in molecular diagnostics",
      "Identify the translational path from research discovery to clinical diagnostic test",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Single-cell sequencing: scRNA-seq, scATAC-seq, multiomics — clinical research insights" },
      { time: "15–30 min", topic: "Spatial transcriptomics: Visium, Xenium, clinical tumour mapping" },
      { time: "30–45 min", topic: "AI in diagnostics: computational pathology, variant classification ML, report automation" },
      { time: "45–60 min", topic: "Diagnostic development pipeline: analytical validation, clinical validation, regulatory approval" },
    ],
    workshopTitle: "Future Diagnostics Seminar: Evaluating a Single-Cell Study for Clinical Translation",
    workshopObjectives: [
      "Critically appraise a single-cell RNA-seq study for diagnostic potential",
      "Identify translational barriers: validation, standardisation, cost and regulatory pathway",
      "Design a simplified analytical validation study for a novel cfDNA test",
    ],
    keyTopics: ["Single-cell sequencing", "Spatial transcriptomics", "AI diagnostics", "Computational pathology", "Machine learning", "Diagnostic validation"],
    clinicalRelevance: "Computational pathology AI tools are approaching clinical deployment. Spatial transcriptomics is reshaping understanding of tumour-immune interfaces. Rigorous analytical and clinical validation remains the essential bridge between research discovery and clinical implementation.",
    assessmentCount: 7,
    recommendedReading: [
      { title: "Single-cell analyses of the tumour microenvironment", source: "Nature Reviews Cancer", year: 2022, doi: "10.1038/s41568-022-00482-5" },
    ],
    studentSummary: "Single-cell genomics and spatial transcriptomics reveal tumour heterogeneity and microenvironment dynamics at unprecedented resolution. AI-driven computational pathology is advancing from research tools to clinical-grade diagnostics. Analytical validation, clinical utility studies and regulatory approval remain essential steps before clinical adoption.",
    draftStatus: "draft",
  },
  {
    week: 19, module: "Advanced Molecular Oncology", moduleId: 7,
    faculty: "Prof. Anguraj Sadanandam",
    title: "Tumour Evolution, Clonal Dynamics and Intratumoural Heterogeneity",
    lectureObjectives: [
      "Apply phylogenetic methods to infer tumour evolutionary history from multi-region sequencing",
      "Explain neutral versus Darwinian selection models of tumour evolution",
      "Describe clonal haematopoiesis and its relevance to oncology diagnostics",
      "Identify clinical implications of intratumoural heterogeneity for biomarker testing",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Cancer evolution: neutral, punctuated and Darwinian selection models" },
      { time: "15–30 min", topic: "Multi-region sequencing and phylogenetic reconstruction" },
      { time: "30–45 min", topic: "Clonal haematopoiesis: CHIP, ARCH and confounding somatic liquid biopsy calls" },
      { time: "45–60 min", topic: "ITH and tumour heterogeneity implications for biopsy site, serial sampling" },
    ],
    workshopTitle: "Clonal Evolution Analysis: Tracing Tumour Phylogeny in a Synthetic Multi-Region Sequencing Dataset",
    workshopObjectives: [
      "Reconstruct a simple phylogenetic tree from synthetic multi-region VAF data",
      "Distinguish clonal from subclonal mutations and their biomarker implications",
      "Identify CHIP confounders in a synthetic liquid biopsy result",
    ],
    keyTopics: ["Clonal evolution", "ITH", "CHIP", "Phylogenetic tree", "Subclonal mutations", "Multi-region sequencing", "Neutral evolution"],
    clinicalRelevance: "Intratumoural heterogeneity explains why a single biopsy may miss subclonal driver mutations. CHIP is a major confounder in liquid biopsy interpretation, generating false-positive somatic calls. Understanding clonal dynamics informs treatment sequencing and resistance management.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Tumour heterogeneity and the evolution of polyclonal drug resistance", source: "Molecular Cell", year: 2016, pmid: "27135537", doi: "10.1016/j.molcel.2016.03.023" },
    ],
    studentSummary: "Tumours evolve through Darwinian selection of fitter clones. Multi-region sequencing reveals trunk (clonal) and branch (subclonal) mutations with different biomarker and therapeutic implications. CHIP — age-related somatic mutations in haematopoietic cells — is a critical false-positive confounder in plasma ctDNA analysis and must be distinguished using matched white cell sequencing.",
    draftStatus: "in_review",
  },
  {
    week: 20, module: "Advanced Molecular Oncology", moduleId: 7,
    faculty: "Prof. Anguraj Sadanandam",
    title: "Systems Biology, Multi-Omics Integration and Clinical Translation",
    lectureObjectives: [
      "Describe multi-omic data integration approaches: genomics, transcriptomics, proteomics, epigenomics",
      "Explain network biology and pathway enrichment analysis in cancer research",
      "Apply multi-omic classification systems to synthetic clinical datasets",
      "Critically appraise translational multi-omic studies for clinical utility",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Multi-omics landscape: data types, analytical frameworks and integration challenges" },
      { time: "15–30 min", topic: "TCGA multi-omic classifications and their clinical utility" },
      { time: "30–45 min", topic: "Pathway and network analysis: GSEA, pathway enrichment, protein-protein interaction" },
      { time: "45–60 min", topic: "Translational multi-omic studies: ISPY, AURORA, TRACERx — clinical lessons" },
    ],
    workshopTitle: "Multi-Omic Integration Exercise: Combining Genomic and Expression Data for Subtype Classification",
    workshopObjectives: [
      "Assign TCGA molecular subtype using a simplified synthetic gene expression matrix",
      "Interpret GSEA pathway enrichment results for a synthetic tumour dataset",
      "Assess the translational gap between a multi-omic discovery and a clinical test",
    ],
    keyTopics: ["Multi-omics", "TCGA", "GSEA", "Pathway enrichment", "Proteomics", "Epigenomics", "Systems biology", "TRACERx"],
    clinicalRelevance: "Multi-omic integration enables discovery of clinically relevant tumour subtypes beyond single-platform classification. TRACERx longitudinal multi-region multi-omic data has fundamentally reshaped understanding of NSCLC evolution and immune evasion.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "TCGA Pan-Cancer Atlas: Integrative Analyses", source: "Cell", year: 2018, doi: "10.1016/j.cell.2018.03.022" },
    ],
    studentSummary: "Multi-omic integration provides a comprehensive view of tumour biology beyond single-platform molecular profiling. TCGA Pan-Cancer Atlas demonstrates that multi-omic classification frequently transcends histological boundaries. GSEA and network analysis tools contextualise individual gene alterations within broader pathway landscapes.",
    draftStatus: "draft",
  },
  {
    week: 21, module: "Laboratory Quality and Implementation", moduleId: 8,
    faculty: "Dr. Nagarajan Kannan",
    title: "Molecular Diagnostics Laboratory Quality Management and Accreditation",
    lectureObjectives: [
      "Describe ISO 15189, CAP and CLIA accreditation requirements for molecular laboratories",
      "Explain analytical validation requirements for a new molecular assay",
      "Outline variant curation workflow and clinical interpretation governance",
      "Describe proficiency testing, audit and continual improvement processes",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Regulatory framework: ISO 15189, CAP/LAP checklist, CLIA" },
      { time: "15–30 min", topic: "Analytical validation: sensitivity, specificity, accuracy, precision, LOD" },
      { time: "30–45 min", topic: "Variant curation: MDT review, database queries, sign-out governance" },
      { time: "45–60 min", topic: "Proficiency testing, EQA, audit cycle and CAPA processes" },
    ],
    workshopTitle: "Validation Study Design: Planning an Analytical Validation for a New Somatic Panel",
    workshopObjectives: [
      "Design a minimal analytical validation study for a new 50-gene somatic panel",
      "Define acceptance criteria for sensitivity, specificity and reproducibility",
      "Prepare a simplified validation summary document",
    ],
    keyTopics: ["ISO 15189", "CAP accreditation", "CLIA", "Analytical validation", "LOD", "Proficiency testing", "Variant curation", "Governance"],
    clinicalRelevance: "Laboratory accreditation is a prerequisite for clinical molecular diagnostic service delivery. Rigorous analytical validation protects patients from inaccurate test results. Variant curation governance ensures consistent, evidence-based interpretation.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Analytical validation of next-generation sequencing assays for clinical molecular diagnostics", source: "Clinical Chemistry", year: 2017, doi: "10.1373/clinchem.2016.263459" },
    ],
    studentSummary: "Clinical molecular laboratories must achieve and maintain accreditation (ISO 15189 or CAP) demonstrating quality management, analytical performance and staff competency. New assay implementation requires formal analytical validation proving sensitivity, specificity, reproducibility and limit of detection before clinical use.",
    draftStatus: "approved",
  },
  {
    week: 22, module: "Molecular Tumour Board", moduleId: 9,
    faculty: "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi",
    title: "Molecular Tumour Board Structure, Governance and Case Presentation",
    lectureObjectives: [
      "Describe the structure, membership and governance of a molecular tumour board",
      "Outline the case presentation format and decision-making workflow",
      "Explain standards of evidence for MTB treatment recommendations",
      "Demonstrate effective case presentation skills using synthetic data",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "MTB rationale, composition, international models (ESMO, ESCAT)" },
      { time: "15–30 min", topic: "Case preparation: data gathering, molecular report annotation, evidence search" },
      { time: "30–45 min", topic: "MTB presentation format and structured decision documentation" },
      { time: "45–60 min", topic: "Governance: consent, data privacy, documentation, re-discussion criteria" },
    ],
    workshopTitle: "MTB Simulation 1: Presenting a Synthetic Metastatic Melanoma Case",
    workshopObjectives: [
      "Present a synthetic metastatic melanoma case using the MTB presentation format",
      "Defend a treatment recommendation with ESCAT-graded evidence",
      "Document an MTB decision using the standard template",
    ],
    keyTopics: ["Molecular tumour board", "ESCAT", "Case presentation", "MTB governance", "Treatment recommendation", "Evidence synthesis"],
    clinicalRelevance: "MTBs improve access to precision oncology expertise, standardise molecular report interpretation and facilitate trial enrolment. ESCAT and OncoKB provide the evidence grading frameworks most widely used in European and North American MTBs.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "Molecular Tumour Boards: current practice and future directions", source: "ESMO Open", year: 2022, doi: "10.1016/j.esmoop.2021.100316" },
    ],
    studentSummary: "MTBs are multidisciplinary teams combining clinical oncology, molecular pathology, bioinformatics and clinical genetics expertise to interpret complex molecular profiles and generate actionable treatment recommendations. Structured case presentation, standardised evidence grading and governance documentation are core MTB competencies.",
    draftStatus: "in_review",
  },
  {
    week: 23, module: "Molecular Tumour Board", moduleId: 9,
    faculty: "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi",
    title: "Advanced MTB Cases: Rare Tumours, Exceptional Responders and Refractory Disease",
    lectureObjectives: [
      "Apply precision oncology decision-making to rare tumour types",
      "Identify exceptional responder patterns and their molecular correlates",
      "Navigate molecularly-matched clinical trial identification for refractory disease",
      "Discuss ethical frameworks for off-label prescribing based on molecular evidence",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Rare tumours: sarcoma, ACC, ACC — molecular landscape and actionability" },
      { time: "15–30 min", topic: "Exceptional responders: defining, identifying and studying molecular correlates" },
      { time: "30–45 min", topic: "Clinical trial matching: MatchMiner, iMATCH, ESMO-ESCAT trial access" },
      { time: "45–60 min", topic: "Ethics of molecular oncology recommendations: compassionate use, uncertainty" },
    ],
    workshopTitle: "MTB Simulation 2: Rare Tumour and Refractory Disease — Advanced Case Workshop",
    workshopObjectives: [
      "Present a synthetic rare tumour (retroperitoneal dedifferentiated liposarcoma) at a simulated MTB",
      "Identify clinical trials from a synthetic molecular profile using trial-matching criteria",
      "Apply an ethical framework to a compassionate use treatment request",
    ],
    keyTopics: ["Rare tumours", "Exceptional responders", "Clinical trial matching", "Compassionate use", "Ethics in precision oncology"],
    clinicalRelevance: "Rare tumours disproportionately benefit from MTB assessment given limited standard therapy options. Exceptional responder programmes (NCI-MATCH) have identified actionable molecular events in uncommon responders, providing new treatment hypotheses.",
    assessmentCount: 8,
    recommendedReading: [
      { title: "NCI-MATCH: targeted therapy directed by molecular profiling in treatment-refractory tumors", source: "Journal of Clinical Oncology", year: 2021, doi: "10.1200/JCO.21.00235" },
    ],
    studentSummary: "Advanced MTB practice includes rare tumours with limited evidence bases, exceptional responder case review and ethical decision-making for molecularly-matched therapies without standard approval. Clinical trial matching platforms enable systematic identification of genomically-eligible trials for refractory patients.",
    draftStatus: "draft",
  },
  {
    week: 24, module: "Molecular Tumour Board", moduleId: 9,
    faculty: "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi",
    title: "Course Synthesis: Capstone MTB and Certificate Assessment",
    lectureObjectives: [
      "Integrate all course learning in a comprehensive MTB case presentation",
      "Demonstrate clinical reporting, variant interpretation and evidence synthesis competencies",
      "Reflect on the evolving landscape of molecular diagnostics and precision oncology",
      "Identify ongoing professional development pathways in molecular oncology",
    ],
    lectureOutline: [
      { time: "0–15 min", topic: "Course review and competency framework overview" },
      { time: "15–45 min", topic: "Capstone case presentation: student-led complex synthetic case MTB" },
      { time: "45–55 min", topic: "Panel feedback and assessment" },
      { time: "55–60 min", topic: "Future directions and professional development resources" },
    ],
    workshopTitle: "Capstone Assessment: Independent MTB Presentation and Precision Oncology Report",
    workshopObjectives: [
      "Complete a capstone assessment: prepare and present a full MTB case independently",
      "Submit a comprehensive precision oncology report for the synthetic case",
      "Receive structured faculty feedback and certification",
    ],
    keyTopics: ["Capstone assessment", "Certification", "Professional development", "Precision oncology competencies", "MTB presentation"],
    clinicalRelevance: "Capstone assessment validates achievement of all programme learning outcomes. The certificate in Molecular Diagnostics and Precision Oncology demonstrates clinical competency in genomic medicine to employers, licensing bodies and research institutions.",
    assessmentCount: 10,
    recommendedReading: [
      { title: "Genomic medicine: a primer", source: "New England Journal of Medicine", year: 2017, pmid: "28978217", doi: "10.1056/NEJMra1704748" },
    ],
    studentSummary: "The capstone assessment integrates all programme competencies from molecular oncology foundations through precision medicine and MTB practice. Graduates will be equipped to interpret molecular diagnostic reports, contribute to molecular tumour boards, and critically evaluate evidence for precision oncology treatment decisions.",
    draftStatus: "in_review",
  },
];

export function getWeeksByModule(moduleId: number): Week[] {
  return CURRICULUM.filter(w => w.moduleId === moduleId);
}

export function getModuleById(id: number): Module | undefined {
  return MODULES.find(m => m.id === id);
}

export function getWeekByNumber(week: number): Week | undefined {
  return CURRICULUM.find(w => w.week === week);
}
