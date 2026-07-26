import { ProblemModule } from '@/src/types/content';

export const lc930: ProblemModule = {
  id: "problem.lc-930",
  slug: "binary-subarrays-with-sum",
  platform: "leetcode",
  platformId: "930",
  title: "Binary Subarrays With Sum",
  difficulty: "Medium",
  companies: ["Amazon", "Google", "Apple", "Microsoft"],
  frequency: 100,
  acceptanceRate: 50.1,
  estimatedSolveTime: 15,
  
  patterns: ["pattern.hash-map"],
  phase: "phase-01",
  topics: ["arrays"],
  
  prerequisites: [],
  intuition: "We can iterate through the array, and for each number, check if its complement (target - num) exists in a hash map. If it doesn't, we add the current number and its index to the map.",
  bruteForceIdea: "Iterate through every pair of numbers using two nested loops to check if they sum up to the target. This takes O(N^2) time.",
  optimalIdea: "Use a Hash Map to store numbers as you iterate. For each number, check if the complement (target - current) exists in the map.",
  complexity: { time: "O(N)", space: "O(N)" },
  hints: ["Have you tried using a Hash Map?", "What if you store the numbers you've seen so far in a dictionary?"],
  commonMistakes: ["Using the same element twice (checking if target-num exists without ensuring it's a different index)."],
  edgeCases: ["The array contains negative numbers", "The array contains two identical numbers that sum to target"],
  followUps: ["Can you do it in O(1) space if the array is sorted?"],
  relatedProblems: ["problem.lc-9305", "problem.lc-93067"],
  template: [
    {
      language: "python",
      code: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []`
    }
  ],
  
  aiMetadata: {
    expectedThinking: "The student should initially think of the O(N^2) brute force, then optimize to O(N) using a Hash Map to store previously seen numbers.",
    recognitionSignals: ["find two numbers", "sum to a target"],
    commonMisconceptions: ["Thinking you need to sort the array first (which destroys original indices unless mapped)."],
    coachPrompts: ["How can we look up the 'complement' number in O(1) time?"],
    reflectionQuestions: ["Why can't we use two pointers here effectively without extra space?"],
    expectedMistakes: ["Returning the values instead of indices."],
    learningGoals: ["Understand how Hash Maps trade space for time."],
    confidenceSignals: ["Immediately writing the O(N) hash map solution."]
  },
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: "1.0",
    author: "System",
    verified: true
  }
};
export default lc930;
