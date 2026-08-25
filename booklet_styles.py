import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Image
)
from reportlab.pdfgen import canvas

# ==============================================================================
# COLOR PALETTE (Professional Academic Palette)
# ==============================================================================
PRIMARY = colors.HexColor('#1A365D')       # Deep Navy
SECONDARY = colors.HexColor('#2B6CB0')     # Slate Blue
ACCENT_RED = colors.HexColor('#C53030')    # Crimson Red (Very High Priority)
ACCENT_ORANGE = colors.HexColor('#DD6B20') # Amber Orange (High Priority)
ACCENT_YELLOW = colors.HexColor('#D69E2E') # Warm Gold (Important)
ACCENT_GREEN = colors.HexColor('#22543D')  # Emerald Green (Success / Optimal)
DARK_TEXT = colors.HexColor('#2D3748')     # Charcoal Text
MUTED_TEXT = colors.HexColor('#718096')    # Muted Gray Text
LIGHT_BG = colors.HexColor('#F7FAFC')      # Light Gray Card Background
BORDER_COLOR = colors.HexColor('#E2E8F0')  # Subtle Gray Border
CODE_BG = colors.HexColor('#1E293B')       # Dark Code Background
CODE_TEXT = colors.HexColor('#E2E8F0')     # Light Code Text
CODE_KW = colors.HexColor('#38BDF8')       # Code Keyword
TABLE_HEADER_BG = colors.HexColor('#1A365D')
TABLE_ROW_ALT = colors.HexColor('#F8FAFC')
CALLOUT_BG_BLUE = colors.HexColor('#EBF8FF')
CALLOUT_BG_RED = colors.HexColor('#FFF5F5')
CALLOUT_BG_GREEN = colors.HexColor('#F0FFF4')
CALLOUT_BG_AMBER = colors.HexColor('#FEFCBF')

# ==============================================================================
# NUMBERED CANVAS FOR DYNAMIC PAGE NUMBERING & RUNNING HEADERS
# ==============================================================================
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            # Skip headers and footers on the cover page
            return

        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(SECONDARY)

        # Running Top Header
        self.drawString(36, 808, "DAA EXAM-READY STUDY BOOKLET")
        self.setFont("Helvetica", 8)
        self.setFillColor(MUTED_TEXT)
        self.drawRightString(595.27 - 36, 808, "UNITS I, II & III • UNIVERSITY EXAM PREPARATION")

        # Top Header Rule
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(36, 802, 595.27 - 36, 802)

        # Bottom Footer Rule
        self.line(36, 42, 595.27 - 36, 42)

        # Running Footer
        self.setFont("Helvetica", 8)
        self.setFillColor(MUTED_TEXT)
        self.drawString(36, 30, "Design & Analysis of Algorithms • Exam Preparation Material")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(595.27 - 36, 30, page_str)
        self.restoreState()


# ==============================================================================
# STYLESHEET SETUP
# ==============================================================================
styles = getSampleStyleSheet()

# Modify base body
styles['Normal'].textColor = DARK_TEXT
styles['Normal'].fontSize = 9.5
styles['Normal'].leading = 13.5

# Cover Styles
cover_title = ParagraphStyle(
    'CoverTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=26,
    leading=32,
    textColor=PRIMARY,
    alignment=1, # Center
    spaceAfter=8
)

cover_subtitle = ParagraphStyle(
    'CoverSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=14,
    leading=18,
    textColor=SECONDARY,
    alignment=1,
    spaceAfter=15
)

cover_desc = ParagraphStyle(
    'CoverDesc',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=10,
    leading=14,
    textColor=DARK_TEXT,
    alignment=1,
    spaceAfter=25
)

cover_meta = ParagraphStyle(
    'CoverMeta',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=MUTED_TEXT,
    alignment=1
)

# Section / Unit Titles
unit_title = ParagraphStyle(
    'UnitTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=18,
    leading=22,
    textColor=PRIMARY,
    spaceBefore=14,
    spaceAfter=8,
    keepWithNext=True
)

unit_subtitle = ParagraphStyle(
    'UnitSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=SECONDARY,
    spaceAfter=10,
    keepWithNext=True
)

# Question Title & Badges
q_title_red = ParagraphStyle(
    'QuestionTitleRed',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=ACCENT_RED,
    spaceBefore=12,
    spaceAfter=6,
    keepWithNext=True
)

q_title_orange = ParagraphStyle(
    'QuestionTitleOrange',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=ACCENT_ORANGE,
    spaceBefore=12,
    spaceAfter=6,
    keepWithNext=True
)

q_title_yellow = ParagraphStyle(
    'QuestionTitleYellow',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=ACCENT_YELLOW,
    spaceBefore=12,
    spaceAfter=6,
    keepWithNext=True
)

# Content Heading Styles
h3_style = ParagraphStyle(
    'H3Style',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10,
    leading=14,
    textColor=PRIMARY,
    spaceBefore=7,
    spaceAfter=3,
    keepWithNext=True
)

h4_style = ParagraphStyle(
    'H4Style',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12,
    textColor=SECONDARY,
    spaceBefore=5,
    spaceAfter=2,
    keepWithNext=True
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=DARK_TEXT,
    spaceAfter=5
)

