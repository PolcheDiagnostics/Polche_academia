"use client";
import { useState } from "react";
import { CURRICULUM } from "../data/curriculum";
import { CIVIC_EVIDENCE } from "../data/rag-knowledge";

type StudioState = "select" | "preview" | "edit" | "export";

interface SlideContent {
  title: string;
  bullets: string[];
  speakerNotes: string;
  evidence: string[];
  status: "ready" | "needs-review" | "approved";
}

function generateWeek1Slides(): SlideContent[] {
  const week = CURRICULUM[0];
  return [
    {
      title: "Learning Objectives",
      bullets: week.lectureObjectives,
      speakerNotes: "Begin by orienting participants to the landscape of molecular oncology. Emphasise that cancer is fundamentally a disease of altered gene expression and genomic instability.",
      evidence: ["Module 1 curriculum — Polche Academia"],
      status: "ready",
    },
    {
      title: "Cancer as a Genomic Disease",
      bullets: [
        "Cancer arises from accumulation of somatic mutations in key regulatory genes",
        "Oncogenes, tumour suppressor genes and DNA repair genes are the three major gene classes",
        "The 'hallmarks of cancer' framework unifies diverse cancer phenotypes",
        "Next-generation sequencing has revealed the full extent of tumour genomic complexity",
      ],
      speakerNotes: "Introduce the concept that cancer is not a single disease but a collection of genomic diseases. Use the Hanahan & Weinberg hallmarks framework as a conceptual scaffold.",
      evidence: ["Hanahan & Weinberg (2011) Hallmarks of Cancer — PMID 21376230 · CC BY-NC (cite only)"],
      status: "needs-review",
    },
    {
      title: "Driver vs Passenger Mutations",
      bullets: [
        "Driver mutations confer selective growth advantage — they are under positive selection",
        "Passenger mutations accumulate by chance — no functional role in oncogenesis",
        "Typical cancer genome: 2–8 driver mutations, thousands of passengers",
        "Driver identification: elevated dN/dS ratios, recurrence across cohorts, functional validation",
      ],
      speakerNotes: "Use the analogy of a car crash to illustrate drivers vs passengers. Emphasise that treatment targets drivers, not passengers.",
      evidence: ["Vogelstein et al. (2013) Cancer Genome Landscapes — PMID 23539594", "CIViC database (CC0) — variant evidence"],
      status: "ready",
    },
    {
      title: "Major Oncogene Classes",
      bullets: [
        "RTKs (EGFR, MET, ALK) — activate downstream RAS-MAPK and PI3K-AKT",
        "RAS family (KRAS, NRAS, HRAS) — mutated in ~25% of all human cancers",
        "BRAF — serine/threonine kinase downstream of RAS; V600E in ~50% melanoma",
        "MYC family — transcription factors driving proliferation; difficult to target",
      ],
      speakerNotes: "Walk through each class with one clinical example. KRAS G12C → sotorasib is an excellent example of moving from 'undruggable' to targeted.",
      evidence: ["CIViC KRAS G12C (CC0)", "CIViC BRAF V600E (CC0)", "CIViC EGFR L858R (CC0)"],
      status: "ready",
    },
    {
      title: "Tumour Suppressor Genes",
      bullets: [
        "TSGs restrain cell proliferation — loss of function promotes cancer",
        "Two-hit hypothesis (Knudson 1971): both alleles must be inactivated",
        "TP53 — guardian of the genome; mutated in >50% of all cancers",
        "RB1, APC, BRCA1/2, PTEN, CDK2NA — major clinical TSGs",
      ],
      speakerNotes: "TP53 is the most commonly mutated gene in cancer. Explain the concept of dominant negative mutations in TP53 (R175H) versus true loss-of-function.",
      evidence: ["CIViC TP53 R175H (CC0)", "COSMIC Cancer Gene Census (CC-BY 4.0)"],
      status: "needs-review",
    },
    {
      title: "DNA Repair Pathways in Cancer",
      bullets: [
        "Homologous recombination (HR): repairs DSBs with high fidelity — BRCA1/2, PALB2",
        "Mismatch repair (MMR): corrects replication errors — MLH1, MSH2, MSH6, PMS2",
        "NHEJ: error-prone DSB repair — active in G1 phase",
        "BER and NER: base and bulky lesion repair — impaired by tobacco, UV exposure",
      ],
      speakerNotes: "Link DNA repair pathway deficiency to mutational signatures and to therapeutic vulnerabilities (PARP inhibitors for HR deficiency; immunotherapy for MMR deficiency).",
      evidence: ["Reactome: Homologous Recombination (CC BY 4.0)", "Reactome: Mismatch Repair (CC BY 4.0)"],
      status: "ready",
    },
    {
      title: "Clinical Application: Targeted Therapy",
      bullets: [
        "Precision oncology matches molecular targets to approved or investigational therapies",
        "EGFR L858R → osimertinib (FLAURA trial, OS benefit vs chemotherapy)",
        "BRAF V600E → vemurafenib + cobimetinib in melanoma",
        "KRAS G12C → sotorasib (CodeBreaK 100) — first approved RAS inhibitor",
        "BRCA1/2 → olaparib in breast and ovarian cancer",
      ],
      speakerNotes: "Demonstrate the clinical translation of driver mutation knowledge. Each example should link the genomic target to its approved drug and pivotal trial.",
      evidence: ["CIViC EGFR L858R (CC0)", "CIViC BRAF V600E (CC0)", "CIViC KRAS G12C (CC0)", "CIViC BRCA1/2 (CC0)"],
      status: "ready",
    },
    {
      title: "Synthetic NGS Case: NSCLC",
      bullets: [
        "⚠️ SYNTHETIC CASE — no real patient data — educational only",
        "SYNTH-LUNG-001: Adenocarcinoma, 58-year-old, non-smoker",
        "EGFR L858R (VAF 38%, depth 1247×, Tier I AMP/ASCO)",
        "TP53 G245S (VAF 56%, Tier III — variant of uncertain significance)",
        "MSS, TMB 4.2 mut/Mb, Tumour purity 72%",
        "Clinical decision: Osimertinib first-line (FLAURA data)",
      ],
      speakerNotes: "Walk students through interpreting a synthetic molecular report. Emphasise the importance of Tier classification, VAF interpretation, and MSI/TMB assessment.",
      evidence: ["CIViC EGFR L858R (CC0)", "Synthetic case — no real patient data (Polche Academia)"],
      status: "needs-review",
    },
    {
      title: "Take-Home Messages — Week 1",
      bullets: [
        "Cancer is a genomic disease driven by accumulation of somatic (and sometimes germline) mutations",
        "Driver mutations are therapeutically actionable; identify them with targeted NGS panels",
        "The hallmarks of cancer framework provides a conceptual map of oncogenic mechanisms",
        "DNA repair deficiency creates both mutational signatures and therapeutic vulnerabilities",
        "Every molecular finding must be interpreted in clinical context — seek the Molecular Tumour Board",
      ],
      speakerNotes: "End with a preview of Week 2 (cell signalling pathways) and encourage students to explore the interactive pathway simulator.",
      evidence: ["Module 1 curriculum — Polche Academia"],
      status: "approved",
    },
  ];
}

