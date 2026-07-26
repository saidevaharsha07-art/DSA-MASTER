import { ExecutionJob, ExecutionRequest, SubmissionRequest } from '../types';

class ExecutionQueue {
  private activeJob: ExecutionJob | null = null;
  private history: ExecutionJob[] = [];

  public createJob(type: 'run' | 'submit', request: ExecutionRequest | SubmissionRequest): ExecutionJob {
    if (this.activeJob && this.activeJob.status === 'running') {
      this.cancelActiveJob();
    }

    const job: ExecutionJob = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      request,
      status: 'pending',
      createdAt: new Date().toISOString(),
      abortController: new AbortController(),
    };

    this.activeJob = job;
    this.history.unshift(job);
    return job;
  }

  public setJobStatus(status: ExecutionJob['status']) {
    if (this.activeJob) {
      this.activeJob.status = status;
      if (status === 'completed' || status === 'failed' || status === 'cancelled') {
        this.activeJob.completedAt = new Date().toISOString();
      }
    }
  }

  public cancelActiveJob() {
    if (this.activeJob && this.activeJob.abortController) {
      this.activeJob.abortController.abort();
      this.activeJob.status = 'cancelled';
      this.activeJob.completedAt = new Date().toISOString();
    }
  }

  public getActiveJob(): ExecutionJob | null {
    return this.activeJob;
  }
}

export const executionQueue = new ExecutionQueue();
