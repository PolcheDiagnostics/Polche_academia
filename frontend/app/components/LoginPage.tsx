"use client";
import { useState } from "react";
import type { UserRole } from "../page";

const ROLES = [
  {
    id: "student" as UserRole,
    label: "Student / Clinician",
    description: "Access lessons, AI tutor, NGS studio, assessments and your learning journey",
    icon: "🎓",
    color: "from-teal-500 to-cyan-600",
    example: "Dr. Priya Sharma",
  },
  {
    id: "faculty" as UserRole,
    label: "Faculty Member",
    description: "Generate slides, design workshops, review student questions and approve content",
    icon: "🔬",
    color: "from-blue-500 to-indigo-600",
    example: "Prof. Anguraj Sadanandam",
  },
  {
    id: "director" as UserRole,
    label: "Course Director",
    description: "Manage curriculum, assign faculty, approve content and monitor course readiness",
    icon: "📋",
    color: "from-violet-500 to-purple-600",
    example: "Prof. Anguraj Sadanandam",
  },
  {
    id: "organiser" as UserRole,
    label: "Programme Organiser",
    description: "Enrolment, scheduling, announcements, attendance and certification management",
    icon: "📊",
    color: "from-orange-500 to-amber-600",
    example: "Priya Nair",
  },
];

export default function LoginPage({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (role: UserRole) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo + Title */}
      <div className="text-center mb-10 animate-slide-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg teal-glow">
            🧬
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-white">Polche Academia</h1>
            <p className="text-xs text-teal-400 font-medium tracking-wide uppercase">Learning Hub</p>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Certificate in Molecular Diagnostics
          <br />& Precision Oncology
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">
          An AI-powered 24-week postgraduate certificate programme for Indian clinicians, pathologists and oncologists.
          <br />
          <span className="text-teal-400">Scientific Programme Chair: Prof. Anguraj Sadanandam, ICR London</span>
        </p>
      </div>

      {/* Programme highlights */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs text-slate-400">
        {["24 Weeks · 48 Contact Hours", "9 Expert Modules", "AI-Powered Tutoring", "Virtual NGS Laboratory", "Molecular Tumour Board Simulation", "Accreditation Pathway"].map(h => (
          <span key={h} className="glass px-3 py-1 rounded-full border border-white/10">{h}</span>
        ))}
      </div>

      {/* Role selection */}
      <div className="w-full max-w-3xl">
        <p className="text-center text-slate-400 text-sm mb-4">Select your role to access the demo</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => handleLogin(role.id)}
              className={`glass glass-hover text-left p-5 rounded-xl transition-all duration-200 group border ${
                selectedRole === role.id ? "border-teal-400/60 shadow-lg" : "border-white/10"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-2xl flex-shrink-0 shadow`}>
                  {role.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1 group-hover:text-teal-300 transition-colors">
                    {role.label}
                  </div>
                  <div className="text-slate-400 text-xs mb-2 leading-relaxed">{role.description}</div>
                  <div className="text-teal-500 text-xs">Demo: {role.example}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="glass p-8 rounded-2xl text-center">
            <div className="text-4xl mb-3 animate-pulse-slow">🧬</div>
            <p className="text-teal-400 text-sm font-medium">Loading Polche Academia…</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-slate-600">
        <p>Polche Academia · Educational Platform · All clinical cases are synthetic · Not for clinical use</p>
        <p className="mt-1">Scientific content sourced from licensed public resources (CIViC CC0, Reactome CC-BY, PubMed metadata)</p>
      </div>
    </div>
  );
}
