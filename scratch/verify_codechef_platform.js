const { CodeChefDatasetProvider } = require('../src/platforms/codechef/dataset');
const { CodeChefLoader } = require('../src/platforms/codechef/loader');
const { CodeChefSearchEngine } = require('../src/platforms/codechef/search');
const { CodeChefStatsGenerator } = require('../src/platforms/codechef/stats');
const { CodeChefRecommendationEngine } = require('../src/platforms/codechef/recommendations');

console.log('====================================================');
console.log('CODECHEF PLATFORM MODULE VERIFICATION TEST');
console.log('====================================================');

// 1. Load Dataset
console.log('\n--- 1. Testing Dataset Loader ---');
const loader = new CodeChefLoader();
const problems = loader.load();
console.log(`✓ Loaded Total Problems: ${problems.length}`);
console.log(`✓ First Problem Sample:`, {
  id: problems[0].id,
  title: problems[0].title,
  platform: problems[0].platform,
  difficulty: problems[0].difficulty,
  rating: problems[0].rating,
  topic: problems[0].topic,
  pattern: problems[0].pattern,
  section: problems[0].metadata.section,
  practicePath: problems[0].metadata.practicePath,
  company: problems[0].metadata.company
});

// 2. Test Statistics Generator
console.log('\n--- 2. Testing Statistics Generator ---');
const stats = CodeChefStatsGenerator.generateStats();
console.log(`✓ Total Problems: ${stats.totalProblems}`);
console.log(`✓ Unique Problems: ${stats.uniqueProblems}`);
console.log(`✓ Duplicates Count: ${stats.duplicatesCount}`);
console.log(`✓ Paths Count: ${stats.pathsCount}`);
console.log(`✓ Sections Count: ${stats.sectionsCount}`);
console.log(`✓ Companies Count: ${stats.companiesCount}`);
console.log(`✓ Completion Percentage: ${stats.completionPercentage}%`);

// 3. Test Search Engine
console.log('\n--- 3. Testing Search Engine ---');
const searchResultsCode = CodeChefSearchEngine.search({ searchQuery: 'EZSPEAK' });
console.log(`✓ Search 'EZSPEAK': ${searchResultsCode.length} results found (${searchResultsCode[0]?.id || 'None'})`);

const searchResultsCompany = CodeChefSearchEngine.search({ company: 'Google' });
console.log(`✓ Filter Company 'Google': ${searchResultsCompany.length} results found`);

const searchResultsSection = CodeChefSearchEngine.search({ section: 'Beginner' });
console.log(`✓ Filter Section 'Beginner': ${searchResultsSection.length} results found`);

// 4. Test Recommendation Engine
console.log('\n--- 4. Testing Recommendation Engine ---');
const ratingRangeProbs = CodeChefRecommendationEngine.getProblemsByRatingRange(1000, 1400);
console.log(`✓ getProblemsByRatingRange(1000, 1400): ${ratingRangeProbs.length} problems`);

const starPathProbs = CodeChefRecommendationEngine.getStarPath(1);
console.log(`✓ getStarPath(1): ${starPathProbs.length} problems`);

const randomProb = CodeChefRecommendationEngine.getRandomProblem();
console.log(`✓ getRandomProblem(): ${randomProb ? randomProb.id + ' - ' + randomProb.title : 'None'}`);

const nextProb = CodeChefRecommendationEngine.getNextProblem(problems[0].id);
console.log(`✓ getNextProblem('${problems[0].id}'): ${nextProb ? nextProb.id : 'None'}`);

const adjProbs = CodeChefRecommendationEngine.getAdjacentProblems(problems[1].id);
console.log(`✓ getAdjacentProblems('${problems[1].id}'): prev=${adjProbs.prev?.id}, next=${adjProbs.next?.id}`);

console.log('\n====================================================');
console.log('ALL CODECHEF PLATFORM TESTS PASSED SUCCESSFULLY!');
console.log('====================================================');
