const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('CODECHEF COMPLETE INTEGRATION AUDIT & DISCONNECT DISCOVERY');
console.log('====================================================');

// STEP 1 — Locate every place in the project where CodeChef data is loaded
console.log('\n--- STEP 1 — LOCATING CODECHEF LOADERS & DATA FILES ---');
const searchKeywords = [
  'CodeChef',
  'codechefPlatform',
  'CodeChefLoader',
  'CodeChefDatasetProvider',
  'codechef_practice_complete',
  'dataset.ts',
  'loader.ts'
];

function findCodeChefFiles(dir) {
  let fileList = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).forEach(f => {
      if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'scratch') return;
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.json')) {
        const content = fs.readFileSync(full, 'utf8');
        let matched = false;
        searchKeywords.forEach(k => {
          if (content.includes(k)) matched = true;
        });
        if (matched) {
          fileList.push(full.replace(/\\/g, '/'));
        }
      }
    });
  }
  walk(dir);
  return fileList;
}

const foundFiles = findCodeChefFiles('src');
console.log(`Found ${foundFiles.length} files matching CodeChef keywords:`);
foundFiles.forEach(f => console.log(`  - ${f}`));

// STEP 3 & 8 — Dataset Count Verification
console.log('\n--- STEP 3 & 8 — DATASET SIZE VERIFICATION ---');
const mainJsonPath = 'data/codechef/codechef_practice_complete.json';
const publicJsonPath = 'public/data/codechef/codechef_practice_complete.json';
const srcJsonPath = 'src/data/codechef.json';

function getJsonCount(p) {
  if (!fs.existsSync(p)) return -1;
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    return Array.isArray(raw) ? raw.length : 0;
  } catch {
    return -2;
  }
}

console.log(`data/codechef/codechef_practice_complete.json: ${getJsonCount(mainJsonPath)} problems`);
console.log(`public/data/codechef/codechef_practice_complete.json: ${getJsonCount(publicJsonPath)} problems`);
console.log(`src/data/codechef.json: ${getJsonCount(srcJsonPath)} problems`);

// Check division files count in src/data/codechef/
const divFiles = ['500.json', '500-1000.json', '1000-1400.json', '1400-1600.json', '1600-1800.json', '1800-2000.json', '2000-2500.json'];
let divTotal = 0;
divFiles.forEach(df => {
  const c = getJsonCount(path.join('src/data/codechef', df));
  divTotal += c > 0 ? c : 0;
  console.log(`src/data/codechef/${df}: ${c} problems`);
});
console.log(`Expected Dataset Size: 1371`);
console.log(`Actual Combined Division Size: ${divTotal}`);
console.log(`Difference: ${1371 - divTotal}`);

// STEP 4 — Hardcoded Limits Search
console.log('\n--- STEP 4 — SEARCHING FOR HARDCODED LIMITS IN UI ---');
const practicePagePath = 'src/app/(app)/practice/page.tsx';
const arenaPagePath = 'src/app/(app)/practice/codechef/page.tsx';

if (fs.existsSync(practicePagePath)) {
  const content = fs.readFileSync(practicePagePath, 'utf8');
  console.log(`Limits in practice/page.tsx:`);
  ['slice', 'take', 'limit', 'pageSize', 'MAX_RESULTS'].forEach(l => {
    const matches = (content.match(new RegExp(l + '\\([^)]*\\)|' + l + ':\\s*\\d+', 'g')) || []);
    if (matches.length > 0) console.log(`  - ${l}:`, matches);
  });
}

if (fs.existsSync(arenaPagePath)) {
  const content = fs.readFileSync(arenaPagePath, 'utf8');
  console.log(`Limits in practice/codechef/page.tsx:`);
  ['slice', 'take', 'limit', 'pageSize', 'MAX_RESULTS'].forEach(l => {
    const matches = (content.match(new RegExp(l + '\\([^)]*\\)|' + l + ':\\s*\\d+', 'g')) || []);
    if (matches.length > 0) console.log(`  - ${l}:`, matches);
  });
}

// STEP 5 & 6 — Old Imports & src/platforms/codechef/index.ts usage
console.log('\n--- STEP 5 & 6 — VERIFYING IMPORTS & CANONICAL MODULE USAGE ---');
let platformIndexImports = [];
function checkPlatformUsage(dir) {
  function walk(d) {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).forEach(f => {
      if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'scratch') return;
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx')) {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes('src/platforms/codechef') || content.includes('@/src/platforms/codechef')) {
          platformIndexImports.push(full.replace(/\\/g, '/'));
        }
      }
    });
  }
  walk(dir);
}
checkPlatformUsage('src');
console.log(`Files importing 'src/platforms/codechef':`, platformIndexImports);

console.log('\nAudit complete.');
