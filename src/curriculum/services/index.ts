import { CurriculumRepository } from '../repository';
import { KnowledgeGraphData, KnowledgeGraphLink, KnowledgeGraphNode } from '../types';

export const CurriculumService = {
  // Knowledge Graph Generator
  generateKnowledgeGraph: (): KnowledgeGraphData => {
    const categories = CurriculumRepository.getAllCategories();
    const patterns = CurriculumRepository.getAllPatterns();
    const problems = CurriculumRepository.getAllProblems();

    const nodes: KnowledgeGraphNode[] = [];
    const links: KnowledgeGraphLink[] = [];

    // Category Nodes
    categories.forEach((cat) => {
      nodes.push({
        id: cat.id,
        label: cat.title,
        type: 'category',
        categorySlug: cat.slug,
        val: 20,
      });
    });

    // Pattern Nodes & Category Links
    patterns.forEach((pat) => {
      nodes.push({
        id: pat.id,
        label: pat.title,
        type: 'pattern',
        categorySlug: pat.categorySlug,
        patternSlug: pat.slug,
        difficulty: pat.difficulty,
        val: 12,
      });

      links.push({
        source: pat.categoryId,
        target: pat.id,
        relationship: 'contains',
      });
    });

    // Problem Nodes & Pattern Links
    problems.forEach((prob) => {
      nodes.push({
        id: prob.id,
        label: `${prob.leetcodeNumber}. ${prob.title}`,
        type: 'problem',
        categorySlug: prob.categorySlug,
        patternSlug: prob.patternSlug,
        difficulty: prob.difficulty,
        val: 6,
      });

      links.push({
        source: prob.patternId,
        target: prob.id,
        relationship: 'contains',
      });
    });

    return { nodes, links };
  },

  // Calculate Progress Statistics
  calculateProgress: (solvedProblemIds: string[]) => {
    const allProblems = CurriculumRepository.getAllProblems();
    const totalProblems = allProblems.length;
    const solvedCount = solvedProblemIds.length;
    const progressPercentage = Math.round((solvedCount / (totalProblems || 1)) * 100);

    const totalXp = allProblems
      .filter((p) => solvedProblemIds.includes(p.id))
      .reduce((acc, p) => acc + p.xp, 0);

    const difficultyBreakdown = {
      Easy: { total: 0, solved: 0 },
      Medium: { total: 0, solved: 0 },
      Hard: { total: 0, solved: 0 },
    };

    allProblems.forEach((p) => {
      difficultyBreakdown[p.difficulty].total += 1;
      if (solvedProblemIds.includes(p.id)) {
        difficultyBreakdown[p.difficulty].solved += 1;
      }
    });

    return {
      totalProblems,
      solvedCount,
      progressPercentage,
      totalXp,
      difficultyBreakdown,
    };
  },

  // Category Progress
  getCategoryProgress: (categorySlug: string, solvedProblemIds: string[]) => {
    const categoryProblems = CurriculumRepository.getProblemsByCategory(categorySlug);
    const total = categoryProblems.length;
    const solved = categoryProblems.filter((p) => solvedProblemIds.includes(p.id)).length;
    const percentage = Math.round((solved / (total || 1)) * 100);
    const xp = categoryProblems
      .filter((p) => solvedProblemIds.includes(p.id))
      .reduce((acc, p) => acc + p.xp, 0);

    return { total, solved, percentage, xp };
  },
};

export type PlatformId = 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks';

export interface PlatformMeta {
  id: PlatformId;
  name: string;
  shortName: string;
  label: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  canonicalUrl: string;
  buttonLabel: string;
}

/**
 * Derives the canonical platform and authentic external problem URL for any curriculum problem.
 */
export function getPlatformMeta(problem: {
  id?: string;
  slug?: string;
  url?: string;
  title?: string;
  leetcodeNumber?: number;
  kingdomTitle?: string;
  categorySlug?: string;
}): PlatformMeta {
  const id = (problem.id || '').toLowerCase();
  const slug = (problem.slug || '').toLowerCase();
  const rawUrl = problem.url || '';
  const kingdom = (problem.kingdomTitle || '').toLowerCase();

  // 1. Codeforces
  if (id.startsWith('cf-') || slug.startsWith('cf-') || rawUrl.includes('codeforces.com') || kingdom.includes('division')) {
    let canonicalUrl = rawUrl;
    if (!canonicalUrl || !canonicalUrl.includes('codeforces.com')) {
      const cleanId = id.replace('cf-', '').toUpperCase();
      const match = cleanId.match(/^(\d+)([A-Z]\d*)$/);
      if (match) {
        canonicalUrl = `https://codeforces.com/problemset/problem/${match[1]}/${match[2]}`;
      } else {
        canonicalUrl = 'https://codeforces.com/problemset';
      }
    }

    return {
      id: 'codeforces',
      name: 'Codeforces',
      shortName: 'CF',
      label: 'Codeforces',
      color: '#3B82F6',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
      badgeBorder: 'rgba(59, 130, 246, 0.35)',
      textColor: '#3B82F6',
      canonicalUrl,
      buttonLabel: 'Open on Codeforces ↗',
    };
  }

  // 2. CodeChef
  if (id.startsWith('cc-') || slug.startsWith('cc-') || rawUrl.includes('codechef.com')) {
    let canonicalUrl = rawUrl;
    if (!canonicalUrl || !canonicalUrl.includes('codechef.com')) {
      const problemCode = id.replace('cc-', '').toUpperCase();
      canonicalUrl = `https://www.codechef.com/problems/${problemCode}`;
    }

    return {
      id: 'codechef',
      name: 'CodeChef',
      shortName: 'CC',
      label: 'CodeChef',
      color: '#F97316',
      badgeBg: 'rgba(249, 115, 22, 0.12)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      textColor: '#F97316',
      canonicalUrl,
      buttonLabel: 'Open on CodeChef ↗',
    };
  }

  // 3. GeeksForGeeks
  if (id.startsWith('gfg-') || slug.startsWith('gfg-') || rawUrl.includes('geeksforgeeks.org')) {
    let canonicalUrl = rawUrl;
    if (!canonicalUrl || !canonicalUrl.includes('geeksforgeeks.org')) {
      const gfgSlug = slug.replace('gfg-', '');
      canonicalUrl = `https://www.geeksforgeeks.org/problems/${gfgSlug}/1`;
    }

    return {
      id: 'geeksforgeeks',
      name: 'GeeksForGeeks',
      shortName: 'GFG',
      label: 'GeeksForGeeks',
      color: '#2F8D46',
      badgeBg: 'rgba(47, 141, 70, 0.12)',
      badgeBorder: 'rgba(47, 141, 70, 0.35)',
      textColor: '#2F8D46',
      canonicalUrl,
      buttonLabel: 'Open on GeeksForGeeks ↗',
    };
  }

  // 4. Default: LeetCode
  let canonicalUrl = rawUrl;
  if (!canonicalUrl || !canonicalUrl.includes('leetcode.com')) {
    const cleanSlug = slug.replace('lc-', '');
    canonicalUrl = `https://leetcode.com/problems/${cleanSlug}/`;
  }

  return {
    id: 'leetcode',
    name: 'LeetCode',
    shortName: 'LC',
    label: 'LeetCode',
    color: '#FFA116',
    badgeBg: 'rgba(255, 161, 22, 0.12)',
    badgeBorder: 'rgba(255, 161, 22, 0.35)',
    textColor: '#FFA116',
    canonicalUrl,
    buttonLabel: 'Open on LeetCode ↗',
  };
}
