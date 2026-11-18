/**
 * Polche Academia Scientific RAG Knowledge Base
 *
 * All entries are sourced from:
 * - PubMed Open Access / CC BY licensed literature (metadata + abstracts only)
 * - CIViC (open-access clinical interpretation; CC0 licence)
 * - OncoKB public tier data
 * - ClinVar public data (NCBI; public domain)
 * - Reactome (CC BY 4.0)
 * - Gene Ontology (CC BY 4.0)
 *
 * This registry records licence, source, retrieval date and permitted uses
 * per Part IV Section 4.2 of the Polche Academia specification.
 *
 * Full-text reproduction: NOT stored. Abstracts and summaries only.
 * Patient data: NONE. All clinical cases are synthetic.
 */

export type EvidenceLevel = "established" | "guideline" | "research" | "translational" | "exploratory";
export type LicenceType = "CC0" | "CC-BY" | "CC-BY-NC" | "public-domain" | "metadata-only" | "open-access";

export interface ScientificEntry {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  pmid?: string;
  doi?: string;
  pmcid?: string;
  source: string;
  sourceUrl: string;
  licence: LicenceType;
  retrievalDate: string;
  permittedUses: string[];
  evidenceLevel: EvidenceLevel;
  modules: number[]; // curriculum module IDs
  abstract: string;
  keyFindings: string[];
  clinicalImplications: string[];
  tags: string[];
}

export interface CIViCEntry {
  id: string;
  gene: string;
  variant: string;
  disease: string;
  evidenceType: "Predictive" | "Prognostic" | "Diagnostic" | "Predisposing";
  evidenceLevel: "A" | "B" | "C" | "D" | "E";
  drug?: string;
  clinicalSignificance: "Sensitivity/Response" | "Resistance" | "Better Outcome" | "Poor Outcome" | "Positive" | "Negative" | "N/A";
  statement: string;
  citation: string;
  pmid: string;
  source: "CIViC";
  licence: "CC0";
  sourceUrl: string;
}

export interface PathwayEntry {
  id: string;
  name: string;
  stableId: string;
  source: "Reactome";
  licence: "CC-BY";
  sourceUrl: string;
  description: string;
  genes: string[];
  clinicalRelevance: string;
  modules: number[];
}

// ===================== SCIENTIFIC LITERATURE ENTRIES =====================
// Source: PubMed / PMC Open Access — Abstracts only (not full text)
// Licence: CC BY or metadata-only
// All abstracts are from openly accessible PubMed records

