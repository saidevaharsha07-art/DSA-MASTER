import { ProblemModel } from '@/src/curriculum/types';
import { FunctionDefinition } from '../models';
import { TemplateGenerator } from '../generators';

export interface ProblemDetailInfo {
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    num: number;
    input: string;
    output: string;
    explanation?: string;
  }[];
  hints: string[];
  functionDefinition: FunctionDefinition;
  starterCodes: Record<string, string>;
}

// ── Known curated problem dictionary with exact LeetCode specifications ──
const CURATED_PROBLEMS: Record<
  string,
  {
    statement: string;
    inputFormat: string;
    outputFormat: string;
    constraints: string[];
    examples: { input: string; output: string; explanation?: string }[];
    hints?: string[];
    funcDef: FunctionDefinition;
  }
> = {
  'two-sum': {
    statement:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    inputFormat: 'Integer array nums, integer target',
    outputFormat: 'Integer array of length 2 [i, j]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].' },
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can we do better?',
      'Can we use a Hash Map to store elements and check complements in O(1) time?',
    ],
    funcDef: {
      name: 'twoSum',
      parameters: [
        { name: 'nums', type: 'number[]' },
        { name: 'target', type: 'number' },
      ],
      returnType: 'number[]',
    },
  },

  'remove-duplicates-from-sorted-array': {
    statement:
      'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.\n\nConsider the number of unique elements of nums to be k. To get accepted, you need to:\n1. Change the array nums such that the first k elements of nums contain the unique elements in the order they were present initially.\n2. Return k.',
    inputFormat: 'Sorted integer array nums',
    outputFormat: 'Integer k (number of unique elements) with nums modified in-place',
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-100 <= nums[i] <= 100',
      'nums is sorted in non-decreasing order.',
    ],
    examples: [
      {
        input: 'nums = [1,1,2]',
        output: '2, nums = [1,2,_]',
        explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. It does not matter what you leave beyond the returned k.',
      },
      {
        input: 'nums = [0,0,1,1,1,2,2,3,3,4]',
        output: '5, nums = [0,1,2,3,4,_,_,_,_,_]',
        explanation: 'Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.',
      },
    ],
    hints: [
      'In this problem, the key point to focus on is the input array is already sorted.',
      'Since the array is sorted, all duplicate elements will be grouped together.',
      'Use a two-pointer approach where one pointer tracks the write index for unique elements while the other scans.',
    ],
    funcDef: {
      name: 'removeDuplicates',
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'number',
    },
  },

  'remove-element': {
    statement:
      'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val.',
    inputFormat: 'Integer array nums, integer val',
    outputFormat: 'Integer k with nums modified in-place',
    constraints: [
      '0 <= nums.length <= 100',
      '0 <= nums[i] <= 50',
      '0 <= val <= 100',
    ],
    examples: [
      { input: 'nums = [3,2,2,3], val = 3', output: '2, nums = [2,2,_,_]', explanation: 'Your function should return k = 2, with the first two elements being 2.' },
      { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', output: '5, nums = [0,1,4,0,3,_,_,_]', explanation: 'Your function should return k = 5.' },
    ],
    hints: ['The problem asks us to do it in-place and remove all occurrences of the given value.'],
    funcDef: {
      name: 'removeElement',
      parameters: [
        { name: 'nums', type: 'number[]' },
        { name: 'val', type: 'number' },
      ],
      returnType: 'number',
    },
  },

  'contains-duplicate': {
    statement:
      'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    inputFormat: 'Integer array nums',
    outputFormat: 'Boolean true / false',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: 'The element 1 occurs at indices 0 and 3.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true' },
    ],
    hints: ['A hash set allows O(1) lookup to check if an element was previously seen.'],
    funcDef: {
      name: 'containsDuplicate',
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'boolean',
    },
  },

  'valid-anagram': {
    statement:
      'Given two strings s and t, return true if t is an anagram of s, and false otherwise.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    inputFormat: 'String s, string t',
    outputFormat: 'Boolean true / false',
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.',
    ],
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' },
    ],
    hints: ['Count the frequency of each letter in s and verify it matches t.'],
    funcDef: {
      name: 'isAnagram',
      parameters: [
        { name: 's', type: 'string' },
        { name: 't', type: 'string' },
      ],
      returnType: 'boolean',
    },
  },

  'valid-palindrome': {
    statement:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string s, return true if it is a palindrome, or false otherwise.',
    inputFormat: 'String s',
    outputFormat: 'Boolean true / false',
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.',
    ],
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters.' },
    ],
    hints: ['Use two pointers starting at the beginning and end of string s, skipping non-alphanumeric characters.'],
    funcDef: {
      name: 'isPalindrome',
      parameters: [{ name: 's', type: 'string' }],
      returnType: 'boolean',
    },
  },

  '3sum': {
    statement:
      'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.',
    inputFormat: 'Integer array nums',
    outputFormat: '2D integer array of triplets [[a, b, c], ...]',
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5',
    ],
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.' },
      { input: 'nums = [0,1,1]', output: '[]', explanation: 'The only possible triplet does not sum up to 0.' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]', explanation: 'The only possible triplet sums up to 0.' },
    ],
    hints: [
      'Sort the array first to easily avoid duplicate triplets.',
      'Fix one number and use two pointers to find the remaining pair sum.',
    ],
    funcDef: {
      name: 'threeSum',
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'number[][]',
    },
  },

  'container-with-most-water': {
    statement:
      'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    inputFormat: 'Integer array height',
    outputFormat: 'Integer maxArea',
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4',
    ],
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is between index 1 (height 8) and index 8 (height 7) = min(8, 7) * 7 = 49.' },
      { input: 'height = [1,1]', output: '1' },
    ],
    hints: ['Use two pointers at the ends. Always move the pointer with the smaller height inward.'],
    funcDef: {
      name: 'maxArea',
      parameters: [{ name: 'height', type: 'number[]' }],
      returnType: 'number',
    },
  },

  'best-time-to-buy-and-sell-stock': {
    statement:
      'You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    inputFormat: 'Integer array prices',
    outputFormat: 'Integer maxProfit',
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4',
    ],
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' },
    ],
    hints: ['Track the minimum price seen so far and calculate current price minus min price.'],
    funcDef: {
      name: 'maxProfit',
      parameters: [{ name: 'prices', type: 'number[]' }],
      returnType: 'number',
    },
  },

  'valid-parentheses': {
    statement:
      'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
    inputFormat: 'String s',
    outputFormat: 'Boolean true / false',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.',
    ],
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([])"', output: 'true' },
    ],
    hints: ['Use a stack of characters. When you encounter an opening bracket, push it; when closing, verify the top of the stack matches.'],
    funcDef: {
      name: 'isValid',
      parameters: [{ name: 's', type: 'string' }],
      returnType: 'boolean',
    },
  },

  'reverse-linked-list': {
    statement:
      'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    inputFormat: 'Head of linked list head',
    outputFormat: 'Head of reversed linked list',
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000',
    ],
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' },
    ],
    hints: ['Maintain three pointers: prev, curr, and next.'],
    funcDef: {
      name: 'reverseList',
      parameters: [{ name: 'head', type: 'ListNode' }],
      returnType: 'ListNode',
    },
  },

  'merge-two-sorted-lists': {
    statement:
      'You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
    inputFormat: 'Head of list1, Head of list2',
    outputFormat: 'Head of merged sorted linked list',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.',
    ],
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' },
      { input: 'list1 = [], list2 = [0]', output: '[0]' },
    ],
    hints: ['Use a dummy node to simplify list concatenation.'],
    funcDef: {
      name: 'mergeTwoLists',
      parameters: [
        { name: 'list1', type: 'ListNode' },
        { name: 'list2', type: 'ListNode' },
      ],
      returnType: 'ListNode',
    },
  },

  'linked-list-cycle': {
    statement:
      'Given head, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.',
    inputFormat: 'Head of linked list head',
    outputFormat: 'Boolean true / false',
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5',
      'pos is -1 or a valid index in the linked-list.',
    ],
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
      { input: 'head = [1,2], pos = 0', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 0th node.' },
      { input: 'head = [1], pos = -1', output: 'false', explanation: 'There is no cycle in the linked list.' },
    ],
    hints: ['Use Floyd\'s Cycle Detection (Tortoise and Hare fast and slow pointers).'],
    funcDef: {
      name: 'hasCycle',
      parameters: [{ name: 'head', type: 'ListNode' }],
      returnType: 'boolean',
    },
  },

  'maximum-subarray': {
    statement:
      'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    inputFormat: 'Integer array nums',
    outputFormat: 'Integer maxSum',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
    ],
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    hints: ['Kadane\'s Algorithm: currentMax = max(nums[i], currentMax + nums[i]).'],
    funcDef: {
      name: 'maxSubArray',
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'number',
    },
  },

  'climbing-stairs': {
    statement:
      'You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    inputFormat: 'Integer n',
    outputFormat: 'Integer totalWays',
    constraints: ['1 <= n <= 45'],
    examples: [
      { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
      { input: 'n = 3', output: '3', explanation: '1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step' },
    ],
    hints: ['To reach step n, you must come from either step n-1 or step n-2 (Fibonacci sequence).'],
    funcDef: {
      name: 'climbStairs',
      parameters: [{ name: 'n', type: 'number' }],
      returnType: 'number',
    },
  },

  'invert-binary-tree': {
    statement:
      'Given the root of a binary tree, invert the tree, and return its root.',
    inputFormat: 'Root of binary tree root',
    outputFormat: 'Root of inverted binary tree',
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100',
    ],
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
      { input: 'root = []', output: '[]' },
    ],
    hints: ['Swap left and right children recursively.'],
    funcDef: {
      name: 'invertTree',
      parameters: [{ name: 'root', type: 'TreeNode' }],
      returnType: 'TreeNode',
    },
  },
};

