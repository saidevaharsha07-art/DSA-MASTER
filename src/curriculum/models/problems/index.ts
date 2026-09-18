import { ProblemModel } from '../../types';
import { BASIC_ARRAYS_PROBLEMS } from './basic-arrays';
import { PREFIX_SUM_PROBLEMS } from './prefix-sum';
import { TWO_POINTERS_PROBLEMS } from './two-pointers';
import { SLIDING_WINDOW_PROBLEMS } from './sliding-window';
import { HASHING_PROBLEMS } from './hashing';
import { BINARY_SEARCH_PROBLEMS } from './binary-search';
import { SORTING_PROBLEMS } from './sorting';
import { STACK_PROBLEMS } from './stack';
import { QUEUE_DEQUE_PROBLEMS } from './queue-deque';
import { INTERVALS_PROBLEMS } from './intervals';
import { LINKED_LIST_PROBLEMS } from './linked-list';
import { BINARY_TREES_PROBLEMS } from './binary-trees';
import { BINARY_SEARCH_TREES_PROBLEMS } from './binary-search-trees';
import { GRAPHS_PROBLEMS } from './graphs';
import { SHORTEST_PATH_PROBLEMS } from './shortest-path';
import { MINIMUM_SPANNING_TREE_PROBLEMS } from './minimum-spanning-tree';
import { BACKTRACKING_PROBLEMS } from './backtracking';
import { GREEDY_PROBLEMS } from './greedy';
import { HEAP_PROBLEMS } from './heap';
import { DYNAMIC_PROGRAMMING_PROBLEMS } from './dynamic-programming';
import { BIT_MANIPULATION_PROBLEMS } from './bit-manipulation';
import { STRINGS_PROBLEMS } from './strings';
import { MATRIX_PROBLEMS } from './matrix';
import { MATH_NUMBER_THEORY_PROBLEMS } from './math-number-theory';
import { ADVANCED_ALGORITHMS_PROBLEMS } from './advanced-algorithms';
import { CODEFORCES_PROBLEM_MODELS } from '../../repository/codeforces-db';
import { CODECHEF_PROBLEM_MODELS } from '../../repository/codechef-rating-db';
import { CODECHEF_EXPANSION_PROBLEMS } from './codechef-expansion';
import { LEETCODE_EXPANSION_PROBLEMS } from './leetcode-expansion';
import { CODEFORCES_EXPANSION_PROBLEMS } from './codeforces-expansion';
import { GEEKSFORGEEKS_EXPANSION_PROBLEMS } from './geeksforgeeks-expansion';

import { getSubtopicForPattern } from '../subtopics';
import { BASE_PATTERNS } from '../patterns';

const CATEGORY_SLUG_TO_INFO: Record<string, { id: string; title: string }> = {
  'basic-arrays': { id: 'cat-1', title: 'Array' },
  'prefix-sum': { id: 'cat-2', title: 'Prefix Sum' },
  'two-pointers': { id: 'cat-3', title: 'Two Pointers' },
  'sliding-window': { id: 'cat-4', title: 'Sliding Window' },
  'hashing': { id: 'cat-5', title: 'Hashing' },
  'binary-search': { id: 'cat-6', title: 'Binary Search' },
  'sorting': { id: 'cat-7', title: 'Sorting' },
  'stack': { id: 'cat-8', title: 'Stack' },
  'queue-deque': { id: 'cat-9', title: 'Queue / Deque' },
  'intervals': { id: 'cat-10', title: 'Intervals' },
  'linked-list': { id: 'cat-11', title: 'Linked List' },
  'binary-trees': { id: 'cat-12', title: 'Binary Tree' },
  'binary-search-trees': { id: 'cat-13', title: 'Binary Search Tree' },
  'graphs': { id: 'cat-14', title: 'Graph' },
  'shortest-path': { id: 'cat-15', title: 'Shortest Path' },
  'minimum-spanning-tree': { id: 'cat-16', title: 'Minimum Spanning Tree' },
  'backtracking': { id: 'cat-17', title: 'Backtracking' },
  'greedy': { id: 'cat-18', title: 'Greedy' },
  'heap': { id: 'cat-19', title: 'Heap / Priority Queue' },
  'dynamic-programming': { id: 'cat-20', title: 'Dynamic Programming' },
  'bit-manipulation': { id: 'cat-21', title: 'Bit Manipulation' },
  'strings': { id: 'cat-22', title: 'String' },
  'matrix': { id: 'cat-23', title: 'Matrix' },
  'math-number-theory': { id: 'cat-24', title: 'Math & Number Theory' },
  'advanced-algorithms': { id: 'cat-25', title: 'Advanced Algorithms' },
};

