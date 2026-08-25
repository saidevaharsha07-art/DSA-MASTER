import os
from reportlab.lib import colors
from reportlab.platypus import Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, PageBreak
from booklet_styles import (
    h3_style, h4_style, body_style, body_bold, bullet_style,
    table_header_style, table_cell_style, table_cell_bold, table_cell_center, table_cell_mono,
    create_code_block, create_callout_box, create_priority_header, create_unit_banner,
    PRIMARY, SECONDARY, ACCENT_RED, ACCENT_GREEN, ACCENT_YELLOW, TABLE_ROW_ALT, CALLOUT_BG_AMBER, CALLOUT_BG_GREEN
)

def get_unit3_content():
    story = []
    
    # -------------------------------------------------------------
    # UNIT-III OVERVIEW & BANNER
    # -------------------------------------------------------------
    story.append(create_unit_banner(
        "UNIT-III",
        "GREEDY METHOD, SPANNING TREES, SHORTEST PATHS & JOB SEQUENCING",
        [
            "1. Greedy Method & Control Abstraction Greedy(a, n)",
            "2. Fractional Knapsack: Formulation, Algorithm & Solved Profit-Ratio Numerical",
            "3. Fractional vs 0/1 Knapsack Comparison & Counterexample",
            "4. Minimum Cost Spanning Trees: Prim's Algorithm (near[] array) & Kruskal's Algorithm",
            "5. Disjoint Sets: Make-Set, Find-Set & Union Operations",
            "6. Single-Source Shortest Path (SSSP): Dijkstra's Algorithm & Numerical Iteration Table",
            "7. Job Sequencing with Deadlines: Greedy Slot Selection & Solved 4, 5 and 7-Job Numericals",
            "8. Comprehensive Numerical Workings for Prim, Kruskal, Dijkstra & Job Sequencing"
        ]
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q31: Greedy Method & Control Abstraction
    # =============================================================
    story.append(create_priority_header("Q31", "Explain the Greedy Method and its Control Abstraction.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Principle & Core Characteristics (PPT Slides 2-3)</b>", h3_style))
    story.append(Paragraph("The <b>Greedy Method</b> is a problem-solving strategy that constructs an optimal solution through a sequence of decisions made one by one in some order.<br/>• <b>Greedy-Choice Property:</b> At each step, the algorithm makes the choice that looks best at the moment (locally optimal choice) without reconsidering previous decisions.<br/>• <b>Irrevocable Decisions:</b> A decision, once made, is usually never changed later.<br/>• <b>Feasible Solution:</b> A subset of inputs that satisfies all given problem constraints.<br/>• <b>Optimal Solution:</b> A feasible solution that optimizes (maximizes or minimizes) the given objective function.", body_style))
    
    story.append(Paragraph("<b>2. Greedy Control Abstraction / General Method (PPT Slide 4)</b>", h3_style))
    story.append(create_code_block("""Algorithm Greedy(a, n)
// a[1:n] contains the n inputs
{
    solution := empty;                          // Initialize empty solution set
    for i := 1 to n do
    {
        x := Select(a);                         // Select next item using greedy criterion
        if Feasible(solution, x) then           // Check if adding x satisfies constraints
            solution := Union(solution, x);      // Include x into solution set
    }
    return solution;
}""", "Greedy Control Abstraction"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. PPT Example & Limitation (PPT Slides 5-10):</b><br/>• <i>Largest k-out-of-n Sum:</i> Greedily picking the largest available number at each step is always optimal.<br/>• <i>Shortest Paths on a Multi-Stage Graph:</i> A greedy local decision at stage 1 may lead to extremely expensive edges in subsequent stages; hence, greedy does not work for all graph topologies.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q32: Fractional Knapsack using Greedy Method
    # =============================================================
    story.append(create_priority_header("Q32", "Explain Fractional Knapsack using the Greedy Method with algorithm and numerical.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Problem Formulation (PPT Slide 11)</b>", h3_style))
    story.append(Paragraph("Given <i>n</i> items with profits <code>p<sub>i</sub> &gt; 0</code> and weights <code>w<sub>i</sub> &gt; 0</code>, and a knapsack of capacity <code>m</code>. We can take fractions of items (<code>0 &le; x<sub>i</sub> &le; 1</code>).<br/><b>Maximize:</b> &sum;<sub>i=1</sub><sup>n</sup> p<sub>i</sub> x<sub>i</sub> &nbsp;&nbsp; <b>Subject to:</b> &sum;<sub>i=1</sub><sup>n</sup> w<sub>i</sub> x<sub>i</sub> &le; m.<br/><b>Greedy Decision Property:</b> Sort and select items in <b>decreasing order of profit/weight ratio (p<sub>i</sub> / w<sub>i</sub>)</b>.", body_style))

    story.append(create_code_block("""Algorithm GreedyKnapsack(m, n)
// p[1:n] and w[1:n] contain profits and weights ordered such that p[i]/w[i] >= p[i+1]/w[i+1]
// m is knapsack capacity and x[1:n] is the output solution vector
{
    for i := 1 to n do x[i] := 0;               // Initialize solution vector
    U := m;                                     // Remaining knapsack capacity
    for i := 1 to n do
    {
        if ( w[i] > U ) then break;             // Cannot take full item
        x[i] := 1;
        U := U - w[i];                          // Deduct weight
    }
    if ( i <= n ) then x[i] := U / w[i];        // Take fractional portion of item i
}
// Time Complexity = O(n) if already sorted, O(n log n) with sorting.""", "Algorithm GreedyKnapsack(m, n)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. PPT Solved Numerical Example (PPT Slides 12-13)</b>", h3_style))
    story.append(Paragraph("<b>Given:</b> n = 5 items, knapsack capacity <b>m = 10 ml</b>.<br/>Weights: <code>w = [4, 8, 2, 6, 1]</code> | Profits: <code>p = [$12, $32, $40, $30, $50]</code>.", body_bold))

    knap_calc_data = [
        [Paragraph("<b>Item (i)</b>", table_header_style), Paragraph("<b>Weight (w<sub>i</sub>)</b>", table_header_style), Paragraph("<b>Profit (p<sub>i</sub>)</b>", table_header_style), Paragraph("<b>Ratio (p<sub>i</sub>/w<sub>i</sub>)</b>", table_header_style), Paragraph("<b>Greedy Rank</b>", table_header_style), Paragraph("<b>Amount Taken (x<sub>i</sub>)</b>", table_header_style), Paragraph("<b>Profit Earned</b>", table_header_style)],
        [Paragraph("Item 5", table_cell_center), Paragraph("1 ml", table_cell_center), Paragraph("$50", table_cell_center), Paragraph("<b>50</b>", table_cell_center), Paragraph("1st", table_cell_center), Paragraph("1 ml (x<sub>5</sub> = 1)", table_cell_center), Paragraph("$50", table_cell_center)],
        [Paragraph("Item 3", table_cell_center), Paragraph("2 ml", table_cell_center), Paragraph("$40", table_cell_center), Paragraph("<b>20</b>", table_cell_center), Paragraph("2nd", table_cell_center), Paragraph("2 ml (x<sub>3</sub> = 1)", table_cell_center), Paragraph("$40", table_cell_center)],
        [Paragraph("Item 4", table_cell_center), Paragraph("6 ml", table_cell_center), Paragraph("$30", table_cell_center), Paragraph("<b>5</b>", table_cell_center), Paragraph("3rd", table_cell_center), Paragraph("6 ml (x<sub>4</sub> = 1)", table_cell_center), Paragraph("$30", table_cell_center)],
        [Paragraph("Item 2", table_cell_center), Paragraph("8 ml", table_cell_center), Paragraph("$32", table_cell_center), Paragraph("<b>4</b>", table_cell_center), Paragraph("4th", table_cell_center), Paragraph("1 ml (x<sub>2</sub> = 1/8)", table_cell_center), Paragraph("$32 &times; 1/8 = $4", table_cell_center)],
        [Paragraph("Item 1", table_cell_center), Paragraph("4 ml", table_cell_center), Paragraph("$12", table_cell_center), Paragraph("<b>3</b>", table_cell_center), Paragraph("5th", table_cell_center), Paragraph("0 ml (x<sub>1</sub> = 0)", table_cell_center), Paragraph("$0", table_cell_center)],
        [Paragraph("<b>Total</b>", table_cell_bold), Paragraph("<b>10 ml</b>", table_cell_center), Paragraph("--", table_cell_center), Paragraph("--", table_cell_center), Paragraph("--", table_cell_center), Paragraph("<b>Solution Vector:<br/>(0, 1/8, 1, 1, 1)</b>", table_cell_bold), Paragraph("<b>$124</b>", table_cell_bold)]
    ]
    t_knap = Table(knap_calc_data, colWidths=[60, 65, 65, 75, 65, 115, 78.27])
    t_knap.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, -1), (-1, -1), CALLOUT_BG_GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_knap)
    story.append(Spacer(1, 10))

    # =============================================================
    # Q33: Compare Fractional Knapsack and 0/1 Knapsack
    # =============================================================
    story.append(create_priority_header("Q33", "Compare Fractional Knapsack and 0/1 Knapsack with counterexample.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Fundamental Difference:</b> In <b>Fractional Knapsack</b>, items are divisible (<code>0 &le; x<sub>i</sub> &le; 1</code>), and the greedy method always yields an optimal solution. In <b>0/1 Knapsack</b>, items are indivisible (<code>x<sub>i</sub> &isin; {0, 1}</code>); greedy strategy fails because choosing by ratio may leave unusable empty space.", body_style))
    
    story.append(Paragraph("<b>2. PPT Counterexample Proving Greedy Fails for 0/1 Knapsack (PPT Slides 17-18)</b>", h3_style))
    story.append(Paragraph("<b>Given:</b> Capacity <b>m = 50 kg</b>. 3 Items:<br/>• Item 1: Weight = 10 kg, Profit = $60 &rarr; Ratio = <b>6</b><br/>• Item 2: Weight = 20 kg, Profit = $100 &rarr; Ratio = <b>5</b><br/>• Item 3: Weight = 30 kg, Profit = $120 &rarr; Ratio = <b>4</b>", body_style))
    
    story.append(Paragraph("• <b>Greedy Approach:</b> Picks Item 1 (10 kg, $60) and Item 2 (20 kg, $100). Total weight = 30 kg. Remaining 20 kg cannot accommodate Item 3 (30 kg). <b>Total Profit = $160</b>.<br/>• <b>Optimal 0/1 Solution:</b> Takes Item 2 (20 kg, $100) and Item 3 (30 kg, $120). Total weight = 50 kg. <b>Total Profit = $220</b>.", body_style))

    if os.path.exists('diagrams/diag_knapsack_compare.png'):
        story.append(Image('diagrams/diag_knapsack_compare.png', width=450, height=130))
        story.append(Spacer(1, 4))

    story.append(create_callout_box(
        "<b>Exam Rule:</b> Fractional Knapsack is solved in O(n log n) using Greedy Method. 0/1 Knapsack cannot be solved optimally by Greedy; it requires Dynamic Programming (O(n&middot;m)) or Branch & Bound.",
        "Key Distinction"
    ))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q34 & Q35: Spanning Tree & Minimum Cost Spanning Tree (MST)
    # =============================================================
    story.append(create_priority_header("Q34", "Define Spanning Tree and explain its properties.", "VERY HIGH"))
    story.append(Paragraph("<b>Definition (PPT Slide 19):</b> A <i>tree</i> is a connected undirected graph that contains no cycles. A <b>Spanning Tree</b> of a connected undirected graph G = (V, E) is a subgraph that is a tree and contains <b>all the vertices of G</b>.", body_style))
    story.append(Paragraph("<b>4 Key Properties (PPT Slide 20):</b><br/>1. For an <i>n</i>-vertex connected graph, any spanning tree contains exactly <b>n - 1 edges</b>.<br/>2. It connects all <i>n</i> vertices in the graph.<br/>3. A spanning tree is minimally connected and contains <b>no cycles</b>.<br/>4. Adding any non-tree edge forms exactly one cycle; removing any tree edge disconnects the graph.", bullet_style))
    story.append(Spacer(1, 6))

    story.append(create_priority_header("Q35", "Explain Minimum Cost Spanning Tree (MST) and its applications.", "VERY HIGH"))
    story.append(Paragraph("<b>Definition (PPT Slide 22):</b> For a weighted connected undirected graph, a <b>Minimum Cost Spanning Tree (MST)</b> is a spanning tree whose sum of edge weights is the smallest among all possible spanning trees:<br/><b>Cost(T) = &sum;<sub>(u,v) &isin; T</sub> cost(u, v) is minimized.</b>", body_style))
    story.append(Paragraph("<b>Applications (PPT Slide 23):</b><br/>• <b>Computer Networks & Wiring:</b> Finding how to connect a set of computers/routers using the minimum amount of wire.<br/>• <b>Infrastructure:</b> Pipeline laying, electrical power grid routing, telephone line wiring, and transportation networks.", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q36: Prim's Algorithm
    # =============================================================
    story.append(create_priority_header("Q36", "Explain Prim's Algorithm with example, algorithm and complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Principle & Procedure (PPT Slides 24-26)</b>", h3_style))
    story.append(Paragraph("Prim's algorithm starts with the <b>minimum cost edge</b> (k, l) in the graph and sets <code>near[k] = near[l] = 0</code>. At each of the next <code>n - 2</code> steps, it selects an edge (j, near[j]) such that vertex <code>j</code> is not yet in the tree and <code>cost[j, near[j]]</code> is minimum among all unvisited vertices. It adds (j, near[j]) to the MST, sets <code>near[j] = 0</code>, and updates <code>near[k]</code> for remaining vertices.", body_style))
    
    story.append(create_code_block("""Algorithm Prim(E, cost, n, t)
// E is edge set, cost[1:n,1:n] is cost matrix, t[1:n-1,1:2] stores MST edges
{
    Let (k, l) be an edge of minimum cost in E;
    mincost := cost[k, l];
    t[1,1] := k; t[1,2] := l;
    near[k] := near[l] := 0;
    for i := 1 to n do                         // Initialize near[]
        if ( near[i] != 0 ) then
            if ( cost[i,k] < cost[i,l] ) then near[i] := k;
            else near[i] := l;
    for i := 2 to n - 1 do                     // Find n - 2 additional edges
    {
        Let j be index such that near[j] != 0 and cost[j, near[j]] is minimum;
        t[i,1] := j; t[i,2] := near[j];
        mincost := mincost + cost[j, near[j]];
        near[j] := 0;                          // Add vertex j to tree
        for k := 1 to n do                     // Update near[]
            if ( near[k] != 0 ) and ( cost[k, near[k]] > cost[k, j] ) then
                near[k] := j;
    }
    return mincost;
}""", "Algorithm Prim(E, cost, n, t)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. Time Complexity Analysis (PPT Slide 30)</b><br/>• Line 8 (find minimum edge): O(E).<br/>• Line 12 initialization loop: O(n).<br/>• The outer loop (Line 14) iterates n - 2 times. In each iteration, finding minimum near[j] (Lines 17-18) takes O(n) time, and updating near[] (Line 22) takes O(n) time.<br/>• Total time = (n - 2) &times; O(n) = <b>O(n<sup>2</sup>)</b>. Using adjacency matrix, Prim's complexity is <b>O(n<sup>2</sup>)</b>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q37: Kruskal's Algorithm
    # =============================================================
    story.append(create_priority_header("Q37", "Explain Kruskal's Algorithm with example, algorithm and complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Principle & Procedure (PPT Slides 31-33)</b>", h3_style))
    story.append(Paragraph("Kruskal's algorithm starts with a forest of <i>n</i> disjoint single-vertex trees. It sorts all edges in non-decreasing order of cost. It then iterates through the sorted edges, adding the next edge (u, v) to the forest <b>if and only if it does not create a cycle</b> (verified using <code>Find-Set(u) != Find-Set(v)</code>). Once selected, it performs <code>Union(j, k)</code> to merge the components.", body_style))
    
    story.append(create_code_block("""Algorithm kruskal(E, cost, n, t)
// Constructs MST stored in t[1:n-1, 1:2]
{
    for i := 1 to n do Make-Set(i);            // Each vertex in a separate set
    Sort the edges of E into increasing order by cost;
    mincost := 0; i := 1;
    for each edge (u, v) in E in increasing order of cost do
    {
        j := Find-Set(u); k := Find-Set(v);
        if ( j != k ) then                     // Does not form a cycle
        {
            t[i,1] := u; t[i,2] := v;
            mincost := mincost + cost[u, v];
            Union(j, k);                       // Merge the two components
            i := i + 1;
        }
    }
    return mincost;
}""", "Algorithm kruskal(E, cost, n, t)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. Complexity (PPT Slide 39):</b> Edge sorting takes <b>O(E log E)</b>. With Disjoint Sets (Union-Find), the total running time is dominated by sorting &rArr; <b>O(E log E) = O(E log V)</b>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q38: Disjoint Sets, FIND-SET and UNION Operations
    # =============================================================
    story.append(create_priority_header("Q38", "Explain Disjoint Sets, FIND-SET and UNION operations.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Definition (PPT Slide 34):</b> Two sets A and B are disjoint if they share no common elements, i.e., <code>A &cap; B = &empty;</code>.<br/><i>PPT Example:</i> <code>S<sub>1</sub> = {1, 7, 8, 9}</code>, <code>S<sub>2</sub> = {2, 5, 10}</code>, and <code>S<sub>3</sub> = {3, 4, 6}</code> are three mutually disjoint sets.", body_style))
    story.append(Paragraph("<b>2. Core Operations (PPT Slide 35):</b><br/>• <b>Make-Set(x):</b> Creates a new set containing only element x, with representative x.<br/>• <b>FIND-SET(x):</b> Returns the representative element of the set containing x.<br/>• <b>UNION(i, j):</b> Combines the two disjoint sets represented by i and j into a single set and selects a new representative.<br/><b>Role in Kruskal:</b> An edge (u, v) creates a cycle if and only if <code>FIND-SET(u) == FIND-SET(v)</code>.", bullet_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q39 & Q40: Single-Source Shortest Path & Dijkstra's Algorithm
    # =============================================================
    story.append(create_priority_header("Q39", "Explain the Single-Source Shortest Path (SSSP) problem.", "VERY HIGH"))
    story.append(Paragraph("<b>Problem Definition (PPT Slide 40):</b> Given a positively weighted directed graph G = (V, E) with non-negative edge costs (<code>cost(e) &ge; 0</code>) and a distinguished source vertex <code>v</code>, find the shortest directed path from <code>v</code> to every other vertex in the graph.", body_style))
    story.append(Spacer(1, 6))

    story.append(create_priority_header("Q40", "Explain Dijkstra's Algorithm with pseudocode, worked example and complexity.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1. Concept (PPT Slide 42):</b> Dijkstra's algorithm maintains a set <code>S</code> of vertices whose shortest path from source <code>v</code> is finalized, and an array <code>dist[]</code> of current shortest estimates. In each step, it picks <code>u &notin; S</code> with minimum <code>dist[u]</code>, adds <code>u</code> to <code>S</code>, and <b>relaxes</b> all outgoing edges from <code>u</code>:<br/><code>if ( dist[w] &gt; dist[u] + cost[u,w] ) then dist[w] := dist[u] + cost[u,w];</code>", body_style))
    
    story.append(create_code_block("""Algorithm ShortestPaths(v, cost, dist, n)
// dist[j] stores shortest distance from v to j. cost is adjacency matrix.
{
    for i := 1 to n do { s[i] := false; dist[i] := cost[v, i]; }
    s[v] := true; dist[v] := 0;                // Source vertex placed in S
    for num := 2 to n do
    {
        Choose u from vertices not in S such that dist[u] is minimum;
        s[u] := true;                          // Put u into S
        for each w adjacent to u with s[w] = false do
            if ( dist[w] > dist[u] + cost[u, w] ) then
                dist[w] := dist[u] + cost[u, w]; // Relaxation
    }
}""", "Algorithm ShortestPaths (Dijkstra)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>2. PPT Solved 6-Vertex Digraph Trace Table (PPT Slides 40-41)</b>", h3_style))
    dijk_data = [
        [Paragraph("<b>Iteration</b>", table_header_style), Paragraph("<b>S Set</b>", table_header_style), Paragraph("<b>Selected u</b>", table_header_style), Paragraph("<b>dist[2]</b>", table_header_style), Paragraph("<b>dist[3]</b>", table_header_style), Paragraph("<b>dist[4]</b>", table_header_style), Paragraph("<b>dist[5]</b>", table_header_style), Paragraph("<b>dist[6]</b>", table_header_style)],
        [Paragraph("Initial", table_cell_center), Paragraph("{1}", table_cell_center), Paragraph("--", table_cell_center), Paragraph("50", table_cell_center), Paragraph("<b>10 &check;</b>", table_cell_bold), Paragraph("&infin;", table_cell_center), Paragraph("45", table_cell_center), Paragraph("&infin;", table_cell_center)],
        [Paragraph("Iter 1", table_cell_center), Paragraph("{1, 3}", table_cell_center), Paragraph("v<sub>3</sub> (10)", table_cell_center), Paragraph("50", table_cell_center), Paragraph("10", table_cell_center), Paragraph("<b>25 &check;</b>", table_cell_bold), Paragraph("45", table_cell_center), Paragraph("&infin;", table_cell_center)],
        [Paragraph("Iter 2", table_cell_center), Paragraph("{1, 3, 4}", table_cell_center), Paragraph("v<sub>4</sub> (25)", table_cell_center), Paragraph("45", table_cell_center), Paragraph("10", table_cell_center), Paragraph("25", table_cell_center), Paragraph("45", table_cell_center), Paragraph("<b>28 &check;</b>", table_cell_bold)],
        [Paragraph("Iter 3", table_cell_center), Paragraph("{1, 3, 4, 6}", table_cell_center), Paragraph("v<sub>6</sub> (28)", table_cell_center), Paragraph("45", table_cell_center), Paragraph("10", table_cell_center), Paragraph("25", table_cell_center), Paragraph("45 &check;", table_cell_center), Paragraph("28", table_cell_center)],
        [Paragraph("Iter 4", table_cell_center), Paragraph("{1, 3, 4, 5, 6}", table_cell_center), Paragraph("v<sub>5</sub> (45)", table_cell_center), Paragraph("<b>45 &check;</b>", table_cell_bold), Paragraph("10", table_cell_center), Paragraph("25", table_cell_center), Paragraph("45", table_cell_center), Paragraph("28", table_cell_center)]
    ]
    t_dijk = Table(dijk_data, colWidths=[55, 110, 75, 55, 55, 55, 55, 63.27])
    t_dijk.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_dijk)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Final Shortest Paths:</b> v<sub>1</sub>&rarr;v<sub>3</sub> (10), v<sub>1</sub>&rarr;v<sub>3</sub>&rarr;v<sub>4</sub> (25), v<sub>1</sub>&rarr;v<sub>3</sub>&rarr;v<sub>4</sub>&rarr;v<sub>6</sub> (28), v<sub>1</sub>&rarr;v<sub>3</sub>&rarr;v<sub>4</sub>&rarr;v<sub>2</sub> (45), v<sub>1</sub>&rarr;v<sub>5</sub> (45). <b>Time Complexity: O(n<sup>2</sup>)</b>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q41: Job Sequencing with Deadlines
    # =============================================================
    story.append(create_priority_header("Q41", "Explain Job Sequencing with Deadlines using Greedy Method.", "VERY HIGH"))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>1. Problem Definition (PPT Slide 46)</b>", h3_style))
    story.append(Paragraph("Given <i>n</i> jobs, each with deadline <code>d<sub>i</sub> &ge; 1</code> and profit <code>p<sub>i</sub> &gt; 0</code>. Each job takes 1 unit of time on a single processor. Profit is earned iff the job finishes by its deadline. <b>Objective:</b> Find a feasible processing schedule that maximizes total profit.", body_style))
    
    story.append(Paragraph("<b>2. Greedy Strategy & Algorithm (PPT Slides 49-52)</b>", h3_style))
    story.append(Paragraph("1. Sort all jobs in <b>descending order of profit</b> (<code>p<sub>1</sub> &ge; p<sub>2</sub> &ge; ... &ge; p<sub>n</sub></code>).<br/>2. For each job <code>i</code>, assign it to the <b>latest available free time slot</b> <code>r &le; d<sub>i</sub></code>. If all slots &le; d<sub>i</sub> are occupied, discard the job.", body_style))
    
    story.append(create_code_block("""Algorithm JS(d, j, n)
// Jobs ordered by p[1] >= p[2] >= ... >= p[n]. j[i] is ith job in optimal schedule
{
    d[0] := j[0] := 0; j[1] := 1; k := 1;
    for i := 2 to n do
    {
        r := k;
        while ( (d[j[r]] > d[i]) and (d[j[r]] > r) ) do r := r - 1;
        if ( d[i] > r ) then
        {
            for q := k to (r + 1) step -1 do j[q + 1] := j[q];
            j[r + 1] := i;
            k := k + 1;
        }
    }
    return k;
}
// Worst-case Time Complexity = O(n^2); with Disjoint Sets = O(n alpha(n)).""", "Algorithm JS(d, j, n)"))
    story.append(Spacer(1, 4))

    story.append(Paragraph("<b>3. PPT Worked Examples Summary (PPT Slides 48, 50):</b><br/>• <b>Ex 1 (n=4):</b> <code>p = (100, 10, 15, 27)</code>, <code>d = (2, 1, 2, 1)</code> &rarr; Optimal = <b>{J<sub>1</sub>, J<sub>4</sub>}</b> &rarr; Max Profit = <b>127</b>.<br/>• <b>Ex 2 (n=5):</b> <code>p = (20, 15, 10, 5, 1)</code>, <code>d = (2, 2, 1, 3, 3)</code> &rarr; Optimal = <b>{J<sub>1</sub>, J<sub>2</sub>, J<sub>4</sub>}</b> &rarr; Max Profit = <b>40</b>.<br/>• <b>Ex 3 (n=7):</b> <code>p = (3, 5, 20, 18, 1, 6, 30)</code>, <code>d = (1, 3, 4, 3, 2, 1, 2)</code> &rarr; Optimal = <b>{J<sub>6</sub>, J<sub>7</sub>, J<sub>4</sub>, J<sub>3</sub>}</b> &rarr; Max Profit = <b>74</b>.", body_style))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q42: Comparison of Prim's and Kruskal's Algorithms
    # =============================================================
    story.append(create_priority_header("Q42", "Compare Prim's and Kruskal's Algorithms in detail.", "HIGH"))
    story.append(Spacer(1, 4))
    
    pk_table_data = [
        [Paragraph("<b>Feature / Metric</b>", table_header_style), Paragraph("<b>Prim's Algorithm</b>", table_header_style), Paragraph("<b>Kruskal's Algorithm</b>", table_header_style)],
        [Paragraph("<b>Basic Approach</b>", table_cell_bold), Paragraph("<b>Tree Growing:</b> Starts at a single root and grows one connected tree.", table_cell_style), Paragraph("<b>Forest Merging:</b> Starts with disjoint vertices and adds globally cheapest edges.", table_cell_style)],
        [Paragraph("<b>Starting Point</b>", table_cell_bold), Paragraph("Starts with minimum cost edge (or arbitrary start vertex).", table_cell_style), Paragraph("Starts with globally minimum edge anywhere in the graph.", table_cell_style)],
        [Paragraph("<b>Graph Type Preference</b>", table_cell_bold), Paragraph("Preferred for <b>Dense Graphs</b> (where E &asymp; V<sup>2</sup>).", table_cell_style), Paragraph("Preferred for <b>Sparse Graphs</b> (where E &Lt; V<sup>2</sup>).", table_cell_style)],
        [Paragraph("<b>Time Complexity</b>", table_cell_bold), Paragraph("<b>O(V<sup>2</sup>)</b> with matrix; <b>O(E log V)</b> with Min-Heap.", table_cell_style), Paragraph("<b>O(E log E) = O(E log V)</b> (dominated by sorting).", table_cell_style)],
        [Paragraph("<b>Cycle Check Method</b>", table_cell_bold), Paragraph("Maintains <code>near[] = 0</code> for tree vertices (implicit).", table_cell_style), Paragraph("Explicit cycle checking via <b>Disjoint Sets (Find-Set)</b>.", table_cell_style)],
        [Paragraph("<b>Data Structures</b>", table_cell_bold), Paragraph("Arrays <code>near[]</code>, <code>cost[][]</code> or Priority Queue.", table_cell_style), Paragraph("Edge array, Disjoint Sets (<code>Make-Set, Find, Union</code>).", table_cell_style)]
    ]
    t_pk = Table(pk_table_data, colWidths=[120, 200, 203.27])
    t_pk.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_pk)
    story.append(Spacer(1, 10))

    # =============================================================
    # Q43: Solved MST Numerical using Prim's Algorithm
    # =============================================================
    story.append(create_priority_header("Q43", "Solve an MST Numerical Problem using Prim's Algorithm.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Problem:</b> Find the Minimum Cost Spanning Tree for a 6-vertex graph with edges: <code>(1,2):4, (1,3):2, (2,3):1, (2,4):5, (3,4):8, (3,5):10, (4,5):2, (4,6):6, (5,6):3</code>.", body_style))

    p_num_data = [
        [Paragraph("<b>Step</b>", table_header_style), Paragraph("<b>Selected Edge</b>", table_header_style), Paragraph("<b>Tree Vertices (S)</b>", table_header_style), Paragraph("<b>Candidate Edges Considered</b>", table_header_style), Paragraph("<b>Cost Added</b>", table_header_style), Paragraph("<b>Total Cost</b>", table_header_style)],
        [Paragraph("Init", table_cell_center), Paragraph("(2, 3)", table_cell_bold), Paragraph("{2, 3}", table_cell_center), Paragraph("Cheapest edge in graph (cost 1)", table_cell_style), Paragraph("1", table_cell_center), Paragraph("1", table_cell_center)],
        [Paragraph("1", table_cell_center), Paragraph("(3, 1)", table_cell_bold), Paragraph("{1, 2, 3}", table_cell_center), Paragraph("(1,3):2, (1,2):4, (2,4):5, (3,4):8, (3,5):10", table_cell_style), Paragraph("2", table_cell_center), Paragraph("3", table_cell_center)],
        [Paragraph("2", table_cell_center), Paragraph("(2, 4)", table_cell_bold), Paragraph("{1, 2, 3, 4}", table_cell_center), Paragraph("(2,4):5, (3,4):8, (3,5):10", table_cell_style), Paragraph("5", table_cell_center), Paragraph("8", table_cell_center)],
        [Paragraph("3", table_cell_center), Paragraph("(4, 5)", table_cell_bold), Paragraph("{1, 2, 3, 4, 5}", table_cell_center), Paragraph("(4,5):2, (4,6):6, (3,5):10", table_cell_style), Paragraph("2", table_cell_center), Paragraph("10", table_cell_center)],
        [Paragraph("4", table_cell_center), Paragraph("(5, 6)", table_cell_bold), Paragraph("{1, 2, 3, 4, 5, 6}", table_cell_center), Paragraph("(5,6):3, (4,6):6", table_cell_style), Paragraph("3", table_cell_center), Paragraph("<b>13</b>", table_cell_bold)]
    ]
    t_pnum = Table(p_num_data, colWidths=[40, 85, 100, 185, 55, 58.27])
    t_pnum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, -1), (-1, -1), CALLOUT_BG_GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_pnum)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Final MST Edges:</b> <code>{(2,3), (1,3), (2,4), (4,5), (5,6)}</code>. <b>Minimum Total Cost = 13</b>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q44: Solved MST Numerical using Kruskal's Algorithm
    # =============================================================
    story.append(create_priority_header("Q44", "Solve an MST Numerical Problem using Kruskal's Algorithm.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Problem:</b> Apply Kruskal's Algorithm to the same 6-vertex graph. First, sort all edges by weight:<br/><code>(2,3):1, (1,3):2, (4,5):2, (5,6):3, (1,2):4, (2,4):5, (4,6):6, (3,4):8, (3,5):10</code>.", body_style))

    k_num_data = [
        [Paragraph("<b>Edge Examined</b>", table_header_style), Paragraph("<b>Cost</b>", table_header_style), Paragraph("<b>Find-Set(u)</b>", table_header_style), Paragraph("<b>Find-Set(v)</b>", table_header_style), Paragraph("<b>Action / Cycle Status</b>", table_header_style), Paragraph("<b>MST Total Cost</b>", table_header_style)],
        [Paragraph("(2, 3)", table_cell_bold), Paragraph("1", table_cell_center), Paragraph("{2}", table_cell_center), Paragraph("{3}", table_cell_center), Paragraph("<b>ACCEPTED</b> (Union {2, 3})", table_cell_style), Paragraph("1", table_cell_center)],
        [Paragraph("(1, 3)", table_cell_bold), Paragraph("2", table_cell_center), Paragraph("{1}", table_cell_center), Paragraph("{2, 3}", table_cell_center), Paragraph("<b>ACCEPTED</b> (Union {1, 2, 3})", table_cell_style), Paragraph("3", table_cell_center)],
        [Paragraph("(4, 5)", table_cell_bold), Paragraph("2", table_cell_center), Paragraph("{4}", table_cell_center), Paragraph("{5}", table_cell_center), Paragraph("<b>ACCEPTED</b> (Union {4, 5})", table_cell_style), Paragraph("5", table_cell_center)],
        [Paragraph("(5, 6)", table_cell_bold), Paragraph("3", table_cell_center), Paragraph("{4, 5}", table_cell_center), Paragraph("{6}", table_cell_center), Paragraph("<b>ACCEPTED</b> (Union {4, 5, 6})", table_cell_style), Paragraph("8", table_cell_center)],
        [Paragraph("(1, 2)", table_cell_mono), Paragraph("4", table_cell_center), Paragraph("{1, 2, 3}", table_cell_center), Paragraph("{1, 2, 3}", table_cell_center), Paragraph("<b>REJECTED</b> (Forms Cycle 1-3-2)", table_cell_style), Paragraph("8", table_cell_center)],
        [Paragraph("(2, 4)", table_cell_bold), Paragraph("5", table_cell_center), Paragraph("{1, 2, 3}", table_cell_center), Paragraph("{4, 5, 6}", table_cell_center), Paragraph("<b>ACCEPTED</b> (Union all &rarr; 5 edges done)", table_cell_style), Paragraph("<b>13</b>", table_cell_bold)]
    ]
    t_knum = Table(k_num_data, colWidths=[90, 45, 80, 80, 160, 68.27])
    t_knum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, -1), (-1, -1), CALLOUT_BG_GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_knum)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Verification:</b> Both Prim and Kruskal yield identical minimum cost = <b>13</b>.", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q45: Solved Dijkstra Numerical Problem
    # =============================================================
    story.append(create_priority_header("Q45", "Solve a Dijkstra Shortest-Path Numerical Problem with step-by-step table.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Problem:</b> Given a 5-vertex directed graph with source <b>v<sub>1</sub> = 1</b>.<br/>Edges: <code>(1,2):10, (1,4):5, (2,3):1, (2,4):2, (4,2):3, (4,3):9, (4,5):2, (5,1):7, (5,3):6, (3,5):4</code>.", body_style))

    d_num_data = [
        [Paragraph("<b>Step</b>", table_header_style), Paragraph("<b>Selected u</b>", table_header_style), Paragraph("<b>S Set</b>", table_header_style), Paragraph("<b>dist[1]</b>", table_header_style), Paragraph("<b>dist[2]</b>", table_header_style), Paragraph("<b>dist[3]</b>", table_header_style), Paragraph("<b>dist[4]</b>", table_header_style), Paragraph("<b>dist[5]</b>", table_header_style)],
        [Paragraph("Init", table_cell_center), Paragraph("--", table_cell_center), Paragraph("{1}", table_cell_center), Paragraph("0", table_cell_center), Paragraph("10", table_cell_center), Paragraph("&infin;", table_cell_center), Paragraph("<b>5 &check;</b>", table_cell_bold), Paragraph("&infin;", table_cell_center)],
        [Paragraph("1", table_cell_center), Paragraph("v<sub>4</sub> (5)", table_cell_center), Paragraph("{1, 4}", table_cell_center), Paragraph("0", table_cell_center), Paragraph("min(10, 5+3)=<b>8</b>", table_cell_center), Paragraph("min(&infin;, 5+9)=14", table_cell_center), Paragraph("5", table_cell_center), Paragraph("min(&infin;, 5+2)=<b>7 &check;</b>", table_cell_bold)],
        [Paragraph("2", table_cell_center), Paragraph("v<sub>5</sub> (7)", table_cell_center), Paragraph("{1, 4, 5}", table_cell_center), Paragraph("0", table_cell_center), Paragraph("<b>8 &check;</b>", table_cell_bold), Paragraph("min(14, 7+6)=13", table_cell_center), Paragraph("5", table_cell_center), Paragraph("7", table_cell_center)],
        [Paragraph("3", table_cell_center), Paragraph("v<sub>2</sub> (8)", table_cell_center), Paragraph("{1, 4, 5, 2}", table_cell_center), Paragraph("0", table_cell_center), Paragraph("8", table_cell_center), Paragraph("min(13, 8+1)=<b>9 &check;</b>", table_cell_bold), Paragraph("5", table_cell_center), Paragraph("7", table_cell_center)],
        [Paragraph("4", table_cell_center), Paragraph("v<sub>3</sub> (9)", table_cell_center), Paragraph("{1, 4, 5, 2, 3}", table_cell_center), Paragraph("0", table_cell_center), Paragraph("8", table_cell_center), Paragraph("9", table_cell_center), Paragraph("5", table_cell_center), Paragraph("7", table_cell_center)]
    ]
    t_dnum = Table(d_num_data, colWidths=[40, 75, 90, 55, 95, 95, 55, 58.27])
    t_dnum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_dnum)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Shortest Distances from 1:</b> dist[2]=8 (via 1&rarr;4&rarr;2), dist[3]=9 (via 1&rarr;4&rarr;2&rarr;3), dist[4]=5 (direct), dist[5]=7 (via 1&rarr;4&rarr;5).", body_bold))
    story.append(Spacer(1, 10))

    # =============================================================
    # Q46: Solved Job Sequencing Numerical Problem
    # =============================================================
    story.append(create_priority_header("Q46", "Solve a Job Sequencing with Deadlines Numerical Problem with slot assignment.", "HIGH"))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Problem:</b> Given 5 jobs with profits and deadlines: <code>J<sub>1</sub>:(p=20, d=2), J<sub>2</sub>:(p=15, d=2), J<sub>3</sub>:(p=10, d=1), J<sub>4</sub>:(p=5, d=3), J<sub>5</sub>:(p=1, d=3)</code>. Max deadline d<sub>max</sub> = 3 slots (Slot 1: [0,1], Slot 2: [1,2], Slot 3: [2,3]).", body_style))

    js_num_data = [
        [Paragraph("<b>Job (Sorted)</b>", table_header_style), Paragraph("<b>Profit</b>", table_header_style), Paragraph("<b>Deadline</b>", table_header_style), Paragraph("<b>Slot Assigned</b>", table_header_style), Paragraph("<b>Gantt Chart State</b>", table_header_style), Paragraph("<b>Cumulative Profit</b>", table_header_style)],
        [Paragraph("J<sub>1</sub>", table_cell_bold), Paragraph("20", table_cell_center), Paragraph("2", table_cell_center), Paragraph("Slot 2 [1, 2]", table_cell_center), Paragraph("[ &ndash; , J<sub>1</sub>, &ndash; ]", table_cell_center), Paragraph("20", table_cell_center)],
        [Paragraph("J<sub>2</sub>", table_cell_bold), Paragraph("15", table_cell_center), Paragraph("2", table_cell_center), Paragraph("Slot 1 [0, 1]", table_cell_center), Paragraph("[ J<sub>2</sub>, J<sub>1</sub>, &ndash; ]", table_cell_center), Paragraph("35", table_cell_center)],
        [Paragraph("J<sub>3</sub>", table_cell_mono), Paragraph("10", table_cell_center), Paragraph("1", table_cell_center), Paragraph("<b>REJECTED</b> (Slot 1 full)", table_cell_style), Paragraph("[ J<sub>2</sub>, J<sub>1</sub>, &ndash; ]", table_cell_center), Paragraph("35", table_cell_center)],
        [Paragraph("J<sub>4</sub>", table_cell_bold), Paragraph("5", table_cell_center), Paragraph("3", table_cell_center), Paragraph("Slot 3 [2, 3]", table_cell_center), Paragraph("[ J<sub>2</sub>, J<sub>1</sub>, J<sub>4</sub> ]", table_cell_center), Paragraph("<b>40</b>", table_cell_bold)],
        [Paragraph("J<sub>5</sub>", table_cell_mono), Paragraph("1", table_cell_center), Paragraph("3", table_cell_center), Paragraph("<b>REJECTED</b> (All full)", table_cell_style), Paragraph("[ J<sub>2</sub>, J<sub>1</sub>, J<sub>4</sub> ]", table_cell_center), Paragraph("40", table_cell_center)]
    ]
    t_jsnum = Table(js_num_data, colWidths=[80, 50, 65, 120, 125, 83.27])
    t_jsnum.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PRIMARY),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E0')),
        ('BACKGROUND', (0, 4), (-1, 4), CALLOUT_BG_GREEN),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, TABLE_ROW_ALT]),
        ('TOPPADDING', (0, 0), (-1, -1), 3), ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(t_jsnum)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Optimal Job Schedule:</b> <code>[J<sub>2</sub>, J<sub>1</sub>, J<sub>4</sub>]</code>. <b>Maximum Earned Profit = 15 + 20 + 5 = 40</b>.", body_bold))
    story.append(Spacer(1, 14))

    return story

print("booklet_content_u3.py initialized successfully!")
