from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse, ResumeParsed
from services.openai_services import ask_gpt

router = APIRouter()

# In-memory store for user resumes (can be replaced with DB later)
user_resumes: dict[str, dict] = {}


@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(data: ChatRequest):
    user_id = data.user_id
    user_message = data.message

    if user_id not in user_resumes:
        return ChatResponse(response="Please upload your resume first.")

    resume_data = user_resumes[user_id]
    reply = ask_gpt(user_message=user_message, resume_data=resume_data)

    return ChatResponse(response=reply)
