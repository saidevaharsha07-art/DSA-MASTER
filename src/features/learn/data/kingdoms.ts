export interface SkillNode {
  id: string;
  title: string;
  status: 'completed' | 'in_progress' | 'locked';
  progressPct?: number;
}

export interface QuestObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface Kingdom {
  id: number;
  slug: string;
  name: string;
  progressPct: number;
  status: 'completed' | 'current' | 'locked';
  icon: string;
  color: string;
  description: string;
  skillsUnlocked: number;
  totalSkills: number;
  skills: SkillNode[];
  currentQuest: {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
    objectives: QuestObjective[];
    xpReward: number;
    coinReward: number;
    badgeReward: string;
  };
  boss: {
    title: string;
    description: string;
    xpReward: number;
    coinReward: number;
    badgeReward: string;
  };
}

export const KINGDOMS_DATA: Kingdom[] = [
  {
    id: 1,
    slug: 'arrays',
    name: 'Arrays',
    progressPct: 85,
    status: 'current',
    icon: '🏰',
    color: '#F59E0B',
    description: 'The foundation of data structures. Master arrays and unlock the power of patterns.',
    skillsUnlocked: 12,
    totalSkills: 14,
    skills: [
      { id: 's1', title: 'Arrays Basics', status: 'completed' },
      { id: 's2', title: 'Prefix Sum', status: 'completed' },
      { id: 's3', title: 'Two Pointer', status: 'completed' },
      { id: 's4', title: 'Sliding Window', status: 'in_progress', progressPct: 60 },
      { id: 's5', title: 'Advanced Patterns', status: 'locked' },
      { id: 's6', title: 'Challenges', status: 'locked' },
      { id: 's7', title: 'Kingdom Boss', status: 'locked' },
    ],
    currentQuest: {
      title: 'Master Sliding Window',
      difficulty: 'Medium',
      description: 'Learn the sliding window technique and solve array problems like a true warrior.',
      objectives: [
        { id: 'q1', text: 'Understand fixed size window', completed: true },
        { id: 'q2', text: 'Solve 3 easy problems', completed: true },
        { id: 'q3', text: 'Solve 2 medium problems', completed: false },
        { id: 'q4', text: 'Solve 1 hard problem', completed: false },
      ],
      xpReward: 500,
      coinReward: 100,
      badgeReward: 'Sliding Window Badge',
    },
    boss: {
      title: 'The Array Guardian',
      description: 'Defeat the guardian by solving 10 array problems of mixed difficulty.',
      xpReward: 2000,
      coinReward: 500,
      badgeReward: 'Arrays Master Badge',
    },
  },
  {
    id: 2,
    slug: 'strings',
    name: 'Strings',
    progressPct: 40,
    status: 'completed',
    icon: '📜',
    color: '#38BDF8',
    description: 'Master string manipulation, pattern matching, and text processing algorithms.',
    skillsUnlocked: 6,
    totalSkills: 12,
    skills: [
      { id: 's1', title: 'String Basics', status: 'completed' },
      { id: 's2', title: 'Anagrams & Frequency', status: 'completed' },
      { id: 's3', title: 'Palindromes', status: 'in_progress', progressPct: 40 },
      { id: 's4', title: 'KMP Algorithm', status: 'locked' },
    ],
    currentQuest: {
      title: 'Palindrome Mastery',
      difficulty: 'Easy',
      description: 'Check palindromes in linear time using two pointer technique.',
      objectives: [
        { id: 'q1', text: 'Valid Palindrome I', completed: true },
        { id: 'q2', text: 'Valid Palindrome II', completed: false },
      ],
      xpReward: 300,
      coinReward: 50,
      badgeReward: 'String Scribe',
    },
    boss: {
      title: 'The Lexicon Phantom',
      description: 'Defeat the phantom by solving 8 string pattern matching problems.',
      xpReward: 1500,
      coinReward: 300,
      badgeReward: 'String Master Badge',
    },
  },
  { id: 3, slug: 'hashing', name: 'Hashing', progressPct: 70, status: 'completed', icon: '🌳', color: '#10B981', description: 'Hash maps and hash sets for O(1) lookup.', skillsUnlocked: 9, totalSkills: 12, skills: [], currentQuest: { title: 'Hash Collision Defense', difficulty: 'Easy', description: 'Master O(1) lookups.', objectives: [], xpReward: 400, coinReward: 80, badgeReward: 'Hash Master' }, boss: { title: 'The Hash Overlord', description: 'Defeat the Overlord.', xpReward: 1800, coinReward: 400, badgeReward: 'Hash Overlord Badge' } },
  { id: 4, slug: 'two-pointer', name: 'Two Pointer', progressPct: 60, status: 'completed', icon: '🏹', color: '#C084FC', description: 'Squeeze search spaces with dual pointers.', skillsUnlocked: 7, totalSkills: 10, skills: [], currentQuest: { title: 'Dual Blade Convergence', difficulty: 'Medium', description: 'Pointers in harmony.', objectives: [], xpReward: 450, coinReward: 90, badgeReward: 'Dual Blade' }, boss: { title: 'The Twin Sentinels', description: 'Defeat twin sentinels.', xpReward: 2000, coinReward: 450, badgeReward: 'Twin Blade' } },
  { id: 5, slug: 'stack', name: 'Stack', progressPct: 55, status: 'completed', icon: '💎', color: '#6366F1', description: 'LIFO structure for evaluation and parsing.', skillsUnlocked: 6, totalSkills: 10, skills: [], currentQuest: { title: 'Monotonic Stack Peak', difficulty: 'Medium', description: 'Next greater element.', objectives: [], xpReward: 500, coinReward: 100, badgeReward: 'Stack Titan' }, boss: { title: 'The Monolith', description: 'Defeat the Monolith.', xpReward: 2200, coinReward: 500, badgeReward: 'Monolith Badge' } },
  { id: 6, slug: 'queue', name: 'Queue', progressPct: 45, status: 'completed', icon: '🏰', color: '#06B6D4', description: 'FIFO structure for BFS and buffer management.', skillsUnlocked: 5, totalSkills: 10, skills: [], currentQuest: { title: 'Circular Queue Buffer', difficulty: 'Easy', description: 'Buffer streams.', objectives: [], xpReward: 350, coinReward: 70, badgeReward: 'Queue Guard' }, boss: { title: 'The Stream Behemoth', description: 'Defeat the Stream Behemoth.', xpReward: 1800, coinReward: 350, badgeReward: 'Stream Master' } },
  { id: 7, slug: 'linked-list', name: 'Linked List', progressPct: 50, status: 'completed', icon: '🌿', color: '#22C55E', description: 'Chained node structures and pointer manipulation.', skillsUnlocked: 6, totalSkills: 12, skills: [], currentQuest: { title: 'Cycle Detection', difficulty: 'Medium', description: 'Floyd cycle finding.', objectives: [], xpReward: 450, coinReward: 90, badgeReward: 'Node Weaver' }, boss: { title: 'The Serpent Hydra', description: 'Defeat the Hydra.', xpReward: 2000, coinReward: 450, badgeReward: 'Hydra Master' } },
  { id: 8, slug: 'recursion', name: 'Recursion', progressPct: 65, status: 'completed', icon: '🔮', color: '#A855F7', description: 'Self-referential functions and call stacks.', skillsUnlocked: 8, totalSkills: 12, skills: [], currentQuest: { title: 'Call Stack Ascension', difficulty: 'Medium', description: 'Divide and Conquer.', objectives: [], xpReward: 500, coinReward: 100, badgeReward: 'Stack Sage' }, boss: { title: 'The Infinite Echo', description: 'Defeat the Infinite Echo.', xpReward: 2500, coinReward: 500, badgeReward: 'Echo Sage' } },
  { id: 9, slug: 'backtracking', name: 'Backtracking', progressPct: 35, status: 'completed', icon: '🏛️', color: '#F43F5E', description: 'Exhaustive state space tree search.', skillsUnlocked: 4, totalSkills: 10, skills: [], currentQuest: { title: 'N-Queens Gambit', difficulty: 'Hard', description: 'Prune dead search branches.', objectives: [], xpReward: 600, coinReward: 120, badgeReward: 'Pruner' }, boss: { title: 'The Permutation Fiend', description: 'Defeat the Fiend.', xpReward: 2800, coinReward: 600, badgeReward: 'Fiend Master' } },
  { id: 10, slug: 'divide-conquer', name: 'Divide & Conquer', progressPct: 40, status: 'completed', icon: '⚔️', color: '#3B82F6', description: 'Break down subproblems and combine solutions.', skillsUnlocked: 5, totalSkills: 10, skills: [], currentQuest: { title: 'Merge Sort Master', difficulty: 'Medium', description: 'Optimal sorting.', objectives: [], xpReward: 450, coinReward: 90, badgeReward: 'Divider' }, boss: { title: 'The Split Sovereign', description: 'Defeat the Split Sovereign.', xpReward: 2200, coinReward: 450, badgeReward: 'Sovereign Badge' } },
  { id: 11, slug: 'binary-search', name: 'Binary Search', progressPct: 60, status: 'completed', icon: '🎯', color: '#38BDF8', description: 'Logarithmic search space reduction.', skillsUnlocked: 7, totalSkills: 10, skills: [], currentQuest: { title: 'Rotated Array Search', difficulty: 'Medium', description: 'Logarithmic precision.', objectives: [], xpReward: 500, coinReward: 100, badgeReward: 'Searcher' }, boss: { title: 'The Binary Oracle', description: 'Defeat the Oracle.', xpReward: 2400, coinReward: 500, badgeReward: 'Oracle Badge' } },
  { id: 12, slug: 'binary-tree', name: 'Binary Tree', progressPct: 55, status: 'completed', icon: '🌳', color: '#10B981', description: 'Hierarchical node traversal and tree invariants.', skillsUnlocked: 7, totalSkills: 12, skills: [], currentQuest: { title: 'Level Order Traversal', difficulty: 'Medium', description: 'BFS Tree traversal.', objectives: [], xpReward: 480, coinReward: 95, badgeReward: 'Tree Walker' }, boss: { title: 'The Ancient Ent', description: 'Defeat the Ancient Ent.', xpReward: 2300, coinReward: 480, badgeReward: 'Ent Master' } },
  { id: 13, slug: 'bst', name: 'BST', progressPct: 50, status: 'completed', icon: '🌲', color: '#059669', description: 'Ordered binary search trees for fast lookups.', skillsUnlocked: 6, totalSkills: 10, skills: [], currentQuest: { title: 'BST Inorder Validation', difficulty: 'Easy', description: 'Validate BST properties.', objectives: [], xpReward: 400, coinReward: 80, badgeReward: 'BST Keeper' }, boss: { title: 'The Arbor Guardian', description: 'Defeat the Arbor Guardian.', xpReward: 2100, coinReward: 400, badgeReward: 'Arbor Badge' } },
  { id: 14, slug: 'heap', name: 'Heap / Priority Queue', progressPct: 45, status: 'completed', icon: '🔥', color: '#EA580C', description: 'Min & Max heaps for streaming priority data.', skillsUnlocked: 5, totalSkills: 10, skills: [], currentQuest: { title: 'Kth Largest Stream', difficulty: 'Medium', description: 'Maintain top K elements.', objectives: [], xpReward: 520, coinReward: 100, badgeReward: 'Heap Master' }, boss: { title: 'The Priority Leviathan', description: 'Defeat the Leviathan.', xpReward: 2600, coinReward: 520, badgeReward: 'Leviathan Badge' } },
  { id: 15, slug: 'graphs', name: 'Graphs', progressPct: 30, status: 'completed', icon: '🔮', color: '#8B5CF6', description: 'Vertices and edges modeling complex networks.', skillsUnlocked: 4, totalSkills: 12, skills: [], currentQuest: { title: 'Connected Components', difficulty: 'Medium', description: 'Traverse graph islands.', objectives: [], xpReward: 550, coinReward: 110, badgeReward: 'Graph Surveyor' }, boss: { title: 'The Network Archon', description: 'Defeat the Network Archon.', xpReward: 3000, coinReward: 600, badgeReward: 'Archon Badge' } },
  { id: 16, slug: 'dfs-bfs', name: 'DFS & BFS', progressPct: 35, status: 'completed', icon: '🏰', color: '#06B6D4', description: 'Depth-first and breadth-first search algorithms.', skillsUnlocked: 4, totalSkills: 10, skills: [], currentQuest: { title: 'Shortest Path Grid', difficulty: 'Medium', description: 'BFS Shortest path.', objectives: [], xpReward: 500, coinReward: 100, badgeReward: 'Pathfinder' }, boss: { title: 'The Labyrinth Minotaur', description: 'Defeat the Minotaur.', xpReward: 2500, coinReward: 500, badgeReward: 'Minotaur Badge' } },
  { id: 17, slug: 'topological-sort', name: 'Topological Sort', progressPct: 25, status: 'completed', icon: '🏛️', color: '#D97706', description: 'Dependency ordering in directed acyclic graphs.', skillsUnlocked: 3, totalSkills: 8, skills: [], currentQuest: { title: 'Course Schedule Dependency', difficulty: 'Medium', description: 'Kahn algorithm for DAGs.', objectives: [], xpReward: 550, coinReward: 110, badgeReward: 'Sorter' }, boss: { title: 'The Chronos Sentinel', description: 'Defeat the Chronos Sentinel.', xpReward: 2700, coinReward: 550, badgeReward: 'Chronos Badge' } },
  { id: 18, slug: 'greedy', name: 'Greedy', progressPct: 40, status: 'completed', icon: '🌿', color: '#16A34A', description: 'Locally optimal choices for global solutions.', skillsUnlocked: 4, totalSkills: 10, skills: [], currentQuest: { title: 'Interval Scheduling', difficulty: 'Medium', description: 'Max non-overlapping intervals.', objectives: [], xpReward: 480, coinReward: 95, badgeReward: 'Greedy Tactician' }, boss: { title: 'The Greedy Warlord', description: 'Defeat the Warlord.', xpReward: 2400, coinReward: 480, badgeReward: 'Warlord Badge' } },
  { id: 19, slug: 'dynamic-programming', name: 'Dynamic Programming', progressPct: 20, status: 'completed', icon: '🔮', color: '#9333EA', description: 'Overlapping subproblems and optimal substructure.', skillsUnlocked: 3, totalSkills: 15, skills: [], currentQuest: { title: '0/1 Knapsack DP', difficulty: 'Hard', description: 'Memoization & Tabulation.', objectives: [], xpReward: 700, coinReward: 150, badgeReward: 'DP Sage' }, boss: { title: 'The DP Overlord', description: 'Defeat the DP Overlord.', xpReward: 3500, coinReward: 750, badgeReward: 'DP Sage Master' } },
  { id: 20, slug: 'sliding-window', name: 'Sliding Window', progressPct: 15, status: 'completed', icon: '🏰', color: '#0284C7', description: 'Contiguous subarray optimization.', skillsUnlocked: 2, totalSkills: 8, skills: [], currentQuest: { title: 'Longest Substring Window', difficulty: 'Medium', description: 'Variable sliding window.', objectives: [], xpReward: 450, coinReward: 90, badgeReward: 'Window Specialist' }, boss: { title: 'The Frost Titan', description: 'Defeat the Frost Titan.', xpReward: 2200, coinReward: 450, badgeReward: 'Frost Badge' } },
  { id: 21, slug: 'trie', name: 'Trie', progressPct: 10, status: 'completed', icon: '🏰', color: '#475569', description: 'Prefix trees for efficient autocomplete & dictionary search.', skillsUnlocked: 1, totalSkills: 6, skills: [], currentQuest: { title: 'Prefix Tree Autocomplete', difficulty: 'Medium', description: 'Build Trie structure.', objectives: [], xpReward: 500, coinReward: 100, badgeReward: 'Trie Architect' }, boss: { title: 'The Lexicon Dragon', description: 'Defeat the Dragon.', xpReward: 2600, coinReward: 500, badgeReward: 'Dragon Master' } },
  { id: 22, slug: 'union-find', name: 'Union Find', progressPct: 10, status: 'completed', icon: '🛡️', color: '#475569', description: 'Disjoint set data structure for dynamic connectivity.', skillsUnlocked: 1, totalSkills: 6, skills: [], currentQuest: { title: 'Path Compression Union', difficulty: 'Medium', description: 'Rank & path compression.', objectives: [], xpReward: 520, coinReward: 100, badgeReward: 'Disjoint Master' }, boss: { title: 'The Connectivity Golem', description: 'Defeat the Golem.', xpReward: 2700, coinReward: 520, badgeReward: 'Golem Badge' } },
  { id: 23, slug: 'bit-manipulation', name: 'Bit Manipulation', progressPct: 5, status: 'completed', icon: '⚡', color: '#475569', description: 'Low-level bitwise operations and binary hacks.', skillsUnlocked: 1, totalSkills: 6, skills: [], currentQuest: { title: 'Bitwise XOR Tricks', difficulty: 'Easy', description: 'Single Number finding.', objectives: [], xpReward: 350, coinReward: 70, badgeReward: 'Bit Hacker' }, boss: { title: 'The Binary Cipher', description: 'Defeat the Cipher.', xpReward: 2000, coinReward: 400, badgeReward: 'Cipher Master' } },
  { id: 24, slug: 'system-design', name: 'System Design', progressPct: 0, status: 'completed', icon: '🏗️', color: '#38BDF8', description: 'High scale distributed architecture and system components.', skillsUnlocked: 0, totalSkills: 10, skills: [], currentQuest: { title: 'URL Shortener Architecture', difficulty: 'Hard', description: 'Design scaled system.', objectives: [], xpReward: 1000, coinReward: 250, badgeReward: 'System Architect' }, boss: { title: 'The Distributed Titan', description: 'Defeat the Titan.', xpReward: 5000, coinReward: 1000, badgeReward: 'Architect Grandmaster' } },
  { id: 25, slug: 'game-theory', name: 'Game Theory', progressPct: 0, status: 'completed', icon: '♟️', color: '#C084FC', description: 'Minimax, Nim games, and optimal strategy theory.', skillsUnlocked: 0, totalSkills: 6, skills: [], currentQuest: { title: 'Nim Game Strategy', difficulty: 'Medium', description: 'Winning state evaluation.', objectives: [], xpReward: 600, coinReward: 120, badgeReward: 'Strategist' }, boss: { title: 'The Grandmaster AI', description: 'Defeat the Grandmaster AI.', xpReward: 3000, coinReward: 600, badgeReward: 'Grandmaster Badge' } },
];

export const RECOMMENDED_MISSIONS = [
  { id: 'm1', title: 'Maximum Subarray', difficulty: 'Easy', xp: 100, coins: 20, slug: 'maximum-subarray' },
  { id: 'm2', title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', xp: 100, coins: 20, slug: 'best-time-to-buy-and-sell-stock' },
  { id: 'm3', title: 'Product of Array Except Self', difficulty: 'Medium', xp: 250, coins: 40, slug: 'product-of-array-except-self' },
  { id: 'm4', title: 'Longest Substring Without Repeating', difficulty: 'Medium', xp: 250, coins: 40, slug: 'longest-substring-without-repeating-characters' },
  { id: 'm5', title: 'Subarray Sum Equals K', difficulty: 'Hard', xp: 400, coins: 60, slug: 'subarray-sum-equals-k' },
];