/**
 * Infer camelCase function name from problem title or slug.
 */
function inferFunctionName(slug: string, title: string): string {
  const clean = slug
    .replace(/^lc-\d+-?/, '')
    .replace(/^cf-\d+-?/, '')
    .replace(/^cc-\d+-?/, '');

  const parts = clean.split(/[-_\s]+/).filter(Boolean);
  if (parts.length === 0) return 'solve';

  return parts
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

/**
 * Derive semantic function definition based on problem properties.
 */
export function inferFunctionDefinition(problem: ProblemModel): FunctionDefinition {
  const slug = problem.slug || problem.id;
  if (CURATED_PROBLEMS[slug]) {
    return CURATED_PROBLEMS[slug].funcDef;
  }

  const funcName = inferFunctionName(slug, problem.title);
  const topics = (problem.topics || []).map((t) => t.toLowerCase());
  const categorySlug = (problem.categorySlug || '').toLowerCase();
  const patternSlug = (problem.patternSlug || '').toLowerCase();

  // 1. Linked List problems
  if (topics.includes('linked list') || categorySlug.includes('linked-list')) {
    if (funcName.includes('has') || funcName.includes('is') || funcName.includes('detect')) {
      return {
        name: funcName,
        parameters: [{ name: 'head', type: 'ListNode' }],
        returnType: 'boolean',
      };
    }
    return {
      name: funcName,
      parameters: [{ name: 'head', type: 'ListNode' }],
      returnType: 'ListNode',
    };
  }

  // 2. Tree problems
  if (topics.includes('tree') || topics.includes('binary tree') || categorySlug.includes('tree')) {
    if (funcName.includes('is') || funcName.includes('has') || funcName.includes('same')) {
      return {
        name: funcName,
        parameters: [{ name: 'root', type: 'TreeNode' }],
        returnType: 'boolean',
      };
    }
    if (funcName.includes('depth') || funcName.includes('height') || funcName.includes('count') || funcName.includes('sum')) {
      return {
        name: funcName,
        parameters: [{ name: 'root', type: 'TreeNode' }],
        returnType: 'number',
      };
    }
    if (funcName.includes('traversal') || funcName.includes('level') || funcName.includes('order')) {
      return {
        name: funcName,
        parameters: [{ name: 'root', type: 'TreeNode' }],
        returnType: 'number[]',
      };
    }
    return {
      name: funcName,
      parameters: [{ name: 'root', type: 'TreeNode' }],
      returnType: 'TreeNode',
    };
  }

  // 3. String problems
  if (topics.includes('string') && !topics.includes('array')) {
    if (funcName.includes('is') || funcName.includes('valid') || funcName.includes('has')) {
      return {
        name: funcName,
        parameters: [{ name: 's', type: 'string' }],
        returnType: 'boolean',
      };
    }
    if (funcName.includes('length') || funcName.includes('count')) {
      return {
        name: funcName,
        parameters: [{ name: 's', type: 'string' }],
        returnType: 'number',
      };
    }
    return {
      name: funcName,
      parameters: [{ name: 's', type: 'string' }],
      returnType: 'string',
    };
  }

  // 4. Matrix / 2D Array problems
  if (topics.includes('matrix') || categorySlug.includes('matrix')) {
    if (funcName.includes('rotate') || funcName.includes('set')) {
      return {
        name: funcName,
        parameters: [{ name: 'matrix', type: 'number[][]' }],
        returnType: 'void',
      };
    }
    return {
      name: funcName,
      parameters: [{ name: 'matrix', type: 'number[][]' }],
      returnType: 'number[]',
    };
  }

  // 5. Default Array problems
  if (funcName.includes('is') || funcName.includes('contains') || funcName.includes('can') || funcName.includes('valid')) {
    return {
      name: funcName,
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'boolean',
    };
  }

  if (funcName.includes('search') || funcName.includes('find') || funcName.includes('max') || funcName.includes('min') || funcName.includes('count') || funcName.includes('remove')) {
    return {
      name: funcName,
      parameters: [{ name: 'nums', type: 'number[]' }],
      returnType: 'number',
    };
  }

  return {
    name: funcName,
    parameters: [{ name: 'nums', type: 'number[]' }],
    returnType: 'number[]',
  };
}

/**
 * Retrieve comprehensive, authentic problem metadata, problem statements, constraints, and starter templates.
 */
export function getProblemDetailInfo(problem: ProblemModel): ProblemDetailInfo {
  const slug = problem.slug || problem.id;
  const curated = CURATED_PROBLEMS[slug];

  if (curated) {
    const starterCodes: Record<string, string> = {
      python: TemplateGenerator.generate(curated.funcDef, 'python'),
      java: TemplateGenerator.generate(curated.funcDef, 'java'),
      cpp: TemplateGenerator.generate(curated.funcDef, 'cpp'),
      c: TemplateGenerator.generate(curated.funcDef, 'c'),
      javascript: TemplateGenerator.generate(curated.funcDef, 'javascript'),
      typescript: TemplateGenerator.generate(curated.funcDef, 'typescript'),
      go: TemplateGenerator.generate(curated.funcDef, 'go'),
      rust: TemplateGenerator.generate(curated.funcDef, 'rust'),
      csharp: TemplateGenerator.generate(curated.funcDef, 'csharp'),
      kotlin: TemplateGenerator.generate(curated.funcDef, 'kotlin'),
    };

    return {
      statement: curated.statement,
      inputFormat: curated.inputFormat,
      outputFormat: curated.outputFormat,
      constraints: curated.constraints,
      examples: curated.examples.map((ex, i) => ({
        num: i + 1,
        input: ex.input,
        output: ex.output,
        explanation: ex.explanation,
      })),
      hints: curated.hints || [
        problem.notes || 'Analyze the constraints and choose an optimal algorithmic pattern.',
      ],
      functionDefinition: curated.funcDef,
      starterCodes,
    };
  }

  // Dynamic derivation for all remaining curriculum problems
  const funcDef = inferFunctionDefinition(problem);
  const starterCodes: Record<string, string> = {
    python: TemplateGenerator.generate(funcDef, 'python'),
    java: TemplateGenerator.generate(funcDef, 'java'),
    cpp: TemplateGenerator.generate(funcDef, 'cpp'),
    c: TemplateGenerator.generate(funcDef, 'c'),
    javascript: TemplateGenerator.generate(funcDef, 'javascript'),
    typescript: TemplateGenerator.generate(funcDef, 'typescript'),
    go: TemplateGenerator.generate(funcDef, 'go'),
    rust: TemplateGenerator.generate(funcDef, 'rust'),
    csharp: TemplateGenerator.generate(funcDef, 'csharp'),
    kotlin: TemplateGenerator.generate(funcDef, 'kotlin'),
  };

  const statement =
    problem.notes ||
    `Given the problem "${problem.title}", implement an optimal solution matching the expected algorithmic bounds for the ${problem.patternTitle || 'targeted'} pattern.`;

  const inputFormat = funcDef.parameters.map((p) => `${p.name}: ${p.type}`).join(', ');
  const outputFormat = `Return value of type ${funcDef.returnType}`;

  const constraints = [
    `1 <= input.length <= 10^5`,
    `-10^9 <= value <= 10^9`,
    `Optimal time complexity expected: O(N) or O(N log N)`,
  ];

  const examples = [
    {
      num: 1,
      input: funcDef.parameters.map((p) => `${p.name} = [example_input]`).join(', '),
      output: '[expected_output]',
      explanation: `Standard expected test evaluation for ${problem.title}.`,
    },
  ];

  const hints = problem.hints && problem.hints.length > 0 ? problem.hints : [
    problem.notes || `Consider how the ${problem.patternTitle || 'core'} pattern applies to this problem.`,
    'Identify redundant operations and check if a hash table, two pointers, or sliding window can optimize time complexity.',
  ];

  return {
    statement,
    inputFormat,
    outputFormat,
    constraints,
    examples,
    hints,
    functionDefinition: funcDef,
    starterCodes,
  };
}
