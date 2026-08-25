const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('BUILDING STATIC CODECHEF PROBLEM MAPPING DATABASE');
console.log('====================================================');

// Load all problems from src/data/codechef division files
const divFiles = [
  '500.json',
  '500-1000.json',
  '1000-1400.json',
  '1400-1600.json',
  '1600-1800.json',
  '1800-2000.json',
  '2000-2500.json'
];

let allRaw = [];
divFiles.forEach(file => {
  const p = path.join('src/data/codechef', file);
  if (fs.existsSync(p)) {
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    allRaw.push(...arr);
  }
});

console.log(`Total raw records loaded: ${allRaw.length}`);

// Map function based strictly on official dataset attributes
function getOfficialMapping(p) {
  const diff = Number(p.difficulty) || 500;
  const ratingRange = p.ratingRange || '';
  const section = p.section || '';
  const practicePath = p.practicePath || '';
  const kingdom = p.kingdom || '';
  const pattern = p.pattern || '';
  const company = p.company || '';

  // 1. Difficulty Rating Wise Mapping
  if (ratingRange === '500' || diff < 500) {
    return { categoryId: 'difficulty', practicePathId: '500-rating' };
  }
  if (ratingRange === '500-1000' || (diff >= 500 && diff < 1000)) {
    return { categoryId: 'difficulty', practicePathId: '500-1000-rating' };
  }
  if (ratingRange === '1000-1400' || (diff >= 1000 && diff < 1400)) {
    return { categoryId: 'difficulty', practicePathId: '1000-1400-rating' };
  }
  if (ratingRange === '1400-1600' || (diff >= 1400 && diff < 1600)) {
    return { categoryId: 'difficulty', practicePathId: '1400-1600-rating' };
  }
  if (ratingRange === '1600-1800' || (diff >= 1600 && diff < 1800)) {
    return { categoryId: 'difficulty', practicePathId: '1600-1800-rating' };
  }
  if (ratingRange === '1800-2000' || (diff >= 1800 && diff < 2000)) {
    return { categoryId: 'difficulty', practicePathId: '1800-2000-rating' };
  }
  if (ratingRange === '2000-2500' || diff >= 2000) {
    return { categoryId: 'difficulty', practicePathId: '2000-2500-rating' };
  }

  // Fallback default
  return { categoryId: 'beginner', practicePathId: 'practice-arrays' };
}

// Build mapping object
const mappingObj = {};
const seen = new Set();

allRaw.forEach(p => {
  const code = (p.problemCode || p.id || p.code).toString().trim().toUpperCase();
  if (code && !seen.has(code)) {
    seen.add(code);
    mappingObj[code] = getOfficialMapping(p);
  }
});

console.log(`Unique problems mapped: ${Object.keys(mappingObj).length}`);

// Write static problemMappings.ts
const targetFile = 'src/features/codechef/data/problemMappings.ts';
const dir = path.dirname(targetFile);
fs.mkdirSync(dir, { recursive: true });

const content = `/**
 * Official CodeChef Problem Mappings
 * Static lookup database for CodeChef problems to (categoryId, practicePathId).
 * ZERO AI heuristics, string guessing, or regex inferencing.
 */

export interface CodeChefMappingEntry {
  categoryId: string;
  practicePathId: string;
}

export const CODECHEF_PROBLEM_MAPPING: Record<string, CodeChefMappingEntry> = ${JSON.stringify(mappingObj, null, 2)};
`;

fs.writeFileSync(targetFile, content);
console.log(`Saved ${targetFile} successfully!`);
