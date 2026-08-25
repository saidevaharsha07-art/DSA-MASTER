const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('AUDITING MULTI-PAGE PLATFORM INTEGRATION FOR CODECHEF');
console.log('====================================================');

function searchFiles(dir, matchFn) {
  let results = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    fs.readdirSync(d).forEach(f => {
      if (f === 'node_modules' || f === '.git' || f === '.next' || f === 'scratch') return;
      const full = path.join(d, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else if (f.endsWith('.ts') || f.endsWith('.tsx')) {
        const content = fs.readFileSync(full, 'utf8');
        if (matchFn(content, f, full)) {
          results.push(full.replace(/\\/g, '/'));
        }
      }
    });
  }
  walk(dir);
  return results;
}

console.log('\n1. Pages referencing Platform Filters (leetcode / codeforces / mentorpick):');
const platformPages = searchFiles('src/app', (content) => {
  return content.includes('leetcode') || content.includes('codeforces') || content.includes('mentorpick');
});
platformPages.forEach(p => console.log(`  - ${p}`));

console.log('\n2. Feature Components referencing Platform Problems:');
const featureComponents = searchFiles('src', (content, filename) => {
  return (content.includes('leetcode') || content.includes('codeforces')) && (filename.endsWith('.tsx') || filename.endsWith('.ts'));
});
featureComponents.forEach(f => console.log(`  - ${f}`));

console.log('\nAudit complete.');
