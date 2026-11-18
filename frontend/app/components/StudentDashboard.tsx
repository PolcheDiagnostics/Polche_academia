"use client";
import type { User, NavSection } from "../types";
import { CURRICULUM, MODULES } from "../data/curriculum";


export default function StudentDashboard({ user, onNavigate }: { user: User; onNavigate: (s: NavSection) => void }) {
  const currentWeek = 1;
  const completedWeeks = 0;
  const progress = (completedWeeks / 24) * 100;

  const upcomingSession = CURRICULUM[0];
  const nextModule = MODULES[0];

  const quickActions = [
    { label: "Continue Week 1 Lesson", icon: "📖", nav: "curriculum" as NavSection, color: "from-teal-500 to-cyan-600", desc: "Cancer as a Genomic Disease" },
    { label: "Pathway Explorer", icon: "🧬", nav: "molecular-explorer" as NavSection, color: "from-blue-500 to-indigo-600", desc: "RAS-MAPK interactive simulation" },
    { label: "Interpret NGS Report", icon: "🔬", nav: "ngs-studio" as NavSection, color: "from-violet-500 to-purple-600", desc: "Synthetic NSCLC case" },
    { label: "Take a Quiz", icon: "📝", nav: "assessment" as NavSection, color: "from-orange-500 to-amber-600", desc: "Week 1 assessment — 8 questions" },
    { label: "Ask AI Tutor", icon: "🤖", nav: "ai-tutor" as NavSection, color: "from-pink-500 to-rose-600", desc: "Get cited scientific answers" },
  ];

  const learningStats = [
    { label: "Current Week", value: "1 / 24", icon: "📅", color: "text-teal-400" },
    { label: "Contact Hours", value: "0 / 48", icon: "⏱️", color: "text-blue-400" },
    { label: "Quiz Score", value: "—", icon: "📊", color: "text-violet-400" },
    { label: "Module", value: "1 / 9", icon: "🗂️", color: "text-orange-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="glass p-5 rounded-xl border border-teal-500/20">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">
              Welcome back, <span className="gradient-text">{user.name.split(" ")[1]}</span> 👋
            </h1>
            <p className="text-slate-400 text-sm">
              Certificate in Molecular Diagnostics & Precision Oncology · Week 1 of 24
            </p>
          </div>
          <div className="glass px-4 py-2 rounded-lg text-sm">
            <span className="text-teal-400 font-semibold">Module 1</span>
            <span className="text-slate-500 mx-2">·</span>
            <span className="text-slate-300">Foundations of Molecular Oncology</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Course Progress</span>
            <span>{completedWeeks}/24 weeks</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {learningStats.map(stat => (
          <div key={stat.label} className="glass p-4 rounded-xl text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-slate-500 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-white font-semibold mb-3 text-sm">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.nav)}
              className="glass glass-hover p-4 rounded-xl text-left group"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-xl mb-3 shadow`}>
                {action.icon}
              </div>
              <div className="text-white text-sm font-medium group-hover:text-teal-300 transition-colors">{action.label}</div>
              <div className="text-slate-500 text-xs mt-1">{action.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* This week's content */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass p-4 rounded-xl">
          <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide mb-3">📅 This Week — Week 1</h3>
          <h4 className="text-white font-semibold text-sm mb-2">{upcomingSession.title}</h4>
          <div className="space-y-2">
            {upcomingSession.lectureObjectives.map((obj, i) => (
              <div key={i} className="flex gap-2 text-xs text-slate-400">
                <span className="text-teal-500 flex-shrink-0 mt-0.5">→</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("curriculum")}
            className="mt-4 w-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg py-2 text-teal-400 text-xs font-medium transition-colors"
          >
            Open Week 1 Lesson →
          </button>
        </div>

        <div className="glass p-4 rounded-xl">
          <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">🗂️ Course Modules</h3>
          <div className="space-y-2">
            {MODULES.slice(0, 5).map(mod => (
              <div
                key={mod.id}
                className="flex items-center gap-3 glass p-2 rounded-lg glass-hover cursor-pointer"
                onClick={() => onNavigate("curriculum")}
              >
                <div
                  className="w-2 h-8 rounded-full flex-shrink-0"
                  style={{ background: mod.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{mod.title}</div>
                  <div className="text-slate-500 text-[10px]">Weeks {mod.weeks[0]}–{mod.weeks[mod.weeks.length - 1]} · {mod.faculty.split(" ").slice(-1)[0]}</div>
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full border ${mod.id === 1 ? "text-teal-400 border-teal-400/30 bg-teal-400/10" : "text-slate-600 border-slate-700"}`}>
                  {mod.id === 1 ? "Active" : "Upcoming"}
                </div>
              </div>
            ))}
            <button
              onClick={() => onNavigate("curriculum")}
              className="text-teal-400 text-xs hover:underline mt-1 w-full text-center"
            >
              View all 9 modules →
            </button>
          </div>
        </div>
      </div>

      {/* Key topics badge cloud */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wide mb-3">Week 1 Key Topics</h3>
        <div className="flex flex-wrap gap-2">
          {upcomingSession.keyTopics.map(topic => (
            <span key={topic} className="citation-badge text-xs">{topic}</span>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-3">{upcomingSession.studentSummary}</p>
      </div>
    </div>
  );
}
