const fs = require('fs');
const path = require('path');

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.next') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, fileList);
    } else {
      fileList.push(filePath.replace(/\\/g, '/'));
    }
  }
  return fileList;
}

const allFiles = walkDir('.');
console.log(`Total files scanned across repo: ${allFiles.length}`);

// App pages
const pageFiles = allFiles.filter(f => (f.startsWith('src/app/') || f.startsWith('app/')) && f.endsWith('page.tsx'));
const mainPages = pageFiles.filter(p => !p.includes('(dev)') && !p.includes('/dev/'));
const devPages = pageFiles.filter(p => p.includes('(dev)') || p.includes('/dev/'));

console.log(`\nApp Router Pages (${pageFiles.length}):`);
console.log(`Main User Pages (${mainPages.length}):`);
mainPages.forEach(p => console.log('  [MAIN]', p));
console.log(`Developer Debug Pages (${devPages.length}):`);
devPages.forEach(p => console.log('  [DEV]', p));

// Detect root level duplicates vs src/ level
const topFolders = fs.readdirSync('.').filter(f => fs.statSync(f).isDirectory() && !f.startsWith('.'));
console.log('\nTop Level Directories:', topFolders);

// Subdirectories in src/
const srcDirs = fs.readdirSync('src').filter(f => fs.statSync(path.join('src', f)).isDirectory());
console.log('\nsrc/ Subdirectories:', srcDirs);

// Datasets list
const jsonFiles = allFiles.filter(f => f.endsWith('.json') || f.endsWith('.xlsx') || f.endsWith('.csv'));
console.log(`\nDataset Files (${jsonFiles.length}):`);
jsonFiles.forEach(j => console.log('  [DATASET]', j));

fs.writeFileSync('scratch/audit_summary_data.json', JSON.stringify({
  totalFiles: allFiles.length,
  pageFiles,
  mainPages,
  devPages,
  jsonFiles,
  srcDirs
}, null, 2));
