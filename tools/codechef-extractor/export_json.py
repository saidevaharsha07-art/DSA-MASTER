import os
import json
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

def export_json_file(normalized_data):
    print("[8/9] Exporting Master JSON Dataset...")
    config.ensure_directories()
    json_path = os.path.join(config.EXPORTS_DIR, "codechef_practice_complete.json")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(normalized_data, f, indent=2)

    print(f"  Saved master JSON file: {json_path}\n")

if __name__ == "__main__":
    pass
