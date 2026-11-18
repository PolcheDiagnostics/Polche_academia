"use client";
import { useState } from "react";
import { PATHWAY_DATA, getPathwaysByGene } from "../data/rag-knowledge";

type Mutation = { gene: string; variant: string; vaf: number; consequence: string };

const DEMO_MUTATIONS: Record<string, Mutation> = {
  "KRAS G12C": { gene: "KRAS", variant: "G12C", vaf: 45, consequence: "Constitutive RAS-GTP activation — RAF/MEK/ERK signalling upregulated" },
  "BRAF V600E": { gene: "BRAF", variant: "V600E", vaf: 52, consequence: "BRAF kinase hyperactivation — bypasses RAS, drives MEK/ERK independently" },
  "PIK3CA H1047R": { gene: "PIK3CA", variant: "H1047R", vaf: 28, consequence: "PI3K p110α activation — AKT/mTOR signalling upregulated, apoptosis suppressed" },
  "TP53 R175H": { gene: "TP53", variant: "R175H", vaf: 60, consequence: "Loss of p53 tumour suppressor function — cell cycle checkpoint abrogated" },
  "EGFR L858R": { gene: "EGFR", variant: "L858R", vaf: 38, consequence: "EGFR kinase activation — RAS-MAPK and PI3K-AKT both upregulated" },
  "None (Wild type)": { gene: "", variant: "", vaf: 0, consequence: "" },
};

const PATHWAY_NODES = [
  { id: "RTK", label: "RTK\n(EGFR/MET)", x: 50, y: 10, color: "#00A6A6", geneTag: "EGFR" },
  { id: "RAS", label: "RAS\n(KRAS/NRAS)", x: 25, y: 32, color: "#3B82F6", geneTag: "KRAS" },
  { id: "RAF", label: "RAF\n(BRAF)", x: 25, y: 52, color: "#3B82F6", geneTag: "BRAF" },
  { id: "MEK", label: "MEK1/2", x: 25, y: 70, color: "#3B82F6" },
  { id: "ERK", label: "ERK1/2", x: 25, y: 87, color: "#3B82F6" },
  { id: "PI3K", label: "PI3K\n(PIK3CA)", x: 72, y: 32, color: "#A78BFA", geneTag: "PIK3CA" },
  { id: "AKT", label: "AKT", x: 72, y: 52, color: "#A78BFA" },
  { id: "mTOR", label: "mTOR", x: 72, y: 70, color: "#A78BFA" },
  { id: "TP53", label: "TP53\n(p53)", x: 50, y: 52, color: "#F59E0B", geneTag: "TP53" },
  { id: "OUTPUT", label: "Proliferation\nSurvival", x: 50, y: 87, color: "#10B981" },
];

const ARROWS = [
  ["RTK", "RAS"], ["RTK", "PI3K"], ["RAS", "RAF"], ["RAF", "MEK"], ["MEK", "ERK"],
  ["ERK", "OUTPUT"], ["PI3K", "AKT"], ["AKT", "mTOR"], ["mTOR", "OUTPUT"],
  ["TP53", "OUTPUT"],
];

