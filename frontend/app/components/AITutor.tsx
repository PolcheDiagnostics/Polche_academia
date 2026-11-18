"use client";
import { useState } from "react";
import { searchKnowledge, CIVIC_EVIDENCE, PATHWAY_DATA, type ScientificEntry } from "../data/rag-knowledge";

type TutorMode = "explain-simple" | "explain-advanced" | "clinical" | "compare" | "quiz" | "socratic" | "evidence" | "summarise";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Array<{ title: string; source: string; licence: string; pmid?: string; doi?: string }>;
  mode?: TutorMode;
}

const TUTOR_MODES: Array<{ id: TutorMode; label: string; icon: string; desc: string }> = [
  { id: "explain-simple", label: "Explain Simply", icon: "📖", desc: "Plain language for a medical student" },
  { id: "explain-advanced", label: "Advanced", icon: "🔬", desc: "Expert molecular biology level" },
  { id: "clinical", label: "Clinical Relevance", icon: "🏥", desc: "How this applies to patient care" },
  { id: "compare", label: "Compare Concepts", icon: "⚖️", desc: "Compare and contrast mechanisms" },
  { id: "quiz", label: "Quiz Me", icon: "📝", desc: "Test your understanding" },
  { id: "socratic", label: "Socratic", icon: "🤔", desc: "Guided questions to discover answers" },
  { id: "evidence", label: "Show Evidence", icon: "📚", desc: "Underlying scientific literature" },
  { id: "summarise", label: "Summarise", icon: "🗒️", desc: "Key learning points" },
];

const QUICK_QUESTIONS = [
  "What is a driver mutation?",
  "Explain MSI-H and immunotherapy",
  "How does KRAS G12C drive cancer?",
  "What is HRD and PARP inhibition?",
  "Explain tumour mutational burden",
  "How does EGFR TKI resistance develop?",
];

