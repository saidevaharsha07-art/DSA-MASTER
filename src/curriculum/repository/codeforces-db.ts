import codeforcesData from '@/src/data/codeforces.json';
import { ProblemModel, Difficulty, ProgressionLevel, FrequencyLevel } from '../types';

export interface CodeforcesRawProblem {
  id: string;
  contestId: number | string;
  index: string;
  title: string;
  kingdom: string;
  pattern: string;
  rating: number | 'UNKNOWN';
  difficulty: string;
  tags: string[];
  estimatedTime: number;
  xp: number;
  url: string;
  notes: string;
  status: string;
  platform: string;
}

export const CODEFORCES_RAW_PROBLEMS = codeforcesData as CodeforcesRawProblem[];

function mapCategorySlug(kingdom: string): string {
  const k = kingdom.toUpperCase();
  if (k === 'ARRAYS' || k.includes('ARRAYS')) return 'basic-arrays';
  if (k.includes('PREFIX')) return 'prefix-sum';
  if (k.includes('TWO POINTERS')) return 'two-pointers';
  if (k.includes('BINARY SEARCH')) return 'binary-search';
  if (k.includes('SORTING')) return 'sorting';
  if (k.includes('STRINGS')) return 'strings';
  if (k.includes('BIT MANIPULATION')) return 'bit-manipulation';
  if (k.includes('MATHEMATICS') || k.includes('NUMBER THEORY')) return 'math-number-theory';
  if (k.includes('RECURSION') || k.includes('BACKTRACKING')) return 'backtracking';
  if (k.includes('STACK')) return 'stack';
  if (k.includes('QUEUE') || k.includes('DEQUE')) return 'queue-deque';
  if (k.includes('LINKED LIST')) return 'linked-list';
  if (k === 'TREES' || (k.includes('TREES') && !k.includes('SEGMENT') && !k.includes('FENWICK'))) return 'binary-trees';
  if (k.includes('GRAPH TRAVERSAL') || k.includes('DFS') || k.includes('BFS')) return 'graphs';
  if (k.includes('SHORTEST PATHS')) return 'shortest-path';
  if (k.includes('MINIMUM SPANNING') || k.includes('DSU')) return 'minimum-spanning-tree';
  if (k.includes('DYNAMIC PROGRAMMING')) return 'dynamic-programming';
  return 'advanced-algorithms';
}

function mapDifficulty(diffStr: string): Difficulty {
  const d = diffStr.toLowerCase();
  if (d.includes('easy')) return 'Easy';
  if (d.includes('medium')) return 'Medium';
  return 'Hard';
}

function mapLevel(rating: number | 'UNKNOWN'): ProgressionLevel {
  if (typeof rating === 'number') {
    if (rating <= 1000) return 'Learn';
    if (rating <= 1500) return 'Practice';
    return 'Master';
  }
  return 'Learn';
}

function mapFrequency(rating: number | 'UNKNOWN'): FrequencyLevel {
  if (typeof rating === 'number') {
    if (rating >= 1400) return 'High';
    if (rating >= 1100) return 'Medium';
    return 'Low';
  }
  return 'Medium';
}

export const CODEFORCES_PROBLEM_MODELS: ProblemModel[] = CODEFORCES_RAW_PROBLEMS.map((cf, idx) => {
  const categorySlug = mapCategorySlug(cf.kingdom);
  const diff = mapDifficulty(cf.difficulty);
  const level = mapLevel(cf.rating);
  const freq = mapFrequency(cf.rating);

  return {
    id: `cf-${cf.id.toLowerCase()}`,
    slug: `cf-${cf.id.toLowerCase()}`,
    leetcodeNumber: 90000 + idx + 1,
    title: cf.title,
    difficulty: diff,
    level: level,
    frequency: freq,
    estimatedTimeMin: cf.estimatedTime,
    xp: cf.xp,
    acceptanceRate: 50.0,
    isPremium: false,
    topics: cf.tags.length > 0 ? cf.tags : ['Implementation'],
    companies: ['N/A'],
    url: cf.url,
    notes: cf.notes || `Contest ${cf.contestId}${cf.index} | Rating: ${cf.rating}`,
    categoryId: `cat-${categorySlug}`,
    categorySlug: categorySlug,
    categoryTitle: cf.kingdom,
    patternId: `pattern-cf-${cf.id.toLowerCase()}`,
    patternSlug: cf.pattern.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    patternTitle: cf.pattern,
    questTitle: cf.pattern,
    kingdomTitle: cf.kingdom,
  };
});
