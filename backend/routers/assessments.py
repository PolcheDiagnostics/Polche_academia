"""
Assessments router — MCQ, clinical vignette, interpretation exercises.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import random

router = APIRouter()

# Sample questions mirroring the frontend data
SAMPLE_QUESTIONS = [
    {
        "id": "q_w1_001", "week": 1, "module": 1, "difficulty": "basic", "type": "mcq",
        "question": "Which mutation in KRAS is most commonly targeted by sotorasib?",
        "options": [
            {"id": "a", "text": "KRAS G12D"},
            {"id": "b", "text": "KRAS G12C"},
            {"id": "c", "text": "KRAS G13D"},
            {"id": "d", "text": "KRAS Q61H"},
        ],
        "correctOptionId": "b",
        "explanation": "KRAS G12C creates a unique cysteine that sotorasib covalently binds in GDP-bound state.",
        "reference": "Skoulidis F et al. NEJM 2021. PMID: 34096690",
        "tags": ["KRAS", "G12C", "sotorasib"],
    },
    {
        "id": "q_w1_002", "week": 1, "module": 1, "difficulty": "basic", "type": "mcq",
        "question": "Driver mutations confer selective growth advantage. Passenger mutations:",
        "options": [
            {"id": "a", "text": "Also confer growth advantage in secondary sites"},
            {"id": "b", "text": "Occur by chance without contributing to oncogenesis"},
            {"id": "c", "text": "Are always missense variants"},
            {"id": "d", "text": "Occur only in stem cells"},
        ],
        "correctOptionId": "b",
        "explanation": "Passenger mutations arise during tumour evolution but do not confer selective advantage.",
        "reference": "Stratton MR et al. Nature 2009. PMID: 19360079",
        "tags": ["driver mutation", "passenger mutation"],
    },
]


@router.get("/questions")
def get_questions(week: Optional[int] = None, module: Optional[int] = None,
                  difficulty: Optional[str] = None, limit: int = 10):
    qs = SAMPLE_QUESTIONS
    if week:
        qs = [q for q in qs if q["week"] == week]
    if module:
        qs = [q for q in qs if q["module"] == module]
    if difficulty:
        qs = [q for q in qs if q["difficulty"] == difficulty]
    return qs[:limit]


@router.get("/questions/random")
def get_random_questions(count: int = 5, week: Optional[int] = None):
    pool = SAMPLE_QUESTIONS
    if week:
        pool = [q for q in pool if q["week"] == week]
    random.shuffle(pool)
    return pool[:count]


class SubmissionItem(BaseModel):
    questionId: str
    selectedOptionId: str


class AssessmentSubmission(BaseModel):
    studentId: str
    week: Optional[int] = None
    answers: List[SubmissionItem]


@router.post("/submit")
def submit_assessment(submission: AssessmentSubmission):
    results = []
    score = 0
    for ans in submission.answers:
        q = next((q for q in SAMPLE_QUESTIONS if q["id"] == ans.questionId), None)
        if not q:
            continue
        correct = ans.selectedOptionId == q["correctOptionId"]
        if correct:
            score += 1
        results.append({
            "questionId": ans.questionId,
            "correct": correct,
            "correctOptionId": q["correctOptionId"],
            "explanation": q["explanation"],
        })

    return {
        "studentId": submission.studentId,
        "score": score,
        "total": len(results),
        "percentage": round(score / len(results) * 100) if results else 0,
        "results": results,
    }
