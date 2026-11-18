/**
 * SYNTHETIC NGS CASES — Polche Academia
 *
 * All patients, clinical histories, genomic findings and results in this file
 * are entirely SYNTHETIC and FICTITIOUS.
 *
 * These cases were created de novo for educational purposes.
 * No real patient data, identifiable information or controlled-access
 * genomic datasets were used. These cases do not represent real individuals
 * and cannot be used for clinical decision-making.
 *
 * Educational use only.
 */

export type VariantClassification = "Pathogenic" | "Likely Pathogenic" | "VUS" | "Likely Benign" | "Benign";
export type SomaticTier = "Tier I" | "Tier II" | "Tier III" | "Tier IV";
export type ClinicalActionability = "Therapeutic" | "Prognostic" | "Diagnostic" | "Investigational" | "Unknown";

export interface SyntheticVariant {
  gene: string;
  exon?: string;
  transcript: string;
  cDNA: string;
  protein: string;
  variantType: "SNV" | "Indel" | "CNV" | "Fusion" | "SV";
  vaf: number; // variant allele frequency 0–1
  coverageDepth: number;
  altReads: number;
  refReads: number;
  chromosome: string;
  position: number;
  classification: VariantClassification;
  somaticTier: SomaticTier;
  actionability: ClinicalActionability;
  oncokbLevel?: "1" | "2" | "3A" | "3B" | "4" | "R1" | "R2";
  civic?: string;
  interpretation: string;
  therapeuticImplication?: string;
  resistance?: boolean;
  notes?: string;
}

export interface QCMetrics {
  meanCoverage: number;
  uniformity: number; // % bases >100x
  duplicationRate: number;
  q30Bases: number; // % bases quality ≥30
  tumorPurity: number; // 0–1
  passQC: boolean;
  failReasons?: string[];
}

export interface SyntheticNGSCase {
  id: string;
  caseCode: string; // anonymised code
  syntheticAge: number;
  gender: "Male" | "Female";
  tumourType: string;
  tumourSite: string;
  histology: string;
  stage: string;
  clinicalHistory: string;
  specimenType: "FFPE" | "Fresh frozen" | "Liquid biopsy";
  assayName: string;
  panelGenes: number;
  sequencingPlatform: string;
  qcMetrics: QCMetrics;
  variants: SyntheticVariant[];
  cnvFindings: { gene: string; alteration: string; foldChange: number; clinical: string }[];
  msi: "MSI-H" | "MSI-L" | "MSS";
  tmb: number; // mutations per megabase
  hrdScore?: number; // 0–100; ≥42 positive
  mutationalSignatures: { signature: string; proportion: number; interpretation: string }[];
  reportSummary: string;
  teachingPoints: string[];
  modelAnswer: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  moduleLink: number; // curriculum module
  weekLink: number;
}

