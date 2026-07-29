export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface FunctionParameter {
  name: string;
  type: string; // Universal types: 'number', 'string', 'boolean', 'array<number>', 'array<string>', 'TreeNode', 'ListNode'
}

export interface FunctionDefinition {
  name: string;
  parameters: FunctionParameter[];
  returnType: string;
}

export interface TestCase {
  input: any[];
  expectedOutput: any;
  explanation?: string;
}

export interface ProblemMetadata {
  topics: string[];
  pattern: string;
  kingdom: string;
  companies: string[];
  frequency: number;
  prerequisites?: string[];
  nextProblems?: string[];
}

export interface ProblemModel {
  id: string;
  leetcodeNumber: number;
  title: string;
  difficulty: DifficultyLevel;
  kingdom: string;
  pattern: string;
  functionDefinition: FunctionDefinition;
  specialTemplate?: string; // ONLY for special non-DSA problems (SQL / System Design / Shell)
  testCases: TestCase[];
  metadata: ProblemMetadata;
}
