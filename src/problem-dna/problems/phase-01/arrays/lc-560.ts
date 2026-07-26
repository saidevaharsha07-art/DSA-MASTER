import { ProblemDNA } from '@/src/problem-dna/types';

const lc560: ProblemDNA = {
  id: 'lc-560',
  slug: 'subarray-sum-equals-k',
  title: 'Subarray Sum Equals K',
  leetcodeNumber: 560,
  difficulty: 'Medium',
  estimatedTime: 30,
  
  patterns: ['prefix-sum'],
  subPatterns: ['hash-map'],
  
  recognitionSignals: [
    {
      description: 'The problem asks for the number of continuous subarrays that sum to a specific value.',
      keywords: ['continuous subarray', 'sum equals k']
    }
  ],
  mentalModel: 'Instead of finding sums of all subarrays directly, we can keep a running prefix sum and use a hash map to remember how many times we have seen a specific prefix sum before. If current_sum - k exists in our hash map, it means there is a subarray ending here that sums to k.',
  thinkingSteps: [
    {
      step: 1,
      description: 'Initialize a running sum `currSum = 0` and a hash map `prefixCounts` to store the frequency of seen prefix sums.',
      codeSnippet: 'let currSum = 0; const prefixCounts = new Map(); prefixCounts.set(0, 1);'
    },
    {
      step: 2,
      description: 'Iterate through the array. Add the current element to `currSum`.',
    },
    {
      step: 3,
      description: 'Check if `currSum - k` exists in `prefixCounts`. If it does, add its frequency to our total count.',
    },
    {
      step: 4,
      description: 'Update `prefixCounts` with `currSum`.',
    }
  ],
  commonMistakes: [
    {
      symptom: 'Failing on test cases where the subarray starts from index 0.',
      whyItsWrong: 'You forgot to initialize the hash map with the base case prefix sum of 0.',
      howToFix: 'Add `prefixCounts.set(0, 1)` before the loop.'
    }
  ],
  
  constraints: [
    { description: '1 <= nums.length <= 2 * 10^4', implication: 'O(N^2) brute force will likely TLE. We need an O(N) or O(N log N) solution.' },
    { description: '-1000 <= nums[i] <= 1000', implication: 'Numbers can be negative, so the prefix sum is not monotonically increasing. We cannot use the sliding window pattern.' }
  ],
  edgeCases: [
    'k = 0 with positive and negative numbers',
    'Subarray starting exactly at index 0 that sums to k'
  ],
  
  prerequisites: ['prefix-sum-pattern', 'hash-map-pattern'],
  
  interview: {
    importance: 'High',
    companies: [
      { company: 'Meta', frequency: 'High', lastAsked: 'Last 6 months' },
      { company: 'Amazon', frequency: 'Medium', lastAsked: 'Last 1 year' }
    ],
    commonFollowUps: [
      'What if we want the longest subarray instead of the count?',
      'How does this change if all numbers are positive?'
    ]
  },
  revision: {
    weight: 8,
    masteryWeight: 1.5,
    recommendedIntervals: [1, 3, 7, 14, 30]
  },
  unlockConditions: [
    { type: 'PatternMastery', targetId: 'prefix-sum', threshold: 0.5 }
  ],
  
  relatedProblems: ['lc-523', 'lc-974'],
  variations: [
    { id: 'v1', description: 'Find the maximum length of a subarray that sums to k', differenceFromOriginal: 'Store the first index where a prefix sum occurs instead of its frequency.' }
  ],
  
  visualizationId: 'viz-prefix-sum',
  
  notes: {
    official: 'This is a classic combination of Prefix Sum and Hash Map. Understanding why sliding window fails here (due to negative numbers) is crucial.',
    ai: 'Based on your previous mistakes, remember to ALWAYS initialize prefix sum frequency map with {0: 1}.'
  },
  
  hints: [
    { level: 1, content: 'Can we calculate the sum of any subarray [i..j] in O(1) time?' },
    { level: 2, content: 'sum[i..j] = prefix[j] - prefix[i-1]. We want this to equal k.' },
    { level: 3, content: 'Rearrange the equation: prefix[i-1] = prefix[j] - k. As we iterate j, can we quickly check if we have seen prefix[j] - k before?' }
  ],
  strategies: [
    {
      name: 'Prefix Sum + Hash Map',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      isOptimal: true,
      explanation: 'Uses a hash map to store the frequencies of prefix sums seen so far. For each element, checks if (currentSum - k) was seen before.'
    },
    {
      name: 'Brute Force',
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(1)',
      isOptimal: false,
      explanation: 'Check every possible subarray using nested loops.'
    }
  ]
};

export default lc560;
