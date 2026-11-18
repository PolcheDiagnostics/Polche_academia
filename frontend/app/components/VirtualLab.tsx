"use client";

import { useState, useCallback } from "react";

// =============================================================================
// VIRTUAL MOLECULAR DIAGNOSTIC LABORATORY
// Interactive simulations for key molecular diagnostic techniques.
// All results are mathematically simulated for educational purposes.
// =============================================================================

type LabModule = "menu" | "pcr-qpcr" | "ddpcr" | "ngs-coverage" | "vaf-purity" | "fish";

// =============================================================================
// UTILS
// =============================================================================

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

function gaussianRandom(mean: number, sd: number) {
  const u1 = Math.random(), u2 = Math.random();
  return mean + sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

// =============================================================================
// MODULE MENU
// =============================================================================

const MODULES: { id: LabModule; title: string; icon: string; desc: string }[] = [
  { id: "pcr-qpcr",     title: "PCR / qPCR",          icon: "🌡️", desc: "Adjust cycles, efficiency and template to observe amplification curves and Ct values" },
  { id: "ddpcr",        title: "Digital PCR (ddPCR)",  icon: "💧", desc: "Explore Poisson partitioning, positive droplets and absolute quantification" },
  { id: "ngs-coverage", title: "NGS Coverage Depth",   icon: "📊", desc: "See how read depth, GC bias and capture efficiency affect uniform coverage" },
  { id: "vaf-purity",   title: "VAF & Tumour Purity",  icon: "🧬", desc: "Understand how tumour purity and ploidy affect observed variant allele fraction" },
  { id: "fish",         title: "FISH Interpretation",  icon: "🔭", desc: "Score FISH signals for gene amplification and chromosomal rearrangements" },
];

function LabMenu({ onSelect }: { onSelect: (m: LabModule) => void }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">🔬 Virtual Molecular Diagnostic Laboratory</h2>
        <p className="text-slate-400 text-sm">
          Interactive simulations for key molecular diagnostic techniques. Adjust variables and observe
          scientifically defensible outcomes. For educational purposes only.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {MODULES.map(m => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-teal-600
                       rounded-xl p-5 transition-all"
          >
            <div className="text-3xl mb-2">{m.icon}</div>
            <p className="font-semibold text-white mb-1">{m.title}</p>
            <p className="text-slate-400 text-sm">{m.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// SLIDER CONTROL
// =============================================================================

function SliderControl({ label, value, min, max, step, unit, onChange, note }: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; note?: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-teal-300 font-mono font-semibold">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-teal-500"
      />
      {note && <p className="text-xs text-slate-500 mt-0.5">{note}</p>}
    </div>
  );
}

// =============================================================================
// 1. qPCR SIMULATION
// =============================================================================

function QpcrLab() {
  const [efficiency, setEfficiency] = useState(95);
  const [templateCopies, setTemplateCopies] = useState(1000);
  const [cycles, setCycles] = useState(40);
  const [threshold, setThreshold] = useState(1e6);

  // Simple qPCR model: N(n) = N0 * (1 + E)^n
  const E = efficiency / 100;
  const N0 = templateCopies;

  // Calculate amplification curve (log scale)
  const amplData = Array.from({ length: cycles + 1 }, (_, n) => {
    const fluorescence = N0 * Math.pow(1 + E, n);
    return { cycle: n, fluorescence };
  });

  // Find Ct (first cycle where fluorescence crosses threshold)
  const ct = amplData.find(d => d.fluorescence >= threshold)?.cycle ?? null;

  // The theoretical Ct: N0 * (1+E)^Ct = threshold → Ct = log(threshold/N0)/log(1+E)
  const ctTheory = ct ? ct.toFixed(1) : "Not reached";

  // SVG chart
  const svgW = 320, svgH = 200;
  const pad = { top: 10, right: 10, bottom: 30, left: 50 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;

  const maxF = Math.max(...amplData.map(d => d.fluorescence));
  const toX = (n: number) => pad.left + (n / cycles) * plotW;
  const toY = (f: number) => pad.top + plotH - (Math.log10(Math.max(f, 1)) / Math.log10(maxF + 1)) * plotH;

  const pathD = amplData
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.cycle).toFixed(1)},${toY(d.fluorescence).toFixed(1)}`)
    .join(" ");

  const threshY = toY(threshold);
  const ctX = ct !== null ? toX(ct) : null;

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">qPCR Amplification Curve</h3>
        <svg width={svgW} height={svgH} className="w-full max-w-sm mx-auto block bg-slate-900 rounded-lg">
          {/* Grid lines */}
          {[1,2,3,4,5,6].map(exp => {
            const y = toY(Math.pow(10, exp));
            return y > pad.top && y < pad.top + plotH ? (
              <g key={exp}>
                <line x1={pad.left} y1={y} x2={pad.left + plotW} y2={y} stroke="#334155" strokeWidth={0.5} />
                <text x={pad.left - 4} y={y + 3} fontSize={8} fill="#64748b" textAnchor="end">10^{exp}</text>
              </g>
            ) : null;
          })}
          {/* Threshold line */}
          {threshY > pad.top && threshY < pad.top + plotH && (
            <line x1={pad.left} y1={threshY} x2={pad.left + plotW} y2={threshY}
              stroke="#f59e0b" strokeWidth={1} strokeDasharray="4,2" />
          )}
          {/* Amplification curve */}
          <path d={pathD} fill="none" stroke="#00A6A6" strokeWidth={2} />
          {/* Ct marker */}
          {ctX !== null && (
            <g>
              <line x1={ctX} y1={pad.top} x2={ctX} y2={pad.top + plotH} stroke="#a78bfa" strokeWidth={1} strokeDasharray="4,2" />
              <text x={ctX + 3} y={pad.top + 12} fontSize={9} fill="#a78bfa">Ct={ct}</text>
            </g>
          )}
          {/* Axes */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#475569" />
          <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#475569" />
          <text x={svgW / 2} y={svgH - 2} fontSize={9} fill="#64748b" textAnchor="middle">PCR Cycle</text>
        </svg>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Ct value</div>
            <div className="text-teal-300 font-bold font-mono">{ctTheory}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Efficiency</div>
            <div className="text-blue-300 font-bold">{efficiency}%</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Starting copies</div>
            <div className="text-purple-300 font-bold">{templateCopies.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
        <h4 className="font-semibold text-white">Adjust Parameters</h4>
        <SliderControl label="PCR efficiency" value={efficiency} min={60} max={110} step={1} unit="%" onChange={setEfficiency}
          note="Optimal: 90–110%. Below 90% = inhibition, primer design issues. Above 100% = non-specific amplification." />
        <SliderControl label="Starting template copies" value={templateCopies} min={1} max={100000} step={100} unit=" copies" onChange={setTemplateCopies}
          note="10-fold more template ≈ 3.32 fewer cycles (at 100% efficiency). Relationship: ΔCt × log₁₀(1+E)." />
        <SliderControl label="Threshold (fluorescence)" value={threshold} min={1e4} max={1e8} step={1e5} unit="" onChange={setThreshold} />
        <SliderControl label="Cycles" value={cycles} min={20} max={50} step={1} unit="" onChange={setCycles} />
      </div>

      <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-3 text-xs text-blue-200">
        <strong>Key concept:</strong> Each cycle doubles amplicons (at 100% efficiency). A 10-fold difference in starting
        template = ~3.32 cycles difference in Ct. Lower Ct = more starting material.
        Clinical applications: BCR-ABL quantification (MRD), HPV load, KRAS mutation detection.
      </div>
    </div>
  );
}

// =============================================================================
// 2. ddPCR SIMULATION
// =============================================================================

function DdpcrLab() {
  const [totalCopies, setTotalCopies] = useState(5000);
  const [droplets, setDroplets] = useState(20000);
  const [mutantFraction, setMutantFraction] = useState(1.0); // %

  // Poisson statistics: average copies per droplet λ
  const lambda = totalCopies / droplets;
  const lambdaMut = (totalCopies * mutantFraction / 100) / droplets;
  const lambdaWT  = (totalCopies * (1 - mutantFraction / 100)) / droplets;

  // Fraction of positive droplets
  const pMut = 1 - Math.exp(-lambdaMut);
  const pWT  = 1 - Math.exp(-lambdaWT);
  const pNeg = Math.exp(-lambda);

  const nMut = Math.round(droplets * pMut);
  const nWT  = Math.round(droplets * pWT);
  const nNeg = Math.round(droplets * pNeg);
  const nDouble = droplets - nMut - nWT - nNeg;

  // Concentration estimate (copies/µL, assuming 20 µL reaction)
  const conc = -Math.log(nNeg / droplets) * droplets / 20;
  const mutConc = -Math.log(1 - nMut / droplets) * droplets / 20;
  const estimatedVAF = (mutConc / conc * 100).toFixed(2);

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">ddPCR Droplet Cloud</h3>

        {/* Visual droplet representation */}
        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-4 gap-3 text-center text-sm">
            {[
              { label: "Positive (MUT)", count: nMut, colour: "bg-teal-500", pct: (nMut/droplets*100).toFixed(1) },
              { label: "Positive (WT)",  count: nWT,  colour: "bg-blue-500", pct: (nWT/droplets*100).toFixed(1) },
              { label: "Negative",       count: nNeg, colour: "bg-slate-600", pct: (nNeg/droplets*100).toFixed(1) },
              { label: "Double +",       count: Math.max(0, nDouble), colour: "bg-purple-600", pct: (Math.max(0,nDouble)/droplets*100).toFixed(1) },
            ].map(d => (
              <div key={d.label}>
                <div className={`${d.colour} rounded-full w-10 h-10 mx-auto mb-1 flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{d.pct}%</span>
                </div>
                <div className="text-slate-300 text-xs font-medium">{d.label}</div>
                <div className="text-slate-400 text-xs">{d.count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400 mb-1">Estimated VAF</div>
            <div className="text-2xl font-bold text-teal-300">{estimatedVAF}%</div>
            <div className="text-xs text-slate-500">True VAF: {mutantFraction}%</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-400 mb-1">Mutant concentration</div>
            <div className="text-2xl font-bold text-blue-300">{mutConc.toFixed(0)}</div>
            <div className="text-xs text-slate-500">copies/µL</div>
          </div>
        </div>

        <div className="mt-3 bg-slate-700 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Poisson λ (copies/droplet)</div>
          <div className="flex gap-4 text-sm">
            <span>Total: <span className="text-white font-mono">{lambda.toFixed(3)}</span></span>
            <span>Mutant: <span className="text-teal-300 font-mono">{lambdaMut.toFixed(4)}</span></span>
            <span>WT: <span className="text-blue-300 font-mono">{lambdaWT.toFixed(4)}</span></span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
        <h4 className="font-semibold text-white">Adjust Parameters</h4>
        <SliderControl label="Total DNA copies in reaction" value={totalCopies} min={100} max={100000} step={100} unit=" copies" onChange={setTotalCopies}
          note="High λ (>2) increases double-positive droplets and reduces precision. Optimal λ ≈ 0.5–2." />
        <SliderControl label="Number of droplets" value={droplets} min={5000} max={40000} step={1000} unit=" droplets" onChange={setDroplets}
          note="More droplets improve precision. Typical ddPCR: ~20,000 droplets per reaction." />
        <SliderControl label="True mutant allele fraction" value={mutantFraction} min={0.01} max={50} step={0.01} unit="%" onChange={setMutantFraction}
          note="ddPCR can detect VAF as low as 0.01–0.1% (ctDNA applications)." />
      </div>

      <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-3 text-xs text-blue-200">
        <strong>Key concept:</strong> ddPCR uses Poisson statistics to infer absolute copy numbers without
        a standard curve. Each droplet is an independent PCR reaction. Positive fraction follows
        p(positive) = 1 − e^(−λ) where λ = copies/droplet.
        Unlike qPCR, ddPCR is not affected by PCR efficiency differences between wells.
      </div>
    </div>
  );
}

// =============================================================================
// 3. NGS COVERAGE DEPTH
// =============================================================================

function NgsCoverageLab() {
  const [meanDepth, setMeanDepth] = useState(300);
  const [gcBias, setGcBias] = useState(20);
  const [captureEff, setCaptureEff] = useState(85);

  // Simulate coverage as Poisson distribution across 50 bins
  const bins = 50;
  const seed = meanDepth * captureEff * gcBias; // just for variation

  const coverageData = Array.from({ length: bins }, (_, i) => {
    // Apply GC bias: extreme GC bins get lower coverage
    const gcContent = i / bins;
    const gcPenalty = 1 - gcBias / 200 * (Math.abs(gcContent - 0.5) * 2) ** 1.5;
    const effDepth = meanDepth * (captureEff / 100) * gcPenalty;
    // Add Poisson noise
    const noise = gaussianRandom(0, Math.sqrt(effDepth) * 0.3);
    return Math.max(0, Math.round(effDepth + noise));
  });

  const pct100x = coverageData.filter(d => d >= 100).length / bins * 100;
  const pct500x = coverageData.filter(d => d >= 500).length / bins * 100;
  const actualMean = coverageData.reduce((a, b) => a + b, 0) / bins;
  const minDepth = Math.min(...coverageData);

  // SVG bar chart
  const svgW = 320, svgH = 160;
  const pad = { top: 10, right: 10, bottom: 20, left: 40 };
  const plotW = svgW - pad.left - pad.right;
  const plotH = svgH - pad.top - pad.bottom;
  const maxCov = Math.max(...coverageData, 1);
  const barW = plotW / bins;

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">Coverage Depth Across Target Region</h3>
        <svg width={svgW} height={svgH} className="w-full max-w-sm mx-auto block bg-slate-900 rounded-lg">
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(f => {
            const y = pad.top + plotH * (1 - f);
            const val = Math.round(maxCov * f);
            return (
              <g key={f}>
                <line x1={pad.left} y1={y} x2={pad.left + plotW} y2={y} stroke="#1e293b" />
                <text x={pad.left - 3} y={y + 3} fontSize={8} fill="#64748b" textAnchor="end">{val}</text>
              </g>
            );
          })}
          {/* 100x line */}
          {(() => {
            const y100 = pad.top + plotH * (1 - 100 / maxCov);
            return y100 > pad.top && y100 < pad.top + plotH ? (
              <line x1={pad.left} y1={y100} x2={pad.left + plotW} y2={y100} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3,2" />
            ) : null;
          })()}
          {/* Bars */}
          {coverageData.map((d, i) => {
            const h = (d / maxCov) * plotH;
            const colour = d < 100 ? "#ef4444" : d < 300 ? "#f59e0b" : "#00A6A6";
            return (
              <rect
                key={i}
                x={pad.left + i * barW}
                y={pad.top + plotH - h}
                width={barW - 0.5}
                height={h}
                fill={colour}
                opacity={0.85}
              />
            );
          })}
          {/* Axes */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="#475569" />
          <line x1={pad.left} y1={pad.top + plotH} x2={pad.left + plotW} y2={pad.top + plotH} stroke="#475569" />
          <text x={svgW / 2} y={svgH - 2} fontSize={9} fill="#64748b" textAnchor="middle">Genomic position →</text>
        </svg>
        <p className="text-xs text-slate-500 text-center mt-1">
          <span className="text-red-400">■</span> &lt;100× {"  "}
          <span className="text-yellow-400">■</span> 100–300× {"  "}
          <span className="text-teal-400">■</span> &gt;300× {"  "}
          <span className="text-yellow-400">— </span> 100× threshold
        </p>
        <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { label: "Mean depth", value: `${actualMean.toFixed(0)}×`, colour: "text-teal-300" },
            { label: "Min depth", value: `${minDepth}×`, colour: minDepth < 100 ? "text-red-400" : "text-teal-300" },
            { label: "≥100×", value: `${pct100x.toFixed(0)}%`, colour: pct100x >= 95 ? "text-teal-300" : "text-red-400" },
            { label: "≥500×", value: `${pct500x.toFixed(0)}%`, colour: "text-blue-300" },
          ].map(m => (
            <div key={m.label} className="bg-slate-700 rounded-lg p-2">
              <div className="text-slate-400">{m.label}</div>
              <div className={`font-bold font-mono ${m.colour}`}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
        <h4 className="font-semibold text-white">Adjust Parameters</h4>
        <SliderControl label="Target mean coverage depth" value={meanDepth} min={50} max={2000} step={50} unit="×" onChange={setMeanDepth}
          note="Minimum 100× recommended for somatic SNV calling. ctDNA panels: 500–5000×." />
        <SliderControl label="GC bias severity" value={gcBias} min={0} max={80} step={5} unit="%" onChange={setGcBias}
          note="High GC bias (>40%) causes coverage dropout at GC-rich regions. Caused by PCR amplification artefacts during library preparation." />
        <SliderControl label="Hybridisation capture efficiency" value={captureEff} min={30} max={100} step={1} unit="%" onChange={setCaptureEff}
          note="Proportion of reads mapping to target regions. High off-target rate wastes sequencing capacity." />
      </div>
    </div>
  );
}

// =============================================================================
// 4. VAF & TUMOUR PURITY
// =============================================================================

function VafPurityLab() {
  const [tumorPurity, setTumorPurity] = useState(60);
  const [copyNumberTumor, setCopyNumberTumor] = useState(2);
  const [copyNumberNormal, setCopyNumberNormal] = useState(2);
  const [mutantCopies, setMutantCopies] = useState(1);

  // VAF formula: VAF = (p * m) / (p * CN_t + (1-p) * CN_n * 2)
  //   p = tumour purity, m = number of mutant copies in tumour
  //   CN_t = tumour copy number, CN_n = normal copy number (diploid = 1 per allele)
  const p = tumorPurity / 100;
  const numerator = p * mutantCopies;
  const denominator = p * copyNumberTumor + (1 - p) * copyNumberNormal;
  const expectedVAF = denominator > 0 ? (numerator / denominator * 100) : 0;

  // Add Poisson noise for realism (200× coverage)
  const coverage = 500;
  const altReads = Math.round(gaussianRandom(expectedVAF / 100 * coverage, Math.sqrt(expectedVAF / 100 * (1 - expectedVAF / 100) * coverage)));
  const observedVAF = (Math.max(0, altReads) / coverage * 100).toFixed(1);

  const interpretation =
    expectedVAF > 40 ? "Clonal, likely copy-number neutral heterozygous mutation" :
    expectedVAF > 25 ? "Clonal but diluted by normal cells / or copy-number loss" :
    expectedVAF > 10 ? "Subclonal or significantly diluted by normal stroma" :
    "Very low VAF — subclonal or insufficient tumour purity";

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-4">VAF and Tumour Purity Calculator</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-400 mb-1">Expected VAF (theoretical)</div>
            <div className="text-4xl font-bold text-teal-300 font-mono">{expectedVAF.toFixed(1)}%</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 text-center">
            <div className="text-xs text-slate-400 mb-1">Observed VAF (500× sim.)</div>
            <div className="text-4xl font-bold text-blue-300 font-mono">{observedVAF}%</div>
          </div>
        </div>

        {/* Bar visualisation */}
        <div className="bg-slate-900 rounded-lg p-3 mb-3">
          <div className="text-xs text-slate-400 mb-2">Cell composition at sequencing site</div>
          <div className="flex h-8 rounded overflow-hidden">
            <div style={{ width: `${tumorPurity}%` }} className="bg-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">{tumorPurity}% tumour</span>
            </div>
            <div style={{ width: `${100 - tumorPurity}%` }} className="bg-slate-600 flex items-center justify-center">
              <span className="text-slate-300 text-xs">{100 - tumorPurity}% normal</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-xs text-slate-400 mb-1">Interpretation</div>
          <p className="text-slate-200 text-sm">{interpretation}</p>
        </div>

        <div className="mt-3 bg-slate-700 rounded-lg p-3 text-xs">
          <div className="text-slate-400 mb-1">Formula</div>
          <code className="text-teal-300">
            VAF = (p × m) / (p × CN_tumour + (1−p) × CN_normal)
          </code>
          <div className="text-slate-400 mt-1">
            = ({p.toFixed(2)} × {mutantCopies}) / ({p.toFixed(2)} × {copyNumberTumor} + {(1-p).toFixed(2)} × {copyNumberNormal})
            = <span className="text-teal-300">{expectedVAF.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
        <h4 className="font-semibold text-white">Adjust Parameters</h4>
        <SliderControl label="Tumour purity (% tumour cells)" value={tumorPurity} min={5} max={100} step={5} unit="%" onChange={setTumorPurity}
          note="Clinical samples often have 20–80% tumour purity. FFPE samples frequently require macrodissection." />
        <SliderControl label="Tumour copy number (at mutated locus)" value={copyNumberTumor} min={1} max={8} step={1} unit=" copies" onChange={setCopyNumberTumor}
          note="Loss of heterozygosity (CN=1 in tumour) increases apparent VAF. Amplification decreases it." />
        <SliderControl label="Normal copy number" value={copyNumberNormal} min={1} max={4} step={1} unit=" copies" onChange={setCopyNumberNormal} />
        <SliderControl label="Mutant copies in tumour" value={mutantCopies} min={1} max={copyNumberTumor} step={1} unit=" copies" onChange={(v) => setMutantCopies(clamp(v, 1, copyNumberTumor))}
          note="Heterozygous mutation = 1 mutant copy. Homozygous LOH + mutation = all copies." />
      </div>
    </div>
  );
}

// =============================================================================
// 5. FISH INTERPRETATION
// =============================================================================

function FishLab() {
  const [preset, setPreset] = useState("normal");
  const [amplificationCN, setAmplificationCN] = useState(2.0);
  const [centromereSignals, setCentromereSignals] = useState(2);
  const [geneSignals, setGeneSignals] = useState(2);

  const presets: Record<string, { gene: number; centromere: number; desc: string; diagnosis: string }> = {
    "normal":           { gene: 2, centromere: 2, desc: "2 gene (green) + 2 CEP (orange) signals per cell", diagnosis: "Normal disomy — no amplification" },
    "polysomy":         { gene: 3, centromere: 3, desc: "3 gene + 3 CEP signals — chromosome gain", diagnosis: "Polysomy (not true gene amplification)" },
    "gene-amplification": { gene: 6, centromere: 2, desc: ">6 gene copies per cell with normal centromere", diagnosis: "High-level gene amplification (HER2-positive by ASCO/CAP guidelines)" },
    "deletion":         { gene: 1, centromere: 2, desc: "1 gene signal + 2 CEP signals", diagnosis: "Hemizygous gene deletion" },
    "fusion":           { gene: 2, centromere: 2, desc: "Fused gene signal (yellow) adjacent to partner gene", diagnosis: "Gene rearrangement / fusion (e.g. ALK break-apart probe separation)" },
  };

  const active = presets[preset] || presets["normal"];
  const ratio = geneSignals / Math.max(centromereSignals, 1);

  // HER2 ASCO/CAP 2018 interpretation
  const her2Status =
    geneSignals >= 6 && ratio >= 2.0 ? "HER2 Amplified" :
    geneSignals >= 4 && ratio >= 2.0 ? "HER2 Amplified (dual ISH equivocal — IHC reflex recommended)" :
    geneSignals < 4 && ratio >= 2.0  ? "HER2 Equivocal (Group 2)" :
    geneSignals >= 6 && ratio < 2.0  ? "HER2 Equivocal (Group 3)" :
    "HER2 Not Amplified";

  // Render cells
  const cells = Array.from({ length: 20 }, (_, i) => {
    const g = Math.round(gaussianRandom(geneSignals, 0.5));
    const c = Math.round(gaussianRandom(centromereSignals, 0.3));
    return { gene: Math.max(0, g), centromere: Math.max(0, c) };
  });

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
        <h3 className="font-semibold text-white mb-3">FISH Signal Pattern</h3>

        {/* Preset selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(presets).map(([key, val]) => (
            <button
              key={key}
              onClick={() => {
                setPreset(key);
                setGeneSignals(val.gene);
                setCentromereSignals(val.centromere);
              }}
              className={`text-xs px-2 py-1 rounded transition-colors ${
                preset === key ? "bg-teal-700 text-teal-100" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {key.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        {/* Cell grid */}
        <div className="bg-slate-900 rounded-lg p-4 mb-3">
          <div className="grid grid-cols-5 gap-2 mb-2">
            {cells.map((cell, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-1.5 relative" style={{ minHeight: 40 }}>
                {/* Gene signals (green) */}
                {Array.from({ length: Math.min(cell.gene, 8) }).map((_, j) => (
                  <span key={`g${j}`} className="inline-block w-2 h-2 rounded-full bg-green-400 mr-0.5 mb-0.5" />
                ))}
                {/* Centromere signals (orange) */}
                {Array.from({ length: Math.min(cell.centromere, 6) }).map((_, j) => (
                  <span key={`c${j}`} className="inline-block w-2 h-2 rounded-full bg-orange-400 mr-0.5 mb-0.5" />
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-3 text-xs text-slate-400">
            <span><span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1" />Gene probe</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-orange-400 mr-1" />Centromere (CEP)</span>
          </div>
        </div>

        {/* Score */}
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Avg gene signals</div>
            <div className="text-green-300 font-bold font-mono">{geneSignals.toFixed(1)}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Avg CEP signals</div>
            <div className="text-orange-300 font-bold font-mono">{centromereSignals.toFixed(1)}</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-2">
            <div className="text-xs text-slate-400">Gene/CEP ratio</div>
            <div className={`font-bold font-mono ${ratio >= 2 ? "text-teal-300" : "text-slate-300"}`}>
              {ratio.toFixed(2)}
            </div>
          </div>
        </div>

        <div className={`mt-3 rounded-lg p-3 text-sm font-semibold ${
          her2Status.includes("Amplified") && !her2Status.includes("equivocal")
            ? "bg-teal-900/40 text-teal-200 border border-teal-700"
            : her2Status.includes("Equivocal")
            ? "bg-yellow-900/40 text-yellow-200 border border-yellow-700"
            : "bg-slate-700 text-slate-300"
        }`}>
          HER2 ASCO/CAP 2018: {her2Status}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-4">
        <h4 className="font-semibold text-white">Manual Signal Adjustment</h4>
        <SliderControl label="Average gene signals per cell" value={geneSignals} min={0} max={12} step={0.5} unit="" onChange={setGeneSignals}
          note="≥6 gene copies + ratio ≥2.0 = amplified (ASCO/CAP 2018)." />
        <SliderControl label="Average CEP signals per cell" value={centromereSignals} min={1} max={6} step={0.5} unit="" onChange={setCentromereSignals}
          note="CEP17 signals indicate chromosome 17 copy number. Polysomy can mimic amplification." />
      </div>

      <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-3 text-xs text-blue-200">
        <strong>Key concept:</strong> HER2 amplification is defined by ASCO/CAP 2018 guidelines using dual ISH.
        A gene/CEP17 ratio ≥2.0 AND average HER2 signals ≥4.0 per cell = amplified. Polysomy (all signals
        elevated equally) requires IHC correlation. Five ISH groups are defined for equivocal cases.
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function VirtualLab() {
  const [activeModule, setActiveModule] = useState<LabModule>("menu");

  const renderModule = () => {
    switch (activeModule) {
      case "pcr-qpcr":     return <QpcrLab />;
      case "ddpcr":        return <DdpcrLab />;
      case "ngs-coverage": return <NgsCoverageLab />;
      case "vaf-purity":   return <VafPurityLab />;
      case "fish":         return <FishLab />;
      default:             return <LabMenu onSelect={setActiveModule} />;
    }
  };

  const currentModule = MODULES.find(m => m.id === activeModule);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {activeModule !== "menu" && (
        <div className="mb-6">
          <button
            onClick={() => setActiveModule("menu")}
            className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-3 transition-colors"
          >
            ← Back to lab menu
          </button>
          <h2 className="text-xl font-bold text-white">
            {currentModule?.icon} {currentModule?.title}
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">{currentModule?.desc}</p>
          <div className="mt-2 text-xs bg-amber-900/30 border border-amber-700 rounded px-3 py-1 text-amber-300 inline-block">
            Educational simulation — mathematically modelled, not a certified diagnostic tool
          </div>
        </div>
      )}
      {renderModule()}
    </div>
  );
}
