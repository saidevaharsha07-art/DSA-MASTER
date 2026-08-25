const { CurriculumRepository } = require('../src/curriculum/repository');

console.log('====================================================');
console.log('TESTING CURRICULUM REPOSITORY CODECHEF INTEGRATION');
console.log('====================================================');

const allProblems = CurriculumRepository.getAllProblems();
console.log(`✓ CurriculumRepository.getAllProblems() returned ${allProblems.length} TOTAL problems!`);

const ccProblems = allProblems.filter(p => p.url.includes('codechef.com'));
console.log(`✓ Total CodeChef problems in CurriculumRepository: ${ccProblems.length}`);

const cfProblems = allProblems.filter(p => p.url.includes('codeforces.com'));
console.log(`✓ Total Codeforces problems in CurriculumRepository: ${cfProblems.length}`);

const lcProblems = allProblems.filter(p => p.url.includes('leetcode.com'));
console.log(`✓ Total LeetCode problems in CurriculumRepository: ${lcProblems.length}`);

if (ccProblems.length > 0) {
  console.log('\nSample CodeChef Problem in CurriculumRepository:', {
    id: ccProblems[0].id,
    title: ccProblems[0].title,
    difficulty: ccProblems[0].difficulty,
    level: ccProblems[0].level,
    categorySlug: ccProblems[0].categorySlug,
    url: ccProblems[0].url
  });
}

console.log('\n====================================================');
console.log('CURRICULUM REPOSITORY VERIFICATION COMPLETE!');
console.log('====================================================');
