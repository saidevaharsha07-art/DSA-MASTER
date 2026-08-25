# CodeChef Practice Data Extraction Engine

Production-grade, high-speed, API-driven data extraction engine designed to crawl, validate, audit, and export complete practice datasets from CodeChef Practice platform.

## Features

- **Offline Raw Archival**: Stores every raw catalog, syllabus, and problem JSON response under `raw/`.
- **Modular Pipeline**: Decoupled modules for catalog crawling, syllabus fetching, problem metadata extraction, validation, duplicate/missing auditing, and Excel/CSV/JSON exports.
- **Incremental Resume Support**: State checkpointing saved after every completed path in `exports/cache_state.json`.
- **Zero Difference Validation**: Enforces `Difference = Expected Problems - Extracted Problems = 0` across all practice paths.
- **Multi-Format Outputs**:
  - `exports/codechef_practice_complete.xlsx` (Master workbook with `INDEX`, `SUMMARY`, and 9 Section worksheets)
  - `exports/codechef_practice_complete.csv`
  - `exports/codechef_practice_complete.json`
  - `exports/sections/*.xlsx` (9 standalone section workbooks)
  - `exports/duplicate_report.csv`
  - `exports/missing_report.csv`
  - `CRAWL_REPORT.md`

## Quick Start

```bash
# Run the full pipeline (auto-resumes from existing cache)
python scripts/resume.py
```
