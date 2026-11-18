"""
Curriculum router — 24-week course structure endpoints.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

MODULES = [
    {"id": 1, "title": "Foundations of Molecular Oncology", "weeks": [1,2,3], "faculty": "Dr. Suresh"},
    {"id": 2, "title": "Molecular Diagnostic Technologies", "weeks": [4,5,6], "faculty": "Dr. Nagarajan Kannan"},
    {"id": 3, "title": "Clinical NGS and Genomic Biomarkers", "weeks": [7,8,9], "faculty": "Dr. Philip Beer"},
    {"id": 4, "title": "Clinical Variant Interpretation", "weeks": [10,11,12], "faculty": "Dr. Sabarinathan Radhakrishnan"},
    {"id": 5, "title": "Precision Oncology", "weeks": [13,14,15], "faculty": "Prof. Anguraj Sadanandam"},
    {"id": 6, "title": "Liquid Biopsy and Emerging Diagnostics", "weeks": [16,17,18], "faculty": "Dr. Philip Beer"},
    {"id": 7, "title": "Advanced Molecular Oncology", "weeks": [19,20], "faculty": "Prof. Anguraj Sadanandam"},
    {"id": 8, "title": "Laboratory Quality and Implementation", "weeks": [21], "faculty": "Dr. Nagarajan Kannan"},
    {"id": 9, "title": "Molecular Tumour Board", "weeks": [22,23,24], "faculty": "Dr. Krisztian Homicsko / Dr. Bhawna Sirohi"},
]


@router.get("/modules")
def get_modules():
    return MODULES


@router.get("/modules/{module_id}")
def get_module(module_id: int):
    mod = next((m for m in MODULES if m["id"] == module_id), None)
    if not mod:
        raise HTTPException(status_code=404, detail="Module not found")
    return mod


@router.get("/weeks")
def get_all_weeks():
    """Return basic metadata for all 24 weeks."""
    weeks = []
    for mod in MODULES:
        for w in mod["weeks"]:
            weeks.append({
                "week": w,
                "module_id": mod["id"],
                "module_title": mod["title"],
                "faculty": mod["faculty"],
            })
    return sorted(weeks, key=lambda x: x["week"])


@router.patch("/weeks/{week}/status")
def update_week_status(week: int, body: dict):
    """Update a week's draft status (faculty workflow endpoint)."""
    allowed = ["draft", "in_review", "approved", "published"]
    status = body.get("draftStatus")
    if status not in allowed:
        raise HTTPException(status_code=400, detail=f"Status must be one of {allowed}")
    # In production: persist to database
    return {"week": week, "draftStatus": status, "updated": True}
