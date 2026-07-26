import { RunRequest, RunResult, SubmitRequest, SubmitResult } from './types';

export interface IRunner {
  id: string;
  name: string;
  run(req: RunRequest, signal?: AbortSignal): Promise<RunResult>;
  submit(req: SubmitRequest, signal?: AbortSignal): Promise<SubmitResult>;
}
