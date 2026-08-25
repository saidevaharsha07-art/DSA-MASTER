import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import CellIsRule
import requests
import json
import os
import datetime

WORKBOOK_PATH = "Codeforces_Master_Dataset.xlsx"

# Difficulty mapping function
def get_difficulty(rating):
    if rating == "UNKNOWN" or rating is None:
        return "UNKNOWN"
    try:
        r = int(rating)
        if r < 1000:
            return "Easy"
        elif r <= 1299:
            return "Easy+"
        elif r <= 1499:
            return "Medium"
        elif r <= 1699:
            return "Medium+"
        elif r <= 1899:
            return "Hard"
        elif r <= 2099:
            return "Hard+"
        elif r <= 2399:
            return "Expert"
        else:
            return "Master"
    except (ValueError, TypeError):
        return "UNKNOWN"

# Estimated time mapping
def get_estimated_time(rating):
    if rating == "UNKNOWN" or rating is None:
        return 0
    try:
        r = int(rating)
        if r <= 1000:
            return 15
        elif r <= 1300:
            return 25
        elif r <= 1600:
            return 40
        elif r <= 1900:
            return 60
        elif r <= 2200:
            return 90
        elif r <= 2500:
            return 120
        elif r <= 3000:
            return 180
        else:
            return 240
    except (ValueError, TypeError):
        return 0

# XP mapping
def get_xp(rating):
    if rating == "UNKNOWN" or rating is None:
        return 0
    try:
        r = int(rating)
        if r <= 1000:
            return 10
        elif r <= 1300:
            return 20
        elif r <= 1600:
            return 35
        elif r <= 1900:
            return 55
        elif r <= 2200:
            return 80
        elif r <= 2500:
            return 110
        elif r <= 3000:
            return 150
        else:
            return 220
    except (ValueError, TypeError):
        return 0

class CodeforcesMasterBuilder:
    def __init__(self, filename=WORKBOOK_PATH):
        self.filename = filename
        self.cf_dict = {}
        self.load_codeforces_api()
        self.seen_problems = set()

    def load_codeforces_api(self):
        print("Fetching official Codeforces problemset data...")
        try:
            resp = requests.get("https://codeforces.com/api/problemset.problems", timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == "OK":
                    problems = data["result"]["problems"]
                    for p in problems:
                        contest_id = p.get("contestId")
                        index = p.get("index")
                        if contest_id and index:
                            key = f"{contest_id}{index}".upper()
                            self.cf_dict[key] = {
                                "name": p.get("name", "UNKNOWN"),
                                "rating": p.get("rating", "UNKNOWN"),
                                "tags": ", ".join(p.get("tags", [])) if p.get("tags") else "N/A"
                            }
                    print(f"Loaded {len(self.cf_dict)} problems from Codeforces API.")
                else:
                    print("Codeforces API returned non-OK status.")
            else:
                print(f"Codeforces API error: HTTP {resp.status_code}")
        except Exception as e:
            print(f"Failed to fetch Codeforces API: {e}")

    def parse_problem_id(self, problem_str):
        clean_str = problem_str.strip().upper()
        # Parse contest_id (digits) and problem_index (letters/digits)
        import re
        match = re.match(r"^(\d+)([A-Z0-9]+)$", clean_str)
        if match:
            return match.group(1), match.group(2)
        return None, None

    def verify_problem(self, problem_id):
        contest_id, index = self.parse_problem_id(problem_id)
        if not contest_id or not index:
            return {
                "contest_id": contest_id or "UNKNOWN",
                "index": index or "UNKNOWN",
                "name": "UNKNOWN",
                "rating": "UNKNOWN",
                "tags": "UNKNOWN",
                "verified": False
            }
        
        key = f"{contest_id}{index}".upper()
        if key in self.cf_dict:
            info = self.cf_dict[key]
            return {
                "contest_id": int(contest_id),
                "index": index,
                "name": info["name"],
                "rating": info["rating"],
                "tags": info["tags"],
                "verified": True if info["name"] != "UNKNOWN" else False
            }
        else:
            return {
                "contest_id": int(contest_id) if contest_id.isdigit() else contest_id,
                "index": index,
                "name": "UNKNOWN",
                "rating": "UNKNOWN",
                "tags": "UNKNOWN",
                "verified": False
            }

if __name__ == "__main__":
    builder = CodeforcesMasterBuilder()
    test_res = builder.verify_problem("706B")
    print("Test Verification 706B:", test_res)
