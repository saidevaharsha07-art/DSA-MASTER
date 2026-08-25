const fs = require('fs');
const path = require('path');

console.log('--- STARTING QA FUNCTIONAL VERIFICATION SIMULATION ---');

const codechefFile = 'src/app/(app)/practice/codechef/page.tsx';
const codechefContent = fs.readFileSync(codechefFile, 'utf8');

const hasLocalStorage = codechefContent.includes('localStorage.getItem') && codechefContent.includes('localStorage.setItem');
const storageKeyMatch = codechefContent.match(/STORAGE_KEY\s*=\s*['"]([^'"]+)['"]/);
const storageKey = storageKeyMatch ? storageKeyMatch[1] : 'codechef_rating_arena_user_state_v2';

console.log(`[QA CHECK] CodeChef Arena LocalStorage Integration: ${hasLocalStorage ? 'PASSED' : 'FAILED'} (Key: ${storageKey})`);

const hasEventBusPublish = codechefContent.includes("EventBus.publish('ProblemSolved'");
console.log(`[QA CHECK] CodeChef Arena EventBus 'ProblemSolved' Event Publishing: ${hasEventBusPublish ? 'PASSED' : 'FAILED'}`);

const providerFile = 'src/components/providers/AppBackendProvider.tsx';
const providerContent = fs.readFileSync(providerFile, 'utf8');

const hasEventBusSub = providerContent.includes("EventBus.subscribe('ProblemSolved'") && providerContent.includes("EventBus.subscribe('AchievementUnlocked'");
console.log(`[QA CHECK] AppBackendProvider EventBus Subscription: ${hasEventBusSub ? 'PASSED' : 'FAILED'}`);

const layoutFile = 'src/app/(app)/layout.tsx';
const layoutContent = fs.readFileSync(layoutFile, 'utf8');

const navMatches = layoutContent.match(/href:\s*['"]([^'"]+)['"]/g) || [];
const headerRoutes = navMatches.map(m => m.replace(/href:\s*['"]/, '').replace(/['"]/, ''));

console.log(`[QA CHECK] Header Navigation Routes (${headerRoutes.length}):`, headerRoutes);

const unlinked = ['/practice/codechef', '/kingdoms', '/patterns', '/learning', '/roadmap', '/dev/system'];
const missingFromHeader = unlinked.filter(r => !headerRoutes.includes(r));
console.log(`[QA CHECK] Unlinked Routes Missing from Header Navigation:`, missingFromHeader);

fs.writeFileSync('scratch/qa_verification_results.json', JSON.stringify({
  codechefLocalStoragePassed: hasLocalStorage,
  storageKey,
  eventBusPublishPassed: hasEventBusPublish,
  eventBusSubPassed: hasEventBusSub,
  headerRoutes,
  missingFromHeader
}, null, 2));

console.log('\nQA Verification Simulation Complete!');
