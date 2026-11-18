"use client";

import { useState } from "react";
import { MTB_SYNTHETIC_CASES, type SyntheticMTBPatient, type MTBFinding } from "../data/mtb-cases";

// =============================================================================
// TYPES
// =============================================================================

type ViewState = "case-select" | "case-review" | "deliberation" | "recommendation" | "model-answer";

interface StudentRecommendation {
  rankingNotes: string;         // how the student ranked/prioritised findings
  recommendedTreatment: string;
  clinicalTrialConsideration: string;
  evidenceGrading: string;
  keyUncertainties: string;
  submitted: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const TIER_COLOURS: Record<string, string> = {
  "I":   "bg-teal-900 text-teal-100 border border-teal-600",
  "II":  "bg-blue-900 text-blue-100 border border-blue-600",
  "III": "bg-slate-700 text-slate-200 border border-slate-500",
  "IV":  "bg-zinc-800 text-zinc-400 border border-zinc-600",
};

const TIER_LABEL: Record<string, string> = {
  "I":   "Tier I — Strong clinical significance",
  "II":  "Tier II — Potential clinical significance",
  "III": "Tier III — Unknown significance",
  "IV":  "Tier IV — Benign / likely benign",
};

const MSI_COLOUR: Record<string, string> = {
  "MSI-H": "text-teal-400",
  "MSS":   "text-slate-400",
  "MSI-L": "text-yellow-400",
};

// =============================================================================
// DISCLAIMER BANNER
// =============================================================================

function SyntheticDisclaimer({ small = false }: { small?: boolean }) {
  if (small) {
    return (
      <div className="bg-amber-900/30 border border-amber-700 rounded px-3 py-1.5 text-amber-300 text-xs">
        ⚠ SYNTHETIC CASE — FOR EDUCATIONAL SIMULATION ONLY. All patients, findings and outcomes are entirely fictitious. Not for clinical use.
      </div>
    );
  }
  return (
    <div className="bg-amber-900/30 border border-amber-600 rounded-xl p-4 text-amber-200">
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">⚠️</span>
        <div>
          <p className="font-bold text-amber-100 mb-1">SYNTHETIC EDUCATIONAL SIMULATION</p>
          <p className="text-sm">
            All patient cases, clinical histories, molecular findings, treatment recommendations and outcomes
            in this simulator are <strong>entirely fictitious</strong> and have been created for educational
            purposes only. This tool is for learning about Molecular Tumour Board methodology and must
            <strong> never</strong> be used for clinical decision-making with real patients.
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CASE SELECTOR
// =============================================================================

function CaseSelector({ onSelect }: { onSelect: (c: SyntheticMTBPatient) => void }) {
  const difficultyBadge: Record<string, string> = {
    foundation: "bg-green-900 text-green-200",
    intermediate: "bg-blue-900 text-blue-200",
    advanced: "bg-purple-900 text-purple-200",
  };

  return (
    <div className="space-y-6">
      <SyntheticDisclaimer />

      <div>
        <h2 className="text-2xl font-bold text-white mb-1">🏥 Molecular Tumour Board Simulator</h2>
        <p className="text-slate-400 text-sm">
          Select a synthetic patient case to present, deliberate and document an MTB-style recommendation.
        </p>
      </div>

      <div className="grid gap-4">
        {MTB_SYNTHETIC_CASES.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-600
                       rounded-xl p-5 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                    {c.caseCode}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${difficultyBadge[c.difficulty]}`}>
                    {c.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">Week {c.weekModule}</span>
                </div>
                <p className="font-semibold text-white text-lg leading-tight mb-1">{c.tumorType}</p>
                <p className="text-slate-400 text-sm mb-3">{c.stage}</p>
                <p className="text-teal-300 text-sm italic line-clamp-2">{c.clinicalQuestion}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-500 mb-1">Key findings</div>
                  <div className="flex flex-col gap-1">
                    {c.findings.filter(f => f.tier === "I" || f.tier === "II").slice(0, 3).map((f, i) => (
                      <span key={i} className={`text-xs px-2 py-0.5 rounded font-mono ${TIER_COLOURS[f.tier]}`}>
                        Tier {f.tier} {f.gene}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-teal-500 text-sm">Begin case →</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// FINDING ROW
// =============================================================================

function FindingRow({ finding, expanded, onToggle }: {
  finding: MTBFinding;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-slate-750 transition-colors"
      >
        <div className="flex items-start gap-3">
          <span className={`text-xs px-2 py-1 rounded font-bold font-mono shrink-0 mt-0.5 ${TIER_COLOURS[finding.tier]}`}>
            {finding.tier}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-white">{finding.gene}</span>
              <span className="text-teal-300 text-sm font-mono">{finding.alteration}</span>
              {finding.vaf !== undefined && (
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                  VAF {finding.vaf}%
                </span>
              )}
              {finding.copyNumber !== undefined && (
                <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                  CN {finding.copyNumber}
                </span>
              )}
              {finding.escat && (
                <span className="text-xs bg-purple-900 text-purple-300 border border-purple-700 px-2 py-0.5 rounded">
                  ESCAT {finding.escat}
                </span>
              )}
            </div>
            <p className="text-slate-300 text-sm mt-1">{finding.clinicalSignificance}</p>
          </div>
          <span className="text-slate-500 text-sm">{expanded ? "▲" : "▼"}</span>
        </div>
      </button>
      {expanded && (
        <div className="border-t border-slate-700 p-4 space-y-3">
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wide">
            {TIER_LABEL[finding.tier]}
          </p>
          {finding.therapeuticImplication && (
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Therapeutic implication</p>
              <p className="text-teal-200 text-sm">{finding.therapeuticImplication}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Evidence basis</p>
            <p className="text-slate-300 text-sm">{finding.evidence}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CASE REVIEW PANEL
// =============================================================================

function CaseReviewPanel({ patient, onProceed }: {
  patient: SyntheticMTBPatient;
  onProceed: () => void;
}) {
  const [expandedFindings, setExpandedFindings] = useState<Set<number>>(new Set());

  const toggle = (i: number) => setExpandedFindings(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  return (
    <div className="space-y-6">
      <SyntheticDisclaimer small />

      {/* Header */}
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
              {patient.caseCode}
            </span>
            <h2 className="text-xl font-bold text-white mt-2">{patient.tumorType}</h2>
            <p className="text-slate-400">{patient.stage}</p>
          </div>
          <div className="text-right text-sm">
            <div className="text-slate-400">TMB</div>
            <div className="text-white font-bold">{patient.qcMetrics.tmb} mut/Mb</div>
            <div className={`font-semibold ${MSI_COLOUR[patient.qcMetrics.msi]}`}>
              {patient.qcMetrics.msi}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-400 text-xs mb-1">Pathology</p>
            <p className="text-slate-200">{patient.pathologyFindings}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">IHC</p>
            <div className="flex flex-wrap gap-1">
              {patient.ihcFindings.map((ihc, i) => (
                <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{ihc}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment history */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Treatment History</h3>
        <ol className="space-y-2">
          {patient.treatmentHistory.map((tx, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-teal-500 font-bold shrink-0">{i + 1}.</span>
              <span className="text-slate-300">{tx}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* QC metrics */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">NGS Quality Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Tumour purity", value: `${patient.qcMetrics.tumorPurity}%`, ok: patient.qcMetrics.tumorPurity >= 20 },
            { label: "Mean coverage", value: `${patient.qcMetrics.meanCoverage}×`, ok: patient.qcMetrics.meanCoverage >= 100 },
            { label: "≥100× bases", value: `${patient.qcMetrics.percentGt100x}%`, ok: patient.qcMetrics.percentGt100x >= 95 },
            { label: "Panel", value: patient.ngsPanel.split(" ")[0], ok: true },
          ].map(m => (
            <div key={m.label} className="bg-slate-700 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">{m.label}</div>
              <div className={`font-semibold ${m.ok ? "text-teal-300" : "text-red-400"}`}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Genomic findings */}
      <div>
        <h3 className="font-semibold text-white mb-3">Genomic Findings</h3>
        <div className="space-y-3">
          {patient.findings.map((f, i) => (
            <FindingRow
              key={i}
              finding={f}
              expanded={expandedFindings.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>

      {/* Clinical question */}
      <div className="bg-teal-900/40 border border-teal-700 rounded-xl p-4">
        <h3 className="font-semibold text-teal-200 mb-2">🩺 MTB Clinical Question</h3>
        <p className="text-teal-100">{patient.clinicalQuestion}</p>
      </div>

      {/* Key decision points */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">Key Decision Points</h3>
        <ul className="space-y-2">
          {patient.keyDecisionPoints.map((pt, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300">
              <span className="text-blue-400 shrink-0">▸</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onProceed}
        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        Proceed to Deliberation →
      </button>
    </div>
  );
}

// =============================================================================
// DELIBERATION PANEL (student writes their recommendation)
// =============================================================================

function DeliberationPanel({ patient, onSubmit }: {
  patient: SyntheticMTBPatient;
  onSubmit: (rec: StudentRecommendation) => void;
}) {
  const [form, setForm] = useState<StudentRecommendation>({
    rankingNotes: "",
    recommendedTreatment: "",
    clinicalTrialConsideration: "",
    evidenceGrading: "",
    keyUncertainties: "",
    submitted: false,
  });

  const complete = form.rankingNotes.trim().length > 10 &&
    form.recommendedTreatment.trim().length > 10 &&
    form.evidenceGrading.trim().length > 5;

  const Field = ({ label, field, placeholder, rows = 3 }: {
    label: string; field: keyof StudentRecommendation; placeholder: string; rows?: number;
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <textarea
        rows={rows}
        value={form[field] as string}
        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-slate-200
                   placeholder-slate-500 text-sm resize-none focus:outline-none focus:border-teal-500"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <SyntheticDisclaimer small />

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-slate-400 text-sm">
          <span className="text-white font-semibold">{patient.caseCode}</span> — {patient.tumorType}
        </p>
        <p className="text-teal-200 text-sm mt-1 italic">{patient.clinicalQuestion}</p>
      </div>

      <div className="space-y-4">
        <Field
          label="1. How would you prioritise the molecular findings? (Tier I → II → III)"
          field="rankingNotes"
          placeholder="e.g. The Tier I BRAF V600E is the primary actionable finding. The MSI-H status is co-dominant. DNMT3A is Tier III with no direct therapeutic implication..."
          rows={4}
        />
        <Field
          label="2. Recommended treatment strategy"
          field="recommendedTreatment"
          placeholder="State the specific regimen, rationale and standard of care basis..."
          rows={4}
        />
        <Field
          label="3. Clinical trial consideration (if applicable)"
          field="clinicalTrialConsideration"
          placeholder="Name any relevant trials, eligibility criteria and therapeutic hypothesis..."
          rows={3}
        />
        <Field
          label="4. Level of evidence for your recommendation (ESCAT / ESMO level)"
          field="evidenceGrading"
          placeholder="e.g. ESCAT I-A, Level 1A evidence from Phase III RCT (BEACON-CRC)..."
          rows={2}
        />
        <Field
          label="5. Key uncertainties or additional tests requested"
          field="keyUncertainties"
          placeholder="e.g. Germline testing for Lynch syndrome; re-biopsy at progression; allelic ratio confirmation..."
          rows={3}
        />
      </div>

      <button
        disabled={!complete}
        onClick={() => onSubmit({ ...form, submitted: true })}
        className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-600 disabled:cursor-not-allowed
                   text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {complete ? "Submit MTB Recommendation →" : "Complete all required fields to submit"}
      </button>
    </div>
  );
}

// =============================================================================
// MODEL ANSWER PANEL
// =============================================================================

function ModelAnswerPanel({ patient, studentRec, onNewCase }: {
  patient: SyntheticMTBPatient;
  studentRec: StudentRecommendation | null;
  onNewCase: () => void;
}) {
  const ma = patient.modelAnswer;

  return (
    <div className="space-y-6">
      <SyntheticDisclaimer small />

      <div className="bg-green-900/30 border border-green-600 rounded-xl p-4">
        <p className="text-xs text-green-400 uppercase tracking-wide font-semibold mb-2">
          Faculty Model Answer
        </p>
        <h3 className="font-semibold text-green-200 mb-2">{ma.summary}</h3>
        <p className="text-green-100 font-medium">{ma.recommendation}</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h4 className="font-semibold text-white mb-3">Rationale</h4>
        <p className="text-slate-300 text-sm leading-relaxed">{ma.rationale}</p>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h4 className="font-semibold text-white mb-3">Clinical Trials to Consider</h4>
        <div className="space-y-3">
          {ma.clinicalTrialsToConsider.map((t, i) => (
            <div key={i} className="border-l-2 border-blue-500 pl-3">
              <p className="text-blue-300 text-sm font-medium">{t.name}</p>
              <p className="text-slate-400 text-xs mt-0.5">{t.rationale}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-900/20 border border-amber-700 rounded-xl p-4">
        <h4 className="font-semibold text-amber-200 mb-3">⚠ Important Caveats</h4>
        <ul className="space-y-2">
          {ma.caveats.map((c, i) => (
            <li key={i} className="text-amber-100 text-sm flex gap-2">
              <span className="text-amber-500 shrink-0">•</span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Faculty notes */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-600">
        <h4 className="font-semibold text-slate-300 mb-2 text-sm uppercase tracking-wide">
          Faculty Teaching Notes
        </h4>
        <p className="text-slate-400 text-sm italic">{patient.facultyNotes}</p>
      </div>

      {/* Student submission comparison */}
      {studentRec && (
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h4 className="font-semibold text-white mb-3">Your Submission</h4>
          <div className="space-y-2 text-sm">
            {[
              ["Prioritisation", studentRec.rankingNotes],
              ["Recommendation", studentRec.recommendedTreatment],
              ["Trials", studentRec.clinicalTrialConsideration],
              ["Evidence", studentRec.evidenceGrading],
              ["Uncertainties", studentRec.keyUncertainties],
            ].map(([label, value]) => value ? (
              <div key={label}>
                <p className="text-slate-400 text-xs">{label}</p>
                <p className="text-slate-200">{value}</p>
              </div>
            ) : null)}
          </div>
        </div>
      )}

      <button
        onClick={onNewCase}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        ← Select Another Case
      </button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function MTBSimulator() {
  const [view, setView] = useState<ViewState>("case-select");
  const [selectedCase, setSelectedCase] = useState<SyntheticMTBPatient | null>(null);
  const [studentRec, setStudentRec] = useState<StudentRecommendation | null>(null);

  const reset = () => {
    setView("case-select");
    setSelectedCase(null);
    setStudentRec(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {view === "case-select" && (
        <CaseSelector
          onSelect={c => {
            setSelectedCase(c);
            setView("case-review");
          }}
        />
      )}

      {view === "case-review" && selectedCase && (
        <CaseReviewPanel
          patient={selectedCase}
          onProceed={() => setView("deliberation")}
        />
      )}

      {view === "deliberation" && selectedCase && (
        <>
          {/* Back button */}
          <button
            onClick={() => setView("case-review")}
            className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            ← Back to case
          </button>
          <DeliberationPanel
            patient={selectedCase}
            onSubmit={rec => {
              setStudentRec(rec);
              setView("model-answer");
            }}
          />
        </>
      )}

      {view === "model-answer" && selectedCase && (
        <>
          <button
            onClick={() => setView("deliberation")}
            className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1 transition-colors"
          >
            ← Back to deliberation
          </button>
          <ModelAnswerPanel
            patient={selectedCase}
            studentRec={studentRec}
            onNewCase={reset}
          />
        </>
      )}
    </div>
  );
}
