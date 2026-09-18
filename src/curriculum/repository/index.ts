import { ALL_CATEGORIES, ALL_KINGDOMS, ALL_PATTERNS, ALL_PROBLEMS } from '../models';
import { CategoryModel, KingdomModel, PatternModel, ProblemModel, FilterOptions } from '../types';

export const CurriculumRepository = {
  // Categories & Kingdoms
  getAllCategories: (): CategoryModel[] => ALL_CATEGORIES,
  getCategoryBySlug: (slug: string): CategoryModel | undefined => ALL_CATEGORIES.find(c => c.slug === slug || c.id === slug),
  getCategoryById: (id: string): CategoryModel | undefined => ALL_CATEGORIES.find(c => c.id === id),

  getAllKingdoms: (): KingdomModel[] => ALL_KINGDOMS,
  getKingdomBySlug: (slug: string): KingdomModel | undefined => ALL_KINGDOMS.find(k => k.categorySlug === slug || k.slug === slug),

  /**
   * Returns the legacy fantasy Kingdom name for a given categorySlug.
   * For backwards-compatibility and migration documentation only.
   * NEVER display this to learners — use getCategoryBySlug(slug)?.title instead.
   */
  getLegacyKingdomTitle: (categorySlug: string): string | undefined => {
    const cat = ALL_CATEGORIES.find(c => c.slug === categorySlug);
    return cat?.kingdomTitle;
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
    if (platform === 'geeksforgeeks' || platform === 'mentorpick') return [];
    if (platform === 'codechef') return ALL_PROBLEMS.filter(p => p.url.includes('codechef.com'));
    if (platform === 'codeforces') return ALL_PROBLEMS.filter(p => p.url.includes('codeforces.com'));
    return ALL_PROBLEMS.filter(p => !p.url.includes('codeforces.com') && !p.url.includes('codechef.com') && !p.url.includes('geeksforgeeks.org'));
  },
  getPlatformCount: (platform: string): number => {
    if (platform === 'geeksforgeeks' || platform === 'mentorpick') return 0;
    if (platform === 'codechef') return ALL_PROBLEMS.filter(p => p.url.includes('codechef.com')).length;
    if (platform === 'codeforces') return ALL_PROBLEMS.filter(p => p.url.includes('codeforces.com')).length;
    return ALL_PROBLEMS.filter(p => !p.url.includes('codeforces.com') && !p.url.includes('codechef.com') && !p.url.includes('geeksforgeeks.org')).length;
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
      if (options.patternSlug && problem.patternSlug !== options.patternSlug && problem.patternId !== options.patternSlug) {
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
