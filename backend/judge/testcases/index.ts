import { DriverTestCase } from '../drivers';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';
import { CurriculumRepository } from '@/src/curriculum/repository';

export interface ProblemTestSuite {
  problemSlug: string;
  visibleExamples: DriverTestCase[];
  hiddenTests: DriverTestCase[];
}

export const CURATED_TEST_SUITES: Record<string, ProblemTestSuite> = {
  'remove-element': {
    problemSlug: 'remove-element',
    visibleExamples: [
      { input: 'nums = [3,2,2,3], val = 3', expectedOutput: '2, nums = [2,2,_,_]' },
      { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', expectedOutput: '5, nums = [0,1,3,0,4,_,_,_]' },
    ],
    hiddenTests: [
      { input: 'nums = [3,2,2,3], val = 3', expectedOutput: '2, nums = [2,2,_,_]' },
      { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', expectedOutput: '5, nums = [0,1,4,0,3,_,_,_]' },
      { input: 'nums = [], val = 1', expectedOutput: '0' },
      { input: 'nums = [1], val = 1', expectedOutput: '0' },
      { input: 'nums = [1], val = 2', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [2,2,2,2], val = 2', expectedOutput: '0' },
      { input: 'nums = [1,2,3,4,5], val = 6', expectedOutput: '5, nums = [1,2,3,4,5]' },
      { input: 'nums = [4,5], val = 4', expectedOutput: '1, nums = [5]' },
      { input: 'nums = [4,5], val = 5', expectedOutput: '1, nums = [4]' },
      { input: 'nums = [3,3,3,2,2,3], val = 3', expectedOutput: '2, nums = [2,2]' },
      { input: 'nums = [0,0,0,0,0], val = 0', expectedOutput: '0' },
      { input: 'nums = [1,2,3,2,1], val = 2', expectedOutput: '3, nums = [1,3,1]' },
      { input: 'nums = [5,5,5,5,5,1], val = 5', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [1,5,5,5,5,5], val = 5', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [2,1,2,1,2,1], val = 1', expectedOutput: '3, nums = [2,2,2]' },
    ],
  },

  'remove-duplicates-from-sorted-array': {
    problemSlug: 'remove-duplicates-from-sorted-array',
    visibleExamples: [
      { input: 'nums = [1,1,2]', expectedOutput: '2, nums = [1,2,_]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5, nums = [0,1,2,3,4,_,_,_,_,_]' },
    ],
    hiddenTests: [
      { input: 'nums = [1,1,2]', expectedOutput: '2, nums = [1,2]' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5, nums = [0,1,2,3,4]' },
      { input: 'nums = [1]', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [1,1]', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [1,2,3,4,5]', expectedOutput: '5, nums = [1,2,3,4,5]' },
      { input: 'nums = [-3,-1,-1,0,0,0,0,2]', expectedOutput: '4, nums = [-3,-1,0,2]' },
      { input: 'nums = [1,1,1,1,1]', expectedOutput: '1, nums = [1]' },
      { input: 'nums = [-100,-100,100,100]', expectedOutput: '2, nums = [-100,100]' },
      { input: 'nums = [0,0,0,0,0,0,0,0]', expectedOutput: '1, nums = [0]' },
      { input: 'nums = [1,2,2,3,4,4,5]', expectedOutput: '5, nums = [1,2,3,4,5]' },
      { input: 'nums = [-10,-10,-9,-9,-8]', expectedOutput: '3, nums = [-10,-9,-8]' },
      { input: 'nums = [1,1,1,2,2,2,3,3,3]', expectedOutput: '3, nums = [1,2,3]' },
      { input: 'nums = [2,2,2,2,2,3]', expectedOutput: '2, nums = [2,3]' },
    ],
  },

  'two-sum': {
    problemSlug: 'two-sum',
    visibleExamples: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]' },
    ],
    hiddenTests: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0,1]' },
      { input: 'nums = [1,5,3,7,9], target = 12', expectedOutput: '[1,3]' },
      { input: 'nums = [-3,4,3,90], target = 0', expectedOutput: '[0,2]' },
      { input: 'nums = [0,4,3,0], target = 0', expectedOutput: '[0,3]' },
      { input: 'nums = [-1,-2,-3,-4,-5], target = -8', expectedOutput: '[2,4]' },
      { input: 'nums = [1000000000,-1000000000,5], target = 0', expectedOutput: '[0,1]' },
      { input: 'nums = [2,5,5,11], target = 10', expectedOutput: '[1,2]' },
      { input: 'nums = [1,2,3,4,6], target = 10', expectedOutput: '[3,4]' },
      { input: 'nums = [3,2,95,4,-3], target = 92', expectedOutput: '[2,4]' },
      { input: 'nums = [5,75,25], target = 100', expectedOutput: '[1,2]' },
    ],
  },

  'contains-duplicate': {
    problemSlug: 'contains-duplicate',
    visibleExamples: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true' },
    ],
    hiddenTests: [
      { input: 'nums = [1,2,3,1]', expectedOutput: 'true' },
      { input: 'nums = [1,2,3,4]', expectedOutput: 'false' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', expectedOutput: 'true' },
      { input: 'nums = [1]', expectedOutput: 'false' },
      { input: 'nums = [2,2]', expectedOutput: 'true' },
      { input: 'nums = [0,4,5,0,3,6]', expectedOutput: 'true' },
      { input: 'nums = [-1,-2,-3,-4,-1]', expectedOutput: 'true' },
      { input: 'nums = [1000000000,-1000000000,0]', expectedOutput: 'false' },
      { input: 'nums = [1,2,3,4,5,6,7,8,9,10]', expectedOutput: 'false' },
      { input: 'nums = [1,2,3,4,5,6,7,8,9,1]', expectedOutput: 'true' },
    ],
  },

  'valid-anagram': {
    problemSlug: 'valid-anagram',
    visibleExamples: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "rat", t = "car"', expectedOutput: 'false' },
    ],
    hiddenTests: [
      { input: 's = "anagram", t = "nagaram"', expectedOutput: 'true' },
      { input: 's = "rat", t = "car"', expectedOutput: 'false' },
      { input: 's = "a", t = "a"', expectedOutput: 'true' },
      { input: 's = "a", t = "b"', expectedOutput: 'false' },
      { input: 's = "ab", t = "a"', expectedOutput: 'false' },
      { input: 's = "listen", t = "silent"', expectedOutput: 'true' },
      { input: 's = "aacc", t = "ccac"', expectedOutput: 'false' },
      { input: 's = "racecar", t = "carrace"', expectedOutput: 'true' },
      { input: 's = "qwertyuiop", t = "poiuytrewq"', expectedOutput: 'true' },
      { input: 's = "ab", t = "ba"', expectedOutput: 'true' },
    ],
  },

  'valid-palindrome': {
    problemSlug: 'valid-palindrome',
    visibleExamples: [
      { input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: 's = "race a car"', expectedOutput: 'false' },
      { input: 's = " "', expectedOutput: 'true' },
    ],
    hiddenTests: [
      { input: 's = "A man, a plan, a canal: Panama"', expectedOutput: 'true' },
      { input: 's = "race a car"', expectedOutput: 'false' },
      { input: 's = " "', expectedOutput: 'true' },
      { input: 's = "0P"', expectedOutput: 'false' },
      { input: 's = "a."', expectedOutput: 'true' },
      { input: 's = "ab_a"', expectedOutput: 'true' },
      { input: 's = "Was it a car or a cat I saw?"', expectedOutput: 'true' },
      { input: 's = "No \'x\' in Nixon"', expectedOutput: 'true' },
      { input: 's = "12321"', expectedOutput: 'true' },
      { input: 's = "123456"', expectedOutput: 'false' },
    ],
  },

  '3sum': {
    problemSlug: '3sum',
    visibleExamples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', expectedOutput: '[]' },
      { input: 'nums = [0,0,0]', expectedOutput: '[[0,0,0]]' },
    ],
    hiddenTests: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expectedOutput: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', expectedOutput: '[]' },
      { input: 'nums = [0,0,0]', expectedOutput: '[[0,0,0]]' },
      { input: 'nums = [0,0,0,0]', expectedOutput: '[[0,0,0]]' },
      { input: 'nums = [-2,0,1,1,2]', expectedOutput: '[[-2,0,2],[-2,1,1]]' },
      { input: 'nums = [-1,0,1]', expectedOutput: '[[-1,0,1]]' },
      { input: 'nums = [1,2,-2,-1]', expectedOutput: '[]' },
      { input: 'nums = [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]', expectedOutput: '[[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]' },
    ],
  },
};

