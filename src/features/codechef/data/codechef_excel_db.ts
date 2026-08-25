/**
 * CodeChef Master Dataset — Single Source of Truth
 * Rebuilt from OFFICIAL MASTER EXCEL WORKBOOK:
 * C:\Users\saide\OneDrive\Documents\Codex\2026-07-13\files-mentioned-by-the-user-you-2\CodeChef_Master_Dataset.xlsx
 *
 * DO NOT EDIT DIRECTLY. Generated automatically from source of truth.
 * Total Kingdoms: 25
 * Total Patterns: 114
 * Total Problems: 839
 */

export interface ExcelKingdomDef {
  id: string;
  name: string;
  number: number;
  patternCount: number;
  problemCount: number;
  description: string;
  icon: string;
  color: string;
  patternIds: string[];
}

export interface ExcelPatternDef {
  id: string;
  kingdomId: string;
  kingdomName: string;
  name: string;
  number: string;
  description: string;
  problemCount: number;
  difficultyDistribution: Record<string, number>;
  avgEstimatedTime: number;
  problemCodes: string[];
}

export interface ExcelCurriculumProblem {
  code: string;
  title: string;
  kingdomId: string;
  kingdomName: string;
  patternId: string;
  patternName: string;
  difficulty: string;
  rating: number;
  topics: string[];
  estimatedTime: number;
  xp: number;
  url: string;
  notes: string;
  platform: string;
  status: string;
}

export const codechefKingdoms: ExcelKingdomDef[] = [
  {
    "id": "kingdom-1-the-kingdom-of-arrays",
    "name": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "number": 1,
    "patternCount": 6,
    "problemCount": 40,
    "description": "Mastery curriculum for KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS containing 6 patterns and 40 problems.",
    "icon": "\u2694\ufe0f",
    "color": "#3B82F6",
    "patternIds": [
      "pattern-1-1-basic-array-traversal",
      "pattern-1-2-frequency-counting",
      "pattern-1-3-simulation-on-arrays",
      "pattern-1-4-sorting-based-arrays",
      "pattern-1-5-coordinate-compression",
      "pattern-1-6-constructive-arrays"
    ]
  },
  {
    "id": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "name": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "number": 2,
    "patternCount": 4,
    "problemCount": 30,
    "description": "Mastery curriculum for KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY containing 4 patterns and 30 problems.",
    "icon": "\u26a1",
    "color": "#10B981",
    "patternIds": [
      "pattern-2-1-1d-prefix-sum",
      "pattern-2-2-prefix-frequency",
      "pattern-2-3-difference-array",
      "pattern-2-4-prefix-xor"
    ]
  },
  {
    "id": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "name": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "number": 3,
    "patternCount": 4,
    "problemCount": 58,
    "description": "Mastery curriculum for KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW containing 4 patterns and 58 problems.",
    "icon": "\ud83c\udfaf",
    "color": "#F59E0B",
    "patternIds": [
      "pattern-3-1-classic-two-pointers",
      "pattern-3-2-opposite-direction-pointers",
      "pattern-3-3-sliding-window",
      "pattern-3-4-meet-in-the-middle-style"
    ]
  },
  {
    "id": "kingdom-4-the-kingdom-of-binary-search",
    "name": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "number": 4,
    "patternCount": 4,
    "problemCount": 41,
    "description": "Mastery curriculum for KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH containing 4 patterns and 41 problems.",
    "icon": "\ud83d\udd0d",
    "color": "#EC4899",
    "patternIds": [
      "pattern-4-1-classic-binary-search",
      "pattern-4-2-binary-search-on-answer",
      "pattern-4-3-parametric-search",
      "pattern-4-4-continuous-binary-search"
    ]
  },
  {
    "id": "kingdom-5-the-kingdom-of-sorting-greedy",
    "name": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "number": 5,
    "patternCount": 5,
    "problemCount": 40,
    "description": "Mastery curriculum for KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY containing 5 patterns and 40 problems.",
    "icon": "\ud83d\udcca",
    "color": "#8B5CF6",
    "patternIds": [
      "pattern-5-1-basic-greedy",
      "pattern-5-2-greedy-with-sorting",
      "pattern-5-3-interval-greedy",
      "pattern-5-4-greedy-priority-queue",
      "pattern-5-5-constructive-greedy"
    ]
  },
  {
    "id": "kingdom-6-the-kingdom-of-strings",
    "name": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "number": 6,
    "patternCount": 6,
    "problemCount": 37,
    "description": "Mastery curriculum for KINGDOM 6 \u2014 THE KINGDOM OF STRINGS containing 6 patterns and 37 problems.",
    "icon": "\ud83d\udd24",
    "color": "#06B6D4",
    "patternIds": [
      "pattern-6-1-basic-string-processing",
      "pattern-6-2-character-frequency",
      "pattern-6-3-greedy-on-strings",
      "pattern-6-4-prefix-function-kmp",
      "pattern-6-5-z-algorithm",
      "pattern-6-6-hashing"
    ]
  },
  {
    "id": "kingdom-7-the-kingdom-of-bit-manipulation",
    "name": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "number": 7,
    "patternCount": 4,
    "problemCount": 35,
    "description": "Mastery curriculum for KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION containing 4 patterns and 35 problems.",
    "icon": "\ud83d\udd22",
    "color": "#EAB308",
    "patternIds": [
      "pattern-7-1-basic-bit-operations",
      "pattern-7-2-xor-properties",
      "pattern-7-3-bitmask-enumeration",
      "pattern-7-4-trie-xor"
    ]
  },
  {
    "id": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "name": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "number": 8,
    "patternCount": 6,
    "problemCount": 42,
    "description": "Mastery curriculum for KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY containing 6 patterns and 42 problems.",
    "icon": "\ud83d\udcd0",
    "color": "#6366F1",
    "patternIds": [
      "pattern-8-1-basic-mathematics",
      "pattern-8-2-gcd-lcm",
      "pattern-8-3-prime-numbers-sieve",
      "pattern-8-4-modular-arithmetic",
      "pattern-8-5-combinatorics",
      "pattern-8-6-inclusion-exclusion-number-theory"
    ]
  },
  {
    "id": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "name": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "number": 9,
    "patternCount": 4,
    "problemCount": 25,
    "description": "Mastery curriculum for KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING containing 4 patterns and 25 problems.",
    "icon": "\ud83c\udf00",
    "color": "#A855F7",
    "patternIds": [
      "pattern-9-1-basic-recursion",
      "pattern-9-2-brute-force-with-backtracking",
      "pattern-9-3-generate-all-possibilities",
      "pattern-9-4-recursive-divide-construction"
    ]
  },
  {
    "id": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "name": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "number": 10,
    "patternCount": 4,
    "problemCount": 34,
    "description": "Mastery curriculum for KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK containing 4 patterns and 34 problems.",
    "icon": "\ud83e\udd5e",
    "color": "#F97316",
    "patternIds": [
      "pattern-10-1-basic-stack",
      "pattern-10-2-parentheses",
      "pattern-10-3-monotonic-stack",
      "pattern-10-5-stack-greedy"
    ]
  },
  {
    "id": "kingdom-11-the-kingdom-of-queue-deque",
    "name": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "number": 11,
    "patternCount": 4,
    "problemCount": 20,
    "description": "Mastery curriculum for KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE containing 4 patterns and 20 problems.",
    "icon": "\ud83d\udce5",
    "color": "#14B8A6",
    "patternIds": [
      "pattern-11-1-queue-simulation",
      "pattern-11-2-deque",
      "pattern-11-3-monotonic-queue",
      "pattern-11-4-queue-bfs-style"
    ]
  },
  {
    "id": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "name": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "number": 12,
    "patternCount": 4,
    "problemCount": 20,
    "description": "Mastery curriculum for KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION containing 4 patterns and 20 problems.",
    "icon": "\ud83d\udd17",
    "color": "#64748B",
    "patternIds": [
      "pattern-12-1-simple-simulation",
      "pattern-12-2-circular-simulation",
      "pattern-12-3-simulation-with-data-structures",
      "pattern-12-4-ordered-set-simulation"
    ]
  },
  {
    "id": "kingdom-13-the-kingdom-of-trees",
    "name": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "number": 13,
    "patternCount": 6,
    "problemCount": 50,
    "description": "Mastery curriculum for KINGDOM 13 \u2014 THE KINGDOM OF TREES containing 6 patterns and 50 problems.",
    "icon": "\ud83c\udf32",
    "color": "#22C55E",
    "patternIds": [
      "pattern-13-1-basic-tree-dfs",
      "pattern-13-2-tree-traversal",
      "pattern-13-3-tree-dp",
      "pattern-13-4-binary-lifting-lca",
      "pattern-13-5-rerooting-dp",
      "pattern-13-6-euler-tour"
    ]
  },
  {
    "id": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "name": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "number": 14,
    "patternCount": 5,
    "problemCount": 48,
    "description": "Mastery curriculum for KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS) containing 5 patterns and 48 problems.",
    "icon": "\ud83d\udd78\ufe0f",
    "color": "#84CC16",
    "patternIds": [
      "pattern-14-1-connected-components",
      "pattern-14-2-dfs",
      "pattern-14-4-topological-sort",
      "pattern-14-5-cycle-detection",
      "pattern-14-6-bipartite-graph"
    ]
  },
  {
    "id": "kingdom-15-the-kingdom-of-shortest-paths",
    "name": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "number": 15,
    "patternCount": 4,
    "problemCount": 37,
    "description": "Mastery curriculum for KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS containing 4 patterns and 37 problems.",
    "icon": "\ud83d\ude80",
    "color": "#38BDF8",
    "patternIds": [
      "pattern-15-1-standard-dijkstra",
      "pattern-15-3-0-1-bfs",
      "pattern-15-4-bellman-ford-negative-edges",
      "pattern-15-5-floyd-warshall"
    ]
  },
  {
    "id": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "name": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "number": 16,
    "patternCount": 4,
    "problemCount": 25,
    "description": "Mastery curriculum for KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE containing 4 patterns and 25 problems.",
    "icon": "\ud83c\udf10",
    "color": "#818CF8",
    "patternIds": [
      "pattern-16-1-basic-dsu",
      "pattern-16-2-union-find-applications",
      "pattern-16-3-kruskal-s-mst",
      "pattern-16-5-offline-dsu"
    ]
  },
  {
    "id": "kingdom-17-the-kingdom-of-dynamic-programming",
    "name": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "number": 17,
    "patternCount": 10,
    "problemCount": 68,
    "description": "Mastery curriculum for KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING containing 10 patterns and 68 problems.",
    "icon": "\ud83e\udde9",
    "color": "#F43F5E",
    "patternIds": [
      "pattern-17-1-introduction-to-dp-1d-dp",
      "pattern-17-2-knapsack-dp",
      "pattern-17-3-grid-dp",
      "pattern-17-4-interval-dp",
      "pattern-17-5-digit-dp",
      "pattern-17-6-bitmask-dp",
      "pattern-17-8-dp-on-dag",
      "pattern-17-9-probability-dp",
      "pattern-17-10-prefix-suffix-dp",
      "pattern-17-12-optimization-dp"
    ]
  },
  {
    "id": "kingdom-18-the-kingdom-of-divide-conquer",
    "name": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "number": 18,
    "patternCount": 3,
    "problemCount": 20,
    "description": "Mastery curriculum for KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER containing 3 patterns and 20 problems.",
    "icon": "\u2694\ufe0f",
    "color": "#FB923C",
    "patternIds": [
      "pattern-18-2-merge-sort-applications",
      "pattern-18-3-divide-conquer-on-arrays",
      "pattern-18-4-cdq-divide-conquer"
    ]
  },
  {
    "id": "kingdom-19-the-kingdom-of-segment-trees",
    "name": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "number": 19,
    "patternCount": 6,
    "problemCount": 36,
    "description": "Mastery curriculum for KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES containing 6 patterns and 36 problems.",
    "icon": "\ud83e\ude9c",
    "color": "#A3E635",
    "patternIds": [
      "pattern-19-1-basic-segment-tree",
      "pattern-19-2-range-query-point-update",
      "pattern-19-3-lazy-propagation",
      "pattern-19-4-merge-sort-tree",
      "pattern-19-5-persistent-segment-tree",
      "pattern-19-6-dynamic-segment-tree"
    ]
  },
  {
    "id": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "name": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "number": 20,
    "patternCount": 4,
    "problemCount": 20,
    "description": "Mastery curriculum for KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT) containing 4 patterns and 20 problems.",
    "icon": "\ud83c\udf33",
    "color": "#34D399",
    "patternIds": [
      "pattern-20-1-basic-bit",
      "pattern-20-2-prefix-sum-bit",
      "pattern-20-4-bit-coordinate-compression",
      "pattern-20-5-offline-queries-with-bit"
    ]
  },
  {
    "id": "kingdom-21-the-kingdom-of-trie-string-structures",
    "name": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "number": 21,
    "patternCount": 3,
    "problemCount": 18,
    "description": "Mastery curriculum for KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES containing 3 patterns and 18 problems.",
    "icon": "\ud83c\udf3f",
    "color": "#4ADE80",
    "patternIds": [
      "pattern-21-1-basic-trie",
      "pattern-21-2-xor-trie",
      "pattern-21-3-string-trie-applications"
    ]
  },
  {
    "id": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "name": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "number": 22,
    "patternCount": 3,
    "problemCount": 20,
    "description": "Mastery curriculum for KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY containing 3 patterns and 20 problems.",
    "icon": "\ud83d\udcd0",
    "color": "#FACC15",
    "patternIds": [
      "pattern-22-1-computational-geometry",
      "pattern-22-2-coordinate-geometry",
      "pattern-22-3-area-volume"
    ]
  },
  {
    "id": "kingdom-23-the-kingdom-of-game-theory-nim",
    "name": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "number": 23,
    "patternCount": 3,
    "problemCount": 15,
    "description": "Mastery curriculum for KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM containing 3 patterns and 15 problems.",
    "icon": "\ud83c\udfb2",
    "color": "#E879F9",
    "patternIds": [
      "pattern-23-1-nim-games",
      "pattern-23-2-sprague-grundy",
      "pattern-23-3-subtraction-games"
    ]
  },
  {
    "id": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "name": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "number": 24,
    "patternCount": 3,
    "problemCount": 30,
    "description": "Mastery curriculum for KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS containing 3 patterns and 30 problems.",
    "icon": "\ud83d\udee0\ufe0f",
    "color": "#FB7185",
    "patternIds": [
      "pattern-24-2-greedy-construction",
      "pattern-24-3-constructive-mathematics",
      "pattern-24-4-permutation-construction"
    ]
  },
  {
    "id": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "name": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "number": 25,
    "patternCount": 5,
    "problemCount": 30,
    "description": "Mastery curriculum for KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS containing 5 patterns and 30 problems.",
    "icon": "\ud83c\udf0c",
    "color": "#C084FC",
    "patternIds": [
      "pattern-25-1-computational-geometry",
      "pattern-25-2-coordinate-geometry",
      "pattern-25-3-interactive-problems",
      "pattern-25-4-ad-hoc-observation",
      "pattern-25-5-mixed-expert-problems"
    ]
  }
];

