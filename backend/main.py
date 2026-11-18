"""
Polche Academia Learning Hub — FastAPI Backend
Certificate in Molecular Diagnostics and Precision Oncology

This backend provides:
  - REST API for the Next.js frontend
  - Scientific RAG endpoints (licence-verified sources only)
  - PowerPoint generation (python-pptx; editable .pptx)
  - Assessment / quiz management
  - Curriculum data endpoints
  - Faculty content workflow (draft → review → approve → publish)

All endpoints require authentication in production. Dev mode uses demo accounts.
No real patient data is stored or transmitted. All clinical cases are synthetic.
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import uvicorn
import os

from routers import curriculum, assessments, pptx, rag, auth

app = FastAPI(
    title="Polche Academia API",
    description="Medical education platform API — Molecular Diagnostics & Precision Oncology",
    version="0.1.0",
)

# Allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(curriculum.router, prefix="/api/curriculum", tags=["curriculum"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(pptx.router, prefix="/api/pptx", tags=["pptx"])
app.include_router(rag.router, prefix="/api/rag", tags=["rag"])


@app.get("/")
def root():
    return {
        "platform": "Polche Academia Learning Hub",
        "version": "0.1.0",
        "status": "running",
        "endpoints": ["/api/auth", "/api/curriculum", "/api/assessments", "/api/pptx", "/api/rag"],
        "note": "All clinical content is synthetic. No real patient data stored.",
    }


@app.get("/health")
def health():
    return {"status": "healthy", "service": "polche-academia-api"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
