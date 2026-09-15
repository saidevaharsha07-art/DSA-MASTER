import { FunctionDefinition } from '../models';

export class TemplateGenerator {
  public static generate(func: FunctionDefinition, language: string): string {
    const { name, parameters, returnType } = func;
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    const langKey = language.toLowerCase().trim();

    const hasListNode = parameters.some((p) => p.type === 'ListNode') || returnType === 'ListNode';
    const hasTreeNode = parameters.some((p) => p.type === 'TreeNode') || returnType === 'TreeNode';

    let headerComment = '';

    switch (langKey) {
      case 'java': {
        if (hasListNode) {
          headerComment = `/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\n`;
        } else if (hasTreeNode) {
          headerComment = `/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }\n * }\n */\n`;
        }
        const paramsStr = parameters
          .map((p) => `${this.toJavaType(p.type)} ${p.name}`)
          .join(', ');
        const javaReturn = this.toJavaType(returnType);
        return `${headerComment}class Solution {\n    public ${javaReturn} ${name}(${paramsStr}) {\n        \n    }\n}`;
      }

      case 'cpp': {
        if (hasListNode) {
          headerComment = `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\n`;
        } else if (hasTreeNode) {
          headerComment = `/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\n`;
        }
        const paramsStr = parameters
          .map((p) => `${this.toCppType(p.type)} ${p.name}`)
          .join(', ');
        const cppReturn = this.toCppType(returnType);
        return `${headerComment}class Solution {\npublic:\n    ${cppReturn} ${name}(${paramsStr}) {\n        \n    }\n};`;
      }

      case 'c': {
        if (hasListNode) {
          headerComment = `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     struct ListNode *next;\n * };\n */\n`;
        } else if (hasTreeNode) {
          headerComment = `/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     struct TreeNode *left;\n *     struct TreeNode *right;\n * };\n */\n`;
        }
        const cReturn = this.toCType(returnType);
        const cParams: string[] = [];
        parameters.forEach((p) => {
          if (p.type === 'array<number>' || p.type === 'number[]' || p.type === 'int[]') {
            cParams.push(`int* ${p.name}`);
            cParams.push(`int ${p.name}Size`);
          } else if (p.type === 'array<string>' || p.type === 'string[]') {
            cParams.push(`char** ${p.name}`);
            cParams.push(`int ${p.name}Size`);
          } else if (p.type === 'string') {
            cParams.push(`char* ${p.name}`);
          } else if (p.type === 'ListNode') {
            cParams.push(`struct ListNode* ${p.name}`);
          } else if (p.type === 'TreeNode') {
            cParams.push(`struct TreeNode* ${p.name}`);
          } else {
            cParams.push(`${this.toCType(p.type)} ${p.name}`);
          }
        });
        if (returnType.includes('array') || returnType.includes('[]')) {
          cParams.push('int* returnSize');
          headerComment = `/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\n` + headerComment;
        }
        return `${headerComment}${cReturn} ${name}(${cParams.join(', ')}) {\n    \n}`;
      }

      case 'python': {
        if (hasListNode) {
          headerComment = `# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n`;
        } else if (hasTreeNode) {
          headerComment = `# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n`;
        }
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toPythonType(p.type)}`)
          .join(', ');
        const pyReturn = this.toPythonType(returnType);
        return `${headerComment}class Solution:\n    def ${name}(self, ${paramsStr}) -> ${pyReturn}:\n        pass`;
      }

      case 'typescript': {
        if (hasListNode) {
          headerComment = `/**\n * Definition for singly-linked list.\n * class ListNode {\n *     val: number\n *     next: ListNode | null\n *     constructor(val?: number, next?: ListNode | null) {\n *         this.val = (val===undefined ? 0 : val)\n *         this.next = (next===undefined ? null : next)\n *     }\n * }\n */\n`;
        } else if (hasTreeNode) {
          headerComment = `/**\n * Definition for a binary tree node.\n * class TreeNode {\n *     val: number\n *     left: TreeNode | null\n *     right: TreeNode | null\n *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n *         this.val = (val===undefined ? 0 : val)\n *         this.left = (left===undefined ? null : left)\n *         this.right = (right===undefined ? null : right)\n *     }\n * }\n */\n`;
        }
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toTsType(p.type)}`)
          .join(', ');
        const tsReturn = this.toTsType(returnType);
        return `${headerComment}function ${name}(${paramsStr}): ${tsReturn} {\n    \n};`;
      }

      case 'javascript': {
        if (hasListNode) {
          headerComment = `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n`;
        } else if (hasTreeNode) {
          headerComment = `/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n`;
        }
        const paramsStr = parameters.map((p) => p.name).join(', ');
        return `${headerComment}/**\n * @param {${parameters.map((p) => p.type).join(', ')}}\n * @return {${returnType}}\n */\nvar ${name} = function(${paramsStr}) {\n    \n};`;
      }

