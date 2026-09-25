import { LanguageId } from '../types';

export interface RawExecutionRequest {
  language: LanguageId;
  code: string;
  stdin?: string;
  timeoutMs?: number;
  memoryLimitMb?: number;
}

export interface RawExecutionResult {
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
  stdout: string;
  stderr: string;
  compileOutput?: string;
  runtimeMs: number;
  memoryMb: number;
  exitCode: number;
  providerUsed: string;
  error?: string;
}

export interface IServerJudgeProvider {
  readonly id: string;
  readonly name: string;
  health(): Promise<boolean>;
  execute(request: RawExecutionRequest, signal?: AbortSignal): Promise<RawExecutionResult>;
  mapLanguage(language: LanguageId): { languageId: number | string; name: string };
}
