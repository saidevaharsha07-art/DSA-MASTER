import { runnerFactory } from '../execution/RunnerFactory';
import { RunRequest, RunResult, SubmitRequest, SubmitResult } from '../execution/types';

const AUTOSAVE_PREFIX = 'dsa_editor_autosave_v3_';

export class CodeRunnerService {
  /**
   * Run sample/custom testcases via active adapter runner.
   */
  public async executeCode(req: RunRequest, signal?: AbortSignal): Promise<RunResult> {
    const runner = runnerFactory.getRunner();
    return await runner.run(req, signal);
  }

  /**
   * Submit solution against hidden testcases.
   */
  public async submitCode(req: SubmitRequest, signal?: AbortSignal): Promise<SubmitResult> {
    const runner = runnerFactory.getRunner();
    return await runner.submit(req, signal);
  }

  /**
   * Autosave draft code per problem & language.
   */
  public saveDraft(problemId: string, language: string, code: string) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${AUTOSAVE_PREFIX}${problemId}_${language}`, code);
    } catch (e) {
      console.error('Failed to autosave draft code', e);
    }
  }

  /**
   * Load saved draft code per problem & language.
   */
  public loadDraft(problemId: string, language: string): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(`${AUTOSAVE_PREFIX}${problemId}_${language}`);
    } catch (e) {
      return null;
    }
  }
}

export const codeRunnerService = new CodeRunnerService();