      case 'csharp': {
        const paramsStr = parameters
          .map((p) => `${this.toJavaType(p.type)} ${p.name}`)
          .join(', ');
        const csReturn = this.toJavaType(returnType);
        return `public class Solution {\n    public ${csReturn} ${pascalName}(${paramsStr}) {\n        \n    }\n}`;
      }

      case 'go': {
        const paramsStr = parameters
          .map((p) => `${p.name} ${this.toGoType(p.type)}`)
          .join(', ');
        const goReturn = this.toGoType(returnType);
        return `func ${name}(${paramsStr}) ${goReturn} {\n    \n}`;
      }

      case 'rust': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toRustType(p.type)}`)
          .join(', ');
        const rustReturn = this.toRustType(returnType);
        return `impl Solution {\n    pub fn ${name}(${paramsStr}) -> ${rustReturn} {\n        \n    }\n}`;
      }

      case 'kotlin': {
        const paramsStr = parameters
          .map((p) => `${p.name}: ${this.toKotlinType(p.type)}`)
          .join(', ');
        const ktReturn = this.toKotlinType(returnType);
        return `class Solution {\n    fun ${name}(${paramsStr}): ${ktReturn} {\n        \n    }\n}`;
      }

      default: {
        const paramsStr = parameters.map((p) => p.name).join(', ');
        return `function ${name}(${paramsStr}) {\n    \n}`;
      }
    }
  }

  private static toJavaType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'int[]';
    if (type === 'array<array<number>>' || type === 'number[][]' || type === 'int[][]') return 'int[][]';
    if (type === 'array<string>' || type === 'string[]') return 'String[]';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'boolean';
    if (type === 'ListNode') return 'ListNode';
    if (type === 'TreeNode') return 'TreeNode';
    if (type === 'void') return 'void';
    return type;
  }

  private static toCppType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'vector<int>&';
    if (type === 'array<array<number>>' || type === 'number[][]' || type === 'int[][]') return 'vector<vector<int>>&';
    if (type === 'array<string>' || type === 'string[]') return 'vector<string>&';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'bool';
    if (type === 'ListNode') return 'ListNode*';
    if (type === 'TreeNode') return 'TreeNode*';
    if (type === 'void') return 'void';
    return type;
  }

  private static toCType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'int*';
    if (type === 'array<array<number>>' || type === 'number[][]' || type === 'int[][]') return 'int**';
    if (type === 'array<string>' || type === 'string[]') return 'char**';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string') return 'char*';
    if (type === 'boolean' || type === 'bool') return 'bool';
    if (type === 'ListNode') return 'struct ListNode*';
    if (type === 'TreeNode') return 'struct TreeNode*';
    if (type === 'void') return 'void';
    return type;
  }

  private static toPythonType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'List[int]';
    if (type === 'array<array<number>>' || type === 'number[][]' || type === 'int[][]') return 'List[List[int]]';
    if (type === 'array<string>' || type === 'string[]') return 'List[str]';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'str';
    if (type === 'boolean' || type === 'bool') return 'bool';
    if (type === 'ListNode') return 'Optional[ListNode]';
    if (type === 'TreeNode') return 'Optional[TreeNode]';
    if (type === 'void') return 'None';
    return type;
  }

  private static toTsType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'number[]';
    if (type === 'array<array<number>>' || type === 'number[][]' || type === 'int[][]') return 'number[][]';
    if (type === 'array<string>' || type === 'string[]') return 'string[]';
    if (type === 'number' || type === 'int') return 'number';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'boolean';
    if (type === 'ListNode') return 'ListNode | null';
    if (type === 'TreeNode') return 'TreeNode | null';
    if (type === 'void') return 'void';
    return type;
  }

  private static toGoType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return '[]int';
    if (type === 'array<string>' || type === 'string[]') return '[]string';
    if (type === 'number' || type === 'int') return 'int';
    if (type === 'string' || type === 'String') return 'string';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toRustType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'Vec<i32>';
    if (type === 'array<string>' || type === 'string[]') return 'Vec<String>';
    if (type === 'number' || type === 'int') return 'i32';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'bool';
    return type;
  }

  private static toKotlinType(type: string): string {
    if (type === 'array<number>' || type === 'number[]' || type === 'int[]') return 'IntArray';
    if (type === 'array<string>' || type === 'string[]') return 'Array<String>';
    if (type === 'number' || type === 'int') return 'Int';
    if (type === 'string' || type === 'String') return 'String';
    if (type === 'boolean' || type === 'bool') return 'Boolean';
    return type;
  }
}
