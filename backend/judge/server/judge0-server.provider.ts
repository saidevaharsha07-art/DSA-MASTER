import { LanguageId } from '../types';
import { SUPPORTED_LANGUAGES } from '../languages';
import { IServerJudgeProvider, RawExecutionRequest, RawExecutionResult } from './judge-provider.interface';

export class Judge0ServerProvider implements IServerJudgeProvider {
  public readonly id = 'judge0';
  public readonly name = 'Judge0 Isolated Sandbox';

  private getBaseUrl(): string {
    const url = process.env.JUDGE0_URL || '';
    return url.replace(/\/+$/, '');
  }

  private getApiKey(): string | undefined {
    // SERVER-ONLY: Never exposed to client or browser
    return process.env.JUDGE0_API_KEY || undefined;
  }

  public async health(): Promise<boolean> {
    const baseUrl = this.getBaseUrl();
    if (!baseUrl) return false;

    try {
      const headers: Record<string, string> = {};
      const apiKey = this.getApiKey();
      if (apiKey) {
        headers['X-Auth-Token'] = apiKey;
        if (baseUrl.includes('rapidapi.com')) {
          headers['X-RapidAPI-Key'] = apiKey;
        }
      }

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${baseUrl}/about`, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      clearTimeout(timer);
      return res.ok;
    } catch {
      return false;
    }
  }

  public mapLanguage(language: LanguageId): { languageId: number | string; name: string } {
    const config = SUPPORTED_LANGUAGES[language];
    if (config?.judge0LanguageId) {
      return {
        languageId: config.judge0LanguageId,
        name: config.name,
      };
    }

    // Default canonical fallback mappings for primary DSA Magna languages
    switch (language) {
      case 'python':
        return { languageId: 71, name: 'Python (3.12.0)' };
      case 'java':
        return { languageId: 62, name: 'Java (OpenJDK 13.0.1)' };
      case 'cpp':
        return { languageId: 54, name: 'C++ (GCC 9.2.0)' };
      case 'c':
        return { languageId: 50, name: 'C (GCC 9.2.0)' };
      case 'javascript':
        return { languageId: 63, name: 'JavaScript (Node.js 12.14.0)' };
      case 'typescript':
        return { languageId: 74, name: 'TypeScript (3.7.4)' };
      case 'go':
        return { languageId: 60, name: 'Go (1.13.5)' };
      case 'rust':
        return { languageId: 73, name: 'Rust (1.40.0)' };
      default:
        return { languageId: 71, name: 'Python (3.12.0)' };
    }
  }

  public async execute(request: RawExecutionRequest, signal?: AbortSignal): Promise<RawExecutionResult> {
    const baseUrl = this.getBaseUrl();
    const apiKey = this.getApiKey();

    if (!baseUrl || !apiKey) {
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: 'Code execution is coming soon.\nExecution unavailable in the first release.\nLive code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: 'unavailable',
        error: 'Code execution is coming soon.',
      };
    }

    const { languageId } = this.mapLanguage(request.language);
    const timeoutSeconds = Math.min(Math.max((request.timeoutMs || 4000) / 1000, 1), 10);
    const memoryLimitKb = (request.memoryLimitMb || 256) * 1024;

    const payload = {
      source_code: request.code,
      language_id: languageId,
      stdin: request.stdin || '',
      cpu_time_limit: timeoutSeconds,
      cpu_extra_time: 0.5,
      wall_time_limit: timeoutSeconds + 2,
      memory_limit: memoryLimitKb,
      max_file_size: 1024,
      enable_network: false, // Strict network isolation
    };

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (apiKey) {
      headers['X-Auth-Token'] = apiKey;
      if (baseUrl.includes('rapidapi.com')) {
        headers['X-RapidAPI-Key'] = apiKey;
      }
    }

    const timeoutMs = (timeoutSeconds + 3) * 1000;
    const internalController = new AbortController();
    const timer = setTimeout(() => internalController.abort(), timeoutMs);

    // Combine caller signal and internal timeout signal if provided
    let combinedSignal = internalController.signal;
    if (signal) {
      signal.addEventListener('abort', () => internalController.abort());
    }

    const startTime = performance.now();

    try {
      const response = await fetch(`${baseUrl}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: combinedSignal,
      });

      clearTimeout(timer);

