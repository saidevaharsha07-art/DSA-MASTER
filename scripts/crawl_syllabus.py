import os
import json
import time
import requests
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

def load_cache_state():
    cache_path = os.path.join(config.EXPORTS_DIR, "cache_state.json")
    if os.path.exists(cache_path):
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"completed_slugs": {}, "total_paths": 0, "completed_count": 0}

def save_cache_state(cache_state):
    cache_path = os.path.join(config.EXPORTS_DIR, "cache_state.json")
    with open(cache_path, "w", encoding="utf-8") as f:
        json.dump(cache_state, f, indent=2)

def fetch_single_syllabus(path_info):
    slug = path_info["slug"]
    raw_file = os.path.join(config.SYLLABUS_RAW_DIR, f"{slug}.json")

    if os.path.exists(raw_file):
        try:
            with open(raw_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            return slug, data, True
        except Exception:
            pass

    url = config.SYLLABUS_API_FMT.format(slug=slug)
    attempt = 0
    while attempt < config.MAX_RETRIES:
        attempt += 1
        try:
            resp = requests.get(url, headers=config.DEFAULT_HEADERS, timeout=config.TIMEOUT)
            if resp.status_code == 200:
                data = resp.json()
                with open(raw_file, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2)
                return slug, data, True
            else:
                print(f"    [Syllabus] {slug} HTTP {resp.status_code} (attempt {attempt})")
        except Exception as e:
            print(f"    [Syllabus] {slug} Exception {e} (attempt {attempt})")
        time.sleep(config.RETRY_BACKOFF_FACTOR * attempt)
    return slug, None, False

def crawl_all_syllabi(parsed_catalog):
    config.ensure_directories()
    cache_state = load_cache_state()

    print("[2/9] Crawling Syllabi for Practice Paths...")
    
    all_paths = []
    for sec in parsed_catalog.get("sections", []):
        for path in sec.get("paths", []):
            all_paths.append(path)

    cache_state["total_paths"] = len(all_paths)
    print(f"  Total practice paths to process: {len(all_paths)}")

    # Track missing or failed
    syllabi_map = {}
    paths_to_fetch = []

    for path in all_paths:
        slug = path["slug"]
        if slug in cache_state["completed_slugs"]:
            raw_file = os.path.join(config.SYLLABUS_RAW_DIR, f"{slug}.json")
            if os.path.exists(raw_file):
                with open(raw_file, "r", encoding="utf-8") as f:
                    syllabi_map[slug] = json.load(f)
                continue
        paths_to_fetch.append(path)

    print(f"  Cached paths ready: {len(syllabi_map)} | Remaining to fetch: {len(paths_to_fetch)}")

    if paths_to_fetch:
        with ThreadPoolExecutor(max_workers=config.MAX_WORKERS) as executor:
            future_to_path = {executor.submit(fetch_single_syllabus, p): p for p in paths_to_fetch}
            for future in as_completed(future_to_path):
                path_info = future_to_path[future]
                slug, data, success = future.result()
                if success and data:
                    syllabi_map[slug] = data
                    cache_state["completed_slugs"][slug] = {
                        "slug": slug,
                        "title": path_info.get("title", ""),
                        "section": path_info.get("section", ""),
                        "updated_at": time.strftime("%Y-%m-%d %H:%M:%S")
                    }
                    cache_state["completed_count"] = len(cache_state["completed_slugs"])
                    save_cache_state(cache_state)
                    print(f"    [Syllabus Saved] ({cache_state['completed_count']}/{len(all_paths)}) {slug}")
                else:
                    print(f"    [FAILED Syllabus] {slug}")

    print(f"  Syllabus crawl completed. Total syllabi available: {len(syllabi_map)}\n")
    return syllabi_map

if __name__ == "__main__":
    from scripts.crawl_catalog import crawl_catalog
    cat = crawl_catalog()
    crawl_all_syllabi(cat)
