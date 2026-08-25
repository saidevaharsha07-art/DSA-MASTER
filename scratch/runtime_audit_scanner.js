const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
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

const appPages = walk('src/app');

console.log('--- APP PAGES ANALYSIS ---');

const pageAudits = [];

appPages.forEach(p => {
  if (!p.endsWith('page.tsx')) return;
  const content = fs.readFileSync(p, 'utf8');

  const usesAppBackend = content.includes('useAppBackend');
  const usesContainer = content.includes('Container.resolve') || content.includes('Container.register');
  const usesLocalStorage = content.includes('localStorage');
  const usesEventBus = content.includes('EventBus');
  const hasMockData = /mock|dummy|fake|TODO|FIXME|hardcoded/i.test(content);
  const lineCount = content.split('\n').length;

  pageAudits.push({
    path: p,
    lineCount,
    usesAppBackend,
    usesContainer,
    usesLocalStorage,
    usesEventBus,
    hasMockKeywords: hasMockData,
    isDevRoute: p.includes('(dev)') || p.includes('/dev/')
  });
});

console.log(`Audited ${pageAudits.length} App Router pages.`);
const mainAudits = pageAudits.filter(a => !a.isDevRoute);
const devAudits = pageAudits.filter(a => a.isDevRoute);

console.log(`\nMain Pages (${mainAudits.length}):`);
mainAudits.forEach(a => {
  console.log(`- ${a.path} (${a.lineCount} lines) | AppBackend: ${a.usesAppBackend} | LocalStorage: ${a.usesLocalStorage} | EventBus: ${a.usesEventBus} | MockKeywords: ${a.hasMockKeywords}`);
});

fs.writeFileSync('scratch/runtime_audit_summary.json', JSON.stringify({
  totalPages: pageAudits.length,
  mainAudits,
  devAudits
}, null, 2));

console.log('\nRuntime audit scanner complete!');
