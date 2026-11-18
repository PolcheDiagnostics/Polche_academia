"""
Authentication router — demo mode with synthetic accounts.
Production: replace with secure identity provider + JWT + MFA.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Demo accounts — no real users, no real credentials
DEMO_USERS = {
    "student@polche.ac": {
        "id": "demo_student_001",
        "name": "Demo Student",
        "role": "student",
        "email": "student@polche.ac",
        "avatar": "S",
        "password_demo": "demo",  # never use real passwords like this in production
    },
    "faculty@polche.ac": {
        "id": "demo_faculty_001",
        "name": "Prof. Anguraj Sadanandam",
        "role": "faculty",
        "email": "faculty@polche.ac",
        "avatar": "AS",
        "password_demo": "demo",
    },
    "director@polche.ac": {
        "id": "demo_director_001",
        "name": "Course Director",
        "role": "director",
        "email": "director@polche.ac",
        "avatar": "CD",
        "password_demo": "demo",
    },
    "organiser@polche.ac": {
        "id": "demo_organiser_001",
        "name": "Dr. Suresh",
        "role": "organiser",
        "email": "organiser@polche.ac",
        "avatar": "PO",
        "password_demo": "demo",
    },
}


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    role: str
    email: str
    avatar: str
    token: str  # In production: a signed JWT


@router.post("/login", response_model=UserResponse)
def login(req: LoginRequest):
    user = DEMO_USERS.get(req.email.lower())
    if not user or req.password != user["password_demo"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return UserResponse(
        id=user["id"],
        name=user["name"],
        role=user["role"],
        email=user["email"],
        avatar=user["avatar"],
        token=f"demo_token_{user['id']}",  # Production: sign JWT with secret
    )


@router.get("/demo-accounts")
def demo_accounts():
    """Return available demo accounts for the login screen (passwords shown for demo only)."""
    return [
        {"email": "student@polche.ac", "password": "demo", "role": "student",
         "name": "Demo Student"},
        {"email": "faculty@polche.ac", "password": "demo", "role": "faculty",
         "name": "Prof. Anguraj Sadanandam"},
        {"email": "director@polche.ac", "password": "demo", "role": "director",
         "name": "Course Director"},
        {"email": "organiser@polche.ac", "password": "demo", "role": "organiser",
         "name": "Dr. Suresh"},
    ]