// Simulated RAG-grounded responses
function generateResponse(question: string, mode: TutorMode): { content: string; citations: Message["citations"] } {
  const hits = searchKnowledge(question);
  const lq = question.toLowerCase();

  let content = "";
  const citations: Message["citations"] = [];

  // Build citation list from search hits — ScientificEntry has .title; CIViCEntry does not
  hits.slice(0, 3).forEach(h => {
    const title = "title" in h ? h.title : `${(h as any).gene} ${(h as any).variant} — ${(h as any).disease}`;
    citations.push({
      title,
      source: h.source,
      licence: h.licence,
      pmid: (h as any).pmid,
      doi: (h as any).doi,
    });
  });

  if (mode === "quiz") {
    content = `📝 **Quiz question based on "${question}":**\n\nWhich of the following statements is correct?\n\nA) KRAS G12C mutations prevent GTP hydrolysis, locking RAS in an active state\nB) KRAS mutations are most common in breast cancer\nC) All RAS mutations are equally targetable with current therapies\nD) KRAS mutations occur in less than 5% of NSCLC\n\n*Type your answer (A/B/C/D) or ask me to reveal the answer.*`;
    return { content, citations: [] };
  }

  if (mode === "socratic") {
    if (lq.includes("kras") || lq.includes("ras")) {
      content = `🤔 Let's think through this together.\n\nRAS proteins act as molecular switches. What do you think happens when a switch is permanently stuck in the "ON" position?\n\nConsider: What would happen to downstream signalling pathways like MAPK and PI3K?`;
    } else if (lq.includes("msi") || lq.includes("microsatellite")) {
      content = `🤔 Good question. Let's reason from first principles.\n\nMicrosatellites are repetitive DNA sequences. If the mismatch repair (MMR) system fails, what accumulates? And if thousands of mutations accumulate in a tumour, how might the immune system respond to those neoantigens?`;
    } else {
      content = `🤔 Let's explore "${question}" step by step.\n\nBefore I explain, what do you already know about this concept? What parts are you uncertain about? Understanding your current mental model will help me guide you more effectively.`;
    }
    return { content, citations: [] };
  }

  // Topic-specific responses
  if (lq.includes("driver") || lq.includes("passenger")) {
    if (mode === "explain-simple") {
      content = `🧬 **Driver vs Passenger Mutations**\n\nImagine a car crash. The **driver** causes the crash — they're in control. A **passenger** just happens to be there.\n\n**Driver mutations** actively help cancer grow. They give the cancer cell an advantage — growing faster, avoiding death, invading nearby tissue.\n\n**Passenger mutations** are "accidental" DNA changes that happened during cancer growth but don't help the cancer. They're just along for the ride.\n\n**Why it matters clinically:** We target driver mutations with drugs (e.g. osimertinib targets EGFR L858R). Passenger mutations are mostly irrelevant to treatment.`;
    } else if (mode === "explain-advanced") {
      content = `🔬 **Driver vs Passenger Mutations — Molecular Basis**\n\nDriver mutations confer selective growth advantage through gain-of-function (oncogenes: KRAS, EGFR, BRAF) or loss-of-function (TSGs: TP53, BRCA1/2, APC) alterations. They undergo positive clonal selection during tumourigenesis.\n\nPassenger mutations accumulate through:\n- Background mutational processes (SBS signatures)\n- Replication errors (polymerase fidelity ~10⁻⁹/base/replication)\n- Mutagenic exposures (SBS4 tobacco, SBS7 UV)\n\nKey distinction: drivers display elevated dN/dS ratios across cancer cohorts (Martincorena et al., 2017). Functional validation requires experimental evidence (CRISPR screens, saturation mutagenesis).`;
    } else {
      content = `🏥 **Clinical Relevance of Driver vs Passenger Mutations**\n\nIdentifying drivers guides treatment:\n\n• **Tier I variants** (AMP/ASCO/CAP): Strong evidence for clinical benefit (e.g. EGFR L858R → osimertinib, BRAF V600E → vemurafenib)\n• Passenger mutations may generate neoantigens → relevant for immunotherapy response prediction\n• High passenger mutation burden (high TMB) → better immunotherapy response in some tumour types\n\nMolecular tumour boards must distinguish actionable driver mutations from incidental passengers to avoid mis-directing targeted therapy.`;
    }
  } else if (lq.includes("msi") || lq.includes("microsatellite") || lq.includes("mmr")) {
    content = `🧬 **MSI and Immunotherapy**\n\nMismatch repair (MMR) proteins (MLH1, MSH2, MSH6, PMS2) correct DNA replication errors at repetitive sequences (microsatellites).\n\n**When MMR is deficient (dMMR/MSI-H):**\n• Microsatellites accumulate insertion/deletion errors\n• Tumour mutational burden (TMB) is markedly elevated (often >10 mut/Mb)\n• Hypermutated tumours generate many neoantigens\n• T cells recognise neoantigens → strong anti-tumour immune response\n\n**Clinical implication:** Pembrolizumab (anti-PD-1) is FDA-approved for all MSI-H solid tumours regardless of histology (Le et al., 2017). IHC for MMR proteins is a standard companion diagnostic.`;
    citations.push({ title: "PD-1 Blockade in Tumors with Mismatch-Repair Deficiency", source: "NEJM 2015 — Le et al.", licence: "Metadata only" });
  } else if (lq.includes("kras") || lq.includes("g12c")) {
    const civic = CIVIC_EVIDENCE.find(c => c.gene === "KRAS");
    content = `🧬 **KRAS G12C — Mechanism and Targetability**\n\nKRAS (Kirsten Rat Sarcoma viral proto-oncogene) is the most commonly mutated oncogene in human cancer (~25% of all cancers).\n\n**Mechanism:** G12C substitution (Glycine → Cysteine at codon 12) prevents GTPase activity, locking KRAS in GTP-bound active state. Constitutive activation drives RAF-MEK-ERK and PI3K-AKT signalling.\n\n**G12C specificity:** The cysteine residue creates a reactive thiol group in the GDP-bound state. Allosteric inhibitors (sotorasib, adagrasib) covalently bind this cysteine, trapping KRAS in its inactive GDP-bound state.\n\n**Approvals:** Sotorasib (LUMAKRAS) — FDA approved for KRAS G12C NSCLC (CodeBreaK 100 trial).`;
    if (civic) {
      citations.push({ title: civic.statement, source: `CIViC ${civic.gene}`, licence: civic.licence, doi: civic.sourceUrl });
    }
  } else if (lq.includes("hrd") || lq.includes("brca") || lq.includes("parp")) {
    content = `🧬 **HRD and PARP Inhibition**\n\n**Homologous Recombination Deficiency (HRD):**\nTumours with defective HR pathway (BRCA1/2 mutations, PALB2, RAD51C/D, or epigenetic silencing) cannot repair double-strand DNA breaks accurately.\n\n**PARP inhibition mechanism (synthetic lethality):**\n• PARP1/2 repair single-strand DNA breaks (SSBs) via base excision repair\n• PARP inhibitors (olaparib, niraparib, rucaparib) trap PARP on DNA\n• Stalled replication forks → DSBs accumulate\n• HR-deficient cells cannot repair DSBs → cell death\n• HR-proficient normal cells can compensate → selective cancer cell killing\n\n**HRD testing:** Genomic scars (LOH, telomeric allelic imbalance, LST) → Myriad myChoice or FoundationOne CDx HRD scores.`;
  } else {
    content = `🤖 **AI Tutor Response — "${question}"**\n\nThis is a complex topic in molecular oncology. Let me provide a structured explanation:\n\nThis question relates to the core molecular biology underlying cancer diagnostics and precision oncology.\n\nFor a comprehensive answer grounded in the latest evidence, I've searched our scientific knowledge base using approved sources (CIViC CC0, Reactome CC-BY, PubMed metadata).\n\n${hits.length > 0 ? `I found ${hits.length} relevant entries in our knowledge base.` : "This specific topic may need additional sources."}\n\nTo get a more targeted response, try one of the Quick Questions or be more specific about the concept you'd like to explore. You can also change the tutor mode (Simple, Advanced, Clinical) for different perspectives.\n\n**Note:** All scientific information comes from approved, licence-compliant sources. Citations are provided with every substantive answer.`;
  }

  if (mode === "summarise") {
    content = `📋 **Key Learning Points for "${question}":**\n\n• This concept is covered in Modules 1–5 of the Certificate\n• Core principle: Molecular alterations drive cancer biology and define therapeutic targets\n• Clinical application: Companion diagnostics guide treatment selection\n• Evidence level: Multiple Phase III trials support clinical use\n\n*Full explanation available — select another mode for details.*`;
  }

  return { content, citations };
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<TutorMode>("explain-simple");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (question?: string) => {
    const q = question || input.trim();
    if (!q) return;

    const userMsg: Message = { role: "user", content: q, mode };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate processing delay
    await new Promise(r => setTimeout(r, 600));

    const { content, citations } = generateResponse(q, mode);
    const assistantMsg: Message = { role: "assistant", content, citations, mode };
    setMessages(prev => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in flex flex-col h-[80vh]">
      <div className="mb-3">
        <h2 className="text-white font-bold text-lg">🤖 AI Scientific Tutor</h2>
        <p className="text-slate-400 text-xs">Answers grounded in CIViC (CC0), Reactome (CC-BY) and PubMed metadata · Citations provided</p>
      </div>

      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap mb-3">
        {TUTOR_MODES.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            title={m.desc}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors flex items-center gap-1 ${
              mode === m.id
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                : "glass text-slate-500 hover:text-white"
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-3 pr-1">
        {messages.length === 0 && (
          <div className="glass rounded-xl p-5 text-center">
            <div className="text-3xl mb-3">🧬</div>
            <div className="text-white font-semibold mb-2">Ask Me Anything About Molecular Oncology</div>
            <div className="text-slate-500 text-sm mb-4">
              I use evidence from approved scientific sources (CIViC CC0, Reactome CC-BY, PubMed metadata).
              I always provide citations and communicate uncertainty.
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="glass glass-hover px-3 py-2 rounded-lg text-xs text-slate-300 text-left hover:text-teal-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                🤖
              </div>
            )}
            <div className={`max-w-2xl rounded-xl p-4 ${
              msg.role === "user"
                ? "glass text-white ml-12"
                : "glass border border-teal-500/10"
            }`}>
              {msg.role === "assistant" && msg.mode && (
                <div className="text-teal-400 text-[10px] font-bold uppercase mb-2">
                  {TUTOR_MODES.find(m => m.id === msg.mode)?.icon} {TUTOR_MODES.find(m => m.id === msg.mode)?.label}
                </div>
              )}
              <div className="text-white text-sm whitespace-pre-line leading-relaxed">{msg.content}</div>
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  <div className="text-slate-500 text-[10px] font-bold uppercase">Scientific Sources</div>
                  {msg.citations.map((cit, ci) => (
                    <div key={ci} className="flex items-start gap-2">
                      <span className="text-blue-500 text-[10px] flex-shrink-0 mt-0.5">[{ci + 1}]</span>
                      <div>
                        <span className="text-slate-400 text-[11px]">{cit.title}</span>
                        <span className="text-slate-600 text-[10px] ml-2">· {cit.source}</span>
                        <span className="text-green-600 text-[10px] ml-2">· {cit.licence}</span>
                        {cit.pmid && <span className="citation-badge text-[9px] ml-1">PMID: {cit.pmid}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-sm flex-shrink-0">
              🤖
            </div>
            <div className="glass rounded-xl p-4 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-teal-500/60 animate-pulse"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
              <span className="text-slate-500 text-xs">Searching scientific knowledge base…</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="glass p-3 rounded-xl border border-teal-500/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about molecular oncology, diagnostics, or clinical applications…"
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg text-teal-400 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="text-slate-700 text-[10px] mt-2">
          ⚠️ Scientific information only · Not clinical advice · Citing approved licences only (CC0, CC-BY, metadata) · AI content requires faculty review before teaching use
        </div>
      </div>
    </div>
  );
}
