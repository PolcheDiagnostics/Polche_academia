"use client";
import { useState } from "react";
import { NGS_CASES, getCaseById } from "../data/ngs-cases";

type ViewState = "case-select" | "variants" | "interpretation" | "model-answer";

export default function NGSStudio() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [view, setView] = useState<ViewState>("case-select");
  const [userInterpretation, setUserInterpretation] = useState("");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);

  const selectedCase = selectedCaseId ? getCaseById(selectedCaseId) : null;

  if (view === "case-select") {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-4">
          <h2 className="text-white font-bold text-lg">🔬 NGS Report Interpretation Studio</h2>
          <p className="text-slate-400 text-sm">Learn to interpret molecular reports using synthetic cases</p>
          <div className="mt-1 p-2 glass rounded-lg border border-green-500/20 text-xs text-green-400">
            🛡️ All cases are <strong>completely synthetic and fictitious</strong>. No real patient data.
            Not for clinical use. Educational purposes only.
          </div>
        </div>

        <div className="grid gap-4">
          {NGS_CASES.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCaseId(c.id); setView("variants"); setUserInterpretation(""); }}
              className="glass glass-hover p-5 rounded-xl text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white font-semibold text-sm">{c.tumourType}</span>
                    <span className="text-slate-400 text-xs">({c.caseCode})</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      c.difficulty === "beginner"
                        ? "text-green-400 border-green-400/30 bg-green-400/10"
                        : c.difficulty === "intermediate"
                        ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
                        : "text-red-400 border-red-400/30 bg-red-400/10"
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mb-2 line-clamp-2">{c.clinicalHistory}</div>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="citation-badge">MSI: {c.msi}</span>
                    <span className="citation-badge">TMB: {c.tmb} mut/Mb</span>
                    <span className="citation-badge">{c.variants.length} variants</span>
                    {c.hrdScore !== undefined && <span className="citation-badge">HRD: {c.hrdScore}</span>}
                  </div>
                </div>
                <div className="text-teal-400 text-2xl flex-shrink-0">→</div>
              </div>
              <div className="mt-3 text-[10px] text-slate-600 border-t border-white/5 pt-2">
                Teaching focus: {c.teachingPoints[0]}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!selectedCase) return null;
  const variant = selectedCase.variants[selectedVariantIdx];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      {/* Case header */}
      <div className="glass p-4 rounded-xl mb-4 border border-green-500/10">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <button
              onClick={() => setView("case-select")}
              className="text-teal-400 text-xs hover:underline mb-2 block"
            >← Back to cases</button>
            <h2 className="text-white font-bold">{selectedCase.tumourType} — {selectedCase.caseCode}</h2>
            <p className="text-slate-400 text-sm mt-1 line-clamp-3">{selectedCase.clinicalHistory}</p>
          </div>
          <div className="text-[10px] px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            🛡️ Synthetic Case — No Real Patient Data
          </div>
        </div>

        {/* QC metrics */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
          {[
            { label: "Tumour Purity", val: `${Math.round(selectedCase.qcMetrics.tumorPurity * 100)}%` },
            { label: "Mean Coverage", val: `${selectedCase.qcMetrics.meanCoverage}×` },
            { label: "MSI Status", val: selectedCase.msi },
            { label: "TMB", val: `${selectedCase.tmb} m/Mb` },
            { label: "Pass QC", val: selectedCase.qcMetrics.passQC ? "✓ Pass" : "✗ Fail" },
            { label: "Uniformity", val: `${selectedCase.qcMetrics.uniformity}%` },
          ].map(m => (
            <div key={m.label} className="glass p-2 rounded-lg text-center">
              <div className="text-white text-xs font-bold">{m.val}</div>
              <div className="text-slate-600 text-[9px]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex gap-2 mb-4">
        {(["variants", "interpretation", "model-answer"] as ViewState[]).map(tab => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              view === tab
                ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                : "glass text-slate-500 hover:text-white"
            }`}
          >
            {tab === "variants" ? "🧬 Variants" : tab === "interpretation" ? "📝 Your Interpretation" : "✅ Model Answer"}
          </button>
        ))}
      </div>

      {view === "variants" && (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Variant list */}
          <div className="space-y-2">
            {selectedCase.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariantIdx(i)}
                className={`w-full text-left glass p-3 rounded-xl transition-all ${
                  selectedVariantIdx === i ? "border border-teal-500/40 bg-teal-500/5" : "glass-hover"
                }`}
              >
                <div className="text-white text-xs font-bold">{v.gene} {v.protein}</div>
                <div className="text-slate-500 text-[10px]">{v.variantType}</div>
                <div className="flex gap-2 mt-1">
                  <span className="citation-badge text-[9px]">VAF {(v.vaf * 100).toFixed(0)}%</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                    v.somaticTier === "Tier I" ? "text-red-400 border-red-400/30" :
                    v.somaticTier === "Tier II" ? "text-orange-400 border-orange-400/30" :
                    v.somaticTier === "Tier III" ? "text-yellow-400 border-yellow-400/30" :
                    "text-slate-500 border-slate-700"
                  }`}>{v.somaticTier}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Variant detail */}
          <div className="lg:col-span-2 glass p-4 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-white font-bold text-base">{variant.gene} {variant.protein}</div>
                <div className="text-slate-400 text-xs">{variant.variantType} · {variant.cDNA}</div>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  variant.somaticTier === "Tier I" ? "text-red-400 border-red-400/30 bg-red-400/10" :
                  variant.somaticTier === "Tier II" ? "text-orange-400 border-orange-400/30 bg-orange-400/10" :
                  "text-yellow-400 border-yellow-400/30 bg-yellow-400/10"
                }`}>
                  AMP {variant.somaticTier}
                </span>
                {variant.oncokbLevel && (
                  <span className="text-xs px-2 py-1 rounded-full border text-blue-400 border-blue-400/30 bg-blue-400/10">
                    OncoKB {variant.oncokbLevel}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "VAF", val: `${(variant.vaf * 100).toFixed(1)}%` },
                { label: "Coverage", val: `${variant.coverageDepth}×` },
                { label: "Alt Reads", val: `${variant.altReads}` },
                { label: "Ref Reads", val: `${variant.refReads}` },
                { label: "Classification", val: variant.classification },
                { label: "Actionability", val: variant.actionability },
              ].map(m => (
                <div key={m.label} className="glass p-2 rounded-lg">
                  <div className="text-slate-500 text-[10px]">{m.label}</div>
                  <div className="text-white text-xs font-semibold">{m.val}</div>
                </div>
              ))}
            </div>

            <div className="mb-3">
              <div className="text-teal-400 text-xs font-bold uppercase mb-1">Clinical Interpretation</div>
              <p className="text-slate-300 text-sm">{variant.interpretation}</p>
            </div>

            {variant.therapeuticImplication && (
              <div className="glass p-3 rounded-lg border border-blue-500/20">
                <div className="text-blue-400 text-xs font-bold mb-1">💊 Therapeutic Implication</div>
                <div className="text-slate-300 text-sm">{variant.therapeuticImplication}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "interpretation" && (
        <div className="glass p-5 rounded-xl space-y-4">
          <h3 className="text-white font-semibold">Write Your Interpretation</h3>
          <p className="text-slate-400 text-sm">
            Based on the variants, QC metrics, MSI/TMB status and clinical history, write a molecular
            pathology interpretation. Address actionable findings, evidence levels, and clinical recommendations.
          </p>
          <div className="glass p-3 rounded-lg border border-amber-500/10 text-xs text-amber-400">
            ⚠️ This is an educational exercise using a synthetic case. Never use AI-generated interpretations for real patient care.
          </div>
          <textarea
            value={userInterpretation}
            onChange={e => setUserInterpretation(e.target.value)}
            placeholder="Write your molecular pathology interpretation here...&#10;&#10;Consider: actionable variants, tier classifications, therapeutic implications, MSI/TMB, additional testing recommendations..."
            className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm placeholder-slate-600 resize-none focus:outline-none focus:border-teal-500/50"
          />
          <button
            onClick={() => setView("model-answer")}
            className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-400 text-sm transition-colors"
          >
            View Model Answer →
          </button>
        </div>
      )}

      {view === "model-answer" && (
        <div className="space-y-4">
          {userInterpretation && (
            <div className="glass p-4 rounded-xl border border-blue-500/10">
              <h3 className="text-blue-400 text-xs font-bold uppercase mb-2">Your Interpretation</h3>
              <p className="text-slate-300 text-sm whitespace-pre-line">{userInterpretation}</p>
            </div>
          )}

          <div className="glass p-5 rounded-xl border border-green-500/20">
            <h3 className="text-green-400 font-semibold mb-3">✅ Model Answer (Requires Faculty Approval)</h3>
            <div className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">
              {selectedCase.modelAnswer}
            </div>
          </div>

          <div className="glass p-4 rounded-xl">
            <h3 className="text-teal-400 text-xs font-bold uppercase mb-2">Teaching Points</h3>
            <ul className="space-y-2">
              {selectedCase.teachingPoints.map((tp, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-teal-500 flex-shrink-0">{i + 1}.</span>
                  {tp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
