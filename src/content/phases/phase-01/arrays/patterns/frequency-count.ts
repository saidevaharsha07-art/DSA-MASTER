import { PatternModule } from '@/src/types/content';

export const frequencyCount: PatternModule = {
  id: "pattern.frequency-count",
  slug: "frequency-count",
  title: "Frequency Count",
  phase: "phase-01",
  topic: "arrays",
  order: 1,
  difficulty: "Easy",
  estimatedHours: 2,
  overview: "A Prefix Sum is a technique where you precompute the cumulative sum of an array to answer range sum queries in O(1) time.",
  intuition: "If you need the sum of elements between indices i and j, instead of iterating from i to j every time, you can subtract the sum up to i-1 from the sum up to j.",
  mentalModel: "Think of a bank account statement. To find how much money you spent this week, you take your balance on Sunday and subtract your balance from last Sunday, rather than summing up every individual transaction.",
  learningObjectives: [
    "Understand how to build a prefix sum array.",
    "Use prefix sums to answer range sum queries in O(1) time.",
    "Identify problems that secretly require prefix sums (e.g., contiguous subarrays)."
  ],
  recognitionSignals: [
    "The problem asks for the sum of a contiguous subarray.",
    "You need to answer multiple range queries.",
    "The array is static (no updates to elements)."
  ],
  prerequisites: [],
  whenToUse: ["Static array range queries", "Finding subarrays with a specific sum", "Cumulative frequency distributions"],
  whenNotToUse: ["If the array is frequently updated (use a Segment Tree or Fenwick Tree instead)"],
  complexity: { time: "O(N) to build, O(1) per query", space: "O(N) for the prefix sum array" },
  templates: [
    {
      language: "python",
      code: `def build_prefix_sum(arr):\n    # Include a leading 0 to handle edge cases cleanly\n    prefix = [0] * (len(arr) + 1)\n    for i in range(len(arr)):\n        prefix[i + 1] = prefix[i] + arr[i]\n    return prefix\n\ndef range_sum(prefix, left, right):\n    # right is inclusive\n    return prefix[right + 1] - prefix[left]`,
      explanation: "Using a leading 0 (size N+1) avoids bounds checking when querying from index 0."
    }
  ],
  visualExplanation: "Given [1, 2, 3, 4], the prefix sum array is [0, 1, 3, 6, 10]. Sum of indices 1 to 2 (2+3=5) is prefix[3] - prefix[1] = 6 - 1 = 5.",
  visualSteps: [
    { title: "Initialize", description: "Create an array of size N+1 filled with 0." }
  ],
  commonMistakes: [
    "Forgetting to handle the edge case where the subarray starts at index 0.",
    "Off-by-one errors when querying `prefix[right] - prefix[left-1]`."
  ],
  interviewTips: [
    "In many hash map + prefix sum problems, you don't even need to store the array, just a running sum."
  ],
  problemIds: [
    "problem.lc-303",
    "problem.lc-1480",
    "problem.lc-724",
    "problem.lc-560",
    "problem.lc-974"
  ],
  relatedPatternIds: ["pattern.sliding-window", "pattern.hash-map"],
  tags: ["Array", "Prefix Sum"],
  
  resources: {
    notes: {
      overview: "Prefix sum is arguably the most fundamental array pattern.",
      intuition: "Instead of recalculating, we cache previous results.",
      mentalModel: "Bank statement analogy.",
      recognitionSignals: ["Sum of contiguous subarray", "Range sum queries"],
      mistakes: ["Off-by-one errors"],
      interviewTips: ["Mention that updates would make this O(N), showing you know its limitations."],
      revisionQuestions: ["How do you handle queries starting at index 0?", "What is the time complexity to build the array?"],
      cheatSheet: "prefix[i] = prefix[i-1] + arr[i]. query(i, j) = prefix[j+1] - prefix[i].",
      markdownSections: [
        { title: "Core Concept", content: "The prefix sum is a simple running total..." }
      ]
    },
    quiz: {
      mcqs: [
        {
          question: "What is the time complexity of building a Prefix Sum array?",
          options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
          correctAnswer: 2,
          explanation: "You must iterate through the entire array once to build the prefix sums."
        }
      ],
      flashcards: [
        { front: "What is the formula for a range sum query from index i to j inclusive?", back: "prefix[j+1] - prefix[i]" }
      ],
      activeRecall: ["Explain why we make the prefix sum array size N+1."],
      trueFalse: [
        { question: "Prefix sum is efficient for arrays that update frequently.", answer: false, explanation: "Updates take O(N) time." }
      ],
      reflectionQuestions: ["Think about how Prefix Sum relates to Sliding Window."]
    },
    revision: {
      quickReview: "O(1) range queries after O(N) precomputation.",
      cheatSheet: "Use size N+1 to avoid bounds checking.",
      activeRecall: ["How to query i to j?"],
      spacedRepetitionHints: ["Bank account analogy"],
      retentionQuestions: ["Formula?"]
    },
    flashcards: [],
    cheatsheet: "N+1 array size. `prefix[i+1] = prefix[i] + arr[i]`."
  },
  aiMetadata: {
    expectedThinking: "Student should recognize that repeated range sums are slow and look for a caching mechanism.",
    recognitionSignals: ["subarrays", "sum", "range"],
    commonMisconceptions: ["Thinking prefix sums work well with dynamic/updating arrays."],
    coachPrompts: ["Can we precompute anything here to avoid the inner loop?"],
    reflectionQuestions: ["How would this change if we were doing a prefix product instead?"],
    expectedMistakes: ["Index out of bounds when querying from 0"],
    learningGoals: ["Master range queries"],
    confidenceSignals: ["Correctly using N+1 array size"]
  },
  metadata: {
    createdAt: "2026-07-19T00:00:00.000Z",
    updatedAt: "2026-07-19T00:00:00.000Z",
    version: "1.0",
    author: "System",
    verified: true
  }
};
export default frequencyCount;
