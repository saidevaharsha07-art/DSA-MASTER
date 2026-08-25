import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

os.makedirs('diagrams', exist_ok=True)

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.edgecolor'] = '#4A5568'
plt.rcParams['axes.linewidth'] = 1.2

# -------------------------------------------------------------
# 1. Asymptotic Notations (Big-O, Omega, Theta, Little-o)
# -------------------------------------------------------------
fig, axs = plt.subplots(1, 4, figsize=(14, 3.5), dpi=300)
n = np.linspace(0.1, 10, 200)

# Big-O: f(n) <= c*g(n) for n >= n0
ax = axs[0]
cg = 1.5 * n**1.5 + 4
fn = 1.2 * n**1.5 + 2 + 1.5*np.sin(n*1.5)
ax.plot(n, cg, label=r'$c \cdot g(n)$ (Upper)', color='#E53E3E', lw=2)
ax.plot(n, fn, label=r'$f(n)$', color='#2B6CB0', lw=2)
ax.axvline(x=3.5, color='#718096', linestyle='--', label=r'$n_0$')
ax.fill_between(n[n>=3.5], fn[n>=3.5], cg[n>=3.5], color='#FEB2B2', alpha=0.3)
ax.set_title('Big-O (O): Upper Bound\n' + r'$f(n) \leq c \cdot g(n)$', fontsize=10, fontweight='bold', color='#1A365D')
ax.set_xlabel('Input Size (n)')
ax.set_ylabel('Running Time')
ax.set_ylim(0, 55)
ax.legend(loc='upper left', fontsize=7.5)

# Omega: f(n) >= c*g(n) for n >= n0
ax = axs[1]
cg = 0.8 * n**1.4
fn = 1.2 * n**1.4 + 3 + 1.2*np.cos(n*1.5)
ax.plot(n, fn, label=r'$f(n)$', color='#2B6CB0', lw=2)
ax.plot(n, cg, label=r'$c \cdot g(n)$ (Lower)', color='#38A169', lw=2)
ax.axvline(x=3.0, color='#718096', linestyle='--', label=r'$n_0$')
ax.fill_between(n[n>=3.0], cg[n>=3.0], fn[n>=3.0], color='#C6F6D5', alpha=0.3)
ax.set_title('Omega ($\Omega$): Lower Bound\n' + r'$f(n) \geq c \cdot g(n)$', fontsize=10, fontweight='bold', color='#1A365D')
ax.set_xlabel('Input Size (n)')
ax.set_ylim(0, 50)
ax.legend(loc='upper left', fontsize=7.5)

# Theta: c1*g(n) <= f(n) <= c2*g(n) for n >= n0
ax = axs[2]
c2g = 2.0 * n**1.3 + 5
c1g = 0.7 * n**1.3
fn = 1.3 * n**1.3 + 2.5 + np.sin(n*2)
ax.plot(n, c2g, label=r'$c_2 \cdot g(n)$', color='#E53E3E', lw=1.8)
ax.plot(n, fn, label=r'$f(n)$ (Tight)', color='#2B6CB0', lw=2)
ax.plot(n, c1g, label=r'$c_1 \cdot g(n)$', color='#38A169', lw=1.8)
ax.axvline(x=3.2, color='#718096', linestyle='--', label=r'$n_0$')
ax.fill_between(n[n>=3.2], c1g[n>=3.2], c2g[n>=3.2], color='#FEFCBF', alpha=0.4)
ax.set_title('Theta ($\Theta$): Tight Bound\n' + r'$c_1 g(n) \leq f(n) \leq c_2 g(n)$', fontsize=10, fontweight='bold', color='#1A365D')
ax.set_xlabel('Input Size (n)')
ax.set_ylim(0, 50)
ax.legend(loc='upper left', fontsize=7.5)

# Little-o: strictly slower growth lim f(n)/g(n) = 0
ax = axs[3]
gn = 0.5 * n**2.2
fn = 2.5 * n + 1
ax.plot(n, gn, label=r'$g(n) = n^2$', color='#805AD5', lw=2)
ax.plot(n, fn, label=r'$f(n) = 3n+2$', color='#2B6CB0', lw=2)
ax.set_title('Little-o (o): Strict Upper\n' + r'$\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$', fontsize=10, fontweight='bold', color='#1A365D')
ax.set_xlabel('Input Size (n)')
ax.set_ylim(0, 60)
ax.legend(loc='upper left', fontsize=7.5)

