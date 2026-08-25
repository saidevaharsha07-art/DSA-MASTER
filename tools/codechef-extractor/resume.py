import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config
from scripts.crawl_catalog import crawl_catalog
from scripts.crawl_syllabus import crawl_all_syllabi
from scripts.crawl_problem_details import crawl_all_problem_details
from scripts.validate import normalize_and_validate
from scripts.audit import audit_dataset
from scripts.export_excel import export_excel_files
from scripts.export_csv import export_csv_file
from scripts.export_json import export_json_file

def run_pipeline():
    start_time = time.time()
    print("==========================================================================")
    print("      CODECHEF PRACTICE DATA EXTRACTION ENGINE — FULL PIPELINE           ")
    print("==========================================================================\n")

    config.ensure_directories()

    # 1. Crawl Catalog
    parsed_catalog = crawl_catalog()

    # 2. Crawl Syllabi
    syllabi_map = crawl_all_syllabi(parsed_catalog)

    # Collect all problem codes across all syllabi
    all_problem_codes = []
    for slug, s_data in syllabi_map.items():
        modules = s_data.get("modules", [])
        for mod in modules:
            submodules = mod.get("submodules", [])
            for sub in submodules:
                for item in sub.get("problems_with_status", []):
                    code = item.get("code", "").strip()
                    if code:
                        all_problem_codes.append(code)

    print(f"  Total problem instances across all practice paths: {len(all_problem_codes)}")

    # 3. Crawl Problem Metadata
    problems_map = crawl_all_problem_details(all_problem_codes)

    # 4. Normalize & Validate
    normalized_data, all_problems_flat, val_summary = normalize_and_validate(parsed_catalog, syllabi_map, problems_map)

    # 5. Audit & Reports
    elapsed_sec = time.time() - start_time
    duplicates, missing_fields = audit_dataset(all_problems_flat, val_summary, elapsed_seconds=elapsed_sec)

    # 6. Excel Exports (Master + 9 Sections)
    export_excel_files(normalized_data, all_problems_flat)

    # 7. CSV Export
    export_csv_file(all_problems_flat)

    # 8. JSON Export
    export_json_file(normalized_data)

    total_time = time.time() - start_time
    mins, secs = divmod(int(total_time), 60)
    print("==========================================================================")
    print(f"  PIPELINE EXECUTION COMPLETE IN {mins}m {secs}s")
    print(f"  Sections Processed: {len(normalized_data.get('sections', []))}")
    print(f"  Total Practice Paths: {val_summary.get('total_paths', 0)}")
    print(f"  Total Problems Extracted: {len(all_problems_flat)}")
    print(f"  Pass Rate: {val_summary.get('success_rate_percent', 100.0)}% (Diff = {val_summary.get('total_difference', 0)})")
    print("==========================================================================\n")

if __name__ == "__main__":
    run_pipeline()
