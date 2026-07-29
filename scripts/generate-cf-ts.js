const fs = require('fs');
const path = require('path');

const cfParsed = JSON.parse(fs.readFileSync(path.join(__dirname, 'cf_parsed.json'), 'utf8'));

const topicEnhancer = {
  'Math': ['Math', 'Number Theory', 'Modular Arithmetic'],
  'Greedy': ['Greedy', 'Sorting', 'Local Optimization'],
  'DP / Prefix-style': ['Dynamic Programming', '1D DP', 'Prefix Sum'],
  'Graph': ['Graph', 'DFS', 'BFS', 'Shortest Path'],
  'Implementation/Basics': ['Array', 'Implementation', 'Simulation'],
  'Binary Search': ['Binary Search', 'Array', 'Monotonic Functions'],
  'Sorting': ['Sorting', 'Array', 'Custom Comparator'],
  'Two Pointers': ['Two Pointers', 'Array', 'Sliding Window'],
  'Data Structures': ['Stack', 'Queue', 'Data Structure Design'],
  'Constructive': ['Array', 'Constructive', 'Mathematical Insight'],
  'Brute Force': ['Backtracking', 'Brute Force', 'State Space Search'],
};

const tsProblems = cfParsed.map((p, i) => {
  const numId = 90000 + i + 1;
  const slug = 'cf-' + p.code.toLowerCase();

  // Strip leading code (e.g. "2230A Optimal Purchase" -> "Optimal Purchase")
  let cleanTitle = p.name;
  if (cleanTitle.startsWith(p.code)) {
    cleanTitle = cleanTitle.substring(p.code.length).trim();
  }

  let diff = 'Easy';
  let lev = 'Learn';

  if (p.rating >= 1200 && p.rating <= 1500) {
    diff = 'Medium';
    lev = 'Practice';
  } else if (p.rating > 1500) {
    diff = 'Hard';
    lev = 'Master';
  }

  return {
    id: 'cf-' + p.code.toLowerCase(),
    slug: slug,
    leetcodeNumber: numId,
    title: cleanTitle,
    difficulty: diff,
    level: lev,
    frequency: p.rating >= 1200 ? 'High' : 'Medium',
    estimatedTimeMin: parseInt(p.estTime),
    xp: p.xp,
    acceptanceRate: 50.0,
    isPremium: false,
    topics: topicEnhancer[p.concept] || ['Array', 'Implementation'],
    companies: ['N/A'], // No fake company tags
    url: p.openLink,
    notes: 'Codeforces Contest ' + p.code + ' | Rating: ' + p.rating + ' | Concept: ' + p.concept,
    categoryId: 'cat-cf',
    categorySlug: p.categorySlug,
    categoryTitle: p.categoryTitle,
    patternId: 'pattern-cf-' + p.concept.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    patternSlug: p.concept.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    patternTitle: p.concept,
    questTitle: 'Codeforces Array Quest',
    kingdomTitle: p.kingdomTitle,
  };
});

const tsContent = `import { ProblemModel } from '../../types';

export const CODEFORCES_PROBLEMS: ProblemModel[] = ${JSON.stringify(tsProblems, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/curriculum/models/problems/codeforces.ts'), tsContent);
console.log('Successfully regenerated codeforces.ts with ' + tsProblems.length + ' clean problems.');