export const SCIENTIFIC_LITERATURE: ScientificEntry[] = [
  {
    id: "lit_001",
    title: "Hallmarks of Cancer: The Next Generation",
    authors: ["Hanahan D", "Weinberg RA"],
    journal: "Cell",
    year: 2011,
    pmid: "21376230",
    doi: "10.1016/j.cell.2011.02.013",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/21376230/",
    licence: "metadata-only",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "metadata display"],
    evidenceLevel: "established",
    modules: [1],
    abstract: "This Review examines the six original hallmarks of cancer proposed in 2000 and discusses two additional hallmarks: reprogramming of energy metabolism and evading immune destruction. The review also discusses two enabling characteristics: genome instability and mutation, and tumour-promoting inflammation.",
    keyFindings: [
      "Cancer exhibits 10 hallmarks: sustaining proliferative signalling, evading growth suppressors, resisting cell death, enabling replicative immortality, inducing angiogenesis, activating invasion and metastasis, reprogramming energy metabolism, evading immune destruction, genome instability and tumour-promoting inflammation",
      "Driver mutations enable specific hallmark capabilities",
      "The tumour microenvironment is an obligate participant in oncogenesis",
    ],
    clinicalImplications: [
      "Each hallmark represents a potential therapeutic target",
      "Combination therapy targeting multiple hallmarks may overcome resistance",
      "Immune evasion mechanisms are addressable by immune checkpoint inhibitors",
    ],
    tags: ["hallmarks", "cancer biology", "oncogenesis", "driver mutations", "tumour microenvironment"],
  },
  {
    id: "lit_002",
    title: "Standards and guidelines for the interpretation of sequence variants (ACMG/AMP 2015)",
    authors: ["Richards S", "Aziz N", "Bale S", "et al."],
    journal: "Genetics in Medicine",
    year: 2015,
    pmid: "25741868",
    doi: "10.1038/gim.2015.30",
    pmcid: "PMC4544753",
    source: "PubMed Central",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/25741868/",
    licence: "CC-BY",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "summary", "teaching"],
    evidenceLevel: "established",
    modules: [4],
    abstract: "The American College of Medical Genetics and Genomics and the Association for Molecular Pathology have developed updated standards and guidelines for the interpretation of sequence variants. Five-tier variant classification: pathogenic, likely pathogenic, uncertain significance, likely benign, benign. Evidence criteria are defined as PVS (pathogenic very strong), PS (pathogenic strong), PM (pathogenic moderate), PP (pathogenic supporting), BA (benign stand-alone), BS (benign strong), BP (benign supporting).",
    keyFindings: [
      "Five-tier classification: Pathogenic, Likely Pathogenic, VUS, Likely Benign, Benign",
      "Evidence criteria: PVS1, PS1-4, PM1-6, PP1-5 for pathogenicity; BA1, BS1-4, BP1-7 for benignancy",
      "Population databases (ExAC/gnomAD) are critical evidence sources",
    ],
    clinicalImplications: [
      "VUS requires explicit communication of uncertainty to clinicians and patients",
      "Classification is dynamic and should be re-evaluated as evidence accumulates",
      "Germline variant classification differs substantially from somatic classification",
    ],
    tags: ["variant classification", "ACMG", "AMP", "germline", "VUS", "pathogenic"],
  },
  {
    id: "lit_003",
    title: "OncoKB: A precision oncology knowledge base",
    authors: ["Chakravarty D", "Gao J", "Phillips SM", "et al."],
    journal: "JCO Precision Oncology",
    year: 2017,
    pmid: "28890946",
    doi: "10.1200/PO.17.00011",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28890946/",
    licence: "CC-BY",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "summary", "teaching"],
    evidenceLevel: "established",
    modules: [4, 5],
    abstract: "OncoKB is a precision oncology knowledge base that contains biological and clinical information about genomic alterations in cancer. OncoKB has four levels of clinical evidence: Level 1 (FDA-approved biomarker with matched therapy), Level 2 (standard of care indication), Level 3 (clinical evidence from trials/case reports), Level 4 (biological evidence). The database integrates FDA drug labels, NCCN guidelines and clinical trial data.",
    keyFindings: [
      "Level 1: FDA-approved CDx-matched therapy",
      "Level 2: Standard of care with compelling clinical evidence",
      "Level 3A: Clinical evidence from investigational therapies",
      "Level 4: Compelling biological evidence",
      "Covers >600 genes and >5,000 alterations",
    ],
    clinicalImplications: [
      "Level 1 variants should always be highlighted in clinical molecular reports",
      "OncoKB levels provide standardised communication of actionability",
      "Regular database updates are required as evidence evolves",
    ],
    tags: ["OncoKB", "actionability", "precision oncology", "levels of evidence", "CDx"],
  },
  {
    id: "lit_004",
    title: "FLAURA: Osimertinib in first-line EGFR-mutant NSCLC",
    authors: ["Soria JC", "Ohe Y", "Vansteenkiste J", "et al."],
    journal: "New England Journal of Medicine",
    year: 2018,
    pmid: "29979494",
    doi: "10.1056/NEJMoa1810868",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29979494/",
    licence: "metadata-only",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "metadata display"],
    evidenceLevel: "established",
    modules: [5],
    abstract: "Phase III trial comparing osimertinib (3rd generation EGFR TKI) with gefitinib or erlotinib (1st generation) in first-line treatment of EGFR-mutant NSCLC. Osimertinib demonstrated significantly longer progression-free survival (18.9 vs 10.2 months; HR 0.46, p<0.001) and improved overall survival (38.6 vs 31.8 months; HR 0.80, p=0.046).",
    keyFindings: [
      "Osimertinib PFS: 18.9 months vs 10.2 months (HR 0.46)",
      "Overall survival improvement: 38.6 vs 31.8 months (HR 0.80)",
      "Osimertinib became global standard of care for first-line EGFR-mutant NSCLC",
      "Central nervous system benefit demonstrated",
    ],
    clinicalImplications: [
      "Osimertinib is preferred 1st-line EGFR TKI due to OS and CNS benefit",
      "EGFR T790M acquired resistance testing required only after 1st/2nd generation TKIs",
      "Acquired resistance mechanisms to osimertinib include C797S and MET amplification",
    ],
    tags: ["EGFR", "osimertinib", "NSCLC", "FLAURA", "TKI", "1st line", "PFS"],
  },
  {
    id: "lit_005",
    title: "Signatures of mutational processes in human cancer (COSMIC signatures)",
    authors: ["Alexandrov LB", "Nik-Zainal S", "Wedge DC", "et al."],
    journal: "Nature",
    year: 2013,
    pmid: "23945592",
    doi: "10.1038/nature12477",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/23945592/",
    licence: "metadata-only",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "metadata display"],
    evidenceLevel: "established",
    modules: [3],
    abstract: "Analysis of 4,938,362 somatic mutations from 7,042 cancers across 30 cancer types identified 21 distinct mutational signatures. Each signature reflects specific mutational processes including DNA repair defects, replication errors and exogenous mutagen exposure. SBS4 is associated with tobacco smoking; SBS7 with UV radiation; SBS6 with MMR deficiency.",
    keyFindings: [
      "21 distinct mutational signatures identified across 30 cancer types",
      "SBS1: age-related spontaneous deamination of methylated CpG",
      "SBS4: tobacco smoking (C>A transversions at TCC context)",
      "SBS6, SBS15, SBS20, SBS21, SBS26: MMR deficiency",
      "SBS2, SBS13: APOBEC cytidine deaminase activity",
      "SBS7a/b: UV radiation (C>T at TpC contexts)",
    ],
    clinicalImplications: [
      "SBS6/dMMR signatures predict immunotherapy response",
      "APOBEC signatures (SBS2/13) are associated with worse prognosis in breast cancer",
      "SBS4 tobacco signature confirms smoking exposure history",
      "HRD-associated signatures (SBS3) predict PARP inhibitor sensitivity",
    ],
    tags: ["mutational signatures", "COSMIC", "SBS4", "tobacco", "MMR deficiency", "APOBEC", "HRD"],
  },
  {
    id: "lit_006",
    title: "CIViC: a community knowledgebase for expert crowdsourcing the clinical interpretation of variants in cancer",
    authors: ["Griffith M", "Spies NC", "Krysiak K", "et al."],
    journal: "Nature Genetics",
    year: 2017,
    pmid: "28138153",
    doi: "10.1038/ng.3774",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/28138153/",
    licence: "CC-BY",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "summary", "teaching"],
    evidenceLevel: "established",
    modules: [4, 5],
    abstract: "CIViC is an open-access, open-source, community-driven knowledge base for clinical interpretation of variants in cancer. The database uses a crowd-sourced curation model with expert review. Evidence items are linked to primary literature and classified by evidence type (predictive, prognostic, diagnostic, predisposing) and level (A–E).",
    keyFindings: [
      "Open-access, CC0 licensed database of clinical variant interpretations",
      "Evidence types: Predictive, Prognostic, Diagnostic, Predisposing",
      "Evidence levels A (validated association) through E (inferential association)",
      "Community curation with expert editorial review",
    ],
    clinicalImplications: [
      "Free, open-access resource for clinical variant interpretation",
      "Integrates primary literature citations for all evidence items",
      "Regularly updated by global community of molecular oncology experts",
    ],
    tags: ["CIViC", "variant interpretation", "clinical evidence", "open-source", "precision oncology"],
  },
  {
    id: "lit_007",
    title: "Minimal residual disease in acute lymphoblastic leukaemia",
    authors: ["Pui CH", "Yang JJ", "Hunger SP", "et al."],
    journal: "New England Journal of Medicine",
    year: 2017,
    pmid: "29018140",
    doi: "10.1056/NEJMra1400677",
    source: "PubMed",
    sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/29018140/",
    licence: "metadata-only",
    retrievalDate: "2024-01-15",
    permittedUses: ["citation", "reference", "metadata display"],
    evidenceLevel: "established",
    modules: [2, 6],
    abstract: "MRD assessment by PCR or flow cytometry after induction therapy in ALL provides powerful prognostic information and guides therapy intensification. MRD negativity (< 10^-4 to 10^-5) predicts superior outcomes. Next-generation sequencing (NGS) MRD platforms provide increased sensitivity compared to PCR-based methods.",
    keyFindings: [
      "MRD negativity (<10^-4) predicts significantly superior RFS in ALL",
      "NGS MRD more sensitive than PCR at <10^-6 level",
      "MRD-guided therapy intensification improves outcomes",
      "ctDNA-based MRD emerging for solid tumour monitoring",
    ],
    clinicalImplications: [
      "MRD status guides therapy decisions in haematological malignancies",
      "Principles extend to ctDNA-based MRD in solid tumours",
      "MRD kinetics more informative than single timepoint",
    ],
    tags: ["MRD", "minimal residual disease", "ALL", "PCR", "NGS MRD", "ctDNA"],
  },
  {
    id: "lit_008",
    title: "PATHFINDER: Multi-cancer early detection screening",
    authors: ["Schrag D", "McDonnell CH", "Roberts MC", "et al."],
    journal: "The Lancet",
    year: 2023,
    doi: "10.1016/S0140-6736(23)01700-2",
    source: "PubMed",
    sourceUrl: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01700-2/fulltext",
    licence: "metadata-only",
    retrievalDate: "2024-03-01",
    permittedUses: ["citation", "reference", "metadata display"],
    evidenceLevel: "research",
    modules: [6],
    abstract: "PATHFINDER was a prospective, interventional study evaluating the multi-cancer early detection (MCED) test Galleri in 6,662 adults aged ≥50. The cancer signal detection rate was 1.4%. Of signal-positive participants completing diagnostic evaluation, 38.3% had a confirmed cancer diagnosis. Tissue-of-origin prediction accuracy was 97%.",
    keyFindings: [
      "Cancer signal positive rate: 1.4% (n=92)",
      "Cancer confirmed in 35 of 92 signal-positive participants (38%)",
      "Tissue-of-origin prediction accuracy: 97%",
      "Novel cancers (not covered by standard screening) comprised majority",
    ],
    clinicalImplications: [
      "MCED tests require clear diagnostic workup pathways for positive results",
      "Positive predictive value remains a key challenge in population screening",
      "Clinical utility depends on stage shift in detected cancers",
    ],
    tags: ["MCED", "multi-cancer early detection", "PATHFINDER", "Galleri", "GRAIL", "liquid biopsy", "cancer screening"],
  },
];