export const NGS_CASES: SyntheticNGSCase[] = [
  // ============================================================
  // CASE 1: NSCLC with EGFR L858R — Week 1 / Module 1 intro
  // ============================================================
  {
    id: "ngs_case_001",
    caseCode: "SYNTH-LUNG-001",
    syntheticAge: 58,
    gender: "Female",
    tumourType: "Non-Small Cell Lung Cancer",
    tumourSite: "Right upper lobe, lung",
    histology: "Lung adenocarcinoma",
    stage: "Stage IV (pleural effusion, bilateral pulmonary nodules)",
    clinicalHistory: "58-year-old non-smoking female with 3-month history of progressive dyspnoea, dry cough and right-sided pleural effusion. CT showed right upper lobe mass 3.2 cm, bilateral pulmonary nodules and right-sided pleural effusion. PET confirmed FDG-avid primary mass and pulmonary nodules. Brain MRI negative. Pleural fluid cytology: adenocarcinoma. Requested: comprehensive somatic genomic profiling for treatment planning.",
    specimenType: "FFPE",
    assayName: "Polche OncoPanelv2 (500-gene comprehensive somatic panel)",
    panelGenes: 500,
    sequencingPlatform: "Illumina NovaSeq 6000",
    qcMetrics: {
      meanCoverage: 847,
      uniformity: 98.2,
      duplicationRate: 12.3,
      q30Bases: 94.7,
      tumorPurity: 0.72,
      passQC: true,
    },
    variants: [
      {
        gene: "EGFR",
        exon: "21",
        transcript: "NM_005228.5",
        cDNA: "c.2573T>G",
        protein: "p.Leu858Arg",
        variantType: "SNV",
        vaf: 0.47,
        coverageDepth: 1024,
        altReads: 481,
        refReads: 543,
        chromosome: "7",
        position: 55259515,
        classification: "Pathogenic",
        somaticTier: "Tier I",
        actionability: "Therapeutic",
        oncokbLevel: "1",
        civic: "CIViC_EID_002",
        interpretation: "EGFR p.Leu858Arg (L858R) is a well-characterised activating point mutation in exon 21 of the EGFR kinase domain. L858R constitutively activates EGFR kinase activity, driving cell proliferation via RAS-MAPK and PI3K-AKT-mTOR signalling. This mutation occurs in ~40% of EGFR-mutant lung adenocarcinomas.",
        therapeuticImplication: "EGFR L858R is an FDA-approved predictive biomarker for first-line osimertinib (Tagrisso; FLAURA trial, PFS 18.9 months, OS 38.6 months). Osimertinib is preferred over erlotinib/gefitinib due to superior efficacy and CNS penetration.",
      },
      {
        gene: "TP53",
        exon: "7",
        transcript: "NM_000546.6",
        cDNA: "c.733G>A",
        protein: "p.Gly245Ser",
        variantType: "SNV",
        vaf: 0.49,
        coverageDepth: 956,
        altReads: 468,
        refReads: 488,
        chromosome: "17",
        position: 7674220,
        classification: "Pathogenic",
        somaticTier: "Tier III",
        actionability: "Prognostic",
        interpretation: "TP53 p.Gly245Ser is a hotspot gain-of-function mutation in the DNA-binding domain. TP53 mutations co-occur with EGFR mutations in ~50% of EGFR-mutant NSCLC. TP53 co-mutation may be associated with shorter PFS on EGFR TKI therapy.",
        therapeuticImplication: "No direct therapeutic targeting available. Co-mutation with EGFR does not change first-line treatment (osimertinib still preferred). TP53 status may inform clinical trial eligibility.",
      },
    ],
    cnvFindings: [
      { gene: "EGFR", alteration: "Low-level amplification (3–4 copies)", foldChange: 2.8, clinical: "May contribute to osimertinib dose sensitivity; not independently actionable" },
    ],
    msi: "MSS",
    tmb: 4.2,
    hrdScore: undefined,
    mutationalSignatures: [
      { signature: "SBS2 (APOBEC)", proportion: 0.38, interpretation: "APOBEC-associated mutagenesis — common in lung adenocarcinoma" },
      { signature: "SBS13 (APOBEC)", proportion: 0.29, interpretation: "APOBEC-associated mutagenesis (complementary to SBS2)" },
      { signature: "SBS1 (Age)", proportion: 0.22, interpretation: "Age-related spontaneous deamination at methylated CpG sites" },
    ],
    reportSummary: "Somatic genomic profiling of this lung adenocarcinoma reveals an actionable EGFR L858R activating mutation (Tier I; OncoKB Level 1) suitable for first-line osimertinib therapy. Co-occurring TP53 p.Gly245Ser mutation is a passenger with prognostic implications. TMB is low (4.2 mut/Mb) and MSS status does not support immunotherapy as a first-line option. No ALK, ROS1, NTRK, RET or MET alterations detected. KRAS wild-type.",
    teachingPoints: [
      "EGFR L858R is the second most common EGFR mutation (~40% of EGFR-mutant NSCLC); exon 19 deletions account for ~55%",
      "VAF of 0.47 is consistent with the tumour purity of 72% — a clonal (truncal) mutation",
      "TP53 co-mutation is common in EGFR-mutant NSCLC and does not change initial therapy but may impact prognosis",
      "Low TMB (4.2) and MSS status: immunotherapy not indicated as first-line treatment",
      "Osimertinib is preferred over erlotinib/gefitinib in all settings due to OS benefit and CNS protection",
      "Serial liquid biopsy after osimertinib initiation can monitor for acquired resistance mechanisms",
    ],
    modelAnswer: "This lung adenocarcinoma harbours an EGFR L858R activating mutation at OncoKB Level 1, supporting first-line osimertinib (AstraZeneca Tagrisso). The FLAURA trial demonstrated superior PFS (18.9 vs 10.2 months) and OS (38.6 vs 31.8 months) for osimertinib vs first-generation EGFR TKIs. No contraindications to EGFR TKI therapy are identified from the genomic profile. Brain MRI should be re-evaluated given lung adenocarcinoma CNS tropism. Serial ctDNA monitoring for EGFR T790M or other resistance mechanisms is recommended at progression.",
    difficulty: "beginner",
    moduleLink: 5,
    weekLink: 1,
  },

  // ============================================================
  // CASE 2: Colorectal Cancer with MSI-H and KRAS WT — Week 2
  // ============================================================
  {
    id: "ngs_case_002",
    caseCode: "SYNTH-CRC-001",
    syntheticAge: 52,
    gender: "Male",
    tumourType: "Colorectal Cancer",
    tumourSite: "Sigmoid colon",
    histology: "Colorectal adenocarcinoma, poorly differentiated",
    stage: "Stage IV (hepatic metastases)",
    clinicalHistory: "52-year-old male with 6-week history of rectal bleeding, change in bowel habit and 8 kg unintentional weight loss. Colonoscopy revealed an obstructing sigmoid mass. CT showed liver metastases (segments V and VII). CEA 48 U/mL. No family history documented. Family history later revealed: mother died from endometrial cancer age 61; maternal uncle with colon cancer age 55 — raising Lynch syndrome suspicion. IHC for MMR proteins on biopsy requested prior to treatment decision.",
    specimenType: "FFPE",
    assayName: "Polche OncoPanelv2",
    panelGenes: 500,
    sequencingPlatform: "Illumina NovaSeq 6000",
    qcMetrics: {
      meanCoverage: 621,
      uniformity: 96.4,
      duplicationRate: 15.8,
      q30Bases: 93.1,
      tumorPurity: 0.65,
      passQC: true,
    },
    variants: [
      {
        gene: "MLH1",
        exon: "11",
        transcript: "NM_000249.4",
        cDNA: "c.1151T>A",
        protein: "p.Leu384Ter",
        variantType: "SNV",
        vaf: 0.52,
        coverageDepth: 744,
        altReads: 387,
        refReads: 357,
        chromosome: "3",
        position: 37030782,
        classification: "Pathogenic",
        somaticTier: "Tier I",
        actionability: "Therapeutic",
        oncokbLevel: "1",
        interpretation: "MLH1 p.Leu384Ter is a nonsense (stop-gain) mutation creating a premature termination codon, expected to cause NMD and loss of MLH1 protein expression. Loss of MLH1 protein (confirmed by IHC: MLH1 absent, PMS2 absent, MSH2 retained, MSH6 retained) leads to mismatch repair deficiency and microsatellite instability-high (MSI-H) phenotype.",
        therapeuticImplication: "dMMR/MSI-H tumours respond to immune checkpoint inhibitors. Pembrolizumab is FDA approved as first-line therapy for MSI-H/dMMR metastatic colorectal cancer (KEYNOTE-177: PFS 16.5 vs 8.2 months vs standard chemotherapy). This finding also prompts urgent germline testing for Lynch syndrome given family history.",
        notes: "IMPORTANT: This somatic finding combined with family history raises strong suspicion for Lynch syndrome. Germline testing of MLH1 (and consideration of EPCAM deletion) is urgently recommended. If germline pathogenic variant confirmed, cascade family testing is indicated.",
      },
      {
        gene: "BRAF",
        exon: "15",
        transcript: "NM_004333.6",
        cDNA: "c.1799T>A",
        protein: "p.Val600Glu",
        variantType: "SNV",
        vaf: 0.44,
        coverageDepth: 892,
        altReads: 393,
        refReads: 499,
        chromosome: "7",
        position: 140453136,
        classification: "Pathogenic",
        somaticTier: "Tier I",
        actionability: "Therapeutic",
        oncokbLevel: "1",
        interpretation: "BRAF V600E mutation in colorectal cancer. In CRC, BRAF V600E typically co-occurs with MLH1 promoter hypermethylation in sporadic dMMR cases (useful marker to distinguish sporadic from Lynch syndrome). However, in this case the MLH1 mutation appears somatic (not promoter methylation), and family history supports Lynch syndrome evaluation. BRAF V600E in BRAF-mutant MSS CRC has very poor prognosis, but in MSI-H disease the therapeutic landscape is different.",
        therapeuticImplication: "BEACON CRC trial demonstrated encorafenib + cetuximab effective in BRAF V600E mCRC (ORR 20% second-line). However, in this MSI-H case, pembrolizumab first-line is preferred. BRAF V600E is not predictive of cetuximab resistance in KRAS WT/MSI-H tumours.",
      },
      {
        gene: "APC",
        exon: "16",
        transcript: "NM_000038.6",
        cDNA: "c.4348C>T",
        protein: "p.Arg1450Ter",
        variantType: "SNV",
        vaf: 0.61,
        coverageDepth: 445,
        altReads: 271,
        refReads: 174,
        chromosome: "5",
        position: 112839514,
        classification: "Pathogenic",
        somaticTier: "Tier III",
        actionability: "Prognostic",
        interpretation: "APC truncating mutation is a typical early clonal event in colorectal carcinogenesis. No direct therapeutic implication.",
      },
    ],
    cnvFindings: [
      { gene: "MYC", alteration: "High-level amplification (>8 copies)", foldChange: 6.2, clinical: "MYC amplification associated with aggressive phenotype; not directly actionable with current approved agents" },
    ],
    msi: "MSI-H",
    tmb: 42.8,
    mutationalSignatures: [
      { signature: "SBS6 (MMR deficiency)", proportion: 0.68, interpretation: "Dominant MMR-deficiency signature — consistent with MLH1 loss" },
      { signature: "SBS15 (MMR deficiency)", proportion: 0.19, interpretation: "MMR deficiency mutational signature" },
      { signature: "SBS1 (Age)", proportion: 0.13, interpretation: "Age-related background mutagenesis" },
    ],
    reportSummary: "Somatic genomic profiling of this colorectal adenocarcinoma demonstrates dMMR/MSI-H status (MLH1 pathogenic somatic mutation; MLH1/PMS2 loss by IHC) with high TMB (42.8 mut/Mb), supporting pembrolizumab as first-line therapy (KEYNOTE-177). Co-occurring BRAF V600E mutation may guide subsequent treatment after pembrolizumab. KRAS, NRAS and RAS wild-type status confirmed (no RAS/RAF mutations preventing anti-EGFR therapy at later lines). Family history strongly warrants urgent germline MLH1 testing (Lynch syndrome). IMPORTANT: Germline testing urgently recommended.",
    teachingPoints: [
      "MSI-H status in CRC warrants pembrolizumab first-line (KEYNOTE-177: HR 0.60 for PFS vs FOLFOX/FOLFIRI)",
      "High TMB (42.8 mut/Mb) is a consequence, not a cause, of MMR deficiency in this case — both are present",
      "BRAF V600E in CRC + MLH1 somatic mutation: assess whether somatic or germline. Family history here raises Lynch syndrome probability",
      "In sporadic dMMR CRC, BRAF V600E + MLH1 promoter hypermethylation indicates MLH1 silencing (not Lynch). Here, truncating MLH1 mutation without methylation raises Lynch suspicion",
      "Germline testing must be triggered by any dMMR result + concerning family history",
      "KRAS WT confirms eligibility for anti-EGFR therapy at later lines if needed",
    ],
    modelAnswer: "This MSI-H/dMMR colorectal adenocarcinoma with KRAS WT warrants pembrolizumab as first-line systemic therapy (KEYNOTE-177; OncoKB Level 1). The MLH1 truncating somatic mutation combined with positive family history (mother: endometrial cancer, uncle: colon cancer) strongly suggests Lynch syndrome — urgent germline MLH1 testing is indicated. If germline MLH1 pathogenic variant is confirmed, all first-degree relatives should be referred for cascade genetic testing and Lynch syndrome surveillance. BRAF V600E does not change the first-line immunotherapy recommendation in MSI-H disease but may guide third-line encorafenib + cetuximab if progression occurs.",
    difficulty: "intermediate",
    moduleLink: 4,
    weekLink: 10,
  },

  // ============================================================
  // CASE 3: Breast Cancer with BRCA2 and HRD — Week 5
  // ============================================================
  {
    id: "ngs_case_003",
    caseCode: "SYNTH-BRCA-001",
    syntheticAge: 44,
    gender: "Female",
    tumourType: "Breast Cancer",
    tumourSite: "Left breast, upper outer quadrant",
    histology: "Invasive ductal carcinoma, Grade 3, Triple-negative (ER−/PR−/HER2−)",
    stage: "Stage III (N2, ipsilateral axillary LN involvement)",
    clinicalHistory: "44-year-old female presenting with a 2.8 cm left breast mass identified on screening mammogram. Core biopsy confirmed Grade 3 invasive ductal carcinoma, triple-negative (ER−, PR−, HER2 IHC 0). No DCIS. 4/9 axillary lymph nodes positive. No distant metastases. Prior to neoadjuvant chemotherapy, genomic profiling and germline BRCA testing requested for PARP inhibitor clinical trial eligibility. Sister diagnosed with ovarian cancer age 48.",
    specimenType: "FFPE",
    assayName: "Polche OncoPanelv2 + HRD Score",
    panelGenes: 500,
    sequencingPlatform: "Illumina NovaSeq 6000",
    qcMetrics: {
      meanCoverage: 923,
      uniformity: 97.8,
      duplicationRate: 11.4,
      q30Bases: 95.2,
      tumorPurity: 0.68,
      passQC: true,
    },
    variants: [
      {
        gene: "BRCA2",
        exon: "11",
        transcript: "NM_000059.4",
        cDNA: "c.5946delT",
        protein: "p.Ser1982ArgfsTer22",
        variantType: "Indel",
        vaf: 0.52,
        coverageDepth: 1102,
        altReads: 573,
        refReads: 529,
        chromosome: "13",
        position: 32339546,
        classification: "Pathogenic",
        somaticTier: "Tier I",
        actionability: "Therapeutic",
        oncokbLevel: "1",
        civic: "CIViC_EID_003",
        interpretation: "BRCA2 c.5946delT (also known as BRCA2 6174delT) is a frameshift deletion creating a premature stop codon. This is one of the three founder Ashkenazi Jewish BRCA2 mutations (along with 6174delT and 185delAG BRCA1). The variant has been confirmed as pathogenic in ClinVar (classified by multiple expert laboratories). The VAF of 52% (consistent with tumour purity 68%) and LOH at 13q support biallelic loss of BRCA2 function in this tumour.",
        therapeuticImplication: "BRCA2 pathogenic variant is a predictive biomarker for PARP inhibitor sensitivity. OlympiAD trial: olaparib vs chemotherapy in BRCA1/2 germline-mutated HER2-negative metastatic breast cancer (PFS 7.0 vs 4.2 months; HR 0.58). In early-stage TNBC post-neoadjuvant residual disease: OlympiA trial demonstrated olaparib adjuvant therapy improved OS. NOTE: VAF of 52% with LOH raises question of somatic vs germline — germline testing urgently recommended given family history.",
        notes: "Founder mutation 6174delT — high prior probability of germline in Ashkenazi Jewish ancestry individuals. Germline testing is mandatory before PARP inhibitor therapy planning.",
      },
      {
        gene: "RB1",
        exon: "10",
        transcript: "NM_000321.3",
        cDNA: "c.958C>T",
        protein: "p.Arg320Ter",
        variantType: "SNV",
        vaf: 0.38,
        coverageDepth: 678,
        altReads: 258,
        refReads: 420,
        chromosome: "13",
        position: 48941677,
        classification: "Pathogenic",
        somaticTier: "Tier III",
        actionability: "Prognostic",
        interpretation: "RB1 truncating somatic mutation associated with cell cycle dysregulation. Loss of RB1 may confer CDK4/6 inhibitor resistance in HR+ breast cancer; in TNBC, its clinical significance is less clearly defined.",
      },
      {
        gene: "PIK3CA",
        exon: "9",
        transcript: "NM_006218.4",
        cDNA: "c.1634A>G",
        protein: "p.Glu545Gly",
        variantType: "SNV",
        vaf: 0.21,
        coverageDepth: 892,
        altReads: 187,
        refReads: 705,
        chromosome: "3",
        position: 179218303,
        classification: "Pathogenic",
        somaticTier: "Tier II",
        actionability: "Therapeutic",
        oncokbLevel: "2",
        interpretation: "PIK3CA p.Glu545Gly is an activating mutation in the helical domain of PI3Kα. The subclonal VAF (21%) compared to the BRCA2 mutation (52%) suggests this is a subclonal event. PIK3CA mutations are present in 30–40% of breast cancers but occur less commonly in TNBC. Alpelisib (PI3Kα inhibitor) is FDA approved for PIK3CA-mutant HR+ metastatic breast cancer, but this patient is TNBC.",
        therapeuticImplication: "Alpelisib is not approved for TNBC. This subclonal PIK3CA mutation may represent a future resistance clonal evolution target. Consider clinical trial eligibility for PI3K pathway inhibitors in TNBC.",
      },
    ],
    cnvFindings: [
      { gene: "BRCA2", alteration: "Loss of heterozygosity (LOH) at 13q12-13", foldChange: 0.5, clinical: "BRCA2 LOH confirms biallelic inactivation, supporting HRD mechanism" },
      { gene: "CCND1", alteration: "Low-level amplification", foldChange: 1.8, clinical: "Cyclin D1 amplification — not actionable in TNBC" },
    ],
    msi: "MSS",
    tmb: 7.8,
    hrdScore: 68,
    mutationalSignatures: [
      { signature: "SBS3 (HRD/BRCA deficiency)", proportion: 0.52, interpretation: "Dominant HRD signature — consistent with BRCA2 biallelic loss. Predicts PARP inhibitor sensitivity" },
      { signature: "SBS2 (APOBEC)", proportion: 0.28, interpretation: "APOBEC mutagenesis — common in breast cancer" },
      { signature: "SBS1 (Age)", proportion: 0.20, interpretation: "Age-related background mutagenesis" },
    ],
    reportSummary: "Somatic genomic profiling of this triple-negative breast cancer demonstrates a pathogenic BRCA2 frameshift variant (c.5946delT; potential founder mutation) with supporting HRD score (68; above 42 threshold) and dominant SBS3 mutational signature, indicating homologous recombination deficiency. Germline BRCA2 testing is urgently recommended (family history of ovarian cancer; potential Ashkenazi Jewish ancestry founder mutation). If germline pathogenic variant confirmed, olaparib adjuvant therapy (OlympiA trial) is indicated for residual disease after neoadjuvant chemotherapy. PARP inhibitor clinical trial eligibility should be discussed with the treating oncologist.",
    teachingPoints: [
      "BRCA2 6174delT is a founder mutation enriched in Ashkenazi Jewish populations — enquire about ancestry",
      "HRD score 68 (>42 threshold) confirms genomic instability consistent with HR deficiency",
      "SBS3 mutational signature independently supports BRCA-related HRD",
      "Somatic vs germline distinction requires matched normal (germline) testing — cannot determine from tumour alone with VAF alone",
      "In TNBC with residual disease after neoadjuvant chemo, olaparib adjuvant therapy demonstrated OS benefit (OlympiA trial, HR 0.68)",
      "Subclonal PIK3CA (VAF 21% vs BRCA2 52%) illustrates clonal hierarchy — truncal (clonal) vs branch (subclonal) mutations",
    ],
    modelAnswer: "This TNBC case requires urgent germline BRCA2 testing given: (1) pathogenic BRCA2 frameshift (c.5946delT/6174delT — Ashkenazi founder mutation probability); (2) family history of ovarian cancer in sister; (3) HRD-high score (68) with SBS3 signature. For treatment planning: if residual disease after neoadjuvant chemotherapy, olaparib adjuvant therapy is indicated if germline BRCA1/2 pathogenic variant confirmed (OlympiA trial, N=1836, OS HR 0.68, p=0.009). Genetic counselling referral for germline testing and hereditary breast/ovarian cancer risk assessment is mandatory. Consider breast MRI surveillance for unaffected BRCA carriers, and referral for BRCA1/2 mutation carrier-specific risk reduction discussions.",
    difficulty: "intermediate",
    moduleLink: 5,
    weekLink: 15,
  },
];

export function getCaseById(id: string): SyntheticNGSCase | undefined {
  return NGS_CASES.find(c => c.id === id);
}

export function getCasesByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): SyntheticNGSCase[] {
  return NGS_CASES.filter(c => c.difficulty === difficulty);
}

export function getCasesByWeek(week: number): SyntheticNGSCase[] {
  return NGS_CASES.filter(c => c.weekLink === week);
}
