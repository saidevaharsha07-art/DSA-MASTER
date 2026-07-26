import { CategoryModel, KingdomModel } from '../types';
import { ALL_PROBLEMS } from './problems';

const BASE_CATEGORIES = [
  { id: 'cat-1', slug: 'basic-arrays', title: 'Basic Arrays', kingdomTitle: 'Kingdom of Beginnings', description: 'Master continuous memory, array indexing, and element manipulation.', order: 1, patternIds: ['pattern.array-fundamentals', 'pattern.kadanes-algorithm', 'pattern.array-rearrangement', 'pattern.array-simulation-design'] },
  { id: 'cat-2', slug: 'prefix-sum', title: 'Prefix Sum', kingdomTitle: 'Kingdom of Accumulation', description: 'Subarray sum queries, 2D prefix sums, and difference arrays.', order: 2, patternIds: ['pattern.prefix-sum-basics', 'pattern.2d-prefix-sum', 'pattern.prefix-xor', 'pattern.prefix-sum-hashing'] },
  { id: 'cat-3', slug: 'two-pointers', title: 'Two Pointers', kingdomTitle: 'Twin Rivers Kingdom', description: 'Opposite direction, fast & slow, and partitioning techniques.', order: 3, patternIds: ['pattern.opposite-pointers', 'pattern.fast-slow-pointers', 'pattern.same-direction-pointers', 'pattern.merge-partition-pointers'] },
  { id: 'cat-4', slug: 'sliding-window', title: 'Sliding Window', kingdomTitle: 'The Moving Horizon', description: 'Fixed and variable size windows, substring bounds, and monotonic windows.', order: 4, patternIds: ['pattern.fixed-window', 'pattern.variable-window', 'pattern.sliding-window-hashmap', 'pattern.monotonic-window', 'pattern.bounded-frame-substrings'] },
  { id: 'cat-5', slug: 'hashing', title: 'Hashing', kingdomTitle: 'The Cipher Vaults', description: 'HashMap frequency counting, set lookup, and custom key design.', order: 5, patternIds: ['pattern.hashmap-frequency', 'pattern.set-lookup', 'pattern.hashing-design', 'pattern.marked-ledger-hashing'] },
  { id: 'cat-6', slug: 'binary-search', title: 'Binary Search', kingdomTitle: 'The Hidden Truth', description: 'Classic binary search, search on rotated arrays, search on answer, and 2D arrays.', order: 6, patternIds: ['pattern.classic-binary-search', 'pattern.rotated-binary-search', 'pattern.search-on-answer', 'pattern.2d-binary-search'] },
  { id: 'cat-7', slug: 'sorting', title: 'Sorting', kingdomTitle: 'The Ordered Realms', description: 'Comparison sorting, custom comparators, cyclic sort, and bucket sort.', order: 7, patternIds: ['pattern.comparison-sorting', 'pattern.custom-comparators', 'pattern.cyclic-sort', 'pattern.sorting-applications'] },
  { id: 'cat-8', slug: 'stack', title: 'Stack', kingdomTitle: 'The Tower of Stacks', description: 'Monotonic stack, expression evaluation, min stack, and string parsing.', order: 8, patternIds: ['pattern.monotonic-stack', 'pattern.expression-evaluation', 'pattern.stack-simulation', 'pattern.stack-string-processing'] },
  { id: 'cat-9', slug: 'queue-deque', title: 'Queue & Deque', kingdomTitle: 'The Corridor of Queues', description: 'Queue fundamentals, monotonic deque, BFS queues, and circular queues.', order: 9, patternIds: ['pattern.queue-fundamentals', 'pattern.monotonic-deque', 'pattern.bfs-queue', 'pattern.circular-queue-design'] },
  { id: 'cat-10', slug: 'intervals', title: 'Intervals', kingdomTitle: 'The Timeline Kingdom', description: 'Merge intervals, interval scheduling, sweep line, and calendar design.', order: 10, patternIds: ['pattern.merge-intervals', 'pattern.interval-scheduling', 'pattern.sweep-line', 'pattern.interval-design-advanced'] },
  { id: 'cat-11', slug: 'linked-list', title: 'Linked List', kingdomTitle: 'The Chain Islands', description: 'Basic manipulation, fast & slow pointers, advanced structures, and list design.', order: 11, patternIds: ['pattern.basic-linked-list', 'pattern.fast-slow-linked-list', 'pattern.advanced-linked-list-structures', 'pattern.linked-list-design'] },
  { id: 'cat-12', slug: 'binary-trees', title: 'Binary Trees', kingdomTitle: 'The Branching Woods', description: 'Tree traversal, recursive properties, construction & serialization, and tree views.', order: 12, patternIds: ['pattern.tree-traversal', 'pattern.recursive-tree-properties', 'pattern.tree-construction', 'pattern.root-to-leaf-paths', 'pattern.tree-views-levels'] },
  { id: 'cat-13', slug: 'binary-search-trees', title: 'Binary Search Trees', kingdomTitle: 'The Ordered Grove', description: 'BST fundamentals, BST traversal & order statistics, LCA, and BST modification.', order: 13, patternIds: ['pattern.bst-fundamentals', 'pattern.bst-traversal-order', 'pattern.lca-structural-bst', 'pattern.bst-modification'] },
  { id: 'cat-14', slug: 'graphs', title: 'Graphs', kingdomTitle: 'Shadow Forest', description: 'Graph representation & traversal, topological sort, Union-Find, and bipartite coloring.', order: 14, patternIds: ['pattern.graph-traversal', 'pattern.topological-sort', 'pattern.union-find', 'pattern.bipartite-coloring', 'pattern.advanced-graph-traversal', 'pattern.graph-construction-multi-bfs'] },
  { id: 'cat-15', slug: 'shortest-path', title: 'Shortest Path Algorithms', kingdomTitle: 'The Swift Roads', description: 'BFS shortest path, Dijkstra algorithm, Bellman-Ford, and 0-1 BFS.', order: 15, patternIds: ['pattern.bfs-shortest-path', 'pattern.dijkstras-algorithm', 'pattern.bellman-ford', 'pattern.a-star-01-bfs', 'pattern.modified-dijkstra-variants'] },
  { id: 'cat-16', slug: 'minimum-spanning-tree', title: 'Minimum Spanning Tree', kingdomTitle: 'The Web of Kingdoms', description: "Kruskal's algorithm, Prim's algorithm, and MST applications.", order: 16, patternIds: ['pattern.kruskals-algorithm', 'pattern.prims-algorithm', 'pattern.mst-applications'] },
  { id: 'cat-17', slug: 'backtracking', title: 'Backtracking', kingdomTitle: 'The Maze of Choices', description: 'Subsets & combinations, permutations, constraint satisfaction, and path backtracking.', order: 17, patternIds: ['pattern.subsets-combinations', 'pattern.permutations', 'pattern.constraint-satisfaction', 'pattern.partitioning-path-backtracking', 'pattern.advanced-backtracking-puzzles'] },
  { id: 'cat-18', slug: 'greedy', title: 'Greedy', kingdomTitle: "The Merchant's Gambit", description: 'Interval greedy, array greedy, greedy with sorting, and scheduling.', order: 18, patternIds: ['pattern.interval-greedy', 'pattern.array-greedy', 'pattern.greedy-sorting', 'pattern.greedy-graph-scheduling'] },
  { id: 'cat-19', slug: 'heap', title: 'Heap', kingdomTitle: 'The Summit Fortress', description: 'Top-K elements, two-heap technique, heap for scheduling, and heap design.', order: 19, patternIds: ['pattern.top-k-elements', 'pattern.two-heap', 'pattern.heap-scheduling', 'pattern.heap-design-simulation'] },
  { id: 'cat-20', slug: 'dynamic-programming', title: 'Dynamic Programming', kingdomTitle: 'Time Citadel', description: '1D DP, 2D Grid DP, Knapsack DP, String DP, Interval DP, and Tree DP.', order: 20, patternIds: ['pattern.1d-dp', 'pattern.2d-grid-dp', 'pattern.knapsack-dp', 'pattern.string-dp', 'pattern.interval-dp', 'pattern.tree-state-machine-dp', 'pattern.advanced-state-dp'] },
  { id: 'cat-21', slug: 'bit-manipulation', title: 'Bit Manipulation', kingdomTitle: 'The Binary Caverns', description: 'Basic bit tricks, XOR applications, bitmask DP, and bitmask counting.', order: 21, patternIds: ['pattern.basic-bit-tricks', 'pattern.xor-applications', 'pattern.bitmask-dp', 'pattern.bitmask-subsets-counting'] },
  { id: 'cat-22', slug: 'strings', title: 'Strings', kingdomTitle: 'The Scriptorium', description: 'String basics, pattern matching, palindromes, anagrams, and Trie-based strings.', order: 22, patternIds: ['pattern.string-basics', 'pattern.pattern-matching', 'pattern.palindromes', 'pattern.anagrams-frequency-strings', 'pattern.trie-based-strings', 'pattern.string-parsing-simulation'] },
  { id: 'cat-23', slug: 'matrix', title: 'Matrix', kingdomTitle: 'The Grid Kingdom', description: 'Matrix traversal, matrix search, matrix as graph, and in-place manipulation.', order: 23, patternIds: ['pattern.matrix-traversal', 'pattern.matrix-search', 'pattern.matrix-as-graph', 'pattern.in-place-matrix-manipulation', 'pattern.matrix-construction-rotation'] },
  { id: 'cat-24', slug: 'math-number-theory', title: 'Math & Number Theory', kingdomTitle: 'The Numeric Sanctum', description: 'Number properties, GCD/LCM, combinatorics, geometry, and number theory.', order: 24, patternIds: ['pattern.number-properties', 'pattern.gcd-lcm-modular-arithmetic', 'pattern.combinatorics-probability', 'pattern.geometry-simulation', 'pattern.number-theory-applications'] },
  { id: 'cat-25', slug: 'advanced-algorithms', title: 'Advanced Algorithms', kingdomTitle: 'The Citadel of Masters', description: 'Segment Tree, Fenwick Tree, Trie & Suffix Structures, KMP/Rabin-Karp, and Reservoir Sampling.', order: 25, patternIds: ['pattern.advanced-string-matching', 'pattern.segment-fenwick-trees', 'pattern.network-flow-matching', 'pattern.line-sweep-geometry', 'pattern.heavy-light-advanced-trees'] },
];

export const ALL_CATEGORIES: CategoryModel[] = BASE_CATEGORIES.map((cat) => {
  const categoryProblems = ALL_PROBLEMS.filter((p) => p.categorySlug === cat.slug || p.categoryId === cat.id);
  const totalProblemCount = categoryProblems.length;
  const totalXp = categoryProblems.reduce((sum, p) => sum + (p.xp || 0), 0);

  return {
    ...cat,
    totalProblemCount,
    totalXp,
  };
});

export const ALL_KINGDOMS: KingdomModel[] = ALL_CATEGORIES.map((cat, idx) => ({
  id: `kingdom-${idx + 1}`,
  slug: cat.slug,
  title: cat.kingdomTitle,
  categoryTitle: cat.title,
  categorySlug: cat.slug,
  description: cat.description,
  totalProblems: cat.totalProblemCount,
  totalXp: cat.totalXp,
  unlocked: idx < 5,
  progressPercentage: idx === 0 ? 45 : idx === 1 ? 25 : 0,
}));
