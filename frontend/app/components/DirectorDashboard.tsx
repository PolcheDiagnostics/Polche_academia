"use client";
import type { User, NavSection } from "../types";
import { MODULES, CURRICULUM } from "../data/curriculum";


export default function DirectorDashboard({ user, onNavigate }: { user: User; onNavigate: (s: NavSection) => void }) {
  const totalWeeks = 24;
  const draftWeeks = CURRICULUM.filter(w => w.draftStatus === "draft").length;
  const publishedWeeks = totalWeeks - draftWeeks;

  const stats = [
    { label: "Total Weeks", value: "24", icon: "📅", color: "text-teal-400" },
    { label: "Modules", value: "9", icon: "🗂️", color: "text-blue-400" },
    { label: "Faculty", value: "7", icon: "👩‍🏫", color: "text-violet-400" },
    { label: "Draft Content", value: `${draftWeeks}`, icon: "📝", color: "text-amber-400" },
  ];

  const reviewItems = [
    { week: 1, title: "Cancer as a Genomic Disease", faculty: "Dr. Suresh", status: "pending-review", priority: "high" },
    { week: 7, title: "NGS Technologies and Applications", faculty: "Dr. Philip Beer", status: "pending-review", priority: "high" },
    { week: 13, title: "Targeted Therapy Principles", faculty: "Prof. Sadanandam", status: "in-review", priority: "medium" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass p-5 rounded-xl border border-violet-500/20">
        <h1 className="text-xl font-bold text-white mb-1">
          Course Director Dashboard — <span className="gradient-text">{user.name}</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Certificate in Molecular Diagnostics & Precision Oncology · Scientific Programme Chair
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="glass p-4 rounded-xl text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Content approval queue */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-violet-400 text-xs font-bold uppercase tracking-wide mb-3">🔍 Content Approval Queue</h3>
        <div className="space-y-2">
          {reviewItems.map(item => (
            <div key={item.week} className="glass p-3 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">
                  W{item.week}
                </div>
                <div>
                  <div className="text-white text-xs font-medium">{item.title}</div>
                  <div className="text-slate-500 text-[10px]">{item.faculty}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  item.priority === "high"
                    ? "text-red-400 border-red-400/30 bg-red-400/10"
                    : "text-amber-400 border-amber-400/30 bg-amber-400/10"
                }`}>
                  {item.priority}
                </span>
                <button className="text-[10px] px-3 py-1 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 rounded text-violet-400 transition-colors">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum readiness */}
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide">📊 Curriculum Readiness</h3>
          <button onClick={() => onNavigate("curriculum")} className="text-teal-400 text-xs hover:underline">View all →</button>
        </div>
        <div className="space-y-2">
          {MODULES.map(mod => {
            const modWeeks = CURRICULUM.filter(w => mod.weeks.includes(w.week));
            const ready = modWeeks.filter(w => w.draftStatus !== "draft").length;
            const pct = Math.round((ready / modWeeks.length) * 100);
            return (
              <div key={mod.id} className="flex items-center gap-3">
                <div className="w-24 text-slate-500 text-[10px] text-right flex-shrink-0 truncate">{mod.title.split(" ").slice(0,2).join(" ")}</div>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct || 5}%`, background: mod.color }}
                  />
                </div>
                <div className="text-slate-500 text-[10px] w-10 text-right">{ready}/{modWeeks.length}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-[10px] text-slate-600 text-center">
          All content in DRAFT status pending faculty review and scientific approval
        </div>
      </div>

      {/* Faculty assignments */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">👩‍🏫 Faculty Assignments (Provisional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            { name: "Dr. Suresh", modules: "Foundations of Molecular Oncology", weeks: "1–3", status: "confirmed" },
            { name: "Dr. Nagarajan Kannan", modules: "Molecular Diagnostic Technologies, Lab Quality", weeks: "4–6, 21", status: "confirmed" },
            { name: "Dr. Philip Beer", modules: "Clinical NGS, Liquid Biopsy", weeks: "7–9, 16–18", status: "confirmed" },
            { name: "Dr. Sabarinathan Radhakrishnan", modules: "Clinical Variant Interpretation", weeks: "10–12", status: "confirmed" },
            { name: "Prof. Anguraj Sadanandam", modules: "Precision Oncology, Advanced", weeks: "13–15, 19–20", status: "chair" },
            { name: "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi", modules: "Molecular Tumour Board", weeks: "22–24", status: "confirmed" },
          ].map(f => (
            <div key={f.name} className="glass p-3 rounded-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-white text-xs font-medium">{f.name}</div>
                  <div className="text-slate-500 text-[10px]">{f.modules}</div>
                  <div className="text-slate-600 text-[10px]">Weeks {f.weeks}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                  f.status === "chair"
                    ? "text-teal-400 border-teal-400/30 bg-teal-400/10"
                    : "text-green-400 border-green-400/30 bg-green-400/10"
                }`}>
                  {f.status === "chair" ? "Programme Chair" : "✓ Confirmed"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-slate-600 text-center">
          ⚠️ All faculty assignments are provisional and subject to change
        </div>
      </div>
    </div>
  );
}
