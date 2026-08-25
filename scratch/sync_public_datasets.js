const fs = require('fs');
const path = require('path');

console.log('=== SYNCING PUBLIC CODECHEF DATASETS ===');

const publicTarget = 'public/data/codechef';
fs.mkdirSync(publicTarget, { recursive: true });

const filesToSync = [
  'codechef_practice_complete.json',
  'codechef_practice_complete.csv',
  'codechef_practice_complete.xlsx',
  'duplicate_report.csv',
  'missing_report.csv',
  'crawl_report.md'
];

filesToSync.forEach(file => {
  const src = path.join('data/codechef', file);
  const dest = path.join(publicTarget, file);

  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Synced ${src} -> ${dest}`);
  }
});

console.log('=== PUBLIC DATASETS SYNC COMPLETE ===');