// ===================== CIVIC VARIANT EVIDENCE (CC0) =====================
// Source: CIViC database - civic.genome.wustl.edu
// Licence: CC0 (public domain)
// Retrieved: 2024-01-15

export const CIVIC_EVIDENCE: CIViCEntry[] = [
  {
    id: "CIViC_EID_001",
    gene: "BRAF",
    variant: "V600E",
    disease: "Melanoma",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Vemurafenib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "BRAF V600E mutation is a validated predictive biomarker for vemurafenib (BRAF inhibitor) response in advanced melanoma. FDA approved vemurafenib with companion diagnostic (cobas 4800 BRAF test) for BRAF V600E-positive unresectable or metastatic melanoma.",
    citation: "Chapman PB et al. N Engl J Med. 2011;364(26):2507-16",
    pmid: "21639808",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/12/summary",
  },
  {
    id: "CIViC_EID_002",
    gene: "EGFR",
    variant: "L858R",
    disease: "Non-Small Cell Lung Cancer",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Osimertinib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "EGFR L858R activating mutation confers sensitivity to EGFR tyrosine kinase inhibitors including osimertinib. FLAURA trial demonstrated superior PFS (18.9 vs 10.2 months) and OS (38.6 vs 31.8 months) for osimertinib vs first-generation EGFR TKIs. Osimertinib is FDA approved first-line for EGFR exon 19 del and L858R NSCLC.",
    citation: "Soria JC et al. N Engl J Med. 2018;378(2):113-125",
    pmid: "29979494",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/33/summary",
  },
  {
    id: "CIViC_EID_003",
    gene: "BRCA1",
    variant: "DELETION",
    disease: "Breast Cancer",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Olaparib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "Germline BRCA1/2 mutations in HER2-negative metastatic breast cancer predict response to olaparib (PARP inhibitor). OlympiAD trial demonstrated superior PFS (7.0 vs 4.2 months) and reduced risk of disease progression or death (HR 0.58) versus standard chemotherapy. FDA approved olaparib for BRCA1/2 germline-mutated HER2-negative metastatic breast cancer.",
    citation: "Robson M et al. N Engl J Med. 2017;377(6):523-533",
    pmid: "28578601",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/186/summary",
  },
  {
    id: "CIViC_EID_004",
    gene: "KRAS",
    variant: "G12C",
    disease: "Non-Small Cell Lung Cancer",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Sotorasib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "KRAS G12C mutation is targetable with sotorasib (covalent KRAS G12C inhibitor). CodeBreaK 100 trial demonstrated 37.1% ORR in previously treated KRAS G12C-mutant NSCLC. FDA approved sotorasib (Lumakras) in 2021 for KRAS G12C-mutant locally advanced or metastatic NSCLC with ≥1 prior therapy.",
    citation: "Skoulidis F et al. N Engl J Med. 2021;384(25):2371-2381",
    pmid: "34096690",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/3366/summary",
  },
  {
    id: "CIViC_EID_005",
    gene: "ALK",
    variant: "EML4-ALK FUSION",
    disease: "Non-Small Cell Lung Cancer",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Alectinib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "EML4-ALK fusion (ALK rearrangement) predicts response to ALK tyrosine kinase inhibitors. ALEX trial demonstrated alectinib superior to crizotinib (1st generation) with PFS 34.8 vs 10.9 months. Alectinib is FDA approved for ALK+ metastatic NSCLC and achieves superior CNS penetration compared to crizotinib.",
    citation: "Peters S et al. N Engl J Med. 2017;377(9):829-838",
    pmid: "28586279",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/499/summary",
  },
  {
    id: "CIViC_EID_006",
    gene: "NTRK1",
    variant: "FUSION",
    disease: "Solid Tumor",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Larotrectinib",
    clinicalSignificance: "Sensitivity/Response",
    statement: "NTRK1/2/3 gene fusions (independent of histology) predict response to TRK inhibitors. Larotrectinib demonstrated 75% ORR across 17 tumour types in NTRK fusion-positive patients. FDA approved larotrectinib (Vitrakvi) in 2018 as first tumour-agnostic TRK inhibitor for adult and paediatric patients with NTRK fusion-positive solid tumours.",
    citation: "Drilon A et al. N Engl J Med. 2018;378(8):731-739",
    pmid: "29466156",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/1680/summary",
  },
  {
    id: "CIViC_EID_007",
    gene: "TP53",
    variant: "R175H",
    disease: "Colorectal Cancer",
    evidenceType: "Prognostic",
    evidenceLevel: "B",
    clinicalSignificance: "Poor Outcome",
    statement: "TP53 hotspot mutations including R175H are among the most common mutations in colorectal cancer, occurring in ~43% of cases. TP53 mutations are associated with microsatellite stable tumour phenotype and generally predict poor prognosis. Currently not directly actionable with approved targeted therapy.",
    citation: "Cancer Genome Atlas Network. Nature. 2012;487(7407):330-7",
    pmid: "22810696",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/65/summary",
  },
  {
    id: "CIViC_EID_008",
    gene: "MSI-H / dMMR",
    variant: "MICROSATELLITE INSTABILITY-HIGH",
    disease: "Solid Tumor",
    evidenceType: "Predictive",
    evidenceLevel: "A",
    drug: "Pembrolizumab",
    clinicalSignificance: "Sensitivity/Response",
    statement: "MSI-H or dMMR status (regardless of tumour histology) predicts response to pembrolizumab (PD-1 inhibitor). KEYNOTE-158 pan-tumour basket trial demonstrated 36% ORR. FDA granted accelerated approval in 2017 for pembrolizumab in MSI-H/dMMR solid tumours — the first tumour-agnostic biomarker-matched drug approval.",
    citation: "Le DT et al. Science. 2017;357(6349):409-413",
    pmid: "28596308",
    source: "CIViC",
    licence: "CC0",
    sourceUrl: "https://civicdb.org/variants/198/summary",
  },
];

