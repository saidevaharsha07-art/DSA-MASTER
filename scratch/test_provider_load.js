const { ProblemProvider } = require('../src/platforms/problem.provider');
const { PlatformRegistry } = require('../src/platforms/registry');
const { CodeChefLoader } = require('../src/platforms/codechef/loader');

console.log('=== TESTING PROBLEM PROVIDER CODECHEF LOADING ===');

const registry = PlatformRegistry.getInstance();

// Re-register CodeChefLoader from src/platforms/codechef/loader
registry.registerPlatform(
  {
    id: 'codechef',
    displayName: 'CodeChef',
    logo: '/assets/platforms/codechef.svg',
    themeColor: '#5B4636',
    websiteUrl: 'https://www.codechef.com',
    status: 'active',
    capabilities: {
      supportsRating: true,
      supportsContests: true,
      supportsEditorial: true,
      supportsSubmissions: true,
      supportsCustomTestcases: true,
    },
    difficultySystem: ['Beginner', 'Easy', 'Medium', 'Hard', 'Expert'],
  },
  new CodeChefLoader(),
  true
);

const provider = new ProblemProvider(registry);
const problems = provider.getPlatformProblems('codechef');

console.log(`✓ ProblemProvider loaded ${problems.length} CodeChef problems!`);
if (problems.length > 0) {
  console.log('Sample Problem:', {
    id: problems[0].id,
    title: problems[0].title,
    platform: problems[0].platform,
    rating: problems[0].rating,
    topic: problems[0].topic,
    pattern: problems[0].pattern
  });
}
