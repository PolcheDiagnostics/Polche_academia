"use client";
import { useState } from "react";
import type { User, NavSection } from "../types";
import StudentDashboard from "./StudentDashboard";
import FacultyDashboard from "./FacultyDashboard";
import DirectorDashboard from "./DirectorDashboard";
import OrganiserDashboard from "./OrganiserDashboard";
import CurriculumView from "./CurriculumView";
import NGSStudio from "./NGSStudio";
import AITutor from "./AITutor";
import Assessment from "./Assessment";
import MolecularExplorer from "./MolecularExplorer";
import PowerPointStudio from "./PowerPointStudio";

const NAV_ITEMS: { id: NavSection; label: string; icon: string; roles: string[]; badge?: string }[] = [
  { id: "home", label: "Dashboard", icon: "🏠", roles: ["student", "faculty", "director", "organiser"] },
  { id: "curriculum", label: "Curriculum", icon: "📚", roles: ["student", "faculty", "director", "organiser"] },
  { id: "molecular-explorer", label: "Pathway Explorer", icon: "🧬", roles: ["student", "faculty", "director"] },
  { id: "ngs-studio", label: "NGS Studio", icon: "🔬", roles: ["student", "faculty", "director"] },
  { id: "ai-tutor", label: "AI Tutor", icon: "🤖", roles: ["student", "faculty"] },
  { id: "assessment", label: "Assessments", icon: "📝", roles: ["student", "faculty", "director"] },
  { id: "pptx-studio", label: "Slide Studio", icon: "🎯", roles: ["faculty", "director"] },
  { id: "mtb-simulator", label: "MTB Simulator", icon: "🏥", roles: ["student", "faculty", "director"] },
];

export default function Dashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<NavSection>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const visibleNav = NAV_ITEMS.filter(n => n.roles.includes(user.role));

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        if (user.role === "student") return <StudentDashboard user={user} onNavigate={setActiveSection} />;
        if (user.role === "faculty") return <FacultyDashboard user={user} onNavigate={setActiveSection} />;
        if (user.role === "director") return <DirectorDashboard user={user} onNavigate={setActiveSection} />;
        if (user.role === "organiser") return <OrganiserDashboard user={user} onNavigate={setActiveSection} />;
        return null;
      case "curriculum": return <CurriculumView />;
      case "ngs-studio": return <NGSStudio />;
      case "ai-tutor": return <AITutor />;
      case "assessment": return <Assessment />;
      case "molecular-explorer": return <MolecularExplorer />;
      case "pptx-studio": return <PowerPointStudio />;
      case "mtb-simulator": return <MTBSimulatorPlaceholder />;
      default: return null;
    }
  };

  const roleColors: Record<string, string> = {
    student: "text-teal-400 bg-teal-400/10",
    faculty: "text-blue-400 bg-blue-400/10",
    director: "text-violet-400 bg-violet-400/10",
    organiser: "text-orange-400 bg-orange-400/10",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} flex-shrink-0 glass border-r border-white/10 flex flex-col transition-all duration-300 z-30`}
        style={{ background: "rgba(10,18,35,0.95)" }}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-sm flex-shrink-0">
            🧬
          </div>
          {sidebarOpen && (
            <div>
              <div className="text-white text-xs font-bold leading-tight">Polche Academia</div>
              <div className="text-teal-500 text-[10px]">Learning Hub</div>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 p-2 overflow-y-auto">
          {visibleNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all mb-1 ${
                activeSection === item.id
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate text-xs font-medium">{item.label}</span>}
              {sidebarOpen && item.badge && (
                <span className="ml-auto bg-teal-500 text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${roleColors[user.role]} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
              {user.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{user.name.split(" ").slice(-1)[0]}</div>
                <div className={`text-[10px] capitalize ${roleColors[user.role].split(" ")[0]}`}>{user.role}</div>
              </div>
            )}
            {sidebarOpen && (
              <button onClick={onLogout} className="text-slate-500 hover:text-red-400 text-xs" title="Log out">⬅</button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b border-white/10"
          style={{ background: "rgba(10,18,35,0.9)", backdropFilter: "blur(12px)" }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white p-1"
          >
            {sidebarOpen ? "◀" : "▶"}
          </button>
          <div className="flex-1">
            <h2 className="text-white text-sm font-semibold">
              {NAV_ITEMS.find(n => n.id === activeSection)?.label}
            </h2>
          </div>
          <div className={`text-xs px-3 py-1 rounded-full capitalize ${roleColors[user.role]}`}>
            {user.role}
          </div>
          <div className="text-slate-400 text-xs hidden md:block">{user.name}</div>
        </header>

        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function MTBSimulatorPlaceholder() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="text-6xl mb-4">🏥</div>
      <h2 className="text-2xl font-bold gradient-text mb-3">Molecular Tumour Board Simulator</h2>
      <p className="text-slate-400 mb-6">
        Virtual MTB cases with synthetic patient histories, molecular findings and evidence synthesis.
        Students present cases, rank evidence and receive faculty feedback.
      </p>
      <div className="glass p-4 rounded-xl text-left space-y-3">
        {["SYNTH-MTB-001: Metastatic BRAF V600E Melanoma — ESCAT ranking exercise", "SYNTH-MTB-002: NSCLC with co-occurring driver mutations — treatment sequencing", "SYNTH-MTB-003: Rare tumour with NTRK3 fusion — tumour-agnostic eligibility"].map(c => (
          <div key={c} className="flex items-center gap-3 p-3 glass rounded-lg glass-hover cursor-pointer">
            <span className="text-teal-400">🔬</span>
            <span className="text-slate-300 text-sm">{c}</span>
            <span className="ml-auto text-xs glass px-2 py-1 rounded text-teal-400">Weeks 22–24</span>
          </div>
        ))}
      </div>
      <p className="text-slate-600 text-xs mt-6">MTB Simulator fully implemented in Phase 4 development. Core NGS and assessment features available now.</p>
    </div>
  );
}
