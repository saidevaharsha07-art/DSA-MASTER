const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === '.next') return;
    const fullPath = path.join(dir, file).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = walk('.');
console.log(`Total repository files: ${allFiles.length}`);

// Keyword search for Mock / TODO / Placeholder / FIXME / HACK / temp
const keywordMatches = [];
const searchKeywords = ['TODO', 'FIXME', 'HACK', 'placeholder', 'dummy', 'mock', 'sample', 'fake', 'coming soon', 'disabled', 'temp'];

allFiles.forEach(file => {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.js') && !file.endsWith('.jsx')) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    searchKeywords.forEach(kw => {
      if (line.toLowerCase().includes(kw.toLowerCase())) {
        keywordMatches.push({
          file,
          line: idx + 1,
          keyword: kw,
          content: line.trim()
        });
      }
    });
  });
});

console.log(`Found ${keywordMatches.length} total keyword occurrences (TODO, FIXME, mock, dummy, etc.).`);

const byKeyword = {};
keywordMatches.forEach(m => {
  byKeyword[m.keyword] = (byKeyword[m.keyword] || 0) + 1;
});
console.log('Occurrences by keyword:', byKeyword);

const byFolder = {};
keywordMatches.forEach(m => {
  const folder = m.file.split('/')[0];
  byFolder[folder] = (byFolder[folder] || 0) + 1;
});
console.log('Keyword occurrences by top folder:', byFolder);

fs.writeFileSync('scratch/cto_audit_keyword_results.json', JSON.stringify({
  totalMatches: keywordMatches.length,
  byKeyword,
  byFolder,
  sampleMatches: keywordMatches.slice(0, 50)
}, null, 2));

console.log('\nCTO audit scanner complete!');
