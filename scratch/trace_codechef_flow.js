const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('STEP 1 & 2 — VERIFYING DATASETS AND LOADERS');
console.log('====================================================');

// Step 1: Check datasets in data/codechef and public/data/codechef
const dataDir = 'data/codechef';
const publicDir = 'public/data/codechef';

function checkJson(filePath) {
  if (!fs.existsSync(filePath)) return { exists: false, count: 0 };
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { exists: true, count: Array.isArray(data) ? data.length : 0 };
  } catch (err) {
    return { exists: true, error: err.message, count: 0 };
  }
}

console.log('data/codechef/codechef_practice_complete.json:', checkJson(path.join(dataDir, 'codechef_practice_complete.json')));
console.log('public/data/codechef/codechef_practice_complete.json:', checkJson(path.join(publicDir, 'codechef_practice_complete.json')));

// Check division files in src/data/codechef
const divFiles = ['500.json', '500-1000.json', '1000-1400.json', '1400-1600.json', '1600-1800.json', '1800-2000.json', '2000-2500.json'];
let divTotal = 0;
divFiles.forEach(f => {
  const p = path.join('src/data/codechef', f);
  const info = checkJson(p);
  divTotal += info.count;
  console.log(`src/data/codechef/${f}:`, info);
});
console.log(`Total problems across division files: ${divTotal}`);

// Step 3: Trace Usage across the entire repository
console.log('\n====================================================');
console.log('STEP 3 — TRACING CODECHEF USAGE ACROSS REPOSITORY');
console.log('====================================================');

const searchTerms = [
  'codechefPlatform',
  'CodeChefLoader',
  'loadCompleteDataset',
  'getProblemsBySection',
  'getProblemsByPracticePath',
  'CodeChefRatingRepository'
];

function searchRepo(dir) {
  let matches = {};
  searchTerms.forEach(t => matches[t] = []);

  function walk(d) {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).forEach(f => {
      if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'scratch') return;
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js')) {
        const content = fs.readFileSync(full, 'utf8');
        searchTerms.forEach(t => {
          if (content.includes(t)) {
            matches[t].push(full.replace(/\\/g, '/'));
          }
        });
      }
    });
  }

  walk(dir);
  return matches;
}

const usages = searchRepo('src');
console.log(JSON.stringify(usages, null, 2));

console.log('\nTrace complete.');
