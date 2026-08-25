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

const allPages = walk('src/app/(app)');
console.log(`Inspecting ${allPages.length} main app pages for UI/UX tokens.`);

const uiAuditResults = [];

allPages.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const content = fs.readFileSync(file, 'utf8');

  const hasGlassmorphism = content.includes('backdrop-blur') || content.includes('bg-slate-900/60') || content.includes('bg-slate-900/80');
  const hasResponsiveClasses = content.includes('sm:') || content.includes('md:') || content.includes('lg:');
  const hasHoverStates = content.includes('hover:');
  const hasFocusStates = content.includes('focus:');
  const hasLoadingState = content.includes('Loading') || content.includes('animate-spin') || content.includes('isLoading');
  const hasEmptyState = content.includes('No ') || content.includes('empty') || content.includes('Found 0');
  const hasErrorState = content.includes('error') || content.includes('Error');

  uiAuditResults.push({
    file,
    hasGlassmorphism,
    hasResponsiveClasses,
    hasHoverStates,
    hasFocusStates,
    hasLoadingState,
    hasEmptyState,
    hasErrorState
  });
});

console.log('UI/UX Audit Breakdown:');
uiAuditResults.forEach(res => {
  console.log(`- ${res.file} | Glass: ${res.hasGlassmorphism} | Resp: ${res.hasResponsiveClasses} | Hover: ${res.hasHoverStates} | Focus: ${res.hasFocusStates} | Load: ${res.hasLoadingState} | Empty: ${res.hasEmptyState}`);
});

fs.writeFileSync('scratch/ui_ux_audit_results.json', JSON.stringify(uiAuditResults, null, 2));

console.log('\nUI/UX Audit Scanner Complete!');
