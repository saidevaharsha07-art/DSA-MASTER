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
