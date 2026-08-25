import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Image
)
from booklet_styles import (
    NumberedCanvas, styles, cover_title, cover_subtitle, cover_desc, cover_meta,
    unit_title, unit_subtitle, h3_style, h4_style, body_style, body_bold, bullet_style,
    table_header_style, table_cell_style, table_cell_bold, table_cell_center,
    create_callout_box,
    PRIMARY, SECONDARY, ACCENT_RED, ACCENT_ORANGE, ACCENT_YELLOW, ACCENT_GREEN, DARK_TEXT, MUTED_TEXT, LIGHT_BG, TABLE_ROW_ALT,
    CALLOUT_BG_AMBER, CALLOUT_BG_GREEN, CALLOUT_BG_BLUE, CALLOUT_BG_RED
)
from booklet_content_u1 import get_unit1_content
from booklet_content_u2 import get_unit2_content
from booklet_content_u3 import get_unit3_content
from booklet_content_revision import get_revision_content

def build_pdf():
    pdf_filename = "DAA_Exam_Ready_Study_Booklet_Units_1-3.pdf"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46
    )
    
    story = []
    
    # =============================================================
    # COVER PAGE
    # =============================================================
    story.append(Spacer(1, 30))
    
    badge_p = Paragraph("<font color='#C53030'><b>★ UNIVERSITY EXAM PREPARATION MATERIAL ★</b></font>", ParagraphStyle('CoverBadge', alignment=1, fontSize=10, fontName='Helvetica-Bold'))
    t_badge = Table([[badge_p]], colWidths=[380])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FFF5F5')),
        ('BOX', (0, 0), (-1, -1), 1, ACCENT_RED),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_badge)
    story.append(Spacer(1, 20))
    
    story.append(Paragraph("DESIGN AND ANALYSIS OF ALGORITHMS", cover_title))
    story.append(Paragraph("EXAM-READY STUDY BOOKLET", ParagraphStyle('CRSub', parent=cover_title, fontSize=20, leading=25, textColor=SECONDARY)))
    story.append(Paragraph("UNITS I &ndash; III COMPREHENSIVE QUESTION SET", cover_subtitle))
    
    story.append(HRFlowable(width="80%", thickness=2, color=PRIMARY, spaceBefore=5, spaceAfter=15))
    
    story.append(Paragraph("<b>Authoritative Source Alignment:</b><br/><i>Fundamentals of Computer Algorithms</i> &mdash; Ellis Horowitz, Sartaj Sahni, Sanguthevar Rajasekaran (Galgotia Publications)<br/>Preserving exact terminology, recurrences, step counts, algorithms, and solved numericals from classroom PPT lectures.", cover_desc))
    story.append(Spacer(1, 15))
    
    feat_data = [
        [Paragraph("<b>🔴 46 Complete Exam Questions</b>", table_cell_bold), Paragraph("<b>✦ Solved Numerical Workings</b>", table_cell_bold)],
        [Paragraph("Full answers for every syllabus topic", table_cell_style), Paragraph("Prim, Kruskal, Dijkstra, Knapsack, Job Sequencing", table_cell_style)],
        [Paragraph("<b>✦ Step-by-Step Pseudocode</b>", table_cell_bold), Paragraph("<b>✦ Asymptotic Recurrences</b>", table_cell_bold)],
        [Paragraph("Exact C/Pascal conventions with step counts", table_cell_style), Paragraph("Complete proofs and Master Theorem checks", table_cell_style)],
        [Paragraph("<b>✦ Educational Vector Diagrams</b>", table_cell_bold), Paragraph("<b>✦ Last-Minute Revision Sheets</b>", table_cell_bold)],
        [Paragraph("Clean recursion trees, stacks and graphs", table_cell_style), Paragraph("Complexity cheat sheet & checklist for exam morning", table_cell_style)]
    ]
    t_feat = Table(feat_data, colWidths=[250, 250])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#CBD5E0')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(t_feat)
    story.append(Spacer(1, 25))
    
    story.append(Paragraph("<b>Targeted for University & College DAA Examinations • 5-Mark & 10-Mark Questions</b><br/>Generated for Student Academic Excellence • 100% Technical Accuracy", cover_meta))
    
    story.append(PageBreak())

    # =============================================================
    # TABLE OF CONTENTS
    # =============================================================
    story.append(Paragraph("TABLE OF CONTENTS", unit_title))
    story.append(Paragraph("Comprehensive Structure & Question Mapping", unit_subtitle))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceBefore=2, spaceAfter=10))

    toc_data = [
        [Paragraph("<b>Unit / Section</b>", table_header_style), Paragraph("<b>Topic Description</b>", table_header_style), Paragraph("<b>Questions Covered</b>", table_header_style)],
        [
            Paragraph("<b>UNIT-I:<br/>Algorithm Basics & Analysis</b>", table_cell_bold),
            Paragraph("Characteristics, Pseudocode conventions, Time & Space complexity S(P)=C+Sp(I), Program step counting (Method I & II Tabular), Best/Worst/Avg Case in Sequential Search, Rate of Growth, Asymptotic Notations (O, &Omega;, &Theta;, o), Recursive Factorial & Stack execution, Matrix Addition, Recursive Sum recurrence, Hiring Problem probabilistic analysis, Connected & Biconnected Components, Articulation Points.", table_cell_style),
            Paragraph("<b>Q1 &ndash; Q15</b><br/>(15 Questions)", table_cell_bold)
        ],
        [
            Paragraph("<b>UNIT-II:<br/>Divide and Conquer</b>", table_cell_bold),
            Paragraph("General Paradigm, Control Abstraction DAndC(p), Recurrence Relations, Binary Search (Iterative, Recursive, Recurrence & Successful/Unsuccessful analysis), Merge Sort (Algorithm, Divide/Conquer/Combine phases, Call Tree, O(n log n) Derivation), Quick Sort (Partitioning, Trace, Best O(n log n) vs Worst O(n<sup>2</sup>)), Strassen's Matrix Multiplication (7 Products, Formulas, O(n<sup>2.81</sup>) Derivation), General Recurrence & Master Theorem, Detailed Comparison Table.", table_cell_style),
            Paragraph("<b>Q16 &ndash; Q30</b><br/>(15 Questions)", table_cell_bold)
        ],
        [
            Paragraph("<b>UNIT-III:<br/>Greedy Method</b>", table_cell_bold),
            Paragraph("Greedy Control Abstraction Greedy(a,n), Greedy-choice property, Feasible vs Optimal solutions, Fractional Knapsack (Formulation, Algorithm, Solved Ratio Numerical), Fractional vs 0/1 Knapsack & Counterexample, Spanning Trees & Properties, Minimum Cost Spanning Tree (MST), Prim's Algorithm (near[] array, Algorithm, O(n<sup>2</sup>) complexity), Kruskal's Algorithm (Forest merging, Disjoint Sets Make-Set/Find/Union, O(E log E)), Single-Source Shortest Path (SSSP), Dijkstra's Algorithm (Relaxation, Iteration Table, O(n<sup>2</sup>)), Job Sequencing with Deadlines (Slot assignment, Algorithms, Solved 4, 5, 7 Job Numericals), Prim vs Kruskal Comparison, Complete Solved Numericals for Prim, Kruskal, Dijkstra, Job Sequencing.", table_cell_style),
            Paragraph("<b>Q31 &ndash; Q46</b><br/>(16 Questions)", table_cell_bold)
        ],
        [
            Paragraph("<b>FINAL REVISION:<br/>Cheat Sheets & Checklist</b>", table_cell_bold),
            Paragraph("DAA Last-Minute Revision Sheet, Master Complexity Cheat Sheet (All 15 algorithms), Important Formula Sheet (Asymptotics, Recurrences, Step counts, Knapsack), Important Comparison Tables, Algorithm Selection Guide, and Final Exam Readiness Checklist.", table_cell_style),
            Paragraph("<b>Summary &amp; Checklist</b>", table_cell_bold)
        ]
    ]
    t_toc = Table(toc_data, colWidths=[120, 300, 103.27])
    t_toc.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 15))

    story.append(create_callout_box(
        "<b>How to use this booklet:</b><br/>• <b>For 5-Mark Questions:</b> Write the Definition, Key Idea, Algorithm block, and Final Complexity.<br/>• <b>For 10-Mark Questions:</b> Write the Definition, Complete Pseudocode, Step-by-Step Derivation/Table, Solved Numerical, and Exam Conclusion.<br/>• <b>On Exam Morning:</b> Review the <i>Final Revision Sheet</i> and <i>Complexity Cheat Sheet</i> at the end of the booklet.",
        "Examination Strategy & Writing Guide",
        bg_color=CALLOUT_BG_AMBER,
        border_color=ACCENT_YELLOW
    ))
    story.append(PageBreak())

    # =============================================================
    # UNIT CONTENT APPENDING
    # =============================================================
    print("Appending Unit-I content...")
    story.extend(get_unit1_content())
    story.append(PageBreak())

    print("Appending Unit-II content...")
    story.extend(get_unit2_content())
    story.append(PageBreak())

    print("Appending Unit-III content...")
    story.extend(get_unit3_content())
    story.append(PageBreak())

    print("Appending Final Revision content...")
    story.extend(get_revision_content())

    # Build Document
    print(f"Compiling {pdf_filename} with NumberedCanvas...")
    doc.build(story, canvasmaker=NumberedCanvas)
    print("Build complete!")

if __name__ == "__main__":
    build_pdf()