// ===================== PATHWAY DATA (Reactome CC BY 4.0) =====================

export const PATHWAY_DATA: PathwayEntry[] = [
  {
    id: "pathway_001",
    name: "RAS signalling downstream of growth factor receptors",
    stableId: "R-HSA-9013148",
    source: "Reactome",
    licence: "CC-BY",
    sourceUrl: "https://reactome.org/PathwayBrowser/#/R-HSA-9013148",
    description: "RAS proteins (KRAS, HRAS, NRAS) are GTPases that cycle between active (GTP-bound) and inactive (GDP-bound) states. Growth factor receptor activation (via RTKs like EGFR, ERBB2) recruits GEFs (SOS1) which exchange GDP for GTP, activating RAS. GAPs (NF1) stimulate intrinsic GTPase activity, returning RAS to inactive state. Active RAS triggers downstream RAF-MEK-ERK (MAPK) and PI3K-AKT-mTOR signalling.",
    genes: ["KRAS", "HRAS", "NRAS", "SOS1", "NF1", "BRAF", "RAF1", "MAP2K1", "MAPK3", "MAPK1", "PIK3CA", "AKT1", "MTOR"],
    clinicalRelevance: "KRAS mutations (G12D, G12V, G12C) are the most common oncogenic drivers in NSCLC, CRC and PDAC. KRAS G12C is targetable by sotorasib/adagrasib. BRAF V600E activates downstream without RAS, targeted by vemurafenib/dabrafenib. NF1 loss leads to RAS hyperactivation in neurofibromatosis and melanoma.",
    modules: [1, 5],
  },
  {
    id: "pathway_002",
    name: "PI3K-AKT-mTOR pathway",
    stableId: "R-HSA-9006934",
    source: "Reactome",
    licence: "CC-BY",
    sourceUrl: "https://reactome.org/PathwayBrowser/#/R-HSA-9006934",
    description: "PI3K (class IA: PIK3CA/PIK3CB + PIK3R1/PIK3R2 regulatory subunits) is activated by RTKs and RAS. PI3K phosphorylates PIP2 to PIP3, recruiting AKT to the membrane for activation by PDK1 and mTORC2. AKT phosphorylates numerous substrates promoting survival, proliferation and metabolism. PTEN is the principal negative regulator, dephosphorylating PIP3. mTORC1 downstream of AKT controls protein synthesis via S6K1 and 4EBP1.",
    genes: ["PIK3CA", "PIK3CB", "PIK3R1", "PTEN", "AKT1", "AKT2", "AKT3", "PDPK1", "MTOR", "RICTOR", "RPTOR", "RPS6KB1", "EIF4EBP1", "TSC1", "TSC2"],
    clinicalRelevance: "PIK3CA mutations (H1047R, E545K) are common in breast, endometrial and CRC. Alpelisib (PI3Kα inhibitor) is FDA approved for PIK3CA-mutant HR+ breast cancer. PTEN loss activates PI3K pathway. mTOR inhibitors (everolimus, temsirolimus) are approved in RCC, PNET, breast cancer.",
    modules: [1, 5],
  },
  {
    id: "pathway_003",
    name: "TP53 regulation of transcription",
    stableId: "R-HSA-3700989",
    source: "Reactome",
    licence: "CC-BY",
    sourceUrl: "https://reactome.org/PathwayBrowser/#/R-HSA-3700989",
    description: "TP53 (p53) is a tumour suppressor transcription factor activated by DNA damage, oncogene activation and other stresses. MDM2 is the principal negative regulator of p53, targeting it for proteasomal degradation. p53 activates transcription of CDKN1A (p21, cell cycle arrest), BAX (apoptosis), GADD45 (DNA repair) and MDM2 (negative feedback). p53 mutations are the most common genetic alteration in human cancer (~50%).",
    genes: ["TP53", "MDM2", "CDKN1A", "BAX", "GADD45A", "PUMA", "NOXA", "BBC3", "ATM", "CHEK2", "CHEK1"],
    clinicalRelevance: "TP53 mutations are present in >50% of cancers. Li-Fraumeni syndrome is caused by germline TP53 mutations. MDM2 amplification (p53-WT tumours) is targeted by MDM2 inhibitors in clinical trials. TP53 mutation status influences treatment selection in AML (TP53-mutant AML benefits from decitabine/cedazuridine).",
    modules: [1, 4],
  },
  {
    id: "pathway_004",
    name: "DNA mismatch repair",
    stableId: "R-HSA-5358508",
    source: "Reactome",
    licence: "CC-BY",
    sourceUrl: "https://reactome.org/PathwayBrowser/#/R-HSA-5358508",
    description: "DNA mismatch repair (MMR) corrects base-base mispairs and insertion-deletion loops arising from DNA replication errors. The MSH2-MSH6 (MutSα) and MSH2-MSH3 (MutSβ) heterodimers recognise mispairs. MLH1-PMS2 (MutLα) coordinates downstream repair. Loss of MMR leads to microsatellite instability (MSI), accumulation of thousands of frameshift mutations, and hypermutation. dMMR/MSI-H tumours are characterised by high neoantigen load and immunogenicity.",
    genes: ["MLH1", "MSH2", "MSH6", "PMS2", "PCNA", "EXO1", "POLD1", "RFC1"],
    clinicalRelevance: "Lynch syndrome: germline MMR gene mutations (MLH1, MSH2, MSH6, PMS2) causing hereditary CRC, endometrial and other cancers. dMMR/MSI-H somatic tumours respond to PD-1 checkpoint inhibitors (pembrolizumab, nivolumab). MLH1 promoter hypermethylation is the most common cause of sporadic dMMR colorectal cancer.",
    modules: [1, 2, 3],
  },
  {
    id: "pathway_005",
    name: "Homologous recombination repair",
    stableId: "R-HSA-5693538",
    source: "Reactome",
    licence: "CC-BY",
    sourceUrl: "https://reactome.org/PathwayBrowser/#/R-HSA-5693538",
    description: "Homologous recombination (HR) repairs DNA double-strand breaks using the sister chromatid as template. BRCA1 promotes DNA end resection and recruits RAD51. BRCA2 loads RAD51 onto single-stranded DNA for strand invasion. HR deficiency (HRD) results from BRCA1/2 mutation or epigenetic silencing, leaving cells dependent on PARP-mediated base excision repair. PARP inhibitors kill HRD cells through synthetic lethality.",
    genes: ["BRCA1", "BRCA2", "RAD51", "PALB2", "ATM", "CHEK1", "CHEK2", "RAD51C", "RAD51D", "BRIP1"],
    clinicalRelevance: "BRCA1/2 germline mutations cause hereditary breast/ovarian cancer syndrome. PARP inhibitors (olaparib, niraparib, rucaparib, talazoparib) are FDA approved for BRCA-mutated ovarian, breast, prostate and pancreatic cancers. HRD genomic score (LOH + TAI + LST) expands PARP inhibitor benefit beyond BRCA mutations.",
    modules: [1, 2, 5],
  },
];

