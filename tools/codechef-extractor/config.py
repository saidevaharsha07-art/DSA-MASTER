import os

# Base Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXPORTS_DIR = os.path.join(BASE_DIR, "exports")
SECTIONS_DIR = os.path.join(EXPORTS_DIR, "sections")
RAW_DIR = os.path.join(BASE_DIR, "raw")
SYLLABUS_RAW_DIR = os.path.join(RAW_DIR, "syllabus")
PROBLEMS_RAW_DIR = os.path.join(RAW_DIR, "problems")
API_LOGS_DIR = os.path.join(RAW_DIR, "api_logs")
SCRIPTS_DIR = os.path.join(BASE_DIR, "scripts")

# Target 9 Sections
TARGET_SECTIONS = [
    "Beginner DSA",
    "Data Structures",
    "Algorithms",
    "Difficulty Rating Wise",
    "Star Wise Paths",
    "Interview Questions",
    "Other Practice Paths",
    "Company Based Questions",
    "Advanced Coding Challenges"
]

# Section File Mapping
SECTION_FILE_MAP = {
    "Beginner DSA": "beginner_dsa.xlsx",
    "Data Structures": "data_structures.xlsx",
    "Algorithms": "algorithms.xlsx",
    "Difficulty Rating Wise": "difficulty_rating.xlsx",
    "Star Wise Paths": "star_paths.xlsx",
    "Interview Questions": "interview_questions.xlsx",
    "Other Practice Paths": "other_paths.xlsx",
    "Company Based Questions": "company_questions.xlsx",
    "Advanced Coding Challenges": "advanced_challenges.xlsx"
}

# API Endpoints
CATALOG_API = "https://www.codechef.com/api/practice/catalog"
SYLLABUS_API_FMT = "https://www.codechef.com/api/practice/syllabus/{slug}?roadmapSlug="
PROBLEM_API_FMT = "https://www.codechef.com/api/contests/PRACTICE/problems/{code}"

# HTTP Headers
DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'https://www.codechef.com/practice'
}

# Crawler Performance Settings
MAX_WORKERS = 60
MAX_RETRIES = 1
RETRY_BACKOFF_FACTOR = 0.2
TIMEOUT = 4

def ensure_directories():
    os.makedirs(EXPORTS_DIR, exist_ok=True)
    os.makedirs(SECTIONS_DIR, exist_ok=True)
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(SYLLABUS_RAW_DIR, exist_ok=True)
    os.makedirs(PROBLEMS_RAW_DIR, exist_ok=True)
    os.makedirs(API_LOGS_DIR, exist_ok=True)
    os.makedirs(SCRIPTS_DIR, exist_ok=True)
