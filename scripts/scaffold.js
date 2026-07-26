const fs = require('fs');
const problems = [
  { id: '1480', title: 'Running Sum of 1d Array', difficulty: 'Easy', slug: 'running-sum-of-1d-array' },
  { id: '724', title: 'Find Pivot Index', difficulty: 'Easy', slug: 'find-pivot-index' },
  { id: '303', title: 'Range Sum Query - Immutable', difficulty: 'Easy', slug: 'range-sum-query-immutable' },
  { id: '643', title: 'Maximum Average Subarray I', difficulty: 'Easy', slug: 'maximum-average-subarray-i' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', slug: 'longest-substring-without-repeating-characters' },
  { id: '209', title: 'Minimum Size Subarray Sum', difficulty: 'Medium', slug: 'minimum-size-subarray-sum' },
  { id: '424', title: 'Longest Repeating Character Replacement', difficulty: 'Medium', slug: 'longest-repeating-character-replacement' },
  { id: '560', title: 'Subarray Sum Equals K', difficulty: 'Medium', slug: 'subarray-sum-equals-k' },
  { id: '930', title: 'Binary Subarrays With Sum', difficulty: 'Medium', slug: 'binary-subarrays-with-sum' },
  { id: '974', title: 'Subarray Sums Divisible by K', difficulty: 'Medium', slug: 'subarray-sums-divisible-by-k' },
  { id: '49', title: 'Group Anagrams', difficulty: 'Medium', slug: 'group-anagrams' },
  { id: '128', title: 'Longest Consecutive Sequence', difficulty: 'Medium', slug: 'longest-consecutive-sequence' },
  { id: '30', title: 'Substring with Concatenation of All Words', difficulty: 'Hard', slug: 'substring-with-concatenation-of-all-words' },
  { id: '76', title: 'Minimum Window Substring', difficulty: 'Hard', slug: 'minimum-window-substring' },
  { id: '1074', title: 'Number of Submatrices That Sum to Target', difficulty: 'Hard', slug: 'number-of-submatrices-that-sum-to-target' }
];

const template = fs.readFileSync('src/content/phases/phase-01/arrays/problems/lc-1.ts', 'utf8');

problems.forEach(p => {
  let content = template.replace(/lc1/g, 'lc' + p.id);
  content = content.replace(/problem\.lc-1/g, 'problem.lc-' + p.id);
  content = content.replace(/two-sum/g, p.slug);
  content = content.replace(/"1"/g, '"' + p.id + '"');
  content = content.replace(/Two Sum/g, p.title);
  content = content.replace(/"Easy"/g, '"' + p.difficulty + '"');
  fs.writeFileSync('src/content/phases/phase-01/arrays/problems/lc-' + p.id + '.ts', content);
});

// Write the index.ts
let indexContent = '';
indexContent += "export { default as lc1 } from './lc-1';\n";
problems.forEach(p => {
  indexContent += "export { default as lc" + p.id + " } from './lc-" + p.id + "';\n";
});
fs.writeFileSync('src/content/phases/phase-01/arrays/problems/index.ts', indexContent);
