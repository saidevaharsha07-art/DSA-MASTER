/**
 * CodeChef Rating Arena Repository
 * High-performance repository loading, filtering, and persisting user progress for CodeChef rating problems.
 */

import {
  CodeChefRatingProblem,
  RatingBucketKey,
  RatingBucketConfig,
  RatingBucketStats,
  RatingArenaFilterOptions,
} from '@/src/types/codechef-arena';
import { ProblemModel, Difficulty, ProgressionLevel, FrequencyLevel } from '../types';
import { codechefProblems } from '@/src/features/codechef/data/codechef_excel_db';

export const RATING_BUCKET_CONFIGS: ReadonlyArray<RatingBucketConfig> = [
  {
    key: '500',
    label: '< 500 Rating',
    subtext: 'Beginner Novice Division',
    minRating: 0,
    maxRating: 499,
    recommendedLevel: 'Div 4 / Beginner',
    color: 'emerald',
    gradient: 'from-emerald-900/60 to-emerald-950/80',
    borderColor: 'border-emerald-500/40',
    icon: '🌱',
  },
  {
    key: '500-1000',
    label: '500 – 1000 Rating',
    subtext: 'Basic Fundamentals Division',
    minRating: 500,
    maxRating: 999,
    recommendedLevel: 'Div 4 / 1-Star Candidate',
    color: 'cyan',
    gradient: 'from-cyan-900/60 to-cyan-950/80',
    borderColor: 'border-cyan-500/40',
    icon: '⚔️',
  },
  {
    key: '1000-1400',
    label: '1000 – 1400 Rating',
    subtext: '1-Star Competitor',
    minRating: 1000,
    maxRating: 1399,
    recommendedLevel: 'Div 3 / 1-Star',
    color: 'sky',
    gradient: 'from-sky-900/60 to-sky-950/80',
    borderColor: 'border-sky-500/40',
    icon: '⭐',
  },
  {
    key: '1400-1600',
    label: '1400 – 1600 Rating',
    subtext: '2-Star Specialist',
    minRating: 1400,
    maxRating: 1599,
    recommendedLevel: 'Div 3 / 2-Star',
    color: 'indigo',
    gradient: 'from-indigo-900/60 to-indigo-950/80',
    borderColor: 'border-indigo-500/40',
    icon: '⭐⭐',
  },
  {
    key: '1600-1800',
    label: '1600 – 1800 Rating',
    subtext: '3-Star Expert',
    minRating: 1600,
    maxRating: 1799,
    recommendedLevel: 'Div 2 / 3-Star',
    color: 'purple',
    gradient: 'from-purple-900/60 to-purple-950/80',
    borderColor: 'border-purple-500/40',
    icon: '⭐⭐⭐',
  },
  {
    key: '1800-2000',
    label: '1800 – 2000 Rating',
    subtext: '4-Star Candidate Master',
    minRating: 1800,
    maxRating: 1999,
    recommendedLevel: 'Div 2 / 4-Star',
    color: 'amber',
    gradient: 'from-amber-900/60 to-amber-950/80',
    borderColor: 'border-amber-500/40',
    icon: '👑',
  },
  {
    key: '2000-2500',
    label: '2000 – 2500 Rating',
    subtext: '5-Star Master Realm',
    minRating: 2000,
    maxRating: 2500,
    recommendedLevel: 'Div 1 / 5-Star Master',
    color: 'rose',
    gradient: 'from-rose-900/60 to-rose-950/80',
    borderColor: 'border-rose-500/40',
    icon: '🔥',
  },
];

export class CodeChefRatingRepository {
  private static allProblemsCache: CodeChefRatingProblem[] | null = null;

