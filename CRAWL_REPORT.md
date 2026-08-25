# CodeChef Practice Data Extraction Engine — Final Crawl Report

**Generated At:** 2026-08-02 00:40:10  
**Elapsed Execution Time:** 1s  
**Completion Status:** 100% Complete  

---

## 1. Summary Metrics

| Metric | Count / Status |
| :--- | :--- |
| **Total Target Sections** | 9 |
| **Total Practice Paths** | 71 |
| **Total Problems Extracted** | 4764 |
| **Expected Problems Total** | 4764 |
| **Problem Difference (Expected - Extracted)** | **0** |
| **Path Verification Pass Rate** | **100.0%** |
| **Duplicate Problem Codes** | 416 |
| **Duplicate URLs** | 416 |
| **Missing Ratings** | 3211 |
| **Missing Metadata (Tags/Companies)** | 3795 |

---

## 2. Section-Wise Breakdown

| Section Name | Practice Paths | Problems Extracted | Expected | Difference | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Beginner DSA** | 4 | 74 | 74 | 0 | ✅ PASSED |
| **Data Structures** | 7 | 360 | 360 | 0 | ✅ PASSED |
| **Algorithms** | 9 | 259 | 259 | 0 | ✅ PASSED |
| **Difficulty Rating Wise** | 7 | 864 | 864 | 0 | ✅ PASSED |
| **Star Wise Paths** | 3 | 280 | 280 | 0 | ✅ PASSED |
| **Interview Questions** | 12 | 1367 | 1367 | 0 | ✅ PASSED |
| **Other Practice Paths** | 9 | 928 | 928 | 0 | ✅ PASSED |
| **Company Based Questions** | 19 | 590 | 590 | 0 | ✅ PASSED |
| **Advanced Coding Challenges** | 1 | 42 | 42 | 0 | ✅ PASSED |

---

## 3. Data Integrity & Validation Guarantee

- **Difference Check**: Expected Problem Count minus Actual Extracted Count equals **0** across all verified practice paths.
- **Offline Archival**: Raw catalog (`raw/catalog.json`), all practice path syllabi (`raw/syllabus/*.json`), and problem metadata (`raw/problems/*.json`) are stored permanently in `raw/` for complete offline reproducibility.
- **Incremental Checkpointing**: Crawl state was saved after every completed practice path into `exports/cache_state.json`.

---

## 4. Generated Artifacts

- **Master Excel Dataset**: `exports/codechef_practice_complete.xlsx` (INDEX, SUMMARY, + 9 Section Worksheets)
- **Master CSV Dataset**: `exports/codechef_practice_complete.csv`
- **Master JSON Dataset**: `exports/codechef_practice_complete.json`
- **9 Section Workbooks**: `exports/sections/*.xlsx`
- **Duplicate Audit Report**: `exports/duplicate_report.csv`
- **Missing Fields Audit Report**: `exports/missing_report.csv`
- **Engine Execution Logs**: `raw/api_logs/`
