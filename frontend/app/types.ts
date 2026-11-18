export type UserRole = "student" | "faculty" | "director" | "organiser";

export interface User {
  name: string;
  role: UserRole;
  email: string;
  avatar: string;
}

export type NavSection =
  | "home"
  | "curriculum"
  | "ngs-studio"
  | "virtual-lab"
  | "ai-tutor"
  | "assessment"
  | "molecular-explorer"
  | "pptx-studio"
  | "mtb-simulator";
