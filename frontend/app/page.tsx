"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import type { UserRole, User } from "./types";

export type { UserRole, User };

const DEMO_USERS: Record<string, User> = {
  student: { name: "Dr. Priya Sharma", role: "student", email: "priya.sharma@demo.polche.ac", avatar: "PS" },
  faculty: { name: "Prof. Anguraj Sadanandam", role: "faculty", email: "anguraj.sadanandam@icr.ac.uk", avatar: "AS" },
  director: { name: "Prof. Anguraj Sadanandam", role: "director", email: "anguraj.sadanandam@icr.ac.uk", avatar: "AS" },
  organiser: { name: "Dr. Suresh", role: "organiser", email: "priya.nair@polche.ac", avatar: "PN" },
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <LoginPage onLogin={(role) => setUser(DEMO_USERS[role])} />;
  }

  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
