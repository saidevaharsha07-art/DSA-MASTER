import csv
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import requests
import datetime
import re

WORKBOOK_PATH = "Codeforces_Master_Dataset.xlsx"
CSV_PATH = "Codeforces_Master_Dataset.csv"

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

def sync_all():
    # Load API data to extract official rating for Sheet 1
    resp = requests.get("https://codeforces.com/api/problemset.problems", timeout=15)
    cf_ratings = {}
    if resp.status_code == 200 and resp.json().get("status") == "OK":
        for p in resp.json()["result"]["problems"]:
            if p.get("contestId") and p.get("index"):
                key = f"{p['contestId']}{p['index']}".upper()
                cf_ratings[key] = p.get("rating", "UNKNOWN")

    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        csv_data = list(reader)

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
    ws_problems.auto_filter.ref = f"A1:N{len(csv_data) + 1}"

    for col_num, header in enumerate(prob_headers, 1):
        cell = ws_problems.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    kingdoms_set = []
    patterns_set = []

    for row_idx, row in enumerate(csv_data, 2):
        ws_problems.row_dimensions[row_idx].height = 20
        is_even = (row_idx % 2 == 0)
        row_fill = WHITE_FILL if is_even else ZEBRA_FILL

        pid = row["Problem #"]
        match = re.match(r"^(\d+)([A-Z0-9]+)$", pid)
        if match:
            c_id, p_idx = int(match.group(1)), match.group(2)
        else:
            c_id, p_idx = "UNKNOWN", "UNKNOWN"

        rating = cf_ratings.get(pid, "UNKNOWN")
        diff = get_difficulty(rating)

        category = row["Category"]
        subtopic = row["Subtopic"]

        if category not in kingdoms_set:
            kingdoms_set.append(category)
        if (category, subtopic) not in patterns_set:
            patterns_set.append((category, subtopic))

        ws_problems.cell(row=row_idx, column=1, value=row["Status"])
        ws_problems.cell(row=row_idx, column=2, value=category)
        ws_problems.cell(row=row_idx, column=3, value=subtopic)
        ws_problems.cell(row=row_idx, column=4, value=pid)
        ws_problems.cell(row=row_idx, column=5, value=c_id)
        ws_problems.cell(row=row_idx, column=6, value=p_idx)
        ws_problems.cell(row=row_idx, column=7, value=row["Problem Name"])
        ws_problems.cell(row=row_idx, column=8, value=rating)

        diff_cell = ws_problems.cell(row=row_idx, column=9, value=diff)
        if diff in ["Easy", "Easy+"]:
            diff_cell.fill = EASY_FILL
            diff_cell.font = EASY_FONT
        elif diff in ["Medium", "Medium+"]:
            diff_cell.fill = MEDIUM_FILL
            diff_cell.font = MEDIUM_FONT
        elif diff in ["Hard", "Hard+"]:
            diff_cell.fill = HARD_FILL
            diff_cell.font = HARD_FONT
        elif diff in ["Expert", "Master"]:
            diff_cell.fill = EXPERT_FILL
            diff_cell.font = EXPERT_FONT
        else:
            diff_cell.fill = UNKNOWN_FILL
            diff_cell.font = UNKNOWN_FONT

        ws_problems.cell(row=row_idx, column=10, value=row["Topics"])
        ws_problems.cell(row=row_idx, column=11, value=int(row["Est Time"]) if row["Est Time"].isdigit() else 0)
        ws_problems.cell(row=row_idx, column=12, value=int(row["XP"]) if row["XP"].isdigit() else 0)

        link_cell = ws_problems.cell(row=row_idx, column=13, value=row["Open Link"])
        link_cell.hyperlink = row["Open Link"]
        link_cell.font = LINK_FONT

        ws_problems.cell(row=row_idx, column=14, value="")

        for c_idx in range(1, 15):
            cell = ws_problems.cell(row=row_idx, column=c_idx)
            cell.border = THIN_BORDER
            if c_idx != 9:
                cell.fill = row_fill
            if c_idx not in [9, 13]:
                cell.font = REGULAR_FONT
            if c_idx in [1, 4, 5, 6, 8, 9, 11, 12]:
                cell.alignment = Alignment(horizontal="center", vertical="center")
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")

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
    ws_ksum.auto_filter.ref = f"A1:H{len(kingdoms_set) + 1}"

    for col_num, header in enumerate(ksum_headers, 1):
        cell = ws_ksum.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    for row_idx, k_name in enumerate(kingdoms_set, 2):
        ws_ksum.row_dimensions[row_idx].height = 20
        num_patterns = len([p for (k, p) in patterns_set if k == k_name])

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
        ws_ksum.column_dimensions[col_letter].width = max(max_len + 4, 18)

    # Sheet 3: Pattern Summary
    ws_psum = wb.create_sheet(title="Pattern Summary")
    psum_headers = [
        "Kingdom", "Pattern", "Total Problems", "Verified",
        "Solved", "Completion %", "Average Rating"
    ]
    ws_psum.append(psum_headers)
    ws_psum.row_dimensions[1].height = 25
    ws_psum.freeze_panes = "A2"
    ws_psum.auto_filter.ref = f"A1:G{len(patterns_set) + 1}"

    for col_num, header in enumerate(psum_headers, 1):
        cell = ws_psum.cell(row=1, column=col_num)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center")
        cell.border = THIN_BORDER

    for row_idx, (k_name, p_name) in enumerate(patterns_set, 2):
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

    title_cell = ws_stat.cell(row=1, column=1, value="Codeforces Master Dataset - Platform Analytics")
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

    ws_meta.cell(row=6, column=1, value="Rating Range").font = HEADER_FONT
    ws_meta.cell(row=6, column=1).fill = HEADER_FILL
    ws_meta.cell(row=6, column=2, value="Difficulty Tier").font = HEADER_FONT
    ws_meta.cell(row=6, column=2).fill = HEADER_FILL
    ws_meta.cell(row=6, column=3, value="Estimated Time (mins)").font = HEADER_FONT
    ws_meta.cell(row=6, column=3).fill = HEADER_FILL
    ws_meta.cell(row=6, column=4, value="XP Points").font = HEADER_FONT
    ws_meta.cell(row=6, column=4).fill = HEADER_FILL

    mapping_rules = [
        ("800-1000", "Easy", 15, 10),
        ("1100-1300", "Easy+", 25, 20),
        ("1400-1600", "Medium", 40, 35),
        ("1700-1900", "Hard", 60, 55),
        ("2000-2200", "Hard+", 90, 80),
        ("2300-2500", "Expert", 120, 110),
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
    k_start_row = 17
    ws_meta.cell(row=k_start_row, column=1, value="Kingdom #").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=1).fill = HEADER_FILL
    ws_meta.cell(row=k_start_row, column=2, value="Kingdom Name").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=2).fill = HEADER_FILL
    ws_meta.cell(row=k_start_row, column=3, value="Total Patterns").font = HEADER_FONT
    ws_meta.cell(row=k_start_row, column=3).fill = HEADER_FILL

    for k_idx, k_name in enumerate(kingdoms_set, 1):
        r_num = k_start_row + k_idx
        ws_meta.cell(row=r_num, column=1, value=k_idx).alignment = Alignment(horizontal="center")
        ws_meta.cell(row=r_num, column=2, value=k_name).alignment = Alignment(horizontal="left")
        p_cnt = len([p for (k, p) in patterns_set if k == k_name])
        ws_meta.cell(row=r_num, column=3, value=p_cnt).alignment = Alignment(horizontal="center")
        for c_i in range(1, 4):
            cell = ws_meta.cell(row=r_num, column=c_i)
            cell.border = THIN_BORDER
            cell.font = REGULAR_FONT
            cell.fill = WHITE_FILL if r_num % 2 == 0 else ZEBRA_FILL

    # Pattern List Table
    p_start_row = k_start_row + len(kingdoms_set) + 3
    ws_meta.cell(row=p_start_row, column=1, value="Kingdom").font = HEADER_FONT
    ws_meta.cell(row=p_start_row, column=1).fill = HEADER_FILL
    ws_meta.cell(row=p_start_row, column=2, value="Pattern Name").font = HEADER_FONT
    ws_meta.cell(row=p_start_row, column=2).fill = HEADER_FILL

    for p_idx, (k_n, p_n) in enumerate(patterns_set, 1):
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

    wb.save(WORKBOOK_PATH)
    print(f"Successfully synced full dataset to {WORKBOOK_PATH}")

if __name__ == "__main__":
    sync_all()
