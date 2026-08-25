import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.formatting.rule import CellIsRule
import requests
import json
import os
import datetime
import re

WORKBOOK_PATH = "Codeforces_Master_Dataset.xlsx"

HEADER_FILL = PatternFill(start_color="1F4E79", end_color="1F4E79", fill_type="solid")
HEADER_FONT = Font(name="Calibri", size=11, bold=True, color="FFFFFF")

ZEBRA_FILL = PatternFill(start_color="F2F4F7", end_color="F2F4F7", fill_type="solid")
WHITE_FILL = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

EASY_FILL = PatternFill(start_color="D9EAD3", end_color="D9EAD3", fill_type="solid")
EASY_FONT = Font(name="Calibri", size=11, color="274E13", bold=True)

MEDIUM_FILL = PatternFill(start_color="FFF2CC", end_color="FFF2CC", fill_type="solid")
MEDIUM_FONT = Font(name="Calibri", size=11, color="7F6000", bold=True)

HARD_FILL = PatternFill(start_color="FCE5CD", end_color="FCE5CD", fill_type="solid")
HARD_FONT = Font(name="Calibri", size=11, color="783F04", bold=True)

EXPERT_FILL = PatternFill(start_color="F4CCCC", end_color="F4CCCC", fill_type="solid")
EXPERT_FONT = Font(name="Calibri", size=11, color="660000", bold=True)

UNKNOWN_FILL = PatternFill(start_color="EFEFEF", end_color="EFEFEF", fill_type="solid")
UNKNOWN_FONT = Font(name="Calibri", size=11, color="595959", italic=True)

LINK_FONT = Font(name="Calibri", size=11, color="0563C1", underline="single")
REGULAR_FONT = Font(name="Calibri", size=11)
BOLD_FONT = Font(name="Calibri", size=11, bold=True)

THIN_BORDER = Border(
    left=Side(style='thin', color='D9D9D9'),
    right=Side(style='thin', color='D9D9D9'),
    top=Side(style='thin', color='D9D9D9'),
    bottom=Side(style='thin', color='D9D9D9')
)

def get_difficulty(rating):
    if rating == "UNKNOWN" or rating is None:
        return "UNKNOWN"
    try:
        r = int(rating)
        if r < 1000:
            return "Easy"
        elif r <= 1299:
            return "Easy+"
        elif r <= 1499:
            return "Medium"
        elif r <= 1699:
            return "Medium+"
        elif r <= 1899:
            return "Hard"
        elif r <= 2099:
            return "Hard+"
        elif r <= 2399:
            return "Expert"
        else:
            return "Master"
    except (ValueError, TypeError):
        return "UNKNOWN"

def get_estimated_time(rating):
    if rating == "UNKNOWN" or rating is None:
        return 0
    try:
        r = int(rating)
        if r <= 1000:
            return 15
        elif r <= 1300:
            return 25
        elif r <= 1600:
            return 40
        elif r <= 1900:
            return 60
        elif r <= 2200:
            return 90
        elif r <= 2500:
            return 120
        elif r <= 3000:
            return 180
        else:
            return 240
    except (ValueError, TypeError):
        return 0

def get_xp(rating):
    if rating == "UNKNOWN" or rating is None:
        return 0
    try:
        r = int(rating)
        if r <= 1000:
            return 10
        elif r <= 1300:
            return 20
        elif r <= 1600:
            return 35
        elif r <= 1900:
            return 55
        elif r <= 2200:
            return 80
        elif r <= 2500:
            return 110
        elif r <= 3000:
            return 150
        else:
            return 220
    except (ValueError, TypeError):
        return 0

