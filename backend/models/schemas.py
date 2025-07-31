from pydantic import BaseModel, EmailStr
from typing import List, Optional


# ───────────── Sub-models ─────────────

class ContactInfo(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]


class EducationEntry(BaseModel):
    institution: str
    degree: Optional[str]
    start_year: Optional[int]
    end_year: Optional[int]


class ExperienceEntry(BaseModel):
    job_title: Optional[str]
    company: Optional[str]
    description: Optional[str]


# ───────────── Main Resume Model ─────────────

class ResumeParsed(BaseModel):
    contact: Optional[ContactInfo] = None
    skills: List[str] = []
    education: List[EducationEntry] = []
    experience: List[ExperienceEntry] = []
    summary: Optional[str] = None



# ───────────── Resume Upload Response ─────────────

class ResumeUploadResponse(BaseModel):
    parsed_resume: ResumeParsed

class ResumeStoreResponse(BaseModel):
    status: str

# ───────────── Chat Feature Models ─────────────

class ChatRequest(BaseModel):
    user_id: str
    message: str


class ChatResponse(BaseModel):
    response: str