body_bold = ParagraphStyle(
    'BodyBold',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=13,
    textColor=DARK_TEXT,
    spaceAfter=4
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    textColor=DARK_TEXT,
    leftIndent=12,
    firstLineIndent=-8,
    spaceAfter=2.5
)

code_style = ParagraphStyle(
    'CodeStyle',
    parent=styles['Normal'],
    fontName='Courier',
    fontSize=7.8,
    leading=10.5,
    textColor=CODE_TEXT,
    spaceBefore=2,
    spaceAfter=2
)

table_header_style = ParagraphStyle(
    'TableHeader',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11,
    textColor=colors.white,
    alignment=1
)

table_cell_style = ParagraphStyle(
    'TableCell',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8,
    leading=10.5,
    textColor=DARK_TEXT
)

table_cell_bold = ParagraphStyle(
    'TableCellBold',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8,
    leading=10.5,
    textColor=PRIMARY
)

table_cell_center = ParagraphStyle(
    'TableCellCenter',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8,
    leading=10.5,
    textColor=DARK_TEXT,
    alignment=1
)

table_cell_mono = ParagraphStyle(
    'TableCellMono',
    parent=styles['Normal'],
    fontName='Courier-Bold',
    fontSize=7.8,
    leading=10,
    textColor=PRIMARY
)

exam_tip_style = ParagraphStyle(
    'ExamTip',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    textColor=colors.HexColor('#744210'),
    spaceBefore=2,
    spaceAfter=2
)

conclusion_style = ParagraphStyle(
    'ConclusionStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.5,
    leading=11.5,
    textColor=ACCENT_GREEN,
    spaceBefore=2,
    spaceAfter=2
)

# ==============================================================================
# HELPER GENERATORS FOR BOXES, ALGORITHMS & TABLES
# ==============================================================================
def create_code_block(code_text, title="Algorithm / Pseudocode"):
    """Wraps pseudocode in a dark-themed code block box."""
    p_title = Paragraph(f"<b><font color='#38BDF8'>■ {title}</font></b>", code_style)
    # Replace tabs with spaces and encode lines
    formatted_lines = code_text.strip().replace(" ", "&nbsp;").replace("\t", "&nbsp;&nbsp;&nbsp;&nbsp;").split("\n")
    p_code = Paragraph("<br/>".join(formatted_lines), code_style)
    
    t = Table([[p_title], [p_code]], colWidths=[523.27])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CODE_BG),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 5),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 2),
        ('TOPPADDING', (0, 1), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 5),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#0F172A')),
    ]))
    return t

def create_callout_box(text, title="Exam Tip / Important", bg_color=CALLOUT_BG_AMBER, border_color=ACCENT_YELLOW, text_style=exam_tip_style):
    """Creates a highlighted callout box with a colored left accent border."""
    content = [
        Paragraph(f"<b><font color='{border_color.hexval()}'>✦ {title}</font></b>", h4_style),
        Spacer(1, 2),
        Paragraph(text, text_style)
    ]
    t = Table([[content]], colWidths=[523.27])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), bg_color),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('BOX', (0, 0), (-1, -1), 0.75, border_color),
        ('LINELEFT', (0, 0), (-1, -1), 3.5, border_color),
    ]))
    return t

def create_priority_header(q_num, q_title_text, priority="VERY HIGH"):
    """Creates a styled question banner with priority badge."""
    if priority == "VERY HIGH":
        badge_text = "<font color='#C53030'><b>[ 🔴 VERY HIGH PRIORITY / MUST PREPARE ]</b></font>"
        title_color = "#1A365D"
    elif priority == "HIGH":
        badge_text = "<font color='#DD6B20'><b>[ 🟠 HIGH PRIORITY ]</b></font>"
        title_color = "#1A365D"
    else:
        badge_text = "<font color='#D69E2E'><b>[ 🟡 IMPORTANT ]</b></font>"
        title_color = "#1A365D"

    p = Paragraph(f"{badge_text}<br/><b><font color='{title_color}' size='11.5'>{q_num}. {q_title_text}</font></b>", q_title_red)
    
    t = Table([[p]], colWidths=[523.27])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor('#CBD5E0')),
        ('LINELEFT', (0, 0), (-1, -1), 3, ACCENT_RED if priority=="VERY HIGH" else (ACCENT_ORANGE if priority=="HIGH" else ACCENT_YELLOW)),
    ]))
    return t

def create_unit_banner(unit_num_str, unit_name_str, priority_topics_list):
    """Creates an attractive unit divider banner."""
    header_p = Paragraph(f"<b><font size='16' color='#FFFFFF'>{unit_num_str}: {unit_name_str.upper()}</font></b>", ParagraphStyle('UB', alignment=1))
    
    bullets = "<br/>".join([f"• <b>{item}</b>" for item in priority_topics_list])
    topics_p = Paragraph(f"<b><font color='#FEFCBF'>LAST-MINUTE PRIORITY TOPICS:</font></b><br/>{bullets}", ParagraphStyle('UT', textColor=colors.white, fontSize=9, leading=13))
    
    t = Table([[header_p], [topics_p]], colWidths=[523.27])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('BACKGROUND', (0, 1), (-1, 1), SECONDARY),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('BOX', (0, 0), (-1, -1), 1.5, PRIMARY),
    ]))
    return t

print("booklet_styles.py initialized successfully!")
