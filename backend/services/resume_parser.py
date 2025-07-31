import io
import fitz  # PyMuPDF for PDF
import pytesseract  # OCR
from docx import Document
from PIL import Image
from typing import Optional
from fastapi import UploadFile, HTTPException
from models.schemas import ResumeParsed, ContactInfo, ResumeUploadResponse
from utils.helpers import extract_email, extract_phone, extract_urls, clean_text, extract_name

# ───────────── File Readers ─────────────
def extract_text_from_pdf(file: UploadFile) -> str:
    file.file.seek(0)
    doc = fitz.open(stream=file.file.read(), filetype="pdf")
    return " ".join(page.get_text() for page in doc)

def extract_text_from_docx(file: UploadFile) -> str:
    file.file.seek(0)
    doc = Document(io.BytesIO(file.file.read()))
    return " ".join([para.text for para in doc.paragraphs])

def extract_text_from_image(file: UploadFile) -> str:
    file.file.seek(0)
    image = Image.open(file.file)
    return pytesseract.image_to_string(image)

def extract_text(file: UploadFile) -> str:
    filename = file.filename.lower()
    if filename.endswith(".pdf"):
        return extract_text_from_pdf(file)
    elif filename.endswith(".docx"):
        return extract_text_from_docx(file)
    elif filename.endswith((".jpg", ".jpeg", ".png")):
        return extract_text_from_image(file)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

# ───────────── Resume Parser ─────────────
def parse_resume(file: UploadFile) -> ResumeUploadResponse:
    try:
        text = extract_text(file)
        text = clean_text(text)

        if not text or len(text) < 10:
            raise HTTPException(status_code=400, detail="Resume text could not be extracted.")

        email = extract_email(text)
        phone = extract_phone(text)
        linkedin = extract_urls(text, "linkedin")
        github = extract_urls(text, "github")
        portfolio = extract_urls(text, "portfolio")
        name = extract_name(text)

        contact = ContactInfo(
            name=name or "N/A",
            email=email or "N/A",
            phone=phone or "N/A",
            linkedin=linkedin or "N/A",
            github=github or "N/A",
            portfolio=portfolio or "N/A"
        )

        resume_data = ResumeParsed(
            contact=contact,
            skills=[],
            education=[],
            experience=[],
            summary=""
        )

        return ResumeUploadResponse(parsed_resume=resume_data)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume parsing failed: {str(e)}")
