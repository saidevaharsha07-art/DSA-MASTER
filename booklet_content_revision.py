import os
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, PageBreak
from booklet_styles import (
    h3_style, h4_style, body_style, body_bold, bullet_style,
    table_header_style, table_cell_style, table_cell_bold, table_cell_center, table_cell_mono,
    create_callout_box, create_unit_banner,
    PRIMARY, SECONDARY, ACCENT_RED, ACCENT_GREEN, ACCENT_YELLOW, TABLE_ROW_ALT, CALLOUT_BG_AMBER, CALLOUT_BG_GREEN
)

def get_revision_content():
    story = []
    
    # -------------------------------------------------------------
    # LAST-MINUTE REVISION BANNER
    # -------------------------------------------------------------
    story.append(create_unit_banner(
        "FINAL REVISION",
        "DAA LAST-MINUTE REVISION SHEET, FORMULAS & EXAM CHECKLIST",
        [
            "1. Comprehensive Complexity Cheat Sheet (All Units I-III Algorithms)",
            "2. Master Formula Sheet: Asymptotics, Recurrences, Step Counts & Knapsack",
            "3. Key Differences: O vs \u03A9 vs \u0398 vs o, Merge vs Quick, Prim vs Kruskal, Frac vs 0/1",
            "4. Quick Algorithm Selection Guide: Choosing the Right Algorithmic Tool",
            "5. Itemized Final University Exam Checklist"
        ]
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # 1. COMPLEXITY CHEAT SHEET TABLE
    # =============================================================
    story.append(Paragraph("<b>1. DAA Master Complexity Cheat Sheet (Units I &ndash; III)</b>", h3_style))
    story.append(Paragraph("A quick-reference table containing exact complexities supported by the course material:", body_style))
    
    cheat_data = [
        [Paragraph("<b>Algorithm / Problem</b>", table_header_style), Paragraph("<b>Paradigm</b>", table_header_style), Paragraph("<b>Best Case</b>", table_header_style), Paragraph("<b>Average Case</b>", table_header_style), Paragraph("<b>Worst Case</b>", table_header_style), Paragraph("<b>Aux. Space</b>", table_header_style)],
        [Paragraph("<b>Sequential Search</b>", table_cell_bold), Paragraph("Brute Force", table_cell_style), Paragraph("O(1)", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(1)", table_cell_center)],
        [Paragraph("<b>Find Largest (Max)</b>", table_cell_bold), Paragraph("Iterative", table_cell_style), Paragraph("O(n)", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(1)", table_cell_center)],
        [Paragraph("<b>Iterative Sum</b>", table_cell_bold), Paragraph("Iterative", table_cell_style), Paragraph("2n + 3 steps", table_cell_center), Paragraph("2n + 3 steps", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(n) data", table_cell_center)],
        [Paragraph("<b>Recursive Sum</b>", table_cell_bold), Paragraph("Recursive", table_cell_style), Paragraph("2n + 2 steps", table_cell_center), Paragraph("2n + 2 steps", table_cell_center), Paragraph("O(n)", table_cell_center), Paragraph("O(n) stack", table_cell_center)],
        [Paragraph("<b>Matrix Addition</b>", table_cell_bold), Paragraph("Nested Loops", table_cell_style), Paragraph("2mn+2m+1", table_cell_center), Paragraph("O(mn)", table_cell_center), Paragraph("O(mn)", table_cell_center), Paragraph("O(mn) data", table_cell_center)],
        [Paragraph("<b>Binary Search (Iter.)</b>", table_cell_bold), Paragraph("Divide & Conquer", table_cell_style), Paragraph("O(1)", table_cell_center), Paragraph("O(log n)", table_cell_center), Paragraph("O(log n)", table_cell_center), Paragraph("O(1)", table_cell_center)],
        [Paragraph("<b>Binary Search (Rec.)</b>", table_cell_bold), Paragraph("Divide & Conquer", table_cell_style), Paragraph("O(1)", table_cell_center), Paragraph("O(log n)", table_cell_center), Paragraph("O(log n)", table_cell_center), Paragraph("O(log n) stack", table_cell_center)],
        [Paragraph("<b>Merge Sort</b>", table_cell_bold), Paragraph("Divide & Conquer", table_cell_style), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n) array", table_cell_center)],
        [Paragraph("<b>Quick Sort</b>", table_cell_bold), Paragraph("Divide & Conquer", table_cell_style), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n log n)", table_cell_center), Paragraph("<b>O(n<sup>2</sup>)</b>", table_cell_bold), Paragraph("O(log n) stack", table_cell_center)],
        [Paragraph("<b>Strassen's Matrix Mult.</b>", table_cell_bold), Paragraph("Divide & Conquer", table_cell_style), Paragraph("O(n<sup>2.81</sup>)", table_cell_center), Paragraph("O(n<sup>2.81</sup>)", table_cell_center), Paragraph("O(n<sup>log<sub>2</sub> 7</sup>)", table_cell_center), Paragraph("O(n<sup>2</sup>)", table_cell_center)],
        [Paragraph("<b>Fractional Knapsack</b>", table_cell_bold), Paragraph("Greedy Method", table_cell_style), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n log n)", table_cell_center), Paragraph("O(1)", table_cell_center)],
        [Paragraph("<b>Prim's Algorithm (MST)</b>", table_cell_bold), Paragraph("Greedy Method", table_cell_style), Paragraph("O(V<sup>2</sup>)", table_cell_center), Paragraph("O(V<sup>2</sup>)", table_cell_center), Paragraph("O(V<sup>2</sup>)", table_cell_center), Paragraph("O(V)", table_cell_center)],
        [Paragraph("<b>Kruskal's Algorithm</b>", table_cell_bold), Paragraph("Greedy Method", table_cell_style), Paragraph("O(E log E)", table_cell_center), Paragraph("O(E log E)", table_cell_center), Paragraph("O(E log E)", table_cell_center), Paragraph("O(V + E)", table_cell_center)],
        [Paragraph("<b>Dijkstra's SSSP</b>", table_cell_bold), Paragraph("Greedy Method", table_cell_style), Paragraph("O(n<sup>2</sup>)", table_cell_center), Paragraph("O(n<sup>2</sup>)", table_cell_center), Paragraph("O(n<sup>2</sup>)", table_cell_center), Paragraph("O(n)", table_cell_center)],
        [Paragraph("<b>Job Sequencing</b>", table_cell_bold), Paragraph("Greedy Method", table_cell_style), Paragraph("O(n log n)", table_cell_center), Paragraph("O(n<sup>2</sup>)", table_cell_center), Paragraph("<b>O(n<sup>2</sup>)</b>", table_cell_bold), Paragraph("O(n)", table_cell_center)]
    ]
    t_cheat = Table(cheat_data, colWidths=[110, 85, 75, 75, 95, 83.27])
    t_cheat.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
    ]))
    story.append(t_cheat)
    story.append(Spacer(1, 10))

    # =============================================================
    # 2. MASTER FORMULA SHEET
    # =============================================================
    story.append(Paragraph("<b>2. Master Exam Formula Sheet</b>", h3_style))
    
    formulas_text = """<b>1. Asymptotic Limit & Inequality Definitions:</b><br/>
• <i>Big-Oh:</i> f(n) &le; c &middot; g(n), &forall; n &ge; n<sub>0</sub> &rArr; Upper Bound.<br/>
• <i>Omega:</i> f(n) &ge; c &middot; g(n), &forall; n &ge; n<sub>0</sub> &rArr; Lower Bound.<br/>
• <i>Theta:</i> c<sub>1</sub> g(n) &le; f(n) &le; c<sub>2</sub> g(n), &forall; n &ge; n<sub>0</sub> &rArr; Tight Bound.<br/>
• <i>Little-oh:</i> lim<sub>n&rarr;&infin;</sub> [ f(n) / g(n) ] = 0 &rArr; Strict Non-Tight Upper Bound.<br/>
• <i>Growth Ordering:</i> 1 &lt; log n &lt; n &lt; n log n &lt; n<sup>2</sup> &lt; n<sup>3</sup> &lt; 2<sup>n</sup> &lt; n!<br/><br/>
<b>2. Space & Time Complexity Formulas:</b><br/>
• <i>Time Complexity:</i> T(P) = C + T<sub>P</sub>(Instance characteristics)<br/>
• <i>Space Complexity:</i> S(P) = C + S<sub>P</sub>(Instance characteristics)<br/>
• <i>Iterative Sum Steps:</i> 2n + 3 | <i>Recursive Sum Steps:</i> 2n + 2 | <i>Matrix Add Steps:</i> 2mn + 2m + 1<br/>
• <i>Hiring Problem Cost:</i> Total Cost = n&middot;c<sub>i</sub> + m&middot;c<sub>h</sub> | Expected Hires E[m] = ln n + 1 | Expected Cost = O(c<sub>h</sub> ln n)<br/><br/>
<b>3. Recurrence Relations:</b><br/>
• <i>Binary Search:</i> T(n) = T(n/2) + c<sub>2</sub> &rArr; <b>T(n) = O(log n)</b><br/>
• <i>Merge Sort:</i> T(n) = 2T(n/2) + c<sub>2</sub>n &rArr; <b>T(n) = O(n log n)</b><br/>
• <i>Quick Sort (Worst):</i> T(n) = T(n - 1) + c<sub>2</sub>n &rArr; <b>T(n) = O(n<sup>2</sup>)</b><br/>
• <i>Quick Sort (Best):</i> T(n) = 2T(n/2) + c<sub>2</sub>n &rArr; <b>T(n) = O(n log n)</b><br/>
• <i>Strassen Matrix Mult:</i> T(n) = 7T(n/2) + c<sub>2</sub>n<sup>2</sup> &rArr; <b>T(n) = O(n<sup>log<sub>2</sub> 7</sup>) &asymp; O(n<sup>2.81</sup>)</b><br/>
• <i>Master Theorem (T(n) = a T(n/b) + &Theta;(n<sup>d</sup>)):</i> Case 1 (a &gt; b<sup>d</sup> &rArr; &Theta;(n<sup>log<sub>b</sub> a</sup>)); Case 2 (a = b<sup>d</sup> &rArr; &Theta;(n<sup>d</sup> log n)); Case 3 (a &lt; b<sup>d</sup> &rArr; &Theta;(n<sup>d</sup>)).<br/><br/>
<b>4. Greedy Problem Objectives:</b><br/>
• <i>Fractional Knapsack:</i> Maximize &sum; p<sub>i</sub> x<sub>i</sub> subject to &sum; w<sub>i</sub> x<sub>i</sub> &le; m (0 &le; x<sub>i</sub> &le; 1). Greedy criterion: sort by <b>p<sub>i</sub> / w<sub>i</sub></b>.<br/>
• <i>MST Property:</i> Exactly <b>n &minus; 1 edges</b> for an n-vertex graph without cycles.<br/>
• <i>Dijkstra Relaxation:</i> <code>if ( dist[w] &gt; dist[u] + cost[u,w] ) then dist[w] := dist[u] + cost[u,w]</code>."""
    
    story.append(create_callout_box(formulas_text, "Essential Formulas & Recurrences", bg_color=CALLOUT_BG_AMBER, border_color=ACCENT_YELLOW))
    story.append(Spacer(1, 10))

    # =============================================================
    # 3. IMPORTANT DIFFERENCES
    # =============================================================
    story.append(Paragraph("<b>3. Important Comparison Tables for 5/10-Mark Questions</b>", h3_style))
    
    # Merge Sort vs Quick Sort Table
    story.append(Paragraph("<b>A. Merge Sort vs Quick Sort</b>", h4_style))
    diff_mq_data = [
        [Paragraph("<b>Parameter</b>", table_header_style), Paragraph("<b>Merge Sort</b>", table_header_style), Paragraph("<b>Quick Sort</b>", table_header_style)],
        [Paragraph("<b>Time Complexity (Worst)</b>", table_cell_bold), Paragraph("<b>O(n log n)</b> (Guaranteed)", table_cell_center), Paragraph("<b>O(n<sup>2</sup>)</b> (Occurs when sorted)", table_cell_center)],
        [Paragraph("<b>Auxiliary Space</b>", table_cell_bold), Paragraph("<b>O(n)</b> (Requires buffer array b)", table_cell_style), Paragraph("<b>O(log n)</b> stack space (In-place)", table_cell_style)],
        [Paragraph("<b>Stability</b>", table_cell_bold), Paragraph("Stable", table_cell_center), Paragraph("Unstable", table_cell_center)],
        [Paragraph("<b>Work Phase</b>", table_cell_bold), Paragraph("Major work done during <b>Combine (Merge)</b>", table_cell_style), Paragraph("Major work done during <b>Divide (Partition)</b>", table_cell_style)]
    ]
    t_dmq = Table(diff_mq_data, colWidths=[130, 195, 198.27])
    t_dmq.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), SECONDARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
    ]))
    story.append(t_dmq)
    story.append(Spacer(1, 6))

    # Prim vs Kruskal Table
    story.append(Paragraph("<b>B. Prim's Algorithm vs Kruskal's Algorithm</b>", h4_style))
    diff_pk_data = [
        [Paragraph("<b>Parameter</b>", table_header_style), Paragraph("<b>Prim's Algorithm</b>", table_header_style), Paragraph("<b>Kruskal's Algorithm</b>", table_header_style)],
        [Paragraph("<b>Approach</b>", table_cell_bold), Paragraph("Grows a single continuous tree from a root", table_cell_style), Paragraph("Merges disjoint trees in a forest", table_cell_style)],
        [Paragraph("<b>Best Suited For</b>", table_cell_bold), Paragraph("<b>Dense Graphs</b> (E &asymp; V<sup>2</sup>)", table_cell_center), Paragraph("<b>Sparse Graphs</b> (E &Lt; V<sup>2</sup>)", table_cell_center)],
        [Paragraph("<b>Cycle Prevention</b>", table_cell_bold), Paragraph("Implicit (adds edges to non-tree nodes via near[])", table_cell_style), Paragraph("Explicit (Disjoint Sets <code>Find-Set</code>)", table_cell_style)],
        [Paragraph("<b>Time Complexity</b>", table_cell_bold), Paragraph("<b>O(V<sup>2</sup>)</b> (Adjacency Matrix)", table_cell_center), Paragraph("<b>O(E log E)</b> (Edge Sorting)", table_cell_center)]
    ]
    t_dpk = Table(diff_pk_data, colWidths=[130, 195, 198.27])
    t_dpk.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
    ]))
    story.append(t_dpk)
    story.append(Spacer(1, 10))

    # =============================================================
    # 4. ALGORITHM SELECTION GUIDE
    # =============================================================
    story.append(Paragraph("<b>4. Algorithm Selection Guide (When to Use What)</b>", h3_style))
    
    sel_data = [
        [Paragraph("<b>Algorithm</b>", table_header_style), Paragraph("<b>When to Use (Scenario & Constraints)</b>", table_header_style), Paragraph("<b>When NOT to Use (Alternative)</b>", table_header_style)],
        [Paragraph("<b>Binary Search</b>", table_cell_bold), Paragraph("When array is <b>already sorted</b> and fast O(log n) lookup is needed.", table_cell_style), Paragraph("Unsorted data &rarr; Use Linear Search or sort first.", table_cell_style)],
        [Paragraph("<b>Merge Sort</b>", table_cell_bold), Paragraph("When <b>guaranteed O(n log n)</b> and stability are required, or sorting linked lists / external files.", table_cell_style), Paragraph("Strict memory limits &rarr; Use Quick Sort or Heap Sort.", table_cell_style)],
        [Paragraph("<b>Quick Sort</b>", table_cell_bold), Paragraph("Fastest in practice for in-memory contiguous arrays; in-place O(log n) stack space.", table_cell_style), Paragraph("Already sorted / adversarial inputs &rarr; Merge Sort.", table_cell_style)],
        [Paragraph("<b>Fractional Knapsack</b>", table_cell_bold), Paragraph("Items can be divided into arbitrary fractions (fluids, grains, metal ingots).", table_cell_style), Paragraph("Items are discrete (0/1) &rarr; Use Dynamic Programming.", table_cell_style)],
        [Paragraph("<b>Prim's Algorithm</b>", table_cell_bold), Paragraph("Finding MST in <b>dense graphs</b> with many edges (E &asymp; V<sup>2</sup>).", table_cell_style), Paragraph("Sparse graphs with few edges &rarr; Use Kruskal.", table_cell_style)],
        [Paragraph("<b>Kruskal's Algorithm</b>", table_cell_bold), Paragraph("Finding MST in <b>sparse graphs</b>; when edges are already sorted.", table_cell_style), Paragraph("Dense graphs &rarr; Use Prim.", table_cell_style)],
        [Paragraph("<b>Dijkstra's Algorithm</b>", table_cell_bold), Paragraph("Single-source shortest paths in graphs with <b>non-negative edge weights</b>.", table_cell_style), Paragraph("Graphs with negative edge weights &rarr; Bellman-Ford.", table_cell_style)],
        [Paragraph("<b>Job Sequencing</b>", table_cell_bold), Paragraph("Unit-time jobs with deadlines and profits on a single processor.", table_cell_style), Paragraph("Variable job execution times &rarr; Interval Scheduling.", table_cell_style)]
    ]
    t_sel = Table(sel_data, colWidths=[110, 210, 203.27])
    t_sel.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), SECONDARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 2.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 2.5),
    ]))
    story.append(t_sel)
    story.append(Spacer(1, 10))

    # =============================================================
    # 5. FINAL EXAM CHECKLIST
    # =============================================================
    story.append(Paragraph("<b>5. Final University Exam Checklist</b>", h3_style))
    story.append(Paragraph("Ensure you have mastered every item before entering the examination hall:", body_style))
    
    chk_text = """<b>UNIT-I: ALGORITHM BASICS & ANALYSIS</b><br/>
&squ; Q1: Asymptotic Notations: Big-Oh (O), Omega (&Omega;), Theta (&Theta;), Little-oh (o) with definitions & proofs.<br/>
&squ; Q2: Time Complexity formula T(P)=C+T<sub>P</sub>(I), program step definition & counting rules.<br/>
&squ; Q3: Space Complexity formula S(P)=C+S<sub>P</sub>(I), fixed vs variable/stack space (abc, sum, RSum).<br/>
&squ; Q4: Sequential Search Best O(1), Worst O(n), Average O(n) on array [2, 5, 7, 8, 9].<br/>
&squ; Q5: Largest of n numbers algorithm (max) and &Theta;(n) complexity.<br/>
&squ; Q6: Tabular method tables: Iterative Sum (2n+3) and Matrix Addition (2mn+2m+1).<br/>
&squ; Q7: Rate of growth: table for F(n)=n<sup>2</sup>+100n+log<sub>10</sub>n+1000 & ordering 1&lt;logn&lt;n&lt;nlogn&lt;n<sup>2</sup>&lt;n<sup>3</sup>&lt;2<sup>n</sup>&lt;n!.<br/>
&squ; Q8: 5 Characteristics of an algorithm: Input, Output, Definiteness, Finiteness, Effectiveness.<br/>
&squ; Q9: 10 Pseudocode conventions (braces, :=, logical/relational, multidimensional arrays, loops, I/O).<br/>
&squ; Q10: Recursive algorithms & factorial stack execution trace of rfactorial(3).<br/>
&squ; Q11: Matrix addition step count derivation (2mn+2m+1).<br/>
&squ; Q12: Recursive sum recurrence t(n)=2+t(n-1) derivation &rarr; 2n+2 steps.<br/>
&squ; Q13: Probabilistic analysis & Hiring Problem cost model (n&middot;c<sub>i</sub>+m&middot;c<sub>h</sub>) and O(c<sub>h</sub> ln n).<br/>
&squ; Q14: Connected components definition, DFS/BFS and {1,2,3,4}, {5,6}, {7}.<br/>
&squ; Q15: Biconnected components, Articulation points (Cut Vertex 4) and BCC 1={0,1,2,3,4}, BCC 2={4,5,6,7,8}.<br/><br/>
<b>UNIT-II: DIVIDE AND CONQUER</b><br/>
&squ; Q16: Divide and Conquer control abstraction DAndC(p) & general recurrence.<br/>
&squ; Q17: Binary Search: algorithm, recurrence T(n)=T(n/2)+c<sub>2</sub> &rarr; O(log n), Successful & Unsuccessful cases.<br/>
&squ; Q18: Merge Sort: Divide, Conquer, Combine, trace on [6,2,8,4,3,7,5,1] and call tree.<br/>
&squ; Q19: Merge Sort recurrence T(n)=2T(n/2)+c<sub>2</sub>n derivation &rarr; O(n log n).<br/>
&squ; Q20: Quick Sort: Partition procedure trace on [85,24,63,95,17,31,45,98] and algorithm.<br/>
&squ; Q21: Quick Sort Best O(n log n) vs Worst O(n<sup>2</sup>) derivations.<br/>
&squ; Q22: Strassen's Matrix Mult: motivation (O(n<sup>3</sup>) vs O(n<sup>2</sup>)), 7 products M<sub>1</sub>..M<sub>7</sub>, C<sub>11</sub>..C<sub>22</sub> formulas.<br/>
&squ; Q23: Strassen's recurrence T(n)=7T(n/2)+c<sub>2</sub>n<sup>2</sup> derivation &rarr; O(n<sup>log<sub>2</sub> 7</sup>) &asymp; O(n<sup>2.81</sup>).<br/>
&squ; Q24: General Divide and Conquer recurrence T(n)=aT(n/b)+f(n) & Master Theorem.<br/>
&squ; Q25: Iterative Binary Search algorithm (BinSearch).<br/>
&squ; Q26: Recursive Binary Search algorithm (BinSrch).<br/>
&squ; Q27: Merge Sort 3 phases (Divide, Conquer, Combine).<br/>
&squ; Q28: Complete Merge() algorithm with temporary array b[].<br/>
&squ; Q29: Complete QuickSort, Partition and interchange algorithms.<br/>
&squ; Q30: Comparison table: Merge Sort vs Quick Sort.<br/><br/>
<b>UNIT-III: GREEDY METHOD</b><br/>
&squ; Q31: Greedy Method control abstraction Greedy(a,n), greedy-choice property, feasible vs optimal.<br/>
&squ; Q32: Fractional Knapsack: GreedyKnapsack algorithm & solved numerical (w=[4,8,2,6,1], p=[12,32,40,30,50], m=10 &rarr; profit $124).<br/>
&squ; Q33: Fractional vs 0/1 Knapsack comparison & counterexample (m=50, w=[10,20,30], p=[60,100,120] &rarr; greedy $160 vs optimal $220).<br/>
&squ; Q34: Spanning Tree definition & 4 key properties (n-1 edges, connects all, acyclic).<br/>
&squ; Q35: Minimum Cost Spanning Tree (MST) definition & network wiring application.<br/>
&squ; Q36: Prim's Algorithm: near[] array role, pseudocode Prim(E,cost,n,t), 9-vertex graph solved trace (cost=28), O(n<sup>2</sup>).<br/>
&squ; Q37: Kruskal's Algorithm: edge sorting, cycle check, pseudocode kruskal(E,cost,n,t), solved trace (cost=28), O(E log E).<br/>
&squ; Q38: Disjoint Sets: Make-Set, Find-Set, Union operations and role in Kruskal.<br/>
&squ; Q39: Single-Source Shortest Path (SSSP) problem definition & non-negative edge condition.<br/>
&squ; Q40: Dijkstra's Algorithm: relaxation formula, pseudocode ShortestPaths, 6-vertex numerical trace table, O(n<sup>2</sup>).<br/>
&squ; Q41: Job Sequencing with Deadlines: greedy slot selection, pseudocode JS(d,j,n), solved examples (4, 5, 7 jobs).<br/>
&squ; Q42: Detailed comparison table: Prim's vs Kruskal's Algorithm.<br/>
&squ; Q43: Solved MST numerical problem using Prim's algorithm (step-by-step table).<br/>
&squ; Q44: Solved MST numerical problem using Kruskal's algorithm (step-by-step table).<br/>
&squ; Q45: Solved Dijkstra shortest-path numerical problem (iteration table).<br/>
&squ; Q46: Solved Job Sequencing with Deadlines numerical problem (slot assignment table)."""
    
    story.append(create_callout_box(chk_text, "Exam Readiness Verification Checklist", bg_color=CALLOUT_BG_GREEN, border_color=ACCENT_GREEN))
    story.append(Spacer(1, 14))

    return story

print("booklet_content_revision.py initialized successfully!")
