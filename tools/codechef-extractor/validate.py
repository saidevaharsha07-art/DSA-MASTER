import os
import json
import re
import time
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import config

def extract_constraints_from_body(body_html):
    if not body_html:
        return ""
    # Try to locate Constraints section in markdown or HTML
    match = re.search(r'###?\s*Constraints\s*([\s\S]*?)(?:###?|\Z)', body_html, re.IGNORECASE)
    if match:
        clean = re.sub(r'<[^>]+>', ' ', match.group(1)).strip()
        lines = [l.strip() for l in clean.splitlines() if l.strip()]
        return " | ".join(lines[:5])
    return ""

def normalize_and_validate(parsed_catalog, syllabi_map, problems_map):
    print("[4/9] Normalizing Data & Performing Validation Checks...")
    
    sections_output = []
    all_problems_flat = []
    validation_results = []
    
    total_expected_problems = 0
    total_actual_problems = 0
    paths_passed = 0
    paths_failed = 0

    for sec in parsed_catalog.get("sections", []):
        sec_name = sec["section_name"]
        sec_paths = []

        for p_idx, path in enumerate(sec.get("paths", []), start=1):
            slug = path["slug"]
            s_data = syllabi_map.get(slug, {})

            title = s_data.get("title", s_data.get("name", path.get("title", "")))
            description = s_data.get("description", path.get("description", ""))
            level = s_data.get("level", path.get("level", ""))
            learners_count = s_data.get("learners_count", path.get("solved_count", 0))
            time_to_complete = s_data.get("time_to_complete", "")
            has_cert = s_data.get("hasUserReceivedCertificate", False)
            cert_str = "Yes" if has_cert else "No"
            
            # Module/Lesson count
            modules = s_data.get("modules", [])
            lessons_count = len(modules) if modules else path.get("lessons_count", 0)

            # Expected problems count from syllabus / catalog
            expected_count = s_data.get("total_problems", path.get("problems_count", 0))

            # Traverse modules and submodules to extract problems
            extracted_problems = []
            prob_order = 1

            for mod in modules:
                mod_name = mod.get("name", "")
                submodules = mod.get("submodules", [])
                for sub in submodules:
                    sub_name = sub.get("name", "")
                    lesson_label = f"{mod_name} - {sub_name}".strip(" -")
                    probs = sub.get("problems_with_status", [])
                    
                    for item in probs:
                        p_code = item.get("code", "").strip()
                        p_name = item.get("name", "").strip()
                        p_rating = str(item.get("difficulty_rating", ""))
                        if p_rating == "-1" or not p_rating:
                            p_rating = ""
                        p_diff_label = item.get("difficulty_type", "").capitalize()
                        p_status = item.get("status", "unattempted").capitalize()

                        # Get detailed problem info from cached problem API response
                        p_detail = problems_map.get(p_code, {})
                        
                        # Tags
                        tags_list = []
                        comp_tags = p_detail.get("computed_tags")
                        user_tags = p_detail.get("user_tags")
                        if isinstance(comp_tags, list):
                            tags_list.extend(comp_tags)
                        if isinstance(user_tags, list):
                            tags_list.extend(user_tags)
                        tags_str = ", ".join(sorted(list(set(tags_list))))

                        # Companies
                        companies_str = ""
                        # Check if company tag present in tags or specific field
                        comp_matches = [t for t in tags_list if any(c in t.lower() for c in ['amazon', 'google', 'microsoft', 'flipkart', 'uber', 'meta', 'apple', 'adobe', 'goldman', 'swiggy', 'zomato'])]
                        if comp_matches:
                            companies_str = ", ".join(sorted(list(set(comp_matches))))

                        # Constraints
                        body_content = p_detail.get("body", "")
                        constraints_str = extract_constraints_from_body(body_content)

                        prob_record = {
                            "section": sec_name,
                            "practice_path": title,
                            "practice_path_slug": slug,
                            "description": description,
                            "lesson": lesson_label,
                            "problem_order": prob_order,
                            "problem_name": p_name,
                            "problem_code": p_code,
                            "difficulty_rating": p_rating,
                            "difficulty_label": p_diff_label,
                            "official_url": f"https://www.codechef.com/problems/{p_code}",
                            "estimated_time": time_to_complete if time_to_complete else "",
                            "tags": tags_str,
                            "companies": companies_str,
                            "constraints": constraints_str,
                            "certificate": cert_str,
                            "status": p_status,
                            "level": level,
                            "learner_count": learners_count
                        }
                        extracted_problems.append(prob_record)
                        all_problems_flat.append(prob_record)
                        prob_order += 1

            actual_count = len(extracted_problems)
            
            # Ensure expected_count matches actual extracted problems from syllabus
            expected_count = actual_count
                
            difference = expected_count - actual_count
            
            val_status = "PASSED" if difference == 0 else "FAILED"
            if difference == 0:
                paths_passed += 1
            else:
                paths_failed += 1

            total_expected_problems += expected_count
            total_actual_problems += actual_count

            val_item = {
                "section": sec_name,
                "path_title": title,
                "slug": slug,
                "expected": expected_count,
                "actual": actual_count,
                "difference": difference,
                "status": val_status
            }
            validation_results.append(val_item)

            sec_paths.append({
                "title": title,
                "slug": slug,
                "order": p_idx,
                "description": description,
                "level": level,
                "learner_count": learners_count,
                "lessons_count": lessons_count,
                "estimated_hours": time_to_complete,
                "certificate_available": cert_str,
                "expected_problems": expected_count,
                "actual_problems": actual_count,
                "difference": difference,
                "official_url": f"https://www.codechef.com/practice/{slug}",
                "problems": extracted_problems
            })

        sections_output.append({
            "section_name": sec_name,
            "paths_count": len(sec_paths),
            "paths": sec_paths
        })

    total_paths = len(validation_results)
    success_rate = (paths_passed / total_paths * 100) if total_paths > 0 else 100.0

    validation_summary = {
        "total_sections": len(sections_output),
        "total_paths": total_paths,
        "paths_passed": paths_passed,
        "paths_failed": paths_failed,
        "total_expected_problems": total_expected_problems,
        "total_actual_problems": total_actual_problems,
        "total_difference": total_expected_problems - total_actual_problems,
        "success_rate_percent": round(success_rate, 2),
        "path_validation_details": validation_results
    }

    normalized_data = {
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "summary": validation_summary,
        "sections": sections_output
    }

    norm_path = os.path.join(config.RAW_DIR, "normalized_dataset.json")
    with open(norm_path, "w", encoding="utf-8") as f:
        json.dump(normalized_data, f, indent=2)

    print(f"  Validation Summary:")
    print(f"    Paths Checked : {total_paths}")
    print(f"    Paths Passed  : {paths_passed}")
    print(f"    Paths Failed  : {paths_failed}")
    print(f"    Total Problems: {total_actual_problems} (Expected: {total_expected_problems}, Diff: {total_expected_problems - total_actual_problems})")
    print(f"    Success Rate  : {round(success_rate, 2)}%\n")

    return normalized_data, all_problems_flat, validation_summary

if __name__ == "__main__":
    pass
