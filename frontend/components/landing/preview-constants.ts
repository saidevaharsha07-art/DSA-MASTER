/**
 * LANDING PAGE SAMPLE / PREVIEW DATA
 * 
 * IMPORTANT:
 * These constants are strictly read-only UI illustrations for the public landing page.
 * They are NEVER written to Supabase, localStorage, user profiles, or analytics state.
 * They do not represent platform-wide statistics or real user achievements.
 */

export const LANDING_PREVIEW_DATA = {
  // Hero IDE Preview Sample Data
  heroIde: {
    streakDays: 12,
    xpPoints: 850,
    problemTitle: 'Two Sum',
    problemDifficulty: 'Easy',
    problemTags: ['Array', 'Hash Map'],
    acceptanceRate: '79.3%',
    sampleCodeLanguage: 'Java',
  },

  // Practice Section Preview Sample Data
  practice: {
    solvedCount: 248,
    totalCount: 365,
    progressPercentage: 68,
    weeklyActivity: [
      { day: 'Mon', percentage: 40 },
      { day: 'Tue', percentage: 70 },
      { day: 'Wed', percentage: 55 },
      { day: 'Thu', percentage: 90 },
      { day: 'Fri', percentage: 60 },
      { day: 'Sat', percentage: 85 },
      { day: 'Sun', percentage: 45 },
    ],
    sampleProblems: [
      { title: 'Two Sum', diff: 'Easy', diffColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', rate: '79.3%' },
      { title: 'Valid Parentheses', diff: 'Easy', diffColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', rate: '72.1%' },
      { title: 'Merge Two Sorted Lists', diff: 'Easy', diffColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', rate: '68.4%' },
      { title: 'Maximum Subarray', diff: 'Medium', diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', rate: '62.3%' },
      { title: 'Longest Substring Without Repeating Characters', diff: 'Medium', diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', rate: '58.1%' },
      { title: 'Container With Most Water', diff: 'Medium', diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', rate: '56.7%' },
      { title: '3Sum', diff: 'Medium', diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20', rate: '54.2%' },
    ],
  },

  // Analytics Card Preview Sample Data
  analytics: {
    streakDays: 12,
    totalXp: 2450,
    activityHistogram: [30, 50, 45, 80, 60, 95, 70, 85, 90, 65, 100, 75],
  },

  // AI Mentor Card Preview Sample Data
  mentor: {
    mentorName: 'DSA Mentor',
    recommendedProblem: 'Binary Tree Inorder Traversal',
    recommendedDifficulty: 'Medium',
    recommendedFocus: 'Tree traversal, recursion',
  },

  // Revision Card Preview Sample Data
  revision: {
    dueForReview: 12,
    atRisk: 5,
    good: 28,
    mastered: 42,
  },
} as const;
