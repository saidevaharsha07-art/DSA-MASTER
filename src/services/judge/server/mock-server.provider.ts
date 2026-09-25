import { LanguageId } from '../types';
import { IServerJudgeProvider, RawExecutionRequest, RawExecutionResult } from './judge-provider.interface';

export type MockJudgeMode =
  | 'success'
  | 'compile_error'
  | 'runtime_error'
  | 'time_limit'
  | 'unavailable'
  | 'malformed';

export class MockServerProvider implements IServerJudgeProvider {
  public readonly id = 'mock';
  public readonly name = 'Mock Deterministic Test Judge';
  private currentMode: MockJudgeMode = 'success';
  public lastRequest?: RawExecutionRequest;

  constructor(initialMode: MockJudgeMode = 'success') {
    this.currentMode = initialMode;
  }

  public setMode(mode: MockJudgeMode) {
    this.currentMode = mode;
  }

  public getMode(): MockJudgeMode {
    return this.currentMode;
  }

  public async health(): Promise<boolean> {
    return this.currentMode !== 'unavailable';
  }

  public mapLanguage(language: LanguageId): { languageId: number | string; name: string } {
    return {
      languageId: 999,
      name: `Mock ${language}`,
    };
  }

  public async execute(request: RawExecutionRequest): Promise<RawExecutionResult> {
    this.lastRequest = request;

    switch (this.currentMode) {
      case 'compile_error':
        return {
          status: 'compile_error',
          stdout: '',
          stderr: 'Compilation Error: syntax error near unexpected token `;`',
          compileOutput: 'Compilation Error: syntax error near unexpected token `;`',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
        };

      case 'runtime_error':
        return {
          status: 'runtime_error',
          stdout: '',
          stderr: 'Runtime Error: ZeroDivisionError: division by zero',
          runtimeMs: 15,
          memoryMb: 24.5,
          exitCode: 1,
          providerUsed: this.name,
        };

      case 'time_limit':
        return {
          status: 'time_limit',
          stdout: '',
          stderr: `Time Limit Exceeded: Process killed after ${request.timeoutMs || 4000}ms.`,
          runtimeMs: request.timeoutMs || 4000,
          memoryMb: 32.0,
          exitCode: 124,
          providerUsed: this.name,
        };

      case 'unavailable':
        return {
          status: 'runtime_error',
          stdout: '',
          stderr: 'Code execution is temporarily unavailable. Please try again shortly.',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
          error: 'Simulated 503 / Service Unavailable',
        };

      case 'malformed':
        return {
          status: 'runtime_error',
          stdout: 'INVALID_CORRUPTED_STREAM',
          stderr: 'Malformed provider response received.',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
        };

      case 'success':
      default: {
        // Generate simulated __DSA_TEST__: stdout for driver evaluator parsing
        const testCount = 3;
        const testLines: string[] = [];
        for (let i = 0; i < testCount; i++) {
          testLines.push(
            `__DSA_TEST__:${JSON.stringify({
              testIndex: i,
              passed: true,
              input: `[test_${i}]`,
              expected: `output_${i}`,
              actual: `output_${i}`,
              runtimeMs: 2.1,
              memoryMb: 24.2,
            })}`
          );
        }

        return {
          status: 'accepted',
          stdout: testLines.join('\n'),
          stderr: '',
          runtimeMs: 12,
          memoryMb: 24.2,
          exitCode: 0,
          providerUsed: this.name,
        };
      }
    }
  }
}

export const mockServerProvider = new MockServerProvider();