plt.tight_layout()
plt.savefig('diagrams/diag_asymptotic.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 2. Sequential Search Cases
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 3), dpi=300)
items = ['2\n(Best)', '5', '7', '8', '9\n(Worst)']
x = list(range(len(items)))
colors = ['#48BB78', '#CBD5E0', '#CBD5E0', '#CBD5E0', '#F56565']

rects = ax.bar(x, [1, 2, 3, 4, 5], color=colors, edgecolor='#2D3748', width=0.6)
ax.set_xticks(x)
ax.set_xticklabels([f'a[{i+1}] = {items[i]}' for i in range(5)], fontsize=9, fontweight='bold')
ax.set_ylabel('Number of Comparisons', fontsize=10, fontweight='bold')
ax.set_title('Sequential Search on Array [2, 5, 7, 8, 9] (Key Comparisons)', fontsize=11, fontweight='bold', color='#1A365D')

ax.annotate('Best Case: Key=2\n1 Comparison = O(1)', xy=(0, 1), xytext=(0.5, 3.5),
            arrowprops=dict(facecolor='#22543D', shrink=0.08, width=1.5, headwidth=6),
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#C6F6D5', edgecolor='#22543D'),
            fontweight='bold', fontsize=8)

ax.annotate('Worst Case: Key=9 or Absent\nn Comparisons = O(n)', xy=(4, 5), xytext=(2.2, 4.8),
            arrowprops=dict(facecolor='#742A2A', shrink=0.08, width=1.5, headwidth=6),
            bbox=dict(boxstyle='round,pad=0.4', facecolor='#FED7D7', edgecolor='#742A2A'),
            fontweight='bold', fontsize=8)

ax.set_ylim(0, 6.2)
plt.tight_layout()
plt.savefig('diagrams/diag_seq_search.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 3. Recursive Stack Activation Diagram (rfactorial(3))
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9, 4), dpi=300)
ax.axis('off')

frames = [
    ("Frame 3: rfactorial(1)", "n = 1, fact = 1\nReturns: 1", "#EBF8FF", "#3182CE"),
    ("Frame 2: rfactorial(2)", "n = 2, fact = 2 * rfactorial(1) = 2\nReturns: 2", "#E6FFFA", "#319795"),
    ("Frame 1: rfactorial(3)", "n = 3, fact = 3 * rfactorial(2) = 6\nReturns: 6", "#FEFCBF", "#D69E2E"),
    ("Frame 0: main()", "R = rfactorial(3) -> prints 6", "#EDF2F7", "#4A5568")
]

for idx, (title, content, bg, border) in enumerate(frames):
    y = 0.75 - idx*0.22
    rect = patches.FancyBboxPatch((0.05, y), 0.52, 0.18, boxstyle="round,pad=0.02",
                                  facecolor=bg, edgecolor=border, linewidth=2)
    ax.add_patch(rect)
    ax.text(0.08, y + 0.11, title, fontsize=9.5, fontweight='bold', color='#1A365D')
    ax.text(0.08, y + 0.04, content, fontsize=8, color='#2D3748')

ax.text(0.65, 0.88, "Runtime Stack Memory", fontsize=10.5, fontweight='bold', color='#1A365D')
stack_boxes = [
    ("Return Address (main)", "2000", "#E2E8F0"),
    ("Param n = 3, fact", "2 bytes ea.", "#FEFCBF"),
    ("Return Address (rf(3))", "3000", "#E2E8F0"),
    ("Param n = 2, fact", "2 bytes ea.", "#E6FFFA"),
    ("Return Address (rf(2))", "4000", "#E2E8F0"),
    ("Param n = 1, fact", "2 bytes ea.", "#EBF8FF"),
]

