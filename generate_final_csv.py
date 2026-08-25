import re
import csv
import json
import requests
import os
import openpyxl

def get_est_time(rating):
    if rating == "UNKNOWN" or rating is None:
        return "UNKNOWN"
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
        return "UNKNOWN"

def get_xp(rating):
    if rating == "UNKNOWN" or rating is None:
        return "UNKNOWN"
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
        return "UNKNOWN"

def load_cf_api():
    print("Fetching official Codeforces problemset data...")
    cf_dict = {}
    try:
        resp = requests.get("https://codeforces.com/api/problemset.problems", timeout=15)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "OK":
                problems = data["result"]["problems"]
                for p in problems:
                    c_id = p.get("contestId")
                    idx = p.get("index")
                    if c_id and idx:
                        key = f"{c_id}{idx}".upper()
                        cf_dict[key] = {
                            "name": p.get("name", "UNKNOWN"),
                            "rating": p.get("rating", "UNKNOWN"),
                            "tags": ", ".join(p.get("tags", [])) if p.get("tags") else "UNKNOWN"
                        }
                print(f"Loaded {len(cf_dict)} problems from Codeforces API.")
    except Exception as e:
        print(f"Error fetching Codeforces API: {e}")
    return cf_dict

def parse_curriculum_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    blocks = []
    current_kingdom = None
    current_pattern = None

    for line in lines:
        raw = line.strip()
        if not raw or raw.startswith('===') or raw == '---':
            continue

        # Kingdom Header
        if 'KINGDOM' in raw.upper() and not raw.upper().startswith('PATTERN'):
            clean_k = raw.lstrip('#').strip()
            current_kingdom = clean_k
            current_pattern = None
            continue

        # Pattern Header
        if 'PATTERN' in raw.upper():
            clean_p = raw.lstrip('#').strip()
            current_pattern = clean_p
            # If kingdom was not set or inferred from pattern (e.g. Pattern 24.2)
            if not current_kingdom:
                p_match = re.search(r'Pattern\s+(\d+)\.', clean_p, re.IGNORECASE)
                if p_match:
                    k_num = p_match.group(1)
                    current_kingdom = f"KINGDOM {k_num}"
                else:
                    current_kingdom = "UNKNOWN KINGDOM"
            continue

        # Ignore Rating lines
        if raw.lower().startswith('rating:'):
            continue

        # Parse problem IDs from line
        pids = re.findall(r'\b\d+[A-Z0-9]+\b', raw, re.IGNORECASE)
        if pids:
            for pid in pids:
                pid_clean = pid.upper()
                blocks.append({
                    "kingdom": current_kingdom or "UNKNOWN KINGDOM",
                    "pattern": current_pattern or "UNKNOWN PATTERN",
                    "problem_id": pid_clean
                })

    return blocks

def main():
    cf_dict = load_cf_api()
    raw_problems = parse_curriculum_file("curriculum.txt")

    seen = set()
    csv_rows = []

    for item in raw_problems:
        pid = item["problem_id"]
        if pid in seen:
            continue
        seen.add(pid)

        category = item["kingdom"]
        subtopic = item["pattern"]

        # Parse contest_id & problem_index
        match = re.match(r"^(\d+)([A-Z0-9]+)$", pid)
        if match:
            c_id, p_idx = match.group(1), match.group(2)
            key = f"{c_id}{p_idx}".upper()
            open_link = f"https://codeforces.com/problemset/problem/{c_id}/{p_idx}"
        else:
            c_id, p_idx = "UNKNOWN", "UNKNOWN"
            open_link = f"https://codeforces.com/problemset/problem/{pid}"

        if key in cf_dict:
            info = cf_dict[key]
            prob_name = info["name"]
            rating = info["rating"]
            topics = info["tags"]
        else:
            prob_name = "UNKNOWN"
            rating = "UNKNOWN"
            topics = "UNKNOWN"

        est_time = get_est_time(rating)
        xp = get_xp(rating)

        csv_rows.append({
            "Status": "Unsolved",
            "Category": category,
            "Subtopic": subtopic,
            "Problem #": pid,
            "Problem Name": prob_name,
            "Topics": topics,
            "Est Time": est_time,
            "XP": xp,
            "Open Link": open_link
        })

    csv_path = "Codeforces_Master_Dataset.csv"
    fieldnames = ["Status", "Category", "Subtopic", "Problem #", "Problem Name", "Topics", "Est Time", "XP", "Open Link"]

    with open(csv_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(csv_rows)

    print(f"Generated {csv_path} with {len(csv_rows)} unique verified problem records.")

if __name__ == "__main__":
    main()
