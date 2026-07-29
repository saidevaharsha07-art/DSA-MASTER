export interface CompanyTrack {
  id: string;
  name: string;
  logo: string;
  description: string;
  frequentlyAskedCount: number;
  topPatterns: string[];
  estimatedPrepWeeks: number;
  difficultyBreakdown: { easy: number; medium: number; hard: number };
}

export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    id: 'google',
    name: 'Google SDE Prep',
    logo: '/images/companies/google.png',
    description: 'Master Graph Algorithms, Sliding Window, DP, and Complex Trees for Google Software Engineering interviews.',
    frequentlyAskedCount: 150,
    topPatterns: ['Graph BFS/DFS', 'Sliding Window', 'Dynamic Programming', 'Trie'],
    estimatedPrepWeeks: 12,
    difficultyBreakdown: { easy: 15, medium: 55, hard: 30 },
  },
  {
    id: 'amazon',
    name: 'Amazon SDE Prep',
    logo: '/images/companies/amazon.png',
    description: 'Focused on Hash Tables, Two Pointers, Trees, PriorityQueues, and Amazon Leadership Principles.',
    frequentlyAskedCount: 180,
    topPatterns: ['Hash Maps', 'Top K Elements', 'Trees', 'BFS Matrix'],
    estimatedPrepWeeks: 10,
    difficultyBreakdown: { easy: 25, medium: 60, hard: 15 },
  },
  {
    id: 'microsoft',
    name: 'Microsoft SDE Prep',
    logo: '/images/companies/microsoft.png',
    description: 'Arrays, String Manipulation, Linked Lists, Binary Search, and System Design fundamentals.',
    frequentlyAskedCount: 140,
    topPatterns: ['Array Fundamentals', 'Linked List Traversal', 'Binary Search'],
    estimatedPrepWeeks: 8,
    difficultyBreakdown: { easy: 30, medium: 55, hard: 15 },
  },
];

class CompanyPrepService {
  public getCompanyTracks(): CompanyTrack[] {
    return COMPANY_TRACKS;
  }
}

export const companyPrepService = new CompanyPrepService();
