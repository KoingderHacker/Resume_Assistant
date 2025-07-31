import openai
import os

openai.api_key = os.getenv("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")


def ask_gpt(user_message: str, resume_data: dict) -> str:
    """Generates a GPT response using user's resume data + chat message"""

    # Extract pieces of resume data for prompt crafting
    contact = resume_data.get("contact", {})
    skills = resume_data.get("skills", [])
    education = resume_data.get("education", [])
    experience = resume_data.get("experience", [])
    projects = resume_data.get("projects", [])
    certifications = resume_data.get("certifications", [])
    summary = resume_data.get("summary", "")

    # Convert resume fields into readable bullet points
    education_lines = "\n".join([
        f"- {e.get('degree', '')} in {e.get('field_of_study', '')} from {e.get('institution', '')} ({e.get('start_year')} - {e.get('end_year')})"
        for e in education
    ])

    experience_lines = "\n".join([
        f"- {x.get('job_title')} at {x.get('company')} ({x.get('start_date')} - {x.get('end_date')}): {x.get('description') or ''}"
        for x in experience
    ])

    project_lines = "\n".join([
        f"- {p.get('title')}: {p.get('description')} ({', '.join(p.get('technologies', []))})"
        for p in projects
    ])

    certification_lines = "\n".join([
        f"- {c.get('name')} by {c.get('issuer')} ({c.get('date_earned')})"
        for c in certifications
    ])

    system_prompt = f"""
You are a smart, helpful career assistant that provides personalized resume feedback and career suggestions.

The user's resume details:
Name: {contact.get("name")}
Email: {contact.get("email")}
Phone: {contact.get("phone")}
LinkedIn: {contact.get("linkedin")}
GitHub: {contact.get("github")}
Portfolio: {contact.get("portfolio")}

Summary:
{summary}

Skills:
{', '.join(skills)}

Education:
{education_lines}

Experience:
{experience_lines}

Projects:
{project_lines}

Certifications:
{certification_lines}

Now respond to the following question by taking the resume context into account:
"""

    # Send to OpenAI
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # or "gpt-3.5-turbo"
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"⚠️ OpenAI API error: {str(e)}"