export const codechefPatterns: ExcelPatternDef[] = [
  {
    "id": "pattern-1-1-basic-array-traversal",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.1 \u2014 Basic Array Traversal",
    "number": "1.1",
    "description": "Curated pattern focused on Pattern 1.1 \u2014 Basic Array Traversal with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Beginner": 8
    },
    "avgEstimatedTime": 15,
    "problemCodes": [
      "FLOW001",
      "FLOW002",
      "FLOW004",
      "FLOW006",
      "FLOW007",
      "START01",
      "HS08TEST",
      "LUCKFOUR"
    ]
  },
  {
    "id": "pattern-1-2-frequency-counting",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.2 \u2014 Frequency Counting",
    "number": "1.2",
    "description": "Curated pattern focused on Pattern 1.2 \u2014 Frequency Counting with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy": 7
    },
    "avgEstimatedTime": 25,
    "problemCodes": [
      "VCS",
      "RAINBOWA",
      "TLG",
      "NOTINCOM",
      "COPS",
      "CHN15A",
      "TEMPLE"
    ]
  },
  {
    "id": "pattern-1-3-simulation-on-arrays",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.3 \u2014 Simulation on Arrays",
    "number": "1.3",
    "description": "Curated pattern focused on Pattern 1.3 \u2014 Simulation on Arrays with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Beginner": 1,
      "Easy": 5
    },
    "avgEstimatedTime": 23,
    "problemCodes": [
      "ATM2",
      "ZCO14001",
      "FRK",
      "STFOOD",
      "SNAKPROC",
      "CNOTE"
    ]
  },
  {
    "id": "pattern-1-4-sorting-based-arrays",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "number": "1.4",
    "description": "Curated pattern focused on Pattern 1.4 \u2014 Sorting Based Arrays with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 3,
      "Easy": 4
    },
    "avgEstimatedTime": 31,
    "problemCodes": [
      "ZCO14003",
      "HORSES",
      "CLEANUP",
      "CIELAB",
      "MAXDIFF",
      "CHEFA",
      "TACHSTN"
    ]
  },
  {
    "id": "pattern-1-5-coordinate-compression",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.5 \u2014 Coordinate Compression",
    "number": "1.5",
    "description": "Curated pattern focused on Pattern 1.5 \u2014 Coordinate Compression with 4 core DSA problems.",
    "problemCount": 4,
    "difficultyDistribution": {
      "Medium": 2,
      "Easy": 1,
      "Beginner": 1
    },
    "avgEstimatedTime": 40,
    "problemCodes": [
      "ZCO15004",
      "CHEFPRMS",
      "MOVIEWKN",
      "ARRAYTRM"
    ]
  },
  {
    "id": "pattern-1-6-constructive-arrays",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "name": "Pattern 1.6 \u2014 Constructive Arrays",
    "number": "1.6",
    "description": "Curated pattern focused on Pattern 1.6 \u2014 Constructive Arrays with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy": 3,
      "Easy-Medium": 1,
      "Beginner": 3,
      "Medium": 1
    },
    "avgEstimatedTime": 28,
    "problemCodes": [
      "ALTARAY",
      "SUBINC",
      "CHEFSUM",
      "CHEFRUN",
      "PERMUT2",
      "COCONUT",
      "SUPW",
      "IPLTRC"
    ]
  },
  {
    "id": "pattern-2-1-1d-prefix-sum",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "name": "Pattern 2.1 \u2014 1D Prefix Sum",
    "number": "2.1",
    "description": "Curated pattern focused on Pattern 2.1 \u2014 1D Prefix Sum with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 3,
      "Easy": 3,
      "Easy-Medium": 2
    },
    "avgEstimatedTime": 42,
    "problemCodes": [
      "GCDQ",
      "CSUB",
      "ANUWTP",
      "CHEFDET",
      "COEX",
      "PRESUM1",
      "PRESUM2",
      "PRESUM3"
    ]
  },
  {
    "id": "pattern-2-2-prefix-frequency",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "name": "Pattern 2.2 \u2014 Prefix Frequency",
    "number": "2.2",
    "description": "Curated pattern focused on Pattern 2.2 \u2014 Prefix Frequency with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy": 3,
      "Easy-Medium": 1,
      "Beginner": 1,
      "Medium": 2
    },
    "avgEstimatedTime": 36,
    "problemCodes": [
      "SEGM01",
      "FRGTNL",
      "BLKWHT",
      "BRLADD",
      "PREFREQ1",
      "PREFREQ2",
      "PREFREQ3"
    ]
  },
  {
    "id": "pattern-2-3-difference-array",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "name": "Pattern 2.3 \u2014 Difference Array",
    "number": "2.3",
    "description": "Curated pattern focused on Pattern 2.3 \u2014 Difference Array with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy": 1,
      "Medium": 3,
      "Easy-Medium": 1,
      "Beginner": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 50,
    "problemCodes": [
      "MANYSUMS",
      "STKSTR",
      "SHUFFLE",
      "VACCINE1",
      "DIFFARR1",
      "DIFFARR2",
      "DIFFARR3"
    ]
  },
  {
    "id": "pattern-2-4-prefix-xor",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "name": "Pattern 2.4 \u2014 Prefix XOR",
    "number": "2.4",
    "description": "Curated pattern focused on Pattern 2.4 \u2014 Prefix XOR with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 3,
      "Easy-Medium": 2,
      "Medium-Hard": 1,
      "Hard": 2
    },
    "avgEstimatedTime": 74,
    "problemCodes": [
      "CHEFXOR",
      "XORPAL",
      "XORMAX",
      "XORPROD",
      "PREXOR1",
      "PREXOR2",
      "PREXOR3",
      "PREXOR4"
    ]
  },
  {
    "id": "pattern-3-1-classic-two-pointers",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "name": "Pattern 3.1 \u2014 Classic Two Pointers",
    "number": "3.1",
    "description": "Curated pattern focused on Pattern 3.1 \u2014 Classic Two Pointers with 15 core DSA problems.",
    "problemCount": 15,
    "difficultyDistribution": {
      "Easy-Medium": 3,
      "Medium": 4,
      "Easy": 4,
      "Beginner": 2,
      "Hard": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 47,
    "problemCodes": [
      "CHEFST",
      "ZCO13001",
      "ZCO13003",
      "PAIRING",
      "RECTSQ",
      "TWOPTR1",
      "TWOPTR2",
      "TWOPTR3",
      "TWOPTR4",
      "TWOPTR5",
      "TWOPTR6",
      "TWOPTR7",
      "TWOPTR8",
      "TWOPTR9",
      "TWOPTR10"
    ]
  },
  {
    "id": "pattern-3-2-opposite-direction-pointers",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "name": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "number": "3.2",
    "description": "Curated pattern focused on Pattern 3.2 \u2014 Opposite Direction Pointers with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 4,
      "Easy": 3,
      "Beginner": 1
    },
    "avgEstimatedTime": 41,
    "problemCodes": [
      "ZCO12002",
      "WORMHOLE",
      "SALARY",
      "CARVANS",
      "OPPPTR1",
      "OPPPTR2",
      "OPPPTR3",
      "OPPPTR4"
    ]
  },
  {
    "id": "pattern-3-3-sliding-window",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "name": "Pattern 3.3 \u2014 Sliding Window",
    "number": "3.3",
    "description": "Curated pattern focused on Pattern 3.3 \u2014 Sliding Window with 18 core DSA problems.",
    "problemCount": 18,
    "difficultyDistribution": {
      "Easy": 2,
      "Beginner": 1,
      "Easy-Medium": 2,
      "Medium": 8,
      "Hard": 3,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 65,
    "problemCodes": [
      "RECNDNOS",
      "SPLST",
      "SWAP10HG",
      "SLIDE1",
      "SLIDE2",
      "SLIDE3",
      "SLIDE4",
      "SLIDE5",
      "SLIDE6",
      "SLIDE7",
      "SLIDE8",
      "SLIDE9",
      "SLIDE10",
      "SLIDE11",
      "SLIDE12",
      "SLIDE13",
      "SLIDE14",
      "SLIDE15"
    ]
  },
  {
    "id": "pattern-3-4-meet-in-the-middle-style",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "name": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "number": "3.4",
    "description": "Curated pattern focused on Pattern 3.4 \u2014 Meet in the Middle Style with 17 core DSA problems.",
    "problemCount": 17,
    "difficultyDistribution": {
      "Hard": 13,
      "Medium-Hard": 2,
      "Expert": 2
    },
    "avgEstimatedTime": 124,
    "problemCodes": [
      "MITM1",
      "MITM2",
      "MITM3",
      "MITM4",
      "MITM5",
      "MITM6",
      "MITM7",
      "MITM8",
      "MITM9",
      "MITM10",
      "MITM11",
      "MITM12",
      "MITM13",
      "MITM14",
      "MITM15",
      "MITM16",
      "MITM17"
    ]
  },
  {
    "id": "pattern-4-1-classic-binary-search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "name": "Pattern 4.1 \u2014 Classic Binary Search",
    "number": "4.1",
    "description": "Curated pattern focused on Pattern 4.1 \u2014 Classic Binary Search with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 5,
      "Easy": 2,
      "Easy-Medium": 1,
      "Beginner": 2
    },
    "avgEstimatedTime": 42,
    "problemCodes": [
      "LOWSUM",
      "SMRSTR",
      "STACKS",
      "STRPAIRS",
      "BS101",
      "BS102",
      "BS103",
      "BS104",
      "BS105",
      "BS106"
    ]
  },
  {
    "id": "pattern-4-2-binary-search-on-answer",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "name": "Pattern 4.2 \u2014 Binary Search on Answer",
    "number": "4.2",
    "description": "Curated pattern focused on Pattern 4.2 \u2014 Binary Search on Answer with 14 core DSA problems.",
    "problemCount": 14,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Easy": 1,
      "Medium": 7,
      "Hard": 3,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 73,
    "problemCodes": [
      "SHEOKAND",
      "BSFIT",
      "TRIP",
      "CHEFSET",
      "BSANS1",
      "BSANS2",
      "BSANS3",
      "BSANS4",
      "BSANS5",
      "BSANS6",
      "BSANS7",
      "BSANS8",
      "BSANS9",
      "BSANS10"
    ]
  },
  {
    "id": "pattern-4-3-parametric-search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "name": "Pattern 4.3 \u2014 Parametric Search",
    "number": "4.3",
    "description": "Curated pattern focused on Pattern 4.3 \u2014 Parametric Search with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Easy": 1,
      "Easy-Medium": 1,
      "Hard": 4
    },
    "avgEstimatedTime": 91,
    "problemCodes": [
      "PIPES",
      "PARAM1",
      "PARAM2",
      "PARAM3",
      "PARAM4",
      "PARAM5",
      "PARAM6",
      "PARAM7"
    ]
  },
  {
    "id": "pattern-4-4-continuous-binary-search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "name": "Pattern 4.4 \u2014 Continuous Binary Search",
    "number": "4.4",
    "description": "Curated pattern focused on Pattern 4.4 \u2014 Continuous Binary Search with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Hard": 5,
      "Medium": 2
    },
    "avgEstimatedTime": 100,
    "problemCodes": [
      "EXPENSE",
      "OPTIM",
      "DISTANCE",
      "CONTBS1",
      "CONTBS2",
      "CONTBS3",
      "CONTBS4",
      "CONTBS5",
      "CONTBS6"
    ]
  },
  {
    "id": "pattern-5-1-basic-greedy",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "name": "Pattern 5.1 \u2014 Basic Greedy",
    "number": "5.1",
    "description": "Curated pattern focused on Pattern 5.1 \u2014 Basic Greedy with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy": 6,
      "Medium": 2
    },
    "avgEstimatedTime": 34,
    "problemCodes": [
      "GREE1",
      "GREE2",
      "GREE3",
      "GREE4",
      "GREE5",
      "GREE6",
      "GREE7",
      "GREE8"
    ]
  },
  {
    "id": "pattern-5-2-greedy-with-sorting",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "name": "Pattern 5.2 \u2014 Greedy with Sorting",
    "number": "5.2",
    "description": "Curated pattern focused on Pattern 5.2 \u2014 Greedy with Sorting with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 6,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 61,
    "problemCodes": [
      "INOI1201",
      "GREESORT1",
      "GREESORT2",
      "GREESORT3",
      "GREESORT4",
      "GREESORT5",
      "GREESORT6",
      "GREESORT7"
    ]
  },
  {
    "id": "pattern-5-3-interval-greedy",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "name": "Pattern 5.3 \u2014 Interval Greedy",
    "number": "5.3",
    "description": "Curated pattern focused on Pattern 5.3 \u2014 Interval Greedy with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy": 1,
      "Medium": 6,
      "Hard": 1
    },
    "avgEstimatedTime": 63,
    "problemCodes": [
      "MAXSUM",
      "INTERVAL",
      "BUSS",
      "MEET",
      "INTGREE1",
      "INTGREE2",
      "INTGREE3",
      "INTGREE4"
    ]
  },
  {
    "id": "pattern-5-4-greedy-priority-queue",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "name": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "number": "5.4",
    "description": "Curated pattern focused on Pattern 5.4 \u2014 Greedy + Priority Queue with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 3,
      "Hard": 4
    },
    "avgEstimatedTime": 88,
    "problemCodes": [
      "SAVKONO",
      "POTIONS",
      "CHEFBOOK",
      "GREEPQ1",
      "GREEPQ2",
      "GREEPQ3",
      "GREEPQ4",
      "GREEPQ5"
    ]
  },
  {
    "id": "pattern-5-5-constructive-greedy",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "name": "Pattern 5.5 \u2014 Constructive Greedy",
    "number": "5.5",
    "description": "Curated pattern focused on Pattern 5.5 \u2014 Constructive Greedy with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Beginner": 1,
      "Hard": 2,
      "Medium": 5
    },
    "avgEstimatedTime": 69,
    "problemCodes": [
      "CHEFSTUD",
      "CONSTGREE1",
      "CONSTGREE2",
      "CONSTGREE3",
      "CONSTGREE4",
      "CONSTGREE5",
      "CONSTGREE6",
      "CONSTGREE7"
    ]
  },
  {
    "id": "pattern-6-1-basic-string-processing",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.1 \u2014 Basic String Processing",
    "number": "6.1",
    "description": "Curated pattern focused on Pattern 6.1 \u2014 Basic String Processing with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy": 2,
      "Beginner": 6
    },
    "avgEstimatedTime": 18,
    "problemCodes": [
      "LAPIN",
      "STRPAL",
      "ALPHABET",
      "TWOSTR",
      "CHEFROUT",
      "STR101",
      "STR102",
      "STR103"
    ]
  },
  {
    "id": "pattern-6-2-character-frequency",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.2 \u2014 Character Frequency",
    "number": "6.2",
    "description": "Curated pattern focused on Pattern 6.2 \u2014 Character Frequency with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy": 2,
      "Beginner": 2,
      "Medium": 2
    },
    "avgEstimatedTime": 33,
    "problemCodes": [
      "MAGICHF",
      "ERROR",
      "CHARFREQ1",
      "CHARFREQ2",
      "CHARFREQ3",
      "CHARFREQ4"
    ]
  },
  {
    "id": "pattern-6-3-greedy-on-strings",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.3 \u2014 Greedy on Strings",
    "number": "6.3",
    "description": "Curated pattern focused on Pattern 6.3 \u2014 Greedy on Strings with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 5
    },
    "avgEstimatedTime": 57,
    "problemCodes": [
      "STRGREE1",
      "STRGREE2",
      "STRGREE3",
      "STRGREE4",
      "STRGREE5",
      "STRGREE6"
    ]
  },
  {
    "id": "pattern-6-4-prefix-function-kmp",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "number": "6.4",
    "description": "Curated pattern focused on Pattern 6.4 \u2014 Prefix Function (KMP) with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Medium": 2,
      "Hard": 1,
      "Easy-Medium": 1
    },
    "avgEstimatedTime": 77,
    "problemCodes": [
      "STRMATCH",
      "KMPCC",
      "PATTERN1",
      "KMP101",
      "KMP102",
      "KMP103"
    ]
  },
  {
    "id": "pattern-6-5-z-algorithm",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.5 \u2014 Z Algorithm",
    "number": "6.5",
    "description": "Curated pattern focused on Pattern 6.5 \u2014 Z Algorithm with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Medium": 2,
      "Hard": 1
    },
    "avgEstimatedTime": 84,
    "problemCodes": [
      "ZALG01",
      "STRZCC",
      "ZALG101",
      "ZALG102",
      "ZALG103"
    ]
  },
  {
    "id": "pattern-6-6-hashing",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "name": "Pattern 6.6 \u2014 Hashing",
    "number": "6.6",
    "description": "Curated pattern focused on Pattern 6.6 \u2014 Hashing with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 3,
      "Medium-Hard": 1,
      "Hard": 2
    },
    "avgEstimatedTime": 85,
    "problemCodes": [
      "STRHASH",
      "CHEFHASH",
      "SUBSTRHASH",
      "HASH101",
      "HASH102",
      "HASH103"
    ]
  },
  {
    "id": "pattern-7-1-basic-bit-operations",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "name": "Pattern 7.1 \u2014 Basic Bit Operations",
    "number": "7.1",
    "description": "Curated pattern focused on Pattern 7.1 \u2014 Basic Bit Operations with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Easy": 6,
      "Beginner": 3,
      "Easy-Medium": 1
    },
    "avgEstimatedTime": 24,
    "problemCodes": [
      "FLOW016",
      "FLOW017",
      "FLOW018",
      "FCTRL2",
      "FCTRL",
      "MARBLES",
      "BIT101",
      "BIT102",
      "BIT103",
      "BIT104"
    ]
  },
  {
    "id": "pattern-7-2-xor-properties",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "name": "Pattern 7.2 \u2014 XOR Properties",
    "number": "7.2",
    "description": "Curated pattern focused on Pattern 7.2 \u2014 XOR Properties with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Easy": 1,
      "Beginner": 3,
      "Medium": 4,
      "Hard": 1
    },
    "avgEstimatedTime": 48,
    "problemCodes": [
      "XORAGAIN",
      "XOR101",
      "XOR102",
      "XOR103",
      "XOR104",
      "XOR105",
      "XOR106",
      "XOR107",
      "XOR108"
    ]
  },
  {
    "id": "pattern-7-3-bitmask-enumeration",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "name": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "number": "7.3",
    "description": "Curated pattern focused on Pattern 7.3 \u2014 Bitmask Enumeration with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 3,
      "Medium-Hard": 2,
      "Hard": 2
    },
    "avgEstimatedTime": 80,
    "problemCodes": [
      "BITMASK1",
      "SUBSETBIT",
      "CHEFBIT",
      "MASK101",
      "MASK102",
      "MASK103",
      "MASK104",
      "MASK105"
    ]
  },
  {
    "id": "pattern-7-4-trie-xor",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "name": "Pattern 7.4 \u2014 Trie + XOR",
    "number": "7.4",
    "description": "Curated pattern focused on Pattern 7.4 \u2014 Trie + XOR with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Hard": 4,
      "Expert": 2
    },
    "avgEstimatedTime": 128,
    "problemCodes": [
      "XORPAIR",
      "TRIEXOR",
      "TRIEXOR101",
      "TRIEXOR102",
      "TRIEXOR103",
      "TRIEXOR104",
      "TRIEXOR105",
      "TRIEXOR106"
    ]
  },
  {
    "id": "pattern-8-1-basic-mathematics",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.1 \u2014 Basic Mathematics",
    "number": "8.1",
    "description": "Curated pattern focused on Pattern 8.1 \u2014 Basic Mathematics with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Beginner": 8
    },
    "avgEstimatedTime": 15,
    "problemCodes": [
      "FLOW009",
      "FLOW010",
      "FLOW011",
      "FLOW013",
      "FLOW014",
      "FSQRT",
      "MATH101",
      "MATH102"
    ]
  },
  {
    "id": "pattern-8-2-gcd-lcm",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.2 \u2014 GCD & LCM",
    "number": "8.2",
    "description": "Curated pattern focused on Pattern 8.2 \u2014 GCD & LCM with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 2,
      "Easy": 1,
      "Medium": 2,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 58,
    "problemCodes": [
      "GCD2",
      "CHEFGCD",
      "LCMGCD",
      "GCD101",
      "GCD102",
      "GCD103",
      "GCD104"
    ]
  },
  {
    "id": "pattern-8-3-prime-numbers-sieve",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "number": "8.3",
    "description": "Curated pattern focused on Pattern 8.3 \u2014 Prime Numbers & Sieve with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Beginner": 1,
      "Easy": 1,
      "Medium": 3,
      "Easy-Medium": 1
    },
    "avgEstimatedTime": 43,
    "problemCodes": [
      "PRB01",
      "SEIVE1",
      "PRIMES2",
      "PRIME1",
      "PRIME101",
      "PRIME102"
    ]
  },
  {
    "id": "pattern-8-4-modular-arithmetic",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.4 \u2014 Modular Arithmetic",
    "number": "8.4",
    "description": "Curated pattern focused on Pattern 8.4 \u2014 Modular Arithmetic with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Easy": 1,
      "Medium": 2,
      "Medium-Hard": 1,
      "Hard": 1
    },
    "avgEstimatedTime": 66,
    "problemCodes": [
      "MODEX",
      "POWMOD",
      "MODINV1",
      "MODINV2",
      "CRT1",
      "MOD101"
    ]
  },
  {
    "id": "pattern-8-5-combinatorics",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.5 \u2014 Combinatorics",
    "number": "8.5",
    "description": "Curated pattern focused on Pattern 8.5 \u2014 Combinatorics with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 2,
      "Medium": 1,
      "Beginner": 1,
      "Medium-Hard": 1,
      "Hard": 2
    },
    "avgEstimatedTime": 69,
    "problemCodes": [
      "COMB1",
      "CHEFCOMB",
      "PASCTRI",
      "COMB101",
      "COMB102",
      "COMB103",
      "COMB104"
    ]
  },
  {
    "id": "pattern-8-6-inclusion-exclusion-number-theory",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "name": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "number": "8.6",
    "description": "Curated pattern focused on Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 1,
      "Medium-Hard": 2,
      "Hard": 4,
      "Expert": 1
    },
    "avgEstimatedTime": 112,
    "problemCodes": [
      "NUMTH1",
      "INCEXC",
      "EULER1",
      "MOBIUS1",
      "INCEXC101",
      "INCEXC102",
      "INCEXC103",
      "INCEXC104"
    ]
  },
  {
    "id": "pattern-9-1-basic-recursion",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "name": "Pattern 9.1 \u2014 Basic Recursion",
    "number": "9.1",
    "description": "Curated pattern focused on Pattern 9.1 \u2014 Basic Recursion with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy": 2,
      "Beginner": 1,
      "Easy-Medium": 1,
      "Medium": 2
    },
    "avgEstimatedTime": 38,
    "problemCodes": [
      "TRISQ",
      "FIBO1",
      "REC101",
      "REC102",
      "REC103",
      "REC104"
    ]
  },
  {
    "id": "pattern-9-2-brute-force-with-backtracking",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "name": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "number": "9.2",
    "description": "Curated pattern focused on Pattern 9.2 \u2014 Brute Force with Backtracking with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 3,
      "Medium": 3
    },
    "avgEstimatedTime": 90,
    "problemCodes": [
      "NQUEENS",
      "SUDOKU",
      "PERMUT1",
      "BACK101",
      "BACK102",
      "BACK103"
    ]
  },
  {
    "id": "pattern-9-3-generate-all-possibilities",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "name": "Pattern 9.3 \u2014 Generate All Possibilities",
    "number": "9.3",
    "description": "Curated pattern focused on Pattern 9.3 \u2014 Generate All Possibilities with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 5,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 65,
    "problemCodes": [
      "SUBSETS",
      "ALLPERM",
      "BACKTRK1",
      "GEN101",
      "GEN102",
      "GEN103"
    ]
  },
  {
    "id": "pattern-9-4-recursive-divide-construction",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "name": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "number": "9.4",
    "description": "Curated pattern focused on Pattern 9.4 \u2014 Recursive Divide Construction with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 2,
      "Medium-Hard": 1,
      "Medium": 4
    },
    "avgEstimatedTime": 81,
    "problemCodes": [
      "DIVREC1",
      "HANOI1",
      "DIVREC101",
      "DIVREC102",
      "DIVREC103",
      "DIVREC104",
      "DIVREC105"
    ]
  },
  {
    "id": "pattern-10-1-basic-stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "name": "Pattern 10.1 \u2014 Basic Stack",
    "number": "10.1",
    "description": "Curated pattern focused on Pattern 10.1 \u2014 Basic Stack with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Beginner": 2,
      "Medium": 4,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 50,
    "problemCodes": [
      "COMPILER",
      "STACK1",
      "PAREN1",
      "BSTACK101",
      "BSTACK102",
      "BSTACK103",
      "BSTACK104",
      "BSTACK105"
    ]
  },
  {
    "id": "pattern-10-2-parentheses",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "name": "Pattern 10.2 \u2014 Parentheses",
    "number": "10.2",
    "description": "Curated pattern focused on Pattern 10.2 \u2014 Parentheses with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 4,
      "Easy": 1,
      "Hard": 1
    },
    "avgEstimatedTime": 61,
    "problemCodes": [
      "ZCO12001",
      "MATCHING",
      "BRACKETS",
      "PAR101",
      "PAR102",
      "PAR103",
      "PAR104"
    ]
  },
  {
    "id": "pattern-10-3-monotonic-stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "name": "Pattern 10.3 \u2014 Monotonic Stack",
    "number": "10.3",
    "description": "Curated pattern focused on Pattern 10.3 \u2014 Monotonic Stack with 12 core DSA problems.",
    "problemCount": 12,
    "difficultyDistribution": {
      "Medium": 4,
      "Medium-Hard": 3,
      "Hard": 4,
      "Easy": 1
    },
    "avgEstimatedTime": 85,
    "problemCodes": [
      "ZCO14002",
      "INOI1301",
      "MAXRECT",
      "HISTOG",
      "MONOSTACK1",
      "MONOSTACK2",
      "MONOSTACK3",
      "MONOSTACK4",
      "MONOSTACK5",
      "MONOSTACK6",
      "MONOSTACK7",
      "MONOSTACK8"
    ]
  },
  {
    "id": "pattern-10-5-stack-greedy",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "name": "Pattern 10.5 \u2014 Stack + Greedy",
    "number": "10.5",
    "description": "Curated pattern focused on Pattern 10.5 \u2014 Stack + Greedy with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Medium-Hard": 4,
      "Medium": 3
    },
    "avgEstimatedTime": 77,
    "problemCodes": [
      "STKGREEDY",
      "EVALEXPR",
      "STKGREE1",
      "STKGREE2",
      "STKGREE3",
      "STKGREE4",
      "STKGREE5"
    ]
  },
  {
    "id": "pattern-11-1-queue-simulation",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "name": "Pattern 11.1 \u2014 Queue Simulation",
    "number": "11.1",
    "description": "Curated pattern focused on Pattern 11.1 \u2014 Queue Simulation with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Easy": 2,
      "Medium": 3
    },
    "avgEstimatedTime": 46,
    "problemCodes": [
      "QUEUE1",
      "SLIDING1",
      "BREADTH1",
      "QSIM101",
      "QSIM102"
    ]
  },
  {
    "id": "pattern-11-2-deque",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "name": "Pattern 11.2 \u2014 Deque",
    "number": "11.2",
    "description": "Curated pattern focused on Pattern 11.2 \u2014 Deque with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium": 1,
      "Hard": 2,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 96,
    "problemCodes": [
      "DEQUE1",
      "SLIDINGMAX",
      "MAXDEQUE",
      "DEQ101",
      "DEQ102"
    ]
  },
  {
    "id": "pattern-11-3-monotonic-queue",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "name": "Pattern 11.3 \u2014 Monotonic Queue",
    "number": "11.3",
    "description": "Curated pattern focused on Pattern 11.3 \u2014 Monotonic Queue with 4 core DSA problems.",
    "problemCount": 4,
    "difficultyDistribution": {
      "Hard": 3,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 112,
    "problemCodes": [
      "SLIDINGWINDOW",
      "MONOQUEUE",
      "MONOQ101",
      "MONOQ102"
    ]
  },
  {
    "id": "pattern-11-4-queue-bfs-style",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "name": "Pattern 11.4 \u2014 Queue + BFS Style",
    "number": "11.4",
    "description": "Curated pattern focused on Pattern 11.4 \u2014 Queue + BFS Style with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 5,
      "Hard": 1
    },
    "avgEstimatedTime": 70,
    "problemCodes": [
      "BFSQUEUE",
      "SHORTQ",
      "QBFS101",
      "QBFS102",
      "QBFS103",
      "QBFS104"
    ]
  },
  {
    "id": "pattern-12-1-simple-simulation",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "name": "Pattern 12.1 \u2014 Simple Simulation",
    "number": "12.1",
    "description": "Curated pattern focused on Pattern 12.1 \u2014 Simple Simulation with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Easy": 3,
      "Beginner": 2
    },
    "avgEstimatedTime": 21,
    "problemCodes": [
      "SIM101",
      "SIM102",
      "SIM103",
      "SIM104",
      "SIM105"
    ]
  },
  {
    "id": "pattern-12-2-circular-simulation",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "name": "Pattern 12.2 \u2014 Circular Simulation",
    "number": "12.2",
    "description": "Curated pattern focused on Pattern 12.2 \u2014 Circular Simulation with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium": 4,
      "Easy": 1
    },
    "avgEstimatedTime": 53,
    "problemCodes": [
      "JOSEPHUS",
      "CIRCSIM",
      "CIRCLIST101",
      "CIRCLIST102",
      "CIRCLIST103"
    ]
  },
  {
    "id": "pattern-12-3-simulation-with-data-structures",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "name": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "number": "12.3",
    "description": "Curated pattern focused on Pattern 12.3 \u2014 Simulation with Data Structures with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium-Hard": 1,
      "Hard": 1,
      "Medium": 3
    },
    "avgEstimatedTime": 78,
    "problemCodes": [
      "SIMDATA",
      "GRIDWALK",
      "SIMDS101",
      "SIMDS102",
      "SIMDS103"
    ]
  },
  {
    "id": "pattern-12-4-ordered-set-simulation",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "name": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "number": "12.4",
    "description": "Curated pattern focused on Pattern 12.4 \u2014 Ordered Set Simulation with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Hard": 3,
      "Medium": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 102,
    "problemCodes": [
      "ORDERSET",
      "MEDIAN1",
      "ORDSET101",
      "ORDSET102",
      "ORDSET103"
    ]
  },
  {
    "id": "pattern-13-1-basic-tree-dfs",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.1 \u2014 Basic Tree DFS",
    "number": "13.1",
    "description": "Curated pattern focused on Pattern 13.1 \u2014 Basic Tree DFS with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Beginner": 3,
      "Easy": 5,
      "Medium": 1
    },
    "avgEstimatedTime": 26,
    "problemCodes": [
      "TREE1",
      "TREEDFS",
      "SUBTREE1",
      "TREE101",
      "TREE102",
      "TREE103",
      "TREE104",
      "TREE105",
      "TREE106"
    ]
  },
  {
    "id": "pattern-13-2-tree-traversal",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.2 \u2014 Tree Traversal",
    "number": "13.2",
    "description": "Curated pattern focused on Pattern 13.2 \u2014 Tree Traversal with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Easy": 3,
      "Beginner": 1,
      "Medium": 4,
      "Hard": 1
    },
    "avgEstimatedTime": 50,
    "problemCodes": [
      "TRAVERSE1",
      "TREELEAF",
      "HEIGHT1",
      "TTRAV101",
      "TTRAV102",
      "TTRAV103",
      "TTRAV104",
      "TTRAV105",
      "TTRAV106"
    ]
  },
  {
    "id": "pattern-13-3-tree-dp",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.3 \u2014 Tree DP",
    "number": "13.3",
    "description": "Curated pattern focused on Pattern 13.3 \u2014 Tree DP with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Hard": 2,
      "Medium": 5
    },
    "avgEstimatedTime": 80,
    "problemCodes": [
      "INOI1402",
      "TREEDP1",
      "INDEPENDENT",
      "MAXWEIGHT",
      "TDP101",
      "TDP102",
      "TDP103",
      "TDP104",
      "TDP105"
    ]
  },
  {
    "id": "pattern-13-4-binary-lifting-lca",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "number": "13.4",
    "description": "Curated pattern focused on Pattern 13.4 \u2014 Binary Lifting (LCA) with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Easy": 1,
      "Medium": 2,
      "Hard": 3
    },
    "avgEstimatedTime": 86,
    "problemCodes": [
      "TALCA",
      "LCA1",
      "ANCESTOR1",
      "LCA101",
      "LCA102",
      "LCA103",
      "LCA104",
      "LCA105"
    ]
  },
  {
    "id": "pattern-13-5-rerooting-dp",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.5 \u2014 Rerooting DP",
    "number": "13.5",
    "description": "Curated pattern focused on Pattern 13.5 \u2014 Rerooting DP with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 4,
      "Medium-Hard": 1,
      "Medium": 1,
      "Expert": 1
    },
    "avgEstimatedTime": 116,
    "problemCodes": [
      "REROOT1",
      "TREECENTROID",
      "REROOT101",
      "REROOT102",
      "REROOT103",
      "REROOT104",
      "REROOT105"
    ]
  },
  {
    "id": "pattern-13-6-euler-tour",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "name": "Pattern 13.6 \u2014 Euler Tour",
    "number": "13.6",
    "description": "Curated pattern focused on Pattern 13.6 \u2014 Euler Tour with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Hard": 7,
      "Expert": 1
    },
    "avgEstimatedTime": 128,
    "problemCodes": [
      "EULERTOUR1",
      "SUBTREEQUERY",
      "ETOUR101",
      "ETOUR102",
      "ETOUR103",
      "ETOUR104",
      "ETOUR105",
      "ETOUR106"
    ]
  },
  {
    "id": "pattern-14-1-connected-components",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "name": "Pattern 14.1 \u2014 Connected Components",
    "number": "14.1",
    "description": "Curated pattern focused on Pattern 14.1 \u2014 Connected Components with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 9,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 63,
    "problemCodes": [
      "FIRESC",
      "DISHOWN",
      "CONNECT1",
      "CONN101",
      "CONN102",
      "CONN103",
      "CONN104",
      "CONN105",
      "CONN106",
      "CONN107"
    ]
  },
  {
    "id": "pattern-14-2-dfs",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "name": "Pattern 14.2 \u2014 DFS",
    "number": "14.2",
    "description": "Curated pattern focused on Pattern 14.2 \u2014 DFS with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Easy": 2,
      "Medium": 5,
      "Hard": 3
    },
    "avgEstimatedTime": 71,
    "problemCodes": [
      "DFS1",
      "GRAPHDFS",
      "PATHFIND",
      "DFS101",
      "DFS102",
      "DFS103",
      "DFS104",
      "DFS105",
      "DFS106",
      "DFS107"
    ]
  },
  {
    "id": "pattern-14-4-topological-sort",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "name": "Pattern 14.4 \u2014 Topological Sort",
    "number": "14.4",
    "description": "Curated pattern focused on Pattern 14.4 \u2014 Topological Sort with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Medium": 5,
      "Hard": 4
    },
    "avgEstimatedTime": 87,
    "problemCodes": [
      "TOPSORT1",
      "DEPENDENCY",
      "TOP101",
      "TOP102",
      "TOP103",
      "TOP104",
      "TOP105",
      "TOP106",
      "TOP107"
    ]
  },
  {
    "id": "pattern-14-5-cycle-detection",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "name": "Pattern 14.5 \u2014 Cycle Detection",
    "number": "14.5",
    "description": "Curated pattern focused on Pattern 14.5 \u2014 Cycle Detection with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 5,
      "Hard": 3
    },
    "avgEstimatedTime": 78,
    "problemCodes": [
      "CYCLEDET",
      "DIRECTEDCYC",
      "CYC101",
      "CYC102",
      "CYC103",
      "CYC104",
      "CYC105",
      "CYC106",
      "CYC107"
    ]
  },
  {
    "id": "pattern-14-6-bipartite-graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "name": "Pattern 14.6 \u2014 Bipartite Graph",
    "number": "14.6",
    "description": "Curated pattern focused on Pattern 14.6 \u2014 Bipartite Graph with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 4,
      "Hard": 4,
      "Expert": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 99,
    "problemCodes": [
      "BIPARTITE1",
      "TWOCOLOR",
      "BIP101",
      "BIP102",
      "BIP103",
      "BIP104",
      "BIP105",
      "BIP106",
      "BIP107",
      "BIP108"
    ]
  },
  {
    "id": "pattern-15-1-standard-dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "name": "Pattern 15.1 \u2014 Standard Dijkstra",
    "number": "15.1",
    "description": "Curated pattern focused on Pattern 15.1 \u2014 Standard Dijkstra with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 4,
      "Medium-Hard": 1,
      "Hard": 5
    },
    "avgEstimatedTime": 93,
    "problemCodes": [
      "DIJKSTRA1",
      "SHORTPATH",
      "DIJ101",
      "DIJ102",
      "DIJ103",
      "DIJ104",
      "DIJ105",
      "DIJ106",
      "DIJ107",
      "DIJ108"
    ]
  },
  {
    "id": "pattern-15-3-0-1-bfs",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "name": "Pattern 15.3 \u2014 0-1 BFS",
    "number": "15.3",
    "description": "Curated pattern focused on Pattern 15.3 \u2014 0-1 BFS with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 3,
      "Hard": 3,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 90,
    "problemCodes": [
      "BFS01",
      "CHEAPEST1",
      "Z1BFS101",
      "Z1BFS102",
      "Z1BFS103",
      "Z1BFS104",
      "Z1BFS105",
      "Z1BFS106"
    ]
  },
  {
    "id": "pattern-15-4-bellman-ford-negative-edges",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "name": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "number": "15.4",
    "description": "Curated pattern focused on Pattern 15.4 \u2014 Bellman-Ford / Negative Edges with 9 core DSA problems.",
    "problemCount": 9,
    "difficultyDistribution": {
      "Medium-Hard": 3,
      "Medium": 1,
      "Hard": 5
    },
    "avgEstimatedTime": 103,
    "problemCodes": [
      "BELLMAN1",
      "NEGATIVE1",
      "BF101",
      "BF102",
      "BF103",
      "BF104",
      "BF105",
      "BF106",
      "BF107"
    ]
  },
  {
    "id": "pattern-15-5-floyd-warshall",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "name": "Pattern 15.5 \u2014 Floyd Warshall",
    "number": "15.5",
    "description": "Curated pattern focused on Pattern 15.5 \u2014 Floyd Warshall with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium-Hard": 3,
      "Medium": 4,
      "Hard": 3
    },
    "avgEstimatedTime": 87,
    "problemCodes": [
      "FLOYD1",
      "ALLPAIRS",
      "FW101",
      "FW102",
      "FW103",
      "FW104",
      "FW105",
      "FW106",
      "FW107",
      "FW108"
    ]
  },
  {
    "id": "pattern-16-1-basic-dsu",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "name": "Pattern 16.1 \u2014 Basic DSU",
    "number": "16.1",
    "description": "Curated pattern focused on Pattern 16.1 \u2014 Basic DSU with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 5
    },
    "avgEstimatedTime": 57,
    "problemCodes": [
      "DSU1",
      "DSU101",
      "DSU102",
      "DSU103",
      "DSU104",
      "DSU105"
    ]
  },
  {
    "id": "pattern-16-2-union-find-applications",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "name": "Pattern 16.2 \u2014 Union Find Applications",
    "number": "16.2",
    "description": "Curated pattern focused on Pattern 16.2 \u2014 Union Find Applications with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Medium-Hard": 1,
      "Hard": 3,
      "Medium": 3
    },
    "avgEstimatedTime": 90,
    "problemCodes": [
      "UNIONFIND1",
      "CONNECTED2",
      "UFA101",
      "UFA102",
      "UFA103",
      "UFA104",
      "UFA105"
    ]
  },
  {
    "id": "pattern-16-3-kruskal-s-mst",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "name": "Pattern 16.3 \u2014 Kruskal's MST",
    "number": "16.3",
    "description": "Curated pattern focused on Pattern 16.3 \u2014 Kruskal's MST with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Medium": 4,
      "Hard": 2,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 81,
    "problemCodes": [
      "MST1",
      "KRUSKAL1",
      "MINSPAN",
      "KMST101",
      "KMST102",
      "KMST103",
      "KMST104"
    ]
  },
  {
    "id": "pattern-16-5-offline-dsu",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "name": "Pattern 16.5 \u2014 Offline DSU",
    "number": "16.5",
    "description": "Curated pattern focused on Pattern 16.5 \u2014 Offline DSU with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Hard": 3,
      "Expert": 2
    },
    "avgEstimatedTime": 144,
    "problemCodes": [
      "OFFLINEDSU",
      "DYNAMICCONN",
      "OFFDSU101",
      "OFFDSU102",
      "OFFDSU103"
    ]
  },
  {
    "id": "pattern-17-1-introduction-to-dp-1d-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "number": "17.1",
    "description": "Curated pattern focused on Pattern 17.1 \u2014 Introduction to DP (1D DP) with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Beginner": 1,
      "Easy": 1,
      "Medium": 5,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 54,
    "problemCodes": [
      "DP1D101",
      "DP1D102",
      "DP1D103",
      "DP1D104",
      "DP1D105",
      "DP1D106",
      "DP1D107",
      "DP1D108"
    ]
  },
  {
    "id": "pattern-17-2-knapsack-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.2 \u2014 Knapsack DP",
    "number": "17.2",
    "description": "Curated pattern focused on Pattern 17.2 \u2014 Knapsack DP with 8 core DSA problems.",
    "problemCount": 8,
    "difficultyDistribution": {
      "Medium": 7,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 64,
    "problemCodes": [
      "KNAPSACK1",
      "SUBSETSUM",
      "RATIONAL",
      "KNAP101",
      "KNAP102",
      "KNAP103",
      "KNAP104",
      "KNAP105"
    ]
  },
  {
    "id": "pattern-17-3-grid-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.3 \u2014 Grid DP",
    "number": "17.3",
    "description": "Curated pattern focused on Pattern 17.3 \u2014 Grid DP with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Medium": 3,
      "Hard": 3
    },
    "avgEstimatedTime": 83,
    "problemCodes": [
      "GRIDDP1",
      "MAXPATH",
      "CHEFGRID",
      "GDP101",
      "GDP102",
      "GDP103",
      "GDP104"
    ]
  },
  {
    "id": "pattern-17-4-interval-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.4 \u2014 Interval DP",
    "number": "17.4",
    "description": "Curated pattern focused on Pattern 17.4 \u2014 Interval DP with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Medium-Hard": 2,
      "Medium": 2,
      "Hard": 3
    },
    "avgEstimatedTime": 94,
    "problemCodes": [
      "INTERVALDP",
      "MATRIXMULT",
      "PALINDP",
      "INDP101",
      "INDP102",
      "INDP103",
      "INDP104"
    ]
  },
  {
    "id": "pattern-17-5-digit-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.5 \u2014 Digit DP",
    "number": "17.5",
    "description": "Curated pattern focused on Pattern 17.5 \u2014 Digit DP with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 6,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 116,
    "problemCodes": [
      "DIGITDP1",
      "COUNTDIGIT",
      "DIG101",
      "DIG102",
      "DIG103",
      "DIG104",
      "DIG105"
    ]
  },
  {
    "id": "pattern-17-6-bitmask-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.6 \u2014 Bitmask DP",
    "number": "17.6",
    "description": "Curated pattern focused on Pattern 17.6 \u2014 Bitmask DP with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 4,
      "Medium-Hard": 2,
      "Medium": 1
    },
    "avgEstimatedTime": 103,
    "problemCodes": [
      "BITMASKDP",
      "ASSIGN1",
      "TSP1",
      "BMDP101",
      "BMDP102",
      "BMDP103",
      "BMDP104"
    ]
  },
  {
    "id": "pattern-17-8-dp-on-dag",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.8 \u2014 DP on DAG",
    "number": "17.8",
    "description": "Curated pattern focused on Pattern 17.8 \u2014 DP on DAG with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 2,
      "Hard": 3,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 95,
    "problemCodes": [
      "DAGDP1",
      "LONGESTPATH",
      "DAG101",
      "DAG102",
      "DAG103",
      "DAG104"
    ]
  },
  {
    "id": "pattern-17-9-probability-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.9 \u2014 Probability DP",
    "number": "17.9",
    "description": "Curated pattern focused on Pattern 17.9 \u2014 Probability DP with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 4,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 70,
    "problemCodes": [
      "PROBDP1",
      "DICE1",
      "PRBDP101",
      "PRBDP102",
      "PRBDP103",
      "PRBDP104"
    ]
  },
  {
    "id": "pattern-17-10-prefix-suffix-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "number": "17.10",
    "description": "Curated pattern focused on Pattern 17.10 \u2014 Prefix/Suffix DP with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 2,
      "Medium-Hard": 1,
      "Hard": 3
    },
    "avgEstimatedTime": 95,
    "problemCodes": [
      "PREFIXDP",
      "SUFFIXDP",
      "PSDP101",
      "PSDP102",
      "PSDP103",
      "PSDP104"
    ]
  },
  {
    "id": "pattern-17-12-optimization-dp",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "name": "Pattern 17.12 \u2014 Optimization DP",
    "number": "17.12",
    "description": "Curated pattern focused on Pattern 17.12 \u2014 Optimization DP with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 4,
      "Expert": 2
    },
    "avgEstimatedTime": 140,
    "problemCodes": [
      "CHT1",
      "MONOOPT",
      "OPTDP101",
      "OPTDP102",
      "OPTDP103",
      "OPTDP104"
    ]
  },
  {
    "id": "pattern-18-2-merge-sort-applications",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "name": "Pattern 18.2 \u2014 Merge Sort Applications",
    "number": "18.2",
    "description": "Curated pattern focused on Pattern 18.2 \u2014 Merge Sort Applications with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Beginner": 1,
      "Easy-Medium": 1,
      "Medium-Hard": 1,
      "Hard": 3
    },
    "avgEstimatedTime": 84,
    "problemCodes": [
      "TSORT",
      "MERGESORT1",
      "INVERSION",
      "MSAPP101",
      "MSAPP102",
      "MSAPP103"
    ]
  },
  {
    "id": "pattern-18-3-divide-conquer-on-arrays",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "name": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "number": "18.3",
    "description": "Curated pattern focused on Pattern 18.3 \u2014 Divide & Conquer on Arrays with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy-Medium": 1,
      "Easy": 1,
      "Medium": 3,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 61,
    "problemCodes": [
      "DIVARR1",
      "MAXSUBARR",
      "DCARR101",
      "DCARR102",
      "DCARR103",
      "DCARR104",
      "DCARR105"
    ]
  },
  {
    "id": "pattern-18-4-cdq-divide-conquer",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "name": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "number": "18.4",
    "description": "Curated pattern focused on Pattern 18.4 \u2014 CDQ Divide & Conquer with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 3,
      "Expert": 4
    },
    "avgEstimatedTime": 154,
    "problemCodes": [
      "CDQ1",
      "3DPOINTS",
      "CDQ101",
      "CDQ102",
      "CDQ103",
      "CDQ104",
      "CDQ105"
    ]
  },
  {
    "id": "pattern-19-1-basic-segment-tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.1 \u2014 Basic Segment Tree",
    "number": "19.1",
    "description": "Curated pattern focused on Pattern 19.1 \u2014 Basic Segment Tree with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 4,
      "Medium-Hard": 2
    },
    "avgEstimatedTime": 70,
    "problemCodes": [
      "SEGTREE1",
      "RANGEQUERY",
      "BST101",
      "BST102",
      "BST103",
      "BST104"
    ]
  },
  {
    "id": "pattern-19-2-range-query-point-update",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.2 \u2014 Range Query + Point Update",
    "number": "19.2",
    "description": "Curated pattern focused on Pattern 19.2 \u2014 Range Query + Point Update with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 2,
      "Hard": 3,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 95,
    "problemCodes": [
      "POINTUPDATE",
      "SUMQUERY",
      "RQPU101",
      "RQPU102",
      "RQPU103",
      "RQPU104"
    ]
  },
  {
    "id": "pattern-19-3-lazy-propagation",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.3 \u2014 Lazy Propagation",
    "number": "19.3",
    "description": "Curated pattern focused on Pattern 19.3 \u2014 Lazy Propagation with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 5,
      "Expert": 1
    },
    "avgEstimatedTime": 130,
    "problemCodes": [
      "LAZYPROP",
      "RANGEADD",
      "LAZY101",
      "LAZY102",
      "LAZY103",
      "LAZY104"
    ]
  },
  {
    "id": "pattern-19-4-merge-sort-tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.4 \u2014 Merge Sort Tree",
    "number": "19.4",
    "description": "Curated pattern focused on Pattern 19.4 \u2014 Merge Sort Tree with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 4,
      "Expert": 2
    },
    "avgEstimatedTime": 140,
    "problemCodes": [
      "MERGETREE",
      "KTHMIN",
      "MST101",
      "MST102",
      "MST103",
      "MST104"
    ]
  },
  {
    "id": "pattern-19-5-persistent-segment-tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "number": "19.5",
    "description": "Curated pattern focused on Pattern 19.5 \u2014 Persistent Segment Tree with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 3,
      "Expert": 3
    },
    "avgEstimatedTime": 150,
    "problemCodes": [
      "PERSISTENT1",
      "HISTORICAL",
      "PST101",
      "PST102",
      "PST103",
      "PST104"
    ]
  },
  {
    "id": "pattern-19-6-dynamic-segment-tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "name": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "number": "19.6",
    "description": "Curated pattern focused on Pattern 19.6 \u2014 Dynamic Segment Tree with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 3,
      "Expert": 3
    },
    "avgEstimatedTime": 150,
    "problemCodes": [
      "DYNSEGTREE",
      "SPARSEST",
      "DST101",
      "DST102",
      "DST103",
      "DST104"
    ]
  },
  {
    "id": "pattern-20-1-basic-bit",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "name": "Pattern 20.1 \u2014 Basic BIT",
    "number": "20.1",
    "description": "Curated pattern focused on Pattern 20.1 \u2014 Basic BIT with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium": 3,
      "Hard": 2
    },
    "avgEstimatedTime": 84,
    "problemCodes": [
      "BIT1",
      "FENWICK1",
      "BBIT101",
      "BBIT102",
      "BBIT103"
    ]
  },
  {
    "id": "pattern-20-2-prefix-sum-bit",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "name": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "number": "20.2",
    "description": "Curated pattern focused on Pattern 20.2 \u2014 Prefix Sum BIT with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium": 3,
      "Hard": 2
    },
    "avgEstimatedTime": 84,
    "problemCodes": [
      "BITPREFIX",
      "RANGEBIT",
      "PSBIT101",
      "PSBIT102",
      "PSBIT103"
    ]
  },
  {
    "id": "pattern-20-4-bit-coordinate-compression",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "name": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "number": "20.4",
    "description": "Curated pattern focused on Pattern 20.4 \u2014 BIT + Coordinate Compression with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Medium": 1,
      "Hard": 3,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 102,
    "problemCodes": [
      "BITCOMPRESS",
      "BITCC101",
      "BITCC102",
      "BITCC103",
      "BITCC104"
    ]
  },
  {
    "id": "pattern-20-5-offline-queries-with-bit",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "name": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "number": "20.5",
    "description": "Curated pattern focused on Pattern 20.5 \u2014 Offline Queries with BIT with 5 core DSA problems.",
    "problemCount": 5,
    "difficultyDistribution": {
      "Hard": 5
    },
    "avgEstimatedTime": 120,
    "problemCodes": [
      "OFFLINEBIT",
      "OFFBIT101",
      "OFFBIT102",
      "OFFBIT103",
      "OFFBIT104"
    ]
  },
  {
    "id": "pattern-21-1-basic-trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "name": "Pattern 21.1 \u2014 Basic Trie",
    "number": "21.1",
    "description": "Curated pattern focused on Pattern 21.1 \u2014 Basic Trie with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 6
    },
    "avgEstimatedTime": 60,
    "problemCodes": [
      "TRIE1",
      "PREFIXSEARCH",
      "BTRIE101",
      "BTRIE102",
      "BTRIE103",
      "BTRIE104"
    ]
  },
  {
    "id": "pattern-21-2-xor-trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "name": "Pattern 21.2 \u2014 XOR Trie",
    "number": "21.2",
    "description": "Curated pattern focused on Pattern 21.2 \u2014 XOR Trie with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium-Hard": 1,
      "Hard": 4,
      "Expert": 1
    },
    "avgEstimatedTime": 125,
    "problemCodes": [
      "XORTRIE1",
      "MAXOR",
      "XTRIE101",
      "XTRIE102",
      "XTRIE103",
      "XTRIE104"
    ]
  },
  {
    "id": "pattern-21-3-string-trie-applications",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "name": "Pattern 21.3 \u2014 String Trie Applications",
    "number": "21.3",
    "description": "Curated pattern focused on Pattern 21.3 \u2014 String Trie Applications with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 4,
      "Medium": 1,
      "Expert": 1
    },
    "avgEstimatedTime": 120,
    "problemCodes": [
      "AUTOCOMPLETE",
      "DICTIONARY",
      "STRIE101",
      "STRIE102",
      "STRIE103",
      "STRIE104"
    ]
  },
  {
    "id": "pattern-22-1-computational-geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "name": "Pattern 22.1 \u2014 Computational Geometry",
    "number": "22.1",
    "description": "Curated pattern focused on Pattern 22.1 \u2014 Computational Geometry with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Hard": 4,
      "Medium": 3
    },
    "avgEstimatedTime": 94,
    "problemCodes": [
      "CONVEXHULL",
      "POINTINPOLY",
      "CGEO101",
      "CGEO102",
      "CGEO103",
      "CGEO104",
      "CGEO105"
    ]
  },
  {
    "id": "pattern-22-2-coordinate-geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "name": "Pattern 22.2 \u2014 Coordinate Geometry",
    "number": "22.2",
    "description": "Curated pattern focused on Pattern 22.2 \u2014 Coordinate Geometry with 7 core DSA problems.",
    "problemCount": 7,
    "difficultyDistribution": {
      "Easy": 3,
      "Medium-Hard": 1,
      "Medium": 2,
      "Easy-Medium": 1
    },
    "avgEstimatedTime": 46,
    "problemCodes": [
      "DISTANCE2D",
      "LINEINTERSECT",
      "CGEO201",
      "CGEO202",
      "CGEO203",
      "CGEO204",
      "CGEO205"
    ]
  },
  {
    "id": "pattern-22-3-area-volume",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "name": "Pattern 22.3 \u2014 Area & Volume",
    "number": "22.3",
    "description": "Curated pattern focused on Pattern 22.3 \u2014 Area & Volume with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Medium": 2,
      "Easy": 2,
      "Easy-Medium": 1,
      "Beginner": 1
    },
    "avgEstimatedTime": 38,
    "problemCodes": [
      "POLYAREA",
      "TRIANGLEAREA",
      "AV101",
      "AV102",
      "AV103",
      "AV104"
    ]
  },
  {
    "id": "pattern-23-1-nim-games",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "name": "Pattern 23.1 \u2014 Nim Games",
    "number": "23.1",
    "description": "Curated pattern focused on Pattern 23.1 \u2014 Nim Games with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy": 1,
      "Medium": 1,
      "Medium-Hard": 1,
      "Hard": 3
    },
    "avgEstimatedTime": 89,
    "problemCodes": [
      "NIM1",
      "STONEGAME",
      "NIM101",
      "NIM102",
      "NIM103",
      "NIM104"
    ]
  },
  {
    "id": "pattern-23-2-sprague-grundy",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "name": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "number": "23.2",
    "description": "Curated pattern focused on Pattern 23.2 \u2014 Sprague\u2013Grundy with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 4,
      "Medium-Hard": 1,
      "Easy": 1
    },
    "avgEstimatedTime": 99,
    "problemCodes": [
      "GRUNDY1",
      "GAMESTATE",
      "SG101",
      "SG102",
      "SG103",
      "SG104"
    ]
  },
  {
    "id": "pattern-23-3-subtraction-games",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "name": "Pattern 23.3 \u2014 Subtraction Games",
    "number": "23.3",
    "description": "Curated pattern focused on Pattern 23.3 \u2014 Subtraction Games with 3 core DSA problems.",
    "problemCount": 3,
    "difficultyDistribution": {
      "Medium": 2,
      "Hard": 1
    },
    "avgEstimatedTime": 80,
    "problemCodes": [
      "SUBGAME",
      "TAKESTONES",
      "SUB101"
    ]
  },
  {
    "id": "pattern-24-2-greedy-construction",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "name": "Pattern 24.2 \u2014 Greedy Construction",
    "number": "24.2",
    "description": "Curated pattern focused on Pattern 24.2 \u2014 Greedy Construction with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 5,
      "Easy-Medium": 2,
      "Medium-Hard": 2,
      "Hard": 1
    },
    "avgEstimatedTime": 68,
    "problemCodes": [
      "CONSTRUCT1",
      "BUILDARR",
      "GC101",
      "GC102",
      "GC103",
      "GC104",
      "GC105",
      "GC106",
      "GC107",
      "GC108"
    ]
  },
  {
    "id": "pattern-24-3-constructive-mathematics",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "name": "Pattern 24.3 \u2014 Constructive Mathematics",
    "number": "24.3",
    "description": "Curated pattern focused on Pattern 24.3 \u2014 Constructive Mathematics with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Medium": 8,
      "Easy-Medium": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 61,
    "problemCodes": [
      "MATHCONST",
      "MATRIXBUILD",
      "MC101",
      "MC102",
      "MC103",
      "MC104",
      "MC105",
      "MC106",
      "MC107",
      "MC108"
    ]
  },
  {
    "id": "pattern-24-4-permutation-construction",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "name": "Pattern 24.4 \u2014 Permutation Construction",
    "number": "24.4",
    "description": "Curated pattern focused on Pattern 24.4 \u2014 Permutation Construction with 10 core DSA problems.",
    "problemCount": 10,
    "difficultyDistribution": {
      "Beginner": 1,
      "Medium": 7,
      "Hard": 1,
      "Medium-Hard": 1
    },
    "avgEstimatedTime": 64,
    "problemCodes": [
      "PERMCONST",
      "SWAPPERM",
      "PC101",
      "PC102",
      "PC103",
      "PC104",
      "PC105",
      "PC106",
      "PC107",
      "PC108"
    ]
  },
  {
    "id": "pattern-25-1-computational-geometry",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "name": "Pattern 25.1 \u2014 Computational Geometry",
    "number": "25.1",
    "description": "Curated pattern focused on Pattern 25.1 \u2014 Computational Geometry with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 5,
      "Medium": 1
    },
    "avgEstimatedTime": 110,
    "problemCodes": [
      "GEOMADV1",
      "GEOMADV2",
      "MISC101",
      "MISC102",
      "MISC103",
      "MISC104"
    ]
  },
  {
    "id": "pattern-25-2-coordinate-geometry",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "name": "Pattern 25.2 \u2014 Coordinate Geometry",
    "number": "25.2",
    "description": "Curated pattern focused on Pattern 25.2 \u2014 Coordinate Geometry with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Hard": 6
    },
    "avgEstimatedTime": 120,
    "problemCodes": [
      "GEOMADV3",
      "GEOMADV4",
      "MISC105",
      "MISC106",
      "MISC107",
      "MISC108"
    ]
  },
  {
    "id": "pattern-25-3-interactive-problems",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "name": "Pattern 25.3 \u2014 Interactive Problems",
    "number": "25.3",
    "description": "Curated pattern focused on Pattern 25.3 \u2014 Interactive Problems with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Easy": 2,
      "Hard": 2,
      "Medium-Hard": 1,
      "Medium": 1
    },
    "avgEstimatedTime": 73,
    "problemCodes": [
      "INTERACT1",
      "INTERACT2",
      "INTER101",
      "INTER102",
      "INTER103",
      "INTER104"
    ]
  },
  {
    "id": "pattern-25-4-ad-hoc-observation",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "name": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "number": "25.4",
    "description": "Curated pattern focused on Pattern 25.4 \u2014 Ad-hoc / Observation with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Beginner": 1,
      "Medium": 5
    },
    "avgEstimatedTime": 52,
    "problemCodes": [
      "ADHOC1",
      "ADHOC2",
      "ADHOC101",
      "ADHOC102",
      "ADHOC103",
      "ADHOC104"
    ]
  },
  {
    "id": "pattern-25-5-mixed-expert-problems",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "name": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "number": "25.5",
    "description": "Curated pattern focused on Pattern 25.5 \u2014 Mixed Expert Problems with 6 core DSA problems.",
    "problemCount": 6,
    "difficultyDistribution": {
      "Expert": 6
    },
    "avgEstimatedTime": 180,
    "problemCodes": [
      "EXPERT1",
      "EXPERT2",
      "EXPERT3",
      "EXPERT4",
      "EXPERT5",
      "EXPERT6"
    ]
  }
];