export default function MolecularExplorer() {
  const [selectedMutation, setSelectedMutation] = useState<string>("None (Wild type)");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const mutation = DEMO_MUTATIONS[selectedMutation];
  const affectedGene = mutation.gene;

  const getNodeColor = (node: typeof PATHWAY_NODES[0]) => {
    if (!affectedGene) return node.color;
    if (node.geneTag === affectedGene) return "#EF4444"; // mutated — red
    // downstream of KRAS/BRAF — highlight MEK, ERK
    if (affectedGene === "KRAS" && ["RAF", "MEK", "ERK", "OUTPUT"].includes(node.id)) return "#F97316";
    if (affectedGene === "BRAF" && ["MEK", "ERK", "OUTPUT"].includes(node.id)) return "#F97316";
    if (affectedGene === "PIK3CA" && ["AKT", "mTOR", "OUTPUT"].includes(node.id)) return "#F97316";
    if (affectedGene === "EGFR" && ["RAS", "RAF", "MEK", "ERK", "PI3K", "AKT", "mTOR", "OUTPUT"].includes(node.id)) return "#F97316";
    return node.color;
  };

  const relatedPathways = affectedGene ? getPathwaysByGene(affectedGene) : [];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-4">
        <h2 className="text-white font-bold text-lg">🧬 Molecular Pathway Explorer</h2>
        <p className="text-slate-400 text-sm">Interactive RAS-MAPK / PI3K-AKT-mTOR signalling with mutation simulation</p>
        <div className="mt-1 text-xs text-amber-500/80">
          ⚠️ Educational simulation only — simplified representation of complex biology. Not for clinical use.
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* SVG pathway diagram */}
        <div className="glass p-4 rounded-xl">
          <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-3">Signalling Pathway</h3>

          <svg viewBox="0 0 100 100" className="w-full h-72" style={{ fontFamily: "monospace" }}>
            {/* Arrows */}
            {ARROWS.map(([from, to]) => {
              const f = PATHWAY_NODES.find(n => n.id === from)!;
              const t = PATHWAY_NODES.find(n => n.id === to)!;
              const fColor = getNodeColor(f);
              const isActive = !affectedGene || fColor !== f.color;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={f.x} y1={f.y + 4} x2={t.x} y2={t.y - 4}
                  stroke={isActive && affectedGene ? "#F97316" : "#334155"}
                  strokeWidth="0.6"
                  strokeDasharray={isActive && affectedGene ? "none" : "1,1"}
                  opacity="0.8"
                />
              );
            })}

            {/* Nodes */}
            {PATHWAY_NODES.map(node => {
              const col = getNodeColor(node);
              const isHovered = hoveredNode === node.id;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <ellipse
                    rx={isHovered ? 10 : 9} ry={isHovered ? 4.5 : 4}
                    fill={`${col}20`}
                    stroke={col}
                    strokeWidth={col === "#EF4444" ? "1.2" : "0.8"}
                    style={{ transition: "all 0.2s" }}
                  />
                  {node.label.split("\n").map((line, i) => (
                    <text
                      key={i}
                      y={i * 2.4 - (node.label.includes("\n") ? 1.2 : 0.6)}
                      textAnchor="middle"
                      fontSize="2.2"
                      fill={col}
                      fontWeight={col === "#EF4444" ? "bold" : "normal"}
                    >
                      {line}
                    </text>
                  ))}
                  {col === "#EF4444" && (
                    <text y={5.5} textAnchor="middle" fontSize="2" fill="#EF4444" fontWeight="bold">
                      MUTANT
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="flex gap-3 mt-2 text-[10px] text-slate-500 justify-center">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block"/>Mutated gene</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block"/>Hyperactivated</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"/>Normal</span>
          </div>
        </div>

        {/* Controls + interpretation */}
        <div className="space-y-3">
          <div className="glass p-4 rounded-xl">
            <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">🔬 Introduce Mutation</h3>
            <div className="space-y-2">
              {Object.keys(DEMO_MUTATIONS).map(key => (
                <button
                  key={key}
                  onClick={() => setSelectedMutation(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    selectedMutation === key
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      : "glass text-slate-400 hover:text-white"
                  }`}
                >
                  {key === "None (Wild type)" ? "🟢 " : "🔴 "}{key}
                </button>
              ))}
            </div>
          </div>

          {mutation.gene && (
            <div className="glass p-4 rounded-xl border border-red-500/20">
              <div className="text-red-400 text-xs font-bold uppercase tracking-wide mb-2">
                ⚡ Mutation Effect — {mutation.gene} {mutation.variant}
              </div>
              <p className="text-slate-300 text-xs mb-3">{mutation.consequence}</p>
              <div className="flex items-center gap-3 text-xs">
                <div className="glass px-3 py-1.5 rounded-lg">
                  <div className="text-slate-500 text-[10px]">VAF (example)</div>
                  <div className="text-white font-bold">{mutation.vaf}%</div>
                </div>
                <div className="glass px-3 py-1.5 rounded-lg">
                  <div className="text-slate-500 text-[10px]">Type</div>
                  <div className="text-white font-bold">Somatic</div>
                </div>
              </div>
            </div>
          )}

          {relatedPathways.length > 0 && (
            <div className="glass p-3 rounded-xl">
              <div className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-2">
                📚 Reactome Pathway Data (CC-BY)
              </div>
              {relatedPathways.slice(0, 2).map(p => (
                <div key={p.id} className="mb-2">
                  <div className="text-white text-xs font-medium">{p.name}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{p.description}</div>
                  <div className="text-slate-600 text-[10px] mt-1">
                    {p.source} · Licence: {p.licence}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="glass p-3 rounded-xl border border-amber-500/10">
            <div className="text-amber-400 text-xs font-semibold mb-1">🎓 Teaching Note</div>
            <div className="text-slate-400 text-[11px]">
              This diagram is a simplified educational model. Real signalling networks involve
              hundreds of proteins, feedback loops, and context-dependent effects not shown here.
              All pathway data sourced from Reactome (CC BY 4.0).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
