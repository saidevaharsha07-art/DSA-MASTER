import os
import json
import time
import requests
import sys

# Ensure parent directory is in python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

def crawl_catalog():
    config.ensure_directories()
    raw_catalog_path = os.path.join(config.RAW_DIR, "catalog.json")
    parsed_catalog_path = os.path.join(config.RAW_DIR, "parsed_catalog.json")

    print("[1/9] Crawling Catalog API...")
    
    # Check if raw catalog already exists and is valid
    if os.path.exists(raw_catalog_path):
        print("  Found existing raw/catalog.json, loading...")
        with open(raw_catalog_path, "r", encoding="utf-8") as f:
            catalog_data = json.load(f)
    else:
        attempt = 0
        catalog_data = None
        while attempt < config.MAX_RETRIES:
            attempt += 1
            try:
                print(f"  Fetching catalog from {config.CATALOG_API} (Attempt {attempt})...")
                resp = requests.get(config.CATALOG_API, headers=config.DEFAULT_HEADERS, timeout=config.TIMEOUT)
                if resp.status_code == 200:
                    catalog_data = resp.json()
                    with open(raw_catalog_path, "w", encoding="utf-8") as f:
                        json.dump(catalog_data, f, indent=2)
                    print(f"  Successfully saved raw catalog to {raw_catalog_path}")
                    break
                else:
                    print(f"  Failed status code {resp.status_code}")
            except Exception as e:
                print(f"  Error fetching catalog: {e}")
            time.sleep(config.RETRY_BACKOFF_FACTOR * attempt)

    if not catalog_data:
        raise RuntimeError("Could not fetch catalog data from CodeChef API")

    # Parse catalog and extract target 9 sections
    raw_paths = catalog_data.get("practice_paths", [])
    sections = []
    total_paths_count = 0

    # Section Name Case/Normalization Helper
    section_rename_map = {
        "beginner dsa": "Beginner DSA",
        "data structures": "Data Structures",
        "algorithms": "Algorithms",
        "difficulty rating wise": "Difficulty Rating Wise",
        "star wise paths": "Star Wise Paths",
        "interview questions": "Interview Questions",
        "other practice paths": "Other Practice Paths",
        "company based questions": "Company Based Questions",
        "advanced coding challenges": "Advanced Coding Challenges"
    }

    for item in raw_paths:
        for sec_title, sec_content in item.items():
            norm_title = section_rename_map.get(sec_title.strip().lower(), sec_title.strip())
            if norm_title in config.TARGET_SECTIONS:
                paths_list = []
                # Extract course objects inside subkeys
                if isinstance(sec_content, dict):
                    for subkey, subval in sec_content.items():
                        if isinstance(subval, dict) and "courses" in subval:
                            courses = subval["courses"]
                            order_idx = 1
                            for cid, cinfo in courses.items():
                                path_obj = {
                                    "id": str(cinfo.get("id", "")),
                                    "section": norm_title,
                                    "slug": cinfo.get("slug", ""),
                                    "title": cinfo.get("title", cinfo.get("name", "")),
                                    "name": cinfo.get("name", ""),
                                    "level": cinfo.get("level", ""),
                                    "description": cinfo.get("description", ""),
                                    "lessons_count": cinfo.get("lessons_count", 0),
                                    "problems_count": cinfo.get("problems_count", 0),
                                    "solved_count": cinfo.get("solved_count", 0),
                                    "order": order_idx,
                                    "official_url": f"https://www.codechef.com/practice/{cinfo.get('slug', '')}"
                                }
                                paths_list.append(path_obj)
                                order_idx += 1
                
                sections.append({
                    "section_name": norm_title,
                    "paths_count": len(paths_list),
                    "paths": paths_list
                })
                total_paths_count += len(paths_list)
                print(f"  Section '{norm_title}': {len(paths_list)} practice paths discovered")

    parsed_result = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_sections": len(sections),
        "total_paths": total_paths_count,
        "sections": sections
    }

    with open(parsed_catalog_path, "w", encoding="utf-8") as f:
        json.dump(parsed_result, f, indent=2)

    print(f"  Catalog discovery complete: {len(sections)} sections, {total_paths_count} practice paths.\n")
    return parsed_result

if __name__ == "__main__":
    crawl_catalog()