for idx, (label, val, bg) in enumerate(stack_boxes):
    sy = 0.76 - idx*0.11
    srect = patches.Rectangle((0.65, sy), 0.32, 0.09, facecolor=bg, edgecolor='#4A5568', linewidth=1)
    ax.add_patch(srect)
    ax.text(0.66, sy + 0.03, f"{label} [{val}]", fontsize=7.5, color='#1A202C')

ax.annotate('Calls Push (Down)', xy=(0.02, 0.20), xytext=(0.02, 0.70),
            arrowprops=dict(facecolor='#E53E3E', width=2, headwidth=6),
            fontsize=8, fontweight='bold', color='#E53E3E', rotation=90)
ax.annotate('Returns Pop (Up)', xy=(0.60, 0.70), xytext=(0.60, 0.20),
            arrowprops=dict(facecolor='#38A169', width=2, headwidth=6),
            fontsize=8, fontweight='bold', color='#38A169', rotation=-90)

plt.tight_layout()
plt.savefig('diagrams/diag_recursive_stack.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 4. Divide and Conquer Architecture
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 3.2), dpi=300)
ax.axis('off')

ax.add_patch(patches.FancyBboxPatch((0.35, 0.78), 0.30, 0.18, boxstyle="round,pad=0.03",
                                    facecolor='#2B6CB0', edgecolor='#1A365D', lw=2))
ax.text(0.50, 0.87, "Main Problem P\n(Size n)", ha='center', va='center', color='white', fontweight='bold', fontsize=9.5)

sub_coords = [(0.10, 0.42), (0.38, 0.42), (0.66, 0.42)]
sub_labels = ["Subproblem P1\n(Size n/b)", "Subproblem P2\n(Size n/b)", "Subproblem Pk\n(Size n/b)"]
for (x, y), label in zip(sub_coords, sub_labels):
    ax.add_patch(patches.FancyBboxPatch((x, y), 0.24, 0.16, boxstyle="round,pad=0.02",
                                        facecolor='#EBF8FF', edgecolor='#2B6CB0', lw=1.5))
    ax.text(x+0.12, y+0.08, label, ha='center', va='center', color='#1A365D', fontweight='bold', fontsize=8.5)

sol_coords = [(0.10, 0.12), (0.38, 0.12), (0.66, 0.12)]
sol_labels = ["Solution S1", "Solution S2", "Solution Sk"]
for (x, y), label in zip(sol_coords, sol_labels):
    ax.add_patch(patches.FancyBboxPatch((x, y), 0.24, 0.14, boxstyle="round,pad=0.02",
                                        facecolor='#C6F6D5', edgecolor='#22543D', lw=1.5))
    ax.text(x+0.12, y+0.07, label, ha='center', va='center', color='#22543D', fontweight='bold', fontsize=8.5)

for x, y in sub_coords:
    ax.annotate('', xy=(x+0.12, 0.60), xytext=(0.50, 0.78),
                arrowprops=dict(facecolor='#4A5568', width=1.5, headwidth=5))
    ax.annotate('', xy=(x+0.12, 0.28), xytext=(x+0.12, 0.42),
                arrowprops=dict(facecolor='#38A169', width=1.5, headwidth=5))

ax.text(0.18, 0.70, "1. DIVIDE", fontsize=8.5, fontweight='bold', color='#2B6CB0')
ax.text(0.02, 0.35, "2. CONQUER", fontsize=8, fontweight='bold', color='#319795', rotation=90)
ax.text(0.50, 0.02, "3. COMBINE Solutions -> Final Result", ha='center', fontsize=9, fontweight='bold', color='#C53030')

plt.tight_layout()
plt.savefig('diagrams/diag_dandc_paradigm.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 5. Merge Sort Recursion Tree [6, 2, 8, 4, 3, 7, 5, 1]
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(9, 4.2), dpi=300)
ax.axis('off')

