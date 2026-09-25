import { JudgeProvider } from '../interface';
import { ExecutionRequest, ExecutionResponse, SubmissionRequest, SubmissionResponse, LanguageConfig } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../languages';

export class Judge0Provider implements JudgeProvider {
  public id = 'judge0';
  public name = 'DSA Sandboxed Engine';
  private baseUrl: string;

  constructor(baseUrl = process.env.JUDGE0_URL || '') {
    this.baseUrl = baseUrl;
  }

  public async health(): Promise<boolean> {
    return true;
  }

  public getLanguages(): LanguageConfig[] {
    return Object.values(SUPPORTED_LANGUAGES);
  }

  public async run(request: ExecutionRequest, signal?: AbortSignal): Promise<ExecutionResponse> {
    try {
      const response = await fetch('/api/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: request.problemId,
          language: request.language,
          code: request.code,
          customInput: request.customInput || request.stdin,
          sampleIndex: request.sampleIndex,
        }),
        signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          status: 'runtime_error',
          stdout: '',
          stderr: data?.stderr || data?.error || 'Code execution is temporarily unavailable. Please try again shortly.',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
          totalTestcases: 0,
          passedTestcases: 0,
          testcaseResults: [],
        };
      }

      return data;
    } catch (error: any) {
      if (signal?.aborted) {
        throw new Error('Execution cancelled by user');
      }
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: error.message?.includes('temporarily unavailable')
          ? 'Code execution is temporarily unavailable. Please try again shortly.'
          : error.message || 'Code execution is temporarily unavailable. Please try again shortly.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: this.name,
        totalTestcases: 0,
        passedTestcases: 0,
        testcaseResults: [],
      };
    }
  }

  public async submit(request: SubmissionRequest, signal?: AbortSignal): Promise<SubmissionResponse> {
    try {
      const response = await fetch('/api/judge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: request.problemId,
          language: request.language,
          code: request.code,
          userId: request.userId,
        }),
        signal,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          submissionId: `sub-${Date.now()}`,
          verdict: 'Runtime Error',
          testcasesPassed: 0,
          totalTestcases: 1,
          runtimeMs: 0,
          memoryMb: 0,
          xpEarned: 0,
          beatsRuntimePct: 0,
          beatsMemoryPct: 0,
          testcaseDetails: [],
          errorLog: data?.errorLog || data?.error || 'Code execution is temporarily unavailable. Please try again shortly.',
          providerUsed: this.name,
          timestamp: new Date().toISOString(),
        };
      }

      return data;
    } catch (error: any) {
      return {
        submissionId: `sub-${Date.now()}`,
        verdict: 'Runtime Error',
        testcasesPassed: 0,
        totalTestcases: 1,
        runtimeMs: 0,
        memoryMb: 0,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: error.message?.includes('temporarily unavailable')
          ? 'Code execution is temporarily unavailable. Please try again shortly.'
          : error.message || 'Code execution is temporarily unavailable. Please try again shortly.',
        providerUsed: this.name,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
