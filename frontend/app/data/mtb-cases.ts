// =============================================================================
// POLCHE ACADEMIA — SYNTHETIC MTB CASES
// IMPORTANT: ALL PATIENTS, FINDINGS AND OUTCOMES ARE ENTIRELY FICTITIOUS.
// This data is created for educational simulation only.
// It must not be used for clinical decision-making with real patients.
// =============================================================================

export interface MTBFinding {
  gene: string;
  alteration: string;
  alterationType: "snv" | "indel" | "amplification" | "deletion" | "fusion" | "msi" | "tmb";
  vaf?: number;         // variant allele fraction %
  copyNumber?: number;
  tier: "I" | "II" | "III" | "IV";
  clinicalSignificance: string;
  therapeuticImplication?: string;
  evidence: string;
  escat?: string;        // ESMO ESCAT tier
}

export interface SyntheticMTBPatient {
  id: string;
  caseCode: string;      // e.g. "MTB-SYN-001" — Synthetic
  tumorType: string;
  tumorTypeCode: string;
  stage: string;
  treatmentHistory: string[];
  pathologyFindings: string;
  ihcFindings: string[];
  ngsPanel: string;
  findings: MTBFinding[];
  qcMetrics: {
    tumorPurity: number;   // %
    meanCoverage: number;
    percentGt100x: number;
    tmb: number;           // mut/Mb
    msi: "MSI-H" | "MSS" | "MSI-L";
  };
  clinicalQuestion: string;
  keyDecisionPoints: string[];
  modelAnswer: {
    summary: string;
    recommendation: string;
    rationale: string;
    clinicalTrialsToConsider: Array<{ name: string; rationale: string }>;
    caveats: string[];
  };
  weekModule: number;    // 22, 23 or 24
  difficulty: "foundation" | "intermediate" | "advanced";
  facultyNotes: string;
}

