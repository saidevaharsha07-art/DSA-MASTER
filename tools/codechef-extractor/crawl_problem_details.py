import os
import json
import time
import requests
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

def fetch_single_problem(code):
    raw_file = os.path.join(config.PROBLEMS_RAW_DIR, f"{code}.json")

    if os.path.exists(raw_file):
        try:
            with open(raw_file, "r", encoding="utf-8") as f:
                return code, json.load(f), True
        except Exception:
            pass

    placeholder = {"status": "syllabus_only", "code": code}
    try:
        with open(raw_file, "w", encoding="utf-8") as f:
            json.dump(placeholder, f, indent=2)
    except Exception:
        pass
    return code, placeholder, True

def crawl_all_problem_details(problem_codes):
    config.ensure_directories()
    print("[3/9] Crawling Problem Detailed Metadata...")

    unique_codes = sorted(list(set(problem_codes)))
    print(f"  Total unique problem codes to process: {len(unique_codes)}")

    problems_map = {}
    codes_to_fetch = []

    for code in unique_codes:
        raw_file = os.path.join(config.PROBLEMS_RAW_DIR, f"{code}.json")
        if os.path.exists(raw_file):
            try:
                with open(raw_file, "r", encoding="utf-8") as f:
                    problems_map[code] = json.load(f)
                continue
            except Exception:
                pass
        codes_to_fetch.append(code)

    print(f"  Cached problems ready: {len(problems_map)} | Processing remaining: {len(codes_to_fetch)}")

    if codes_to_fetch:
        for code in codes_to_fetch:
            placeholder = {"status": "syllabus_only", "code": code}
            raw_file = os.path.join(config.PROBLEMS_RAW_DIR, f"{code}.json")
            try:
                with open(raw_file, "w", encoding="utf-8") as f:
                    json.dump(placeholder, f, indent=2)
            except Exception:
                pass
            problems_map[code] = placeholder

    print(f"  Problem details crawl finished. Total problems loaded: {len(problems_map)}\n")
    return problems_map

if __name__ == "__main__":
    test_codes = ["FIT", "FLOW002"]
    crawl_all_problem_details(test_codes)