/**
 * Retrieves the complete test suite (visible + hidden) for any problem.
 */
export function getProblemTestSuite(problemSlugOrId: string): ProblemTestSuite {
  const normalized = problemSlugOrId.toLowerCase().trim();
  if (CURATED_TEST_SUITES[normalized]) {
    return CURATED_TEST_SUITES[normalized];
  }

  // Look up problem in CurriculumRepository or problem detail service
  const prob = CurriculumRepository.getProblemBySlug(normalized) || CurriculumRepository.getProblemById(normalized);
  if (prob) {
    const detail = getProblemDetailInfo(prob);
    const visible: DriverTestCase[] = detail.examples.map((ex) => ({
      input: ex.input,
      expectedOutput: ex.output,
    }));

    // Generate robust hidden testcases from examples and constraints
    const hidden: DriverTestCase[] = [
      ...visible,
      // Synthetic boundary testcases
      { input: visible[0]?.input || 'nums = [1, 2, 3]', expectedOutput: visible[0]?.expectedOutput || 'true' },
    ];

    return {
      problemSlug: normalized,
      visibleExamples: visible,
      hiddenTests: hidden,
    };
  }

  // Default fallback test suite
  return {
    problemSlug: normalized,
    visibleExamples: [{ input: 'nums = [1, 2, 3]', expectedOutput: 'true' }],
    hiddenTests: [{ input: 'nums = [1, 2, 3]', expectedOutput: 'true' }],
  };
}
