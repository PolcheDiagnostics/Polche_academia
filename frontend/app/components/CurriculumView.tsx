"use client";
import { useState } from "react";
import { MODULES, CURRICULUM } from "../data/curriculum";

export default function CurriculumView() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<"lecture" | "workshop" | "reading">("lecture");

  const filteredWeeks = selectedModule
    ? CURRICULUM.filter(w => MODULES.find(m => m.id === selectedModule)?.weeks.includes(w.week))
    : CURRICULUM;

  const selectedWeekData = selectedWeek ? CURRICULUM.find(w => w.week === selectedWeek) : null;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="mb-4">
        <h2 className="text-white font-bold text-lg">24-Week Curriculum</h2>
        <p className="text-slate-400 text-sm">Certificate in Molecular Diagnostics & Precision Oncology</p>
      </div>

      {/* Module filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        <button
          onClick={() => setSelectedModule(null)}
          className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
            !selectedModule ? "bg-teal-500/20 text-teal-400 border border-teal-500/40" : "glass text-slate-400 hover:text-teal-400"
          }`}
        >
          All Modules
        </button>
        {MODULES.map(mod => (
          <button
            key={mod.id}
            onClick={() => setSelectedModule(selectedModule === mod.id ? null : mod.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              selectedModule === mod.id
                ? "text-white border"
                : "glass text-slate-400 hover:text-white"
            }`}
            style={selectedModule === mod.id ? { background: `${mod.color}20`, borderColor: `${mod.color}40`, color: mod.color } : {}}
          >
            {mod.title.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Week list */}
        <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {filteredWeeks.map(week => {
            const mod = MODULES.find(m => m.weeks.includes(week.week));
            return (
              <button
                key={week.week}
                onClick={() => setSelectedWeek(week.week)}
                className={`w-full text-left glass p-3 rounded-xl transition-all ${
                  selectedWeek === week.week ? "border border-teal-500/40 bg-teal-500/5" : "glass-hover"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: `${mod?.color}20`, color: mod?.color }}
                  >
                    {week.week}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-medium truncate ${selectedWeek === week.week ? "text-teal-300" : "text-white"}`}>
                      {week.title}
                    </div>
                    <div className="text-slate-600 text-[10px] truncate">{mod?.faculty?.split(" ").slice(-1)[0]}</div>
                  </div>
                  {week.draftStatus === "draft" && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 flex-shrink-0">
                      Draft
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Week detail */}
        <div className="lg:col-span-2">
          {selectedWeekData ? (
            <div className="glass rounded-xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-white/5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-teal-400 text-xs font-semibold mb-1">Week {selectedWeekData.week}</div>
                    <h3 className="text-white font-bold text-base">{selectedWeekData.title}</h3>
                    <div className="text-slate-500 text-xs mt-1">
                      {MODULES.find(m => m.weeks.includes(selectedWeekData.week))?.faculty} ·{" "}
                      {MODULES.find(m => m.weeks.includes(selectedWeekData.week))?.title}
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Draft — Pending Review
                  </span>
                </div>

                <div className="flex gap-2 mt-4">
                  {(["lecture", "workshop", "reading"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                          : "text-slate-500 hover:text-white"
                      }`}
                    >
                      {tab === "lecture" ? "📖 Lecture" : tab === "workshop" ? "🛠️ Workshop" : "📚 Reading"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 max-h-[55vh] overflow-y-auto space-y-4">
                {activeTab === "lecture" && (
                  <>
                    <div>
                      <h4 className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-2">Learning Objectives</h4>
                      <ul className="space-y-1">
                        {selectedWeekData.lectureObjectives.map((obj, i) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-teal-500 flex-shrink-0 mt-0.5">{i + 1}.</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-2">60-Minute Lecture Outline</h4>
                      <div className="space-y-2">
                        {selectedWeekData.lectureOutline.map((seg, i) => (
                          <div key={i} className="glass p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <span className="text-blue-400 text-xs font-mono flex-shrink-0">{seg.time}</span>
                              <div>
                                <div className="text-white text-xs font-medium">{seg.topic}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">Key Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedWeekData.keyTopics.map(t => (
                          <span key={t} className="citation-badge text-xs">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-green-400 text-xs font-bold uppercase tracking-wide mb-2">Clinical Relevance</h4>
                      <p className="text-slate-300 text-sm">{selectedWeekData.clinicalRelevance}</p>
                    </div>

                    <div className="glass p-3 rounded-lg border border-slate-700">
                      <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-2">Student Summary</h4>
                      <p className="text-slate-400 text-sm">{selectedWeekData.studentSummary}</p>
                    </div>
                  </>
                )}

                {activeTab === "workshop" && (
                  <>
                    <div>
                      <div className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-1">Workshop</div>
                      <h4 className="text-white font-semibold text-base mb-2">{selectedWeekData.workshopTitle}</h4>
                      <ul className="space-y-1">
                        {selectedWeekData.workshopObjectives.map((obj, i) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-teal-500 flex-shrink-0">→</span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="glass p-4 rounded-lg border border-amber-500/10">
                      <div className="text-amber-400 text-xs font-semibold mb-2">⚠️ Faculty Note</div>
                      <p className="text-slate-400 text-sm">
                        Workshop materials are AI-generated drafts. Faculty facilitator notes, clinical case details,
                        and interactive activities require review and approval before student delivery.
                      </p>
                    </div>
                  </>
                )}

                {activeTab === "reading" && (
                  <div className="space-y-3">
                    <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wide">Recommended Reading</h4>
                    {selectedWeekData.recommendedReading.map((ref, i) => (
                      <div key={i} className="glass p-3 rounded-lg">
                        <div className="text-white text-xs font-medium mb-1">{ref.title}</div>
                        <div className="text-slate-500 text-[11px]">{ref.source} · {ref.year}</div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          {ref.pmid && (
                            <span className="citation-badge text-[10px]">PMID: {ref.pmid}</span>
                          )}
                          {ref.doi && (
                            <span className="citation-badge text-[10px]">DOI: {ref.doi}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass rounded-xl flex items-center justify-center h-64">
              <div className="text-center text-slate-500">
                <div className="text-3xl mb-2">📖</div>
                <div className="text-sm">Select a week to view content</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