class CodeforcesMasterDataset:
    def __init__(self, filepath=WORKBOOK_PATH):
        self.filepath = filepath
        self.cf_dict = {}
        self.load_codeforces_api()
        self.problems_data = []
        self.seen_problems = set()
        self.kingdom_patterns = {} # kingdom -> set of patterns
        self.kingdom_order = []
        self.pattern_order = [] # list of (kingdom, pattern)

    def load_codeforces_api(self):
        print("Fetching Codeforces problemset dataset via API...")
        try:
            resp = requests.get("https://codeforces.com/api/problemset.problems", timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                if data.get("status") == "OK":
                    problems = data["result"]["problems"]
                    for p in problems:
                        contest_id = p.get("contestId")
                        index = p.get("index")
                        if contest_id and index:
                            key = f"{contest_id}{index}".upper()
                            self.cf_dict[key] = {
                                "name": p.get("name", "UNKNOWN"),
                                "rating": p.get("rating", "UNKNOWN"),
                                "tags": ", ".join(p.get("tags", [])) if p.get("tags") else "N/A"
                            }
                    print(f"Loaded {len(self.cf_dict)} official Codeforces problems.")
        except Exception as e:
            print(f"Warning: Could not fetch CF API: {e}")

    def verify_problem(self, prob_id):
        clean_id = prob_id.strip().upper()
        match = re.match(r"^(\d+)([A-Z0-9]+)$", clean_id)
        if match:
            c_id, p_idx = match.group(1), match.group(2)
            key = f"{c_id}{p_idx}".upper()
            if key in self.cf_dict:
                info = self.cf_dict[key]
                return {
                    "problem_id": clean_id,
                    "contest_id": int(c_id),
                    "problem_index": p_idx,
                    "name": info["name"],
                    "rating": info["rating"],
                    "tags": info["tags"],
                    "url": f"https://codeforces.com/problemset/problem/{c_id}/{p_idx}",
                    "verified": True if info["name"] != "UNKNOWN" else False
                }
            else:
                return {
                    "problem_id": clean_id,
                    "contest_id": int(c_id),
                    "problem_index": p_idx,
                    "name": "UNKNOWN",
                    "rating": "UNKNOWN",
                    "tags": "UNKNOWN",
                    "url": f"https://codeforces.com/problemset/problem/{c_id}/{p_idx}",
                    "verified": False
                }
        else:
            return {
                "problem_id": clean_id,
                "contest_id": "UNKNOWN",
                "problem_index": "UNKNOWN",
                "name": "UNKNOWN",
                "rating": "UNKNOWN",
                "tags": "UNKNOWN",
                "url": f"https://codeforces.com/problemset/problem/{clean_id}",
                "verified": False
            }

    def process_curriculum(self, curriculum_data):
        added_count = 0
        skipped_duplicates = 0
        unknown_problems = 0
        kingdom_stats = {}

        for k_item in curriculum_data:
            kingdom = k_item["kingdom"]
            if kingdom not in self.kingdom_order:
                self.kingdom_order.append(kingdom)
            if kingdom not in self.kingdom_patterns:
                self.kingdom_patterns[kingdom] = set()

            if kingdom not in kingdom_stats:
                kingdom_stats[kingdom] = {"added": 0, "duplicates": 0, "unknown": 0}

            for p_item in k_item["patterns"]:
                pattern = p_item["pattern"]
                self.kingdom_patterns[kingdom].add(pattern)
                if (kingdom, pattern) not in self.pattern_order:
                    self.pattern_order.append((kingdom, pattern))

                for pid in p_item["problems"]:
                    pid_clean = pid.strip().upper()
                    if not pid_clean:
                        continue
                    
                    if pid_clean in self.seen_problems:
                        skipped_duplicates += 1
                        kingdom_stats[kingdom]["duplicates"] += 1
                        continue

                    self.seen_problems.add(pid_clean)
                    ver = self.verify_problem(pid_clean)

                    if not ver["verified"]:
                        unknown_problems += 1
                        kingdom_stats[kingdom]["unknown"] += 1

                    kingdom_stats[kingdom]["added"] += 1
                    added_count += 1

                    rating = ver["rating"]
                    diff = get_difficulty(rating)
                    est_time = get_estimated_time(rating)
                    xp = get_xp(rating)

                    row_data = {
                        "Status": "Unsolved",
                        "Category": kingdom,
                        "Subtopic": pattern,
                        "Problem #": ver["problem_id"],
                        "Contest ID": ver["contest_id"],
                        "Problem Index": ver["problem_index"],
                        "Problem Name": ver["name"],
                        "Rating": rating,
                        "Difficulty": diff,
                        "Topics": ver["tags"],
                        "Estimated Time (mins)": est_time,
                        "XP": xp,
                        "Open Link": ver["url"],
                        "Notes": ""
                    }
                    self.problems_data.append(row_data)

        self.generate_excel()
        return added_count, skipped_duplicates, unknown_problems, kingdom_stats

    def generate_excel(self):
        wb = openpyxl.Workbook()
        
        # Sheet 1: Problems
        ws_problems = wb.active
        ws_problems.title = "Problems"
        
        prob_headers = [
            "Status", "Category", "Subtopic", "Problem #", "Contest ID",
            "Problem Index", "Problem Name", "Rating", "Difficulty", "Topics",
            "Estimated Time (mins)", "XP", "Open Link", "Notes"
        ]
        
        ws_problems.append(prob_headers)
        ws_problems.row_dimensions[1].height = 25
        ws_problems.freeze_panes = "A2"
        ws_problems.auto_filter.ref = f"A1:N{max(2, len(self.problems_data) + 1)}"

        for col_num, header in enumerate(prob_headers, 1):
            cell = ws_problems.cell(row=1, column=col_num)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = THIN_BORDER

        for row_idx, prob in enumerate(self.problems_data, 2):
            ws_problems.row_dimensions[row_idx].height = 20
            is_even = (row_idx % 2 == 0)
            row_fill = WHITE_FILL if is_even else ZEBRA_FILL

            ws_problems.cell(row=row_idx, column=1, value=prob["Status"])
            ws_problems.cell(row=row_idx, column=2, value=prob["Category"])
            ws_problems.cell(row=row_idx, column=3, value=prob["Subtopic"])
            ws_problems.cell(row=row_idx, column=4, value=prob["Problem #"])
            ws_problems.cell(row=row_idx, column=5, value=prob["Contest ID"])
            ws_problems.cell(row=row_idx, column=6, value=prob["Problem Index"])
            ws_problems.cell(row=row_idx, column=7, value=prob["Problem Name"])
            ws_problems.cell(row=row_idx, column=8, value=prob["Rating"])
            
            diff_cell = ws_problems.cell(row=row_idx, column=9, value=prob["Difficulty"])
            diff_val = prob["Difficulty"]
            if diff_val in ["Easy", "Easy+"]:
                diff_cell.fill = EASY_FILL
                diff_cell.font = EASY_FONT
            elif diff_val in ["Medium", "Medium+"]:
                diff_cell.fill = MEDIUM_FILL
                diff_cell.font = MEDIUM_FONT
            elif diff_val in ["Hard", "Hard+"]:
                diff_cell.fill = HARD_FILL
                diff_cell.font = HARD_FONT
            elif diff_val in ["Expert", "Master"]:
                diff_cell.fill = EXPERT_FILL
                diff_cell.font = EXPERT_FONT
            else:
                diff_cell.fill = UNKNOWN_FILL
                diff_cell.font = UNKNOWN_FONT

            ws_problems.cell(row=row_idx, column=10, value=prob["Topics"])
            ws_problems.cell(row=row_idx, column=11, value=prob["Estimated Time (mins)"])
            ws_problems.cell(row=row_idx, column=12, value=prob["XP"])
            
            link_cell = ws_problems.cell(row=row_idx, column=13, value=prob["Open Link"])
            link_cell.hyperlink = prob["Open Link"]
            link_cell.font = LINK_FONT

            ws_problems.cell(row=row_idx, column=14, value=prob["Notes"])

            # Apply standard cell styles & borders
            for c_idx in range(1, 15):
                cell = ws_problems.cell(row=row_idx, column=c_idx)
                cell.border = THIN_BORDER
                if c_idx != 9: # Keep difficulty specific fill
                    cell.fill = row_fill
                if c_idx not in [9, 13]:
                    cell.font = REGULAR_FONT
                
                # Alignments
                if c_idx in [1, 4, 5, 6, 8, 9, 11, 12]:
                    cell.alignment = Alignment(horizontal="center", vertical="center")
                else:
                    cell.alignment = Alignment(horizontal="left", vertical="center")

        # Auto-size columns for Sheet 1
        for col in ws_problems.columns:
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                val_str = str(cell.value or '')
                if cell.hyperlink:
                    val_str = "https://codeforces.com/problemset/problem/9999/XX"
                max_len = max(max_len, len(val_str))
            ws_problems.column_dimensions[col_letter].width = min(max(max_len + 4, 12), 45)

        # Sheet 2: Kingdom Summary
        ws_ksum = wb.create_sheet(title="Kingdom Summary")
        ksum_headers = [
            "Kingdom", "Patterns", "Total Problems", "Verified Problems",
            "Solved", "Completion %", "Total XP", "Average Rating"
        ]
        ws_ksum.append(ksum_headers)
        ws_ksum.row_dimensions[1].height = 25
        ws_ksum.freeze_panes = "A2"
        ws_ksum.auto_filter.ref = f"A1:H{max(2, len(self.kingdom_order) + 1)}"

        for col_num, header in enumerate(ksum_headers, 1):
            cell = ws_ksum.cell(row=1, column=col_num)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = THIN_BORDER

        for row_idx, k_name in enumerate(self.kingdom_order, 2):
            ws_ksum.row_dimensions[row_idx].height = 20
            num_patterns = len(self.kingdom_patterns.get(k_name, set()))
            
            ws_ksum.cell(row=row_idx, column=1, value=k_name)
            ws_ksum.cell(row=row_idx, column=2, value=num_patterns)
            ws_ksum.cell(row=row_idx, column=3, value=f'=COUNTIF(Problems!$B:$B, A{row_idx})')
            ws_ksum.cell(row=row_idx, column=4, value=f'=COUNTIFS(Problems!$B:$B, A{row_idx}, Problems!$G:$G, "<>UNKNOWN")')
            ws_ksum.cell(row=row_idx, column=5, value=f'=COUNTIFS(Problems!$B:$B, A{row_idx}, Problems!$A:$A, "Solved")')
            
            comp_cell = ws_ksum.cell(row=row_idx, column=6, value=f'=IF(C{row_idx}>0, E{row_idx}/C{row_idx}, 0)')
            comp_cell.number_format = '0.0%'

            ws_ksum.cell(row=row_idx, column=7, value=f'=SUMIF(Problems!$B:$B, A{row_idx}, Problems!$L:$L)')
            
            avg_cell = ws_ksum.cell(row=row_idx, column=8, value=f'=AVERAGEIF(Problems!$B:$B, A{row_idx}, Problems!$H:$H)')
            avg_cell.number_format = '0'

            for c_idx in range(1, 9):
                cell = ws_ksum.cell(row=row_idx, column=c_idx)
                cell.border = THIN_BORDER
                cell.font = REGULAR_FONT
                cell.fill = WHITE_FILL if row_idx % 2 == 0 else ZEBRA_FILL
                if c_idx > 1:
                    cell.alignment = Alignment(horizontal="center", vertical="center")
                else:
                    cell.alignment = Alignment(horizontal="left", vertical="center")

        for col in ws_ksum.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws_ksum.column_dimensions[col_letter].width = max(max_len + 4, 15)

        # Sheet 3: Pattern Summary
        ws_psum = wb.create_sheet(title="Pattern Summary")
        psum_headers = [
            "Kingdom", "Pattern", "Total Problems", "Verified",
            "Solved", "Completion %", "Average Rating"
        ]
        ws_psum.append(psum_headers)
        ws_psum.row_dimensions[1].height = 25
        ws_psum.freeze_panes = "A2"
        ws_psum.auto_filter.ref = f"A1:G{max(2, len(self.pattern_order) + 1)}"

        for col_num, header in enumerate(psum_headers, 1):
            cell = ws_psum.cell(row=1, column=col_num)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = THIN_BORDER

        for row_idx, (k_name, p_name) in enumerate(self.pattern_order, 2):
            ws_psum.row_dimensions[row_idx].height = 20
            
            ws_psum.cell(row=row_idx, column=1, value=k_name)
            ws_psum.cell(row=row_idx, column=2, value=p_name)
            ws_psum.cell(row=row_idx, column=3, value=f'=COUNTIF(Problems!$C:$C, B{row_idx})')
            ws_psum.cell(row=row_idx, column=4, value=f'=COUNTIFS(Problems!$C:$C, B{row_idx}, Problems!$G:$G, "<>UNKNOWN")')
            ws_psum.cell(row=row_idx, column=5, value=f'=COUNTIFS(Problems!$C:$C, B{row_idx}, Problems!$A:$A, "Solved")')
            
            comp_cell = ws_psum.cell(row=row_idx, column=6, value=f'=IF(C{row_idx}>0, E{row_idx}/C{row_idx}, 0)')
            comp_cell.number_format = '0.0%'

            avg_cell = ws_psum.cell(row=row_idx, column=7, value=f'=AVERAGEIF(Problems!$C:$C, B{row_idx}, Problems!$H:$H)')
            avg_cell.number_format = '0'

            for c_idx in range(1, 8):
                cell = ws_psum.cell(row=row_idx, column=c_idx)
                cell.border = THIN_BORDER
                cell.font = REGULAR_FONT
                cell.fill = WHITE_FILL if row_idx % 2 == 0 else ZEBRA_FILL
                if c_idx > 2:
                    cell.alignment = Alignment(horizontal="center", vertical="center")
                else:
                    cell.alignment = Alignment(horizontal="left", vertical="center")

        for col in ws_psum.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws_psum.column_dimensions[col_letter].width = max(max_len + 4, 18)

        # Sheet 4: Statistics
        ws_stat = wb.create_sheet(title="Statistics")
        ws_stat.row_dimensions[1].height = 30
        
        title_cell = ws_stat.cell(row=1, column=1, value="Codeforces Master Dataset - Platform Overview & Analytics")
        title_cell.font = Font(name="Calibri", size=14, bold=True, color="1F4E79")

        stats_headers = ["Metric", "Formula / Value", "Description"]
        ws_stat.cell(row=3, column=1, value=stats_headers[0])
        ws_stat.cell(row=3, column=2, value=stats_headers[1])
        ws_stat.cell(row=3, column=3, value=stats_headers[2])
        ws_stat.row_dimensions[3].height = 25

        for col_num in range(1, 4):
            cell = ws_stat.cell(row=3, column=col_num)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = Alignment(horizontal="center", vertical="center")
            cell.border = THIN_BORDER

        stats_items = [
            ("Total Problems", "=COUNTA(Problems!D2:D10000)", "Total unique Codeforces problems in curriculum"),
            ("Verified Problems", '=COUNTIF(Problems!G2:G10000, "<>UNKNOWN")', "Problems verified with official Codeforces API"),
            ("Solved Problems", '=COUNTIF(Problems!A2:A10000, "Solved")', "Number of problems marked as Solved"),
            ("Remaining Problems", '=B4-B6', "Unsolved problems remaining in learning roadmap"),
            ("Total XP Available", "=SUM(Problems!L2:L10000)", "Total XP points across all verified problems"),
            ("Average Problem Rating", "=AVERAGE(Problems!H2:H10000)", "Mean Codeforces rating across verified problems"),
            ("Highest Rating", "=MAX(Problems!H2:H10000)", "Maximum difficulty rating in dataset"),
            ("Lowest Rating", "=MIN(Problems!H2:H10000)", "Minimum difficulty rating in dataset"),
            ("Average Estimated Time (mins)", "=AVERAGE(Problems!K2:K10000)", "Average expected solving duration per problem"),
            ("Kingdom Completion Rate", "=AVERAGE('Kingdom Summary'!F2:F100)", "Average completion % across all kingdoms"),
            ("Pattern Completion Rate", "=AVERAGE('Pattern Summary'!F2:F500)", "Average completion % across all patterns")
        ]

        for s_idx, (metric, formula, desc) in enumerate(stats_items, 4):
            ws_stat.row_dimensions[s_idx].height = 22
            
            m_cell = ws_stat.cell(row=s_idx, column=1, value=metric)
            m_cell.font = BOLD_FONT

            v_cell = ws_stat.cell(row=s_idx, column=2, value=formula)
            v_cell.font = BOLD_FONT
            v_cell.alignment = Alignment(horizontal="center", vertical="center")
            
            if "Completion" in metric:
                v_cell.number_format = '0.0%'
            elif "Rating" in metric or "Time" in metric:
                v_cell.number_format = '0.0'

            d_cell = ws_stat.cell(row=s_idx, column=3, value=desc)
            d_cell.font = REGULAR_FONT

            for c_num in range(1, 4):
                cell = ws_stat.cell(row=s_idx, column=c_num)
                cell.border = THIN_BORDER
                cell.fill = WHITE_FILL if s_idx % 2 == 0 else ZEBRA_FILL

        for col in ws_stat.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws_stat.column_dimensions[col_letter].width = max(max_len + 5, 25)

        # Sheet 5: Metadata
        ws_meta = wb.create_sheet(title="Metadata")
        ws_meta.cell(row=1, column=1, value="System Metadata & Mapping Standards").font = Font(name="Calibri", size=14, bold=True, color="1F4E79")
        ws_meta.row_dimensions[1].height = 30

        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ws_meta.cell(row=3, column=1, value="Generation Date:").font = BOLD_FONT
        ws_meta.cell(row=3, column=2, value=now_str).font = REGULAR_FONT

        ws_meta.cell(row=4, column=1, value="Last Updated:").font = BOLD_FONT
        ws_meta.cell(row=4, column=2, value=now_str).font = REGULAR_FONT

        # Difficulty & XP Table
        ws_meta.cell(row=6, column=1, value="Rating Range").font = HEADER_FONT
        ws_meta.cell(row=6, column=1).fill = HEADER_FILL
        ws_meta.cell(row=6, column=2, value="Difficulty Tier").font = HEADER_FONT
        ws_meta.cell(row=6, column=2).fill = HEADER_FILL
        ws_meta.cell(row=6, column=3, value="Estimated Time (mins)").font = HEADER_FONT
        ws_meta.cell(row=6, column=3).fill = HEADER_FILL
        ws_meta.cell(row=6, column=4, value="XP Points").font = HEADER_FONT
        ws_meta.cell(row=6, column=4).fill = HEADER_FILL

        mapping_rules = [
            ("800-999", "Easy", 15, 10),
            ("1000-1299", "Easy+", 25, 20),
            ("1300-1499", "Medium", 40, 35),
            ("1500-1699", "Medium+", 40, 35),
            ("1700-1899", "Hard", 60, 55),
            ("1900-2099", "Hard+", 90, 80),
            ("2100-2399", "Expert", 120, 110),
            ("2400-2500", "Master", 120, 110),
            ("2600-3000", "Master", 180, 150),
            ("3100+", "Master", 240, 220),
        ]

        for m_idx, (r_rng, d_tier, e_t, xp_v) in enumerate(mapping_rules, 7):
            ws_meta.cell(row=m_idx, column=1, value=r_rng).alignment = Alignment(horizontal="center")
            ws_meta.cell(row=m_idx, column=2, value=d_tier).alignment = Alignment(horizontal="center")
            ws_meta.cell(row=m_idx, column=3, value=e_t).alignment = Alignment(horizontal="center")
            ws_meta.cell(row=m_idx, column=4, value=xp_v).alignment = Alignment(horizontal="center")
            for c_i in range(1, 5):
                cell = ws_meta.cell(row=m_idx, column=c_i)
                cell.border = THIN_BORDER
                cell.font = REGULAR_FONT
                cell.fill = WHITE_FILL if m_idx % 2 == 0 else ZEBRA_FILL

        # Kingdom List Table
        k_start_row = 19
        ws_meta.cell(row=k_start_row, column=1, value="Kingdom #").font = HEADER_FONT
        ws_meta.cell(row=k_start_row, column=1).fill = HEADER_FILL
        ws_meta.cell(row=k_start_row, column=2, value="Kingdom Name").font = HEADER_FONT
        ws_meta.cell(row=k_start_row, column=2).fill = HEADER_FILL
        ws_meta.cell(row=k_start_row, column=3, value="Total Patterns").font = HEADER_FONT
        ws_meta.cell(row=k_start_row, column=3).fill = HEADER_FILL

        for k_idx, k_name in enumerate(self.kingdom_order, 1):
            r_num = k_start_row + k_idx
            ws_meta.cell(row=r_num, column=1, value=k_idx).alignment = Alignment(horizontal="center")
            ws_meta.cell(row=r_num, column=2, value=k_name).alignment = Alignment(horizontal="left")
            p_cnt = len(self.kingdom_patterns.get(k_name, set()))
            ws_meta.cell(row=r_num, column=3, value=p_cnt).alignment = Alignment(horizontal="center")
            for c_i in range(1, 4):
                cell = ws_meta.cell(row=r_num, column=c_i)
                cell.border = THIN_BORDER
                cell.font = REGULAR_FONT
                cell.fill = WHITE_FILL if r_num % 2 == 0 else ZEBRA_FILL

        # Pattern List Table
        p_start_row = k_start_row + max(len(self.kingdom_order), 1) + 3
        ws_meta.cell(row=p_start_row, column=1, value="Kingdom").font = HEADER_FONT
        ws_meta.cell(row=p_start_row, column=1).fill = HEADER_FILL
        ws_meta.cell(row=p_start_row, column=2, value="Pattern Name").font = HEADER_FONT
        ws_meta.cell(row=p_start_row, column=2).fill = HEADER_FILL

        for p_idx, (k_n, p_n) in enumerate(self.pattern_order, 1):
            r_num = p_start_row + p_idx
            ws_meta.cell(row=r_num, column=1, value=k_n).alignment = Alignment(horizontal="left")
            ws_meta.cell(row=r_num, column=2, value=p_n).alignment = Alignment(horizontal="left")
            for c_i in range(1, 3):
                cell = ws_meta.cell(row=r_num, column=c_i)
                cell.border = THIN_BORDER
                cell.font = REGULAR_FONT
                cell.fill = WHITE_FILL if r_num % 2 == 0 else ZEBRA_FILL

        for col in ws_meta.columns:
            max_len = max(len(str(cell.value or '')) for cell in col)
            col_letter = get_column_letter(col[0].column)
            ws_meta.column_dimensions[col_letter].width = max(max_len + 4, 20)

        wb.save(self.filepath)
        print(f"Successfully saved master Excel workbook to {self.filepath}")

if __name__ == "__main__":
    builder = CodeforcesMasterDataset()
    sample_curriculum = [
        {
            "kingdom": "Arrays",
            "patterns": [
                {
                    "pattern": "Frequency Counting",
                    "problems": ["228A", "368B", "459B", "978A"]
                }
            ]
        }
    ]
    added, dups, unk, k_stats = builder.process_curriculum(sample_curriculum)
    print(f"Sample test run complete: Added={added}, Duplicates={dups}, Unknown={unk}")