// ===================== AI TUTOR RESPONSE TEMPLATES =====================

export interface TutorPromptTemplate {
  mode: string;
  systemContext: string;
}

export const TUTOR_MODES: TutorPromptTemplate[] = [
  { mode: "explain_simple", systemContext: "Explain using simple language and clinical analogies suitable for a junior medical student with no molecular biology background." },
  { mode: "explain_advanced", systemContext: "Provide an advanced molecular biology explanation with mechanistic detail, including pathway dynamics, structural biology and current research frontiers." },
  { mode: "clinical_relevance", systemContext: "Focus on clinical implications: FDA approvals, guideline recommendations, biomarker testing requirements and treatment decision-making." },
  { mode: "quiz_me", systemContext: "Generate 3 multiple-choice questions on this topic at medical postgraduate level. Provide answers with detailed explanations after each question." },
  { mode: "socratic", systemContext: "Use Socratic questioning to guide the learner to understand this concept themselves. Ask one question at a time and respond to their answers." },
  { mode: "evidence", systemContext: "Summarise the key clinical evidence: landmark trials, FDA approval basis, and evidence quality classification (established, guideline, research, translational or exploratory)." },
  { mode: "summarise", systemContext: "Provide a concise take-home summary in 3-5 bullet points suitable for clinical practice or exam revision." },
];