      // Handle HTTP status errors cleanly
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          return {
            status: 'runtime_error',
            stdout: '',
            stderr: 'Code execution service authentication failed. Please contact the administrator.',
            runtimeMs: 0,
            memoryMb: 0,
            exitCode: 1,
            providerUsed: this.name,
            error: 'Authentication error with judge service',
          };
        }

        if (response.status === 429) {
          return {
            status: 'runtime_error',
            stdout: '',
            stderr: 'Execution rate limit reached. Please wait a few seconds before trying again.',
            runtimeMs: 0,
            memoryMb: 0,
            exitCode: 1,
            providerUsed: this.name,
            error: 'Judge service rate limit exceeded',
          };
        }

        // 5xx Server errors
        return {
          status: 'runtime_error',
          stdout: '',
          stderr: 'Code execution is temporarily unavailable. Please try again shortly.',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
          error: `Judge service returned status ${response.status}`,
        };
      }

      let data: any;
      try {
        data = await response.json();
      } catch {
        return {
          status: 'runtime_error',
          stdout: '',
          stderr: 'Code execution is temporarily unavailable. Please try again shortly.',
          runtimeMs: 0,
          memoryMb: 0,
          exitCode: 1,
          providerUsed: this.name,
          error: 'Malformed response received from judge service.',
        };
      }

      const elapsedMs = Math.round(performance.now() - startTime);

      return this.normalizeJudge0Response(data, elapsedMs);
    } catch (err: any) {
      clearTimeout(timer);

      if (combinedSignal.aborted || err?.name === 'AbortError') {
        return {
          status: 'time_limit',
          stdout: '',
          stderr: `Time Limit Exceeded: Execution took longer than ${request.timeoutMs || 4000}ms.`,
          runtimeMs: request.timeoutMs || 4000,
          memoryMb: 24,
          exitCode: 124,
          providerUsed: this.name,
        };
      }

      // Safe fallback on network failure or unreachable host
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: 'Code execution is temporarily unavailable. Please try again shortly.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: 'unavailable',
        error: 'Network connectivity failure to judge service',
      };
    }
  }

  private normalizeJudge0Response(data: any, fallbackElapsedMs: number): RawExecutionResult {
    const statusId = data?.status?.id ?? 0;
    const rawStdout = this.cleanOutput(data?.stdout);
    const rawStderr = this.cleanOutput(data?.stderr);
    const compileOutput = this.cleanOutput(data?.compile_output);

    // Compute execution metrics
    const runtimeMs = data?.time !== undefined && data?.time !== null
      ? Math.max(1, Math.round(parseFloat(String(data.time)) * 1000))
      : fallbackElapsedMs;

    const memoryMb = data?.memory !== undefined && data?.memory !== null
      ? Math.max(1, Math.round((parseInt(String(data.memory), 10) / 1024) * 10) / 10)
      : 24.0;

    const exitCode = typeof data?.exit_code === 'number' ? data.exit_code : 0;

    // Status ID 3: Accepted
    if (statusId === 3) {
      return {
        status: 'accepted',
        stdout: rawStdout,
        stderr: rawStderr,
        runtimeMs,
        memoryMb,
        exitCode,
        providerUsed: this.name,
      };
    }

    // Status ID 4: Wrong Answer (if Judge0 itself evaluated test cases)
    if (statusId === 4) {
      return {
        status: 'wrong_answer',
        stdout: rawStdout,
        stderr: rawStderr,
        runtimeMs,
        memoryMb,
        exitCode: exitCode || 1,
        providerUsed: this.name,
      };
    }

    // Status ID 5: Time Limit Exceeded
    if (statusId === 5) {
      return {
        status: 'time_limit',
        stdout: rawStdout,
        stderr: rawStderr || 'Time Limit Exceeded: Process killed after timeout limit.',
        runtimeMs,
        memoryMb,
        exitCode: 124,
        providerUsed: this.name,
      };
    }

    // Status ID 6: Compilation Error
    if (statusId === 6) {
      return {
        status: 'compile_error',
        stdout: rawStdout,
        stderr: rawStderr || compileOutput || 'Compilation Error',
        compileOutput: compileOutput || rawStderr,
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: exitCode || 1,
        providerUsed: this.name,
      };
    }

    // Status IDs 7, 8, 9, 10, 11, 12, 14: Runtime Errors (SIGSEGV, NZEC, etc.)
    if (statusId >= 7 && statusId <= 14 && statusId !== 13) {
      return {
        status: 'runtime_error',
        stdout: rawStdout,
        stderr: rawStderr || data?.status?.description || 'Runtime Exception during execution.',
        runtimeMs,
        memoryMb,
        exitCode: exitCode || 1,
        providerUsed: this.name,
      };
    }

    // Status ID 13: Internal Error in Judge0
    if (statusId === 13) {
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: 'Code execution is temporarily unavailable. Please try again shortly.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: this.name,
        error: 'Judge0 internal service error',
      };
    }

    // Fallback: If exitCode is non-zero
    if (exitCode !== 0) {
      return {
        status: 'runtime_error',
        stdout: rawStdout,
        stderr: rawStderr || 'Process exited with non-zero exit code.',
        runtimeMs,
        memoryMb,
        exitCode,
        providerUsed: this.name,
      };
    }

    return {
      status: 'accepted',
      stdout: rawStdout,
      stderr: rawStderr,
      runtimeMs,
      memoryMb,
      exitCode: 0,
      providerUsed: this.name,
    };
  }

  private cleanOutput(val: unknown): string {
    if (typeof val !== 'string') return '';
    let cleaned = val;

    // Sanitize any secrets if accidentally echoed
    const apiKey = this.getApiKey();
    if (apiKey && apiKey.length > 5) {
      cleaned = cleaned.replaceAll(apiKey, '[REDACTED]');
    }

    return cleaned.trim();
  }
}

export const judge0ServerProvider = new Judge0ServerProvider();
