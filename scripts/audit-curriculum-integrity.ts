import { ALL_CATEGORIES } from '../src/curriculum/models/categories';
import { ALL_SUBTOPICS } from '../src/curriculum/models/subtopics';
import { ALL_PATTERNS } from '../src/curriculum/models/patterns';
import { ALL_PROBLEMS } from '../src/curriculum/models/problems';

console.log('=== CURRICULUM AUDIT ===');
console.log('Total Categories (Learning Areas):', ALL_CATEGORIES.length);
console.log('Total Subtopics:', ALL_SUBTOPICS.length);
console.log('Total Patterns:', ALL_PATTERNS.length);
console.log('Total Problems:', ALL_PROBLEMS.length);

// 1. Check platforms
const platformCounts: Record<string, number> = {};
for (const p of ALL_PROBLEMS) {
  const plat = p.platform || 'unknown';
  platformCounts[plat] = (platformCounts[plat] || 0) + 1;
}
console.log('\n=== PLATFORM BREAKDOWN ===', platformCounts);

// 2. Check problem mapping integrity
let missingArea = 0;
let missingSubtopic = 0;
let missingPattern = 0;
let missingPlatform = 0;
let invalidPatternRef = 0;
let invalidSubtopicRef = 0;
let invalidCategoryRef = 0;

const catIdSet = new Set(ALL_CATEGORIES.map((c) => c.id));
const catSlugSet = new Set(ALL_CATEGORIES.map((c) => c.slug));
const subIdSet = new Set(ALL_SUBTOPICS.map((s) => s.id));
const subSlugSet = new Set(ALL_SUBTOPICS.map((s) => s.slug));
const patIdSet = new Set(ALL_PATTERNS.map((p) => p.id));
const patSlugSet = new Set(ALL_PATTERNS.map((p) => p.slug));

const problemIds = new Set<string>();
let duplicateProblemIds = 0;

const problemUrlsByPlatform: Record<string, Set<string>> = {
  leetcode: new Set(),
  codechef: new Set(),
  codeforces: new Set(),
  geeksforgeeks: new Set(),
};
const duplicateUrlsByPlatform: Record<string, number> = {
  leetcode: 0,
  codechef: 0,
  codeforces: 0,
  geeksforgeeks: 0,
};

for (const p of ALL_PROBLEMS) {
  if (problemIds.has(p.id)) {
    duplicateProblemIds++;
    console.log('Duplicate problem ID:', p.id);
  }
  problemIds.add(p.id);

  if (p.url) {
    const plat = p.platform || 'unknown';
    const normUrl = p.url.toLowerCase().replace(/\/+$/, '');
    if (!problemUrlsByPlatform[plat]) {
      problemUrlsByPlatform[plat] = new Set();
      duplicateUrlsByPlatform[plat] = 0;
    }
    if (problemUrlsByPlatform[plat].has(normUrl)) {
      duplicateUrlsByPlatform[plat]++;
      if (plat === 'codechef') {
        console.log(`Duplicate CodeChef problem URL: ${p.id} ${p.url}`);
      }
    }
    problemUrlsByPlatform[plat].add(normUrl);
  }

  if (!p.learningAreaId && !p.categoryId) missingArea++;
  if (!p.subtopicId && !p.subtopicSlug) missingSubtopic++;
  if (!p.patternId && !p.patternSlug) missingPattern++;
  if (!p.platform) missingPlatform++;

  if (p.categoryId && !catIdSet.has(p.categoryId) && !catSlugSet.has(p.categoryId)) {
    invalidCategoryRef++;
  }
  if (p.patternId && !patIdSet.has(p.patternId) && !patSlugSet.has(p.patternId)) {
    invalidPatternRef++;
  }
  if (p.subtopicId && !subIdSet.has(p.subtopicId) && !subSlugSet.has(p.subtopicId)) {
    invalidSubtopicRef++;
  }
}

console.log('\n=== PROBLEM INTEGRITY RESULTS ===');
console.log('Missing Area:', missingArea);
console.log('Missing Subtopic:', missingSubtopic);
console.log('Missing Pattern:', missingPattern);
console.log('Missing Platform:', missingPlatform);
console.log('Invalid Category Refs:', invalidCategoryRef);
console.log('Invalid Subtopic Refs:', invalidSubtopicRef);
console.log('Invalid Pattern Refs:', invalidPatternRef);
console.log('Duplicate Problem IDs:', duplicateProblemIds);
console.log('Duplicate URLs by Platform:', duplicateUrlsByPlatform);

// 3. Check Subtopics & Patterns relationships (no orphans)
let orphanSubtopics = 0;
for (const sub of ALL_SUBTOPICS) {
  if (!catIdSet.has(sub.categoryId)) {
    orphanSubtopics++;
    console.log('Orphan Subtopic (no valid category):', sub.id, sub.categoryId);
  }
}
console.log('\n=== HIERARCHY INTEGRITY ===');
console.log('Orphan Subtopics:', orphanSubtopics);

let orphanPatterns = 0;
for (const pat of ALL_PATTERNS) {
  if (!pat.subtopicId || !subIdSet.has(pat.subtopicId)) {
    orphanPatterns++;
    console.log('Orphan Pattern (no valid subtopic):', pat.id, pat.subtopicId);
  }
}
console.log('Orphan Patterns:', orphanPatterns);

// 4. Check for Prerequisite Cycles
const graph = new Map<string, string[]>();
for (const pat of ALL_PATTERNS) {
  graph.set(pat.id, (pat as any).prerequisites || []);
}

let cycleDetected = false;
const visited = new Set<string>();
const recStack = new Set<string>();

function hasCycle(node: string): boolean {
  visited.add(node);
  recStack.add(node);

  const neighbors = graph.get(node) || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      if (hasCycle(neighbor)) return true;
    } else if (recStack.has(neighbor)) {
      console.log(`Cycle detected involving: ${node} -> ${neighbor}`);
      return true;
    }
  }

  recStack.delete(node);
  return false;
}

for (const patId of graph.keys()) {
  if (!visited.has(patId)) {
    if (hasCycle(patId)) {
      cycleDetected = true;
      break;
    }
  }
}
console.log('Prerequisite Cycles Detected:', cycleDetected);

// 5. Check per-area platform counts
console.log('\n=== PER-AREA FOUR-PLATFORM COUNTS ===');
for (const cat of ALL_CATEGORIES) {
  const problems = ALL_PROBLEMS.filter((p) => p.categorySlug === cat.slug || p.categoryId === cat.id);
  const lc = problems.filter((p) => p.platform === 'leetcode').length;
  const cc = problems.filter((p) => p.platform === 'codechef').length;
  const cf = problems.filter((p) => p.platform === 'codeforces').length;
  const gfg = problems.filter((p) => p.platform === 'geeksforgeeks').length;
  console.log(`${cat.title} (${cat.slug}): Total=${problems.length} | LC=${lc} | CC=${cc} | CF=${cf} | GFG=${gfg}`);
}

console.log('\n=== EXACT TARGET VERIFICATION ===');
console.log(`CodeChef Total: ${platformCounts['codechef']} (Target: 1000) => ${platformCounts['codechef'] === 1000 ? 'EXACT MATCH PASSED' : 'FAILED'}`);
console.log(`LeetCode Total: ${platformCounts['leetcode']} (Target: 1000) => ${platformCounts['leetcode'] === 1000 ? 'EXACT MATCH PASSED' : 'FAILED'}`);
console.log(`Codeforces Total: ${platformCounts['codeforces']} (Target: 1000) => ${platformCounts['codeforces'] === 1000 ? 'EXACT MATCH PASSED' : 'FAILED'}`);
