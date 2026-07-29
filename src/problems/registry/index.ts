import { ProblemModel } from '../models';

export const LEETCODE_PROBLEMS: ProblemModel[] = [
  {
    id: 'two-sum',
    leetcodeNumber: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    kingdom: 'Arrays',
    pattern: 'Hashing',
    functionDefinition: {
      name: 'twoSum',
      parameters: [
        { name: 'nums', type: 'array<number>' },
        { name: 'target', type: 'number' },
      ],
      returnType: 'array<number>',
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expectedOutput: [0, 1], explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: [[3, 2, 4], 6], expectedOutput: [1, 2], explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
    ],
    metadata: {
      topics: ['Array', 'Hash Table'],
      pattern: 'Hashing',
      kingdom: 'Arrays',
      companies: ['Google', 'Amazon', 'Microsoft', 'Meta'],
      frequency: 98,
      nextProblems: ['3sum', '4sum'],
    },
  },
  {
    id: 'contains-duplicate',
    leetcodeNumber: 217,
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    kingdom: 'Arrays',
    pattern: 'Hashing',
    functionDefinition: {
      name: 'containsDuplicate',
      parameters: [{ name: 'nums', type: 'array<number>' }],
      returnType: 'boolean',
    },
    testCases: [
      { input: [[1, 2, 3, 1]], expectedOutput: true },
      { input: [[1, 2, 3, 4]], expectedOutput: false },
    ],
    metadata: {
      topics: ['Array', 'Hash Table'],
      pattern: 'Hashing',
      kingdom: 'Arrays',
      companies: ['Apple', 'Adobe'],
      frequency: 85,
    },
  },
];

class ProblemRegistryService {
  public getAllProblems(): ProblemModel[] {
    return LEETCODE_PROBLEMS;
  }

  public getProblemById(id: string): ProblemModel | null {
    return LEETCODE_PROBLEMS.find((p) => p.id === id || p.leetcodeNumber === Number(id)) || LEETCODE_PROBLEMS[0];
  }

  public searchProblems(query: string, filters?: { difficulty?: string; kingdom?: string; company?: string }): ProblemModel[] {
    const q = query.toLowerCase().trim();
    return LEETCODE_PROBLEMS.filter((p) => {
      if (q && !p.title.toLowerCase().includes(q) && !p.pattern.toLowerCase().includes(q) && !p.kingdom.toLowerCase().includes(q) && String(p.leetcodeNumber) !== q) {
        return false;
      }
      if (filters?.difficulty && p.difficulty !== filters.difficulty) return false;
      if (filters?.kingdom && p.kingdom.toLowerCase() !== filters.kingdom.toLowerCase()) return false;
      if (filters?.company && !p.metadata.companies.includes(filters.company)) return false;
      return true;
    });
  }
}

export const problemRegistryService = new ProblemRegistryService();