tree_nodes = [
    (0, 0.50, "A[0:7] = [6, 2, 8, 4, 3, 7, 5, 1]", "#2B6CB0", "white"),
    (1, 0.25, "[6, 2, 8, 4]", "#4299E1", "white"),
    (1, 0.75, "[3, 7, 5, 1]", "#4299E1", "white"),
    (2, 0.125, "[6, 2]", "#90CDF4", "#1A365D"),
    (2, 0.375, "[8, 4]", "#90CDF4", "#1A365D"),
    (2, 0.625, "[3, 7]", "#90CDF4", "#1A365D"),
    (2, 0.875, "[5, 1]", "#90CDF4", "#1A365D"),
    (3, 0.0625, "[6]", "#E2E8F0", "#2D3748"),
    (3, 0.1875, "[2]", "#E2E8F0", "#2D3748"),
    (3, 0.3125, "[8]", "#E2E8F0", "#2D3748"),
    (3, 0.4375, "[4]", "#E2E8F0", "#2D3748"),
    (3, 0.5625, "[3]", "#E2E8F0", "#2D3748"),
    (3, 0.6875, "[7]", "#E2E8F0", "#2D3748"),
    (3, 0.8125, "[5]", "#E2E8F0", "#2D3748"),
    (3, 0.9375, "[1]", "#E2E8F0", "#2D3748"),
]

level_y = [0.85, 0.60, 0.35, 0.10]
node_w = [0.44, 0.20, 0.11, 0.055]
for lvl, x, txt, bg, fg in tree_nodes:
    y = level_y[lvl]
    w = node_w[lvl]
    rect = patches.FancyBboxPatch((x - w/2, y - 0.05), w, 0.09, boxstyle="round,pad=0.015",
                                  facecolor=bg, edgecolor='#1A365D', lw=1.2)
    ax.add_patch(rect)
    ax.text(x, y - 0.005, txt, ha='center', va='center', color=fg, fontsize=7.5, fontweight='bold')

edges = [
    ((0.50, 0.80), (0.25, 0.65)), ((0.50, 0.80), (0.75, 0.65)),
    ((0.25, 0.55), (0.125, 0.40)), ((0.25, 0.55), (0.375, 0.40)),
    ((0.75, 0.55), (0.625, 0.40)), ((0.75, 0.55), (0.875, 0.40)),
    ((0.125, 0.30), (0.0625, 0.15)), ((0.125, 0.30), (0.1875, 0.15)),
    ((0.375, 0.30), (0.3125, 0.15)), ((0.375, 0.30), (0.4375, 0.15)),
    ((0.625, 0.30), (0.5625, 0.15)), ((0.625, 0.30), (0.6875, 0.15)),
    ((0.875, 0.30), (0.8125, 0.15)), ((0.875, 0.30), (0.9375, 0.15)),
]
for p1, p2 in edges:
    ax.plot([p1[0], p2[0]], [p1[1], p2[1]], color='#718096', lw=1.2, zorder=0)

ax.text(0.02, 0.95, "Divide Stage ↓", fontsize=9, fontweight='bold', color='#2B6CB0')
ax.text(0.75, 0.95, "Combine Stage (Merge) ↑", fontsize=9, fontweight='bold', color='#C53030')

plt.tight_layout()
plt.savefig('diagrams/diag_mergesort_tree.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 6. Fractional Knapsack vs 0/1 Knapsack
# -------------------------------------------------------------
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(9, 3.8), dpi=300)

ax1.set_title("Fractional Knapsack (Greedy: Optimal)\nCapacity = 10 ml, Profit = $124", fontsize=9.5, fontweight='bold', color='#1A365D')
frac_items = ['Item 5\n(1ml, $50)', 'Item 3\n(2ml, $40)', 'Item 4\n(6ml, $30)', 'Item 2 (1/8)\n(1ml, $4)']
frac_weights = [1, 2, 6, 1]
frac_colors = ['#38A169', '#48BB78', '#68D391', '#9AE6B4']
bottom = 0
for it, w, c in zip(frac_items, frac_weights, frac_colors):
    ax1.bar(0, w, bottom=bottom, color=c, edgecolor='#2D3748', width=0.5, label=it)
    ax1.text(0, bottom + w/2, it, ha='center', va='center', fontsize=7.5, fontweight='bold')
    bottom += w
ax1.set_ylim(0, 11)
ax1.set_ylabel('Filled Capacity (ml)', fontweight='bold')
ax1.set_xticks([])