export const codechefProblems: Record<string, ExcelCurriculumProblem> = {
  "FLOW001": {
    "code": "FLOW001",
    "title": "Add Two Numbers",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic math",
      "arrays"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW001",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW002": {
    "code": "FLOW002",
    "title": "Find Remainder",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic math",
      "arrays"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW002",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW004": {
    "code": "FLOW004",
    "title": "First and Last Digit",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "arrays",
      "traversal"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW004",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW006": {
    "code": "FLOW006",
    "title": "Sum of Digits",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "arrays",
      "math"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW006",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW007": {
    "code": "FLOW007",
    "title": "Reverse The Number",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "arrays",
      "implementation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW007",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "START01": {
    "code": "START01",
    "title": "Number Mirror",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic I/O",
      "arrays"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/START01",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HS08TEST": {
    "code": "HS08TEST",
    "title": "ATM",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic math",
      "implementation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/HS08TEST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LUCKFOUR": {
    "code": "LUCKFOUR",
    "title": "Lucky Four",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-1-basic-array-traversal",
    "patternName": "Pattern 1.1 \u2014 Basic Array Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "traversal",
      "counting"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/LUCKFOUR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "VCS": {
    "code": "VCS",
    "title": "Version Control System",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "frequency count",
      "arrays"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/VCS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RAINBOWA": {
    "code": "RAINBOWA",
    "title": "Rainbow Array",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "frequency",
      "validation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/RAINBOWA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TLG": {
    "code": "TLG",
    "title": "The Lead Game",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "cumulative count",
      "arrays"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TLG",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NOTINCOM": {
    "code": "NOTINCOM",
    "title": "Nothing in Common",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "frequency",
      "set intersection"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/NOTINCOM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COPS": {
    "code": "COPS",
    "title": "Cops and the Thief Devu",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "range counting",
      "array search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/COPS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHN15A": {
    "code": "CHN15A",
    "title": "Mutated Minions",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "array modification",
      "counting"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHN15A",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TEMPLE": {
    "code": "TEMPLE",
    "title": "Temple Land",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-2-frequency-counting",
    "patternName": "Pattern 1.2 \u2014 Frequency Counting",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "symmetry check",
      "frequency"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TEMPLE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ATM2": {
    "code": "ATM2",
    "title": "ATM Machine",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "simulation",
      "arrays"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/ATM2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO14001": {
    "code": "ZCO14001",
    "title": "Video Game",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "array simulation",
      "stack/queue operations"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/ZCO14001",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FRK": {
    "code": "FRK",
    "title": "Chef and Friends",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "substring simulation",
      "search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FRK",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STFOOD": {
    "code": "STFOOD",
    "title": "Chef and Street Food",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "arrays",
      "profit optimization"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/STFOOD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SNAKPROC": {
    "code": "SNAKPROC",
    "title": "Snake Procession",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "simulation",
      "validation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SNAKPROC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CNOTE": {
    "code": "CNOTE",
    "title": "Chef and Notebooks",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-3-simulation-on-arrays",
    "patternName": "Pattern 1.3 \u2014 Simulation on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "budget simulation",
      "search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CNOTE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO14003": {
    "code": "ZCO14003",
    "title": "Smart Phone",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sorting",
      "greedy maximization"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/ZCO14003",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HORSES": {
    "code": "HORSES",
    "title": "Racing Horses",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "sorting",
      "minimum difference"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/HORSES",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CLEANUP": {
    "code": "CLEANUP",
    "title": "Cleaning Up",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "sorting",
      "alternation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CLEANUP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CIELAB": {
    "code": "CIELAB",
    "title": "Ciel and A-B Problem",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "math",
      "sorting logic"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CIELAB",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXDIFF": {
    "code": "MAXDIFF",
    "title": "Maximum Weight Difference",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sorting",
      "greedy split"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/MAXDIFF",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFA": {
    "code": "CHEFA",
    "title": "Chef and Easy Queries",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "sorting",
      "accumulation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHEFA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TACHSTN": {
    "code": "TACHSTN",
    "title": "Chopsticks",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-4-sorting-based-arrays",
    "patternName": "Pattern 1.4 \u2014 Sorting Based Arrays",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sorting",
      "pairwise matching"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/TACHSTN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO15004": {
    "code": "ZCO15004",
    "title": "Special Sums",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-5-coordinate-compression",
    "patternName": "Pattern 1.5 \u2014 Coordinate Compression",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "coordinate compression",
      "geometry"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ZCO15004",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFPRMS": {
    "code": "CHEFPRMS",
    "title": "Chef and Semi-Primes",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-5-coordinate-compression",
    "patternName": "Pattern 1.5 \u2014 Coordinate Compression",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "number mapping",
      "compression"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHEFPRMS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MOVIEWKN": {
    "code": "MOVIEWKN",
    "title": "Movie Weekend",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-5-coordinate-compression",
    "patternName": "Pattern 1.5 \u2014 Coordinate Compression",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "rank mapping",
      "arrays"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/MOVIEWKN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ARRAYTRM": {
    "code": "ARRAYTRM",
    "title": "Array Transform",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-5-coordinate-compression",
    "patternName": "Pattern 1.5 \u2014 Coordinate Compression",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "compression",
      "modular arithmetic"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ARRAYTRM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ALTARAY": {
    "code": "ALTARAY",
    "title": "Alternating Subarray Prefix",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "constructive",
      "DP/arrays"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/ALTARAY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBINC": {
    "code": "SUBINC",
    "title": "Subarray Update",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "constructive",
      "non-decreasing count"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SUBINC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFSUM": {
    "code": "CHEFSUM",
    "title": "Little Chef and Sums",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix/suffix min search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHEFSUM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFRUN": {
    "code": "CHEFRUN",
    "title": "Chef and Secret Ingredient",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "constructive traversal"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/CHEFRUN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PERMUT2": {
    "code": "PERMUT2",
    "title": "Ambiguous Permutations",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "permutation check",
      "construction"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/PERMUT2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COCONUT": {
    "code": "COCONUT",
    "title": "Chef and Water Car",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "constructive math"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/COCONUT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUPW": {
    "code": "SUPW",
    "title": "SUPW Workout",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "constructive array min cost"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUPW",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "IPLTRC": {
    "code": "IPLTRC",
    "title": "IPL Ticket Rush",
    "kingdomId": "kingdom-1-the-kingdom-of-arrays",
    "kingdomName": "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "patternId": "pattern-1-6-constructive-arrays",
    "patternName": "Pattern 1.6 \u2014 Constructive Arrays",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "arrays",
      "simple difference"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/IPLTRC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCDQ": {
    "code": "GCDQ",
    "title": "GCD Queries",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix sum",
      "gcd"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GCDQ",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CSUB": {
    "code": "CSUB",
    "title": "Count Substrings",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix sum",
      "combinatorics"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CSUB",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ANUWTP": {
    "code": "ANUWTP",
    "title": "Anu and Trees",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "prefix sum",
      "range queries"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/ANUWTP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFDET": {
    "code": "CHEFDET",
    "title": "Chef and Detective",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix sum",
      "tree parent count"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHEFDET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COEX": {
    "code": "COEX",
    "title": "Count Extensions",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "1d prefix sum"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/COEX",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRESUM1": {
    "code": "PRESUM1",
    "title": "Static Range Sum Query",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "1d prefix sum"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/PRESUM1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRESUM2": {
    "code": "PRESUM2",
    "title": "Subarray Sum Equalling K",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix sum",
      "hash map"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRESUM2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRESUM3": {
    "code": "PRESUM3",
    "title": "Subarray Divisible by K",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-1-1d-prefix-sum",
    "patternName": "Pattern 2.1 \u2014 1D Prefix Sum",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix sum",
      "remainder"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRESUM3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SEGM01": {
    "code": "SEGM01",
    "title": "Bear and Segment 01",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix frequency",
      "validation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SEGM01",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FRGTNL": {
    "code": "FRGTNL",
    "title": "Forgotten Language",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix frequency",
      "set lookup"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FRGTNL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BLKWHT": {
    "code": "BLKWHT",
    "title": "Black and White Cells",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "prefix frequency count"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/BLKWHT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BRLADD": {
    "code": "BRLADD",
    "title": "Bear and Ladder",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "prefix positioning"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/BRLADD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREFREQ1": {
    "code": "PREFREQ1",
    "title": "Character Count in Range",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prefix frequency"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/PREFREQ1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREFREQ2": {
    "code": "PREFREQ2",
    "title": "Palindromic Substring Count",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix frequency",
      "XOR"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREFREQ2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREFREQ3": {
    "code": "PREFREQ3",
    "title": "Balance Parity Range",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-2-prefix-frequency",
    "patternName": "Pattern 2.2 \u2014 Prefix Frequency",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix frequency"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREFREQ3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MANYSUMS": {
    "code": "MANYSUMS",
    "title": "Many Sums",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "difference array",
      "range coverage"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/MANYSUMS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKSTR": {
    "code": "STKSTR",
    "title": "Stock Market Spans",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "difference array",
      "range update"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STKSTR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SHUFFLE": {
    "code": "SHUFFLE",
    "title": "Chef and Shuffle",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "difference array"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SHUFFLE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "VACCINE1": {
    "code": "VACCINE1",
    "title": "Vaccine Distribution",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "difference calculation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/VACCINE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIFFARR1": {
    "code": "DIFFARR1",
    "title": "Range Add Operations",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "difference array"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIFFARR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIFFARR2": {
    "code": "DIFFARR2",
    "title": "Multiple Update Queries",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "2D difference array"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DIFFARR2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIFFARR3": {
    "code": "DIFFARR3",
    "title": "Interval Cover Counts",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-3-difference-array",
    "patternName": "Pattern 2.3 \u2014 Difference Array",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "difference array"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIFFARR3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFXOR": {
    "code": "CHEFXOR",
    "title": "Chef and XOR Subarrays",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix XOR",
      "trie"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHEFXOR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORPAL": {
    "code": "XORPAL",
    "title": "XOR Palindrome",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "prefix XOR properties"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/XORPAL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORMAX": {
    "code": "XORMAX",
    "title": "Maximum XOR Subarray",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "prefix XOR",
      "trie search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/XORMAX",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORPROD": {
    "code": "XORPROD",
    "title": "XOR Product Maximization",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "prefix XOR",
      "basis"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/XORPROD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREXOR1": {
    "code": "PREXOR1",
    "title": "Zero XOR Subarrays",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "prefix XOR"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/PREXOR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREXOR2": {
    "code": "PREXOR2",
    "title": "Pairwise XOR Sum",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix XOR"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREXOR2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREXOR3": {
    "code": "PREXOR3",
    "title": "Subarray XOR Target K",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prefix XOR"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREXOR3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREXOR4": {
    "code": "PREXOR4",
    "title": "XOR Range Updates",
    "kingdomId": "kingdom-2-the-kingdom-of-prefix-sum-difference-array",
    "kingdomName": "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "patternId": "pattern-2-4-prefix-xor",
    "patternName": "Pattern 2.4 \u2014 Prefix XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "prefix XOR"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PREXOR4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFST": {
    "code": "CHEFST",
    "title": "Chef and Filter",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "two pointers",
      "greedy"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/CHEFST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO13001": {
    "code": "ZCO13001",
    "title": "Chewing",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "two pointers",
      "pair counting"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/ZCO13001",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO13003": {
    "code": "ZCO13003",
    "title": "Cheating on the Exam",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers",
      "upper bound"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ZCO13003",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAIRING": {
    "code": "PAIRING",
    "title": "Pairing Friends",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/PAIRING",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RECTSQ": {
    "code": "RECTSQ",
    "title": "Rectangular Squad",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/RECTSQ",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR1": {
    "code": "TWOPTR1",
    "title": "Sorted Two Sum Pair",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TWOPTR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR2": {
    "code": "TWOPTR2",
    "title": "Container With Most Water",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TWOPTR2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR3": {
    "code": "TWOPTR3",
    "title": "3Sum Equal Zero",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TWOPTR3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR4": {
    "code": "TWOPTR4",
    "title": "Trapping Rain Water",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TWOPTR4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR5": {
    "code": "TWOPTR5",
    "title": "Subarray Product Less Than K",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TWOPTR5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR6": {
    "code": "TWOPTR6",
    "title": "Remove Duplicates Sorted Array",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TWOPTR6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR7": {
    "code": "TWOPTR7",
    "title": "Squares of Sorted Array",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TWOPTR7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR8": {
    "code": "TWOPTR8",
    "title": "Sort Colors 012",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "dutch national flag",
      "two pointers"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/TWOPTR8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR9": {
    "code": "TWOPTR9",
    "title": "Partition Array by Pivot",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TWOPTR9",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOPTR10": {
    "code": "TWOPTR10",
    "title": "4Sum Target Sum",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-1-classic-two-pointers",
    "patternName": "Pattern 3.1 \u2014 Classic Two Pointers",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/TWOPTR10",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO12002": {
    "code": "ZCO12002",
    "title": "Wormholes",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers",
      "binary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ZCO12002",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "WORMHOLE": {
    "code": "WORMHOLE",
    "title": "Wormhole Traversal",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "opposite pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/WORMHOLE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SALARY": {
    "code": "SALARY",
    "title": "The Minimum Number of Moves",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "opposite pointers",
      "math"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SALARY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CARVANS": {
    "code": "CARVANS",
    "title": "Carvans",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "pointers",
      "monotonic state"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CARVANS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPPPTR1": {
    "code": "OPPPTR1",
    "title": "Valid Palindrome Check",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/OPPPTR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPPPTR2": {
    "code": "OPPPTR2",
    "title": "Reverse Vowels of String",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/OPPPTR2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPPPTR3": {
    "code": "OPPPTR3",
    "title": "Boats to Save People",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers",
      "greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/OPPPTR3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPPPTR4": {
    "code": "OPPPTR4",
    "title": "Bag of Tokens",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-2-opposite-direction-pointers",
    "patternName": "Pattern 3.2 \u2014 Opposite Direction Pointers",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/OPPPTR4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RECNDNOS": {
    "code": "RECNDNOS",
    "title": "Chef and Numbers",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "sliding window",
      "frequency"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/RECNDNOS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SPLST": {
    "code": "SPLST",
    "title": "Split Stones",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "window condition"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/SPLST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SWAP10HG": {
    "code": "SWAP10HG",
    "title": "Chef and Swaps",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SWAP10HG",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE1": {
    "code": "SLIDE1",
    "title": "Max Sum Subarray Size K",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "fixed sliding window"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SLIDE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE2": {
    "code": "SLIDE2",
    "title": "Longest Substring Without Repeating",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "dynamic sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE3": {
    "code": "SLIDE3",
    "title": "Minimum Size Subarray Sum",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE4": {
    "code": "SLIDE4",
    "title": "Fruit Into Baskets",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window",
      "hash map"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE5": {
    "code": "SLIDE5",
    "title": "Longest Repeating Character Replacement",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE6": {
    "code": "SLIDE6",
    "title": "Sliding Window Maximum Deque",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "sliding window",
      "deque"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SLIDE6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE7": {
    "code": "SLIDE7",
    "title": "Permutation in String",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window",
      "frequency"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE8": {
    "code": "SLIDE8",
    "title": "Find All Anagrams in String",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE9": {
    "code": "SLIDE9",
    "title": "Minimum Window Substring",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SLIDE9",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE10": {
    "code": "SLIDE10",
    "title": "Subarrays with K Distinct Integers",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SLIDE10",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE11": {
    "code": "SLIDE11",
    "title": "Grumpy Bookstore Owner",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SLIDE11",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE12": {
    "code": "SLIDE12",
    "title": "Max Consecutive Ones III",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE12",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE13": {
    "code": "SLIDE13",
    "title": "Binary Subarrays With Sum",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDE13",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE14": {
    "code": "SLIDE14",
    "title": "Subarray Sums Divisible by K Window",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "sliding window"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/SLIDE14",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDE15": {
    "code": "SLIDE15",
    "title": "Frequency of Most Frequent Element",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-3-sliding-window",
    "patternName": "Pattern 3.3 \u2014 Sliding Window",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "sliding window",
      "sorting"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/SLIDE15",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM1": {
    "code": "MITM1",
    "title": "Subset Sum Meet in Middle",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM2": {
    "code": "MITM2",
    "title": "4Sum II Zero Count",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "meet in the middle",
      "hash map"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MITM2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM3": {
    "code": "MITM3",
    "title": "Closest Subset Sum Target",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle",
      "binary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM4": {
    "code": "MITM4",
    "title": "Maximum XOR Subset Pair",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM5": {
    "code": "MITM5",
    "title": "Knapsack Half Partition",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM6": {
    "code": "MITM6",
    "title": "Split Array Equal Sum MITM",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM7": {
    "code": "MITM7",
    "title": "Double Match Selection",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM8": {
    "code": "MITM8",
    "title": "Bi-directional Search Graph",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM9": {
    "code": "MITM9",
    "title": "4-Element Equation Solver",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM9",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM10": {
    "code": "MITM10",
    "title": "Subset Product Target MITM",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM10",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM11": {
    "code": "MITM11",
    "title": "Partition Array Two Equal Halves",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM11",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM12": {
    "code": "MITM12",
    "title": "Minimal Weight Dual Subset",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM12",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM13": {
    "code": "MITM13",
    "title": "Combination Sum IV MITM",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MITM13",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM14": {
    "code": "MITM14",
    "title": "Generalized Equal Subset Split",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/MITM14",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM15": {
    "code": "MITM15",
    "title": "Meet in Middle Matrix Paths",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/MITM15",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM16": {
    "code": "MITM16",
    "title": "Subarray Bitwise OR Target",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM16",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MITM17": {
    "code": "MITM17",
    "title": "Exact K-Sum Split MITM",
    "kingdomId": "kingdom-3-the-kingdom-of-two-pointers-sliding-window",
    "kingdomName": "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "patternId": "pattern-3-4-meet-in-the-middle-style",
    "patternName": "Pattern 3.4 \u2014 Meet in the Middle Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "meet in the middle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MITM17",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LOWSUM": {
    "code": "LOWSUM",
    "title": "Lowest Sum Pair Search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search",
      "sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/LOWSUM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SMRSTR": {
    "code": "SMRSTR",
    "title": "Smart Strategy",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "binary search",
      "division"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SMRSTR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STACKS": {
    "code": "STACKS",
    "title": "Stacks of Plates",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "binary search",
      "bisect_right"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/STACKS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRPAIRS": {
    "code": "STRPAIRS",
    "title": "String Pair Search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRPAIRS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS101": {
    "code": "BS101",
    "title": "Binary Search Element",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/BS101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS102": {
    "code": "BS102",
    "title": "First and Last Position",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BS102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS103": {
    "code": "BS103",
    "title": "Search Insert Position",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/BS103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS104": {
    "code": "BS104",
    "title": "Search 2D Matrix",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BS104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS105": {
    "code": "BS105",
    "title": "Find Peak Element",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BS105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BS106": {
    "code": "BS106",
    "title": "Search in Rotated Sorted Array",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-1-classic-binary-search",
    "patternName": "Pattern 4.1 \u2014 Classic Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BS106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SHEOKAND": {
    "code": "SHEOKAND",
    "title": "Sheokand and Number",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SHEOKAND",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSFIT": {
    "code": "BSFIT",
    "title": "Fitness Target",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BSFIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIP": {
    "code": "TRIP",
    "title": "Trip Plan",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TRIP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFSET": {
    "code": "CHEFSET",
    "title": "Chef Set Division",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHEFSET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS1": {
    "code": "BSANS1",
    "title": "Koko Eating Bananas",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSANS1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS2": {
    "code": "BSANS2",
    "title": "Capacity To Ship Packages",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSANS2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS3": {
    "code": "BSANS3",
    "title": "Split Array Largest Sum",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BSANS3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS4": {
    "code": "BSANS4",
    "title": "Minimum Days to Make Bouquets",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSANS4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS5": {
    "code": "BSANS5",
    "title": "Find Smallest Divisor Threshold",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSANS5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS6": {
    "code": "BSANS6",
    "title": "Aggressive Cows Spacing",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSANS6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS7": {
    "code": "BSANS7",
    "title": "Book Allocation Problem",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BSANS7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS8": {
    "code": "BSANS8",
    "title": "Painter Partition Problem",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BSANS8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS9": {
    "code": "BSANS9",
    "title": "Min Max Distance Gas Stations",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BSANS9",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSANS10": {
    "code": "BSANS10",
    "title": "Median of Two Sorted Arrays",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-2-binary-search-on-answer",
    "patternName": "Pattern 4.2 \u2014 Binary Search on Answer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary search on answer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BSANS10",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PIPES": {
    "code": "PIPES",
    "title": "Pipe Placement",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/PIPES",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM1": {
    "code": "PARAM1",
    "title": "Square Root Integer",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "binary search",
      "parametric"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/PARAM1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM2": {
    "code": "PARAM2",
    "title": "Nth Root of Integer",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "binary search",
      "parametric"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/PARAM2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM3": {
    "code": "PARAM3",
    "title": "Maximum Average Subarray II",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PARAM3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM4": {
    "code": "PARAM4",
    "title": "Minimizing Max Distance Pairs",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PARAM4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM5": {
    "code": "PARAM5",
    "title": "Optimal K-Division Ratio",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PARAM5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM6": {
    "code": "PARAM6",
    "title": "Kth Smallest Element Sorted Matrix",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/PARAM6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PARAM7": {
    "code": "PARAM7",
    "title": "Kth Smallest Pair Distance",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-3-parametric-search",
    "patternName": "Pattern 4.3 \u2014 Parametric Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "parametric search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PARAM7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPENSE": {
    "code": "EXPENSE",
    "title": "Expense Optimization",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "continuous binary search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/EXPENSE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPTIM": {
    "code": "OPTIM",
    "title": "Optimization Float Bound",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "continuous binary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OPTIM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DISTANCE": {
    "code": "DISTANCE",
    "title": "Minimum Floating Distance",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "continuous binary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DISTANCE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS1": {
    "code": "CONTBS1",
    "title": "Ternary Search Minimum Function",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "ternary search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONTBS1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS2": {
    "code": "CONTBS2",
    "title": "Unimodal Function Maximum",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "ternary search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/CONTBS2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS3": {
    "code": "CONTBS3",
    "title": "Floating Point Binary Precision",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "binary search float"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONTBS3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS4": {
    "code": "CONTBS4",
    "title": "Optimal Meeting Point Continuous",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "continuous search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONTBS4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS5": {
    "code": "CONTBS5",
    "title": "Convex Function Minimization",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "ternary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONTBS5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONTBS6": {
    "code": "CONTBS6",
    "title": "Continuous Median Search",
    "kingdomId": "kingdom-4-the-kingdom-of-binary-search",
    "kingdomName": "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "patternId": "pattern-4-4-continuous-binary-search",
    "patternName": "Pattern 4.4 \u2014 Continuous Binary Search",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONTBS6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE1": {
    "code": "GREE1",
    "title": "Assign Cookies",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "basic greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE2": {
    "code": "GREE2",
    "title": "Lemonade Change",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "basic greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE3": {
    "code": "GREE3",
    "title": "Best Time Buy Sell Stock",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "basic greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE4": {
    "code": "GREE4",
    "title": "Can Place Flowers",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "basic greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE5": {
    "code": "GREE5",
    "title": "Array Partition Min Sum",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "basic greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE6": {
    "code": "GREE6",
    "title": "Maximum Units on Truck",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "greedy",
      "sorting"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/GREE6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE7": {
    "code": "GREE7",
    "title": "Largest Number Formation",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy custom comparator"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREE7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREE8": {
    "code": "GREE8",
    "title": "Gas Station Circuit",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-1-basic-greedy",
    "patternName": "Pattern 5.1 \u2014 Basic Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy simulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREE8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INOI1201": {
    "code": "INOI1201",
    "title": "Triathlon",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "greedy",
      "sorting comparator"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/INOI1201",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT1": {
    "code": "GREESORT1",
    "title": "Non-overlapping Intervals",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT2": {
    "code": "GREESORT2",
    "title": "Minimum Arrows Burst Balloons",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy interval sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT3": {
    "code": "GREESORT3",
    "title": "Job Sequencing Problem",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy deadline sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT4": {
    "code": "GREESORT4",
    "title": "Fractional Knapsack",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy ratio sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT5": {
    "code": "GREESORT5",
    "title": "Minimum Platforms Required",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy arrival departure sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT6": {
    "code": "GREESORT6",
    "title": "Queue Reconstruction by Height",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "greedy sorting"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GREESORT6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREESORT7": {
    "code": "GREESORT7",
    "title": "Task Scheduler",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-2-greedy-with-sorting",
    "patternName": "Pattern 5.2 \u2014 Greedy with Sorting",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy frequency sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREESORT7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXSUM": {
    "code": "MAXSUM",
    "title": "Maximum Subarray Sum Greedy",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/MAXSUM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTERVAL": {
    "code": "INTERVAL",
    "title": "Interval Scheduling Maximum",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INTERVAL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BUSS": {
    "code": "BUSS",
    "title": "Bus Routes Scheduling",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BUSS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MEET": {
    "code": "MEET",
    "title": "Meeting Rooms Minimum",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MEET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTGREE1": {
    "code": "INTGREE1",
    "title": "Merge Intervals",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INTGREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTGREE2": {
    "code": "INTGREE2",
    "title": "Insert Interval",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INTGREE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTGREE3": {
    "code": "INTGREE3",
    "title": "Employee Free Time",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INTGREE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTGREE4": {
    "code": "INTGREE4",
    "title": "Remove Covered Intervals",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-3-interval-greedy",
    "patternName": "Pattern 5.3 \u2014 Interval Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "interval greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INTGREE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SAVKONO": {
    "code": "SAVKONO",
    "title": "Chef and his Daily Routine",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "greedy",
      "priority queue"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/SAVKONO",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "POTIONS": {
    "code": "POTIONS",
    "title": "Reorganize String",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "priority queue greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/POTIONS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFBOOK": {
    "code": "CHEFBOOK",
    "title": "Book Reading Schedule",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy priority queue"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHEFBOOK",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREEPQ1": {
    "code": "GREEPQ1",
    "title": "Furthest Building You Can Reach",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy max heap"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GREEPQ1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREEPQ2": {
    "code": "GREEPQ2",
    "title": "Minimum Refueling Stops",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "greedy max heap"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GREEPQ2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREEPQ3": {
    "code": "GREEPQ3",
    "title": "Construct Target Array Multiple Sums",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "greedy max heap"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GREEPQ3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREEPQ4": {
    "code": "GREEPQ4",
    "title": "Maximum Performance of Team",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "greedy priority queue"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GREEPQ4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GREEPQ5": {
    "code": "GREEPQ5",
    "title": "IPO Maximum Capital",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-4-greedy-priority-queue",
    "patternName": "Pattern 5.4 \u2014 Greedy + Priority Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "two heaps greedy"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GREEPQ5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFSTUD": {
    "code": "CHEFSTUD",
    "title": "Chef and Students",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "constructive greedy"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/CHEFSTUD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE1": {
    "code": "CONSTGREE1",
    "title": "Candy Distribution Minimum",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "two pass constructive greedy"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONSTGREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE2": {
    "code": "CONSTGREE2",
    "title": "Create Maximum Number",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic stack greedy"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONSTGREE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE3": {
    "code": "CONSTGREE3",
    "title": "Remove K Digits",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic stack greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTGREE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE4": {
    "code": "CONSTGREE4",
    "title": "Wiggle Sort II",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "constructive sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTGREE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE5": {
    "code": "CONSTGREE5",
    "title": "Smallest Subsequence Distinct Characters",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTGREE5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE6": {
    "code": "CONSTGREE6",
    "title": "String Without AAA or BBB",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "constructive greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTGREE6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTGREE7": {
    "code": "CONSTGREE7",
    "title": "Minimum Deletions Make Frequency Unique",
    "kingdomId": "kingdom-5-the-kingdom-of-sorting-greedy",
    "kingdomName": "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "patternId": "pattern-5-5-constructive-greedy",
    "patternName": "Pattern 5.5 \u2014 Constructive Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy hash set"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTGREE7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAPIN": {
    "code": "LAPIN",
    "title": "Lapindromes",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "string frequency",
      "palindrome check"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/LAPIN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRPAL": {
    "code": "STRPAL",
    "title": "Palindrome String",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string traversal"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/STRPAL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ALPHABET": {
    "code": "ALPHABET",
    "title": "Chef and Fruits",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string matching"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/ALPHABET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOSTR": {
    "code": "TWOSTR",
    "title": "Chef and the Wildcard Matching",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string wildcard match"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TWOSTR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFROUT": {
    "code": "CHEFROUT",
    "title": "Chef and Daily Routine",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string state transition"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/CHEFROUT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STR101": {
    "code": "STR101",
    "title": "Valid Anagram",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string frequency"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/STR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STR102": {
    "code": "STR102",
    "title": "Isomorphic Strings",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "string mapping"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/STR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STR103": {
    "code": "STR103",
    "title": "Longest Common Prefix",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-1-basic-string-processing",
    "patternName": "Pattern 6.1 \u2014 Basic String Processing",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "string matching"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/STR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAGICHF": {
    "code": "MAGICHF",
    "title": "Magician versus Chef",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "swap tracking",
      "frequency"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/MAGICHF",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ERROR": {
    "code": "ERROR",
    "title": "Chef and Feedback",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "pattern frequency",
      "substring"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/ERROR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHARFREQ1": {
    "code": "CHARFREQ1",
    "title": "First Unique Character in String",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "character frequency"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/CHARFREQ1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHARFREQ2": {
    "code": "CHARFREQ2",
    "title": "Sort Characters By Frequency",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "frequency bucket sort"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHARFREQ2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHARFREQ3": {
    "code": "CHARFREQ3",
    "title": "Group Anagrams",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "character frequency hash"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHARFREQ3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHARFREQ4": {
    "code": "CHARFREQ4",
    "title": "Ransom Note",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-2-character-frequency",
    "patternName": "Pattern 6.2 \u2014 Character Frequency",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "character frequency count"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/CHARFREQ4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE1": {
    "code": "STRGREE1",
    "title": "Break a Palindrome",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "greedy string modification"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/STRGREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE2": {
    "code": "STRGREE2",
    "title": "Swap Adjacent in LR String",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two pointers greedy string"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRGREE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE3": {
    "code": "STRGREE3",
    "title": "Minimum Swaps to Make Strings Equal",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy string pairs"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRGREE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE4": {
    "code": "STRGREE4",
    "title": "Determine if Two Strings Are Close",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy frequency transformation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRGREE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE5": {
    "code": "STRGREE5",
    "title": "Lexicographically Smallest Equivalent String",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy DSU string"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRGREE5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRGREE6": {
    "code": "STRGREE6",
    "title": "Minimum Remove to Make Valid Parentheses",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-3-greedy-on-strings",
    "patternName": "Pattern 6.3 \u2014 Greedy on Strings",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy stack string"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRGREE6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRMATCH": {
    "code": "STRMATCH",
    "title": "String Pattern Match KMP",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "KMP prefix function"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/STRMATCH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMPCC": {
    "code": "KMPCC",
    "title": "KMP Substring Search",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "KMP algorithm"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KMPCC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PATTERN1": {
    "code": "PATTERN1",
    "title": "Pattern Frequency KMP",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "KMP algorithm"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/PATTERN1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMP101": {
    "code": "KMP101",
    "title": "Implement strStr() KMP",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "KMP prefix function"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KMP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMP102": {
    "code": "KMP102",
    "title": "Shortest Palindrome Prefix KMP",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "KMP prefix function"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/KMP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMP103": {
    "code": "KMP103",
    "title": "Repeated Substring Pattern KMP",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-4-prefix-function-kmp",
    "patternName": "Pattern 6.4 \u2014 Prefix Function (KMP)",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "KMP failure table"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/KMP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZALG01": {
    "code": "ZALG01",
    "title": "Z Algorithm Exact Match",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-5-z-algorithm",
    "patternName": "Pattern 6.5 \u2014 Z Algorithm",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Z algorithm"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/ZALG01",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRZCC": {
    "code": "STRZCC",
    "title": "String Match Z Array",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-5-z-algorithm",
    "patternName": "Pattern 6.5 \u2014 Z Algorithm",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Z algorithm"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRZCC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZALG101": {
    "code": "ZALG101",
    "title": "Z Function Construction",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-5-z-algorithm",
    "patternName": "Pattern 6.5 \u2014 Z Algorithm",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Z algorithm"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ZALG101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZALG102": {
    "code": "ZALG102",
    "title": "Longest Prefix Suffix Z",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-5-z-algorithm",
    "patternName": "Pattern 6.5 \u2014 Z Algorithm",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Z algorithm"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/ZALG102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZALG103": {
    "code": "ZALG103",
    "title": "Distinct Substrings Count Z",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-5-z-algorithm",
    "patternName": "Pattern 6.5 \u2014 Z Algorithm",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Z algorithm"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ZALG103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRHASH": {
    "code": "STRHASH",
    "title": "Polynomial Rolling Hash",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "string hashing"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRHASH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFHASH": {
    "code": "CHEFHASH",
    "title": "Chef Substring Hashing",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "double hashing"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/CHEFHASH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBSTRHASH": {
    "code": "SUBSTRHASH",
    "title": "Rabin-Karp Substring Search",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Rabin-Karp rolling hash"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUBSTRHASH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HASH101": {
    "code": "HASH101",
    "title": "Longest Duplicate Substring Hash",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "rolling hash",
      "binary search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/HASH101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HASH102": {
    "code": "HASH102",
    "title": "Distinct Substrings Rabin Karp",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "string hashing"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/HASH102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HASH103": {
    "code": "HASH103",
    "title": "Repeated DNA Sequences Hash",
    "kingdomId": "kingdom-6-the-kingdom-of-strings",
    "kingdomName": "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "patternId": "pattern-6-6-hashing",
    "patternName": "Pattern 6.6 \u2014 Hashing",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bitmask string hashing"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/HASH103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW016": {
    "code": "FLOW016",
    "title": "GCD and LCM",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "bit operations",
      "math"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FLOW016",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW017": {
    "code": "FLOW017",
    "title": "Second Largest",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic comparison",
      "bitwise"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW017",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW018": {
    "code": "FLOW018",
    "title": "Small Factorial",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "arrays",
      "big number representation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FLOW018",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FCTRL2": {
    "code": "FCTRL2",
    "title": "Small Factorials",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "big integer math"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FCTRL2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FCTRL": {
    "code": "FCTRL",
    "title": "Factorial",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "trailing zeros",
      "bit math"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/FCTRL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MARBLES": {
    "code": "MARBLES",
    "title": "Marbles",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "combinatorics",
      "bitwise overflow prevention"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/MARBLES",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIT101": {
    "code": "BIT101",
    "title": "Number of 1 Bits",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "popcount",
      "bitwise AND"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/BIT101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIT102": {
    "code": "BIT102",
    "title": "Counting Bits 0 to N",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "DP",
      "bitwise shift"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BIT102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIT103": {
    "code": "BIT103",
    "title": "Power of Two Check",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "n & (n - 1)"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/BIT103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIT104": {
    "code": "BIT104",
    "title": "Reverse Bits",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-1-basic-bit-operations",
    "patternName": "Pattern 7.1 \u2014 Basic Bit Operations",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "bitwise bit shift"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BIT104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORAGAIN": {
    "code": "XORAGAIN",
    "title": "XOR Again",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "XOR properties"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/XORAGAIN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR101": {
    "code": "XOR101",
    "title": "Single Number I",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "XOR cancellation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/XOR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR102": {
    "code": "XOR102",
    "title": "Single Number II",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bitwise state machine"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/XOR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR103": {
    "code": "XOR103",
    "title": "Single Number III",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "two unique elements XOR diff bit"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/XOR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR104": {
    "code": "XOR104",
    "title": "Missing Number 0 to N",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "XOR range property"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/XOR104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR105": {
    "code": "XOR105",
    "title": "XOR Operation in Array",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "XOR summation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/XOR105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR106": {
    "code": "XOR106",
    "title": "Find Kth Largest XOR Pair",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "trie XOR properties"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/XOR106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR107": {
    "code": "XOR107",
    "title": "Bitwise AND of Numbers Range",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "common bit prefix"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/XOR107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XOR108": {
    "code": "XOR108",
    "title": "Minimum Flips to Make a OR b Equal c",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-2-xor-properties",
    "patternName": "Pattern 7.2 \u2014 XOR Properties",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bitwise manipulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/XOR108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITMASK1": {
    "code": "BITMASK1",
    "title": "All Subsets Generation Bitmask",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "bitmask enumeration"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/BITMASK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBSETBIT": {
    "code": "SUBSETBIT",
    "title": "Submask Enumeration Traversal",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "submask bitwise loop"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUBSETBIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFBIT": {
    "code": "CHEFBIT",
    "title": "Chef Bitmask Assignment",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "bitmask DP"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/CHEFBIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MASK101": {
    "code": "MASK101",
    "title": "Subsets Power Set Bitmask",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bitmask generation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MASK101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MASK102": {
    "code": "MASK102",
    "title": "Can I Win Game Bitmask",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "bitmask memoization"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MASK102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MASK103": {
    "code": "MASK103",
    "title": "Partition to K Equal Sum Subsets",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "bitmask DP"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MASK103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MASK104": {
    "code": "MASK104",
    "title": "Smallest Sufficient Team",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "bitmask DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MASK104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MASK105": {
    "code": "MASK105",
    "title": "Matchsticks to Square",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-3-bitmask-enumeration",
    "patternName": "Pattern 7.3 \u2014 Bitmask Enumeration",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bitmask DP"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MASK105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORPAIR": {
    "code": "XORPAIR",
    "title": "Max XOR Pair in Array Trie",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "binary trie XOR"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/XORPAIR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR": {
    "code": "TRIEXOR",
    "title": "Maximum XOR With Element From Array",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "trie offline queries"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TRIEXOR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR101": {
    "code": "TRIEXOR101",
    "title": "Maximum XOR of Two Numbers",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "binary trie"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/TRIEXOR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR102": {
    "code": "TRIEXOR102",
    "title": "Count Pairs With XOR in Range",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary trie count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TRIEXOR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR103": {
    "code": "TRIEXOR103",
    "title": "Maximum Subarray XOR Trie",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "prefix XOR binary trie"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TRIEXOR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR104": {
    "code": "TRIEXOR104",
    "title": "XOR Query Path on Tree Trie",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "trie",
      "tree path"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TRIEXOR104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR105": {
    "code": "TRIEXOR105",
    "title": "Persistent Trie Max XOR",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "persistent binary trie"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/TRIEXOR105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIEXOR106": {
    "code": "TRIEXOR106",
    "title": "Dynamic Trie Max XOR Insert Delete",
    "kingdomId": "kingdom-7-the-kingdom-of-bit-manipulation",
    "kingdomName": "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "patternId": "pattern-7-4-trie-xor",
    "patternName": "Pattern 7.4 \u2014 Trie + XOR",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "trie lazy update"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/TRIEXOR106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW009": {
    "code": "FLOW009",
    "title": "Total Expenses",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "basic math",
      "percentage"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW009",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW010": {
    "code": "FLOW010",
    "title": "Id and Ship",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "if-else",
      "basic mapping"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW010",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW011": {
    "code": "FLOW011",
    "title": "Gross Salary",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "formula evaluation"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW011",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW013": {
    "code": "FLOW013",
    "title": "Valid Triangles",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "triangle angle sum"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW013",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOW014": {
    "code": "FLOW014",
    "title": "Grade The Steel",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "multi-condition logic"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FLOW014",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FSQRT": {
    "code": "FSQRT",
    "title": "Finding Square Roots",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "integer square root"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FSQRT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATH101": {
    "code": "MATH101",
    "title": "Palindrome Number",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "math digit extraction"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/MATH101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATH102": {
    "code": "MATH102",
    "title": "Armstrong Number Check",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-1-basic-mathematics",
    "patternName": "Pattern 8.1 \u2014 Basic Mathematics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "math power sum"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/MATH102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCD2": {
    "code": "GCD2",
    "title": "GCD2",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "large integer GCD",
      "modular arithmetic"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/GCD2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFGCD": {
    "code": "CHEFGCD",
    "title": "Chef and GCD",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "GCD properties"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CHEFGCD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCMGCD": {
    "code": "LCMGCD",
    "title": "LCM and GCD Range",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Euclidean algorithm"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/LCMGCD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCD101": {
    "code": "GCD101",
    "title": "Greatest Common Divisor Traversal",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "GCD property"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GCD101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCD102": {
    "code": "GCD102",
    "title": "Generalized GCD Array Pairs",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "GCD frequency count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GCD102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCD103": {
    "code": "GCD103",
    "title": "Minimum Operations Equal GCD",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "GCD properties"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GCD103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GCD104": {
    "code": "GCD104",
    "title": "Subarray GCD Equal K",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-2-gcd-lcm",
    "patternName": "Pattern 8.2 \u2014 GCD & LCM",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "sparse table GCD"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GCD104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRB01": {
    "code": "PRB01",
    "title": "Primality Test",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "prime check O(sqrt N)"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/PRB01",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SEIVE1": {
    "code": "SEIVE1",
    "title": "Sieve of Eratosthenes",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "prime sieve"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SEIVE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRIMES2": {
    "code": "PRIMES2",
    "title": "Prime Factorization Sieve",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "smallest prime factor sieve"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRIMES2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRIME1": {
    "code": "PRIME1",
    "title": "Prime Generator",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segmented sieve"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRIME1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRIME101": {
    "code": "PRIME101",
    "title": "Count Primes Less Than N",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "sieve of eratosthenes"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/PRIME101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRIME102": {
    "code": "PRIME102",
    "title": "Prime Factors Product Count",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-3-prime-numbers-sieve",
    "patternName": "Pattern 8.3 \u2014 Prime Numbers & Sieve",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "prime factorization"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRIME102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MODEX": {
    "code": "MODEX",
    "title": "Modular Exponentiation",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "binary exponentiation"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/MODEX",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "POWMOD": {
    "code": "POWMOD",
    "title": "Fast Power Modulo M",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "modular exponentiation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/POWMOD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MODINV1": {
    "code": "MODINV1",
    "title": "Fermat's Little Theorem Inverse",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "modular inverse"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MODINV1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MODINV2": {
    "code": "MODINV2",
    "title": "Extended Euclidean Algorithm",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "extgcd inverse"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MODINV2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CRT1": {
    "code": "CRT1",
    "title": "Chinese Remainder Theorem",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "CRT modular system"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CRT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MOD101": {
    "code": "MOD101",
    "title": "Super Pow Modular Exponentiation",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-4-modular-arithmetic",
    "patternName": "Pattern 8.4 \u2014 Modular Arithmetic",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Euler totient theorem"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MOD101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMB1": {
    "code": "COMB1",
    "title": "nCr Combinations Modulo P",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "nCr precomputation",
      "factorials"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/COMB1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFCOMB": {
    "code": "CHEFCOMB",
    "title": "Chef Combination Sum",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Pascal triangle",
      "nCr"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHEFCOMB",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PASCTRI": {
    "code": "PASCTRI",
    "title": "Pascal's Triangle Row",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "combinatorics"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/PASCTRI",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMB101": {
    "code": "COMB101",
    "title": "Unique Paths Grid Combinatorics",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "nCr grid paths"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/COMB101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMB102": {
    "code": "COMB102",
    "title": "Catalan Numbers Count",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Catalan formula"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/COMB102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMB103": {
    "code": "COMB103",
    "title": "Stirling Numbers Second Kind",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "combinatorics DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/COMB103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMB104": {
    "code": "COMB104",
    "title": "Lucas Theorem nCr Large N Mod P",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-5-combinatorics",
    "patternName": "Pattern 8.5 \u2014 Combinatorics",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Lucas theorem"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/COMB104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NUMTH1": {
    "code": "NUMTH1",
    "title": "Euler's Totient Phi Function",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Euler totient"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/NUMTH1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INCEXC": {
    "code": "INCEXC",
    "title": "Inclusion Exclusion Principle Count",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "inclusion exclusion"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INCEXC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EULER1": {
    "code": "EULER1",
    "title": "Coprime Pairs Count",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler phi",
      "Mobius inversion"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/EULER1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MOBIUS1": {
    "code": "MOBIUS1",
    "title": "Mobius Function Precomputation",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Mobius sieve"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MOBIUS1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INCEXC101": {
    "code": "INCEXC101",
    "title": "Count Numbers Divisible by Prime Set",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "inclusion exclusion bitmask"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INCEXC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INCEXC102": {
    "code": "INCEXC102",
    "title": "Square Free Numbers Count",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Mobius inversion"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INCEXC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INCEXC103": {
    "code": "INCEXC103",
    "title": "Sum of GCD of All Pairs",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler totient sieve"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INCEXC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INCEXC104": {
    "code": "INCEXC104",
    "title": "Primitive Roots Modulo Prime",
    "kingdomId": "kingdom-8-the-kingdom-of-mathematics-number-theory",
    "kingdomName": "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "patternId": "pattern-8-6-inclusion-exclusion-number-theory",
    "patternName": "Pattern 8.6 \u2014 Inclusion\u2013Exclusion / Number Theory",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "number theory"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/INCEXC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRISQ": {
    "code": "TRISQ",
    "title": "Fit Squares in Triangle",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "recursion",
      "geometry"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TRISQ",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FIBO1": {
    "code": "FIBO1",
    "title": "Fibonacci Recursion Memoized",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "recursion"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/FIBO1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REC101": {
    "code": "REC101",
    "title": "Power X N Recursion",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "divide & conquer recursion"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/REC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REC102": {
    "code": "REC102",
    "title": "Tower of Hanoi Steps",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "recursion"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/REC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REC103": {
    "code": "REC103",
    "title": "Reverse Stack Using Recursion",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "recursion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/REC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REC104": {
    "code": "REC104",
    "title": "Sort Array Using Recursion",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-1-basic-recursion",
    "patternName": "Pattern 9.1 \u2014 Basic Recursion",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "recursion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/REC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NQUEENS": {
    "code": "NQUEENS",
    "title": "N-Queens Solver",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "backtracking",
      "pruning"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/NQUEENS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUDOKU": {
    "code": "SUDOKU",
    "title": "Sudoku Solver",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "backtracking"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SUDOKU",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PERMUT1": {
    "code": "PERMUT1",
    "title": "Permutations Generator",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PERMUT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BACK101": {
    "code": "BACK101",
    "title": "Word Search Grid Backtracking",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking DFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BACK101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BACK102": {
    "code": "BACK102",
    "title": "Rat in a Maze Path Find",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BACK102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BACK103": {
    "code": "BACK103",
    "title": "Knight Tour Traversal",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-2-brute-force-with-backtracking",
    "patternName": "Pattern 9.2 \u2014 Brute Force with Backtracking",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "backtracking Warnsdorff"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BACK103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBSETS": {
    "code": "SUBSETS",
    "title": "Subsets Generation Backtracking",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUBSETS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ALLPERM": {
    "code": "ALLPERM",
    "title": "Unique Permutations Generator",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking hash set"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ALLPERM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BACKTRK1": {
    "code": "BACKTRK1",
    "title": "Combination Sum Target",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BACKTRK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEN101": {
    "code": "GEN101",
    "title": "Generate Parentheses Pairs",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking balance"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GEN101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEN102": {
    "code": "GEN102",
    "title": "Letter Combinations Phone Keypad",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "backtracking mapping"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GEN102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEN103": {
    "code": "GEN103",
    "title": "Palindrome Partitioning All",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-3-generate-all-possibilities",
    "patternName": "Pattern 9.3 \u2014 Generate All Possibilities",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "backtracking DP"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GEN103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC1": {
    "code": "DIVREC1",
    "title": "Divide and Conquer Matrix Fast Exponentiation",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "recursion matrix"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIVREC1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HANOI1": {
    "code": "HANOI1",
    "title": "Hanoi Dual Peg Variant",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "recursive construction"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/HANOI1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC101": {
    "code": "DIVREC101",
    "title": "Construct Quad Tree Grid",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "divide and conquer recursion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIVREC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC102": {
    "code": "DIVREC102",
    "title": "Kth Symbol in Grammar",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "recursive divide"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIVREC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC103": {
    "code": "DIVREC103",
    "title": "Different Ways to Add Parentheses",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "recursion memoization"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIVREC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC104": {
    "code": "DIVREC104",
    "title": "Gray Code Sequence Recursive",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "recursive construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIVREC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVREC105": {
    "code": "DIVREC105",
    "title": "Beautiful Array Partition Recursive",
    "kingdomId": "kingdom-9-the-kingdom-of-recursion-backtracking",
    "kingdomName": "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "patternId": "pattern-9-4-recursive-divide-construction",
    "patternName": "Pattern 9.4 \u2014 Recursive Divide Construction",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "recursive divide construction"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIVREC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COMPILER": {
    "code": "COMPILER",
    "title": "Compilers and Parsers",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "stack",
      "prefix validity"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/COMPILER",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STACK1": {
    "code": "STACK1",
    "title": "Implement Stack using Queues",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "stack operations"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/STACK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAREN1": {
    "code": "PAREN1",
    "title": "Valid Parentheses Match",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "stack"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/PAREN1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSTACK101": {
    "code": "BSTACK101",
    "title": "Min Stack O(1) GetMin",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack aux"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSTACK101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSTACK102": {
    "code": "BSTACK102",
    "title": "Evaluate Reverse Polish Notation RPN",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack arithmetic"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSTACK102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSTACK103": {
    "code": "BSTACK103",
    "title": "Simplify Path Unix Standard",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack string"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSTACK103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSTACK104": {
    "code": "BSTACK104",
    "title": "Basic Calculator II Operator Precedence",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "stack expression"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BSTACK104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BSTACK105": {
    "code": "BSTACK105",
    "title": "Decode String Expression Stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-1-basic-stack",
    "patternName": "Pattern 10.1 \u2014 Basic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack string expansion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BSTACK105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO12001": {
    "code": "ZCO12001",
    "title": "Matched Brackets",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "stack",
      "nesting depth & maximum length"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/ZCO12001",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATCHING": {
    "code": "MATCHING",
    "title": "Matching Brackets II",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack",
      "multi-bracket validation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MATCHING",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BRACKETS": {
    "code": "BRACKETS",
    "title": "Brackets Score Sum",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "stack",
      "balanced check"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BRACKETS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAR101": {
    "code": "PAR101",
    "title": "Longest Valid Parentheses Substring",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "stack / DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PAR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAR102": {
    "code": "PAR102",
    "title": "Score of Parentheses",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack arithmetic"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PAR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAR103": {
    "code": "PAR103",
    "title": "Minimum Add to Make Parentheses Valid",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack balance"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PAR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PAR104": {
    "code": "PAR104",
    "title": "Check if Word Is Valid After Substitutions",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-2-parentheses",
    "patternName": "Pattern 10.2 \u2014 Parentheses",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack pattern elimination"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PAR104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ZCO14002": {
    "code": "ZCO14002",
    "title": "SUPW Workout Minimum Cost",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic stack",
      "DP min window"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ZCO14002",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INOI1301": {
    "code": "INOI1301",
    "title": "Calvins Game",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "monotonic stack",
      "forward backward DP"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INOI1301",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXRECT": {
    "code": "MAXRECT",
    "title": "Largest Rectangle in Histogram",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MAXRECT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HISTOG": {
    "code": "HISTOG",
    "title": "Max Histogram Area",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/HISTOG",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK1": {
    "code": "MONOSTACK1",
    "title": "Next Greater Element I",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/MONOSTACK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK2": {
    "code": "MONOSTACK2",
    "title": "Next Greater Element II Circular",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MONOSTACK2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK3": {
    "code": "MONOSTACK3",
    "title": "Daily Temperatures Span",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MONOSTACK3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK4": {
    "code": "MONOSTACK4",
    "title": "Online Stock Span",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MONOSTACK4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK5": {
    "code": "MONOSTACK5",
    "title": "Maximal Rectangle 2D Binary Matrix",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MONOSTACK5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK6": {
    "code": "MONOSTACK6",
    "title": "Sum of Subarray Minimums",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "monotonic stack contribution"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MONOSTACK6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK7": {
    "code": "MONOSTACK7",
    "title": "Sum of Subarray Ranges",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "monotonic stack min max"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MONOSTACK7",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOSTACK8": {
    "code": "MONOSTACK8",
    "title": "Number of Visible People in a Queue",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-3-monotonic-stack",
    "patternName": "Pattern 10.3 \u2014 Monotonic Stack",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MONOSTACK8",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREEDY": {
    "code": "STKGREEDY",
    "title": "Remove Duplicate Letters Monotonic Stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "stack greedy"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/STKGREEDY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EVALEXPR": {
    "code": "EVALEXPR",
    "title": "Evaluate Mathematical Expression Stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack greedy operator"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/EVALEXPR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREE1": {
    "code": "STKGREE1",
    "title": "Smallest Subsequence Distinct Monotonic",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "stack greedy"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/STKGREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREE2": {
    "code": "STKGREE2",
    "title": "132 Pattern Search Monotonic Stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "monotonic stack"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/STKGREE2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREE3": {
    "code": "STKGREE3",
    "title": "Maximum Width Ramp Monotonic Stack",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "monotonic stack index"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/STKGREE3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREE4": {
    "code": "STKGREE4",
    "title": "Car Fleet Target Destination",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "greedy stack sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STKGREE4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STKGREE5": {
    "code": "STKGREE5",
    "title": "Asteroid Collision Simulation",
    "kingdomId": "kingdom-10-the-kingdom-of-stack-monotonic-stack",
    "kingdomName": "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "patternId": "pattern-10-5-stack-greedy",
    "patternName": "Pattern 10.5 \u2014 Stack + Greedy",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack simulation greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STKGREE5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QUEUE1": {
    "code": "QUEUE1",
    "title": "Implement Queue using Stacks",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-1-queue-simulation",
    "patternName": "Pattern 11.1 \u2014 Queue Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "queue simulation"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/QUEUE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDING1": {
    "code": "SLIDING1",
    "title": "Circular Queue Design",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-1-queue-simulation",
    "patternName": "Pattern 11.1 \u2014 Queue Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "queue simulation array"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SLIDING1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BREADTH1": {
    "code": "BREADTH1",
    "title": "Recent Calls Counter Queue",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-1-queue-simulation",
    "patternName": "Pattern 11.1 \u2014 Queue Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "queue simulation window"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/BREADTH1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QSIM101": {
    "code": "QSIM101",
    "title": "Dota2 Senate Elimination Queue",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-1-queue-simulation",
    "patternName": "Pattern 11.1 \u2014 Queue Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "queue simulation greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/QSIM101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QSIM102": {
    "code": "QSIM102",
    "title": "Task Scheduler Queue Simulation",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-1-queue-simulation",
    "patternName": "Pattern 11.1 \u2014 Queue Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "queue max heap"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/QSIM102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DEQUE1": {
    "code": "DEQUE1",
    "title": "Design Circular Deque",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-2-deque",
    "patternName": "Pattern 11.2 \u2014 Deque",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "deque data structure"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DEQUE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDINGMAX": {
    "code": "SLIDINGMAX",
    "title": "Sliding Window Maximum Deque",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-2-deque",
    "patternName": "Pattern 11.2 \u2014 Deque",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic deque"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SLIDINGMAX",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXDEQUE": {
    "code": "MAXDEQUE",
    "title": "Max Value Deque O(1)",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-2-deque",
    "patternName": "Pattern 11.2 \u2014 Deque",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "deque max tracking"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MAXDEQUE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DEQ101": {
    "code": "DEQ101",
    "title": "Shortest Subarray with Sum at Least K",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-2-deque",
    "patternName": "Pattern 11.2 \u2014 Deque",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic deque prefix sum"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DEQ101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DEQ102": {
    "code": "DEQ102",
    "title": "Jump Game VI Maximum Score Deque",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-2-deque",
    "patternName": "Pattern 11.2 \u2014 Deque",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "deque DP"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DEQ102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SLIDINGWINDOW": {
    "code": "SLIDINGWINDOW",
    "title": "Constrained Subsequence Sum Monotonic Queue",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-3-monotonic-queue",
    "patternName": "Pattern 11.3 \u2014 Monotonic Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic queue DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SLIDINGWINDOW",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOQUEUE": {
    "code": "MONOQUEUE",
    "title": "Longest Continuous Subarray Absolute Diff",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-3-monotonic-queue",
    "patternName": "Pattern 11.3 \u2014 Monotonic Queue",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "two deques monotonic queue"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MONOQUEUE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOQ101": {
    "code": "MONOQ101",
    "title": "Delivering Boxes from Storage to Ports",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-3-monotonic-queue",
    "patternName": "Pattern 11.3 \u2014 Monotonic Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic queue DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MONOQ101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOQ102": {
    "code": "MONOQ102",
    "title": "Max Value of Equation Deque",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-3-monotonic-queue",
    "patternName": "Pattern 11.3 \u2014 Monotonic Queue",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "monotonic queue"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MONOQ102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BFSQUEUE": {
    "code": "BFSQUEUE",
    "title": "Walls and Gates BFS Queue",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "multi-source BFS queue"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BFSQUEUE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SHORTQ": {
    "code": "SHORTQ",
    "title": "Rotting Oranges Multi-Source BFS",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS queue grid"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SHORTQ",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QBFS101": {
    "code": "QBFS101",
    "title": "Shortest Path in Binary Matrix BFS",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS queue"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/QBFS101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QBFS102": {
    "code": "QBFS102",
    "title": "Word Ladder Shortest Transformation BFS",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "BFS queue hash set"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/QBFS102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QBFS103": {
    "code": "QBFS103",
    "title": "Minimum Knight Moves BFS",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS queue bidirectional"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/QBFS103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "QBFS104": {
    "code": "QBFS104",
    "title": "Open the Lock Combination BFS",
    "kingdomId": "kingdom-11-the-kingdom-of-queue-deque",
    "kingdomName": "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "patternId": "pattern-11-4-queue-bfs-style",
    "patternName": "Pattern 11.4 \u2014 Queue + BFS Style",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS queue state"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/QBFS104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIM101": {
    "code": "SIM101",
    "title": "Design Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-1-simple-simulation",
    "patternName": "Pattern 12.1 \u2014 Simple Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "linked list operations"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SIM101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIM102": {
    "code": "SIM102",
    "title": "Reverse Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-1-simple-simulation",
    "patternName": "Pattern 12.1 \u2014 Simple Simulation",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "linked list iteration"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/SIM102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIM103": {
    "code": "SIM103",
    "title": "Merge Two Sorted Lists",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-1-simple-simulation",
    "patternName": "Pattern 12.1 \u2014 Simple Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "linked list two pointers"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SIM103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIM104": {
    "code": "SIM104",
    "title": "Middle of the Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-1-simple-simulation",
    "patternName": "Pattern 12.1 \u2014 Simple Simulation",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "fast slow pointers"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/SIM104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIM105": {
    "code": "SIM105",
    "title": "Delete Node in a Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-1-simple-simulation",
    "patternName": "Pattern 12.1 \u2014 Simple Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "linked list"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SIM105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "JOSEPHUS": {
    "code": "JOSEPHUS",
    "title": "Josephus Problem Circle Elimination",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-2-circular-simulation",
    "patternName": "Pattern 12.2 \u2014 Circular Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "circular simulation linked list"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/JOSEPHUS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CIRCSIM": {
    "code": "CIRCSIM",
    "title": "Circular Array Loop Cycle Detection",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-2-circular-simulation",
    "patternName": "Pattern 12.2 \u2014 Circular Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "fast slow pointers circular"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CIRCSIM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CIRCLIST101": {
    "code": "CIRCLIST101",
    "title": "Linked List Cycle Detection I",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-2-circular-simulation",
    "patternName": "Pattern 12.2 \u2014 Circular Simulation",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Floyds cycle detection"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CIRCLIST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CIRCLIST102": {
    "code": "CIRCLIST102",
    "title": "Linked List Cycle Start Node II",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-2-circular-simulation",
    "patternName": "Pattern 12.2 \u2014 Circular Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Floyds cycle detection"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CIRCLIST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CIRCLIST103": {
    "code": "CIRCLIST103",
    "title": "Design Circular Queue Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-2-circular-simulation",
    "patternName": "Pattern 12.2 \u2014 Circular Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "circular linked list"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CIRCLIST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIMDATA": {
    "code": "SIMDATA",
    "title": "LRU Cache Design",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-3-simulation-with-data-structures",
    "patternName": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "doubly linked list",
      "hash map"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/SIMDATA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GRIDWALK": {
    "code": "GRIDWALK",
    "title": "LFU Cache Design",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-3-simulation-with-data-structures",
    "patternName": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "doubly linked list",
      "hash map frequency"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GRIDWALK",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIMDS101": {
    "code": "SIMDS101",
    "title": "Design Browser History",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-3-simulation-with-data-structures",
    "patternName": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "doubly linked list simulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SIMDS101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIMDS102": {
    "code": "SIMDS102",
    "title": "Design Underground System",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-3-simulation-with-data-structures",
    "patternName": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "hash map simulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SIMDS102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SIMDS103": {
    "code": "SIMDS103",
    "title": "Flatten Multilevel Doubly Linked List",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-3-simulation-with-data-structures",
    "patternName": "Pattern 12.3 \u2014 Simulation with Data Structures",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack linked list recursion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SIMDS103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ORDERSET": {
    "code": "ORDERSET",
    "title": "Order Statistic Tree Simulation",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-4-ordered-set-simulation",
    "patternName": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "ordered set",
      "PBDS / Fenwick"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ORDERSET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MEDIAN1": {
    "code": "MEDIAN1",
    "title": "Find Median from Data Stream",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-4-ordered-set-simulation",
    "patternName": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "two heaps ordered simulation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MEDIAN1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ORDSET101": {
    "code": "ORDSET101",
    "title": "My Calendar I Booking Interval",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-4-ordered-set-simulation",
    "patternName": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "treemap ordered set"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ORDSET101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ORDSET102": {
    "code": "ORDSET102",
    "title": "My Calendar II Double Booking",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-4-ordered-set-simulation",
    "patternName": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "ordered set interval"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/ORDSET102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ORDSET103": {
    "code": "ORDSET103",
    "title": "Data Stream as Disjoint Intervals",
    "kingdomId": "kingdom-12-the-kingdom-of-linked-list-simulation",
    "kingdomName": "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "patternId": "pattern-12-4-ordered-set-simulation",
    "patternName": "Pattern 12.4 \u2014 Ordered Set Simulation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "ordered set segment"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ORDSET103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE1": {
    "code": "TREE1",
    "title": "Maximum Depth of Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "tree DFS"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREEDFS": {
    "code": "TREEDFS",
    "title": "Invert Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "tree DFS"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TREEDFS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBTREE1": {
    "code": "SUBTREE1",
    "title": "Subtree of Another Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "tree DFS matching"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SUBTREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE101": {
    "code": "TREE101",
    "title": "Same Tree Check",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "tree DFS"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TREE101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE102": {
    "code": "TREE102",
    "title": "Symmetric Tree Check",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "tree DFS"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TREE102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE103": {
    "code": "TREE103",
    "title": "Path Sum I Target",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "tree DFS"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TREE103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE104": {
    "code": "TREE104",
    "title": "Path Sum II All Root to Leaf Paths",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DFS backtracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TREE104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE105": {
    "code": "TREE105",
    "title": "Diameter of Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "tree DFS height"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TREE105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREE106": {
    "code": "TREE106",
    "title": "Balanced Binary Tree Check",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-1-basic-tree-dfs",
    "patternName": "Pattern 13.1 \u2014 Basic Tree DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "tree DFS bottom up"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TREE106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRAVERSE1": {
    "code": "TRAVERSE1",
    "title": "Binary Tree Level Order Traversal",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "BFS queue level traversal"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TRAVERSE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREELEAF": {
    "code": "TREELEAF",
    "title": "Leaf-Similar Trees",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "DFS leaf collector"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TREELEAF",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HEIGHT1": {
    "code": "HEIGHT1",
    "title": "Binary Tree Zigzag Level Order Traversal",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS deque level traversal"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/HEIGHT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV101": {
    "code": "TTRAV101",
    "title": "Binary Tree Preorder Traversal Iterative",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "stack tree traversal"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TTRAV101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV102": {
    "code": "TTRAV102",
    "title": "Binary Tree Inorder Traversal Iterative",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "stack tree traversal"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TTRAV102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV103": {
    "code": "TTRAV103",
    "title": "Binary Tree Postorder Traversal Iterative",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "stack tree traversal"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TTRAV103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV104": {
    "code": "TTRAV104",
    "title": "Vertical Order Traversal of Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DFS coordinate hashing"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TTRAV104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV105": {
    "code": "TTRAV105",
    "title": "Populating Next Right Pointers",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS level pointers"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TTRAV105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TTRAV106": {
    "code": "TTRAV106",
    "title": "Construct Binary Tree Preorder Inorder",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-2-tree-traversal",
    "patternName": "Pattern 13.2 \u2014 Tree Traversal",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "divide & conquer tree construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TTRAV106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INOI1402": {
    "code": "INOI1402",
    "title": "Free Ticket Tree Path Maximum",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "tree DP",
      "Floyd Warshall"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INOI1402",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREEDP1": {
    "code": "TREEDP1",
    "title": "Binary Tree Maximum Path Sum",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "tree DP node path"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TREEDP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INDEPENDENT": {
    "code": "INDEPENDENT",
    "title": "Maximum Weight Independent Set Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "tree DP state 0 1"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INDEPENDENT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXWEIGHT": {
    "code": "MAXWEIGHT",
    "title": "House Robber III Tree DP",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DP memoization"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MAXWEIGHT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TDP101": {
    "code": "TDP101",
    "title": "Unique Binary Search Trees DP",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Catalan number DP"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TDP102": {
    "code": "TDP102",
    "title": "Count Nodes Equal Average Subtree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DP sum count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TDP103": {
    "code": "TDP103",
    "title": "Distribute Coins in Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DP balance flow"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TDP104": {
    "code": "TDP104",
    "title": "Sum of Distances in Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "rerooting tree DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TDP105": {
    "code": "TDP105",
    "title": "Longest Univalue Path Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-3-tree-dp",
    "patternName": "Pattern 13.3 \u2014 Tree DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DP path extension"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TDP105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TALCA": {
    "code": "TALCA",
    "title": "Lowest Common Ancestor Binary Lifting",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "binary lifting LCA"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/TALCA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA1": {
    "code": "LCA1",
    "title": "Lowest Common Ancestor Binary Search Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "BST LCA"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/LCA1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ANCESTOR1": {
    "code": "ANCESTOR1",
    "title": "Lowest Common Ancestor Binary Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "LCA recursion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ANCESTOR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA101": {
    "code": "LCA101",
    "title": "Kth Ancestor of a Tree Node",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary lifting matrix"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LCA101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA102": {
    "code": "LCA102",
    "title": "Distance Between Two Nodes in Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "LCA depth formula"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/LCA102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA103": {
    "code": "LCA103",
    "title": "Min Max Edge Weight Query Path",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary lifting max edge"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LCA103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA104": {
    "code": "LCA104",
    "title": "Tree Path XOR Query LCA",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "binary lifting XOR"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LCA104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LCA105": {
    "code": "LCA105",
    "title": "Lowest Common Ancestor Deepest Leaves",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-4-binary-lifting-lca",
    "patternName": "Pattern 13.4 \u2014 Binary Lifting (LCA)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "LCA height match"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/LCA105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT1": {
    "code": "REROOT1",
    "title": "Tree Node Distance Sum Rerooting",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "rerooting tree DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/REROOT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TREECENTROID": {
    "code": "TREECENTROID",
    "title": "Centroid of Tree Rerooting DP",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "tree centroid rerooting"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TREECENTROID",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT101": {
    "code": "REROOT101",
    "title": "Tree All Nodes Minimum Height Trees",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "rerooting BFS"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/REROOT101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT102": {
    "code": "REROOT102",
    "title": "Maximum Product of Splitting Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "subtree sum tree DP"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/REROOT102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT103": {
    "code": "REROOT103",
    "title": "Greatest Common Divisor Tree Subtree DP",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "rerooting DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/REROOT103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT104": {
    "code": "REROOT104",
    "title": "Tree Coloring Max Score Rerooting",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "rerooting DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/REROOT104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "REROOT105": {
    "code": "REROOT105",
    "title": "Tree Path Coverage Rerooting",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-5-rerooting-dp",
    "patternName": "Pattern 13.5 \u2014 Rerooting DP",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "rerooting DP"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/REROOT105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EULERTOUR1": {
    "code": "EULERTOUR1",
    "title": "Euler Tour Subtree Query Flattening",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour segment tree"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/EULERTOUR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBTREEQUERY": {
    "code": "SUBTREEQUERY",
    "title": "Tree Subtree Update Point Query",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour Fenwick tree"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SUBTREEQUERY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR101": {
    "code": "ETOUR101",
    "title": "Tree Subtree Sum Query Fenwick",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ETOUR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR102": {
    "code": "ETOUR102",
    "title": "LCA via Euler Tour RMQ Segment Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour RMQ LCA"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ETOUR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR103": {
    "code": "ETOUR103",
    "title": "Subtree Color Count Query",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour DSU on tree Sack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ETOUR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR104": {
    "code": "ETOUR104",
    "title": "Subtree Frequency Mo's Algorithm on Tree",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Euler tour Mo algorithm"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/ETOUR104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR105": {
    "code": "ETOUR105",
    "title": "Path Update Point Query Euler Tour",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ETOUR105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ETOUR106": {
    "code": "ETOUR106",
    "title": "Heavy Light Decomposition Base Euler Tour",
    "kingdomId": "kingdom-13-the-kingdom-of-trees",
    "kingdomName": "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "patternId": "pattern-13-6-euler-tour",
    "patternName": "Pattern 13.6 \u2014 Euler Tour",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Euler tour HLD"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/ETOUR106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FIRESC": {
    "code": "FIRESC",
    "title": "Fire Escape Routes",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS connected components",
      "product combinatorics"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/FIRESC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DISHOWN": {
    "code": "DISHOWN",
    "title": "Dish Owner",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU / DFS connected components"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DISHOWN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONNECT1": {
    "code": "CONNECT1",
    "title": "Number of Islands Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS 2D grid components"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONNECT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN101": {
    "code": "CONN101",
    "title": "Max Area of Island Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS grid area sum"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN102": {
    "code": "CONN102",
    "title": "Number of Provinces Graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS adjacency matrix"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN103": {
    "code": "CONN103",
    "title": "Surrounded Regions Capture Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "boundary DFS BFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN104": {
    "code": "CONN104",
    "title": "Number of Closed Islands Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "boundary DFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN105": {
    "code": "CONN105",
    "title": "Count Sub Islands Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "dual DFS grid"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN106": {
    "code": "CONN106",
    "title": "Number of Operations to Make Network Connected",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU connected components"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONN106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONN107": {
    "code": "CONN107",
    "title": "Accounts Merge Email Graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-1-connected-components",
    "patternName": "Pattern 14.1 \u2014 Connected Components",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "DFS DSU components"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/CONN107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS1": {
    "code": "DFS1",
    "title": "Graph DFS Traversal",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "DFS recursion"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/DFS1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GRAPHDFS": {
    "code": "GRAPHDFS",
    "title": "Clone Graph DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS hash map memo"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GRAPHDFS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PATHFIND": {
    "code": "PATHFIND",
    "title": "All Paths From Source to Target",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS backtracking path"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PATHFIND",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS101": {
    "code": "DFS101",
    "title": "Keys and Rooms Graph DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "DFS set traversal"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/DFS101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS102": {
    "code": "DFS102",
    "title": "Reconstruct Itinerary Eulerian DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Hierholzer algorithm Eulerian DFS"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DFS102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS103": {
    "code": "DFS103",
    "title": "Evaluate Division Graph DFS Weights",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS path multiplication"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DFS103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS104": {
    "code": "DFS104",
    "title": "Time Needed to Inform All Employees",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "tree DFS max depth weight"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DFS104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS105": {
    "code": "DFS105",
    "title": "Pacific Atlantic Water Flow Grid DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "dual boundary DFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DFS105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS106": {
    "code": "DFS106",
    "title": "Word Search II Trie + Grid DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Trie DFS backtracking"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DFS106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DFS107": {
    "code": "DFS107",
    "title": "Making A Large Island Grid DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-2-dfs",
    "patternName": "Pattern 14.2 \u2014 DFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "component ID DFS grid"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DFS107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOPSORT1": {
    "code": "TOPSORT1",
    "title": "Course Schedule I Cycle Detection",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kahn algorithm in-degree BFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TOPSORT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DEPENDENCY": {
    "code": "DEPENDENCY",
    "title": "Course Schedule II Ordering",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kahn algorithm topological sort"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DEPENDENCY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP101": {
    "code": "TOP101",
    "title": "Alien Dictionary Order Topological Sort",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "topological sort Kahn DFS"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TOP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP102": {
    "code": "TOP102",
    "title": "Minimum Height Trees Topological Trim",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "leaf trimming BFS topological"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TOP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP103": {
    "code": "TOP103",
    "title": "Sequence Reconstruction Unique Topological Sort",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Kahn algorithm topological sort"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TOP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP104": {
    "code": "TOP104",
    "title": "Find Eventual Safe States Graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "reverse topological sort / cycle DFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TOP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP105": {
    "code": "TOP105",
    "title": "Sort Items by Groups Respecting Dependencies",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "double topological sort"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TOP105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP106": {
    "code": "TOP106",
    "title": "Parallel Courses I Semester Count",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "topological sort BFS level"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TOP106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TOP107": {
    "code": "TOP107",
    "title": "Build a Matrix With Conditions Topological",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-4-topological-sort",
    "patternName": "Pattern 14.4 \u2014 Topological Sort",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D topological sort"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TOP107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYCLEDET": {
    "code": "CYCLEDET",
    "title": "Cycle Detection Undirected Graph DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "DFS parent check"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/CYCLEDET",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIRECTEDCYC": {
    "code": "DIRECTEDCYC",
    "title": "Cycle Detection Directed Graph DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DFS visited state 0 1 2"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIRECTEDCYC",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC101": {
    "code": "CYC101",
    "title": "Redundant Connection Undirected Cycle",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU cycle detection"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CYC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC102": {
    "code": "CYC102",
    "title": "Redundant Connection II Directed Tree Edge",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DSU directed cycle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CYC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC103": {
    "code": "CYC103",
    "title": "Find All Groups of Farmland Cycle Free",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "grid traversal cycle free"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CYC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC104": {
    "code": "CYC104",
    "title": "Graph Valid Tree Check",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU / DFS cycle + component count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CYC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC105": {
    "code": "CYC105",
    "title": "Detect Cycles in 2D Grid",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "grid DFS parent cycle check"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CYC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC106": {
    "code": "CYC106",
    "title": "Shortest Cycle in a Graph BFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "BFS cycle length minimum"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CYC106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CYC107": {
    "code": "CYC107",
    "title": "Longest Cycle in a Graph Functional",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-5-cycle-detection",
    "patternName": "Pattern 14.5 \u2014 Cycle Detection",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "functional graph cycle DFS"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CYC107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIPARTITE1": {
    "code": "BIPARTITE1",
    "title": "Is Graph Bipartite 2-Coloring DFS",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BFS DFS 2-coloring"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BIPARTITE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TWOCOLOR": {
    "code": "TWOCOLOR",
    "title": "Possible Bipartition Group Split",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bipartite 2-coloring BFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TWOCOLOR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP101": {
    "code": "BIP101",
    "title": "Cheating Student Bipartite Graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bipartite graph check"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BIP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP102": {
    "code": "BIP102",
    "title": "Maximum Bipartite Matching Hopcroft-Karp",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Hopcroft-Karp Bipartite Matching"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BIP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP103": {
    "code": "BIP103",
    "title": "Hungarian Algorithm Minimum Weight Bipartite Matching",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Hungarian KM Algorithm"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/BIP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP104": {
    "code": "BIP104",
    "title": "Bipartite Graph Maximum Independent Set",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Konig theorem bipartite max matching"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BIP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP105": {
    "code": "BIP105",
    "title": "Divide Nodes Into the Maximum Number of Groups",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "BFS bipartite component diameter"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BIP105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP106": {
    "code": "BIP106",
    "title": "Minimum Vertex Cover in Bipartite Graph",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Konig theorem bipartite cover"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BIP106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP107": {
    "code": "BIP107",
    "title": "Bipartite Graph Edge Removal Equal Color",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "bipartite 2-coloring"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BIP107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIP108": {
    "code": "BIP108",
    "title": "Coloring a Border 2D Grid Bipartite",
    "kingdomId": "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs",
    "kingdomName": "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "patternId": "pattern-14-6-bipartite-graph",
    "patternName": "Pattern 14.6 \u2014 Bipartite Graph",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "grid DFS 2-coloring boundary"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BIP108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJKSTRA1": {
    "code": "DIJKSTRA1",
    "title": "Network Delay Time Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Dijkstra min-heap priority queue"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIJKSTRA1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SHORTPATH": {
    "code": "SHORTPATH",
    "title": "Path with Maximum Probability Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Dijkstra max-heap product"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SHORTPATH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ101": {
    "code": "DIJ101",
    "title": "Cheapest Flights Within K Stops Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Dijkstra modified state / Bellman-Ford"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DIJ101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ102": {
    "code": "DIJ102",
    "title": "Swim in Rising Water Dijkstra Grid",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dijkstra min-heap grid max elevation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIJ102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ103": {
    "code": "DIJ103",
    "title": "Path With Minimum Effort Grid Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Dijkstra min max diff"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIJ103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ104": {
    "code": "DIJ104",
    "title": "Shortest Path Visiting All Nodes Bitmask Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dijkstra bitmask state"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIJ104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ105": {
    "code": "DIJ105",
    "title": "Reachable Nodes In Subdivided Graph Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dijkstra edge subdivision count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIJ105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ106": {
    "code": "DIJ106",
    "title": "Find Minimum Time to Finish All Jobs Dijkstra",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dijkstra state space"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIJ106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ107": {
    "code": "DIJ107",
    "title": "Shortest Distance After Road Addition Queries I",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Dijkstra BFS queries"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DIJ107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIJ108": {
    "code": "DIJ108",
    "title": "Second Shortest Path to Reach Destination",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-1-standard-dijkstra",
    "patternName": "Pattern 15.1 \u2014 Standard Dijkstra",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dijkstra k-th shortest path"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIJ108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BFS01": {
    "code": "BFS01",
    "title": "Shortest Path 0-1 Edge Weights Deque BFS",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 BFS deque popleft pushleft"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BFS01",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEAPEST1": {
    "code": "CHEAPEST1",
    "title": "Minimum Cost to Make at Least One Valid Path Grid",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "0-1 BFS grid direction deque"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CHEAPEST1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS101": {
    "code": "Z1BFS101",
    "title": "Minimum Obstacle Removal to Reach Corner",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "0-1 BFS grid removal count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/Z1BFS101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS102": {
    "code": "Z1BFS102",
    "title": "Minimum Cost to Reach City 0-1 BFS",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 BFS state deque"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/Z1BFS102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS103": {
    "code": "Z1BFS103",
    "title": "Minimum Flips to Grid Edge Path 0-1 BFS",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "0-1 BFS grid"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/Z1BFS103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS104": {
    "code": "Z1BFS104",
    "title": "Shortest Grid Path With 0 and 1 Weight Edge",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 BFS deque"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/Z1BFS104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS105": {
    "code": "Z1BFS105",
    "title": "Zero One Weight Shortest Cycle BFS",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "0-1 BFS deque cycle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/Z1BFS105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "Z1BFS106": {
    "code": "Z1BFS106",
    "title": "Binary Grid Shortest Path Toggle Cost",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-3-0-1-bfs",
    "patternName": "Pattern 15.3 \u2014 0-1 BFS",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "0-1 BFS deque"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/Z1BFS106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BELLMAN1": {
    "code": "BELLMAN1",
    "title": "Bellman Ford Single Source Shortest Path",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Bellman-Ford V-1 relaxation"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BELLMAN1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NEGATIVE1": {
    "code": "NEGATIVE1",
    "title": "Negative Weight Cycle Detection Bellman Ford",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Bellman-Ford V-th relaxation cycle"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/NEGATIVE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF101": {
    "code": "BF101",
    "title": "SPFA Shortest Path Faster Algorithm",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "SPFA queue relaxation"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BF101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF102": {
    "code": "BF102",
    "title": "Cheapest Flights Bellman Ford Array",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Bellman-Ford K iterations"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BF102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF103": {
    "code": "BF103",
    "title": "Arbitrage Currency Conversion Negative Cycle",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bellman-Ford log weights negative cycle"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BF103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF104": {
    "code": "BF104",
    "title": "Johnson's All Pairs Shortest Path Algorithm",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Johnson algorithm reweighting Bellman-Ford Dijkstra"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BF104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF105": {
    "code": "BF105",
    "title": "Min Cost Max Flow SPFA Augmenting Path",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "SPFA Primal-Dual Min Cost Max Flow"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BF105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF106": {
    "code": "BF106",
    "title": "Potent Graph Negative Cycle Search SPFA",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "SPFA count visited relaxation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BF106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BF107": {
    "code": "BF107",
    "title": "Shortest Path Matrix Transition Bellman Ford",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-4-bellman-ford-negative-edges",
    "patternName": "Pattern 15.4 \u2014 Bellman-Ford / Negative Edges",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bellman-Ford DP matrix"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BF107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FLOYD1": {
    "code": "FLOYD1",
    "title": "Floyd Warshall All Pairs Shortest Path",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Floyd Warshall O(V^3) 3 loops"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/FLOYD1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ALLPAIRS": {
    "code": "ALLPAIRS",
    "title": "Find the City With Smallest Threshold Distance",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Floyd Warshall matrix all pairs"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ALLPAIRS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW101": {
    "code": "FW101",
    "title": "Transitive Closure of Graph Floyd Warshall",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Floyd Warshall boolean reachability"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/FW101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW102": {
    "code": "FW102",
    "title": "Evaluate Division All Pairs Query Floyd Warshall",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Floyd Warshall matrix product"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/FW102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW103": {
    "code": "FW103",
    "title": "Minimum Cost to Convert String I Floyd Warshall",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Floyd Warshall character transformation"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/FW103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW104": {
    "code": "FW104",
    "title": "Shortest Path With Distance Threshold Matrix",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Floyd Warshall reachability count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/FW104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW105": {
    "code": "FW105",
    "title": "Graph Transitive Reduction Minimal Edges",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Floyd Warshall reachability reduction"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/FW105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW106": {
    "code": "FW106",
    "title": "Minimax Path Maximum Edge Weight All Pairs",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Floyd Warshall min-max path"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/FW106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW107": {
    "code": "FW107",
    "title": "Dynamic Graph Floyd Warshall Edge Insert Query",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Floyd Warshall incremental update O(V^2)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/FW107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FW108": {
    "code": "FW108",
    "title": "Diameter of Weighted Graph Floyd Warshall",
    "kingdomId": "kingdom-15-the-kingdom-of-shortest-paths",
    "kingdomName": "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "patternId": "pattern-15-5-floyd-warshall",
    "patternName": "Pattern 15.5 \u2014 Floyd Warshall",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Floyd Warshall max finite distance"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/FW108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU1": {
    "code": "DSU1",
    "title": "Disjoint Set Union Find Template",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "DSU path compression rank union"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/DSU1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU101": {
    "code": "DSU101",
    "title": "Number of Connected Components DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU count components"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DSU101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU102": {
    "code": "DSU102",
    "title": "Graph Valid Tree DSU Check",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU cycle + component check"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DSU102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU103": {
    "code": "DSU103",
    "title": "Redundant Connection DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU find redundant edge"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DSU103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU104": {
    "code": "DSU104",
    "title": "Friend Circles DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU matrix union"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DSU104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DSU105": {
    "code": "DSU105",
    "title": "Smallest String With Swaps DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-1-basic-dsu",
    "patternName": "Pattern 16.1 \u2014 Basic DSU",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU index grouping sorting"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DSU105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UNIONFIND1": {
    "code": "UNIONFIND1",
    "title": "Accounts Merge DSU Email Lookup",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "DSU string hash grouping"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/UNIONFIND1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONNECTED2": {
    "code": "CONNECTED2",
    "title": "Regions Cut By Slashes Grid DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DSU 3x3 grid subdivision"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONNECTED2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UFA101": {
    "code": "UFA101",
    "title": "Most Stones Removed with Same Row or Column",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU row col index union"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/UFA101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UFA102": {
    "code": "UFA102",
    "title": "Satisfiability of Equality Equations DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU equals non-equals validation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/UFA102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UFA103": {
    "code": "UFA103",
    "title": "Lexicographically Smallest Equivalent String DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DSU min character representative"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/UFA103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UFA104": {
    "code": "UFA104",
    "title": "Number of Islands II Dynamic Add Land DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DSU 2D grid online land insertion"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/UFA104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "UFA105": {
    "code": "UFA105",
    "title": "Checking Existence of Edge Length Limited Paths",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-2-union-find-applications",
    "patternName": "Pattern 16.2 \u2014 Union Find Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DSU offline query sorting by weight"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/UFA105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MST1": {
    "code": "MST1",
    "title": "Min Cost to Connect All Points Kruskal",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kruskal MST Manhattan distance edge sort"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MST1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KRUSKAL1": {
    "code": "KRUSKAL1",
    "title": "Connecting Cities With Minimum Cost Kruskal",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kruskal MST edge list DSU"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KRUSKAL1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MINSPAN": {
    "code": "MINSPAN",
    "title": "Minimum Spanning Tree Edge Weights Sum",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kruskal MST DSU"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MINSPAN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMST101": {
    "code": "KMST101",
    "title": "Optimize Water Distribution in a Village Kruskal",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Kruskal MST virtual super source node 0"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/KMST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMST102": {
    "code": "KMST102",
    "title": "Critical and Pseudo-Critical Edges in MST",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Kruskal MST edge inclusion exclusion force"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/KMST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMST103": {
    "code": "KMST103",
    "title": "Prim's Algorithm Minimum Spanning Tree Min-Heap",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Prim MST min-heap priority queue"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/KMST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KMST104": {
    "code": "KMST104",
    "title": "Maximal Spanning Tree Negative Weight Kruskal",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-3-kruskal-s-mst",
    "patternName": "Pattern 16.3 \u2014 Kruskal's MST",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Kruskal MST max edge sort"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KMST104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFLINEDSU": {
    "code": "OFFLINEDSU",
    "title": "Offline Dynamic Connectivity DSU Divide & Conquer",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-5-offline-dsu",
    "patternName": "Pattern 16.5 \u2014 Offline DSU",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Offline DSU undo rollback stack"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFLINEDSU",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DYNAMICCONN": {
    "code": "DYNAMICCONN",
    "title": "Offline Range Query Edge Add Delete DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-5-offline-dsu",
    "patternName": "Pattern 16.5 \u2014 Offline DSU",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "DSU with rollback segment tree offline"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/DYNAMICCONN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFDSU101": {
    "code": "OFFDSU101",
    "title": "Offline Queries Maximum Weight Edge Limit DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-5-offline-dsu",
    "patternName": "Pattern 16.5 \u2014 Offline DSU",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Offline query sorting DSU pointer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFDSU101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFDSU102": {
    "code": "OFFDSU102",
    "title": "Offline Edge Addition Connectivity Query Range",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-5-offline-dsu",
    "patternName": "Pattern 16.5 \u2014 Offline DSU",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Offline DSU rollback divide conquer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFDSU102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFDSU103": {
    "code": "OFFDSU103",
    "title": "Dynamic Graph Bridge Count Offline DSU",
    "kingdomId": "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree",
    "kingdomName": "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "patternId": "pattern-16-5-offline-dsu",
    "patternName": "Pattern 16.5 \u2014 Offline DSU",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Offline DSU bridge tracking"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/OFFDSU103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D101": {
    "code": "DP1D101",
    "title": "Climbing Stairs 1D DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "1D DP Fibonacci transition"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/DP1D101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D102": {
    "code": "DP1D102",
    "title": "Min Cost Climbing Stairs",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "1D DP min state transition"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/DP1D102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D103": {
    "code": "DP1D103",
    "title": "House Robber I Non Adjacent Sum",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "1D DP max choose skip"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DP1D103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D104": {
    "code": "DP1D104",
    "title": "House Robber II Circular Houses",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "1D DP dual pass 0 to N-2 and 1 to N-1"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DP1D104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D105": {
    "code": "DP1D105",
    "title": "Decode Ways String Message DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "1D DP digit parsing state"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DP1D105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D106": {
    "code": "DP1D106",
    "title": "Word Break I Dictionary Split",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "1D DP boolean substring matching"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DP1D106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D107": {
    "code": "DP1D107",
    "title": "Longest Increasing Subsequence LIS O(N^2)",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "1D DP LIS subproblem"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DP1D107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DP1D108": {
    "code": "DP1D108",
    "title": "Longest Increasing Subsequence LIS O(N log N)",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-1-introduction-to-dp-1d-dp",
    "patternName": "Pattern 17.1 \u2014 Introduction to DP (1D DP)",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Patience sorting binary search bisect_left"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DP1D108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAPSACK1": {
    "code": "KNAPSACK1",
    "title": "0-1 Knapsack Classic Standard DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 Knapsack 2D 1D array capacity loop"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KNAPSACK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBSETSUM": {
    "code": "SUBSETSUM",
    "title": "Subset Sum Problem Equal Partition DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 Knapsack subset sum boolean DP"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUBSETSUM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RATIONAL": {
    "code": "RATIONAL",
    "title": "Coin Change I Minimum Coins DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Unbounded Knapsack min coin DP"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/RATIONAL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAP101": {
    "code": "KNAP101",
    "title": "Coin Change II Total Ways Combination DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Unbounded Knapsack ways outer coin loop"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KNAP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAP102": {
    "code": "KNAP102",
    "title": "Partition Equal Subset Sum 0-1 Knapsack",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 Knapsack boolean subset sum target/2"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KNAP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAP103": {
    "code": "KNAP103",
    "title": "Target Sum Plus Minus Signs Knapsack",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "0-1 Knapsack subset sum offset formula"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KNAP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAP104": {
    "code": "KNAP104",
    "title": "Ones and Zeroes 2D 0-1 Knapsack DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "2D 0-1 Knapsack m zeros n ones capacity"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/KNAP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KNAP105": {
    "code": "KNAP105",
    "title": "Unbounded Knapsack Maximum Value DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-2-knapsack-dp",
    "patternName": "Pattern 17.2 \u2014 Knapsack DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Unbounded Knapsack max profit capacity"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/KNAP105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GRIDDP1": {
    "code": "GRIDDP1",
    "title": "Unique Paths I Robot Grid DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "2D Grid DP combinations / 2D table"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/GRIDDP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXPATH": {
    "code": "MAXPATH",
    "title": "Unique Paths II Obstacles Grid DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D Grid DP obstacle zeroing"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MAXPATH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHEFGRID": {
    "code": "CHEFGRID",
    "title": "Minimum Path Sum Grid Top-Left to Bottom-Right",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D Grid DP min cost path"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CHEFGRID",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GDP101": {
    "code": "GDP101",
    "title": "Triangle Minimum Path Sum Top to Bottom DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D Grid DP triangle bottom up"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GDP102": {
    "code": "GDP102",
    "title": "Dungeon Game Health Requirement Grid DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D Grid DP bottom-right to top-left min health"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GDP103": {
    "code": "GDP103",
    "title": "Cherry Pickup I Grid Dual Walk 3D DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "3D Grid DP dual path simultaneous walk"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GDP104": {
    "code": "GDP104",
    "title": "Cherry Pickup II Grid Two Robots 3D DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-3-grid-dp",
    "patternName": "Pattern 17.3 \u2014 Grid DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "3D Grid DP 2 robots simultaneous row walk"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTERVALDP": {
    "code": "INTERVALDP",
    "title": "Matrix Chain Multiplication MCM Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Interval DP split k loop"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INTERVALDP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATRIXMULT": {
    "code": "MATRIXMULT",
    "title": "Longest Palindromic Subsequence LPS Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Interval DP len outer i j inner"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MATRIXMULT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PALINDP": {
    "code": "PALINDP",
    "title": "Burst Balloons Maximum Coins Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interval DP last burst balloon k"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PALINDP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INDP101": {
    "code": "INDP101",
    "title": "Minimum Cost Tree From Leaf Values Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Interval DP max product split"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INDP102": {
    "code": "INDP102",
    "title": "Strange Printer Minimum Turns Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interval DP char match collapse"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INDP103": {
    "code": "INDP103",
    "title": "Remove Boxes Maximum Score Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "3D Interval DP len i j k same color count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INDP104": {
    "code": "INDP104",
    "title": "Predict the Winner Game Theory Interval DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-4-interval-dp",
    "patternName": "Pattern 17.4 \u2014 Interval DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Interval DP minimax score diff"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIGITDP1": {
    "code": "DIGITDP1",
    "title": "Count Numbers With Digit Constraint Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP idx tight leads zero memo"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIGITDP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "COUNTDIGIT": {
    "code": "COUNTDIGIT",
    "title": "Number of Digit One Count Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP count digit occurrence"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/COUNTDIGIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIG101": {
    "code": "DIG101",
    "title": "Non-negative Integers without Consecutive Ones",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP binary string tight flag"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIG101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIG102": {
    "code": "DIG102",
    "title": "Numbers With Repeated Digits Count Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP bitmask mask used digits"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIG102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIG103": {
    "code": "DIG103",
    "title": "Rotatable Digits Count Range Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Digit DP digit mapping valid check"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DIG103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIG104": {
    "code": "DIG104",
    "title": "Sum of Digits in Range L to R Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP sum accumulator tight"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIG104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIG105": {
    "code": "DIG105",
    "title": "Numbers Divisible by K Digit DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-5-digit-dp",
    "patternName": "Pattern 17.5 \u2014 Digit DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Digit DP remainder modulo k state"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DIG105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITMASKDP": {
    "code": "BITMASKDP",
    "title": "Traveling Salesman Problem TSP Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bitmask DP state (mask",
      "pos) O(2^N * N^2)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BITMASKDP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ASSIGN1": {
    "code": "ASSIGN1",
    "title": "Job Assignment Problem Minimum Cost Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Bitmask DP (mask) min cost assignment"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/ASSIGN1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TSP1": {
    "code": "TSP1",
    "title": "Shortest Path Visiting All Nodes Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bitmask BFS/DP state (mask",
      "node)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TSP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BMDP101": {
    "code": "BMDP101",
    "title": "Partition to K Equal Sum Subsets Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Bitmask DP (mask",
      "current_sum)"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BMDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BMDP102": {
    "code": "BMDP102",
    "title": "Smallest Sufficient Team Skill Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bitmask DP minimum team size"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BMDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BMDP103": {
    "code": "BMDP103",
    "title": "Matchsticks to Square Perimeter Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Bitmask DP side length match"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BMDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BMDP104": {
    "code": "BMDP104",
    "title": "Maximum Students Taking Exam Bitmask DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-6-bitmask-dp",
    "patternName": "Pattern 17.6 \u2014 Bitmask DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bitmask DP row mask valid seating"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BMDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DAGDP1": {
    "code": "DAGDP1",
    "title": "Longest Path in Directed Acyclic Graph DAG DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DAG DP topological order / DFS memo"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DAGDP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LONGESTPATH": {
    "code": "LONGESTPATH",
    "title": "All Ancestors of a Node in DAG DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "DAG DP reachability memo"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/LONGESTPATH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DAG101": {
    "code": "DAG101",
    "title": "Number of Increasing Paths in Grid DAG DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DAG DP memoization grid 4-dir"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DAG101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DAG102": {
    "code": "DAG102",
    "title": "Minimum Number of Days to Disconnect Island DAG",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DAG DP articulation points"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DAG102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DAG103": {
    "code": "DAG103",
    "title": "Count Paths With Target Sum in DAG DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "DAG DP path count memoization"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DAG103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DAG104": {
    "code": "DAG104",
    "title": "Max Weight Independent Path DAG DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-8-dp-on-dag",
    "patternName": "Pattern 17.8 \u2014 DP on DAG",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DAG DP topological order relaxation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DAG104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PROBDP1": {
    "code": "PROBDP1",
    "title": "Knight Probability in Chessboard Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Probability DP grid move sum / 8"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PROBDP1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DICE1": {
    "code": "DICE1",
    "title": "Soup Servings Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Probability DP N scale limit memo"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DICE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRBDP101": {
    "code": "PRBDP101",
    "title": "New 21 Game Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Probability DP sliding window sum"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/PRBDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRBDP102": {
    "code": "PRBDP102",
    "title": "Airplane Seat Assignment Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Probability DP base cases induction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRBDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRBDP103": {
    "code": "PRBDP103",
    "title": "Toss Strange Coins Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Probability DP (i",
      "k) head count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRBDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PRBDP104": {
    "code": "PRBDP104",
    "title": "Random Pick with Weight Probability DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-9-probability-dp",
    "patternName": "Pattern 17.9 \u2014 Probability DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Prefix sum binary search probability"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PRBDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREFIXDP": {
    "code": "PREFIXDP",
    "title": "Longest Common Subsequence LCS DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D DP LCS table i j match mismatch"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREFIXDP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUFFIXDP": {
    "code": "SUFFIXDP",
    "title": "Edit Distance Levenshtein Distance DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "2D DP Edit distance insert delete replace"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/SUFFIXDP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSDP101": {
    "code": "PSDP101",
    "title": "Distinct Subsequences String Matching DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D DP string match count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PSDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSDP102": {
    "code": "PSDP102",
    "title": "Regular Expression Matching Wildcard DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D DP char * match state"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PSDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSDP103": {
    "code": "PSDP103",
    "title": "Wildcard Matching ? and * String DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D DP ? * wildcard matching"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PSDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSDP104": {
    "code": "PSDP104",
    "title": "Interleaving String Mix DP",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-10-prefix-suffix-dp",
    "patternName": "Pattern 17.10 \u2014 Prefix/Suffix DP",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D DP boolean s1 s2 s3 match"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PSDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CHT1": {
    "code": "CHT1",
    "title": "Convex Hull Trick CHT DP Optimization",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Convex Hull Trick line slope insertion deque"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CHT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MONOOPT": {
    "code": "MONOOPT",
    "title": "Knuth Optimization DP Matrix Multiplication",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Knuth Optimization opt[i][j-1] <= opt[i][j] <= opt[i+1][j]"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MONOOPT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPTDP101": {
    "code": "OPTDP101",
    "title": "Divide and Conquer DP Optimization Subarray Split",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Divide & Conquer DP opt monotony"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OPTDP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPTDP102": {
    "code": "OPTDP102",
    "title": "1D 1D DP Monotone Queue Optimization",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "1D 1D DP monotonic queue envelope"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OPTDP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPTDP103": {
    "code": "OPTDP103",
    "title": "Li Chao Tree Dynamic Line Insert CHT",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Li Chao segment tree line insert"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/OPTDP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OPTDP104": {
    "code": "OPTDP104",
    "title": "Slope Trick DP Convex Function Optimization",
    "kingdomId": "kingdom-17-the-kingdom-of-dynamic-programming",
    "kingdomName": "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "patternId": "pattern-17-12-optimization-dp",
    "patternName": "Pattern 17.12 \u2014 Optimization DP",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Slope trick priority queues min-heap max-heap"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/OPTDP104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TSORT": {
    "code": "TSORT",
    "title": "Turbo Sort",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "sorting",
      "merge sort / quicksort"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/TSORT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MERGESORT1": {
    "code": "MERGESORT1",
    "title": "Merge Sort Implementation Divide & Conquer",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "divide & conquer recursion merge"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/MERGESORT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INVERSION": {
    "code": "INVERSION",
    "title": "Count Inversions in Array Merge Sort",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "divide & conquer merge sort count"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INVERSION",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MSAPP101": {
    "code": "MSAPP101",
    "title": "Reverse Pairs Count Merge Sort",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "divide & conquer merge sort 2*nums[j]"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MSAPP101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MSAPP102": {
    "code": "MSAPP102",
    "title": "Count of Smaller Numbers After Self Merge Sort",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "divide & conquer index tracking merge sort"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MSAPP102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MSAPP103": {
    "code": "MSAPP103",
    "title": "Count of Range Sum Bounds Merge Sort",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-2-merge-sort-applications",
    "patternName": "Pattern 18.2 \u2014 Merge Sort Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "divide & conquer prefix sum merge sort"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MSAPP103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DIVARR1": {
    "code": "DIVARR1",
    "title": "Maximum Subarray Sum Kadane Divide & Conquer",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "divide & conquer cross sum"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/DIVARR1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXSUBARR": {
    "code": "MAXSUBARR",
    "title": "Majority Element Divide & Conquer",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "divide & conquer count"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/MAXSUBARR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DCARR101": {
    "code": "DCARR101",
    "title": "Kth Largest Element in an Array QuickSelect",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "QuickSelect divide & conquer partition"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DCARR101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DCARR102": {
    "code": "DCARR102",
    "title": "Search a 2D Matrix II Divide & Conquer",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "divide & conquer matrix quadrant search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DCARR102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DCARR103": {
    "code": "DCARR103",
    "title": "Super Pow Divide & Conquer Exponentiation",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "divide & conquer modular pow"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/DCARR103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DCARR104": {
    "code": "DCARR104",
    "title": "Beautiful Array Divide & Conquer Construction",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "divide & conquer odd even partition"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DCARR104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DCARR105": {
    "code": "DCARR105",
    "title": "Longest Substring with At Least K Repeating Chars",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-3-divide-conquer-on-arrays",
    "patternName": "Pattern 18.3 \u2014 Divide & Conquer on Arrays",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "divide & conquer frequency split"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/DCARR105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ1": {
    "code": "CDQ1",
    "title": "CDQ Divide & Conquer 3D Partial Order Count",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "CDQ divide & conquer offline sorting merge"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CDQ1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "3DPOINTS": {
    "code": "3DPOINTS",
    "title": "CDQ Divide & Conquer 3D Dominance Range Query",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "CDQ divide & conquer BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/3DPOINTS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ101": {
    "code": "CDQ101",
    "title": "CDQ Divide & Conquer 4D Partial Order Range",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "CDQ divide & conquer nested merge"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/CDQ101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ102": {
    "code": "CDQ102",
    "title": "CDQ Divide & Conquer Dynamic LIS Point Update",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "CDQ divide & conquer DP BIT"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/CDQ102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ103": {
    "code": "CDQ103",
    "title": "CDQ Divide & Conquer Dynamic 2D Range Sum",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "CDQ divide & conquer offline update query"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/CDQ103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ104": {
    "code": "CDQ104",
    "title": "CDQ Divide & Conquer Rectangular Intersection Count",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "CDQ divide & conquer interval count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CDQ104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CDQ105": {
    "code": "CDQ105",
    "title": "CDQ Divide & Conquer Multi-Dimensional Point Search",
    "kingdomId": "kingdom-18-the-kingdom-of-divide-conquer",
    "kingdomName": "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "patternId": "pattern-18-4-cdq-divide-conquer",
    "patternName": "Pattern 18.4 \u2014 CDQ Divide & Conquer",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "CDQ divide & conquer"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/CDQ105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SEGTREE1": {
    "code": "SEGTREE1",
    "title": "Segment Tree Build Point Update Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree array representation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SEGTREE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RANGEQUERY": {
    "code": "RANGEQUERY",
    "title": "Range Minimum Query RMQ Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree min query"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/RANGEQUERY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BST101": {
    "code": "BST101",
    "title": "Range Sum Query Mutable Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree point update sum"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BST102": {
    "code": "BST102",
    "title": "Range Maximum Query Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree max query"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BST103": {
    "code": "BST103",
    "title": "Segment Tree GCD Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "segment tree GCD combine"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BST104": {
    "code": "BST104",
    "title": "Segment Tree Bitwise OR Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-1-basic-segment-tree",
    "patternName": "Pattern 19.1 \u2014 Basic Segment Tree",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "segment tree bitwise OR"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BST104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "POINTUPDATE": {
    "code": "POINTUPDATE",
    "title": "Point Update Range Sum Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree point update"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/POINTUPDATE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUMQUERY": {
    "code": "SUMQUERY",
    "title": "Point Update Range Max Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "segment tree point update"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUMQUERY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RQPU101": {
    "code": "RQPU101",
    "title": "Count of Smaller Numbers After Self Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "coordinate compression segment tree point update"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/RQPU101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RQPU102": {
    "code": "RQPU102",
    "title": "Longest Increasing Subsequence LIS Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "DP + Segment Tree point update"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/RQPU102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RQPU103": {
    "code": "RQPU103",
    "title": "Maximum Sum Subarray Range Query Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree 4-tuple (sum",
      "pref",
      "suff",
      "max)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/RQPU103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RQPU104": {
    "code": "RQPU104",
    "title": "Dynamic Subarray Sum Target Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-2-range-query-point-update",
    "patternName": "Pattern 19.2 \u2014 Range Query + Point Update",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree state combine"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/RQPU104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAZYPROP": {
    "code": "LAZYPROP",
    "title": "Range Add Update Range Sum Query Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree lazy array pushdown"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LAZYPROP",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RANGEADD": {
    "code": "RANGEADD",
    "title": "Range Set Value Update Range Min Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree lazy assignment tag"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/RANGEADD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAZY101": {
    "code": "LAZY101",
    "title": "Range Flip Bits Range Count Ones Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree lazy bit flip tag"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LAZY101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAZY102": {
    "code": "LAZY102",
    "title": "Range Affine Transformation Ax + B Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree lazy affine combination (mul",
      "add)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LAZY102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAZY103": {
    "code": "LAZY103",
    "title": "Falling Squares Maximum Height Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "coordinate compression lazy segment tree max"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/LAZY103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LAZY104": {
    "code": "LAZY104",
    "title": "Range GCD Update Range Query Lazy Segment Tree",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-3-lazy-propagation",
    "patternName": "Pattern 19.3 \u2014 Lazy Propagation",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "segment tree lazy GCD update"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/LAZY104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MERGETREE": {
    "code": "MERGETREE",
    "title": "Merge Sort Tree Range Kth Element Count",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree vector nodes bisect"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MERGETREE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "KTHMIN": {
    "code": "KTHMIN",
    "title": "Merge Sort Tree Range Count Elements Greater Than X",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "segment tree sorted array nodes"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/KTHMIN",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MST101": {
    "code": "MST101",
    "title": "Merge Sort Tree Dynamic Point Update Range Kth",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "merge sort tree Fenwick vector"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/MST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MST102": {
    "code": "MST102",
    "title": "Merge Sort Tree Distinct Elements in Range Count",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "merge sort tree bisect"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MST103": {
    "code": "MST103",
    "title": "Merge Sort Tree Range Nearest Neighbor Search",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "merge sort tree lower_bound"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MST104": {
    "code": "MST104",
    "title": "Merge Sort Tree Fractional Cascading Optimization",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-4-merge-sort-tree",
    "patternName": "Pattern 19.4 \u2014 Merge Sort Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "merge sort tree fractional cascading"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/MST104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PERSISTENT1": {
    "code": "PERSISTENT1",
    "title": "Persistent Segment Tree Range Kth Smallest Element",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "persistent segment tree version pointers"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PERSISTENT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "HISTORICAL": {
    "code": "HISTORICAL",
    "title": "Persistent Segment Tree Point Update Historical Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "persistent segment tree root version history"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/HISTORICAL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PST101": {
    "code": "PST101",
    "title": "Persistent Segment Tree Distinct Elements Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "persistent segment tree offline last pos"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PST102": {
    "code": "PST102",
    "title": "Persistent Segment Tree Tree Path Kth Element LCA",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "persistent segment tree tree nodes LCA"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/PST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PST103": {
    "code": "PST103",
    "title": "Persistent Segment Tree Range Substring Hash Version",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "persistent segment tree rolling hash"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/PST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PST104": {
    "code": "PST104",
    "title": "Persistent Segment Tree Functional Graph Range Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-5-persistent-segment-tree",
    "patternName": "Pattern 19.5 \u2014 Persistent Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "persistent segment tree version jumps"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/PST104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DYNSEGTREE": {
    "code": "DYNSEGTREE",
    "title": "Dynamic Segment Tree Sparse Coordinate Memory Node",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "dynamic segment tree pointer allocation left right"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DYNSEGTREE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SPARSEST": {
    "code": "SPARSEST",
    "title": "Dynamic Segment Tree 1D Coordinate Range 10^9",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "dynamic segment tree lazy pointer node creation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SPARSEST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DST101": {
    "code": "DST101",
    "title": "Dynamic Segment Tree 2D Range Sum Query",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "2D dynamic segment tree nested nodes"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/DST101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DST102": {
    "code": "DST102",
    "title": "Dynamic Segment Tree Segment Tree Merging on Trees",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "segment tree merge Sack / subtree"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/DST102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DST103": {
    "code": "DST103",
    "title": "Dynamic Segment Tree Subtree Distinct Color Count",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "segment tree merging tree colors"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/DST103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DST104": {
    "code": "DST104",
    "title": "Dynamic Segment Tree Online Intersecting Intervals Count",
    "kingdomId": "kingdom-19-the-kingdom-of-segment-trees",
    "kingdomName": "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "patternId": "pattern-19-6-dynamic-segment-tree",
    "patternName": "Pattern 19.6 \u2014 Dynamic Segment Tree",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "dynamic segment tree range update"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DST104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BIT1": {
    "code": "BIT1",
    "title": "Fenwick Tree Binary Indexed Tree Point Update Prefix Sum",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-1-basic-bit",
    "patternName": "Pattern 20.1 \u2014 Basic BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BIT tree array 1-indexed i += i & -i"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BIT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "FENWICK1": {
    "code": "FENWICK1",
    "title": "Range Sum Query Mutable Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-1-basic-bit",
    "patternName": "Pattern 20.1 \u2014 Basic BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BIT prefix sum difference query(R) - query(L-1)"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/FENWICK1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BBIT101": {
    "code": "BBIT101",
    "title": "Fenwick Tree Point Increase Range Min Query (Prefix Min)",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-1-basic-bit",
    "patternName": "Pattern 20.1 \u2014 Basic BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BIT prefix min update"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BBIT101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BBIT102": {
    "code": "BBIT102",
    "title": "Fenwick Tree 2D Grid Point Update Prefix Sum",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-1-basic-bit",
    "patternName": "Pattern 20.1 \u2014 Basic BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D Fenwick Tree nested loops"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BBIT102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BBIT103": {
    "code": "BBIT103",
    "title": "Fenwick Tree Multi-Dimensional Bitwise Operations",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-1-basic-bit",
    "patternName": "Pattern 20.1 \u2014 Basic BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "n-dimensional BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BBIT103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITPREFIX": {
    "code": "BITPREFIX",
    "title": "Fenwick Tree Range Update Point Query Difference Array BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-2-prefix-sum-bit",
    "patternName": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Difference array BIT add(L",
      "val) add(R+1",
      "-val)"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BITPREFIX",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "RANGEBIT": {
    "code": "RANGEBIT",
    "title": "Fenwick Tree Range Update Range Sum Query Dual BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-2-prefix-sum-bit",
    "patternName": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Dual BIT D1 D2 formula B[i] * i - C[i]"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/RANGEBIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSBIT101": {
    "code": "PSBIT101",
    "title": "Count Inversions in Array Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-2-prefix-sum-bit",
    "patternName": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Coordinate compression BIT count inversion"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PSBIT101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSBIT102": {
    "code": "PSBIT102",
    "title": "Create Sorted Array through Instructions Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-2-prefix-sum-bit",
    "patternName": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "BIT count less count greater min cost"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PSBIT102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PSBIT103": {
    "code": "PSBIT103",
    "title": "Rank Teams by Votes Fenwick Frequency",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-2-prefix-sum-bit",
    "patternName": "Pattern 20.2 \u2014 Prefix Sum BIT",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "BIT rank frequency"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PSBIT103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITCOMPRESS": {
    "code": "BITCOMPRESS",
    "title": "Fenwick Tree Coordinate Compression Range Query",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-4-bit-coordinate-compression",
    "patternName": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "bisect sorted unique values BIT"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BITCOMPRESS",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITCC101": {
    "code": "BITCC101",
    "title": "Count of Smaller Numbers After Self Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-4-bit-coordinate-compression",
    "patternName": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Coordinate compression reverse iteration BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BITCC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITCC102": {
    "code": "BITCC102",
    "title": "Longest Increasing Subsequence LIS Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-4-bit-coordinate-compression",
    "patternName": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Coordinate compression BIT DP LIS max"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/BITCC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITCC103": {
    "code": "BITCC103",
    "title": "Number of Pairs Satisfying Inequality Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-4-bit-coordinate-compression",
    "patternName": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "nums1[i] - nums2[i] diff array BIT bisect"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BITCC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BITCC104": {
    "code": "BITCC104",
    "title": "Count Subarrays With Median in Range Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-4-bit-coordinate-compression",
    "patternName": "Pattern 20.4 \u2014 BIT + Coordinate Compression",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Prefix sum balance coordinate compression BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/BITCC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFLINEBIT": {
    "code": "OFFLINEBIT",
    "title": "Offline Range Distinct Elements Query Fenwick Tree",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-5-offline-queries-with-bit",
    "patternName": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Sort queries by R last position hash map BIT update"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFLINEBIT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFBIT101": {
    "code": "OFFBIT101",
    "title": "Offline Range Mode Frequency Query BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-5-offline-queries-with-bit",
    "patternName": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Mo algorithm / Offline queries sorting BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFBIT101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFBIT102": {
    "code": "OFFBIT102",
    "title": "Offline Range Minimum Difference Pair Query BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-5-offline-queries-with-bit",
    "patternName": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Sort queries by R nearest values BIT update"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFBIT102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFBIT103": {
    "code": "OFFBIT103",
    "title": "Offline Counting Pairs with Sum in Range BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-5-offline-queries-with-bit",
    "patternName": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Offline query sweep line BIT"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFBIT103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "OFFBIT104": {
    "code": "OFFBIT104",
    "title": "Offline Range XOR Product Query BIT",
    "kingdomId": "kingdom-20-the-kingdom-of-fenwick-tree-bit",
    "kingdomName": "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "patternId": "pattern-20-5-offline-queries-with-bit",
    "patternName": "Pattern 20.5 \u2014 Offline Queries with BIT",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Offline query BIT XOR update"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/OFFBIT104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIE1": {
    "code": "TRIE1",
    "title": "Implement Trie Prefix Tree Search Insert StartsWith",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "TrieNode children dict is_end flag"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/TRIE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PREFIXSEARCH": {
    "code": "PREFIXSEARCH",
    "title": "Design Add and Search Words Data Structure Trie DFS",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie DFS wildcard '.' search"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PREFIXSEARCH",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BTRIE101": {
    "code": "BTRIE101",
    "title": "Replace Words Dictionary Prefix Replacement Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie shortest prefix match"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BTRIE101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BTRIE102": {
    "code": "BTRIE102",
    "title": "Map Sum Pairs Prefix Weight Sum Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie prefix sum value tracking"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BTRIE102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BTRIE103": {
    "code": "BTRIE103",
    "title": "Search Suggestions System Autocomplete Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie top 3 sorted words DFS"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BTRIE103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BTRIE104": {
    "code": "BTRIE104",
    "title": "Longest Word in Dictionary Prefix Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-1-basic-trie",
    "patternName": "Pattern 21.1 \u2014 Basic Trie",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie BFS/DFS all prefixes valid"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/BTRIE104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XORTRIE1": {
    "code": "XORTRIE1",
    "title": "Maximum XOR of Two Numbers in an Array Binary Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Binary Trie 31-bit branch traversal"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/XORTRIE1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MAXOR": {
    "code": "MAXOR",
    "title": "Maximum XOR With Element From Array Offline Binary Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Sort array & queries by limit binary trie"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MAXOR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XTRIE101": {
    "code": "XTRIE101",
    "title": "Count Pairs With XOR in Range Binary Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Binary Trie branch count comparison"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/XTRIE101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XTRIE102": {
    "code": "XTRIE102",
    "title": "Maximum Subarray XOR Prefix XOR Binary Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Prefix XOR + Binary Trie max search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/XTRIE102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XTRIE103": {
    "code": "XTRIE103",
    "title": "XOR Query Path on Tree Binary Trie LCA",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Binary Trie on tree path LCA"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/XTRIE103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "XTRIE104": {
    "code": "XTRIE104",
    "title": "Persistent Binary Trie Version Max XOR",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-2-xor-trie",
    "patternName": "Pattern 21.2 \u2014 XOR Trie",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Persistent Binary Trie version pointer"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/XTRIE104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "AUTOCOMPLETE": {
    "code": "AUTOCOMPLETE",
    "title": "Word Search II Grid Search Trie Backtracking",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Trie + 2D Grid DFS backtracking pruning"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/AUTOCOMPLETE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DICTIONARY": {
    "code": "DICTIONARY",
    "title": "Concatenated Words Trie DP Match",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Trie + DP word decomposition"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/DICTIONARY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRIE101": {
    "code": "STRIE101",
    "title": "Index Pairs of a String Multi-Pattern Matching Trie",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Trie pattern matching"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STRIE101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRIE102": {
    "code": "STRIE102",
    "title": "Stream of Characters Suffix Trie Matching",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Reverse Suffix Trie query buffer"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/STRIE102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRIE103": {
    "code": "STRIE103",
    "title": "Palindrome Pairs String Length Trie Search",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Trie + Palindrome suffix check"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/STRIE103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STRIE104": {
    "code": "STRIE104",
    "title": "Multi-Search String Matching Aho-Corasick Automaton",
    "kingdomId": "kingdom-21-the-kingdom-of-trie-string-structures",
    "kingdomName": "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "patternId": "pattern-21-3-string-trie-applications",
    "patternName": "Pattern 21.3 \u2014 String Trie Applications",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Aho-Corasick automaton BFS fail links"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/STRIE104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONVEXHULL": {
    "code": "CONVEXHULL",
    "title": "Convex Hull Graham Scan / Monotone Chain Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Cross product orient 2D stack monotone chain"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CONVEXHULL",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "POINTINPOLY": {
    "code": "POINTINPOLY",
    "title": "Point in Polygon Ray Casting Algorithm Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Ray casting intersection count odd even"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/POINTINPOLY",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO101": {
    "code": "CGEO101",
    "title": "Erect the Fence Convex Hull Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Graham scan collinear boundary inclusion"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CGEO101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO102": {
    "code": "CGEO102",
    "title": "Closest Pair of Points Divide & Conquer Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Divide & conquer strip sorting O(N log N)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/CGEO102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO103": {
    "code": "CGEO103",
    "title": "Minimum Area Rectangle Geometry Coordinate Hashing",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Diagonal pair Hash set lookup"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CGEO103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO104": {
    "code": "CGEO104",
    "title": "Max Points on a Line Slope Fraction Hashing",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "GCD slope fraction hash map count"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CGEO104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO105": {
    "code": "CGEO105",
    "title": "Line Reflection Y-Axis Symmetry Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-1-computational-geometry",
    "patternName": "Pattern 22.1 \u2014 Computational Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Min max X sum hash set point validation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CGEO105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "DISTANCE2D": {
    "code": "DISTANCE2D",
    "title": "Euclidean Distance 2D Min Distance Coordinate",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Math sqrt dx*dx + dy*dy"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/DISTANCE2D",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "LINEINTERSECT": {
    "code": "LINEINTERSECT",
    "title": "Check Line Segment Intersection Geometry Cross Product",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Cross product orientation CCW bounding box"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/LINEINTERSECT",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO201": {
    "code": "CGEO201",
    "title": "Valid Square Quadrilateral Distance Check",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "4 sides equal 2 diagonals equal distance"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CGEO201",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO202": {
    "code": "CGEO202",
    "title": "Circle and Rectangle Overlapping Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Clamp circle center to rectangle bounds"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CGEO202",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO203": {
    "code": "CGEO203",
    "title": "Projection Area of 3D Shapes Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Top xy front xz side yz max projections"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CGEO203",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO204": {
    "code": "CGEO204",
    "title": "Surface Area of 3D Shapes Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Grid column height adjacent difference"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/CGEO204",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CGEO205": {
    "code": "CGEO205",
    "title": "Minimum Time Visiting All Points 2D Chebyshev Distance",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-2-coordinate-geometry",
    "patternName": "Pattern 22.2 \u2014 Coordinate Geometry",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Max abs dx dy step count"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/CGEO205",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "POLYAREA": {
    "code": "POLYAREA",
    "title": "Shoelace Formula Polygon Area Computation",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Shoelace cross product summation / 2"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/POLYAREA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TRIANGLEAREA": {
    "code": "TRIANGLEAREA",
    "title": "Largest Triangle Area 3 Points Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Shoelace formula 3 points max search"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/TRIANGLEAREA",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "AV101": {
    "code": "AV101",
    "title": "Rectangle Area Overlap Sum Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Area1 + Area2 - Overlap(dx * dy)"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/AV101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "AV102": {
    "code": "AV102",
    "title": "Rectangle Overlap Check Bounding Box",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "x_overlap > 0 and y_overlap > 0"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/AV102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "AV103": {
    "code": "AV103",
    "title": "Maximum Area of a Piece of Cake Grid Cut",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Max horizontal diff * max vertical diff mod 10^9+7"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/AV103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "AV104": {
    "code": "AV104",
    "title": "Volume of 3D Cylinder / Sphere Math Geometry",
    "kingdomId": "kingdom-22-the-kingdom-of-geometry-computational-geometry",
    "kingdomName": "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "patternId": "pattern-22-3-area-volume",
    "patternName": "Pattern 22.3 \u2014 Area & Volume",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "Pi r^2 h formula"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/AV104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NIM1": {
    "code": "NIM1",
    "title": "Nim Game Stone Removal XOR Sum",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "XOR sum Nim-Sum == 0 losing > 0 winning"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/NIM1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "STONEGAME": {
    "code": "STONEGAME",
    "title": "Stone Game I Range DP Game Theory",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Minimax DP score diff / parity greedy"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/STONEGAME",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NIM101": {
    "code": "NIM101",
    "title": "Stone Game II Dynamic Choice DP Game Theory",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Minimax DP memoization (i",
      "M)"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/NIM101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NIM102": {
    "code": "NIM102",
    "title": "Stone Game III Multi-Choice Line DP",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Minimax DP 1 2 3 stone choices"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/NIM102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NIM103": {
    "code": "NIM103",
    "title": "Stone Game IV Square Removal DP Game Theory",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DP win loss state boolean sqrt k loop"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/NIM103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "NIM104": {
    "code": "NIM104",
    "title": "Stone Game V Split Array Sum DP",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-1-nim-games",
    "patternName": "Pattern 23.1 \u2014 Nim Games",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interval DP max row score sum"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/NIM104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GRUNDY1": {
    "code": "GRUNDY1",
    "title": "Sprague-Grundy Theorem Mex Computation Game Theory",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "SG Function mex set XOR sum overall games"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GRUNDY1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GAMESTATE": {
    "code": "GAMESTATE",
    "title": "Game Theory State Graph Mex Analysis",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Game state DAG transition mex calculation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GAMESTATE",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SG101": {
    "code": "SG101",
    "title": "Stone Game VII Alice Bob Sum Diff DP",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Interval DP score difference"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/SG101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SG102": {
    "code": "SG102",
    "title": "Stone Game VIII Prefix Sum Game DP",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Suffix max prefix sum DP"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SG102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SG103": {
    "code": "SG103",
    "title": "Divisor Game Parity State Game Theory",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "N % 2 == 0 winning state"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/SG103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SG104": {
    "code": "SG104",
    "title": "Cat and Mouse Graph Game Theory BFS",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-2-sprague-grundy",
    "patternName": "Pattern 23.2 \u2014 Sprague\u2013Grundy",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Minimax BFS state degree count (cat",
      "mouse",
      "turn)"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/SG104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUBGAME": {
    "code": "SUBGAME",
    "title": "Nim Subtraction Game Multi-Pile XOR",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-3-subtraction-games",
    "patternName": "Pattern 23.3 \u2014 Subtraction Games",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "XOR sum parity reduction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUBGAME",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "TAKESTONES": {
    "code": "TAKESTONES",
    "title": "Can I Win Minimax Bitmask Game DP",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-3-subtraction-games",
    "patternName": "Pattern 23.3 \u2014 Subtraction Games",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Minimax Bitmask DP memoization"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/TAKESTONES",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SUB101": {
    "code": "SUB101",
    "title": "Predict the Winner Subtraction Array Game",
    "kingdomId": "kingdom-23-the-kingdom-of-game-theory-nim",
    "kingdomName": "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "patternId": "pattern-23-3-subtraction-games",
    "patternName": "Pattern 23.3 \u2014 Subtraction Games",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Minimax interval DP score diff"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SUB101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "CONSTRUCT1": {
    "code": "CONSTRUCT1",
    "title": "Construct K Palindromic Strings",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Odd frequency count <= K <= len"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/CONSTRUCT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "BUILDARR": {
    "code": "BUILDARR",
    "title": "Construct Array With Given Limit Difference",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Greedy step assignment"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/BUILDARR",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC101": {
    "code": "GC101",
    "title": "Construct String With Repeat Limit Greedy Heap",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Max heap greedy string construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC102": {
    "code": "GC102",
    "title": "Reconstruct 2-Row Binary Matrix Column Sums",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Greedy upper lower sum allocation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC103": {
    "code": "GC103",
    "title": "Minimum Moves to Make Array Complementary",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Difference array sweep line target sum"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC104": {
    "code": "GC104",
    "title": "Construct Target Array With Multiple Sums",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Max heap reverse simulation modulo"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC105": {
    "code": "GC105",
    "title": "Maximum Element After Decreasing and Rearranging",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Sort & greedy step increment"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/GC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC106": {
    "code": "GC106",
    "title": "Construct Smallest Number From DI String Monotonic Stack",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Monotonic stack / pattern reverse"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GC106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC107": {
    "code": "GC107",
    "title": "Minimum Deletions to Make Character Frequencies Unique",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Greedy hash set frequency decrement"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/GC107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GC108": {
    "code": "GC108",
    "title": "Construct Lexicographically Smallest Array Swaps",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-2-greedy-construction",
    "patternName": "Pattern 24.2 \u2014 Greedy Construction",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Sort indices component grouping"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/GC108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATHCONST": {
    "code": "MATHCONST",
    "title": "Construct Product Array Except Self Math",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Prefix product * Suffix product O(1) space"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MATHCONST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MATRIXBUILD": {
    "code": "MATRIXBUILD",
    "title": "Spiral Matrix Construction 2D Bounds",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "4-pointer top bottom left right boundary walk"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MATRIXBUILD",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC101": {
    "code": "MC101",
    "title": "Find Valid Matrix Given Row and Column Sums",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Greedy min(rowSum[i]",
      "colSum[j]) matrix build"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC102": {
    "code": "MC102",
    "title": "Construct Diagonal Traverse Matrix",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Index sum row+col parity direction flip"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC103": {
    "code": "MC103",
    "title": "Convert an Array Into a 2D Array With Conditions",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Easy-Medium",
    "rating": 2200,
    "topics": [
      "Frequency row assignment hash map"
    ],
    "estimatedTime": 40,
    "xp": 35,
    "url": "https://www.codechef.com/problems/MC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC104": {
    "code": "MC104",
    "title": "Construct Original Array From Doubled Array",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Sort & frequency map doubled match"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC105": {
    "code": "MC105",
    "title": "Minimum Number of Operations to Reinitialize a Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Even odd index formula simulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC106": {
    "code": "MC106",
    "title": "Construct Matrix With Row Column Sum Constraints",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Greedy row col allocation"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/MC106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC107": {
    "code": "MC107",
    "title": "Construct Binary Grid With Maximum Black Cells",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Mathematical checkerboard construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MC108": {
    "code": "MC108",
    "title": "Construct Divisible Array Sequence",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-3-constructive-mathematics",
    "patternName": "Pattern 24.3 \u2014 Constructive Mathematics",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Modular arithmetic construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MC108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PERMCONST": {
    "code": "PERMCONST",
    "title": "Build Array from Permutation Mapping",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "nums[nums[i]] direct mapping"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/PERMCONST",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "SWAPPERM": {
    "code": "SWAPPERM",
    "title": "Find Permutation Given DI Pattern",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Stack pattern reversal 1 to N+1"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/SWAPPERM",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC101": {
    "code": "PC101",
    "title": "Construct Beautiful Permutation Absolute Diff K",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Alternating high low pick construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC102": {
    "code": "PC102",
    "title": "Construct Circular Permutation in Binary Code (Gray Code)",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Gray code formula i ^ (i >> 1) XOR start"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC103": {
    "code": "PC103",
    "title": "Construct Array With Same Difference Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Zigzag construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC104": {
    "code": "PC104",
    "title": "Construct Minimum Swaps to Sort Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Cycle decomposition N - num_cycles"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC105": {
    "code": "PC105",
    "title": "Construct Permutation With Target Inversion Count",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "DP / Greedy inversion fill"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/PC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC106": {
    "code": "PC106",
    "title": "Construct Lexicographically Next Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Next permutation 3-step algorithm"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC107": {
    "code": "PC107",
    "title": "Construct Lexicographically Kth Smallest Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Factoric radix permutation search"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/PC107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "PC108": {
    "code": "PC108",
    "title": "Construct Adjacent Difference Monotonic Permutation",
    "kingdomId": "kingdom-24-the-kingdom-of-constructive-algorithms",
    "kingdomName": "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "patternId": "pattern-24-4-permutation-construction",
    "patternName": "Pattern 24.4 \u2014 Permutation Construction",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Interleaved sorting construction"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/PC108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEOMADV1": {
    "code": "GEOMADV1",
    "title": "Convex Hull Graham Scan Extreme Points",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Graham scan orientation test"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GEOMADV1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEOMADV2": {
    "code": "GEOMADV2",
    "title": "Polygon Triangulation Minimum Weight DP",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interval DP matrix polygon triangulation"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GEOMADV2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC101": {
    "code": "MISC101",
    "title": "Maximal Square in 2D Binary Matrix DP",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "2D DP min(left",
      "top",
      "diag) + 1"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/MISC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC102": {
    "code": "MISC102",
    "title": "Trapping Rain Water 2D 3D Min-Heap Grid",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Min-heap boundary 3D water trap BFS"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC103": {
    "code": "MISC103",
    "title": "Sudoku Solver Backtracking Pruning",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "9x9 Bitmask backtracking Sudoku solver"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC104": {
    "code": "MISC104",
    "title": "N-Queens II Total Solutions Backtracking",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-1-computational-geometry",
    "patternName": "Pattern 25.1 \u2014 Computational Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Bitmask diagonal col constraint count"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEOMADV3": {
    "code": "GEOMADV3",
    "title": "Line Sweep Algorithm Interval Intersection Count",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Sweep line event sorting BIT / Segment Tree"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GEOMADV3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "GEOMADV4": {
    "code": "GEOMADV4",
    "title": "Circle Intersection Points Geometry",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Trigonometric circle intersection formulas"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/GEOMADV4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC105": {
    "code": "MISC105",
    "title": "Word Ladder II Shortest Paths BFS + DFS Backtracking",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "BFS level map + DFS path reconstruction"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC105",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC106": {
    "code": "MISC106",
    "title": "Sliding Puzzle 2x3 Grid BFS Minimum Swaps",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "State BFS string hash matrix 2x3"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC106",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC107": {
    "code": "MISC107",
    "title": "Minimum Window Subsequence String Hard DP",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "2D Suffix DP window match"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC107",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "MISC108": {
    "code": "MISC108",
    "title": "Text Justification String Formatting",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-2-coordinate-geometry",
    "patternName": "Pattern 25.2 \u2014 Coordinate Geometry",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Greedy word line packing space distribution"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/MISC108",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTERACT1": {
    "code": "INTERACT1",
    "title": "Guess Number Higher or Lower Interactive Binary Search",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Interactive binary search query response"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/INTERACT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTERACT2": {
    "code": "INTERACT2",
    "title": "Find Secret Word Interactive Mastermind Strategy",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interactive min-max candidate elimination"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INTERACT2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTER101": {
    "code": "INTER101",
    "title": "First Bad Version Interactive Binary Search",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Easy",
    "rating": 1000,
    "topics": [
      "Interactive bisect_left API call"
    ],
    "estimatedTime": 25,
    "xp": 20,
    "url": "https://www.codechef.com/problems/INTER101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTER102": {
    "code": "INTER102",
    "title": "Find Mountain Array Peak Interactive Binary Search",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Medium-Hard",
    "rating": 2200,
    "topics": [
      "Interactive ternary / binary search limit 100 calls"
    ],
    "estimatedTime": 90,
    "xp": 80,
    "url": "https://www.codechef.com/problems/INTER102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTER103": {
    "code": "INTER103",
    "title": "Find Element in Unknown Size Array Interactive",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Interactive exponential search 2^k bound"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/INTER103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "INTER104": {
    "code": "INTER104",
    "title": "Interactive Tree Path Query Root Search",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-3-interactive-problems",
    "patternName": "Pattern 25.3 \u2014 Interactive Problems",
    "difficulty": "Hard",
    "rating": 1800,
    "topics": [
      "Interactive centroid query tree search"
    ],
    "estimatedTime": 120,
    "xp": 120,
    "url": "https://www.codechef.com/problems/INTER104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC1": {
    "code": "ADHOC1",
    "title": "Pascal's Triangle Row N Math Formula",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Beginner",
    "rating": 500,
    "topics": [
      "Combinatorics nCr iteration"
    ],
    "estimatedTime": 15,
    "xp": 10,
    "url": "https://www.codechef.com/problems/ADHOC1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC2": {
    "code": "ADHOC2",
    "title": "Zigzag Conversion String Formatting",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Row direction flip simulation"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ADHOC2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC101": {
    "code": "ADHOC101",
    "title": "Spiral Matrix I Traversal Bounds Walk",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "4 boundary pointers traversal"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ADHOC101",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC102": {
    "code": "ADHOC102",
    "title": "Rotate Image 90 Degrees In-Place Matrix",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Transpose + Reverse rows matrix"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ADHOC102",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC103": {
    "code": "ADHOC103",
    "title": "Set Matrix Zeroes In-Place Marker Row Col",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "Row 0 Col 0 status flags"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ADHOC103",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "ADHOC104": {
    "code": "ADHOC104",
    "title": "Game of Life 2D Grid In-Place Bit State",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-4-ad-hoc-observation",
    "patternName": "Pattern 25.4 \u2014 Ad-hoc / Observation",
    "difficulty": "Medium",
    "rating": 1400,
    "topics": [
      "In-place bit manipulation 2-bit state"
    ],
    "estimatedTime": 60,
    "xp": 55,
    "url": "https://www.codechef.com/problems/ADHOC104",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT1": {
    "code": "EXPERT1",
    "title": "Heavy-Light Decomposition HLD Path Query Segment Tree",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "HLD tree decomposition segment tree"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT1",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT2": {
    "code": "EXPERT2",
    "title": "Centroid Decomposition Tree Path Distance Counting",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Tree centroid tree recursive divide conquer"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT2",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT3": {
    "code": "EXPERT3",
    "title": "Dinic's Algorithm Maximum Flow BFS DFS Level Graph",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Dinic Max Flow blocking flow BFS DFS"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT3",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT4": {
    "code": "EXPERT4",
    "title": "Suffix Automaton SAM Distinct Substrings Count",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Suffix Automaton SAM states transitions"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT4",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT5": {
    "code": "EXPERT5",
    "title": "Link-Cut Tree LCT Dynamic Forest Path Query",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Splay tree Link-Cut Tree preferred paths"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT5",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  },
  "EXPERT6": {
    "code": "EXPERT6",
    "title": "Fast Fourier Transform FFT Polynomial Multiplication",
    "kingdomId": "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous",
    "kingdomName": "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "patternId": "pattern-25-5-mixed-expert-problems",
    "patternName": "Pattern 25.5 \u2014 Mixed Expert Problems",
    "difficulty": "Expert",
    "rating": 2200,
    "topics": [
      "Cooley-Tukey FFT complex roots unity"
    ],
    "estimatedTime": 180,
    "xp": 180,
    "url": "https://www.codechef.com/problems/EXPERT6",
    "notes": "",
    "platform": "codechef",
    "status": "Unsolved"
  }
};

export const kingdomPatternMappings: Record<string, string[]> = {
  "kingdom-1-the-kingdom-of-arrays": [
    "pattern-1-1-basic-array-traversal",
    "pattern-1-2-frequency-counting",
    "pattern-1-3-simulation-on-arrays",
    "pattern-1-4-sorting-based-arrays",
    "pattern-1-5-coordinate-compression",
    "pattern-1-6-constructive-arrays"
  ],
  "kingdom-2-the-kingdom-of-prefix-sum-difference-array": [
    "pattern-2-1-1d-prefix-sum",
    "pattern-2-2-prefix-frequency",
    "pattern-2-3-difference-array",
    "pattern-2-4-prefix-xor"
  ],
  "kingdom-3-the-kingdom-of-two-pointers-sliding-window": [
    "pattern-3-1-classic-two-pointers",
    "pattern-3-2-opposite-direction-pointers",
    "pattern-3-3-sliding-window",
    "pattern-3-4-meet-in-the-middle-style"
  ],
  "kingdom-4-the-kingdom-of-binary-search": [
    "pattern-4-1-classic-binary-search",
    "pattern-4-2-binary-search-on-answer",
    "pattern-4-3-parametric-search",
    "pattern-4-4-continuous-binary-search"
  ],
  "kingdom-5-the-kingdom-of-sorting-greedy": [
    "pattern-5-1-basic-greedy",
    "pattern-5-2-greedy-with-sorting",
    "pattern-5-3-interval-greedy",
    "pattern-5-4-greedy-priority-queue",
    "pattern-5-5-constructive-greedy"
  ],
  "kingdom-6-the-kingdom-of-strings": [
    "pattern-6-1-basic-string-processing",
    "pattern-6-2-character-frequency",
    "pattern-6-3-greedy-on-strings",
    "pattern-6-4-prefix-function-kmp",
    "pattern-6-5-z-algorithm",
    "pattern-6-6-hashing"
  ],
  "kingdom-7-the-kingdom-of-bit-manipulation": [
    "pattern-7-1-basic-bit-operations",
    "pattern-7-2-xor-properties",
    "pattern-7-3-bitmask-enumeration",
    "pattern-7-4-trie-xor"
  ],
  "kingdom-8-the-kingdom-of-mathematics-number-theory": [
    "pattern-8-1-basic-mathematics",
    "pattern-8-2-gcd-lcm",
    "pattern-8-3-prime-numbers-sieve",
    "pattern-8-4-modular-arithmetic",
    "pattern-8-5-combinatorics",
    "pattern-8-6-inclusion-exclusion-number-theory"
  ],
  "kingdom-9-the-kingdom-of-recursion-backtracking": [
    "pattern-9-1-basic-recursion",
    "pattern-9-2-brute-force-with-backtracking",
    "pattern-9-3-generate-all-possibilities",
    "pattern-9-4-recursive-divide-construction"
  ],
  "kingdom-10-the-kingdom-of-stack-monotonic-stack": [
    "pattern-10-1-basic-stack",
    "pattern-10-2-parentheses",
    "pattern-10-3-monotonic-stack",
    "pattern-10-5-stack-greedy"
  ],
  "kingdom-11-the-kingdom-of-queue-deque": [
    "pattern-11-1-queue-simulation",
    "pattern-11-2-deque",
    "pattern-11-3-monotonic-queue",
    "pattern-11-4-queue-bfs-style"
  ],
  "kingdom-12-the-kingdom-of-linked-list-simulation": [
    "pattern-12-1-simple-simulation",
    "pattern-12-2-circular-simulation",
    "pattern-12-3-simulation-with-data-structures",
    "pattern-12-4-ordered-set-simulation"
  ],
  "kingdom-13-the-kingdom-of-trees": [
    "pattern-13-1-basic-tree-dfs",
    "pattern-13-2-tree-traversal",
    "pattern-13-3-tree-dp",
    "pattern-13-4-binary-lifting-lca",
    "pattern-13-5-rerooting-dp",
    "pattern-13-6-euler-tour"
  ],
  "kingdom-14-the-kingdom-of-graph-traversal-dfs-bfs": [
    "pattern-14-1-connected-components",
    "pattern-14-2-dfs",
    "pattern-14-4-topological-sort",
    "pattern-14-5-cycle-detection",
    "pattern-14-6-bipartite-graph"
  ],
  "kingdom-15-the-kingdom-of-shortest-paths": [
    "pattern-15-1-standard-dijkstra",
    "pattern-15-3-0-1-bfs",
    "pattern-15-4-bellman-ford-negative-edges",
    "pattern-15-5-floyd-warshall"
  ],
  "kingdom-16-the-kingdom-of-dsu-minimum-spanning-tree": [
    "pattern-16-1-basic-dsu",
    "pattern-16-2-union-find-applications",
    "pattern-16-3-kruskal-s-mst",
    "pattern-16-5-offline-dsu"
  ],
  "kingdom-17-the-kingdom-of-dynamic-programming": [
    "pattern-17-1-introduction-to-dp-1d-dp",
    "pattern-17-2-knapsack-dp",
    "pattern-17-3-grid-dp",
    "pattern-17-4-interval-dp",
    "pattern-17-5-digit-dp",
    "pattern-17-6-bitmask-dp",
    "pattern-17-8-dp-on-dag",
    "pattern-17-9-probability-dp",
    "pattern-17-10-prefix-suffix-dp",
    "pattern-17-12-optimization-dp"
  ],
  "kingdom-18-the-kingdom-of-divide-conquer": [
    "pattern-18-2-merge-sort-applications",
    "pattern-18-3-divide-conquer-on-arrays",
    "pattern-18-4-cdq-divide-conquer"
  ],
  "kingdom-19-the-kingdom-of-segment-trees": [
    "pattern-19-1-basic-segment-tree",
    "pattern-19-2-range-query-point-update",
    "pattern-19-3-lazy-propagation",
    "pattern-19-4-merge-sort-tree",
    "pattern-19-5-persistent-segment-tree",
    "pattern-19-6-dynamic-segment-tree"
  ],
  "kingdom-20-the-kingdom-of-fenwick-tree-bit": [
    "pattern-20-1-basic-bit",
    "pattern-20-2-prefix-sum-bit",
    "pattern-20-4-bit-coordinate-compression",
    "pattern-20-5-offline-queries-with-bit"
  ],
  "kingdom-21-the-kingdom-of-trie-string-structures": [
    "pattern-21-1-basic-trie",
    "pattern-21-2-xor-trie",
    "pattern-21-3-string-trie-applications"
  ],
  "kingdom-22-the-kingdom-of-geometry-computational-geometry": [
    "pattern-22-1-computational-geometry",
    "pattern-22-2-coordinate-geometry",
    "pattern-22-3-area-volume"
  ],
  "kingdom-23-the-kingdom-of-game-theory-nim": [
    "pattern-23-1-nim-games",
    "pattern-23-2-sprague-grundy",
    "pattern-23-3-subtraction-games"
  ],
  "kingdom-24-the-kingdom-of-constructive-algorithms": [
    "pattern-24-2-greedy-construction",
    "pattern-24-3-constructive-mathematics",
    "pattern-24-4-permutation-construction"
  ],
  "kingdom-25-the-kingdom-of-geometry-interactive-miscellaneous": [
    "pattern-25-1-computational-geometry",
    "pattern-25-2-coordinate-geometry",
    "pattern-25-3-interactive-problems",
    "pattern-25-4-ad-hoc-observation",
    "pattern-25-5-mixed-expert-problems"
  ]
};

export const patternProblemMappings: Record<string, string[]> = {
  "pattern-1-1-basic-array-traversal": [
    "FLOW001",
    "FLOW002",
    "FLOW004",
    "FLOW006",
    "FLOW007",
    "START01",
    "HS08TEST",
    "LUCKFOUR"
  ],
  "pattern-1-2-frequency-counting": [
    "VCS",
    "RAINBOWA",
    "TLG",
    "NOTINCOM",
    "COPS",
    "CHN15A",
    "TEMPLE"
  ],
  "pattern-1-3-simulation-on-arrays": [
    "ATM2",
    "ZCO14001",
    "FRK",
    "STFOOD",
    "SNAKPROC",
    "CNOTE"
  ],
  "pattern-1-4-sorting-based-arrays": [
    "ZCO14003",
    "HORSES",
    "CLEANUP",
    "CIELAB",
    "MAXDIFF",
    "CHEFA",
    "TACHSTN"
  ],
  "pattern-1-5-coordinate-compression": [
    "ZCO15004",
    "CHEFPRMS",
    "MOVIEWKN",
    "ARRAYTRM"
  ],
  "pattern-1-6-constructive-arrays": [
    "ALTARAY",
    "SUBINC",
    "CHEFSUM",
    "CHEFRUN",
    "PERMUT2",
    "COCONUT",
    "SUPW",
    "IPLTRC"
  ],
  "pattern-2-1-1d-prefix-sum": [
    "GCDQ",
    "CSUB",
    "ANUWTP",
    "CHEFDET",
    "COEX",
    "PRESUM1",
    "PRESUM2",
    "PRESUM3"
  ],
  "pattern-2-2-prefix-frequency": [
    "SEGM01",
    "FRGTNL",
    "BLKWHT",
    "BRLADD",
    "PREFREQ1",
    "PREFREQ2",
    "PREFREQ3"
  ],
  "pattern-2-3-difference-array": [
    "MANYSUMS",
    "STKSTR",
    "SHUFFLE",
    "VACCINE1",
    "DIFFARR1",
    "DIFFARR2",
    "DIFFARR3"
  ],
  "pattern-2-4-prefix-xor": [
    "CHEFXOR",
    "XORPAL",
    "XORMAX",
    "XORPROD",
    "PREXOR1",
    "PREXOR2",
    "PREXOR3",
    "PREXOR4"
  ],
  "pattern-3-1-classic-two-pointers": [
    "CHEFST",
    "ZCO13001",
    "ZCO13003",
    "PAIRING",
    "RECTSQ",
    "TWOPTR1",
    "TWOPTR2",
    "TWOPTR3",
    "TWOPTR4",
    "TWOPTR5",
    "TWOPTR6",
    "TWOPTR7",
    "TWOPTR8",
    "TWOPTR9",
    "TWOPTR10"
  ],
  "pattern-3-2-opposite-direction-pointers": [
    "ZCO12002",
    "WORMHOLE",
    "SALARY",
    "CARVANS",
    "OPPPTR1",
    "OPPPTR2",
    "OPPPTR3",
    "OPPPTR4"
  ],
  "pattern-3-3-sliding-window": [
    "RECNDNOS",
    "SPLST",
    "SWAP10HG",
    "SLIDE1",
    "SLIDE2",
    "SLIDE3",
    "SLIDE4",
    "SLIDE5",
    "SLIDE6",
    "SLIDE7",
    "SLIDE8",
    "SLIDE9",
    "SLIDE10",
    "SLIDE11",
    "SLIDE12",
    "SLIDE13",
    "SLIDE14",
    "SLIDE15"
  ],
  "pattern-3-4-meet-in-the-middle-style": [
    "MITM1",
    "MITM2",
    "MITM3",
    "MITM4",
    "MITM5",
    "MITM6",
    "MITM7",
    "MITM8",
    "MITM9",
    "MITM10",
    "MITM11",
    "MITM12",
    "MITM13",
    "MITM14",
    "MITM15",
    "MITM16",
    "MITM17"
  ],
  "pattern-4-1-classic-binary-search": [
    "LOWSUM",
    "SMRSTR",
    "STACKS",
    "STRPAIRS",
    "BS101",
    "BS102",
    "BS103",
    "BS104",
    "BS105",
    "BS106"
  ],
  "pattern-4-2-binary-search-on-answer": [
    "SHEOKAND",
    "BSFIT",
    "TRIP",
    "CHEFSET",
    "BSANS1",
    "BSANS2",
    "BSANS3",
    "BSANS4",
    "BSANS5",
    "BSANS6",
    "BSANS7",
    "BSANS8",
    "BSANS9",
    "BSANS10"
  ],
  "pattern-4-3-parametric-search": [
    "PIPES",
    "PARAM1",
    "PARAM2",
    "PARAM3",
    "PARAM4",
    "PARAM5",
    "PARAM6",
    "PARAM7"
  ],
  "pattern-4-4-continuous-binary-search": [
    "EXPENSE",
    "OPTIM",
    "DISTANCE",
    "CONTBS1",
    "CONTBS2",
    "CONTBS3",
    "CONTBS4",
    "CONTBS5",
    "CONTBS6"
  ],
  "pattern-5-1-basic-greedy": [
    "GREE1",
    "GREE2",
    "GREE3",
    "GREE4",
    "GREE5",
    "GREE6",
    "GREE7",
    "GREE8"
  ],
  "pattern-5-2-greedy-with-sorting": [
    "INOI1201",
    "GREESORT1",
    "GREESORT2",
    "GREESORT3",
    "GREESORT4",
    "GREESORT5",
    "GREESORT6",
    "GREESORT7"
  ],
  "pattern-5-3-interval-greedy": [
    "MAXSUM",
    "INTERVAL",
    "BUSS",
    "MEET",
    "INTGREE1",
    "INTGREE2",
    "INTGREE3",
    "INTGREE4"
  ],
  "pattern-5-4-greedy-priority-queue": [
    "SAVKONO",
    "POTIONS",
    "CHEFBOOK",
    "GREEPQ1",
    "GREEPQ2",
    "GREEPQ3",
    "GREEPQ4",
    "GREEPQ5"
  ],
  "pattern-5-5-constructive-greedy": [
    "CHEFSTUD",
    "CONSTGREE1",
    "CONSTGREE2",
    "CONSTGREE3",
    "CONSTGREE4",
    "CONSTGREE5",
    "CONSTGREE6",
    "CONSTGREE7"
  ],
  "pattern-6-1-basic-string-processing": [
    "LAPIN",
    "STRPAL",
    "ALPHABET",
    "TWOSTR",
    "CHEFROUT",
    "STR101",
    "STR102",
    "STR103"
  ],
  "pattern-6-2-character-frequency": [
    "MAGICHF",
    "ERROR",
    "CHARFREQ1",
    "CHARFREQ2",
    "CHARFREQ3",
    "CHARFREQ4"
  ],
  "pattern-6-3-greedy-on-strings": [
    "STRGREE1",
    "STRGREE2",
    "STRGREE3",
    "STRGREE4",
    "STRGREE5",
    "STRGREE6"
  ],
  "pattern-6-4-prefix-function-kmp": [
    "STRMATCH",
    "KMPCC",
    "PATTERN1",
    "KMP101",
    "KMP102",
    "KMP103"
  ],
  "pattern-6-5-z-algorithm": [
    "ZALG01",
    "STRZCC",
    "ZALG101",
    "ZALG102",
    "ZALG103"
  ],
  "pattern-6-6-hashing": [
    "STRHASH",
    "CHEFHASH",
    "SUBSTRHASH",
    "HASH101",
    "HASH102",
    "HASH103"
  ],
  "pattern-7-1-basic-bit-operations": [
    "FLOW016",
    "FLOW017",
    "FLOW018",
    "FCTRL2",
    "FCTRL",
    "MARBLES",
    "BIT101",
    "BIT102",
    "BIT103",
    "BIT104"
  ],
  "pattern-7-2-xor-properties": [
    "XORAGAIN",
    "XOR101",
    "XOR102",
    "XOR103",
    "XOR104",
    "XOR105",
    "XOR106",
    "XOR107",
    "XOR108"
  ],
  "pattern-7-3-bitmask-enumeration": [
    "BITMASK1",
    "SUBSETBIT",
    "CHEFBIT",
    "MASK101",
    "MASK102",
    "MASK103",
    "MASK104",
    "MASK105"
  ],
  "pattern-7-4-trie-xor": [
    "XORPAIR",
    "TRIEXOR",
    "TRIEXOR101",
    "TRIEXOR102",
    "TRIEXOR103",
    "TRIEXOR104",
    "TRIEXOR105",
    "TRIEXOR106"
  ],
  "pattern-8-1-basic-mathematics": [
    "FLOW009",
    "FLOW010",
    "FLOW011",
    "FLOW013",
    "FLOW014",
    "FSQRT",
    "MATH101",
    "MATH102"
  ],
  "pattern-8-2-gcd-lcm": [
    "GCD2",
    "CHEFGCD",
    "LCMGCD",
    "GCD101",
    "GCD102",
    "GCD103",
    "GCD104"
  ],
  "pattern-8-3-prime-numbers-sieve": [
    "PRB01",
    "SEIVE1",
    "PRIMES2",
    "PRIME1",
    "PRIME101",
    "PRIME102"
  ],
  "pattern-8-4-modular-arithmetic": [
    "MODEX",
    "POWMOD",
    "MODINV1",
    "MODINV2",
    "CRT1",
    "MOD101"
  ],
  "pattern-8-5-combinatorics": [
    "COMB1",
    "CHEFCOMB",
    "PASCTRI",
    "COMB101",
    "COMB102",
    "COMB103",
    "COMB104"
  ],
  "pattern-8-6-inclusion-exclusion-number-theory": [
    "NUMTH1",
    "INCEXC",
    "EULER1",
    "MOBIUS1",
    "INCEXC101",
    "INCEXC102",
    "INCEXC103",
    "INCEXC104"
  ],
  "pattern-9-1-basic-recursion": [
    "TRISQ",
    "FIBO1",
    "REC101",
    "REC102",
    "REC103",
    "REC104"
  ],
  "pattern-9-2-brute-force-with-backtracking": [
    "NQUEENS",
    "SUDOKU",
    "PERMUT1",
    "BACK101",
    "BACK102",
    "BACK103"
  ],
  "pattern-9-3-generate-all-possibilities": [
    "SUBSETS",
    "ALLPERM",
    "BACKTRK1",
    "GEN101",
    "GEN102",
    "GEN103"
  ],
  "pattern-9-4-recursive-divide-construction": [
    "DIVREC1",
    "HANOI1",
    "DIVREC101",
    "DIVREC102",
    "DIVREC103",
    "DIVREC104",
    "DIVREC105"
  ],
  "pattern-10-1-basic-stack": [
    "COMPILER",
    "STACK1",
    "PAREN1",
    "BSTACK101",
    "BSTACK102",
    "BSTACK103",
    "BSTACK104",
    "BSTACK105"
  ],
  "pattern-10-2-parentheses": [
    "ZCO12001",
    "MATCHING",
    "BRACKETS",
    "PAR101",
    "PAR102",
    "PAR103",
    "PAR104"
  ],
  "pattern-10-3-monotonic-stack": [
    "ZCO14002",
    "INOI1301",
    "MAXRECT",
    "HISTOG",
    "MONOSTACK1",
    "MONOSTACK2",
    "MONOSTACK3",
    "MONOSTACK4",
    "MONOSTACK5",
    "MONOSTACK6",
    "MONOSTACK7",
    "MONOSTACK8"
  ],
  "pattern-10-5-stack-greedy": [
    "STKGREEDY",
    "EVALEXPR",
    "STKGREE1",
    "STKGREE2",
    "STKGREE3",
    "STKGREE4",
    "STKGREE5"
  ],
  "pattern-11-1-queue-simulation": [
    "QUEUE1",
    "SLIDING1",
    "BREADTH1",
    "QSIM101",
    "QSIM102"
  ],
  "pattern-11-2-deque": [
    "DEQUE1",
    "SLIDINGMAX",
    "MAXDEQUE",
    "DEQ101",
    "DEQ102"
  ],
  "pattern-11-3-monotonic-queue": [
    "SLIDINGWINDOW",
    "MONOQUEUE",
    "MONOQ101",
    "MONOQ102"
  ],
  "pattern-11-4-queue-bfs-style": [
    "BFSQUEUE",
    "SHORTQ",
    "QBFS101",
    "QBFS102",
    "QBFS103",
    "QBFS104"
  ],
  "pattern-12-1-simple-simulation": [
    "SIM101",
    "SIM102",
    "SIM103",
    "SIM104",
    "SIM105"
  ],
  "pattern-12-2-circular-simulation": [
    "JOSEPHUS",
    "CIRCSIM",
    "CIRCLIST101",
    "CIRCLIST102",
    "CIRCLIST103"
  ],
  "pattern-12-3-simulation-with-data-structures": [
    "SIMDATA",
    "GRIDWALK",
    "SIMDS101",
    "SIMDS102",
    "SIMDS103"
  ],
  "pattern-12-4-ordered-set-simulation": [
    "ORDERSET",
    "MEDIAN1",
    "ORDSET101",
    "ORDSET102",
    "ORDSET103"
  ],
  "pattern-13-1-basic-tree-dfs": [
    "TREE1",
    "TREEDFS",
    "SUBTREE1",
    "TREE101",
    "TREE102",
    "TREE103",
    "TREE104",
    "TREE105",
    "TREE106"
  ],
  "pattern-13-2-tree-traversal": [
    "TRAVERSE1",
    "TREELEAF",
    "HEIGHT1",
    "TTRAV101",
    "TTRAV102",
    "TTRAV103",
    "TTRAV104",
    "TTRAV105",
    "TTRAV106"
  ],
  "pattern-13-3-tree-dp": [
    "INOI1402",
    "TREEDP1",
    "INDEPENDENT",
    "MAXWEIGHT",
    "TDP101",
    "TDP102",
    "TDP103",
    "TDP104",
    "TDP105"
  ],
  "pattern-13-4-binary-lifting-lca": [
    "TALCA",
    "LCA1",
    "ANCESTOR1",
    "LCA101",
    "LCA102",
    "LCA103",
    "LCA104",
    "LCA105"
  ],
  "pattern-13-5-rerooting-dp": [
    "REROOT1",
    "TREECENTROID",
    "REROOT101",
    "REROOT102",
    "REROOT103",
    "REROOT104",
    "REROOT105"
  ],
  "pattern-13-6-euler-tour": [
    "EULERTOUR1",
    "SUBTREEQUERY",
    "ETOUR101",
    "ETOUR102",
    "ETOUR103",
    "ETOUR104",
    "ETOUR105",
    "ETOUR106"
  ],
  "pattern-14-1-connected-components": [
    "FIRESC",
    "DISHOWN",
    "CONNECT1",
    "CONN101",
    "CONN102",
    "CONN103",
    "CONN104",
    "CONN105",
    "CONN106",
    "CONN107"
  ],
  "pattern-14-2-dfs": [
    "DFS1",
    "GRAPHDFS",
    "PATHFIND",
    "DFS101",
    "DFS102",
    "DFS103",
    "DFS104",
    "DFS105",
    "DFS106",
    "DFS107"
  ],
  "pattern-14-4-topological-sort": [
    "TOPSORT1",
    "DEPENDENCY",
    "TOP101",
    "TOP102",
    "TOP103",
    "TOP104",
    "TOP105",
    "TOP106",
    "TOP107"
  ],
  "pattern-14-5-cycle-detection": [
    "CYCLEDET",
    "DIRECTEDCYC",
    "CYC101",
    "CYC102",
    "CYC103",
    "CYC104",
    "CYC105",
    "CYC106",
    "CYC107"
  ],
  "pattern-14-6-bipartite-graph": [
    "BIPARTITE1",
    "TWOCOLOR",
    "BIP101",
    "BIP102",
    "BIP103",
    "BIP104",
    "BIP105",
    "BIP106",
    "BIP107",
    "BIP108"
  ],
  "pattern-15-1-standard-dijkstra": [
    "DIJKSTRA1",
    "SHORTPATH",
    "DIJ101",
    "DIJ102",
    "DIJ103",
    "DIJ104",
    "DIJ105",
    "DIJ106",
    "DIJ107",
    "DIJ108"
  ],
  "pattern-15-3-0-1-bfs": [
    "BFS01",
    "CHEAPEST1",
    "Z1BFS101",
    "Z1BFS102",
    "Z1BFS103",
    "Z1BFS104",
    "Z1BFS105",
    "Z1BFS106"
  ],
  "pattern-15-4-bellman-ford-negative-edges": [
    "BELLMAN1",
    "NEGATIVE1",
    "BF101",
    "BF102",
    "BF103",
    "BF104",
    "BF105",
    "BF106",
    "BF107"
  ],
  "pattern-15-5-floyd-warshall": [
    "FLOYD1",
    "ALLPAIRS",
    "FW101",
    "FW102",
    "FW103",
    "FW104",
    "FW105",
    "FW106",
    "FW107",
    "FW108"
  ],
  "pattern-16-1-basic-dsu": [
    "DSU1",
    "DSU101",
    "DSU102",
    "DSU103",
    "DSU104",
    "DSU105"
  ],
  "pattern-16-2-union-find-applications": [
    "UNIONFIND1",
    "CONNECTED2",
    "UFA101",
    "UFA102",
    "UFA103",
    "UFA104",
    "UFA105"
  ],
  "pattern-16-3-kruskal-s-mst": [
    "MST1",
    "KRUSKAL1",
    "MINSPAN",
    "KMST101",
    "KMST102",
    "KMST103",
    "KMST104"
  ],
  "pattern-16-5-offline-dsu": [
    "OFFLINEDSU",
    "DYNAMICCONN",
    "OFFDSU101",
    "OFFDSU102",
    "OFFDSU103"
  ],
  "pattern-17-1-introduction-to-dp-1d-dp": [
    "DP1D101",
    "DP1D102",
    "DP1D103",
    "DP1D104",
    "DP1D105",
    "DP1D106",
    "DP1D107",
    "DP1D108"
  ],
  "pattern-17-2-knapsack-dp": [
    "KNAPSACK1",
    "SUBSETSUM",
    "RATIONAL",
    "KNAP101",
    "KNAP102",
    "KNAP103",
    "KNAP104",
    "KNAP105"
  ],
  "pattern-17-3-grid-dp": [
    "GRIDDP1",
    "MAXPATH",
    "CHEFGRID",
    "GDP101",
    "GDP102",
    "GDP103",
    "GDP104"
  ],
  "pattern-17-4-interval-dp": [
    "INTERVALDP",
    "MATRIXMULT",
    "PALINDP",
    "INDP101",
    "INDP102",
    "INDP103",
    "INDP104"
  ],
  "pattern-17-5-digit-dp": [
    "DIGITDP1",
    "COUNTDIGIT",
    "DIG101",
    "DIG102",
    "DIG103",
    "DIG104",
    "DIG105"
  ],
  "pattern-17-6-bitmask-dp": [
    "BITMASKDP",
    "ASSIGN1",
    "TSP1",
    "BMDP101",
    "BMDP102",
    "BMDP103",
    "BMDP104"
  ],
  "pattern-17-8-dp-on-dag": [
    "DAGDP1",
    "LONGESTPATH",
    "DAG101",
    "DAG102",
    "DAG103",
    "DAG104"
  ],
  "pattern-17-9-probability-dp": [
    "PROBDP1",
    "DICE1",
    "PRBDP101",
    "PRBDP102",
    "PRBDP103",
    "PRBDP104"
  ],
  "pattern-17-10-prefix-suffix-dp": [
    "PREFIXDP",
    "SUFFIXDP",
    "PSDP101",
    "PSDP102",
    "PSDP103",
    "PSDP104"
  ],
  "pattern-17-12-optimization-dp": [
    "CHT1",
    "MONOOPT",
    "OPTDP101",
    "OPTDP102",
    "OPTDP103",
    "OPTDP104"
  ],
  "pattern-18-2-merge-sort-applications": [
    "TSORT",
    "MERGESORT1",
    "INVERSION",
    "MSAPP101",
    "MSAPP102",
    "MSAPP103"
  ],
  "pattern-18-3-divide-conquer-on-arrays": [
    "DIVARR1",
    "MAXSUBARR",
    "DCARR101",
    "DCARR102",
    "DCARR103",
    "DCARR104",
    "DCARR105"
  ],
  "pattern-18-4-cdq-divide-conquer": [
    "CDQ1",
    "3DPOINTS",
    "CDQ101",
    "CDQ102",
    "CDQ103",
    "CDQ104",
    "CDQ105"
  ],
  "pattern-19-1-basic-segment-tree": [
    "SEGTREE1",
    "RANGEQUERY",
    "BST101",
    "BST102",
    "BST103",
    "BST104"
  ],
  "pattern-19-2-range-query-point-update": [
    "POINTUPDATE",
    "SUMQUERY",
    "RQPU101",
    "RQPU102",
    "RQPU103",
    "RQPU104"
  ],
  "pattern-19-3-lazy-propagation": [
    "LAZYPROP",
    "RANGEADD",
    "LAZY101",
    "LAZY102",
    "LAZY103",
    "LAZY104"
  ],
  "pattern-19-4-merge-sort-tree": [
    "MERGETREE",
    "KTHMIN",
    "MST101",
    "MST102",
    "MST103",
    "MST104"
  ],
  "pattern-19-5-persistent-segment-tree": [
    "PERSISTENT1",
    "HISTORICAL",
    "PST101",
    "PST102",
    "PST103",
    "PST104"
  ],
  "pattern-19-6-dynamic-segment-tree": [
    "DYNSEGTREE",
    "SPARSEST",
    "DST101",
    "DST102",
    "DST103",
    "DST104"
  ],
  "pattern-20-1-basic-bit": [
    "BIT1",
    "FENWICK1",
    "BBIT101",
    "BBIT102",
    "BBIT103"
  ],
  "pattern-20-2-prefix-sum-bit": [
    "BITPREFIX",
    "RANGEBIT",
    "PSBIT101",
    "PSBIT102",
    "PSBIT103"
  ],
  "pattern-20-4-bit-coordinate-compression": [
    "BITCOMPRESS",
    "BITCC101",
    "BITCC102",
    "BITCC103",
    "BITCC104"
  ],
  "pattern-20-5-offline-queries-with-bit": [
    "OFFLINEBIT",
    "OFFBIT101",
    "OFFBIT102",
    "OFFBIT103",
    "OFFBIT104"
  ],
  "pattern-21-1-basic-trie": [
    "TRIE1",
    "PREFIXSEARCH",
    "BTRIE101",
    "BTRIE102",
    "BTRIE103",
    "BTRIE104"
  ],
  "pattern-21-2-xor-trie": [
    "XORTRIE1",
    "MAXOR",
    "XTRIE101",
    "XTRIE102",
    "XTRIE103",
    "XTRIE104"
  ],
  "pattern-21-3-string-trie-applications": [
    "AUTOCOMPLETE",
    "DICTIONARY",
    "STRIE101",
    "STRIE102",
    "STRIE103",
    "STRIE104"
  ],
  "pattern-22-1-computational-geometry": [
    "CONVEXHULL",
    "POINTINPOLY",
    "CGEO101",
    "CGEO102",
    "CGEO103",
    "CGEO104",
    "CGEO105"
  ],
  "pattern-22-2-coordinate-geometry": [
    "DISTANCE2D",
    "LINEINTERSECT",
    "CGEO201",
    "CGEO202",
    "CGEO203",
    "CGEO204",
    "CGEO205"
  ],
  "pattern-22-3-area-volume": [
    "POLYAREA",
    "TRIANGLEAREA",
    "AV101",
    "AV102",
    "AV103",
    "AV104"
  ],
  "pattern-23-1-nim-games": [
    "NIM1",
    "STONEGAME",
    "NIM101",
    "NIM102",
    "NIM103",
    "NIM104"
  ],
  "pattern-23-2-sprague-grundy": [
    "GRUNDY1",
    "GAMESTATE",
    "SG101",
    "SG102",
    "SG103",
    "SG104"
  ],
  "pattern-23-3-subtraction-games": [
    "SUBGAME",
    "TAKESTONES",
    "SUB101"
  ],
  "pattern-24-2-greedy-construction": [
    "CONSTRUCT1",
    "BUILDARR",
    "GC101",
    "GC102",
    "GC103",
    "GC104",
    "GC105",
    "GC106",
    "GC107",
    "GC108"
  ],
  "pattern-24-3-constructive-mathematics": [
    "MATHCONST",
    "MATRIXBUILD",
    "MC101",
    "MC102",
    "MC103",
    "MC104",
    "MC105",
    "MC106",
    "MC107",
    "MC108"
  ],
  "pattern-24-4-permutation-construction": [
    "PERMCONST",
    "SWAPPERM",
    "PC101",
    "PC102",
    "PC103",
    "PC104",
    "PC105",
    "PC106",
    "PC107",
    "PC108"
  ],
  "pattern-25-1-computational-geometry": [
    "GEOMADV1",
    "GEOMADV2",
    "MISC101",
    "MISC102",
    "MISC103",
    "MISC104"
  ],
  "pattern-25-2-coordinate-geometry": [
    "GEOMADV3",
    "GEOMADV4",
    "MISC105",
    "MISC106",
    "MISC107",
    "MISC108"
  ],
  "pattern-25-3-interactive-problems": [
    "INTERACT1",
    "INTERACT2",
    "INTER101",
    "INTER102",
    "INTER103",
    "INTER104"
  ],
  "pattern-25-4-ad-hoc-observation": [
    "ADHOC1",
    "ADHOC2",
    "ADHOC101",
    "ADHOC102",
    "ADHOC103",
    "ADHOC104"
  ],
  "pattern-25-5-mixed-expert-problems": [
    "EXPERT1",
    "EXPERT2",
    "EXPERT3",
    "EXPERT4",
    "EXPERT5",
    "EXPERT6"
  ]
};

export const statistics: string[][] = [
  [
    "CodeChef Master Dataset - Platform Analytics",
    "",
    ""
  ],
  [
    "Metric",
    "Formula / Value",
    "Description"
  ],
  [
    "Total Problems",
    "",
    "Total unique CodeChef problems in curriculum"
  ],
  [
    "Verified Problems",
    "",
    "Problems verified with official CodeChef Practice codes"
  ],
  [
    "Solved Problems",
    "",
    "Number of problems marked as Solved"
  ],
  [
    "Remaining Problems",
    "",
    "Unsolved problems remaining in learning roadmap"
  ],
  [
    "Total XP Available",
    "",
    "Total XP points across all verified problems"
  ],
  [
    "Average Estimated Time (mins)",
    "",
    "Average expected solving duration per problem"
  ],
  [
    "Max Estimated Time (mins)",
    "",
    "Maximum expected duration tier"
  ],
  [
    "Min Estimated Time (mins)",
    "",
    "Minimum expected duration tier"
  ],
  [
    "Kingdom Completion Rate",
    "",
    "Average completion % across all kingdoms"
  ],
  [
    "Pattern Completion Rate",
    "",
    "Average completion % across all patterns"
  ]
];

export const metadata: string[][] = [
  [
    "CodeChef Dataset Metadata & Difficulty Tiers",
    "",
    ""
  ],
  [
    "Generation Date:",
    "2026-07-29 22:45:43",
    ""
  ],
  [
    "Platform:",
    "codechef",
    ""
  ],
  [
    "Difficulty Tier",
    "Estimated Time (mins)",
    "XP Points"
  ],
  [
    "Beginner",
    "15",
    "10"
  ],
  [
    "Easy",
    "25",
    "20"
  ],
  [
    "Easy-Medium",
    "40",
    "35"
  ],
  [
    "Medium",
    "60",
    "55"
  ],
  [
    "Medium-Hard",
    "90",
    "80"
  ],
  [
    "Hard",
    "120",
    "120"
  ],
  [
    "Expert",
    "180",
    "180"
  ],
  [
    "Kingdom #",
    "Kingdom Name",
    "Total Patterns"
  ],
  [
    "1",
    "KINGDOM 1 \u2014 THE KINGDOM OF ARRAYS",
    "6"
  ],
  [
    "2",
    "KINGDOM 2 \u2014 THE KINGDOM OF PREFIX SUM & DIFFERENCE ARRAY",
    "4"
  ],
  [
    "3",
    "KINGDOM 3 \u2014 THE KINGDOM OF TWO POINTERS & SLIDING WINDOW",
    "4"
  ],
  [
    "4",
    "KINGDOM 4 \u2014 THE KINGDOM OF BINARY SEARCH",
    "4"
  ],
  [
    "5",
    "KINGDOM 5 \u2014 THE KINGDOM OF SORTING & GREEDY",
    "5"
  ],
  [
    "6",
    "KINGDOM 6 \u2014 THE KINGDOM OF STRINGS",
    "6"
  ],
  [
    "7",
    "KINGDOM 7 \u2014 THE KINGDOM OF BIT MANIPULATION",
    "4"
  ],
  [
    "8",
    "KINGDOM 8 \u2014 THE KINGDOM OF MATHEMATICS & NUMBER THEORY",
    "6"
  ],
  [
    "9",
    "KINGDOM 9 \u2014 THE KINGDOM OF RECURSION & BACKTRACKING",
    "4"
  ],
  [
    "10",
    "KINGDOM 10 \u2014 THE KINGDOM OF STACK & MONOTONIC STACK",
    "4"
  ],
  [
    "11",
    "KINGDOM 11 \u2014 THE KINGDOM OF QUEUE & DEQUE",
    "4"
  ],
  [
    "12",
    "KINGDOM 12 \u2014 THE KINGDOM OF LINKED LIST & SIMULATION",
    "4"
  ],
  [
    "13",
    "KINGDOM 13 \u2014 THE KINGDOM OF TREES",
    "6"
  ],
  [
    "14",
    "KINGDOM 14 \u2014 THE KINGDOM OF GRAPH TRAVERSAL (DFS & BFS)",
    "5"
  ],
  [
    "15",
    "KINGDOM 15 \u2014 THE KINGDOM OF SHORTEST PATHS",
    "4"
  ],
  [
    "16",
    "KINGDOM 16 \u2014 THE KINGDOM OF DSU & MINIMUM SPANNING TREE",
    "4"
  ],
  [
    "17",
    "KINGDOM 17 \u2014 THE KINGDOM OF DYNAMIC PROGRAMMING",
    "10"
  ],
  [
    "18",
    "KINGDOM 18 \u2014 THE KINGDOM OF DIVIDE & CONQUER",
    "3"
  ],
  [
    "19",
    "KINGDOM 19 \u2014 THE KINGDOM OF SEGMENT TREES",
    "6"
  ],
  [
    "20",
    "KINGDOM 20 \u2014 THE KINGDOM OF FENWICK TREE (BIT)",
    "4"
  ],
  [
    "21",
    "KINGDOM 21 \u2014 THE KINGDOM OF TRIE & STRING STRUCTURES",
    "3"
  ],
  [
    "22",
    "KINGDOM 22 \u2014 THE KINGDOM OF GEOMETRY & COMPUTATIONAL GEOMETRY",
    "3"
  ],
  [
    "23",
    "KINGDOM 23 \u2014 THE KINGDOM OF GAME THEORY & NIM",
    "3"
  ],
  [
    "24",
    "KINGDOM 24 \u2014 THE KINGDOM OF CONSTRUCTIVE ALGORITHMS",
    "3"
  ],
  [
    "25",
    "KINGDOM 25 \u2014 THE KINGDOM OF GEOMETRY, INTERACTIVE & MISCELLANEOUS",
    "5"
  ]
];
