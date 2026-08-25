import os
import csv
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

COLUMNS = [
    "Section", "Practice Path", "Description", "Lesson", "Problem Order",
    "Problem Name", "Problem Code", "Difficulty Rating", "Difficulty Label",
    "Official URL", "Estimated Time", "Tags", "Companies", "Certificate", "Status"
]

def export_csv_file(all_problems_flat):
    print("[7/9] Exporting Unified CSV Dataset...")
    config.ensure_directories()
    csv_path = os.path.join(config.EXPORTS_DIR, "codechef_practice_complete.csv")

    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(COLUMNS)

        for p in all_problems_flat:
            writer.writerow([
                p.get("section", ""),
                p.get("practice_path", ""),
                p.get("description", ""),
                p.get("lesson", ""),
                p.get("problem_order", ""),
                p.get("problem_name", ""),
                p.get("problem_code", ""),
                p.get("difficulty_rating", ""),
                p.get("difficulty_label", ""),
                p.get("official_url", ""),
                p.get("estimated_time", ""),
                p.get("tags", ""),
                p.get("companies", ""),
                p.get("certificate", ""),
                p.get("status", "")
            ])

    print(f"  Saved master CSV file: {csv_path}\n")

if __name__ == "__main__":
    pass