ax2.set_title("0/1 Knapsack (Greedy Fails!)\nCapacity = 50 kg", fontsize=9.5, fontweight='bold', color='#C53030')
ax2.bar(0.3, 10, color='#FC8181', edgecolor='#2D3748', width=0.3, label='Item 1 (10kg, $60)')
ax2.bar(0.3, 20, bottom=10, color='#F56565', edgecolor='#2D3748', width=0.3, label='Item 2 (20kg, $100)')
ax2.bar(0.3, 20, bottom=30, color='#CBD5E0', edgecolor='#2D3748', width=0.3, linestyle='--', label='20kg Unused')

ax2.bar(0.8, 20, color='#48BB78', edgecolor='#2D3748', width=0.3, label='Item 2 (20kg, $100)')
ax2.bar(0.8, 30, bottom=20, color='#38A169', edgecolor='#2D3748', width=0.3, label='Item 3 (30kg, $120)')

ax2.set_xticks([0.3, 0.8])
ax2.set_xticklabels(['Greedy Selection\nProfit = $160', 'Optimal Selection\nProfit = $220'], fontsize=8.5, fontweight='bold')
ax2.set_ylim(0, 55)
ax2.set_ylabel('Weight (kg)', fontweight='bold')

plt.tight_layout()
plt.savefig('diagrams/diag_knapsack_compare.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 7. Prim & Kruskal Graph MST Diagram (9 Vertices PPT Example)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 4.2), dpi=300)
ax.axis('off')

coords = {
    1: (0.1, 0.5),
    2: (0.22, 0.85),
    8: (0.22, 0.15),
    9: (0.38, 0.55),
    3: (0.45, 0.85),
    7: (0.45, 0.15),
    4: (0.75, 0.85),
    6: (0.75, 0.15),
    5: (0.90, 0.5)
}

edges_info = [
    (1, 2, 1, True), (1, 8, 8, False), (2, 8, 11, False), (2, 3, 8, False),
    (3, 4, 7, True), (4, 5, 9, True), (3, 9, 2, True), (3, 6, 4, True),
    (6, 7, 2, True), (7, 8, 4, True), (8, 9, 7, False), (7, 9, 16, False),
    (4, 6, 14, False), (6, 5, 10, False)
]

for u, v, w, in_mst in edges_info:
    x1, y1 = coords[u]
    x2, y2 = coords[v]
    if in_mst:
        ax.plot([x1, x2], [y1, y2], color='#E53E3E', lw=3.5, zorder=1)
        ax.text((x1+x2)/2, (y1+y2)/2 + 0.03, str(w), color='#9B2C2C', fontsize=9, fontweight='bold',
                bbox=dict(boxstyle='circle,pad=0.15', facecolor='#FFF5F5', edgecolor='#E53E3E'))
    else:
        ax.plot([x1, x2], [y1, y2], color='#A0AEC0', lw=1.2, linestyle=':', zorder=1)
        ax.text((x1+x2)/2, (y1+y2)/2, str(w), color='#4A5568', fontsize=7.5)

for v, (x, y) in coords.items():
    circle = patches.Circle((x, y), 0.042, facecolor='#ED8936', edgecolor='#7B341E', lw=2, zorder=2)
    ax.add_patch(circle)
    ax.text(x, y, str(v), color='white', ha='center', va='center', fontweight='bold', fontsize=10, zorder=3)

ax.text(0.5, 0.98, "Minimum Cost Spanning Tree (MST) on 9-Vertex Graph", ha='center', fontsize=11, fontweight='bold', color='#1A365D')
ax.text(0.5, -0.04, "Red Bold Edges = MST Edges (1-2:1, 3-9:2, 6-7:2, 3-6:4, 7-8:4, 3-4:7, 4-5:9, 2-3:8 [via near])\nTotal Minimum Cost = 28 | Tree Edges = n - 1 = 8",
        ha='center', fontsize=8.5, fontweight='bold', color='#2B6CB0')

plt.tight_layout()
plt.savefig('diagrams/diag_mst_graph.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 8. Dijkstra Single-Source Shortest Path Graph (6 Vertices PPT)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 4), dpi=300)
ax.axis('off')

dijk_coords = {
    1: (0.12, 0.5),
    2: (0.42, 0.82),
    3: (0.12, 0.12),
    4: (0.42, 0.12),
    5: (0.82, 0.82),
    6: (0.82, 0.12)
}

directed_edges = [
    (1, 2, 50, False), (1, 3, 10, True), (1, 5, 45, False),
    (2, 5, 10, False), (3, 1, 20, False), (3, 4, 15, True),
    (4, 2, 20, False), (4, 5, 35, False), (4, 6, 3, True),
    (5, 4, 30, False), (6, 4, 15, False)
]

for u, v, w, is_tree in directed_edges:
    x1, y1 = dijk_coords[u]
    x2, y2 = dijk_coords[v]
    dx, dy = (x2 - x1)*0.78, (y2 - y1)*0.78
    color = '#E53E3E' if is_tree else '#718096'
    lw = 2.5 if is_tree else 1.2
    ax.annotate('', xy=(x1+dx, y1+dy), xytext=(x1, y1),
                arrowprops=dict(facecolor=color, edgecolor=color, width=lw, headwidth=6, shrink=0.08))
    mx, my = (x1+x2)/2, (y1+y2)/2
    ax.text(mx, my+0.02, str(w), fontsize=8, fontweight='bold', color='#1A365D',
            bbox=dict(boxstyle='round,pad=0.15', facecolor='#F7FAFC', edgecolor='#CBD5E0'))

for v, (x, y) in dijk_coords.items():
    bg = '#3182CE' if v == 1 else '#EDF2F7'
    fg = 'white' if v == 1 else '#1A365D'
    circle = patches.Circle((x, y), 0.048, facecolor=bg, edgecolor='#1A365D', lw=2, zorder=3)
    ax.add_patch(circle)
    label = f"v{v}\n(Src)" if v == 1 else f"v{v}"
    ax.text(x, y, label, color=fg, ha='center', va='center', fontweight='bold', fontsize=8, zorder=4)

ax.text(0.5, 0.98, "Dijkstra SSSP on 6-Vertex Digraph (Source = v1)", ha='center', fontsize=11, fontweight='bold', color='#1A365D')
ax.text(0.5, -0.04, "Shortest Paths from v1: v3(10), v4(25 via v3), v6(28 via v4), v2(45 via v4), v5(45 direct)",
        ha='center', fontsize=8.5, fontweight='bold', color='#2B6CB0')

plt.tight_layout()
plt.savefig('diagrams/diag_dijkstra_graph.png', bbox_inches='tight')
plt.close()

# -------------------------------------------------------------
# 9. Job Sequencing Gantt Chart (PPT Example: 4 jobs)
# -------------------------------------------------------------
fig, ax = plt.subplots(figsize=(8, 2.5), dpi=300)

slots = [('Slot [0, 1]', 'Job 4 (Profit=27, d=1)', '#FEB2B2', '#9B2C2C'),
         ('Slot [1, 2]', 'Job 1 (Profit=100, d=2)', '#90CDF4', '#2B6CB0')]

for idx, (slot_lbl, job_lbl, bg, border) in enumerate(slots):
    rect = patches.Rectangle((idx, 0.2), 0.95, 0.5, facecolor=bg, edgecolor=border, lw=2)
    ax.add_patch(rect)
    ax.text(idx + 0.475, 0.45, job_lbl, ha='center', va='center', fontsize=8.5, fontweight='bold', color=border)

ax.set_xlim(-0.1, 2.5)
ax.set_ylim(0, 0.9)
ax.set_xticks([0, 1, 2])
ax.set_xticklabels(['Time 0', 'Time 1\n(Slot 1: J4)', 'Time 2\n(Slot 2: J1)'], fontsize=9, fontweight='bold')
ax.set_yticks([])
ax.set_title('Optimal Job Schedule (Profit = 27 + 100 = 127)', fontsize=10.5, fontweight='bold', color='#1A365D')

plt.tight_layout()
plt.savefig('diagrams/diag_job_sequencing.png', bbox_inches='tight')
plt.close()

print("All 9 crisp educational diagrams generated successfully!")
