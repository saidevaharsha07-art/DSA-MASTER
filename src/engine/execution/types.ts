export type SupportedLanguage = 'java' | 'cpp' | 'python' | 'javascript' | 'typescript';

export interface RunRequest {
  problemId: string;
  language: SupportedLanguage;
  code: string;
  stdin?: string;
}

export interface RunResult {
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Compilation Error' | 'Runtime Error';
  stdout: string;
  stderr: string;
  compileOutput?: string;
  errorLine?: number;
  runtimeMs: number;
  memoryMb: number;
  beatsRuntimePct: number;
  beatsMemoryPct: number;
  token?: string;
}

export interface SubmitRequest {
  problemId: string;
  language: SupportedLanguage;
  code: string;
}

export interface SubmitResult {
  submissionId: string;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Compilation Error' | 'Runtime Error';
  testcasesPassed: number;
  totalTestcases: number;
  failedTestcaseIndex?: number;
  input?: string;
  expectedOutput?: string;
  receivedOutput?: string;
  runtimeMs: number;
  memoryMb: number;
  beatsRuntimePct: number;
  beatsMemoryPct: number;
  xpEarned: number;
  coinsEarned: number;
  timestamp: string;
}
