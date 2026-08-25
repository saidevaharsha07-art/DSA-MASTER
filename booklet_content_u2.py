import os
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, PageBreak
from booklet_styles import (
    h3_style, h4_style, body_style, body_bold, bullet_style,
    table_header_style, table_cell_style, table_cell_bold, table_cell_center, table_cell_mono,
    create_code_block, create_callout_box, create_priority_header, create_unit_banner,
    PRIMARY, SECONDARY, ACCENT_RED, ACCENT_GREEN, ACCENT_YELLOW, TABLE_ROW_ALT,
    CALLOUT_BG_BLUE, CALLOUT_BG_RED, CALLOUT_BG_GREEN, CALLOUT_BG_AMBER
)

def get_unit2_content():
    story = []
    
    # -------------------------------------------------------------
    # UNIT-II OVERVIEW & BANNER
    # -------------------------------------------------------------
    story.append(create_unit_banner(
        "UNIT-II",
        "DIVIDE AND CONQUER TECHNIQUE & RECURRENCE RELATIONS",
        [
            "1. Divide and Conquer Paradigm & Control Abstraction DAndC(p)",
            "2. Binary Search: Iterative, Recursive, Recurrence & Successful/Unsuccessful Analysis",
            "3. Merge Sort: Divide, Conquer, Combine, Full Merge Algorithm & O(n log n) Derivation",
            "4. Quick Sort: Partitioning Procedure, Trace & Best O(n log n) vs Worst O(n\u00B2) Derivation",
            "5. Strassen's Matrix Multiplication: 7 Products M\u2081-M\u2087 & O(n^2.81) Recurrence Derivation",
            "6. General Recurrence Relations T(n) = aT(n/b) + f(n) & Master Theorem",
            "7. Comprehensive Comparison: Merge Sort vs Quick Sort"
        ]
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q16: Divide and Conquer Technique & Control Abstraction
    # =============================================================
    story.append(create_priority_header("Q16", "Explain the Divide and Conquer Technique and its Control Abstraction.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. General Method & Concept (PPT Slides 2-3)</b>", h3_style))
    story.append(Paragraph("The <b>Divide and Conquer</b> technique is a top-down algorithmic paradigm that solves a computational problem by breaking it into smaller instances of the same problem. It operates in three distinct phases:<br/>• <b>Divide:</b> Splits <i>n</i> inputs into <i>k</i> subsets (where 1 &lt; k &le; n), resulting in <i>k</i> smaller subproblems.<br/>• <b>Conquer:</b> If subproblems are small enough (base case), solve them directly. If subproblems are large, recursively re-apply Divide and Conquer.<br/>• <b>Combine:</b> Combines the solutions of the <i>k</i> subproblems using a separate procedure to obtain the solution to the original whole problem.", body_style))
    
    story.append(Paragraph("<b>2. Control Abstraction: Algorithm DAndC(p) (PPT Slide 4)</b>", h3_style))
    story.append(create_code_block("""Algorithm DAndC(p)
// p is the given problem instance
{
    if Small(p) then 
        return s(p);                                           // Base case: solve directly
    else
    {
        divide p into smaller problems p1, p2, ..., pk, k >= 1; // Divide phase
        Apply DAndC to each of these subproblems;             // Conquer phase (recursive)
        return Combine(DAndC(p1), DAndC(p2), ..., DAndC(pk)); // Combine phase
    }
}""", "Control Abstraction for Divide and Conquer"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. General Computing Time Recurrence (PPT Slide 5)</b><br/>If the size of problem <code>p</code> is <i>n</i> and the sizes of the <i>k</i> subproblems are <i>n<sub>1</sub>, n<sub>2</sub>, ..., n<sub>k</sub></i>, the computing time T(n) is described by:<br/>• <b>T(n) = g(n)</b>, when <i>n</i> is small (time to compute answer directly)<br/>• <b>T(n) = T(n<sub>1</sub>) + T(n<sub>2</sub>) + ... + T(n<sub>k</sub>) + f(n)</b>, otherwise (where f(n) is time to divide and combine)", body_style))
    
    if os.path.exists('diagrams/diag_dandc_paradigm.png'):
        story.append(Image('diagrams/diag_dandc_paradigm.png', width=450, height=125))
        story.append(Spacer(1, 4))

    story.append(create_callout_box(
        "<b>Exam Key:</b> The recurrence for homogeneous subproblems takes the form <code>T(n) = c</code> (for n small) and <code>T(n) = a T(n/b) + f(n)</code> (for n > 1), where a &ge; 1, b > 1, and n is a power of b (n = b<sup>k</sup>).",
        "Control Abstraction Rule"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q17: Binary Search using Divide and Conquer & Complexity
    # =============================================================
    story.append(create_priority_header("Q17", "Explain Binary Search using Divide and Conquer and analyze its complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Problem Statement & Principle</b>", h3_style))
    story.append(Paragraph("Given a sorted array <code>a[1:n]</code> in non-decreasing order (<code>a[1] &le; a[2] &le; ... &le; a[n]</code>) and a search element <code>x</code>, determine whether <code>x</code> is present in the array. If present, return its index <code>mid</code>; otherwise, return 0.", body_style))
    
    story.append(create_code_block("""Algorithm BinSrch(a, low, high, x)
// Recursive Divide and Conquer Binary Search on a[low : high]
{
    if ( low = high ) then                             // If Small(P): size 1 base case
    {
        if ( x = a[low] ) then return low;
        else return 0;
    }
    else
    {
        mid := (low + high) / 2;                       // Divide: compute middle index
        if ( x = a[mid] ) then return mid;             // Key found
        else if ( x < a[mid] ) then
            return BinSrch(a, low, mid - 1, x);        // Conquer: search left subproblem
        else
            return BinSrch(a, mid + 1, high, x);       // Conquer: search right subproblem
    }
}""", "Algorithm BinSrch(a, low, high, x)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. Time Complexity Recurrence & Derivation (PPT Slide 10)</b>", h3_style))
    story.append(Paragraph("If the time for dividing the list is constant c<sub>2</sub> and base case is c<sub>1</sub>:<br/>• <b>T(n) = c<sub>1</sub></b> (for n = 1)<br/>• <b>T(n) = T(n/2) + c<sub>2</sub></b> (for n &gt; 1)<br/>Assume n = 2<sup>k</sup> (where k = log<sub>2</sub> n):<br/>T(n) = T(n/2) + c<sub>2</sub> = T(n/4) + c<sub>2</sub> + c<sub>2</sub> = T(n/8) + 3c<sub>2</sub> = ... = T(n/2<sup>k</sup>) + k&middot;c<sub>2</sub><br/>T(n) = T(1) + k&middot;c<sub>2</sub> = c<sub>1</sub> + c<sub>2</sub> log<sub>2</sub> n = <b>O(log n)</b>.", body_style))

    story.append(Paragraph("<b>3. Complexity Summary Table (PPT Slide 11)</b>", h4_style))
    bs_table_data = [
        [Paragraph("<b>Search Outcome</b>", table_header_style), Paragraph("<b>Best Case</b>", table_header_style), Paragraph("<b>Average Case</b>", table_header_style), Paragraph("<b>Worst Case</b>", table_header_style)],
        [Paragraph("<b>Successful Searches</b>", table_cell_bold), Paragraph("<b>O(1)</b> (found at first mid)", table_cell_center), Paragraph("<b>O(log n)</b>", table_cell_center), Paragraph("<b>O(log n)</b>", table_cell_center)],
        [Paragraph("<b>Unsuccessful Searches</b>", table_cell_bold), Paragraph("<b>O(log n)</b>", table_cell_center), Paragraph("<b>O(log n)</b>", table_cell_center), Paragraph("<b>O(log n)</b>", table_cell_center)]
    ]
    t_bs = Table(bs_table_data, colWidths=[140, 120, 120, 143.27])
    t_bs.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_bs)
    story.append(Spacer(1, 10))

    # =============================================================
    # Q18: Merge Sort with Algorithm and Example
    # =============================================================
    story.append(create_priority_header("Q18", "Explain Merge Sort with complete algorithm and a step-by-step example.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Concept (PPT Slide 12):</b><br/>• <b>Base Case:</b> Solve directly if array has 1 element (already sorted).<br/>• <b>Divide:</b> Divide array into two equal halves (size n/2).<br/>• <b>Conquer:</b> Recursively sort the two halves.<br/>• <b>Combine:</b> Merge the two sorted subarrays into a single sorted array.", body_style))
    
    story.append(create_code_block("""Algorithm MergeSort(low, high)
// Sorts global array a[low : high] in ascending order
{
    if ( low < high ) then                    // If more than one element
    {
        mid := (low + high) / 2;              // Divide
        MergeSort(low, mid);                  // Conquer left half
        MergeSort(mid + 1, high);             // Conquer right half
        Merge(low, mid, high);                // Combine: merge two sorted subsets
    }
}""", "Algorithm MergeSort(low, high)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. Step-by-Step PPT Example: Array A = [6, 2, 8, 4, 3, 7, 5, 1] (Slides 14-35)</b>", h3_style))
    story.append(Paragraph("• <b>Divide Stage:</b> <code>[6, 2, 8, 4 | 3, 7, 5, 1]</code> &rarr; <code>[6, 2 | 8, 4]</code> & <code>[3, 7 | 5, 1]</code> &rarr; leaves <code>[6], [2], [8], [4], [3], [7], [5], [1]</code>.<br/>• <b>Merge Stage (Bottom-Up):</b><br/>&nbsp;&nbsp;1. <code>Merge(6, 2) &rarr; [2, 6]</code> and <code>Merge(8, 4) &rarr; [4, 8]</code><br/>&nbsp;&nbsp;2. <code>Merge([2, 6], [4, 8]) &rarr; [2, 4, 6, 8]</code> (Left half fully sorted)<br/>&nbsp;&nbsp;3. <code>Merge(3, 7) &rarr; [3, 7]</code> and <code>Merge(5, 1) &rarr; [1, 5]</code><br/>&nbsp;&nbsp;4. <code>Merge([3, 7], [1, 5]) &rarr; [1, 3, 5, 7]</code> (Right half fully sorted)<br/>&nbsp;&nbsp;5. <b>Final Merge:</b> <code>Merge([2, 4, 6, 8], [1, 3, 5, 7]) &rarr; [1, 2, 3, 4, 5, 6, 7, 8]</code>.", body_style))

    if os.path.exists('diagrams/diag_mergesort_tree.png'):
        story.append(Image('diagrams/diag_mergesort_tree.png', width=480, height=140))
        story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. Tree of Calls Example (PPT Slide 36):</b> For array of 10 elements <code>[179, 254, 285, 310, 351, 423, 450, 520, 652, 861]</code>, root call is <code>(1, 10)</code>, split into <code>(1, 5)</code> and <code>(6, 10)</code> down to base calls <code>(1,1), (2,2), ... (10,10)</code>.", body_style))
    story.append(Paragraph("<b>Complexity:</b> Best = <b>O(n log n)</b>, Average = <b>O(n log n)</b>, Worst = <b>O(n log n)</b>. Auxiliary Space = <b>O(n)</b> for temporary array <code>b[]</code>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q19: Merge Sort Recurrence Analysis & O(n log n) Derivation
    # =============================================================
    story.append(create_priority_header("Q19", "Analyze Merge Sort using Recurrence Relation and derive O(n log n).", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Formulation of Recurrence (PPT Slide 52)</b>", h3_style))
    story.append(Paragraph("If the time for the merging operation is proportional to <i>n</i> (i.e., c<sub>2</sub>n), the computing time for Merge Sort is described by:<br/>• <b>T(n) = c<sub>1</sub></b>, for n = 1 (c<sub>1</sub> is a constant)<br/>• <b>T(n) = 2T(n/2) + c<sub>2</sub>n</b>, for n &gt; 1 (c<sub>2</sub> is a constant)", body_style))
    
    story.append(Paragraph("<b>2. Step-by-Step Derivation by Repeated Substitution</b>", h3_style))
    story.append(Paragraph("Assume n = 2<sup>k</sup>, which implies k = log<sub>2</sub> n:<br/>T(n) = 2T(n/2) + c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2 [ 2T(n/4) + c<sub>2</sub>(n/2) ] + c<sub>2</sub>n = 4T(n/4) + 2c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 4 [ 2T(n/8) + c<sub>2</sub>(n/4) ] + 2c<sub>2</sub>n = 8T(n/8) + 3c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2<sup>k</sup> T(n / 2<sup>k</sup>) + k&middot;c<sub>2</sub>n<br/>Substitute n = 2<sup>k</sup> (so n / 2<sup>k</sup> = 1 and k = log<sub>2</sub> n):<br/>T(n) = 2<sup>k</sup> T(1) + (log<sub>2</sub> n)&middot;c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= c<sub>1</sub>n + c<sub>2</sub>n log<sub>2</sub> n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= <b>O(n log n)</b>.", body_style))
    
    story.append(create_callout_box(
        "<b>Exam Verification (Master Theorem):</b> For T(n) = 2T(n/2) + &Theta;(n), a = 2, b = 2, d = 1. Since log<sub>b</sub> a = log<sub>2</sub> 2 = 1 = d &rArr; Case 2 applies &rArr; T(n) = &Theta;(n<sup>d</sup> log n) = &Theta;(n log n).",
        "Master Theorem Cross-Check",
        bg_color=CALLOUT_BG_GREEN,
        border_color=ACCENT_GREEN
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q20: Quick Sort with Partitioning & Complexity
    # =============================================================
    story.append(create_priority_header("Q20", "Explain Quick Sort with Partitioning Procedure and analyze its complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Principle & Divide-Conquer Steps (PPT Slide 54)</b>", h3_style))
    story.append(Paragraph("• <b>Divide:</b> Pick any element as the <b>pivot</b> (e.g., first element <code>a[low]</code>). Partition remaining elements into:<br/>&nbsp;&nbsp;- <i>FirstPart:</i> contains all elements &le; pivot<br/>&nbsp;&nbsp;- <i>SecondPart:</i> contains all elements &gt; pivot<br/>• <b>Conquer:</b> Recursively sort FirstPart and SecondPart using QuickSort.<br/>• <b>Combine:</b> <i>No work is necessary</i> because partitioning and sorting are performed in-place.", body_style))

    story.append(Paragraph("<b>2. PPT Partition Trace: Array [85, 24, 63, 95, 17, 31, 45, 98] (Slides 57-60)</b>", h3_style))
    story.append(Paragraph("• <b>Initial:</b> Pivot = <b>85</b>, pointer <code>i</code> starts at left (moves right while <code>a[i] &lt; pivot</code>), pointer <code>j</code> starts at right (moves left while <code>a[j] &gt; pivot</code>).<br/>• <code>i</code> stops at 95 (> 85), <code>j</code> stops at 45 (< 85). Since <code>i &lt; j</code>, <b>swap 95 and 45</b> &rarr; <code>[85, 24, 63, 45, 17, 31, 95, 98]</code>.<br/>• Advance pointers: <code>i</code> advances to index 7 (95), <code>j</code> decreases to index 6 (31). Now <code>i &ge; j</code> (pointers crossed).<br/>• <b>Swap pivot (85) with a[j] (31):</b> Array becomes <code>[31, 24, 63, 45, 17 | 85 | 95, 98]</code>.<br/>• <b>Result:</b> Pivot 85 is in its correct final position at index 6, yielding two independent sublists: <code>FirstPart = [31, 24, 63, 45, 17]</code> and <code>SecondPart = [95, 98]</code>.", body_style))

    story.append(create_code_block("""Algorithm QuickSort(low, high)
// Sorts global array a[low:high] into ascending order; a[high+1] is sentinel >= all elements
{
    if ( low < high ) then
    {
        j := Partition(low, high);             // j is position of pivot element
        QuickSort(low, j - 1);                  // Recursively sort left subarray
        QuickSort(j + 1, high);                 // Recursively sort right subarray
    }
}""", "Algorithm QuickSort(low, high)"))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q21: Best-Case and Worst-Case Complexity of Quick Sort
    # =============================================================
    story.append(create_priority_header("Q21", "Explain Best-Case and Worst-Case Complexity of Quick Sort with derivations.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Worst-Case Analysis: O(n<sup>2</sup>) (PPT Slides 65-67)</b>", h3_style))
    story.append(Paragraph("• <b>Condition:</b> Occurs when the input list is <b>already sorted</b> in ascending or descending order.<br/>• <b>Behavior:</b> In every step, the pivot is the smallest (or largest) element. Partitioning creates one empty sublist and one sublist of size <code>n - 1</code>.<br/>• <b>Recurrence:</b><br/>&nbsp;&nbsp;T(n) = T(n - 1) + c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(n - 2) + c<sub>2</sub>(n - 1) + c<sub>2</sub>n<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= T(n - 3) + c<sub>2</sub>(n - 2) + c<sub>2</sub>(n - 1) + c<sub>2</sub>n = ...<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= c<sub>2</sub> [ 1 + 2 + 3 + ... + n ] = c<sub>2</sub> &middot; [ n(n + 1) / 2 ] = <b>O(n<sup>2</sup>)</b>.", body_style))

    story.append(Paragraph("<b>2. Best-Case Analysis: O(n log n) (PPT Slides 68-70)</b>", h3_style))
    story.append(Paragraph("• <b>Condition:</b> Occurs when each partition divides the list into <b>two equal-sized sublists</b> (size &asymp; n/2).<br/>• <b>Recurrence:</b><br/>&nbsp;&nbsp;T(n) = 2T(n/2) + c<sub>2</sub>n (identical to Merge Sort)<br/>&nbsp;&nbsp;Solving by repeated substitution: T(n) = 2<sup>k</sup>T(1) + k&middot;c<sub>2</sub>n = c<sub>1</sub>n + c<sub>2</sub>n log<sub>2</sub> n = <b>O(n log n)</b>.", body_style))
    
    story.append(Paragraph("<b>3. Space Complexity:</b> Best/Average stack space = <b>O(log n)</b>; Worst-case stack space = <b>O(n)</b>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q22: Strassen's Matrix Multiplication Algorithm
    # =============================================================
    story.append(create_priority_header("Q22", "Explain Strassen's Matrix Multiplication algorithm with formulas and motivation.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Motivation & Standard Method (PPT Slides 73-77)</b>", h3_style))
    story.append(Paragraph("Standard matrix multiplication for two n &times; n matrices uses 3 nested loops: <code>C[i,j] = &sum; A[i,k]&middot;B[k,j]</code>, requiring <b>n<sup>3</sup> multiplications &rArr; O(n<sup>3</sup>)</b>.<br/>A direct Divide and Conquer splits matrices into four n/2 &times; n/2 blocks, requiring <b>8 multiplications</b> and 4 additions &rArr; T(n) = 8T(n/2) + c<sub>2</sub>n<sup>2</sup> &rArr; <b>O(n<sup>3</sup>)</b> (no improvement).<br/><b>Strassen's Breakthrough:</b> Matrix multiplications are computationally much more expensive than additions (O(n<sup>3</sup>) vs O(n<sup>2</sup>)). Strassen discovered a way to compute C = AB using only <b>7 matrix multiplications and 18 matrix additions/subtractions</b>.", body_style))

    story.append(Paragraph("<b>2. The 7 Strassen Multiplication Formulas (M<sub>1</sub> to M<sub>7</sub>) (PPT Slide 78)</b>", h3_style))
    story.append(Paragraph("• <b>M<sub>1</sub> = (A<sub>11</sub> + A<sub>22</sub>) &times; (B<sub>11</sub> + B<sub>22</sub>)</b><br/>• <b>M<sub>2</sub> = (A<sub>21</sub> + A<sub>22</sub>) &times; B<sub>11</sub></b><br/>• <b>M<sub>3</sub> = A<sub>11</sub> &times; (B<sub>12</sub> &minus; B<sub>22</sub>)</b><br/>• <b>M<sub>4</sub> = A<sub>22</sub> &times; (B<sub>21</sub> &minus; B<sub>11</sub>)</b><br/>• <b>M<sub>5</sub> = (A<sub>11</sub> + A<sub>12</sub>) &times; B<sub>22</sub></b><br/>• <b>M<sub>6</sub> = (A<sub>21</sub> &minus; A<sub>11</sub>) &times; (B<sub>11</sub> + B<sub>12</sub>)</b><br/>• <b>M<sub>7</sub> = (A<sub>12</sub> &minus; A<sub>22</sub>) &times; (B<sub>21</sub> + B<sub>22</sub>)</b>", bullet_style))

    story.append(Paragraph("<b>3. Formulas for Resulting Matrix C Quadrants (PPT Slide 78)</b>", h3_style))
    story.append(Paragraph("• <b>C<sub>11</sub> = M<sub>1</sub> + M<sub>4</sub> &minus; M<sub>5</sub> + M<sub>7</sub></b><br/>• <b>C<sub>12</sub> = M<sub>3</sub> + M<sub>5</sub></b><br/>• <b>C<sub>21</sub> = M<sub>2</sub> + M<sub>4</sub></b><br/>• <b>C<sub>22</sub> = M<sub>1</sub> + M<sub>3</sub> &minus; M<sub>2</sub> + M<sub>6</sub></b>", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q23: Analyze Strassen's Matrix Multiplication Recurrence
    # =============================================================
    story.append(create_priority_header("Q23", "Analyze Strassen's Matrix Multiplication using recurrence relation and derive O(n^2.81).", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Formulation of Recurrence (PPT Slide 79)</b>", h3_style))
    story.append(Paragraph("Since Strassen performs 7 multiplications on matrices of size n/2 and 18 additions of size n/2 &times; n/2 (costing c<sub>2</sub>n<sup>2</sup>):<br/>• <b>T(n) = c<sub>1</sub></b>, for n &le; 2<br/>• <b>T(n) = 7T(n/2) + c<sub>2</sub>n<sup>2</sup></b>, for n &gt; 2", body_style))

    story.append(Paragraph("<b>2. Derivation by Repeated Substitution (PPT Slide 80)</b>", h3_style))
    story.append(Paragraph("Assume n = 2<sup>k</sup>, so k = log<sub>2</sub> n:<br/>T(n) = 7<sup>k</sup> T(1) + c<sub>2</sub>n<sup>2</sup> [ 1 + (7/4) + (7/4)<sup>2</sup> + (7/4)<sup>3</sup> + ... + (7/4)<sup>k-1</sup> ]<br/>Using the geometric series formula S<sub>k</sub> = a (r<sup>n</sup> - 1) / (r - 1) with r = 7/4 &gt; 1:<br/>= 7<sup>log<sub>2</sub> n</sup> c<sub>1</sub> + c<sub>2</sub>n<sup>2</sup> &middot; (7/4)<sup>log<sub>2</sub> n</sup><br/>= c<sub>1</sub> n<sup>log<sub>2</sub> 7</sup> + c<sub>2</sub> n<sup>log<sub>2</sub> 4</sup> &middot; ( n<sup>log<sub>2</sub> 7 &minus; log<sub>2</sub> 4</sup> )<br/>= c<sub>1</sub> n<sup>log<sub>2</sub> 7</sup> + c<sub>2</sub> n<sup>log<sub>2</sub> 7</sup><br/>= <b>O(n<sup>log<sub>2</sub> 7</sup>) &asymp; O(n<sup>2.807</sup>) &asymp; O(n<sup>2.81</sup>)</b>.", body_style))
    story.append(create_callout_box(
        "<b>Exam Comparison:</b> Standard Matrix Multiplication is O(n<sup>3</sup>). Strassen's Algorithm is O(n<sup>2.81</sup>). For large matrices (n &gt; 1000), Strassen provides massive speedups.",
        "Performance Note"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q24: General Recurrence Relation in Divide and Conquer
    # =============================================================
    story.append(create_priority_header("Q24", "Explain the General Recurrence Relation used in Divide and Conquer and Master Theorem.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Standard Form:</b> <b>T(n) = a T(n/b) + f(n)</b><br/>• <b>a &ge; 1:</b> Number of subproblems generated.<br/>• <b>b &gt; 1:</b> Factor by which the input size is reduced.<br/>• <b>f(n):</b> Time required to divide the problem and combine subproblem solutions.", body_style))
    story.append(Paragraph("<b>2. Master Theorem Rules (for f(n) = &Theta;(n<sup>d</sup>)):</b><br/>• <b>Case 1 (a &gt; b<sup>d</sup>):</b> T(n) = <b>&Theta;(n<sup>log<sub>b</sub> a</sup>)</b> (dominated by leaf subproblems).<br/>• <b>Case 2 (a = b<sup>d</sup>):</b> T(n) = <b>&Theta;(n<sup>d</sup> log n)</b> (equal work at all tree levels).<br/>• <b>Case 3 (a &lt; b<sup>d</sup>):</b> T(n) = <b>&Theta;(n<sup>d</sup>)</b> (dominated by root divide/combine work).", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q25 & Q26: Iterative vs Recursive Binary Search
    # =============================================================
    story.append(create_priority_header("Q25", "Write the Iterative Binary Search Algorithm.", "HIGH"))
    story.append(create_code_block("""Algorithm BinSearch(a, n, x)
// a is an array of size n in ascending order, x is the key to search
{
    low := 1; high := n;
    while ( low <= high ) do
    {
        mid := (low + high) / 2;
        if ( x < a[mid] ) then high := mid - 1;
        else if ( x > a[mid] ) then low := mid + 1;
        else return mid;                   // Key found at mid
    }
    return 0;                               // Key not found
}""", "Iterative Binary Search"))
    story.append(Spacer(1, 6))

    story.append(create_priority_header("Q26", "Write the Recursive Binary Search Algorithm.", "HIGH"))
    story.append(create_code_block("""Algorithm BinSrch(a, low, high, x)
// Given array a[low:high] in increasing order, return j such that x=a[j], else 0
{
    if ( low = high ) then                 // If Small(P)
    {
        if ( x = a[low] ) then return low;
        else return 0;
    }
    else
    {
        mid := (low + high) / 2;
        if ( x = a[mid] ) then return mid;
        else if ( x < a[mid] ) then
            return BinSrch(a, low, mid - 1, x);
        else
            return BinSrch(a, mid + 1, high, x);
    }
}""", "Recursive Binary Search"))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q27: Divide, Conquer and Combine Steps of Merge Sort
    # =============================================================
    story.append(create_priority_header("Q27", "Explain the Divide, Conquer and Combine Steps of Merge Sort.", "HIGH"))
    story.append(Paragraph("1. <b>Divide:</b> The array <code>a[low:high]</code> of size n is divided into two halves by finding the middle position <code>mid = (low + high)/2</code> in <b>O(1) time</b>.<br/>2. <b>Conquer:</b> The two subarrays <code>a[low:mid]</code> and <code>a[mid+1:high]</code> are sorted independently by recursive invocations of <code>MergeSort</code> until subproblems contain 1 element.<br/>3. <b>Combine:</b> The two sorted subarrays are merged into a single sorted array by <code>Merge(low, mid, high)</code> in <b>O(n) time</b> using an auxiliary buffer array <code>b[]</code>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q28: Complete Merge() Algorithm
    # =============================================================
    story.append(create_priority_header("Q28", "Write the complete Merge() algorithm.", "HIGH"))
    story.append(create_code_block("""Algorithm Merge(low, mid, high)
// a[low:mid] and a[mid+1:high] are two sorted subsets in global array a.
// b[] is a temporary global array. Merges two sets into a[low:high].
{
    h := low; j := mid + 1; i := low;
    while ( h <= mid ) and ( j <= high ) do
    {
        if ( a[h] <= a[j] ) then { b[i] := a[h]; h := h + 1; }
        else                      { b[i] := a[j]; j := j + 1; }
        i := i + 1;
    }
    if ( h > mid ) then
        for k := j to high do { b[i] := a[k]; i := i + 1; }
    else
        for k := h to mid do  { b[i] := a[k]; i := i + 1; }
    for k := low to high do a[k] := b[k];      // Copy back to original array
}""", "Algorithm Merge(low, mid, high)"))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q29: Quick Sort and Partition Algorithms
    # =============================================================
    story.append(create_priority_header("Q29", "Write the complete Quick Sort and Partition algorithms.", "HIGH"))
    story.append(create_code_block("""Algorithm Partition(low, high)
{
    pivot := a[low]; i := low; j := high + 1;
    while ( i < j ) do
    {
        i++;
        while ( a[i] < pivot ) do i++;
        j--;
        while ( a[j] > pivot ) do j--;
        if ( i < j ) then Interchange(i, j);    // Swap out-of-place elements
    }
    Interchange(low, j);                         // Place pivot in correct position
    return j;
}

Algorithm interchange(x, y)
{
    temp := a[x]; a[x] := a[y]; a[y] := temp;
}""", "Algorithm Partition & Interchange"))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q30: Comparison of Merge Sort and Quick Sort
    # =============================================================
    story.append(create_priority_header("Q30", "Compare Merge Sort and Quick Sort in detail.", "HIGH"))
    story.append(Spacer(1, 4))
    
    mq_compare_data = [
        [Paragraph("<b>Feature / Metric</b>", table_header_style), Paragraph("<b>Merge Sort</b>", table_header_style), Paragraph("<b>Quick Sort</b>", table_header_style)],
        [Paragraph("<b>Paradigm</b>", table_cell_bold), Paragraph("Divide and Conquer", table_cell_style), Paragraph("Divide and Conquer", table_cell_style)],
        [Paragraph("<b>Best-Case Time</b>", table_cell_bold), Paragraph("<b>O(n log n)</b>", table_cell_center), Paragraph("<b>O(n log n)</b>", table_cell_center)],
        [Paragraph("<b>Average-Case Time</b>", table_cell_bold), Paragraph("<b>O(n log n)</b>", table_cell_center), Paragraph("<b>O(n log n)</b>", table_cell_center)],
        [Paragraph("<b>Worst-Case Time</b>", table_cell_bold), Paragraph("<b>O(n log n)</b> (Guaranteed)", table_cell_center), Paragraph("<b>O(n<sup>2</sup>)</b> (Already sorted)", table_cell_center)],
        [Paragraph("<b>Auxiliary Space</b>", table_cell_bold), Paragraph("<b>O(n)</b> (Requires buffer array b)", table_cell_style), Paragraph("<b>O(log n)</b> stack space (In-place)", table_cell_style)],
        [Paragraph("<b>Sorting Location</b>", table_cell_bold), Paragraph("Not in-place (requires extra array)", table_cell_style), Paragraph("<b>In-place</b> sorting", table_cell_style)],
        [Paragraph("<b>Stability</b>", table_cell_bold), Paragraph("<b>Stable</b> (preserves duplicate order)", table_cell_style), Paragraph("<b>Unstable</b> (swaps across pivot)", table_cell_style)],
        [Paragraph("<b>Primary Work Phase</b>", table_cell_bold), Paragraph("In the <b>Combine</b> (Merge) phase", table_cell_style), Paragraph("In the <b>Divide</b> (Partition) phase", table_cell_style)],
        [Paragraph("<b>Data Structure Preference</b>", table_cell_bold), Paragraph("Excellent for Linked Lists & External files", table_cell_style), Paragraph("Faster in practice for contiguous Arrays", table_cell_style)]
    ]
    t_mq = Table(mq_compare_data, colWidths=[130, 195, 198.27])
    t_mq.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_mq)
    story.append(Spacer(1, 14))

    return story

print("booklet_content_u2.py initialized successfully!")
