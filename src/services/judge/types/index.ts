export type LanguageId = 
  | 'java' 
  | 'python' 
  | 'cpp' 
  | 'c'
  | 'javascript' 
  | 'typescript' 
  | 'go' 
  | 'rust' 
  | 'csharp' 
  | 'kotlin';

export interface LanguageConfig {
  id: LanguageId;
  name: string;
  version: string;
  fileExtension: string;
  judge0LanguageId: number;
  pistonLanguage: string;
  compileCommand?: string;
  runCommand: string;
  timeoutSeconds: number;
  memoryLimitMb: number;
}

export type VerdictStatus = 
  | 'Accepted' 
  | 'Wrong Answer' 
  | 'Time Limit Exceeded' 
  | 'Memory Limit Exceeded' 
  | 'Compilation Error' 
  | 'Runtime Error' 
  | 'Output Limit Exceeded' 
  | 'Presentation Error';

export interface ExecutionRequest {
  problemId: string;
  language: LanguageId;
  code: string;
  stdin?: string;
  customInput?: string;
  sampleIndex?: number;
  timeoutMs?: number;
  memoryLimitMb?: number;
}

export interface TestcaseResult {
  testcaseIndex: number;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: 'Passed' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Compilation Error';
  runtimeMs: number;
  memoryMb: number;
  diff?: string;
  error?: string;
}

export interface ExecutionResponse {
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
  stdout: string;
  stderr: string;
  compileOutput?: string;
  runtimeMs: number;
  memoryMb: number;
  exitCode: number;
  providerUsed: string;
  testcaseResults?: TestcaseResult[];
  totalTestcases?: number;
  passedTestcases?: number;
}

export interface SubmissionRequest {
  problemId: string;
  language: LanguageId;
  code: string;
  userId?: string;
}

export interface SubmissionResponse {
  submissionId: string;
  verdict: VerdictStatus;
  testcasesPassed: number;
  totalTestcases: number;
  runtimeMs: number;
  memoryMb: number;
  xpEarned: number;
  beatsRuntimePct: number;
  beatsMemoryPct: number;
  testcaseDetails: TestcaseResult[];
  failedTestcase?: {
    testcaseIndex: number;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    error?: string;
  };
  errorLog?: string;
  providerUsed: string;
  timestamp: string;
}

export type QueueJobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface ExecutionJob {
  id: string;
  type: 'run' | 'submit';
  request: ExecutionRequest | SubmissionRequest;
  status: QueueJobStatus;
  createdAt: string;
  completedAt?: string;
  abortController?: AbortController;
}
