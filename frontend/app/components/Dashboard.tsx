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
import MTBSimulator from "./MTBSimulator";
import VirtualLab from "./VirtualLab";

const NAV_ITEMS: { id: NavSection; label: string; icon: string; roles: string[]; badge?: string }[] = [
  { id: "home", label: "Dashboard", icon: "🏠", roles: ["student", "faculty", "director", "organiser"] },
  { id: "curriculum", label: "Curriculum", icon: "📚", roles: ["student", "faculty", "director", "organiser"] },
  { id: "molecular-explorer", label: "Pathway Explorer", icon: "🧬", roles: ["student", "faculty", "director"] },
  { id: "virtual-lab", label: "Virtual Lab", icon: "🔬", roles: ["student", "faculty", "director"] },
  { id: "ngs-studio", label: "NGS Studio", icon: "🧪", roles: ["student", "faculty", "director"] },
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
      case "virtual-lab": return <VirtualLab />;
      case "pptx-studio": return <PowerPointStudio />;
      case "mtb-simulator": return <MTBSimulator />;
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
              <button onClick={onLogout} className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-xs px-2 py-1 rounded hover:bg-red-400/10 transition-colors" title="Sign out">
                <span>↩</span><span>Sign out</span>
              </button>
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

