"use client";
import type { User, NavSection } from "../types";
import { CURRICULUM } from "../data/curriculum";


export default function OrganiserDashboard({ user, onNavigate }: { user: User; onNavigate: (s: NavSection) => void }) {
  const cohortStats = [
    { label: "Enrolled Students", value: "0", icon: "🎓", color: "text-orange-400" },
    { label: "Faculty Members", value: "7", icon: "👩‍🏫", color: "text-teal-400" },
    { label: "Course Weeks", value: "24", icon: "📅", color: "text-blue-400" },
    { label: "Contact Hours", value: "48", icon: "⏱️", color: "text-violet-400" },
  ];

  const schedule = CURRICULUM.slice(0, 6).map((w, i) => ({
    week: w.week,
    date: `2025-${String(2 + Math.floor(i / 4)).padStart(2, "0")}-${String(3 + (i % 4) * 7).padStart(2, "0")}`,
    lecture: w.title,
    workshop: w.workshopTitle,
    status: i === 0 ? "upcoming" : "scheduled",
  }));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="glass p-5 rounded-xl border border-orange-500/20">
        <h1 className="text-xl font-bold text-white mb-1">
          Course Organiser — <span className="gradient-text">{user.name}</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Certificate in Molecular Diagnostics & Precision Oncology · Enrolment & Operations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cohortStats.map(s => (
          <div key={s.label} className="glass p-4 rounded-xl text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Enrolment panel */}
      <div className="glass p-4 rounded-xl border border-orange-500/10">
        <h3 className="text-orange-400 text-xs font-bold uppercase tracking-wide mb-3">🎓 Student Enrolment</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📋</div>
          <div className="text-white text-sm font-medium mb-2">Enrolment Not Yet Open</div>
          <div className="text-slate-400 text-xs mb-4">
            The Certificate in Molecular Diagnostics & Precision Oncology<br />
            is currently in development. Faculty content is under review.
          </div>
          <button className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-xs transition-colors">
            Set Enrolment Date
          </button>
        </div>
      </div>

      {/* Schedule preview */}
      <div className="glass p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-teal-400 text-xs font-bold uppercase tracking-wide">📅 Teaching Schedule — First 6 Weeks</h3>
          <span className="text-[10px] text-slate-500">Times TBC</span>
        </div>
        <div className="space-y-2">
          {schedule.map(s => (
            <div key={s.week} className="glass p-3 rounded-lg flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex flex-col items-center justify-center flex-shrink-0">
                <div className="text-teal-400 text-[10px] font-bold leading-none">W{s.week}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{s.lecture}</div>
                <div className="text-slate-500 text-[10px]">Workshop: {s.workshop}</div>
              </div>
              <div className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
                s.status === "upcoming"
                  ? "text-orange-400 border-orange-400/30 bg-orange-400/10"
                  : "text-slate-500 border-slate-700"
              }`}>
                {s.status === "upcoming" ? "Next" : "Scheduled"}
              </div>
            </div>
          ))}
          <button
            onClick={() => onNavigate("curriculum")}
            className="text-teal-400 text-xs hover:underline w-full text-center mt-1"
          >
            View all 24 weeks →
          </button>
        </div>
      </div>

      {/* Communication panel */}
      <div className="glass p-4 rounded-xl">
        <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">📢 Communications & Announcements</h3>
        <div className="text-center py-6">
          <div className="text-3xl mb-3">✉️</div>
          <div className="text-slate-400 text-sm">No announcements yet</div>
          <div className="text-slate-600 text-xs mt-1">Announcements will appear here once students are enrolled</div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {["Send Announcement", "Schedule Reminder", "Export Attendance"].map(label => (
            <button
              key={label}
              className="glass glass-hover p-2 rounded-lg text-slate-400 text-[10px] text-center"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Teams integration placeholder */}
      <div className="glass p-4 rounded-xl border border-blue-500/10">
        <h3 className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">💻 Microsoft Teams Integration</h3>
        <div className="flex gap-3">
          <span className="text-blue-400 text-2xl flex-shrink-0">🔗</span>
          <div>
            <div className="text-white text-sm font-medium mb-1">Teams Connection Required</div>
            <div className="text-slate-400 text-xs">
              Microsoft Teams is the designated live teaching platform. Integration requires
              Microsoft 365 organisational credentials and appropriate licensing. Contact your
              IT administrator to configure the Teams API connection.
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded text-blue-400 text-xs transition-colors">
                Configure Teams →
              </button>
              <button className="px-3 py-1.5 glass hover:bg-white/5 rounded text-slate-400 text-xs transition-colors">
                Use Zoom / Meet instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
