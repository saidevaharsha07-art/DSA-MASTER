from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

from pypdf import PdfReader

PDF = Path(r"C:\Users\saide\Downloads\CF_Array_Problems_Tracker.pdf")
OUTPUT = Path("public/data/codeforces")
EXPECTED = {800: 159, 900: 22, 1000: 29, 1100: 30, 1200: 25, 1300: 30, 1400: 24}
ID = re.compile(r"^(\d+)([A-Z]\d?)$")


def difficulty(rating: int) -> str:
    if rating <= 900:
        return "Beginner"
    if rating <= 1100:
        return "Elementary"
    if rating <= 1300:
        return "Intermediate"
    return "Advanced"


lines = []
for page in PdfReader(PDF).pages:
    lines.extend(line.strip() for line in (page.extract_text() or "").splitlines() if line.strip())

problems = []
index = 0
while index < len(lines):
    match = ID.match(lines[index])
    if not match or index + 4 >= len(lines) or not lines[index + 2].isdigit() or lines[index + 4] != "Open ->":
        index += 1
        continue
    contest_id, letter = match.groups()
    rating = int(lines[index + 2])
    if rating not in EXPECTED:
        raise ValueError(f"Unexpected rating for {lines[index]}: {rating}")
    problems.append(
        {
            "problemId": lines[index],
            "contestId": int(contest_id),
            "problemLetter": letter,
            "title": lines[index + 1],
            "rating": rating,
            "topic": lines[index + 3],
            "difficulty": difficulty(rating),
            "url": f"https://codeforces.com/problemset/problem/{contest_id}/{letter}",
            "status": "unsolved",
            "favorite": False,
            "notes": "",
        }
    )
    index += 5

counts = Counter(problem["rating"] for problem in problems)
if counts != EXPECTED or len(problems) != 319:
    raise ValueError(f"PDF extraction mismatch: total={len(problems)}, counts={dict(counts)}")
if len({problem["problemId"] for problem in problems}) != len(problems):
    raise ValueError("Duplicate Codeforces problem IDs found")
if len({problem["url"] for problem in problems}) != len(problems):
    raise ValueError("Duplicate Codeforces URLs found")

OUTPUT.mkdir(parents=True, exist_ok=True)
for rating in EXPECTED:
    records = [problem for problem in problems if problem["rating"] == rating]
    (OUTPUT / f"rating{rating}.json").write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")

print(f"Imported {len(problems)} Codeforces problems from {PDF.name}.")
