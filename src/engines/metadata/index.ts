import { getAllPatterns, getAllProblems } from '@/src/registry';

export const metadataEngine = {
  getGlobalStats: () => {
    const problems = getAllProblems();
    const patterns = getAllPatterns();
    
    let totalEstimatedHours = 0;
    patterns.forEach(p => totalEstimatedHours += p.estimatedHours);
    
    const difficultyDistribution = {
      Easy: 0,
      Medium: 0,
      Hard: 0
    };
    
    const companyCoverage = new Set<string>();
    
    problems.forEach(p => {
      difficultyDistribution[p.difficulty]++;
      p.companies.forEach(c => companyCoverage.add(c));
    });

    return {
      totalProblems: problems.length,
      totalPatterns: patterns.length,
      totalEstimatedHours,
      difficultyDistribution,
      uniqueCompaniesCovered: companyCoverage.size
    };
  },
  
  getPatternStats: (patternId: string) => {
    const problems = getAllProblems().filter(p => p.patterns.includes(patternId));
    return {
      problemCount: problems.length,
      easyCount: problems.filter(p => p.difficulty === 'Easy').length,
      mediumCount: problems.filter(p => p.difficulty === 'Medium').length,
      hardCount: problems.filter(p => p.difficulty === 'Hard').length
    };
  }
};
