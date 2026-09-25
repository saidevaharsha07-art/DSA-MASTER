import { Judge0Provider } from './providers/judge0';
import { PistonProvider } from './providers/piston';
import { LocalDockerProvider } from './providers/docker';
import { ProviderHealthMonitor } from './health';
import { executionQueue } from './queue';
import { ExecutionRequest, ExecutionResponse, SubmissionRequest, SubmissionResponse, LanguageConfig } from './types';
import { SUPPORTED_LANGUAGES } from './languages';

// Initialize execution provider pipeline with automatic failover
const judge0 = new Judge0Provider();
const piston = new PistonProvider();
const localDocker = new LocalDockerProvider();

const healthMonitor = new ProviderHealthMonitor([judge0, piston, localDocker]);

/**
 * Execute user code against sample/custom input.
 */
export async function runCode(request: ExecutionRequest): Promise<ExecutionResponse> {
  const job = executionQueue.createJob('run', request);
  executionQueue.setJobStatus('running');

  try {
    const provider = await healthMonitor.getActiveProvider();
    const result = await provider.run(request, job.abortController?.signal);
    executionQueue.setJobStatus('completed');
    return result;
  } catch (error: any) {
    if (job.abortController?.signal.aborted) {
      executionQueue.setJobStatus('cancelled');
      throw new Error('Execution cancelled by user');
    }
    executionQueue.setJobStatus('failed');
    throw error;
  }
}

/**
 * Submit user solution against hidden testcases.
 */
export async function submitSolution(request: SubmissionRequest): Promise<SubmissionResponse> {
  const job = executionQueue.createJob('submit', request);
  executionQueue.setJobStatus('running');

  try {
    const provider = await healthMonitor.getActiveProvider();
    const result = await provider.submit(request, job.abortController?.signal);
    executionQueue.setJobStatus('completed');
    return result;
  } catch (error: any) {
    if (job.abortController?.signal.aborted) {
      executionQueue.setJobStatus('cancelled');
      throw new Error('Submission cancelled by user');
    }
    executionQueue.setJobStatus('failed');
    throw error;
  }
}

/**
 * Cancel active running execution.
 */
export function cancelActiveExecution() {
  executionQueue.cancelActiveJob();
}

/**
 * Fetch supported language configurations.
 */
export function getSupportedLanguages(): LanguageConfig[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

export * from './types';
export * from './languages';
