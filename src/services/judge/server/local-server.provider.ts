import { LanguageId } from '../types';
import { SUPPORTED_LANGUAGES } from '../languages';
import { sandboxRunner, isLocalExecutionAllowed } from '../sandbox/runner';
import { IServerJudgeProvider, RawExecutionRequest, RawExecutionResult } from './judge-provider.interface';

export class LocalServerProvider implements IServerJudgeProvider {
  public readonly id = 'local';
  public readonly name = 'Local Host Sandbox (Development Only)';

  public async health(): Promise<boolean> {
    return isLocalExecutionAllowed();
  }

  public mapLanguage(language: LanguageId): { languageId: number | string; name: string } {
    const config = SUPPORTED_LANGUAGES[language];
    return {
      languageId: language,
      name: config?.name || language,
    };
  }

  public async execute(request: RawExecutionRequest): Promise<RawExecutionResult> {
    if (!isLocalExecutionAllowed()) {
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: 'Unsafe host code execution is disabled in production. A dedicated isolated judge is required.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: this.name,
        error: 'Host execution disallowed by production safety policy.',
      };
    }

    const execResult = await sandboxRunner.execute({
      language: request.language,
      code: request.code,
      stdin: request.stdin,
      timeoutMs: request.timeoutMs,
      memoryLimitMb: request.memoryLimitMb,
    });

    return {
      status: execResult.status,
      stdout: execResult.stdout,
      stderr: execResult.stderr,
      compileOutput: execResult.compileOutput,
      runtimeMs: execResult.runtimeMs,
      memoryMb: execResult.memoryMb,
      exitCode: execResult.exitCode,
      providerUsed: this.name,
    };
  }
}

export const localServerProvider = new LocalServerProvider();
