import re
from typing import Optional

# ───────────── Extract Email ─────────────
def extract_email(text: str) -> Optional[str]:
    match = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    return match.group() if match else None

# ───────────── Extract Phone Number ─────────────
def extract_phone(text: str) -> Optional[str]:
    match = re.search(r"(\+?\d{1,3}[\s-]?)?\(?\d{2,4}\)?[\s-]?\d{3,5}[\s-]?\d{4}", text)
    return match.group() if match else None

# ───────────── Extract URLs by Keyword ─────────────
def extract_urls(text: str, keyword: str) -> Optional[str]:
    pattern = r"(https?://[^\s]+)"
    matches = re.findall(pattern, text)
    for url in matches:
        if keyword.lower() in url.lower():
            return url
    return None

# ───────────── Clean and Normalize Text ─────────────
def clean_text(text: str) -> str:
    return re.sub(r'\s+', ' ', text).strip()

# ───────────── Extract Name ─────────────
def extract_name(text: str) -> Optional[str]:
    lines = text.strip().splitlines()
    for line in lines:
        if line and len(line.split()) <= 4 and not any(char.isdigit() for char in line):
            return line.strip()
    return None