  public static getAllProblems(): CodeChefRatingProblem[] {
    if (!this.allProblemsCache) {
      const list = Object.values(codechefProblems);
      this.allProblemsCache = list.map((p) => {
        let ratingRange: RatingBucketKey = '500';
        if (p.rating >= 2000) ratingRange = '2000-2500';
        else if (p.rating >= 1800) ratingRange = '1800-2000';
        else if (p.rating >= 1600) ratingRange = '1600-1800';
        else if (p.rating >= 1400) ratingRange = '1400-1600';
        else if (p.rating >= 1000) ratingRange = '1000-1400';
        else if (p.rating >= 500) ratingRange = '500-1000';

        return {
          id: p.code,
          problemCode: p.code,
          title: p.title,
          difficulty: p.rating,
          ratingRange,
          url: p.url,
          tags: p.topics,
          kingdom: p.kingdomName,
          pattern: p.patternName,
          estimatedTime: p.estimatedTime,
          status: (p.status as any) || 'Unsolved',
          attempts: 0,
          accuracy: 60,
          xp: p.xp,
          notes: p.notes,
        };
      });
    }
    return this.allProblemsCache;
  }

  public static getProblemsByBucket(bucketKey: RatingBucketKey): CodeChefRatingProblem[] {
    const all = this.getAllProblems();
    return all.filter((p) => p.ratingRange === bucketKey);
  }



  public static filterProblems(options: RatingArenaFilterOptions): CodeChefRatingProblem[] {
    let list = options.ratingRange && options.ratingRange !== 'ALL'
      ? this.getProblemsByBucket(options.ratingRange)
      : this.getAllProblems();

    // Query Filter
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.problemCode.toLowerCase().includes(q) ||
          p.kingdom.toLowerCase().includes(q) ||
          p.pattern.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Tag Filter
    if (options.selectedTag && options.selectedTag !== 'ALL') {
      const tag = options.selectedTag.toLowerCase();
      list = list.filter((p) => p.tags.some((t) => t.toLowerCase() === tag));
    }

    // Kingdom Filter
    if (options.selectedKingdom && options.selectedKingdom !== 'ALL') {
      list = list.filter((p) => p.kingdom.toLowerCase() === options.selectedKingdom?.toLowerCase());
    }

    // Pattern Filter
    if (options.selectedPattern && options.selectedPattern !== 'ALL') {
      list = list.filter((p) => p.pattern.toLowerCase() === options.selectedPattern?.toLowerCase());
    }

    // Status Filter
    if (options.statusFilter && options.statusFilter !== 'ALL') {
      if (options.statusFilter === 'Favorites') {
        list = list.filter((p) => p.favorite === true);
      } else {
        list = list.filter((p) => p.status === options.statusFilter);
      }
    }

    // Sorting
    if (options.sortBy) {
      switch (options.sortBy) {
        case 'DifficultyAsc':
          list = [...list].sort((a, b) => a.difficulty - b.difficulty);
          break;
        case 'DifficultyDesc':
          list = [...list].sort((a, b) => b.difficulty - a.difficulty);
          break;
        case 'Alphabetical':
          list = [...list].sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'Accuracy':
          list = [...list].sort((a, b) => b.accuracy - a.accuracy);
          break;
        case 'Newest':
        default:
          break;
      }
    }

    return list;
  }

  public static getBucketStats(bucketKey: RatingBucketKey, userState: Record<string, { status: string; favorite: boolean }>): RatingBucketStats {
    const problems = this.getProblemsByBucket(bucketKey);
    let solvedCount = 0;
    let attemptedCount = 0;

    problems.forEach((p) => {
      const st = userState[p.id]?.status || p.status;
      if (st === 'Solved') solvedCount++;
      else if (st === 'Attempted') attemptedCount++;
    });

    const totalProblems = problems.length;
    const completionPercentage = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;
    const remainingCount = totalProblems - solvedCount;
    const totalEstMins = problems.reduce((acc, curr) => acc + (curr.estimatedTime || 30), 0);
    const estimatedHours = Math.round(totalEstMins / 60);

    return {
      key: bucketKey,
      totalProblems,
      solvedCount,
      attemptedCount,
      completionPercentage,
      remainingCount,
      estimatedHours,
      masteryScore: Math.min(100, Math.round(completionPercentage * 1.1)),
    };
  }

  public static getAllTags(): string[] {
    const set = new Set<string>();
    this.getAllProblems().forEach((p) => {
      p.tags.forEach((t) => set.add(t.toLowerCase()));
    });
    return Array.from(set).sort();
  }

