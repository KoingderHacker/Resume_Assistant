from fastapi import FastAPI
from routes import resume

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Resume Parser API is running!"}

app.include_router(resume.router, prefix="/resume")
