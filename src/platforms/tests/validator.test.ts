/**
 * Unit Test: Platform Validator & Health Report
 */

import { PlatformValidator } from '../validation/platform.validator';
import { PlatformProblem } from '../types';

export function testValidator(): void {
  console.log('--- Testing Platform Validator & Health Report ---');

  // Test valid dataset
  const mockValid: PlatformProblem[] = [
    {
      id: 'P1',
      title: 'Valid Problem 1',
      platform: 'codechef',
      difficulty: 'Easy',
      rating: 1000,
      topic: 'Arrays',
      pattern: 'Basic',
      url: 'https://www.codechef.com/problems/P1',
      solved: false,
      metadata: { notes: 'sample' },
    },
    {
      id: 'P2',
      title: 'Valid Problem 2',
      platform: 'codechef',
      difficulty: 'Medium',
      rating: 1500,
      topic: 'Arrays',
      pattern: 'Basic',
      url: 'https://www.codechef.com/problems/P2',
      solved: true,
      metadata: { notes: 'sample' },
    },
  ];

  const validReport = PlatformValidator.validate('codechef', mockValid);
  if (!validReport.valid || validReport.errors.length > 0) {
    throw new Error(`Validation on valid dataset failed! ${validReport.summary}`);
  }
  console.log('[PASS] Valid dataset passed validation.');

  // Test Dataset Health Report
  const healthReport = PlatformValidator.generateHealthReport('codechef', mockValid);
  if (healthReport.healthScore !== 100 || healthReport.validProblems !== 2) {
    throw new Error(`Dataset health report score calculation failed! Score: ${healthReport.healthScore}`);
  }
  console.log(`[PASS] Health report calculation verified (Score: ${healthReport.healthScore}%).`);

  // Test duplicate title warning
  const mockDupTitle: PlatformProblem[] = [
    {
      id: 'P1',
      title: 'Identical Title',
      platform: 'codechef',
      difficulty: 'Easy',
      rating: 1000,
      topic: 'Arrays',
      pattern: 'Basic',
      url: 'https://www.codechef.com/problems/P1',
      solved: false,
      metadata: { notes: 'sample' },
    },
    {
      id: 'P2',
      title: 'Identical Title',
      platform: 'codechef',
      difficulty: 'Medium',
      rating: 1500,
      topic: 'Arrays',
      pattern: 'Basic',
      url: 'https://www.codechef.com/problems/P2',
      solved: true,
      metadata: { notes: 'sample' },
    },
  ];

  const dupTitleReport = PlatformValidator.validate('codechef', mockDupTitle);
  const titleWarnings = dupTitleReport.warnings.filter((w) => w.field === 'title');
  if (titleWarnings.length === 0) {
    throw new Error('Validator failed to emit warning for duplicate problem titles!');
  }
  console.log('[PASS] Duplicate title warning detection verified.');

  // Test empty dataset handling
  const emptyReport = PlatformValidator.validate('codechef', []);
  if (emptyReport.valid || emptyReport.errors.length === 0) {
    throw new Error('Validator failed to catch empty dataset!');
  }
  console.log('[PASS] Empty dataset handling verified.');
}
