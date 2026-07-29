import { TemplateGenerator } from '../index';
import { FunctionDefinition } from '../../models';

describe('Universal Type TemplateGenerator Migration Tests', () => {
  const problemsToTest: { title: string; funcDef: FunctionDefinition; expectedJava: string; expectedCpp: string; expectedPython: string }[] = [
    {
      title: 'Two Sum',
      funcDef: {
        name: 'twoSum',
        parameters: [{ name: 'nums', type: 'array<number>' }, { name: 'target', type: 'number' }],
        returnType: 'array<number>',
      },
      expectedJava: 'public int[] twoSum(int[] nums, int target)',
      expectedCpp: 'vector<int>& twoSum(vector<int>& nums, int target)',
      expectedPython: 'def twoSum(self, nums: List[int], target: int) -> List[int]:',
    },
    {
      title: 'Remove Duplicates from Sorted Array',
      funcDef: {
        name: 'removeDuplicates',
        parameters: [{ name: 'nums', type: 'array<number>' }],
        returnType: 'number',
      },
      expectedJava: 'public int removeDuplicates(int[] nums)',
      expectedCpp: 'int removeDuplicates(vector<int>& nums)',
      expectedPython: 'def removeDuplicates(self, nums: List[int]) -> int:',
    },
    {
      title: 'Valid Parentheses',
      funcDef: {
        name: 'isValid',
        parameters: [{ name: 's', type: 'string' }],
        returnType: 'boolean',
      },
      expectedJava: 'public boolean isValid(String s)',
      expectedCpp: 'bool isValid(string s)',
      expectedPython: 'def isValid(self, s: str) -> bool:',
    },
    {
      title: 'Invert Binary Tree',
      funcDef: {
        name: 'invertTree',
        parameters: [{ name: 'root', type: 'TreeNode' }],
        returnType: 'TreeNode',
      },
      expectedJava: 'public TreeNode invertTree(TreeNode root)',
      expectedCpp: 'TreeNode invertTree(TreeNode root)',
      expectedPython: 'def invertTree(self, root: TreeNode) -> TreeNode:',
    },
    {
      title: 'Merge Two Sorted Lists',
      funcDef: {
        name: 'mergeTwoLists',
        parameters: [{ name: 'list1', type: 'ListNode' }, { name: 'list2', type: 'ListNode' }],
        returnType: 'ListNode',
      },
      expectedJava: 'public ListNode mergeTwoLists(ListNode list1, ListNode list2)',
      expectedCpp: 'ListNode mergeTwoLists(ListNode list1, ListNode list2)',
      expectedPython: 'def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:',
    },
    {
      title: 'Binary Search',
      funcDef: {
        name: 'search',
        parameters: [{ name: 'nums', type: 'array<number>' }, { name: 'target', type: 'number' }],
        returnType: 'number',
      },
      expectedJava: 'public int search(int[] nums, int target)',
      expectedCpp: 'int search(vector<int>& nums, int target)',
      expectedPython: 'def search(self, nums: List[int], target: int) -> int:',
    },
    {
      title: 'Maximum Subarray',
      funcDef: {
        name: 'maxSubArray',
        parameters: [{ name: 'nums', type: 'array<number>' }],
        returnType: 'number',
      },
      expectedJava: 'public int maxSubArray(int[] nums)',
      expectedCpp: 'int maxSubArray(vector<int>& nums)',
      expectedPython: 'def maxSubArray(self, nums: List[int]) -> int:',
    },
  ];

  problemsToTest.forEach(({ title, funcDef, expectedJava, expectedCpp, expectedPython }) => {
    test(`Generates correct Java signature for ${title}`, () => {
      const output = TemplateGenerator.generate(funcDef, 'java');
      expect(output).toContain(expectedJava);
    });

    test(`Generates correct C++ signature for ${title}`, () => {
      const output = TemplateGenerator.generate(funcDef, 'cpp');
      expect(output).toContain(expectedCpp);
    });

    test(`Generates correct Python signature for ${title}`, () => {
      const output = TemplateGenerator.generate(funcDef, 'python');
      expect(output).toContain(expectedPython);
    });
  });
});
