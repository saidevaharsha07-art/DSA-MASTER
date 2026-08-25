const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('TRACING CODECHEF ROUTE & COMPONENT RENDER CHAIN');
console.log('====================================================');

const pageFile = 'src/app/(app)/practice/codechef/page.tsx';
console.log(`1. Route File: ${pageFile}`);

if (fs.existsSync(pageFile)) {
  const content = fs.readFileSync(pageFile, 'utf8');
  console.log('--- File Content ---');
  console.log(content.trim());
  console.log('--------------------');
}

const componentFile = 'src/features/codechef/components/CodeChefArenaView.tsx';
console.log(`\n2. Main Component File: ${componentFile}`);
if (fs.existsSync(componentFile)) {
  const content = fs.readFileSync(componentFile, 'utf8');
  console.log('Sub-components rendered by CodeChefArenaView:');
  const imports = content.match(/import \{[^}]+\} from '[^']+'/g);
  if (imports) {
    imports.forEach((imp) => console.log(`   - ${imp}`));
  }
}

console.log('\n====================================================');
console.log('RENDER CHAIN TRACE COMPLETE!');
console.log('====================================================');
