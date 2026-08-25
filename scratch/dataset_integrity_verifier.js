const fs = require('fs');
const path = require('path');

console.log('--- STARTING DATASET INTEGRITY AUDIT ---');

const codechefFiles = [
  'src/data/codechef/500.json',
  'src/data/codechef/500-1000.json',
  'src/data/codechef/1000-1400.json',
  'src/data/codechef/1400-1600.json',
  'src/data/codechef/1600-1800.json',
  'src/data/codechef/1800-2000.json',
  'src/data/codechef/2000-2500.json'
];

let totalCodeChefProblems = 0;
const codechefIds = new Set();
const duplicateCodeChefIds = [];
const invalidRatings = [];
const missingFields = [];

codechefFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`[MISSING DATASET] ${file}`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  totalCodeChefProblems += data.length;

  data.forEach((p, idx) => {
    if (codechefIds.has(p.id)) {
      duplicateCodeChefIds.push({ id: p.id, file });
    } else {
      codechefIds.add(p.id);
    }

    if (typeof p.difficulty !== 'number' || p.difficulty < 0 || p.difficulty > 4000) {
      invalidRatings.push({ id: p.id, rating: p.difficulty, file });
    }

    const required = ['id', 'problemCode', 'title', 'difficulty', 'url', 'kingdom', 'pattern'];
    required.forEach(req => {
      if (!p[req]) {
        missingFields.push({ id: p.id || `idx-${idx}`, field: req, file });
      }
    });
  });
});

console.log(`Total CodeChef Problems Audited: ${totalCodeChefProblems}`);
console.log(`Unique CodeChef Problem IDs: ${codechefIds.size}`);
console.log(`Duplicate IDs Found: ${duplicateCodeChefIds.length}`);
console.log(`Invalid Ratings Found: ${invalidRatings.length}`);
console.log(`Missing Required Fields Found: ${missingFields.length}`);

const cfFile = 'src/data/codeforces.json';
let cfProblemsCount = 0;
if (fs.existsSync(cfFile)) {
  const cfData = JSON.parse(fs.readFileSync(cfFile, 'utf8'));
  cfProblemsCount = cfData.length;
  console.log(`Total Codeforces Problems Audited: ${cfProblemsCount}`);
}

const roadmapFile = 'public/data/roadmap.json';
const patternsFile = 'public/data/patterns.json';
let kingdomCount = 0;
let patternCount = 0;

if (fs.existsSync(roadmapFile)) {
  const rData = JSON.parse(fs.readFileSync(roadmapFile, 'utf8'));
  kingdomCount = Array.isArray(rData) ? rData.length : (rData.kingdoms ? rData.kingdoms.length : 0);
}

if (fs.existsSync(patternsFile)) {
  const pData = JSON.parse(fs.readFileSync(patternsFile, 'utf8'));
  patternCount = Array.isArray(pData) ? pData.length : (pData.patterns ? pData.patterns.length : 0);
}

console.log(`Total DSA Kingdoms Audited: ${kingdomCount}`);
console.log(`Total DSA Patterns Audited: ${patternCount}`);

fs.writeFileSync('scratch/dataset_integrity_results.json', JSON.stringify({
  totalCodeChefProblems,
  uniqueCodeChefIds: codechefIds.size,
  duplicateCodeChefIdsCount: duplicateCodeChefIds.length,
  invalidRatingsCount: invalidRatings.length,
  missingFieldsCount: missingFields.length,
  cfProblemsCount,
  kingdomCount,
  patternCount
}, null, 2));

console.log('\nDataset Integrity Audit Complete!');
