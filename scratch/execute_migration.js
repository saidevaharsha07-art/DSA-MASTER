const fs = require('fs');
const path = require('path');

console.log('=== EXECUTING CODECHEF MIGRATION & CONSOLIDATION ===');

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Move/copy raw data directories into data/codechef/
console.log('1. Migrating raw data into data/codechef/...');
copyDirSync('raw', 'data/codechef/raw');
copyDirSync('exports', 'data/codechef/exports');
if (fs.existsSync('exports/sections')) {
  copyDirSync('exports/sections', 'data/codechef/sections');
}

// Ensure final datasets exist directly in data/codechef/
const datasetsToEnsure = [
  'codechef_practice_complete.xlsx',
  'codechef_practice_complete.csv',
  'codechef_practice_complete.json',
  'duplicate_report.csv',
  'missing_report.csv',
  'CRAWL_REPORT.md',
  'crawl_report.md'
];

datasetsToEnsure.forEach(file => {
  const exportsPath = path.join('data/codechef/exports', file);
  const targetPath = path.join('data/codechef', file);
  const reportsPath = path.join('data/codechef/reports', file);

  if (fs.existsSync(exportsPath) && !fs.existsSync(targetPath)) {
    fs.copyFileSync(exportsPath, targetPath);
  }
  if (fs.existsSync(targetPath) && !fs.existsSync(reportsPath) && (file.endsWith('.csv') || file.endsWith('.md'))) {
    fs.mkdirSync('data/codechef/reports', { recursive: true });
    fs.copyFileSync(targetPath, reportsPath);
  }
});

// Also copy CodeChef_Master_Dataset.xlsx if present in root
if (fs.existsSync('CodeChef_Master_Dataset.xlsx')) {
  fs.copyFileSync('CodeChef_Master_Dataset.xlsx', 'data/codechef/codechef_practice_complete.xlsx');
}

// 2. Ensure tools/codechef-extractor/ has all python extractor scripts
console.log('2. Migrating extractor scripts into tools/codechef-extractor/...');
fs.mkdirSync('tools/codechef-extractor', { recursive: true });

const extractorScripts = [
  'crawl_catalog.py',
  'crawl_syllabus.py',
  'crawl_problem_details.py',
  'export_excel.py',
  'export_csv.py',
  'export_json.py',
  'validate.py',
  'audit.py',
  'resume.py',
  'config.py',
  'README.md',
  'implementation_plan.md',
  'walkthrough.md',
  'build_codechef_dataset.py',
  'generate_final_csv.py',
  'parse_curriculum.py',
  'sync_excel_from_csv.py',
  'validate_codechef.py'
];

extractorScripts.forEach(script => {
  const fromScripts = path.join('scripts', script);
  const fromRoot = script;
  const target = path.join('tools/codechef-extractor', script);

  if (fs.existsSync(fromScripts)) {
    fs.copyFileSync(fromScripts, target);
  } else if (fs.existsSync(fromRoot)) {
    fs.copyFileSync(fromRoot, target);
  }
});

console.log('=== FILE MIGRATION COMPLETE ===');
