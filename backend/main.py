# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.resume import router as resume_router




app = FastAPI(
    title="AI Resume Assistant",
    description="Upload a resume and get suggestions or chat with the assistant.",
    version="1.0.0"
)

# CORS Middleware (adjust origins as needed for your frontend)
app.include_router(resume_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend dev URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routes
app.include_router(chat_router, prefix="/chat", tags=["Chat"])
app.include_router(resume_router, prefix="/resume", tags=["Resume"])

@app.get("/")
def root():
    return {"message": "Resume Assistant Backend is running"}
