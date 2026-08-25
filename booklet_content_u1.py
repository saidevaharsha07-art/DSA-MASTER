import os
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, PageBreak
from booklet_styles import (
    h3_style, h4_style, body_style, body_bold, bullet_style,
    table_header_style, table_cell_style, table_cell_bold, table_cell_center, table_cell_mono,
    create_code_block, create_callout_box, create_priority_header, create_unit_banner,
    PRIMARY, SECONDARY, ACCENT_RED, ACCENT_GREEN, ACCENT_YELLOW, TABLE_ROW_ALT,
    CALLOUT_BG_BLUE, CALLOUT_BG_RED, CALLOUT_BG_GREEN, CALLOUT_BG_AMBER
)

def get_unit1_content():
    story = []
    
    # -------------------------------------------------------------
    # UNIT-I OVERVIEW & BANNER
    # -------------------------------------------------------------
    story.append(create_unit_banner(
        "UNIT-I",
        "ALGORITHM BASICS, PSEUDOCODE, STEP COUNTING & ANALYSIS OF ALGORITHMS",
        [
            "1. Asymptotic Notations: Big-Oh (O), Omega (\u03A9), Theta (\u0398), Little-oh (o)",
            "2. Time Complexity & Program-Step Counting (Method I Count Variable & Method II Tabular Method)",
            "3. Space Complexity Components: S(P) = C + Sp(I) (Fixed vs Variable/Stack Space)",
            "4. Best, Worst & Average Case Analysis using Sequential Search",
            "5. Rate of Growth of Functions & Asymptotic Ordering",
            "6. Probabilistic Analysis: The Hiring Problem (Expected Cost O(ch ln n))",
            "7. Graph Basics: Connected Components, Biconnected Components & Articulation Points"
        ]
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q1: Asymptotic Notations O, Ω, Θ, o
    # =============================================================
    story.append(create_priority_header("Q1", "Explain Asymptotic Notations (O, \u03A9, \u0398, and o) with suitable examples.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Need for Asymptotic Analysis</b>", h3_style))
    story.append(Paragraph("In algorithm analysis, exact execution time varies across machines, compilers, and hardware. <b>Asymptotic efficiency</b> analyzes the behavior of algorithm running times as the input size <i>n</i> becomes very large (i.e., for large values of <i>n</i>). It allows us to compare algorithms by focusing on their <b>rate of growth</b>, ignoring low-order terms and constant multipliers.", body_style))
    
    story.append(Paragraph("<b>2. Definitions, Formulas & PPT Examples</b>", h3_style))
    
    notations_table_data = [
        [
            Paragraph("<b>Notation</b>", table_header_style),
            Paragraph("<b>Formal Definition</b>", table_header_style),
            Paragraph("<b>Intuitive Meaning</b>", table_header_style),
            Paragraph("<b>PPT Examples & Proofs</b>", table_header_style)
        ],
        [
            Paragraph("<b>Big-Oh<br/>O(g(n))</b>", table_cell_bold),
            Paragraph("f(n) = O(g(n)) &hArr; &exist; positive constants c and n<sub>0</sub> such that:<br/><b>f(n) &le; c &middot; g(n)</b>, &forall; n &ge; n<sub>0</sub>", table_cell_style),
            Paragraph("<b>Upper Bound</b><br/>f(n) grows slower than or at the same rate as g(n). Think of as &ldquo;&le;&rdquo;.", table_cell_style),
            Paragraph("• f(n) = 3n + 2 &le; 4n (&forall; n &ge; 2) &rArr; <b>O(n)</b><br/>• f(n) = 10n<sup>2</sup> + 4n + 2 &le; 11n<sup>2</sup> (&forall; n &ge; 5) &rArr; <b>O(n<sup>2</sup>)</b><br/>• f(n) = 6&middot;2<sup>n</sup> + n<sup>2</sup> &le; 7&middot;2<sup>n</sup> (&forall; n &ge; 4) &rArr; <b>O(2<sup>n</sup>)</b>", table_cell_style)
        ],
        [
            Paragraph("<b>Omega<br/>&Omega;(g(n))</b>", table_cell_bold),
            Paragraph("f(n) = &Omega;(g(n)) &hArr; &exist; positive constants c and n<sub>0</sub> such that:<br/><b>f(n) &ge; c &middot; g(n)</b>, &forall; n &ge; n<sub>0</sub>", table_cell_style),
            Paragraph("<b>Lower Bound</b><br/>f(n) grows faster than or at the same rate as g(n). Think of as &ldquo;&ge;&rdquo;.", table_cell_style),
            Paragraph("• f(n) = 3n + 2 &ge; 3n (&forall; n &ge; 1) &rArr; <b>&Omega;(n)</b><br/>• f(n) = 10n<sup>2</sup> + 4n + 2 &ge; 1&middot;n<sup>2</sup> (&forall; n &ge; 1) &rArr; <b>&Omega;(n<sup>2</sup>)</b><br/>• Also &Omega;(n) since 10n<sup>2</sup>+4n+2 &ge; n (&forall; n &ge; 0)", table_cell_style)
        ],
        [
            Paragraph("<b>Theta<br/>&Theta;(g(n))</b>", table_cell_bold),
            Paragraph("f(n) = &Theta;(g(n)) &hArr; &exist; positive constants c<sub>1</sub>, c<sub>2</sub>, n<sub>0</sub> such that:<br/><b>c<sub>1</sub>&middot;g(n) &le; f(n) &le; c<sub>2</sub>&middot;g(n)</b>, &forall; n &ge; n<sub>0</sub>", table_cell_style),
            Paragraph("<b>Tight Bound</b><br/>f(n) grows at exactly the same rate as g(n). Think of as &ldquo;=&rdquo;.", table_cell_style),
            Paragraph("• f(n) = 3n + 2: 3n &le; 3n+2 &le; 4n (&forall; n &ge; 2) &rArr; <b>&Theta;(n)</b><br/>• f(n) = 10n<sup>2</sup> + 4n + 2: 1n<sup>2</sup> &le; f(n) &le; 11n<sup>2</sup> (&forall; n &ge; 5) &rArr; <b>&Theta;(n<sup>2</sup>)</b>", table_cell_style)
        ],
        [
            Paragraph("<b>Little-oh<br/>o(g(n))</b>", table_cell_bold),
            Paragraph("f(n) = o(g(n)) &hArr; <b>lim<sub>n&rarr;&infin;</sub> [ f(n) / g(n) ] = 0</b><br/>Strict upper bound for all c > 0.", table_cell_style),
            Paragraph("<b>Strict Upper Bound</b><br/>f(n) grows strictly slower than g(n). Think of as &ldquo;&lt;&rdquo;.", table_cell_style),
            Paragraph("• f(n) = 3n + 2 = <b>o(n<sup>2</sup>)</b> since lim (3n+2)/n<sup>2</sup> = 0<br/>• <b>However, 3n + 2 &ne; o(n)</b> since limit is 3 &ne; 0", table_cell_style)
        ]
    ]
    
    t_not = Table(notations_table_data, colWidths=[65, 160, 130, 168.27])
    t_not.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
    ]))
    story.append(t_not)
    story.append(Spacer(1, 6))

    if os.path.exists('diagrams/diag_asymptotic.png'):
        story.append(Image('diagrams/diag_asymptotic.png', width=520, height=130))
        story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. Important Asymptotic Properties (Exam Reference)</b>", h3_style))
    story.append(Paragraph("• <b>Transitivity:</b> If f(n) = O(g(n)) and g(n) = O(h(n)), then f(n) = O(h(n)).<br/>• <b>Reflexivity:</b> f(n) = O(f(n)), f(n) = &Omega;(f(n)), f(n) = &Theta;(f(n)).<br/>• <b>Symmetry:</b> f(n) = &Theta;(g(n)) &hArr; g(n) = &Theta;(f(n)).<br/>• <b>Transpose Symmetry:</b> f(n) = O(g(n)) &hArr; g(n) = &Omega;(f(n)).<br/>• <b>Tight Bound Principle:</b> We always prefer the smallest/tightest upper bound (e.g., 10n<sup>2</sup>+4n+2 is O(n<sup>2</sup>), not O(n<sup>3</sup>)).", bullet_style))
    
    story.append(create_callout_box(
        "<b>Exam Summary:</b> Big-Oh (O) provides worst-case/upper bound guarantee; Omega (&Omega;) provides lower bound guarantee; Theta (&Theta;) provides exact/tight growth rate; Little-oh (o) defines strictly non-tight asymptotic dominance.",
        "Exam Conclusion & Rule of Thumb",
        bg_color=CALLOUT_BG_GREEN,
        border_color=ACCENT_GREEN
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q2: Time Complexity & Program-Step Counting
    # =============================================================
    story.append(create_priority_header("Q2", "Explain Time Complexity and Program-Step Counting with suitable examples.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Definition of Time Complexity</b>", h3_style))
    story.append(Paragraph("The <b>Time Complexity</b> T(P) of a program P is the sum of its compile time C and its run time T<sub>P</sub>(I):<br/><b>T(P) = C + T<sub>P</sub>(I)</b><br/>• <i>Compile time (C):</i> Does not depend on the instance characteristics (number of inputs n).<br/>• <i>Run time T<sub>P</sub>(I):</i> Depends directly on the number of inputs (instance characteristics). In DAA, we concentrate on estimating T<sub>P</sub>(I).", body_style))
    
    story.append(Paragraph("<b>2. Concept of a Program Step</b>", h3_style))
    story.append(Paragraph("A <b>program step</b> is defined as a syntactically or semantically meaningful program statement whose execution time is independent of the number of inputs.<br/><i>Examples:</i> <code>c := a + b;</code> (1 step), <code>sum := sum + a[i];</code> (1 step).", body_style))
    
    story.append(Paragraph("<b>3. Step-Counting Rules from PPT</b>", h3_style))
    story.append(Paragraph("1. <b>Comments:</b> Contributed step count = 0.<br/>2. <b>Assignment Statements:</b> Statements without function calls = 1 step.<br/>3. <b>Loop Control Statements (for, while, repeat-until):</b> We consider step counts for the control part. Each execution of the control condition is 1 step, unless expressions depend on instance characteristics.<br/>4. <b>Conditionals (if-then-else):</b> Evaluation of condition is 1 step.<br/>5. <b>Function Calls:</b> Equal to the number of steps assignable to the function invocation plus 1.", bullet_style))
    
    story.append(Paragraph("<b>4. Step-Counting Method I: Introduce Global Variable <code>count</code></b>", h3_style))
    story.append(create_code_block("""Algorithm sum(a, n)
// Iterative sum of n numbers
{
    s := 0;
    count := count + 1;            // for assignment statement s:=0
    for i := 1 to n do
    {
        count := count + 1;        // for 'for' loop condition check
        s := s + a[i];
        count := count + 1;        // for assignment statement
    }
    count := count + 1;            // for last failing check of 'for' (i = n+1)
    return s;
    count := count + 1;            // for return statement
}
// Total Step Count = 1 + n + n + 1 + 1 = 2n + 3 steps -> O(n)""", "Method I: Step Count for Iterative Sum"))
    story.append(Spacer(1, 4))
    
    story.append(create_callout_box(
        "<b>Key Takeaway:</b> Step count reveals exactly how the runtime changes with variations in input size n. For iterative sum, T(n) = 2n + 3 = O(n).",
        "Exam Tip"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q3: Space Complexity and its Components
    # =============================================================
    story.append(create_priority_header("Q3", "Explain Space Complexity and its components with formulas and examples.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Definition and Formula</b>", h3_style))
    story.append(Paragraph("The <b>Space Complexity</b> of an algorithm is the total amount of memory required by the program to execute to completion.<br/>As per the PPT, the total space S(P) of any program P is divided into two distinct components:<br/><b>S(P) = C + S<sub>P</sub>(Instance characteristics)</b>", body_style))
    
    story.append(Paragraph("<b>2. Two Space Components</b>", h3_style))
    story.append(Paragraph("• <b>i) Fixed Space Requirements (C):</b> Independent of instance characteristics (input size n). It includes:<br/>&nbsp;&nbsp;- <i>Instruction space / Program space:</i> Memory required to store the compiled machine instructions.<br/>&nbsp;&nbsp;- <i>Simple variables and constants:</i> Fixed space allocated for simple primitive data types and constants.<br/>• <b>ii) Variable Space Requirements (S<sub>P</sub>(I)):</b> Directly depends on instance characteristics I. It includes:<br/>&nbsp;&nbsp;- <i>Dynamically allocated memory:</i> Memory allocated at runtime based on input size n.<br/>&nbsp;&nbsp;- <i>Recursive stack space:</i> Space for formal parameters, local variables, and return addresses pushed to stack during recursive function calls.", body_style))

    story.append(Paragraph("<b>3. PPT Solved Examples</b>", h3_style))
    
    space_table_data = [
        [
            Paragraph("<b>Algorithm</b>", table_header_style),
            Paragraph("<b>Code / Logic</b>", table_header_style),
            Paragraph("<b>Instance Characteristics Analysis</b>", table_header_style),
            Paragraph("<b>Variable Space S<sub>P</sub>(I)</b>", table_header_style)
        ],
        [
            Paragraph("<b>Example 1:<br/>Simple Arithmetic<br/>abc(a, b, c)</b>", table_cell_bold),
            Paragraph("<code>Algorithm abc(a,b,c)<br/>{<br/>&nbsp;return a+b+b*c+(a+b-c)/(a+b)+4.0;<br/>}</code>", table_cell_style),
            Paragraph("Problem instance is characterized by values a, b, c. Assuming 1 word (4 bytes) stores each variable, memory does not scale with input size.", table_cell_style),
            Paragraph("<b>S<sub>abc</sub>(I) = 0</b><br/>(Only fixed space C required; O(1))", table_cell_bold)
        ],
        [
            Paragraph("<b>Example 2:<br/>Iterative Sum<br/>sum(a, n)</b>", table_cell_bold),
            Paragraph("<code>Algorithm sum(a,n)<br/>{<br/>&nbsp;s:=0;<br/>&nbsp;for i:=1 to n do s:=s+a[i];<br/>&nbsp;return s;<br/>}</code>", table_cell_style),
            Paragraph("Problem instance is characterized by n. Space depends on the array <code>a</code> of size n passed to the function.", table_cell_style),
            Paragraph("<b>S<sub>sum</sub>(n) = n</b><br/>(Linear data space; O(n))", table_cell_bold)
        ],
        [
            Paragraph("<b>Example 3:<br/>Recursive Sum<br/>RSum(a, n)</b>", table_cell_bold),
            Paragraph("<code>Algorithm RSum(a,n)<br/>{<br/>&nbsp;if(n&le;0) return 0;<br/>&nbsp;else return RSum(a,n-1)+a[n];<br/>}</code>", table_cell_style),
            Paragraph("Per recursive call frame on stack:<br/>• formal param <code>a</code> (pointer/ref) = 2 bytes<br/>• formal param <code>n</code> (int) = 2 bytes<br/>• return address (internal) = 2 bytes<br/><b>Total per call = 6 bytes</b>. Depth = n.", table_cell_style),
            Paragraph("<b>S<sub>RSum</sub>(n) = 6n</b><br/>(Recursive stack space; O(n))", table_cell_bold)
        ]
    ]
    
    t_sp = Table(space_table_data, colWidths=[90, 155, 180, 98.27])
    t_sp.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
    ]))
    story.append(t_sp)
    story.append(Spacer(1, 6))

    story.append(create_callout_box(
        "<b>Exam Tip:</b> In analysis, we focus purely on estimating S<sub>P</sub>(I) and ignore the fixed constant C because C remains constant across all input sizes.",
        "Space Complexity Conclusion"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q4: Best, Worst and Average Case Analysis (Sequential Search)
    # =============================================================
    story.append(create_priority_header("Q4", "Explain Best-Case, Worst-Case and Average-Case Analysis using Sequential Search.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Concept & Definitions</b>", h3_style))
    story.append(Paragraph("All inputs of a given size <i>n</i> do not necessarily take the same number of program steps. Therefore, we categorize performance into three cases:<br/>• <b>Best-Case Step Count:</b> Minimum number of steps taken by the algorithm for any input of size n.<br/>• <b>Worst-Case Step Count:</b> Maximum number of steps taken by the algorithm for any input of size n.<br/>• <b>Average-Case Step Count:</b> Average / expected number of steps taken across all possible inputs of size n.", body_style))
    
    story.append(Paragraph("<b>2. Algorithm: Sequential Search</b>", h3_style))
    story.append(create_code_block("""Algorithm sequentialSrch(a, n, key)
// Begins at first element and inspects each element in turn until key is found
{
    for i := 1 to n do
    {
        if ( a[i] = key ) then
        {
            return i;    // Key found at index i
        }
    }
    return 0;            // Key not present in array
}""", "Sequential Search Pseudocode"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. PPT Example Walkthrough on Array a[ ] = { 2, 5, 7, 8, 9 } (n = 5)</b>", h3_style))
    
    case_table_data = [
        [
            Paragraph("<b>Case</b>", table_header_style),
            Paragraph("<b>Condition / Search Key</b>", table_header_style),
            Paragraph("<b>Comparisons</b>", table_header_style),
            Paragraph("<b>Time Complexity</b>", table_header_style)
        ],
        [
            Paragraph("<b>Best Case</b>", table_cell_bold),
            Paragraph("Key is at first position (e.g., <b>key = 2</b>). Loop terminates in 1st iteration.", table_cell_style),
            Paragraph("<b>1 comparison</b>", table_cell_center),
            Paragraph("<b>O(1) / &Theta;(1)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>Worst Case</b>", table_cell_bold),
            Paragraph("Key is at last position (e.g., <b>key = 9</b>) or <b>key is not present</b>.", table_cell_style),
            Paragraph("<b>n comparisons</b> (5)", table_cell_center),
            Paragraph("<b>O(n) / &Theta;(n)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>Average Case</b>", table_cell_bold),
            Paragraph("Key is equally likely to be at any index 1..n.<br/>Sum of steps for all positions divided by total inputs:<br/><b>Avg = (1 + 2 + 3 + ... + n) / n = n(n+1)/(2n) = (n+1)/2</b>", table_cell_style),
            Paragraph("<b>(n+1)/2 comparisons</b><br/>(3 for n=5)", table_cell_center),
            Paragraph("<b>O(n) / &Theta;(n)</b>", table_cell_bold)
        ]
    ]
    t_case = Table(case_table_data, colWidths=[90, 230, 110, 93.27])
    t_case.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
    ]))
    story.append(t_case)
    story.append(Spacer(1, 4))

    if os.path.exists('diagrams/diag_seq_search.png'):
        story.append(Image('diagrams/diag_seq_search.png', width=450, height=120))
        story.append(Spacer(1, 4))

    story.append(create_callout_box(
        "<b>Exam Conclusion:</b> For sequential search, Best-case = O(1), Worst-case = O(n), and Average-case = O(n). Worst-case analysis is the standard benchmark in computer science because it guarantees an upper bound on running time.",
        "Conclusion"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q5: Largest of n numbers algorithm & complexity
    # =============================================================
    story.append(create_priority_header("Q5", "Write an algorithm to find the largest of n numbers and analyze its complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Problem Statement & Algorithm</b>", h3_style))
    story.append(Paragraph("Given an array <code>a[1:n]</code> containing <i>n</i> numbers, find and return the maximum value in the array.", body_style))
    
    story.append(create_code_block("""Algorithm max(a, n)
// a is an array of size n containing numbers
{
    result := a[1];                  // Assume first element is maximum (1 step)
    for i := 2 to n do               // Loop from 2nd to nth element (n iterations)
    {
        if ( a[i] > result ) then    // Comparison (1 step per iteration)
        {
            result := a[i];          // Update maximum (at most 1 step)
        }
    }
    return result;                   // Return largest number (1 step)
}""", "Algorithm max(a, n)"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>2. Complexity Analysis</b>", h3_style))
    story.append(Paragraph("• <b>Number of Comparisons:</b> The loop runs from <code>i = 2 to n</code>, performing exactly <b>n - 1 comparisons</b>.<br/>• <b>Best-Case Time:</b> Maximum is at <code>a[1]</code>. Condition <code>a[i] > result</code> is always false. Time = (n - 1) comparisons = <b>&Theta;(n)</b>.<br/>• <b>Worst-Case Time:</b> Elements are in strictly increasing order. Assignment <code>result := a[i]</code> executes in every iteration. Time = <b>&Theta;(n)</b>.<br/>• <b>Average-Case Time:</b> <b>&Theta;(n)</b>.<br/>• <b>Space Complexity:</b> Requires <b>O(1) auxiliary space</b> (only variables <code>result</code> and <code>i</code>).", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q6: Tabular Method for Step-Count Analysis
    # =============================================================
    story.append(create_priority_header("Q6", "Explain Step-Count Analysis using the Tabular Method with worked examples.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Procedure of Tabular Method</b>", h3_style))
    story.append(Paragraph("In the <b>Tabular Method</b>, we create a table with four columns: Statement, steps per execution (<b>s/e</b>), <b>frequency</b> (number of times executed), and <b>Total steps</b> (s/e &times; frequency). The total program steps are obtained by summing the total steps column.", body_style))

    story.append(Paragraph("<b>2. Worked Example 1: Iterative Sum of n Numbers (PPT Slide 34)</b>", h4_style))
    
    tab_sum_data = [
        [Paragraph("<b>Statement</b>", table_header_style), Paragraph("<b>s/e</b>", table_header_style), Paragraph("<b>Frequency</b>", table_header_style), Paragraph("<b>Total Steps</b>", table_header_style)],
        [Paragraph("<code>Algorithm sum(a, n)</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<code>{</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;s := 0;</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;for i := 1 to n do</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("n + 1", table_cell_center), Paragraph("n + 1", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;&nbsp;&nbsp;s := s + a[i];</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("n", table_cell_center), Paragraph("n", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;return s;</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center)],
        [Paragraph("<code>}</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<b>Total Steps</b>", table_cell_bold), Paragraph("", table_cell_center), Paragraph("", table_cell_center), Paragraph("<b>2n + 3</b>", table_cell_bold)]
    ]
    t_tab_sum = Table(tab_sum_data, colWidths=[200, 70, 110, 143.27])
    t_tab_sum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, -1), (-1, -1), CALLOUT_BG_AMBER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_tab_sum)
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>3. Worked Example 2: Addition of Two m &times; n Matrices (PPT Slide 35)</b>", h4_style))
    tab_mat_data = [
        [Paragraph("<b>Statement</b>", table_header_style), Paragraph("<b>s/e</b>", table_header_style), Paragraph("<b>Frequency</b>", table_header_style), Paragraph("<b>Total Steps</b>", table_header_style)],
        [Paragraph("<code>Algorithm Add(a, b, c, m, n)</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<code>{</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;for i := 1 to m do</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("m + 1", table_cell_center), Paragraph("m + 1", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;&nbsp;&nbsp;for j := 1 to n do</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("m(n + 1)", table_cell_center), Paragraph("mn + m", table_cell_center)],
        [Paragraph("<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c[i,j] := a[i,j] + b[i,j];</code>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("mn", table_cell_center), Paragraph("mn", table_cell_center)],
        [Paragraph("<code>}</code>", table_cell_mono), Paragraph("0", table_cell_center), Paragraph("--", table_cell_center), Paragraph("0", table_cell_center)],
        [Paragraph("<b>Total Steps</b>", table_cell_bold), Paragraph("", table_cell_center), Paragraph("", table_cell_center), Paragraph("<b>2mn + 2m + 1</b>", table_cell_bold)]
    ]
    t_tab_mat = Table(tab_mat_data, colWidths=[200, 70, 110, 143.27])
    t_tab_mat.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, -1), (-1, -1), CALLOUT_BG_AMBER),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_tab_mat)
    story.append(Spacer(1, 10))

    # =============================================================
    # Q7: Rate of Growth of Functions & Ordering
    # =============================================================
    story.append(create_priority_header("Q7", "Explain Rate of Growth of functions and arrange common functions in increasing order.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Rate of Growth Concept</b>", h3_style))
    story.append(Paragraph("When comparing two algorithms with running times f(n) and g(n), we use rate of growth to characterize how fast each function grows as n &rarr; &infin;. <b>Low-order terms and constants in a function are relatively insignificant for large n.</b>", body_style))
    
    story.append(Paragraph("<b>2. PPT Dominance Table: F(n) = n<sup>2</sup> + 100n + log<sub>10</sub>n + 1000 (PPT Slide 42)</b>", h4_style))
    growth_table_data = [
        [Paragraph("<b>n</b>", table_header_style), Paragraph("<b>f(n) Value</b>", table_header_style), Paragraph("<b>n<sup>2</sup> (%)</b>", table_header_style), Paragraph("<b>100n (%)</b>", table_header_style), Paragraph("<b>log<sub>10</sub>n (%)</b>", table_header_style), Paragraph("<b>1000 (%)</b>", table_header_style)],
        [Paragraph("1", table_cell_center), Paragraph("1,101", table_cell_center), Paragraph("1 (0.1%)", table_cell_center), Paragraph("100 (9.1%)", table_cell_center), Paragraph("0 (0.0%)", table_cell_center), Paragraph("1000 (90.83%)", table_cell_center)],
        [Paragraph("10", table_cell_center), Paragraph("2,101", table_cell_center), Paragraph("100 (4.76%)", table_cell_center), Paragraph("1,000 (47.6%)", table_cell_center), Paragraph("1 (0.05%)", table_cell_center), Paragraph("1,000 (47.60%)", table_cell_center)],
        [Paragraph("100", table_cell_center), Paragraph("21,002", table_cell_center), Paragraph("10,000 (47.6%)", table_cell_center), Paragraph("10,000 (47.6%)", table_cell_center), Paragraph("2 (0.001%)", table_cell_center), Paragraph("1,000 (4.76%)", table_cell_center)],
        [Paragraph("1,000", table_cell_center), Paragraph("1,101,003", table_cell_center), Paragraph("1,000,000 (<b>90.8%</b>)", table_cell_center), Paragraph("100,000 (9.1%)", table_cell_center), Paragraph("3 (0.0003%)", table_cell_center), Paragraph("1,000 (0.09%)", table_cell_center)],
        [Paragraph("10,000", table_cell_center), Paragraph("101,001,004", table_cell_center), Paragraph("100,000,000 (<b>99.0%</b>)", table_cell_center), Paragraph("1,000,000 (0.99%)", table_cell_center), Paragraph("4 (0.0%)", table_cell_center), Paragraph("1,000 (0.001%)", table_cell_center)]
    ]
    t_growth = Table(growth_table_data, colWidths=[55, 100, 95, 95, 85, 93.27])
    t_growth.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_growth)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<i>Conclusion from table:</i> As n grows to 10,000, the leading term n<sup>2</sup> contributes <b>99.0%</b> of the total value. Hence, <code>n<sup>2</sup> + 100n + log<sub>10</sub>n + 1000 ~ n<sup>2</sup></code>.", body_style))

    story.append(Paragraph("<b>3. Common Functions Ordered by Rate of Growth (Strictly Increasing)</b>", h3_style))
    story.append(Paragraph("<b>1 &lt; log n &lt; n &lt; n log n &lt; n<sup>2</sup> &lt; n<sup>3</sup> &lt; 2<sup>n</sup> &lt; n!</b>", ParagraphStyle('GrowthOrd', fontName='Helvetica-Bold', fontSize=10, textColor=ACCENT_RED, alignment=1, spaceBefore=3, spaceAfter=4)))

    f_order_data = [
        [Paragraph("<b>Function</b>", table_header_style), Paragraph("<b>Growth Category Name</b>", table_header_style), Paragraph("<b>Value at n = 16</b>", table_header_style), Paragraph("<b>Value at n = 32</b>", table_header_style)],
        [Paragraph("1", table_cell_bold), Paragraph("Constant", table_cell_style), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center)],
        [Paragraph("log n", table_cell_bold), Paragraph("Logarithmic", table_cell_style), Paragraph("4", table_cell_center), Paragraph("5", table_cell_center)],
        [Paragraph("n", table_cell_bold), Paragraph("Linear", table_cell_style), Paragraph("16", table_cell_center), Paragraph("32", table_cell_center)],
        [Paragraph("n log n", table_cell_bold), Paragraph("Log-Linear / n-log-n", table_cell_style), Paragraph("64", table_cell_center), Paragraph("160", table_cell_center)],
        [Paragraph("n<sup>2</sup>", table_cell_bold), Paragraph("Quadratic", table_cell_style), Paragraph("256", table_cell_center), Paragraph("1,024", table_cell_center)],
        [Paragraph("n<sup>3</sup>", table_cell_bold), Paragraph("Cubic", table_cell_style), Paragraph("4,096", table_cell_center), Paragraph("32,768", table_cell_center)],
        [Paragraph("2<sup>n</sup>", table_cell_bold), Paragraph("Exponential", table_cell_style), Paragraph("65,536", table_cell_center), Paragraph("4,294,967,296", table_cell_center)],
        [Paragraph("n!", table_cell_bold), Paragraph("Factorial", table_cell_style), Paragraph("2.09 &times; 10<sup>13</sup>", table_cell_center), Paragraph("2.63 &times; 10<sup>35</sup>", table_cell_center)]
    ]
    t_ford = Table(f_order_data, colWidths=[90, 150, 140, 143.27])
    t_ford.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), SECONDARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_ford)
    story.append(Spacer(1, 10))

    # =============================================================
    # Q8: Characteristics of an Algorithm
    # =============================================================
    story.append(create_priority_header("Q8", "Explain the Characteristics of an Algorithm.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Definition:</b> An <i>algorithm</i> is a finite set of unambiguous steps used to solve a specific computational problem.", body_style))
    story.append(Paragraph("Every valid algorithm must satisfy the following <b>5 Fundamental Characteristics</b> (PPT Slides 3-4):", h3_style))
    story.append(Paragraph("1. <b>Input:</b> Each algorithm must take <b>zero or more</b> externally supplied quantities as input.<br/>2. <b>Output:</b> Each algorithm must produce <b>at least one (or more)</b> outputs/results.<br/>3. <b>Definiteness:</b> Each instruction must be <b>clear, precise, and unambiguous</b>.<br/>&nbsp;&nbsp;&nbsp;<i>PPT Counterexamples:</i> Statements such as <code>&ldquo;add 6 or 7 to x&rdquo;</code> or <code>&ldquo;Compute 5/0&rdquo;</code> are strictly prohibited.<br/>4. <b>Finiteness:</b> The algorithm must terminate after a <b>finite number of steps</b> for all valid test cases.<br/>5. <b>Effectiveness:</b> Every instruction must be basic enough to be carried out <b>feasibly and exactly in a finite amount of time</b> by a human using paper and pencil.", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q9: Pseudocode Conventions & Control Structures
    # =============================================================
    story.append(create_priority_header("Q9", "Explain Pseudocode and its conventions / control structures.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Definition:</b> Pseudocode is an informal, high-level description of an algorithm combining structured programming constructs with natural language (looking like C and Pascal) without strict syntax constraints.", body_style))
    story.append(Paragraph("<b>10 Pseudocode Conventions from PPT (Slides 5-12):</b>", h3_style))
    story.append(Paragraph("1. <b>Comments:</b> Begin with <code>//</code> and continue until the end of the line.<br/>2. <b>Blocks:</b> Indicated with matching braces <code>{</code> and <code>}</code> for compound statements and function bodies.<br/>3. <b>Data Types:</b> Not explicitly declared; types and variable scope (global vs. local) are inferred from context.<br/>4. <b>Assignment Statement:</b> Represented using the assignment symbol <code>&lt;variable&gt; := &lt;expression&gt;</code>.<br/>5. <b>Boolean & Relational Operators:</b> Boolean values are <code>true</code> and <code>false</code>. Logical operators: <code>and</code>, <code>or</code>, <code>not</code>. Relational operators: <code>&lt;, &le;, =, &ne;, &ge;, &gt;</code>.<br/>6. <b>Multidimensional Arrays:</b> Accessed using square brackets <code>[ ]</code>, e.g., element (i,j) of array A is denoted <code>A[i,j]</code>.<br/>7. <b>Looping Constructs:</b><br/>&nbsp;&nbsp;• <code>while (condition) do { statement_1; ... statement_n; }</code><br/>&nbsp;&nbsp;• <code>for variable := value1 to value2 step step do { ... }</code> (step is optional, defaults to +1, can be negative).<br/>&nbsp;&nbsp;• <code>repeat &lt;statements&gt; until (condition)</code> (executes as long as condition is false; post-test loop).<br/>8. <b>Conditional Statements:</b> <code>if &lt;condition&gt; then &lt;statement&gt;</code> and <code>if &lt;condition&gt; then &lt;stmt 1&gt; else &lt;stmt 2&gt;</code>.<br/>9. <b>Input / Output:</b> Handled using <code>read</code> and <code>write</code> instructions.<br/>10. <b>Procedures / Functions:</b> Starts with the keyword <code>Algorithm Name(&lt;parameter list&gt;) { body }</code>. Simple variables are passed by <b>value</b>; arrays and records are passed by <b>reference</b>.", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q10: Recursive Algorithms with Factorial Example
    # =============================================================
    story.append(create_priority_header("Q10", "Explain Recursive Algorithms with Factorial as an example.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Concept of Recursion</b>", h3_style))
    story.append(Paragraph("A <b>recursive algorithm</b> is a method where a function solves a problem by calling itself on smaller subproblems of the same type until it reaches a terminating <b>base case</b>.", body_style))
    
    story.append(Paragraph("<b>2. Algorithm: Recursive Factorial (PPT Slide 16)</b>", h3_style))
    story.append(create_code_block("""Algorithm rfactorial(n)
// n is an integer >= 0
{
    fact := 1;
    if ( n = 1 or n = 0 ) then
        return fact;                     // Base Case
    else
        fact := n * rfactorial(n - 1);   // Recursive Call
    return fact;
}""", "Algorithm rfactorial(n)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. Stack Execution Mechanism (PPT Slide 17)</b>", h3_style))
    story.append(Paragraph("Each time a recursive function is called, the current values of parameter <code>n</code>, local variable <code>fact</code>, and the <b>return address</b> of the next instruction are saved in a stack activation frame. When <code>main()</code> invokes <code>rfactorial(3)</code>:<br/>• Call 1: pushes <code>n=3</code>, return address <code>2000</code>.<br/>• Call 2: pushes <code>n=2</code>, return address <code>3000</code>.<br/>• Call 3: pushes <code>n=1</code>, return address <code>4000</code> &rarr; hits base case, returns 1.<br/>• Stack pops upward computing: <code>fact = 2 * 1 = 2</code>, then <code>fact = 3 * 2 = 6</code>, returning 6 to <code>main()</code>.", body_style))
    
    if os.path.exists('diagrams/diag_recursive_stack.png'):
        story.append(Image('diagrams/diag_recursive_stack.png', width=480, height=135))
        story.append(Spacer(1, 4))
        
    story.append(Paragraph("<b>4. Complexity:</b> Time Complexity = <b>&Theta;(n)</b>; Stack Space Complexity = <b>&Theta;(n)</b>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q11: Step Count Analysis for Matrix Addition
    # =============================================================
    story.append(create_priority_header("Q11", "Find and analyze the step count for the Addition of two matrices.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Problem:</b> Given two m &times; n matrices <code>a</code> and <code>b</code>, compute their sum matrix <code>c</code> where <code>c[i,j] = a[i,j] + b[i,j]</code>.", body_style))
    story.append(create_code_block("""Algorithm Add(a, b, c, m, n)
{
    for i := 1 to m do                     // Executed m + 1 times
    {
        for j := 1 to n do                 // Executed m(n + 1) times
        {
            c[i,j] := a[i,j] + b[i,j];    // Executed m * n times
        }
    }
}""", "Algorithm Add(a, b, c, m, n)"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Step-by-Step Derivation:</b><br/>• Outer loop <code>for i := 1 to m do</code> evaluates condition for <code>i = 1, 2, ..., m, m+1</code> &rarr; <b>m + 1 steps</b>.<br/>• Inner loop <code>for j := 1 to n do</code> executes <code>n + 1</code> times for each of the <code>m</code> outer iterations &rarr; <b>m(n + 1) = mn + m steps</b>.<br/>• Inner assignment <code>c[i,j] := a[i,j] + b[i,j]</code> executes exactly <b>mn steps</b>.<br/>• Total Steps = <b>(m + 1) + (mn + m) + mn = 2mn + 2m + 1</b>.<br/>• <b>Asymptotic Complexity:</b> <b>&Theta;(mn)</b>. If m = n (square matrices), Total Steps = <b>2n<sup>2</sup> + 2n + 1 = &Theta;(n<sup>2</sup>)</b>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q12: Recursive Sum Algorithm Analysis & Recurrence
    # =============================================================
    story.append(create_priority_header("Q12", "Analyze the Recursive Sum algorithm and derive its recurrence relation.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(create_code_block("""Algorithm RSum(a, n)
// Recursive sum of first n elements of array a
{
    if ( n <= 0 ) then
        return 0;                         // Base case
    else
        return RSum(a, n - 1) + a[n];     // Recursive invocation
}""", "Algorithm RSum(a, n)"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Recurrence Formulation (PPT Slide 31):</b><br/>When analyzing a recursive program for its step count, we obtain a recursive formula:<br/>• If <code>n = 0</code>: T(0) = <b>2</b> (1 for if-condition check + 1 for return 0).<br/>• If <code>n &gt; 0</code>: T(n) = <b>2 + T(n - 1)</b> (1 for if-condition check + 1 for addition/return + T(n-1) for recursive call).", body_style))
    story.append(Paragraph("<b>2. Solution by Repeated Substitution (PPT Slide 32):</b><br/>t<sub>RSum</sub>(n) = 2 + t<sub>RSum</sub>(n - 1)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2 + 2 + t<sub>RSum</sub>(n - 2) = 2(2) + t<sub>RSum</sub>(n - 2)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2(3) + t<sub>RSum</sub>(n - 3)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2(k) + t<sub>RSum</sub>(n - k)<br/>Substitute k = n:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 2n + t<sub>RSum</sub>(0) = 2n + 2<br/><b>The exact step count for RSum is 2n + 2 &rArr; O(n).</b>", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q13: Probabilistic Analysis & The Hiring Problem
    # =============================================================
    story.append(create_priority_header("Q13", "Explain Probabilistic Analysis using the Hiring Problem.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Problem Scenario (PPT Slide 59)</b>", h3_style))
    story.append(Paragraph("You use an employment agency to hire a new office assistant. The agency sends one candidate each day for <i>n</i> days. You interview each candidate and decide immediately whether to hire them. You want to have the best candidate seen so far at all times. If a candidate is better than the current assistant, you fire the current assistant and hire the new candidate. You always hire candidate 1.", body_style))
    
    story.append(create_code_block("""Hire-Assistant(n)
{
    best := 0;                     // Candidate 0 is a dummy least-qualified candidate
    for i := 1 to n do
    {
        interview candidate i;     // Cost c_i per candidate
        if candidate i is better than candidate best then
        {
            best := i;
            hire candidate i;      // Cost c_h per candidate
        }
    }
}""", "Hire-Assistant(n) Pseudocode"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>2. Cost Model & Cases (PPT Slides 60-65)</b><br/>• Cost to interview: <b>c<sub>i</sub></b>; Cost to hire: <b>c<sub>h</sub></b>. Total cost = <b>n&middot;c<sub>i</sub> + m&middot;c<sub>h</sub></b> (where m = number of hires).<br/>• <b>Best Case:</b> Best candidate arrives on day 1 &rarr; m = 1 &rarr; Cost = <b>n&middot;c<sub>i</sub> + c<sub>h</sub></b>.<br/>• <b>Worst Case:</b> Candidates arrive in strictly increasing order of quality &rarr; hire all n &rarr; Cost = <b>n&middot;c<sub>i</sub> + n&middot;c<sub>h</sub></b>.", body_style))
    
    story.append(Paragraph("<b>3. Average-Case Probabilistic Analysis (PPT Slides 63-65)</b><br/>• There are <b>n!</b> equally likely input permutations.<br/>• Probability P(i) that candidate i is better than all previous i - 1 candidates is <b>1 / i</b>.<br/>&nbsp;&nbsp;<i>PPT Example (n = 4, i = 3):</i> Out of 24 permutations of {1,2,3,4}, exactly 8 have candidate 3 greater than candidate 1 and 2 &rarr; <b>8/24 = 1/3</b>.<br/>• Expected number of candidates hired: <b>E[m] = &sum;<sub>i=1</sub><sup>n</sup> P(i) = &sum;<sub>i=1</sub><sup>n</sup> (1/i) = ln n + 1</b>.<br/>• <b>Expected Hiring Cost = O(c<sub>h</sub> ln n).</b> Total expected cost = <b>O(n&middot;c<sub>i</sub> + c<sub>h</sub> ln n)</b>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q14: Connected Components
    # =============================================================
    story.append(create_priority_header("Q14", "Explain Connected Components in an undirected graph.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Definition:</b> A <b>Connected Component</b> in an undirected graph G is a maximal subgraph in which every pair of vertices is connected by a path (mutually reachable).", body_style))
    story.append(Paragraph("<b>2. Key Characteristics (PPT Slide 67):</b><br/>• A connected component is an equivalence class of vertices under the reachability relation.<br/>• An undirected graph can have multiple disconnected components.<br/>• Inside a component, each vertex is reachable from every other vertex in that component, and no edges exist connecting vertices across different components.", bullet_style))
    story.append(Paragraph("<b>3. Identification Algorithm (PPT Slide 68):</b><br/>Connected components are identified using <b>Depth-First Search (DFS)</b> or <b>Breadth-First Search (BFS)</b> in <b>O(V + E)</b> time.", body_style))
    story.append(Paragraph("<b>4. PPT Example (Slide 66):</b> In an undirected graph with vertices {1, 2, 3, 4, 5, 6, 7}:<br/>• Component 1 = <b>{1, 2, 3, 4}</b><br/>• Component 2 = <b>{5, 6}</b><br/>• Component 3 = <b>{7}</b> (isolated vertex)", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q15: Biconnected Components and Articulation Points
    # =============================================================
    story.append(create_priority_header("Q15", "Explain Biconnected Components and Articulation Points with examples.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Definitions (PPT Slide 69):</b><br/>• <b>Articulation Point (Cut Vertex):</b> A vertex in a connected graph whose removal (along with all edges incident to it) disconnects the remaining graph into two or more connected components.<br/>• <b>Biconnected Component (BCC):</b> A maximal subgraph that remains connected even after removing any single vertex (i.e., contains no articulation points).", body_style))
    story.append(Paragraph("<b>2. PPT Solved Example (Slides 70-71):</b><br/>Consider a connected graph with vertices <code>{0, 1, 2, 3, 4, 5, 6, 7, 8}</code> where vertex 4 acts as a bridge junction between two cycles <code>{0,1,2,3}</code> and <code>{5,6,7,8}</code>:<br/>• <b>Articulation Point:</b> <b>Vertex 4</b> (removing vertex 4 splits the graph into two disconnected components: <code>{0,1,2,3}</code> and <code>{5,6,7,8}</code>).<br/>• Removing any other vertex (e.g., 0, 1, 2, or 3) does not disconnect the graph because alternative paths exist.<br/>• <b>Resulting Biconnected Components:</b><br/>&nbsp;&nbsp;1. <b>BCC 1 = {0, 1, 2, 3, 4}</b><br/>&nbsp;&nbsp;2. <b>BCC 2 = {4, 5, 6, 7, 8}</b>", body_style))
    story.append(Paragraph("<b>3. Algorithmic Determination:</b> DFS using discovery time <code>dfn[u]</code> and lowest reachable ancestor <code>low[u]</code> in <b>O(V + E)</b> time. Root is an articulation point if it has &ge; 2 children; non-root u is an articulation point if <code>low[v] &ge; dfn[u]</code> for some child v.", bullet_style))
    story.append(Spacer(1, 14))

    return story

print("booklet_content_u1.py initialized successfully!")
