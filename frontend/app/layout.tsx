import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polche Academia — Molecular Diagnostics & Precision Oncology",
  description: "AI-powered medical education platform for molecular diagnostics and precision oncology. Certificate programme for clinicians, molecular pathologists and medical educators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="animated-gradient min-h-screen">
        {children}
      </body>
    </html>
  );
}