export const MTB_SYNTHETIC_CASES: SyntheticMTBPatient[] = [
  {
    id: "mtb-syn-001",
    caseCode: "MTB-SYN-001",
    tumorType: "Non-Small Cell Lung Cancer (Adenocarcinoma)",
    tumorTypeCode: "NSCLC-ADC",
    stage: "Stage IVA — bilateral pulmonary + mediastinal nodes",
    treatmentHistory: [
      "Osimertinib 80 mg OD — started after EGFR exon 19 deletion detected (Month 0)",
      "Partial response maintained for 14 months",
      "Disease progression at Month 15 (new liver metastases)"
    ],
    pathologyFindings: "Moderately differentiated adenocarcinoma. TTF-1 positive. No squamous differentiation.",
    ihcFindings: ["TTF-1 +", "PD-L1 TPS 5% (22C3)", "ALK D5F3 negative"],
    ngsPanel: "Comprehensive 648-gene solid tumour panel (ctDNA liquid biopsy at progression)",
    findings: [
      {
        gene: "EGFR",
        alteration: "Exon 19 deletion (p.E746_A750del)",
        alterationType: "indel",
        vaf: 18.4,
        tier: "I",
        clinicalSignificance: "Sensitising EGFR mutation — primary oncogenic driver",
        therapeuticImplication: "Osimertinib sensitive (but patient now progressed)",
        evidence: "FDA-approved companion diagnostic indication. FLAURA trial.",
        escat: "I-A"
      },
      {
        gene: "EGFR",
        alteration: "C797S (p.C797S)",
        alterationType: "snv",
        vaf: 9.1,
        tier: "I",
        clinicalSignificance: "Acquired resistance mutation to osimertinib — abolishes covalent binding",
        therapeuticImplication: "Resistance to all approved 3rd-gen EGFR TKIs. No approved standard of care.",
        evidence: "Well-characterised resistance mechanism (Thress et al., Nature Medicine 2015). No approved therapy for C797S+T790M in cis.",
        escat: "II-B"
      },
      {
        gene: "MET",
        alteration: "Amplification (CN 8.4)",
        alterationType: "amplification",
        copyNumber: 8.4,
        tier: "II",
        clinicalSignificance: "MET amplification as bypass resistance mechanism to osimertinib (12–15% of cases)",
        therapeuticImplication: "Potential sensitivity to MET inhibitor (capmatinib, tepotinib) + osimertinib combination — investigational",
        evidence: "Preclinical and early clinical evidence. GEOMETRY mono-1 trial shows capmatinib activity in MET-amplified NSCLC.",
        escat: "II-B"
      },
      {
        gene: "TP53",
        alteration: "p.R175H",
        alterationType: "snv",
        vaf: 22.1,
        tier: "III",
        clinicalSignificance: "Common TP53 loss-of-function mutation. No direct therapeutic implication currently.",
        evidence: "Retrospective data suggest TP53 comutation may reduce osimertinib PFS. No actionable therapy.",
        escat: "III-C"
      }
    ],
    qcMetrics: {
      tumorPurity: 38,
      meanCoverage: 1240,
      percentGt100x: 97.8,
      tmb: 4.2,
      msi: "MSS"
    },
    clinicalQuestion: "This patient has progressed on first-line osimertinib. The liquid biopsy shows EGFR C797S + MET amplification. What would you recommend at the next MTB?",
    keyDecisionPoints: [
      "Is C797S in cis or trans with the sensitising EGFR mutation? (Clinical significance differs)",
      "MET amplification as co-occurring resistance mechanism: does this change the therapeutic approach?",
      "Is there a role for combination TKI strategy (osimertinib + MET inhibitor)?",
      "Should platinum-based chemotherapy be considered given lack of approved 2nd-line targeted options?",
      "What is the role of immunotherapy given PD-L1 5% and MSS status?"
    ],
    modelAnswer: {
      summary: "EGFR-mutant NSCLC progressing on osimertinib with compound resistance: C797S + MET amplification co-occurring.",
      recommendation: "Platinum-based doublet chemotherapy remains the standard 2nd-line option (pemetrexed + carboplatin ± bevacizumab). Enrolment in a clinical trial evaluating MET inhibitor combination is preferred if available.",
      rationale: "C797S in cis with the sensitising EGFR mutation confers resistance to all 3rd-generation EGFR TKIs. No approved targeted therapy exists for this compound resistance profile. MET amplification (CN >6) suggests a co-operating bypass mechanism that may be targetable. The TATTON Phase Ib trial demonstrated preliminary activity of osimertinib + savolitinib in MET-amplified EGFR-mutant NSCLC, though no Phase III data exist. Immunotherapy alone is unlikely to be effective given low TMB and low PD-L1.",
      clinicalTrialsToConsider: [
        { name: "Phase I/II trials: Osimertinib + savolitinib (SAVANNAH trial)", rationale: "MET amplification co-resistance mechanism" },
        { name: "Phase II trials: 4th-generation EGFR inhibitors (BBT-176, BLU-945)", rationale: "EGFR C797S in cis activity" },
        { name: "Platinum doublet standard of care if no trial available", rationale: "2nd-line standard, pemetrexed + carboplatin" }
      ],
      caveats: [
        "C797S may be in trans (on separate alleles) — could restore susceptibility to 1st/2nd-gen EGFR TKI combination. ddPCR haplotyping should be performed.",
        "MET amplification threshold for treatment selection is debated (CN >6 or MET/CEP7 ratio >2 by FISH preferred for treatment selection).",
        "Liquid biopsy may underestimate true tumour burden in pleural/bone disease.",
        "Re-biopsy of a progressing lesion for tissue-based confirmation is recommended before major treatment change."
      ]
    },
    weekModule: 23,
    difficulty: "advanced",
    facultyNotes: "This case illustrates the complexity of acquired TKI resistance. The key teaching point is that compound resistance (C797S + MET amplification) requires a systematic approach to each mechanism individually. Emphasise the importance of cis/trans haplotyping for C797S and the distinction between oncogene amplification as an intrinsic driver vs bypass resistance mechanism."
  },
  {
    id: "mtb-syn-002",
    caseCode: "MTB-SYN-002",
    tumorType: "Colorectal Adenocarcinoma",
    tumorTypeCode: "CRC",
    stage: "Stage IV — hepatic metastases (3 lesions, largest 4.2 cm)",
    treatmentHistory: [
      "FOLFOX-6 × 8 cycles — partial response (Month 0–4)",
      "Disease progression at Month 12",
      "Enrolment in clinical trial (immunotherapy arm) — no response",
      "Now considering 2nd/3rd-line options"
    ],
    pathologyFindings: "Well-differentiated colonic adenocarcinoma. CK20+, CDX2+, CK7-.",
    ihcFindings: ["MLH1 absent (loss of expression)", "PMS2 absent", "MSH2 intact", "MSH6 intact", "PD-L1 CPS 15 (22C3)"],
    ngsPanel: "Comprehensive 648-gene panel — primary tumour tissue biopsy",
    findings: [
      {
        gene: "BRAF",
        alteration: "p.V600E",
        alterationType: "snv",
        vaf: 41.2,
        tier: "I",
        clinicalSignificance: "BRAF V600E — present in 8–12% CRC. Correlates with right-sided, MSI-H tumours.",
        therapeuticImplication: "FDA-approved: encorafenib + cetuximab (BEACON-CRC trial). Resistance differs from melanoma — EGFR feedback loop requires EGFR blockade.",
        evidence: "BEACON-CRC: encorafenib + binimetinib + cetuximab vs control. ORR 26% vs 2%.",
        escat: "I-A"
      },
      {
        gene: "MSI",
        alteration: "MSI-High (MLH1/PMS2 deficient)",
        alterationType: "msi",
        tier: "I",
        clinicalSignificance: "dMMR/MSI-H — predictive of response to PD-1 blockade",
        therapeuticImplication: "Pembrolizumab approved 1st-line for MSI-H mCRC (KEYNOTE-158). But patient already failed immunotherapy — investigate why.",
        evidence: "KEYNOTE-158: ORR 36% in MSI-H CRC. KEYNOTE-177: 1st-line pembrolizumab vs chemo improved PFS2.",
        escat: "I-A"
      },
      {
        gene: "TMB",
        alteration: "TMB-High (42.3 mut/Mb)",
        alterationType: "tmb",
        tier: "II",
        clinicalSignificance: "High TMB consistent with MMR deficiency",
        therapeuticImplication: "Pembrolizumab approved for TMB-H solid tumours (KEYNOTE-158). Already covered by MSI-H status.",
        evidence: "KEYNOTE-158. TMB-H defined as ≥10 mut/Mb.",
        escat: "I-A"
      },
      {
        gene: "RAS",
        alteration: "KRAS/NRAS wildtype (codons 12, 13, 59, 61, 117, 146 all WT)",
        alterationType: "snv",
        tier: "I",
        clinicalSignificance: "RAS wildtype — eligible for EGFR antibody therapy",
        therapeuticImplication: "Cetuximab or panitumumab eligible (required for BEACON combination)",
        evidence: "OPUS/CRYSTAL trials: RAS-WT required for anti-EGFR benefit.",
        escat: "I-A"
      }
    ],
    qcMetrics: {
      tumorPurity: 62,
      meanCoverage: 487,
      percentGt100x: 99.1,
      tmb: 42.3,
      msi: "MSI-H"
    },
    clinicalQuestion: "This patient has MSI-H BRAF V600E CRC that failed prior immunotherapy. The IHC shows MLH1/PMS2 loss. What is the recommended management strategy?",
    keyDecisionPoints: [
      "Why did immunotherapy fail in an MSI-H tumour? — Resistance mechanisms",
      "Is encorafenib + cetuximab appropriate in the post-immunotherapy setting?",
      "Should MLH1 methylation vs germline MLH1 mutation be investigated (Lynch syndrome)?",
      "What is the sequencing of BRAF-targeted vs immunotherapy vs chemotherapy?",
      "Is irinotecan-based therapy appropriate here?"
    ],
    modelAnswer: {
      summary: "MSI-H, BRAF V600E, RAS-WT metastatic CRC that has progressed on oxaliplatin-based chemotherapy and immunotherapy. Two biomarker-driven options are available: BRAF-targeted combination and re-challenge strategies.",
      recommendation: "Encorafenib + cetuximab is the recommended standard 2nd/3rd-line therapy for BRAF V600E CRC regardless of MSI status, based on BEACON-CRC data. Referral to genetic counselling to exclude Lynch syndrome given MLH1/PMS2 loss.",
      rationale: "BRAF V600E CRC responds poorly to BRAF inhibitor monotherapy due to EGFR-mediated feedback reactivation. The BEACON-CRC trial established encorafenib + cetuximab as superior to irinotecan + cetuximab (ORR 20% vs 2%, OS 8.4 vs 5.4 months). Immunotherapy failure in MSI-H CRC may reflect primary resistance (less common), treatment duration, or clonal evolution. The presence of MLH1/PMS2 loss should prompt investigation for germline MLH1 mutation (Lynch syndrome) — present in ~40% of MLH1-deficient CRC — with implications for family screening.",
      clinicalTrialsToConsider: [
        { name: "BEACON-CRC: encorafenib + cetuximab (approved regimen)", rationale: "Standard of care for BRAF V600E mCRC" },
        { name: "IMblaze370 / ongoing trials: anti-TIGIT in IO-refractory MSI-H CRC", rationale: "Immunotherapy resistance mechanisms" },
        { name: "FRESCO-2: fruquintinib for refractory CRC", rationale: "Pan-VEGFR TKI as later-line option" }
      ],
      caveats: [
        "BEACON-CRC data are predominantly from patients who had not received prior immunotherapy — apply caution when extrapolating to IO-pretreated patients.",
        "MLH1 promoter methylation testing should be performed to distinguish sporadic MMR-deficient CRC from Lynch syndrome before genetic counselling referral.",
        "Regorafenib or TAS-102 remain later-line options if BRAF-targeted therapy fails.",
        "KRAS/NRAS WT status should be re-confirmed from most recent biopsy in case of clonal evolution."
      ]
    },
    weekModule: 23,
    difficulty: "intermediate",
    facultyNotes: "Key teaching points: (1) Why BRAF inhibitor monotherapy does not work in CRC (EGFR feedback loop — different biology from melanoma). (2) MSI-H and BRAF V600E frequently co-occur in CRC (sporadic MLH1 methylation pattern). (3) Lynch syndrome workup for MLH1/PMS2 loss. (4) Sequencing of therapies in multi-biomarker positive CRC."
  },
  {
    id: "mtb-syn-003",
    caseCode: "MTB-SYN-003",
    tumorType: "Acute Myeloid Leukaemia (de novo)",
    tumorTypeCode: "AML",
    stage: "Newly diagnosed AML, bone marrow blast count 73%",
    treatmentHistory: [
      "Newly diagnosed — no prior therapy",
      "Fit for intensive induction: performance status ECOG 1, age 56"
    ],
    pathologyFindings: "Hypercellular marrow with 73% blasts. Blasts: CD34+, CD117+, CD33+, CD13+, MPO+. Monocytic differentiation absent.",
    ihcFindings: ["CD34 +", "CD117 +", "MPO +", "CD33 +"],
    ngsPanel: "AML-specific 54-gene panel + cytogenetics + FLT3 PCR + NPM1 PCR",
    findings: [
      {
        gene: "FLT3",
        alteration: "ITD (internal tandem duplication, allelic ratio 0.72)",
        alterationType: "indel",
        vaf: 41.8,
        tier: "I",
        clinicalSignificance: "FLT3-ITD — present in 25–30% AML. High allelic ratio (>0.5) confers adverse prognosis without TKI addition.",
        therapeuticImplication: "Midostaurin addition to 7+3 induction approved (RATIFY trial). Allosteric TKI gilteritinib for R/R FLT3+ AML.",
        evidence: "RATIFY: midostaurin + 7+3 improved OS (74.7 vs 51.4 months at 5 years). ELN 2022: FLT3-ITD AR >0.5 = adverse risk.",
        escat: "I-A"
      },
      {
        gene: "NPM1",
        alteration: "Mutation A (TCTG insertion, type A)",
        alterationType: "indel",
        vaf: 46.2,
        tier: "I",
        clinicalSignificance: "NPM1 mutation — present in 30% AML, particularly in CN-AML. Normally favourable prognosis, but modified by FLT3-ITD AR.",
        therapeuticImplication: "NPM1 mutation does not abrogate benefit of midostaurin in FLT3-ITD+ AML. MRD monitoring by NPM1 PCR.",
        evidence: "ELN 2022: NPM1mut/FLT3-ITD high AR = intermediate risk (downgraded from favourable).",
        escat: "II-B"
      },
      {
        gene: "DNMT3A",
        alteration: "p.R882H",
        alterationType: "snv",
        vaf: 48.1,
        tier: "III",
        clinicalSignificance: "DNMT3A R882H — epigenetic regulator mutation. No direct therapeutic implication, but may persist in remission (clonal haematopoiesis).",
        evidence: "Associated with worse outcomes in some series. DNMT3A/NPM1/FLT3 co-mutation triplet = high-risk AML in some analyses.",
        escat: "III-C"
      }
    ],
    qcMetrics: {
      tumorPurity: 73,    // bone marrow blast %
      meanCoverage: 652,
      percentGt100x: 99.4,
      tmb: 1.2,
      msi: "MSS"
    },
    clinicalQuestion: "This fit 56-year-old has newly diagnosed FLT3-ITD high AR, NPM1-mutant AML. What induction strategy would you recommend, and what is the role of allogeneic SCT?",
    keyDecisionPoints: [
      "Which induction regimen? (7+3 + midostaurin vs CPX-351 vs other)",
      "What is the ELN 2022 risk classification?",
      "Is allogeneic SCT in CR1 indicated given FLT3-ITD high AR?",
      "How should MRD be monitored and what does NPM1 MRD positivity at end of induction mean?",
      "What maintenance therapy after SCT? (gilteritinib, midostaurin)"
    ],
    modelAnswer: {
      summary: "Newly diagnosed FLT3-ITD high AR, NPM1-mutant, DNMT3A R882H AML. ELN 2022 intermediate risk (NPM1mut + FLT3-ITD high AR). Standard 7+3 + midostaurin induction is recommended.",
      recommendation: "7+3 (daunorubicin 60 mg/m² days 1–3 + cytarabine 200 mg/m² continuous infusion days 1–7) + midostaurin 50 mg BD days 8–21. Allogeneic SCT in CR1 strongly recommended given FLT3-ITD high allelic ratio. MRD by NPM1 PCR at day 28 and after each consolidation cycle. Gilteritinib maintenance post-SCT if residual FLT3 disease.",
      rationale: "ELN 2022 reclassifies FLT3-ITD/NPM1-mutant AML based on allelic ratio: AR >0.5 = intermediate (not favourable). Midostaurin addition is standard of care (RATIFY trial). Allogeneic SCT in CR1 is recommended by ELN for intermediate and adverse risk AML. NPM1 PCR provides highly sensitive MRD monitoring — persistent NPM1 at 10^-3 after induction predicts relapse. DNMT3A R882H may persist as clonal haematopoiesis after therapy — does not confirm residual leukaemia and should not be used for MRD monitoring.",
      clinicalTrialsToConsider: [
        { name: "QUAZAR AML-001: azacitidine maintenance post-intensive therapy", rationale: "Maintenance strategy in older/transplant-ineligible patients" },
        { name: "ADMIRAL: gilteritinib in R/R FLT3+ AML", rationale: "Salvage if primary refractory" },
        { name: "Phase III trials: venetoclax + 7+3 in newly diagnosed AML", rationale: "Emerging data for BCL2 inhibition addition" }
      ],
      caveats: [
        "DNMT3A R882H as clonal haematopoiesis marker — will likely persist in remission. Must not be confused with residual leukaemia on MRD testing.",
        "FLT3 allelic ratio should ideally be confirmed by fragment analysis (capillary electrophoresis) as well as NGS.",
        "CNS prophylaxis is not standard for AML but should be considered if blast count >25×10^9/L at diagnosis.",
        "Pre-SCT comorbidity assessment and donor search should begin immediately at diagnosis given expected CR1 transplant plan."
      ]
    },
    weekModule: 24,
    difficulty: "advanced",
    facultyNotes: "Key teaching points: (1) ELN 2022 risk classification changes — FLT3-ITD AR modifies NPM1 prognosis. (2) Midostaurin pharmacology: 7+3 schedule (days 8–21 to avoid PK interaction). (3) DNMT3A as CH marker — critical distinction for MRD interpretation. (4) Post-SCT maintenance with gilteritinib — MORPHO trial data. Excellent case for integrating molecular biology, diagnostics and therapeutic decision-making."
  }
];

export function getMTBCase(id: string): SyntheticMTBPatient | undefined {
  return MTB_SYNTHETIC_CASES.find(c => c.id === id);
}

export function getMTBCasesByWeek(week: number): SyntheticMTBPatient[] {
  return MTB_SYNTHETIC_CASES.filter(c => c.weekModule === week);
}