function detectPlatform(url: string = ''): 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks' {
  if (url.includes('codechef.com')) return 'codechef';
  if (url.includes('codeforces.com')) return 'codeforces';
  if (url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
  return 'leetcode';
}

function resolveCanonicalPattern(categorySlug: string, patternRef: string = '', tags: string[] = []): typeof BASE_PATTERNS[0] {
  const catPatterns = BASE_PATTERNS.filter(p => p.categorySlug === categorySlug);
  if (catPatterns.length === 0) return BASE_PATTERNS[0];

  // Direct match with pattern ID or slug
  const direct = catPatterns.find(p => p.id === patternRef || p.slug === patternRef);
  if (direct) return direct;

  const normRef = patternRef.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const pat of catPatterns) {
    const normTitle = pat.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normSlug = pat.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normRef === normTitle || normRef === normSlug || normRef.includes(normSlug) || normSlug.includes(normRef)) {
      return pat;
    }
  }

  // Tag matching
  for (const tag of tags) {
    const normTag = tag.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const pat of catPatterns) {
      const normSlug = pat.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (normTag.includes(normSlug) || normSlug.includes(normTag)) {
        return pat;
      }
    }
  }

  return catPatterns[0];
}

export const ALL_PROBLEMS: ProblemModel[] = [
  ...BASIC_ARRAYS_PROBLEMS,
  ...PREFIX_SUM_PROBLEMS,
  ...TWO_POINTERS_PROBLEMS,
  ...SLIDING_WINDOW_PROBLEMS,
  ...HASHING_PROBLEMS,
  ...BINARY_SEARCH_PROBLEMS,
  ...SORTING_PROBLEMS,
  ...STACK_PROBLEMS,
  ...QUEUE_DEQUE_PROBLEMS,
  ...INTERVALS_PROBLEMS,
  ...LINKED_LIST_PROBLEMS,
  ...BINARY_TREES_PROBLEMS,
  ...BINARY_SEARCH_TREES_PROBLEMS,
  ...GRAPHS_PROBLEMS,
  ...SHORTEST_PATH_PROBLEMS,
  ...MINIMUM_SPANNING_TREE_PROBLEMS,
  ...BACKTRACKING_PROBLEMS,
  ...GREEDY_PROBLEMS,
  ...HEAP_PROBLEMS,
  ...DYNAMIC_PROGRAMMING_PROBLEMS,
  ...BIT_MANIPULATION_PROBLEMS,
  ...STRINGS_PROBLEMS,
  ...MATRIX_PROBLEMS,
  ...MATH_NUMBER_THEORY_PROBLEMS,
  ...ADVANCED_ALGORITHMS_PROBLEMS,
  ...CODEFORCES_PROBLEM_MODELS,
  ...CODECHEF_PROBLEM_MODELS,
  ...CODECHEF_EXPANSION_PROBLEMS,
  ...LEETCODE_EXPANSION_PROBLEMS,
  ...CODEFORCES_EXPANSION_PROBLEMS,
  ...GEEKSFORGEEKS_EXPANSION_PROBLEMS,
].map((p, index) => {
  const platform = p.platform || detectPlatform(p.url);
  const catSlug = p.categorySlug || 'basic-arrays';
  const catInfo = CATEGORY_SLUG_TO_INFO[catSlug] || { id: p.categoryId || 'cat-1', title: p.categoryTitle || 'General' };

  // Resolve canonical pattern
  const canonicalPat = resolveCanonicalPattern(catSlug, p.patternSlug || p.patternId, p.topics || []);
  const subtopic = getSubtopicForPattern(canonicalPat.id) || getSubtopicForPattern(canonicalPat.slug);

  return {
    ...p,
    order: p.order ?? index + 1,
    categoryId: catInfo.id,
    categorySlug: catSlug,
    categoryTitle: catInfo.title,
    learningAreaId: catInfo.id,
    patternId: canonicalPat.id,
    patternSlug: canonicalPat.slug,
    patternTitle: canonicalPat.title,
    subtopicId: subtopic?.id || p.subtopicId,
    subtopicSlug: subtopic?.slug || p.subtopicSlug,
    subtopicTitle: subtopic?.title || p.subtopicTitle,
    platform: platform,
    mappingConfidence: p.mappingConfidence || (platform === 'leetcode' ? 'HIGH' : 'MEDIUM'),
    mappingReason: p.mappingReason || p.notes || '',
  };
});


