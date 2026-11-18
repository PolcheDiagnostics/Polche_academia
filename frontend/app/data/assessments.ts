export interface AssessmentQuestion {
  id: string;
  week: number;
  module: number;
  difficulty: "basic" | "intermediate" | "advanced";
  type: "mcq" | "clinical-vignette" | "interpretation";
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  reference?: string;
  tags: string[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // ==================== WEEK 1 — Foundations ====================
  {
    id: "q_w1_001", week: 1, module: 1, difficulty: "basic", type: "mcq",
    question: "Which of the following mutations in KRAS is most commonly targeted by sotorasib (Lumakras)?",
    options: [
      { id: "a", text: "KRAS G12D" },
      { id: "b", text: "KRAS G12C" },
      { id: "c", text: "KRAS G13D" },
      { id: "d", text: "KRAS Q61H" },
    ],
    correctOptionId: "b",
    explanation: "KRAS G12C (glycine-to-cysteine substitution at codon 12) creates a unique cysteine residue in the P-loop of KRAS that can be covalently and irreversibly targeted by sotorasib (AMG 510). The CodeBreaK 100 trial demonstrated 37.1% ORR in KRAS G12C-mutant NSCLC, leading to FDA approval in 2021. KRAS G12D (the most common KRAS mutation overall) and other KRAS variants are not currently targetable with approved drugs, though KRAS G12D-specific inhibitors are in development.",
    reference: "Skoulidis F et al. N Engl J Med. 2021;384:2371-2381. PMID: 34096690",
    tags: ["KRAS", "G12C", "sotorasib", "targeted therapy", "NSCLC"],
  },
  {
    id: "q_w1_002", week: 1, module: 1, difficulty: "basic", type: "mcq",
    question: "In cancer biology, which of the following statements best describes the distinction between driver and passenger mutations?",
    options: [
      { id: "a", text: "Driver mutations occur first chronologically during tumour development; passenger mutations occur later" },
      { id: "b", text: "Driver mutations confer selective growth advantage; passenger mutations occur by chance without contributing to oncogenesis" },
      { id: "c", text: "Driver mutations are always present in every cell of the tumour; passenger mutations are subclonal" },
      { id: "d", text: "Driver mutations are always missense variants; passenger mutations are always synonymous variants" },
    ],
    correctOptionId: "b",
    explanation: "Driver mutations are defined functionally: they provide a selective growth advantage, contributing to clonal expansion. Passenger mutations arise during tumour evolution but do not confer growth advantage — they 'go along for the ride'. Driver mutations are not necessarily chronologically first, nor are they always clonal (subclonal drivers can exist). Both drivers and passengers can be missense, nonsense, frameshift, or other variant types. The distinction is biological (effect on fitness), not temporal or positional.",
    reference: "Stratton MR et al. Nature. 2009;458(7239):719-24. PMID: 19360079",
    tags: ["driver mutation", "passenger mutation", "oncogenesis", "clonal evolution"],
  },
  {
    id: "q_w1_003", week: 1, module: 1, difficulty: "intermediate", type: "clinical-vignette",
    question: "A 55-year-old patient with metastatic colorectal cancer is found to have KRAS G12V and BRAF V600E mutations in their tumour. Which of the following treatment approaches is most appropriate based on these findings?",
    options: [
      { id: "a", text: "Cetuximab monotherapy" },
      { id: "b", text: "FOLFOX + bevacizumab" },
      { id: "c", text: "FOLFOX + cetuximab" },
      { id: "d", text: "Encorafenib + cetuximab monotherapy first-line" },
    ],
    correctOptionId: "b",
    explanation: "KRAS mutations (including G12V) are predictive of resistance to anti-EGFR antibodies (cetuximab, panitumumab) in colorectal cancer — these agents are contraindicated in KRAS-mutant CRC regardless of RAS status. BRAF V600E in CRC confers a poor prognosis. First-line treatment for BRAF V600E mCRC is FOLFOXIRI + bevacizumab or FOLFOX/FOLFIRI + bevacizumab. Encorafenib + cetuximab (BEACON CRC) is a second-line option for BRAF V600E mCRC, but is not approved first-line. Answer D is incorrect as encorafenib + cetuximab is second-line or later, and KRAS mutation would preclude cetuximab benefit. FOLFOX + bevacizumab (B) is the most appropriate first-line approach.",
    reference: "Kopetz S et al. N Engl J Med. 2019;381(17):1632-1643. PMID: 31566309",
    tags: ["KRAS", "BRAF V600E", "colorectal cancer", "anti-EGFR", "cetuximab resistance"],
  },
  {
    id: "q_w1_004", week: 1, module: 1, difficulty: "intermediate", type: "mcq",
    question: "Which of the following correctly describes the mechanism of KRAS G12D in oncogenesis?",
    options: [
      { id: "a", text: "It increases GTPase activity, keeping KRAS in an active GTP-bound state longer" },
      { id: "b", text: "It impairs intrinsic GTPase activity, locking KRAS in a constitutively active GTP-bound state" },
      { id: "c", text: "It prevents RAS from binding to GTP, resulting in loss of downstream signalling" },
      { id: "d", text: "It activates GAP proteins that stimulate RAS-dependent cell proliferation" },
    ],
    correctOptionId: "b",
    explanation: "KRAS G12D (and other KRAS codon 12 mutations) substitutes glycine at position 12 with aspartate, disrupting the P-loop of the GTP-binding domain. The glycine at position 12 is critical for accommodating the arginine finger of GTPase-activating proteins (GAPs). With aspartate at position 12, GAP-mediated hydrolysis of GTP to GDP is sterically blocked. This traps KRAS in the active GTP-bound state, constitutively activating downstream RAS-MAPK and PI3K-AKT-mTOR pathways, promoting cell proliferation and survival.",
    reference: "Simanshu DK et al. Cell. 2017;170(1):17-33. PMID: 28666118",
    tags: ["KRAS", "G12D", "GTPase", "RAS signalling", "P-loop"],
  },
  {
    id: "q_w1_005", week: 1, module: 1, difficulty: "basic", type: "mcq",
    question: "Which of the following is the most common driver mutation in colorectal cancer?",
    options: [
      { id: "a", text: "TP53 R175H" },
      { id: "b", text: "KRAS G12D" },
      { id: "c", text: "APC truncating mutations" },
      { id: "d", text: "PIK3CA E545K" },
    ],
    correctOptionId: "c",
    explanation: "APC (adenomatous polyposis coli) truncating mutations are the most common early driver event in colorectal cancer, occurring in approximately 70-80% of sporadic CRC cases. APC is a tumour suppressor that regulates β-catenin degradation in the Wnt signalling pathway. Loss of APC activates Wnt/β-catenin signalling, promoting cell proliferation. APC mutations typically occur as early truncal events in the conventional adenoma-carcinoma sequence. KRAS mutations (all types combined) occur in ~40-50% of CRC; TP53 in ~40-60%; PIK3CA in ~15-20%.",
    reference: "Cancer Genome Atlas Network. Nature. 2012;487(7407):330-7. PMID: 22810696",
    tags: ["APC", "colorectal cancer", "Wnt signalling", "driver mutation", "adenoma-carcinoma"],
  },
  {
    id: "q_w1_006", week: 1, module: 1, difficulty: "advanced", type: "mcq",
    question: "A researcher analyses whole-exome sequencing data from 200 colorectal cancers. They find that 85% of tumours carry at least one APC truncating mutation, and 42% carry a KRAS codon 12 mutation. When they examine tumours with both mutations, the APC mutation is always present at a higher VAF than KRAS. What does this observation most strongly suggest?",
    options: [
      { id: "a", text: "APC mutations occur later than KRAS mutations in CRC evolution" },
      { id: "b", text: "APC and KRAS mutations are mutually exclusive in CRC" },
      { id: "c", text: "APC mutations are clonal/truncal events that precede KRAS mutations chronologically" },
      { id: "d", text: "APC mutations arise in the germline in most CRC cases" },
    ],
    correctOptionId: "c",
    explanation: "In a tumour with two co-occurring somatic mutations, the mutation present at higher VAF is in a larger fraction of tumour cells, indicating it arose earlier in tumour evolution (and is therefore present in more daughter cells — a truncal/clonal event). The consistently higher VAF of APC vs KRAS in co-mutated tumours is strong evidence that APC mutations occur first, in the adenomatous polyp stage, followed by KRAS mutations during adenoma-to-carcinoma progression. This is consistent with the Vogelstein multi-step colorectal cancer model: APC → KRAS → SMAD4/TGFβ → TP53. This clonal hierarchy can be formally analysed using phylogenetic methods.",
    reference: "Fearon ER, Vogelstein B. Cell. 1990;61(5):759-67. PMID: 2188735",
    tags: ["clonal evolution", "VAF", "APC", "KRAS", "CRC", "truncal mutation", "tumour evolution"],
  },
  // ==================== WEEK 2 — DNA Repair ====================
  {
    id: "q_w2_001", week: 2, module: 1, difficulty: "basic", type: "mcq",
    question: "Which protein is the major negative regulator of p53 (TP53)?",
    options: [
      { id: "a", text: "MDM2" },
      { id: "b", text: "CDK4" },
      { id: "c", text: "RB1" },
      { id: "d", text: "CDKN2A" },
    ],
    correctOptionId: "a",
    explanation: "MDM2 is the principal E3 ubiquitin ligase that targets p53 for proteasomal degradation, forming a critical negative feedback loop. Under normal conditions, MDM2 keeps p53 at low levels. DNA damage or oncogene activation leads to p53 phosphorylation, disrupting the MDM2-p53 interaction and allowing p53 to accumulate and activate target gene transcription. MDM2 is amplified in ~7% of all cancers (especially sarcomas, glioblastoma), providing an alternative mechanism to p53 inactivation. MDM2 inhibitors (nutlins, e.g. navtemadlin) are in clinical trials for TP53-WT, MDM2-amplified tumours.",
    reference: "Lane DP, Crawford LV. Nature. 1979;278:261-3. PMID: 218111",
    tags: ["MDM2", "p53", "TP53", "ubiquitin ligase", "MDM2 inhibitor"],
  },
  {
    id: "q_w2_002", week: 2, module: 1, difficulty: "intermediate", type: "mcq",
    question: "A 65-year-old woman with endometrial cancer undergoes IHC for MMR proteins. The result shows absent MLH1 and absent PMS2 expression, with intact MSH2 and MSH6. Which of the following statements is most accurate?",
    options: [
      { id: "a", text: "This pattern is most consistent with a germline MSH2 mutation causing Lynch syndrome" },
      { id: "b", text: "This pattern is most consistent with sporadic MLH1 promoter hypermethylation or a somatic/germline MLH1 mutation" },
      { id: "c", text: "This patient should receive immediate PARP inhibitor therapy" },
      { id: "d", text: "This pattern indicates MSS status" },
    ],
    correctOptionId: "b",
    explanation: "MLH1 and PMS2 form a heterodimer (MutLα). PMS2 is stabilised by MLH1; loss of MLH1 causes secondary loss of PMS2 by proteolysis. Therefore, absent MLH1 + absent PMS2 with intact MSH2 + MSH6 indicates MLH1 dysfunction (not MSH2 or MSH6 mutations). The most common cause of MLH1 loss in endometrial cancer is somatic promoter hypermethylation (sporadic dMMR), accounting for ~15% of endometrial cancers. Germline MLH1 mutations (Lynch syndrome) also cause this pattern. BRAF V600E somatic mutation in colorectal dMMR cases often accompanies MLH1 methylation (sporadic marker); this is less informative in endometrial cancer. MLH1 methylation analysis should be performed to distinguish sporadic from Lynch in this context.",
    reference: "Boland CR, Goel A. Gastroenterology. 2010;138(6):2073-87. PMID: 20420947",
    tags: ["MMR", "MLH1", "PMS2", "Lynch syndrome", "promoter methylation", "dMMR", "IHC"],
  },
  {
    id: "q_w2_003", week: 2, module: 1, difficulty: "intermediate", type: "mcq",
    question: "PARP inhibitors demonstrate activity through synthetic lethality in BRCA-deficient cancers. Which of the following statements best explains this mechanism?",
    options: [
      { id: "a", text: "PARP inhibitors prevent BRCA2 from binding to RAD51, blocking homologous recombination" },
      { id: "b", text: "PARP inhibitors trap PARP-1 on single-stranded DNA breaks, converting them to double-strand breaks that cannot be repaired in BRCA-deficient cells" },
      { id: "c", text: "PARP inhibitors directly inhibit BRCA1 ubiquitination of γH2AX foci" },
      { id: "d", text: "PARP inhibitors specifically induce apoptosis through the intrinsic mitochondrial pathway" },
    ],
    correctOptionId: "b",
    explanation: "PARP inhibitors (olaparib, niraparib, rucaparib, talazoparib) work by two mechanisms: (1) catalytic inhibition of PARP1/2, preventing NAD+-to-ADP-ribose transfer needed to recruit BER repair proteins; and (2) PARP trapping — the drug-inhibitor complex is physically trapped on DNA at the SSB site, creating a physical barrier that stalls replication forks, converting SSBs to DSBs. In BRCA-proficient cells, HR efficiently repairs these DSBs. In BRCA1/2-deficient cells, HR is non-functional, and NHEJ-mediated repair is error-prone, ultimately causing lethal genomic instability. Synthetic lethality: the combination of PARP inhibition + BRCA deficiency is lethal to cancer cells while sparing normal cells with intact BRCA function.",
    reference: "Lord CJ, Ashworth A. Nature. 2017;543(7647):607-618. PMID: 28332513",
    tags: ["PARP inhibitor", "synthetic lethality", "BRCA1", "BRCA2", "HRD", "olaparib"],
  },
  // ==================== WEEK 7 — NGS Bioinformatics ====================
  {
    id: "q_w7_001", week: 7, module: 3, difficulty: "intermediate", type: "mcq",
    question: "A somatic NGS run shows a suspected KRAS G12V variant at VAF = 1.8%, depth = 420×, in an FFPE tumour sample. The variant is on only one strand (all 8 supporting reads are on the forward strand). Which of the following is the most likely explanation?",
    options: [
      { id: "a", text: "This is a true low-VAF subclonal driver mutation" },
      { id: "b", text: "This is likely an FFPE-related oxidation artefact (OxoG damage)" },
      { id: "c", text: "This represents a common germline SNP" },
      { id: "d", text: "The low depth is insufficient to call any variant" },
    ],
    correctOptionId: "b",
    explanation: "Single-strand bias (all supporting reads on one strand) is a hallmark of FFPE-related sequencing artefacts. FFPE fixation causes oxidative DNA damage, particularly 8-oxoguanine (8-oxoG), which is misread as adenine during PCR, generating C→A (or G→T on the other strand) artefacts. The key indicators here are: (1) very low VAF (1.8%), (2) shallow depth (420× — borderline for confident rare variant calling), and (3) single-strand bias (all 8 supporting reads on one strand). Genuine mutations typically appear on both forward and reverse strands. OxoG-related artefacts generate characteristic C:G→T:A or G:C→T:A substitutions. Modern bioinformatics pipelines include orientation bias filters (e.g., FilterMutectCalls OxoG artefact filter) to remove these false positives.",
    reference: "Costello M et al. Nucleic Acids Research. 2013;41(6):e67. PMID: 23303777",
    tags: ["FFPE artefact", "OxoG", "strand bias", "somatic calling", "false positive", "VAF"],
  },
  {
    id: "q_w7_002", week: 7, module: 3, difficulty: "basic", type: "mcq",
    question: "What does 'tumour purity' mean in the context of somatic NGS?",
    options: [
      { id: "a", text: "The percentage of reads that passed quality filtering" },
      { id: "b", text: "The fraction of DNA in the sample that originates from tumour cells (versus normal stromal/immune cells)" },
      { id: "c", text: "The proportion of unique reads after duplicate marking" },
      { id: "d", text: "The percentage of target bases with ≥100× coverage" },
    ],
    correctOptionId: "b",
    explanation: "Tumour purity (also called 'tumour cellularity' or 'cancer cell fraction') refers to the proportion of DNA in the sequenced sample that originates from neoplastic cells, as opposed to admixed normal stroma, immune infiltrate and normal tissue. If a tumour has 60% purity and a clonal driver mutation (present in 100% of tumour cells), the expected maximum VAF would be approximately 30% (60% × 0.5 for heterozygous mutation), not 50%. Understanding tumour purity is essential for: (1) correctly interpreting VAF — a 'low' VAF may reflect low purity rather than a subclonal event; (2) setting appropriate variant calling thresholds; (3) determining whether a variant is truly absent or simply below the purity-adjusted detection threshold.",
    tags: ["tumour purity", "VAF", "somatic NGS", "sensitivity", "clonal"],
  },
  // ==================== WEEK 10 — Variant Interpretation ====================
  {
    id: "q_w10_001", week: 10, module: 4, difficulty: "intermediate", type: "clinical-vignette",
    question: "A 48-year-old woman with no family history undergoes tumour-only somatic NGS for HR+ metastatic breast cancer. The report identifies a BRCA1 c.5266dupC (p.Gln1756ProfsTer74) variant at VAF = 48%. The gnomAD frequency of this variant is 0.000031 (0.003%). According to the AMP/ASCO/CAP somatic classification framework, what is the most appropriate initial assessment of this variant?",
    options: [
      { id: "a", text: "Tier I (strong clinical significance) — PARP inhibitor therapy immediately indicated" },
      { id: "b", text: "Tier III (variant of unknown significance) — cannot act on this result" },
      { id: "c", text: "Tier II (potential clinical significance) — germline testing required before therapeutic decisions" },
      { id: "d", text: "Likely benign — high gnomAD frequency" },
    ],
    correctOptionId: "c",
    explanation: "BRCA1 c.5266dupC (also known as 5382insC) is a well-characterised pathogenic variant, particularly enriched in Ashkenazi Jewish and Eastern European populations. The gnomAD frequency of 0.003% represents the population carrier frequency — this is a LOW population frequency consistent with pathogenicity (variants with high population frequency would be benign). However, a critical issue remains: tumour-only NGS CANNOT distinguish somatic from germline BRCA1 mutations without a matched normal sample. At VAF = 48% (consistent with tumour purity), this could be: (a) a somatic BRCA1 mutation in this tumour, or (b) a germline pathogenic variant present in all cells. PARP inhibitor eligibility (olaparib/talazoparib) for metastatic breast cancer requires confirmation of GERMLINE BRCA1/2 mutation. Therefore, Tier II is appropriate and germline testing is mandatory before PARP inhibitor prescribing.",
    reference: "Li MM et al. J Mol Diagn. 2017;19(1):4-23. PMID: 27993330",
    tags: ["BRCA1", "germline vs somatic", "tumour-only NGS", "PARP inhibitor", "5382insC", "AMP/ASCO/CAP"],
  },
  {
    id: "q_w10_002", week: 10, module: 4, difficulty: "basic", type: "mcq",
    question: "According to ACMG/AMP 2015 guidelines, which criterion provides the strongest evidence for pathogenicity of a germline variant?",
    options: [
      { id: "a", text: "PS1 — same amino acid change as a known pathogenic variant" },
      { id: "b", text: "PVS1 — null variant in a gene where loss-of-function is a disease mechanism" },
      { id: "c", text: "PM2 — absent from population databases" },
      { id: "d", text: "PP3 — multiple computational tools predict pathogenicity" },
    ],
    correctOptionId: "b",
    explanation: "PVS1 (Pathogenic Very Strong 1) is the highest-weight single evidence criterion in the ACMG/AMP framework. It applies to null variants (nonsense, frameshift, essential splice site, initiation codon, single/multi-exon deletion) in genes where loss-of-function is an established disease mechanism. PVS1 alone can contribute substantially to classification, often reaching 'Likely Pathogenic' in combination with just one supporting criterion. PS1 (pathogenic strong) applies when the same amino acid change is established — but note different nucleotide changes creating the same amino acid change require separate evaluation. PM2 (absent in population databases) is moderate evidence, and PP3 (computational tools) is supporting — both have lower weight than PVS1. The hierarchy is PVS1 > PS > PM > PP.",
    reference: "Richards S et al. Genet Med. 2015;17(5):405-24. PMID: 25741868",
    tags: ["ACMG/AMP", "PVS1", "variant classification", "loss-of-function", "pathogenic"],
  },
];

export function getQuestionsByWeek(week: number): AssessmentQuestion[] {
  return ASSESSMENT_QUESTIONS.filter(q => q.week === week);
}

export function getQuestionsByModule(module: number): AssessmentQuestion[] {
  return ASSESSMENT_QUESTIONS.filter(q => q.module === module);
}

export function getQuestionsByDifficulty(difficulty: "basic" | "intermediate" | "advanced"): AssessmentQuestion[] {
  return ASSESSMENT_QUESTIONS.filter(q => q.difficulty === difficulty);
}

export function getRandomQuestions(count: number, week?: number): AssessmentQuestion[] {
  let pool = week ? getQuestionsByWeek(week) : ASSESSMENT_QUESTIONS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
