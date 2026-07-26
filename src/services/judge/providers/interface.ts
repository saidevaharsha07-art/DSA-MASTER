import { ExecutionRequest, ExecutionResponse, SubmissionRequest, SubmissionResponse, LanguageConfig } from '../types';

export interface JudgeProvider {
  id: string;
  name: string;
  health(): Promise<boolean>;
  getLanguages(): LanguageConfig[];
  run(request: ExecutionRequest, signal?: AbortSignal): Promise<ExecutionResponse>;
  submit(request: SubmissionRequest, signal?: AbortSignal): Promise<SubmissionResponse>;
}
