"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import type { UserRole, User } from "./types";

export type { UserRole, User };

const DEMO_USERS: Record<string, User> = {
  student: { name: "Dr. Priya Sharma", role: "student", email: "priya.sharma@demo.polche.ac", avatar: "PS" },
  faculty: { name: "Faculty Demo", role: "faculty", email: "faculty@polche.ac", avatar: "AS" },
  director: { name: "Director Demo", role: "director", email: "director@polche.ac", avatar: "AS" },
  organiser: { name: "Dr. Suresh", role: "organiser", email: "priya.nair@polche.ac", avatar: "PN" },
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <LoginPage onLogin={(role) => setUser(DEMO_USERS[role])} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
