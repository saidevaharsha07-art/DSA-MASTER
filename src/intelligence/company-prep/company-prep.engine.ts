/**
 * Phase 4F — Company Preparation Engine
 * Tailored interview preparation roadmaps and readiness gap analysis for tier-1 tech companies:
 * Google, Meta, Amazon, Microsoft, Apple, Netflix, Uber, Adobe, Atlassian, Flipkart, Goldman Sachs, Oracle, Walmart, Bloomberg.
 */

export interface CompanyPrepProfile {
  companyId: string;
  companyName: string;
  logoIcon: string;
  requiredPatterns: string[];
  difficultyHistogram: { easyPercent: number; mediumPercent: number; hardPercent: number };
  expectedTopics: string[];
  estimatedReadinessPercent: number; // e.g. 84%
  criticalGaps: string[];
}

export class CompanyPrepEngine {
  private companies: Map<string, CompanyPrepProfile> = new Map();

  constructor() {
    this.seedCompanyProfiles();
  }

  private seedCompanyProfiles(): void {
    const data: CompanyPrepProfile[] = [
      {
        companyId: 'google',
        companyName: 'Google',
        logoIcon: '🔍',
        requiredPatterns: ['Sliding Window', 'Graph Shortest Path', 'Segment Trees', 'Trie'],
        difficultyHistogram: { easyPercent: 10, mediumPercent: 60, hardPercent: 30 },
        expectedTopics: ['Arrays', 'Trees', 'Graphs', 'Dynamic Programming'],
        estimatedReadinessPercent: 78,
        criticalGaps: ['Segment Trees', 'Dynamic Programming on Trees'],
      },
      {
        companyId: 'meta',
        companyName: 'Meta',
        logoIcon: '♾️',
        requiredPatterns: ['Two Pointers', 'Binary Search', 'BFS/DFS Traversal'],
        difficultyHistogram: { easyPercent: 20, mediumPercent: 65, hardPercent: 15 },
        expectedTopics: ['Arrays', 'Strings', 'Trees', 'Recursion'],
        estimatedReadinessPercent: 88,
        criticalGaps: ['Trie Matching'],
      },
      {
        companyId: 'amazon',
        companyName: 'Amazon',
        logoIcon: '📦',
        requiredPatterns: ['Topological Sort', 'Monotonic Stack', 'Priority Queue (Heaps)'],
        difficultyHistogram: { easyPercent: 25, mediumPercent: 60, hardPercent: 15 },
        expectedTopics: ['Arrays', 'Heaps', 'Strings', 'Design'],
        estimatedReadinessPercent: 91,
        criticalGaps: [],
      },
      {
        companyId: 'microsoft',
        companyName: 'Microsoft',
        logoIcon: '🪟',
        requiredPatterns: ['Linked List Manipulation', 'Tree Depth First Search', 'Matrix Traversal'],
        difficultyHistogram: { easyPercent: 30, mediumPercent: 60, hardPercent: 10 },
        expectedTopics: ['Linked Lists', 'Trees', 'Arrays'],
        estimatedReadinessPercent: 94,
        criticalGaps: [],
      },
    ];

    data.forEach((c) => this.companies.set(c.companyId, c));
  }

  public getCompanyProfile(companyId: string): CompanyPrepProfile | undefined {
    return this.companies.get(companyId);
  }

  public getAllCompanies(): CompanyPrepProfile[] {
    return Array.from(this.companies.values());
  }
}