  public static getAllKingdoms(): string[] {
    const set = new Set<string>();
    this.getAllProblems().forEach((p) => set.add(p.kingdom));
    return Array.from(set).sort();
  }

  public static getAllPatterns(): string[] {
    const set = new Set<string>();
    this.getAllProblems().forEach((p) => set.add(p.pattern));
    return Array.from(set).sort();
  }
}

function mapCategorySlug(kingdom: string): string {
  const k = (kingdom || '').toUpperCase();
  if (k === 'ARRAYS' || k.includes('ARRAY')) return 'basic-arrays';
  if (k.includes('PREFIX')) return 'prefix-sum';
  if (k.includes('TWO POINTERS')) return 'two-pointers';
  if (k.includes('BINARY SEARCH')) return 'binary-search';
  if (k.includes('SORTING')) return 'sorting';
  if (k.includes('STRING')) return 'strings';
  if (k.includes('BIT MANIPULATION')) return 'bit-manipulation';
  if (k.includes('MATHEMATICS') || k.includes('NUMBER THEORY') || k.includes('MATH')) return 'math-number-theory';
  if (k.includes('RECURSION') || k.includes('BACKTRACKING')) return 'backtracking';
  if (k.includes('STACK')) return 'stack';
  if (k.includes('QUEUE') || k.includes('DEQUE')) return 'queue-deque';
  if (k.includes('LINKED LIST')) return 'linked-list';
  if (k === 'TREES' || (k.includes('TREE') && !k.includes('SEGMENT') && !k.includes('FENWICK'))) return 'binary-trees';
  if (k.includes('GRAPH') || k.includes('DFS') || k.includes('BFS')) return 'graphs';
  if (k.includes('SHORTEST PATH')) return 'shortest-path';
  if (k.includes('MINIMUM SPANNING') || k.includes('DSU')) return 'minimum-spanning-tree';
  if (k.includes('DYNAMIC PROGRAMMING') || k.includes('DP')) return 'dynamic-programming';
  return 'basic-arrays';
}

function mapDifficulty(rating: number): Difficulty {
  if (rating < 1000) return 'Easy';
  if (rating < 1600) return 'Medium';
  return 'Hard';
}

function mapLevel(rating: number): ProgressionLevel {
  if (rating <= 1000) return 'Learn';
  if (rating <= 1600) return 'Practice';
  return 'Master';
}

function mapFrequency(rating: number): FrequencyLevel {
  if (rating >= 1500) return 'High';
  if (rating >= 1000) return 'Medium';
  return 'Low';
}

export const CODECHEF_PROBLEM_MODELS: ProblemModel[] = CodeChefRatingRepository.getAllProblems().map((cc, idx) => {
  const categorySlug = mapCategorySlug(cc.kingdom);
  const diff = mapDifficulty(cc.difficulty);
  const level = mapLevel(cc.difficulty);
  const freq = mapFrequency(cc.difficulty);
  const code = (cc.problemCode || cc.id).toLowerCase();

  return {
    id: `cc-${code}`,
    slug: `cc-${code}`,
    leetcodeNumber: 150000 + idx + 1,
    title: cc.title,
    difficulty: diff,
    level: level,
    frequency: freq,
    estimatedTimeMin: cc.estimatedTime || 30,
    xp: cc.xp || 25,
    acceptanceRate: cc.accuracy || 60.0,
    isPremium: false,
    topics: cc.tags && cc.tags.length > 0 ? cc.tags : [cc.kingdom || 'Arrays'],
    companies: [cc.company || 'General Tech'],
    url: cc.url || `https://www.codechef.com/problems/${cc.problemCode || cc.id}`,
    notes: cc.notes || `CodeChef Rating: ${cc.difficulty} | Range: ${cc.ratingRange}`,
    categoryId: `cat-${categorySlug}`,
    categorySlug: categorySlug,
    categoryTitle: cc.kingdom || 'Kingdom of Arrays',
    patternId: `pattern-cc-${code}`,
    patternSlug: (cc.pattern || 'array-traversal').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    patternTitle: cc.pattern || 'Basic Traversal',
    questTitle: cc.pattern || 'Basic Traversal',
    kingdomTitle: cc.kingdom || 'Kingdom of Arrays',
  };
});
