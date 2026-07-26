import { SupportedLanguage } from '../execution/types';

export interface CodeTemplate {
  language: SupportedLanguage;
  starterCode: string;
}

export function getProblemTemplate(problemTitle: string, language: SupportedLanguage): string {
  const methodName = problemTitle
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map((word, idx) => (idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('');

  switch (language) {
    case 'java':
      return `class Solution {\n    public int[] ${methodName}(int[] nums, int target) {\n        // Write your Java solution here\n        return new int[]{};\n    }\n}`;
    case 'cpp':
      return `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> ${methodName}(vector<int>& nums, int target) {\n        // Write your C++ solution here\n        return {};\n    }\n};`;
    case 'python':
      return `class Solution:\n    def ${methodName}(self, nums: List[int], target: int) -> List[int]:\n        # Write your Python solution here\n        pass`;
    case 'javascript':
      return `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar ${methodName} = function(nums, target) {\n    // Write your JavaScript solution here\n    return [];\n};`;
    case 'typescript':
      return `function ${methodName}(nums: number[], target: number): number[] {\n    // Write your TypeScript solution here\n    return [];\n};`;
    default:
      return '';
  }
}
