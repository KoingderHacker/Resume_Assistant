# backend/routes/resume.py

from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from models.schemas import ResumeParsed, ResumeUploadResponse, ResumeStoreResponse
from services.resume_parser import parse_resume
from routes.chat import user_resumes

router = APIRouter()

@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    try:
        parsed = parse_resume(file)
        return {"parsed_resume": parsed}
    except ValueError as ve:
        return JSONResponse(status_code=400, content={"error": str(ve)})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})



@router.post("/store_resume/{user_id}", response_model=ResumeStoreResponse)
async def store_resume(user_id: str, data: ResumeParsed):
    user_resumes[user_id] = data.dict()
    return {"status": "stored"}
