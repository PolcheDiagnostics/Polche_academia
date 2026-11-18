"use client";
import type { User, NavSection } from "../types";
import { CURRICULUM, MODULES } from "../data/curriculum";


export default function FacultyDashboard({ user, onNavigate }: { user: User; onNavigate: (s: NavSection) => void }) {
  const assignedModules = MODULES.filter(m => m.faculty.includes("Sadanandam") || m.faculty.includes("Philip") || m.faculty.includes("Suresh"));
  const myModules = MODULES.filter(m => m.faculty.includes("Sadanandam"));

  const contentActions = [
    { label: "Generate Week 1 Slides", icon: "📊", nav: "pptx-studio" as NavSection, color: "from-blue-500 to-indigo-600", status: "Draft ready" },
    { label: "Review AI-Generated Content", icon: "✅", nav: "pptx-studio" as NavSection, color: "from-orange-500 to-amber-600", status: "2 pending" },
    { label: "Prepare Workshop Materials", icon: "🛠️", nav: "curriculum" as NavSection, color: "from-teal-500 to-cyan-600", status: "Week 1 due" },
    { label: "View Student Submissions", icon: "📋", nav: "assessment" as NavSection, color: "from-violet-500 to-purple-600", status: "0 new" },
  ];

  const myWeeks = CURRICULUM.filter(w =>
    myModules.some(m => m.weeks.includes(w.week))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass p-5 rounded-xl border border-blue-500/20">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">
              Faculty Studio — <span className="gradient-text">{user.name}</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Scientific Programme Chair · Certificate in Molecular Diagnostics & Precision Oncology
            </p>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-sm text-center">
            <div className="text-blue-400 font-bold text-lg">{myWeeks.length}</div>
            <div className="text-slate-500 text-xs">Assigned Weeks</div>
          </div>
        </div>
      </div>

      {/* Important notice */}
      <div className="glass p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
        <div className="flex gap-3">
          <span className="text-amber-400 text-lg flex-shrink-0">⚠️</span>
          <div>
            <div className="text-amber-400 text-sm font-semibold">AI Content Review Required</div>
            <div className="text-slate-400 text-xs mt-1">
              All AI-generated teaching materials are in <strong className="text-amber-300">DRAFT</strong> status.
              Faculty review and approval is required before any content is released to students.
              You retain full academic authority over all published material.
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-white font-semibold mb-3 text-sm">Content Studio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {contentActions.map(action => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.nav)}
              className="glass glass-hover p-4 rounded-xl text-left group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mb-3 shadow`}>
                {action.icon}
              </div>
              <div className="text-white text-xs font-medium group-hover:text-blue-300 transition-colors leading-tight">{action.label}</div>
              <div className="text-slate-500 text-[10px] mt-1">{action.status}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* My assigned weeks */}
        <div className="glass p-4 rounded-xl">
          <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">🎓 My Assigned Weeks</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {myWeeks.map(week => (
              <div
                key={week.week}
                className="glass glass-hover p-3 rounded-lg cursor-pointer"
                onClick={() => onNavigate("pptx-studio")}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-xs font-medium">Week {week.week}: {week.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    week.draftStatus === "draft"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "bg-green-500/10 text-green-400 border border-green-500/30"
                  }`}>
                    {week.draftStatus === "draft" ? "Draft" : "Published"}
                  </span>
                </div>
                <div className="text-slate-500 text-[10px]">{week.lectureObjectives[0]}</div>
              </div>
            ))}
            {myWeeks.length === 0 && (
              <div className="text-slate-500 text-xs text-center py-4">No weeks assigned yet</div>
            )}
          </div>
        </div>

        {/* Content generation panel */}
        <div className="glass p-4 rounded-xl">
          <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-3">📊 Slide Generation — Week 1</h3>
          <div className="space-y-3">
            <div className="text-xs text-slate-400 mb-2">
              AI-generated draft for <strong className="text-white">Module 5: Precision Oncology, Week 13</strong>
            </div>

            {[
              { slide: "Learning Objectives", status: "ready", evidence: "Module curriculum" },
              { slide: "EGFR Targeted Therapy", status: "needs-review", evidence: "CIViC CC0, FLAURA trial" },
              { slide: "Resistance Mechanisms", status: "ready", evidence: "COSMIC CC0 data" },
              { slide: "Clinical Case: NSCLC", status: "needs-review", evidence: "Synthetic case — no real patient data" },
              { slide: "Take-Home Messages", status: "ready", evidence: "Faculty summary" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass p-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  item.status === "ready" ? "bg-green-500" : "bg-amber-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs">{item.slide}</div>
                  <div className="text-slate-600 text-[10px] truncate">{item.evidence}</div>
                </div>
                <span className={`text-[10px] flex-shrink-0 ${item.status === "ready" ? "text-green-400" : "text-amber-400"}`}>
                  {item.status === "ready" ? "✓" : "Review"}
                </span>
              </div>
            ))}

            <button
              onClick={() => onNavigate("pptx-studio")}
              className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg py-2 text-blue-400 text-xs font-medium transition-colors"
            >
              Open PowerPoint Studio →
            </button>
          </div>
        </div>
      </div>

      {/* All modules overview */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-3">📚 Course Modules — Faculty Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {MODULES.map(mod => (
            <div key={mod.id} className="glass p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: mod.color }} />
                <span className="text-white text-xs font-medium truncate">{mod.title}</span>
              </div>
              <div className="text-slate-500 text-[10px]">{mod.faculty}</div>
              <div className="text-slate-600 text-[10px]">Weeks {mod.weeks[0]}–{mod.weeks[mod.weeks.length-1]}</div>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block">
                Draft
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
