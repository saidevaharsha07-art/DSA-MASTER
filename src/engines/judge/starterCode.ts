export interface StarterCodeMap {
  typescript: string;
  javascript: string;
  python: string;
  java: string;
  cpp: string;
  go: string;
  rust: string;
  csharp: string;
  kotlin: string;
}

/**
 * Generate problem-specific starter code for 9 languages.
 */
export function getStarterCode(problemTitle: string, problemSlug: string): StarterCodeMap {
  const methodName = problemTitle
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(' ')
    .map((word, idx) => (idx === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('');

  const PascalMethodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);

  return {
    typescript: `function ${methodName}(nums: number[], target: number): number[] {\n    // Write your TypeScript solution here\n    const map = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) {\n            return [map.get(diff)!, i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};`,

    javascript: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar ${methodName} = function(nums, target) {\n    // Write your JavaScript solution here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) {\n            return [map.get(diff), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};`,

    python: `class Solution:\n    def ${methodName}(self, nums: List[int], target: int) -> List[int]:\n        # Write your Python solution here\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []`,

    java: `import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] ${methodName}(int[] nums, int target) {\n        // Write your Java solution here\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[]{map.get(diff), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,

    cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> ${methodName}(vector<int>& nums, int target) {\n        // Write your C++ solution here\n        unordered_map<int, int> seen;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (seen.count(diff)) {\n                return {seen[diff], i};\n            }\n            seen[nums[i]] = i;\n        }\n        return {};\n    }\n};`,

    go: `package main\n\nfunc ${methodName}(nums []int, target int) []int {\n    // Write your Go solution here\n    seen := make(map[int]int)\n    for i, num := range nums {\n        diff := target - num\n        if idx, found := seen[diff]; found {\n            return []int{idx, i}\n        }\n        seen[num] = i\n    }\n    return nil\n}`,

    rust: `use std::collections::HashMap;\n\nimpl Solution {\n    pub fn ${methodName}(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Write your Rust solution here\n        let mut map = HashMap::new();\n        for (i, &num) in nums.iter().enumerate() {\n            let diff = target - num;\n            if let Some(&prev_i) = map.get(&diff) {\n                return vec![prev_i as i32, i as i32];\n            }\n            map.insert(num, i);\n        }\n        vec![]\n    }\n}`,

    csharp: `using System;\nusing System.Collections.Generic;\n\npublic class Solution {\n    public int[] ${PascalMethodName}(int[] nums, int target) {\n        // Write your C# solution here\n        Dictionary<int, int> map = new Dictionary<int, int>();\n        for (int i = 0; i < nums.Length; i++) {\n            int diff = target - nums[i];\n            if (map.ContainsKey(diff)) {\n                return new int[] { map[diff], i };\n            }\n            map[nums[i]] = i;\n        }\n        return new int[0];\n    }\n}`,

    kotlin: `class Solution {\n    fun ${methodName}(nums: IntArray, target: Int): IntArray {\n        // Write your Kotlin solution here\n        val map = HashMap<Int, Int>()\n        for (i in nums.indices) {\n            const diff = target - nums[i]\n            if (map.containsKey(diff)) {\n                return intArrayOf(map[diff]!!, i)\n            }\n            map[nums[i]] = i\n        }\n        return intArrayOf()\n    }\n}`,
  };
}