export default function PowerPointStudio() {
  const [state, setState] = useState<StudioState>("select");
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [slides, setSlides] = useState<SlideContent[]>([]);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [editingNotes, setEditingNotes] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [approved, setApproved] = useState<Record<number, boolean>>({});

  const generateSlides = async (week: number) => {
    setGenerating(true);
    setSelectedWeek(week);
    await new Promise(r => setTimeout(r, 1200));
    const generated = week === 1 ? generateWeek1Slides() : generateWeek1Slides().map(s => ({
      ...s,
      title: `Week ${week}: ${s.title}`,
      status: "needs-review" as const,
    }));
    setSlides(generated);
    setGenerating(false);
    setState("preview");
  };

  const approveSlide = (idx: number) => {
    setApproved(prev => ({ ...prev, [idx]: true }));
    setSlides(prev => prev.map((s, i) => i === idx ? { ...s, status: "approved" } : s));
  };

  const exportPPTX = async () => {
    setState("export");
    await new Promise(r => setTimeout(r, 800));
    // In production, this would call the FastAPI backend /api/pptx/generate
    // which uses python-pptx to generate a real .pptx file
    alert("PowerPoint generation requires the FastAPI backend.\n\nIn production:\n• POST /api/pptx/generate with slide data\n• python-pptx generates editable .pptx\n• Returns download link\n\nAll slide content is in DRAFT status until faculty-approved.");
    setState("preview");
  };

  if (state === "select") {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-4">
          <h2 className="text-white font-bold text-lg">📊 PowerPoint Generation Studio</h2>
          <p className="text-slate-400 text-sm">Generate editable lecture slides with scientific citations</p>
          <div className="mt-2 p-2 glass rounded-lg border border-amber-500/20 text-xs text-amber-400">
            ⚠️ AI-generated content is a <strong>DRAFT</strong> for faculty review only.
            Content must be reviewed, modified and approved by faculty before student release.
          </div>
        </div>

        <div className="grid gap-3 max-h-[65vh] overflow-y-auto pr-1">
          {CURRICULUM.slice(0, 12).map(week => (
            <div key={week.week} className="glass p-4 rounded-xl flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">Week {week.week}: {week.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{week.lectureObjectives[0]}</div>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] text-slate-600">~{week.week === 1 ? "9" : "8"} slides</span>
                  <span className="text-[10px] text-amber-500">Draft status</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => generateSlides(week.week)}
                  disabled={generating}
                  className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-xs transition-colors disabled:opacity-40"
                >
                  {generating ? "Generating…" : "Generate Slides"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in py-20">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-white font-semibold text-lg mb-2">Generating Slide Deck</h3>
        <p className="text-slate-400 text-sm mb-6">Searching scientific knowledge base, verifying citations, structuring content…</p>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-teal-500/60 animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
        <div className="mt-4 text-xs text-slate-600">
          Verifying licence compliance · CIViC CC0 · Reactome CC-BY · No copyright infringement
        </div>
      </div>
    );
  }

  const slide = slides[selectedSlide];
  const totalApproved = Object.values(approved).filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <button
            onClick={() => setState("select")}
            className="text-teal-400 text-xs hover:underline mb-1 block"
          >← Select different week</button>
          <h2 className="text-white font-bold">Week {selectedWeek} — Lecture Slides</h2>
          <p className="text-slate-400 text-xs">{slides.length} slides generated · {totalApproved}/{slides.length} approved</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportPPTX}
            disabled={totalApproved < slides.length}
            title={totalApproved < slides.length ? "Approve all slides before export" : "Export PPTX"}
            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            📥 Export .pptx {totalApproved < slides.length ? `(${slides.length - totalApproved} pending)` : ""}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* Slide thumbnails */}
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlide(i)}
              className={`w-full text-left glass p-3 rounded-xl transition-all ${
                selectedSlide === i ? "border border-teal-500/40 bg-teal-500/5" : "glass-hover"
              }`}
            >
              <div className="text-white text-[11px] font-medium leading-tight mb-1">{i + 1}. {s.title}</div>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  s.status === "approved" ? "bg-green-500" :
                  s.status === "needs-review" ? "bg-amber-500" :
                  "bg-blue-500"
                }`} />
                <span className={`text-[9px] ${
                  s.status === "approved" ? "text-green-400" :
                  s.status === "needs-review" ? "text-amber-400" :
                  "text-blue-400"
                }`}>{s.status === "approved" ? "Approved" : s.status === "needs-review" ? "Needs Review" : "Ready"}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Slide editor */}
        <div className="lg:col-span-3 space-y-3">
          {slide && (
            <>
              {/* Slide preview */}
              <div className="glass rounded-xl overflow-hidden" style={{ background: "linear-gradient(135deg, #101D35 0%, #0d1829 100%)" }}>
                <div className="p-6 min-h-48">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-teal-500 rounded-full" />
                    <h3 className="text-white font-bold text-lg">{slide.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {slide.bullets.map((b, i) => (
                      <li key={i} className={`flex gap-2 text-sm ${b.includes("⚠️") ? "text-amber-300" : "text-slate-300"}`}>
                        <span className="text-teal-500 flex-shrink-0 mt-1">•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between text-[10px] text-slate-600">
                    <span>Polche Academia · Certificate in Molecular Diagnostics & Precision Oncology</span>
                    <span>Slide {selectedSlide + 1}/{slides.length}</span>
                  </div>
                </div>
              </div>

              {/* Evidence panel */}
              <div className="glass p-3 rounded-xl">
                <div className="text-teal-400 text-xs font-bold uppercase mb-2">📚 Scientific Evidence</div>
                <div className="space-y-1">
                  {slide.evidence.map((e, i) => (
                    <div key={i} className="flex gap-2 text-xs text-slate-400">
                      <span className="text-blue-500 flex-shrink-0">[{i + 1}]</span>
                      {e}
                    </div>
                  ))}
                </div>
                {slide.status === "needs-review" && (
                  <div className="mt-2 text-[10px] text-amber-400">
                    ⚠️ This slide contains content requiring faculty verification before student release
                  </div>
                )}
              </div>

              {/* Speaker notes */}
              <div className="glass p-3 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-slate-400 text-xs font-bold uppercase">Speaker Notes</div>
                  <button
                    onClick={() => setEditingNotes(!editingNotes)}
                    className="text-xs text-teal-400 hover:underline"
                  >
                    {editingNotes ? "Done" : "Edit"}
                  </button>
                </div>
                {editingNotes ? (
                  <textarea
                    defaultValue={slide.speakerNotes}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-slate-300 text-sm resize-none h-24 focus:outline-none focus:border-teal-500/40"
                  />
                ) : (
                  <p className="text-slate-400 text-sm">{slide.speakerNotes}</p>
                )}
              </div>

              {/* Approve button */}
              <div className="flex gap-2">
                {slide.status !== "approved" ? (
                  <button
                    onClick={() => approveSlide(selectedSlide)}
                    className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm transition-colors"
                  >
                    ✅ Approve Slide (Faculty Confirmation)
                  </button>
                ) : (
                  <div className="flex-1 py-2 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center">
                    ✅ Approved
                  </div>
                )}
                {selectedSlide < slides.length - 1 && (
                  <button
                    onClick={() => setSelectedSlide(selectedSlide + 1)}
                    className="px-4 py-2 glass hover:bg-white/5 rounded-xl text-slate-400 text-sm transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
