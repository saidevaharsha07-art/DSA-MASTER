export interface WorldInfo {
  id: number;
  name: string;
  biome: string;
  boss: string;
  themeColor: string;
  background: string;
  x: number;
  y: number;
  rewardXp: number;
  pathType: 'stone' | 'trail' | 'bridge' | 'river' | 'portal' | 'mountain' | 'desert' | 'galaxy' | 'swamp';
  decorationEmoji: string;
}

export const worlds: Record<number, WorldInfo> = {
  1: {
    id: 1,
    name: 'Valley of Origins',
    biome: 'Basic Programming',
    boss: 'Syntax Master',
    themeColor: '#10b981', // Emerald green
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 65%)',
    x: 200,
    y: 200,
    rewardXp: 100,
    pathType: 'trail',
    decorationEmoji: '🌱'
  },
  2: {
    id: 2,
    name: 'Number Hills',
    biome: 'Basic Maths',
    boss: 'Prime Divisor',
    themeColor: '#3b82f6', // Bright Blue
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 65%)',
    x: 500,
    y: 180,
    rewardXp: 150,
    pathType: 'stone',
    decorationEmoji: '⛰️'
  },
  3: {
    id: 3,
    name: 'Recursion Forest',
    biome: 'Recursion',
    boss: 'Recursion Loop',
    themeColor: '#059669', // Deep Forest green
    background: 'radial-gradient(circle, rgba(5, 150, 105, 0.12) 0%, transparent 65%)',
    x: 800,
    y: 220,
    rewardXp: 200,
    pathType: 'trail',
    decorationEmoji: '🌲'
  },
  4: {
    id: 4,
    name: 'Array Valley',
    biome: 'Arrays',
    boss: 'Vector Colossus',
    themeColor: '#8b5cf6', // Violet
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 65%)',
    x: 1100,
    y: 160,
    rewardXp: 250,
    pathType: 'bridge',
    decorationEmoji: '🪵'
  },
  5: {
    id: 5,
    name: 'Hash Forest',
    biome: 'Hashing (Boss)',
    boss: 'Collision Overlord',
    themeColor: '#eab308', // Amber Gold
    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, transparent 65%)',
    x: 1400,
    y: 200,
    rewardXp: 300,
    pathType: 'portal',
    decorationEmoji: '✨'
  },
  6: {
    id: 6,
    name: 'Sliding River',
    biome: 'Sliding Window',
    boss: 'Subarray Seeker',
    themeColor: '#0ea5e9', // Sky blue
    background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 65%)',
    x: 1400,
    y: 480,
    rewardXp: 350,
    pathType: 'river',
    decorationEmoji: '🌊'
  },
  7: {
    id: 7,
    name: 'Two Pointer Mountains',
    biome: 'Two Pointers',
    boss: 'Binary Pivot',
    themeColor: '#6366f1', // Indigo
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%)',
    x: 1100,
    y: 520,
    rewardXp: 400,
    pathType: 'mountain',
    decorationEmoji: '🏔️'
  },
  8: {
    id: 8,
    name: 'Prefix Plains',
    biome: 'Prefix Sum',
    boss: 'Accumulation Guardian',
    themeColor: '#f97316', // Orange
    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 65%)',
    x: 800,
    y: 460,
    rewardXp: 450,
    pathType: 'trail',
    decorationEmoji: '🌾'
  },
  9: {
    id: 9,
    name: 'Binary Search Canyon',
    biome: 'Binary Search',
    boss: 'Logarithmic Divide',
    themeColor: '#ec4899', // Pink
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 65%)',
    x: 500,
    y: 500,
    rewardXp: 500,
    pathType: 'desert',
    decorationEmoji: '🏜️'
  },
  10: {
    id: 10,
    name: 'String City',
    biome: 'Strings (Boss)',
    boss: 'Regex Titan',
    themeColor: '#3b82f6', // Blue
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 65%)',
    x: 200,
    y: 460,
    rewardXp: 550,
    pathType: 'stone',
    decorationEmoji: '🏙️'
  },
  11: {
    id: 11,
    name: 'Linked Lake',
    biome: 'Linked List',
    boss: 'Pointer Weaver',
    themeColor: '#14b8a6', // Teal
    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 65%)',
    x: 200,
    y: 780,
    rewardXp: 600,
    pathType: 'bridge',
    decorationEmoji: '🛶'
  },
  12: {
    id: 12,
    name: 'Stack Volcano',
    biome: 'Stacks',
    boss: 'LIFO Monolith',
    themeColor: '#ef4444', // Red
    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 65%)',
    x: 500,
    y: 820,
    rewardXp: 650,
    pathType: 'mountain',
    decorationEmoji: '🌋'
  },
  13: {
    id: 13,
    name: 'Queue Harbor',
    biome: 'Queues',
    boss: 'FIFO Dispatcher',
    themeColor: '#06b6d4', // Cyan
    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 65%)',
    x: 800,
    y: 760,
    rewardXp: 700,
    pathType: 'river',
    decorationEmoji: '⚓'
  },
  14: {
    id: 14,
    name: 'Tree Kingdom',
    biome: 'Trees',
    boss: 'Root Arbiter',
    themeColor: '#10b981', // Green
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 65%)',
    x: 1100,
    y: 800,
    rewardXp: 800,
    pathType: 'trail',
    decorationEmoji: '👑'
  },
  15: {
    id: 15,
    name: 'BST Castle',
    biome: 'BST (Boss)',
    boss: 'Balance Keeper',
    themeColor: '#eab308', // Gold
    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, transparent 65%)',
    x: 1400,
    y: 780,
    rewardXp: 900,
    pathType: 'portal',
    decorationEmoji: '🏰'
  },
  16: {
    id: 16,
    name: 'Heap Mine',
    biome: 'Heaps',
    boss: 'Priority Miner',
    themeColor: '#f97316', // Orange
    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 65%)',
    x: 1400,
    y: 1100,
    rewardXp: 1000,
    pathType: 'mountain',
    decorationEmoji: '💎'
  },
  17: {
    id: 17,
    name: 'Greedy Desert',
    biome: 'Greedy',
    boss: 'Optimal Thief',
    themeColor: '#ec4899', // Pink
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 65%)',
    x: 1100,
    y: 1140,
    rewardXp: 1100,
    pathType: 'desert',
    decorationEmoji: '🐫'
  },
  18: {
    id: 18,
    name: 'Graph Empire',
    biome: 'Graphs',
    boss: 'Path Finder',
    themeColor: '#6366f1', // Indigo
    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%)',
    x: 800,
    y: 1080,
    rewardXp: 1200,
    pathType: 'stone',
    decorationEmoji: '🕸️'
  },
  19: {
    id: 19,
    name: 'Backtracking Jungle',
    biome: 'Backtracking',
    boss: 'Pruner Sentinel',
    themeColor: '#10b981', // Green
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 65%)',
    x: 500,
    y: 1120,
    rewardXp: 1300,
    pathType: 'trail',
    decorationEmoji: '🌴'
  },
  20: {
    id: 20,
    name: 'DP Temple',
    biome: 'Dynamic Programming (Boss)',
    boss: 'Memoization Mage',
    themeColor: '#f43f5e', // Rose
    background: 'radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, transparent 75%)',
    x: 200,
    y: 1080,
    rewardXp: 1500,
    pathType: 'portal',
    decorationEmoji: '⛩️'
  },
  21: {
    id: 21,
    name: 'Bit Caverns',
    biome: 'Bit Manipulation',
    boss: 'Binary Masker',
    themeColor: '#14b8a6', // Teal
    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 65%)',
    x: 200,
    y: 1400,
    rewardXp: 1600,
    pathType: 'mountain',
    decorationEmoji: '🔮'
  },
  22: {
    id: 22,
    name: 'Advanced Citadel',
    biome: 'Advanced Data Structures',
    boss: 'Trie Archmage',
    themeColor: '#3b82f6', // Blue
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 65%)',
    x: 500,
    y: 1440,
    rewardXp: 1800,
    pathType: 'bridge',
    decorationEmoji: '🗼'
  },
  23: {
    id: 23,
    name: 'Algorithm Galaxy',
    biome: 'Advanced Algorithms',
    boss: 'Fourier Master',
    themeColor: '#a855f7', // Purple
    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 65%)',
    x: 800,
    y: 1380,
    rewardXp: 2000,
    pathType: 'portal',
    decorationEmoji: '☄️'
  },
  24: {
    id: 24,
    name: 'Interview Arena',
    biome: 'Interview Arena',
    boss: 'FAANG Reviewer',
    themeColor: '#f43f5e', // Rose
    background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, transparent 65%)',
    x: 1100,
    y: 1420,
    rewardXp: 2500,
    pathType: 'bridge',
    decorationEmoji: '⚔️'
  },
  25: {
    id: 25,
    name: 'Grand Master Galaxy',
    biome: 'Grand Master (Final Boss)',
    boss: 'Platform Overlord',
    themeColor: '#f59e0b', // Gold
    background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 80%)',
    x: 1400,
    y: 1400,
    rewardXp: 5000,
    pathType: 'portal',
    decorationEmoji: '🌌'
  }
};