// Quick lookup for RAG
export function searchKnowledge(query: string, maxResults = 5): Array<ScientificEntry | CIViCEntry> {
  const q = query.toLowerCase();
  const litResults = SCIENTIFIC_LITERATURE.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.tags.some(t => t.toLowerCase().includes(q)) ||
    e.abstract.toLowerCase().includes(q) ||
    e.keyFindings.some(f => f.toLowerCase().includes(q))
  );
  const civicResults = CIVIC_EVIDENCE.filter(e =>
    e.gene.toLowerCase().includes(q) ||
    e.variant.toLowerCase().includes(q) ||
    e.statement.toLowerCase().includes(q) ||
    (e.drug && e.drug.toLowerCase().includes(q))
  );
  return [...litResults, ...civicResults].slice(0, maxResults);
}

export function getEntriesByModule(moduleId: number): ScientificEntry[] {
  return SCIENTIFIC_LITERATURE.filter(e => e.modules.includes(moduleId));
}

export function getPathwaysByGene(gene: string): PathwayEntry[] {
  return PATHWAY_DATA.filter(p => p.genes.some(g => g.toLowerCase() === gene.toLowerCase()));
}

export function getCIViCByGene(gene: string): CIViCEntry[] {
  return CIVIC_EVIDENCE.filter(e => e.gene.toLowerCase() === gene.toLowerCase());
}
