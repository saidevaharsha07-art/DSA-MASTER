import { ALL_CATEGORIES, ALL_KINGDOMS, ALL_PATTERNS, ALL_PROBLEMS, ALL_SUBTOPICS } from '../models';
import { CategoryModel, KingdomModel, PatternModel, ProblemModel, SubtopicModel, FilterOptions } from '../types';

const CATEGORY_ALIASES: Record<string, string> = {
  array: 'basic-arrays',
  arrays: 'basic-arrays',
  'basic-array': 'basic-arrays',
  math: 'math-number-theory',
  'number-theory': 'math-number-theory',
  queue: 'queue-deque',
  deque: 'queue-deque',
  bst: 'binary-search-trees',
  dp: 'dynamic-programming',
  mst: 'minimum-spanning-tree',
  bit: 'bit-manipulation',
  bits: 'bit-manipulation',
  'shortest-paths': 'shortest-path',
  matrix: 'matrix',
  strings: 'strings',
  string: 'strings',
  tree: 'binary-trees',
  trees: 'binary-trees',
};

export const CurriculumRepository = {
  // Categories & Learning Areas
  getAllCategories: (): CategoryModel[] => ALL_CATEGORIES,
  getLearningAreas: (): CategoryModel[] => ALL_CATEGORIES,
  getCategoryBySlug: (slug: string): CategoryModel | undefined => {
    const normalized = slug.toLowerCase();
    const resolvedSlug = CATEGORY_ALIASES[normalized] || normalized;
    return ALL_CATEGORIES.find(c => c.slug === resolvedSlug || c.id === resolvedSlug || c.slug === normalized || c.id === normalized);
  },
  getCategoryById: (id: string): CategoryModel | undefined => ALL_CATEGORIES.find(c => c.id === id),

  getAllKingdoms: (): KingdomModel[] => ALL_KINGDOMS,
  getKingdomBySlug: (slug: string): KingdomModel | undefined => {
    const normalized = slug.toLowerCase();
    const resolvedSlug = CATEGORY_ALIASES[normalized] || normalized;
    return ALL_KINGDOMS.find(k => k.categorySlug === resolvedSlug || k.slug === resolvedSlug || k.slug === normalized);
  },

  /**
   * Returns the legacy fantasy Kingdom name for a given categorySlug.
   * For backwards-compatibility and migration documentation only.
   * NEVER display this to learners — use getCategoryBySlug(slug)?.title instead.
   */
  getLegacyKingdomTitle: (categorySlug: string): string | undefined => {
    const normalized = categorySlug.toLowerCase();
    const resolvedSlug = CATEGORY_ALIASES[normalized] || normalized;
    const cat = ALL_CATEGORIES.find(c => c.slug === resolvedSlug || c.slug === normalized);
    return cat?.kingdomTitle;
  },

  // Subtopics
  getAllSubtopics: (): SubtopicModel[] => ALL_SUBTOPICS,
  getSubtopicBySlug: (slug: string): SubtopicModel | undefined => ALL_SUBTOPICS.find(s => s.slug === slug || s.id === slug),
  getSubtopicById: (id: string): SubtopicModel | undefined => ALL_SUBTOPICS.find(s => s.id === id),
  getSubtopicsByCategory: (categorySlug: string): SubtopicModel[] => {
    const normalized = categorySlug.toLowerCase();
    const resolvedSlug = CATEGORY_ALIASES[normalized] || normalized;
    return ALL_SUBTOPICS.filter(s => s.categorySlug === resolvedSlug || s.categoryId === resolvedSlug || s.categorySlug === normalized);
  },

  // Patterns
  getAllPatterns: (): PatternModel[] => ALL_PATTERNS,
  getPatternBySlug: (slug: string): PatternModel | undefined => ALL_PATTERNS.find(p => p.slug === slug || p.id === slug),
  getPatternById: (id: string): PatternModel | undefined => ALL_PATTERNS.find(p => p.id === id),
  getPatternsByCategory: (categorySlug: string): PatternModel[] => ALL_PATTERNS.filter(p => p.categorySlug === categorySlug || p.categoryId === categorySlug),

  // Problems
  getAllProblems: (): ProblemModel[] => [...ALL_PROBLEMS].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  getProblemBySlug: (slug: string): ProblemModel | undefined => ALL_PROBLEMS.find(p => p.slug === slug || p.id === slug),
  getProblemById: (id: string): ProblemModel | undefined => ALL_PROBLEMS.find(p => p.id === id || p.slug === id),
  getProblemsByPattern: (patternSlug: string): ProblemModel[] =>
    ALL_PROBLEMS.filter(p => p.patternSlug === patternSlug || p.patternId === patternSlug)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  getProblemsByCategory: (categorySlug: string): ProblemModel[] =>
    ALL_PROBLEMS.filter(p => p.categorySlug === categorySlug || p.categoryId === categorySlug)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),

  // Platform Catalog & Totals
  getProblemsByPlatform: (platform: string): ProblemModel[] => {
    if (platform === 'mentorpick') return [];
    return ALL_PROBLEMS.filter(p => p.platform === platform);
  },
  getPlatformCount: (platform: string): number => {
    if (platform === 'mentorpick') return 0;
    return ALL_PROBLEMS.filter(p => p.platform === platform).length;
  },
  getTotalCanonicalProblems: (): number => {
    return ALL_PROBLEMS.length;
  },

  // Search
  searchCurriculum: (query: string): { problems: ProblemModel[]; patterns: PatternModel[]; categories: CategoryModel[] } => {
    const q = query.toLowerCase().trim();
    if (!q) return { problems: [], patterns: [], categories: [] };

    const problems = ALL_PROBLEMS.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.leetcodeNumber.toString().includes(q) ||
        p.topics.some(t => t.toLowerCase().includes(q)) ||
        p.companies.some(c => c.toLowerCase().includes(q)) ||
        p.kingdomTitle.toLowerCase().includes(q) ||
        p.patternTitle.toLowerCase().includes(q) ||
        (p.notes && p.notes.toLowerCase().includes(q))
    ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    const patterns = ALL_PATTERNS.filter(
      p => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
    );

    const categories = ALL_CATEGORIES.filter(
      c => c.title.toLowerCase().includes(q) || c.kingdomTitle.toLowerCase().includes(q)
    );

    return { problems, patterns, categories };
  },

  // Advanced Filtering
  filterProblems: (options: FilterOptions, solvedProblemIds: string[] = []): ProblemModel[] => {
    return ALL_PROBLEMS.filter((problem) => {
      if (options.categorySlug && problem.categorySlug !== options.categorySlug && problem.categoryId !== options.categorySlug) {
        return false;
      }
      if (options.subtopicSlug && problem.subtopicSlug !== options.subtopicSlug && problem.subtopicId !== options.subtopicSlug) {
        return false;
      }
      if (options.patternSlug && problem.patternSlug !== options.patternSlug && problem.patternId !== options.patternSlug) {
        return false;
      }
      if (options.platform && options.platform !== 'all' && problem.platform !== options.platform) {
        return false;
      }
      if (options.difficulty && problem.difficulty.toLowerCase() !== options.difficulty.toLowerCase()) {
        return false;
      }
      if (options.company && !problem.companies.map(c => c.toLowerCase()).includes(options.company.toLowerCase())) {
        return false;
      }
      if (options.frequency && problem.frequency !== options.frequency) {
        return false;
      }
      if (options.isPremium !== undefined && problem.isPremium !== options.isPremium) {
        return false;
      }
      if (options.level && problem.level !== options.level) {
        return false;
      }
      if (options.solvedStatus === 'solved' && !solvedProblemIds.includes(problem.id) && !solvedProblemIds.includes(problem.leetcodeNumber.toString())) {
        return false;
      }
      if (options.solvedStatus === 'unsolved' && (solvedProblemIds.includes(problem.id) || solvedProblemIds.includes(problem.leetcodeNumber.toString()))) {
        return false;
      }
      if (options.searchQuery) {
        const q = options.searchQuery.toLowerCase();
        const matchesName = problem.title.toLowerCase().includes(q);
        const matchesId = problem.id.toLowerCase().includes(q);
        const matchesNumber = problem.leetcodeNumber.toString().includes(q);
        const matchesTopic = problem.topics.some(t => t.toLowerCase().includes(q));
        const matchesCompany = problem.companies.some(c => c.toLowerCase().includes(q));
        const matchesKingdom = problem.kingdomTitle.toLowerCase().includes(q);
        const matchesPattern = problem.patternTitle.toLowerCase().includes(q);
        const matchesNotes = problem.notes ? problem.notes.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesId && !matchesNumber && !matchesTopic && !matchesCompany && !matchesKingdom && !matchesPattern && !matchesNotes) return false;
      }
      return true;
    }).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
};
