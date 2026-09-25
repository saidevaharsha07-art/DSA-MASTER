import { LanguageId, ExecutionRequest, ExecutionResponse, SubmissionRequest, SubmissionResponse, TestcaseResult } from './types';
import { getServerJudgeProvider } from './server/provider-factory';
import { driverGenerator, DriverSpec, DriverTestCase } from './drivers';
import { getProblemTestSuite } from './testcases';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';

export class JudgeEvaluator {
  /**
   * Evaluates Run Code against sample test cases or custom input.
   */
  public async evaluateRun(request: ExecutionRequest): Promise<ExecutionResponse> {
    const { problemId, language, code, customInput, sampleIndex } = request;
    const testSuite = getProblemTestSuite(problemId);

    let testcasesToRun: DriverTestCase[] = [];

    if (customInput && customInput.trim().length > 0) {
      testcasesToRun = [
        {
          input: customInput.trim(),
          expectedOutput: testSuite.visibleExamples[0]?.expectedOutput || 'Output',
        },
      ];
    } else if (sampleIndex !== undefined && testSuite.visibleExamples[sampleIndex]) {
      testcasesToRun = [testSuite.visibleExamples[sampleIndex]];
    } else {
      testcasesToRun = testSuite.visibleExamples;
    }

    const spec = this.getDriverSpec(problemId);
    const harnessCode = driverGenerator.generateHarness(language, code, spec, testcasesToRun);

    const provider = getServerJudgeProvider();
    const execResult = await provider.execute({
      language,
      code: harnessCode,
      timeoutMs: 3000,
    });

    const isUnavailable =
      execResult.status === 'runtime_error' &&
      (execResult.stderr?.includes('coming soon') ||
        execResult.stderr?.includes('temporarily unavailable') ||
        execResult.stderr?.includes('Execution unavailable'));

    if (isUnavailable) {
      return {
        status: 'runtime_error',
        stdout: '',
        stderr: execResult.stderr || 'Code execution is coming soon.\nExecution unavailable in the first release.\nLive code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: 'unavailable',
        totalTestcases: testcasesToRun.length,
        passedTestcases: 0,
        testcaseResults: [],
      };
    }

    if (execResult.status === 'compile_error') {
      return {
        status: 'compile_error',
        stdout: '',
        stderr: execResult.stderr || execResult.compileOutput || 'Compilation Error',
        compileOutput: execResult.compileOutput || execResult.stderr,
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        providerUsed: provider.name,
        totalTestcases: testcasesToRun.length,
        passedTestcases: 0,
        testcaseResults: [],
      };
    }

    if (execResult.status === 'time_limit') {
      return {
        status: 'time_limit',
        stdout: execResult.stdout,
        stderr: execResult.stderr || 'Time Limit Exceeded',
        runtimeMs: execResult.runtimeMs || 3000,
        memoryMb: execResult.memoryMb || 25,
        exitCode: 124,
        providerUsed: provider.name,
        totalTestcases: testcasesToRun.length,
        passedTestcases: 0,
        testcaseResults: [],
      };
    }

    // Parse __DSA_TEST__: lines from stdout
    const parsedResults = this.parseTestOutput(execResult.stdout, testcasesToRun);

    if (parsedResults.length === 0 && execResult.status === 'runtime_error') {
      return {
        status: 'runtime_error',
        stdout: execResult.stdout,
        stderr: execResult.stderr || 'Runtime Execution Error',
        runtimeMs: execResult.runtimeMs,
        memoryMb: execResult.memoryMb,
        exitCode: 1,
        providerUsed: provider.name,
        totalTestcases: testcasesToRun.length,
        passedTestcases: 0,
        testcaseResults: [],
      };
    }

    const passedCount = parsedResults.filter((r) => r.passed).length;
    const allPassed = parsedResults.length > 0 && passedCount === parsedResults.length;

    return {
      status: allPassed ? 'accepted' : 'wrong_answer',
      stdout: execResult.stdout,
      stderr: execResult.stderr,
      runtimeMs: execResult.runtimeMs,
      memoryMb: execResult.memoryMb,
      exitCode: allPassed ? 0 : 1,
      providerUsed: provider.name,
      totalTestcases: parsedResults.length,
      passedTestcases: passedCount,
      testcaseResults: parsedResults,
    };
  }

  /**
   * Evaluates Submit Solution against the full hidden test suite.
   */
  public async evaluateSubmit(request: SubmissionRequest): Promise<SubmissionResponse> {
    const { problemId, language, code, userId } = request;
    const testSuite = getProblemTestSuite(problemId);
    const hiddenTests = testSuite.hiddenTests;

    const prob = CurriculumRepository.getProblemBySlug(problemId) || CurriculumRepository.getProblemById(problemId);
    const xpReward = prob?.xp || 50;

    const spec = this.getDriverSpec(problemId);
    const harnessCode = driverGenerator.generateHarness(language, code, spec, hiddenTests);

    const provider = getServerJudgeProvider();
    const execResult = await provider.execute({
      language,
      code: harnessCode,
      timeoutMs: 4000,
    });

    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const timestamp = new Date().toISOString();

    const isUnavailable =
      execResult.status === 'runtime_error' &&
      (execResult.stderr?.includes('coming soon') ||
        execResult.stderr?.includes('temporarily unavailable') ||
        execResult.stderr?.includes('Execution unavailable'));

    if (isUnavailable) {
      return {
        submissionId,
        verdict: 'Runtime Error',
        testcasesPassed: 0,
        totalTestcases: hiddenTests.length,
        runtimeMs: 0,
        memoryMb: 0,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: execResult.stderr || 'Code execution is coming soon.\nExecution unavailable in the first release.\nLive code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience.',
        providerUsed: 'unavailable',
        timestamp,
      };
    }

    if (execResult.status === 'compile_error') {
      return {
        submissionId,
        verdict: 'Compilation Error',
        testcasesPassed: 0,
        totalTestcases: hiddenTests.length,
        runtimeMs: 0,
        memoryMb: 0,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: execResult.compileOutput || execResult.stderr || 'Compilation Failed',
        providerUsed: provider.name,
        timestamp,
      };
    }

    if (execResult.status === 'time_limit') {
      return {
        submissionId,
        verdict: 'Time Limit Exceeded',
        testcasesPassed: 0,
        totalTestcases: hiddenTests.length,
        runtimeMs: execResult.runtimeMs || 4000,
        memoryMb: execResult.memoryMb || 25,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: 'Execution exceeded 4000ms time limit.',
        providerUsed: provider.name,
        timestamp,
      };
    }

    const parsedResults = this.parseTestOutput(execResult.stdout, hiddenTests);

    if (parsedResults.length === 0 && execResult.status === 'runtime_error') {
      return {
        submissionId,
        verdict: 'Runtime Error',
        testcasesPassed: 0,
        totalTestcases: hiddenTests.length,
        runtimeMs: execResult.runtimeMs,
        memoryMb: execResult.memoryMb,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: execResult.stderr || 'Runtime Exception during test execution.',
        providerUsed: provider.name,
        timestamp,
      };
    }

    const passedCount = parsedResults.filter((r) => r.passed).length;
    const allPassed = parsedResults.length === hiddenTests.length && passedCount === hiddenTests.length;
    const firstFailed = parsedResults.find((r) => !r.passed);

    const verdict = allPassed
      ? 'Accepted'
      : firstFailed?.error
      ? 'Runtime Error'
      : 'Wrong Answer';

    // Calculate runtime percentiles
    const beatsRuntimePct = allPassed
      ? Math.min(99.4, Math.max(70.0, Number((100 - (execResult.runtimeMs / 200) * 20).toFixed(1))))
      : 0;

    const beatsMemoryPct = allPassed
      ? Math.min(98.5, Math.max(65.0, Number((100 - (execResult.memoryMb / 60) * 15).toFixed(1))))
      : 0;

    return {
      submissionId,
      verdict,
      testcasesPassed: passedCount,
      totalTestcases: hiddenTests.length,
      runtimeMs: execResult.runtimeMs,
      memoryMb: execResult.memoryMb,
      xpEarned: allPassed ? xpReward : 0,
      beatsRuntimePct,
      beatsMemoryPct,
      testcaseDetails: parsedResults,
      failedTestcase: firstFailed
        ? {
            testcaseIndex: firstFailed.testcaseIndex,
            input: firstFailed.input,
            expectedOutput: firstFailed.expectedOutput,
            actualOutput: firstFailed.actualOutput,
            error: firstFailed.error,
          }
        : undefined,
      errorLog: firstFailed?.error || (!allPassed ? `Failed on testcase ${firstFailed ? firstFailed.testcaseIndex + 1 : 1}` : undefined),
      providerUsed: provider.name,
      timestamp,
    };
  }

  // ── HELPER: PARSE TEST RESULT LINES ────────────────────────────────
  private parseTestOutput(stdout: string, originalTestcases: DriverTestCase[]): TestcaseResult[] {
    const results: TestcaseResult[] = [];
    const lines = stdout.split('\n');

    for (const line of lines) {
      if (line.includes('__DSA_TEST__:')) {
        const jsonStr = line.substring(line.indexOf('__DSA_TEST__:') + '__DSA_TEST__:'.length).trim();
        try {
          const parsed = JSON.parse(jsonStr);
          const orig = originalTestcases[parsed.testIndex] || { input: '', expectedOutput: '' };
          results.push({
            testcaseIndex: parsed.testIndex,
            passed: Boolean(parsed.passed),
            input: parsed.input || orig.input,
            expectedOutput: parsed.expected || orig.expectedOutput,
            actualOutput: parsed.actual || '',
            status: parsed.passed
              ? 'Passed'
              : parsed.error
              ? 'Runtime Error'
              : 'Wrong Answer',
            runtimeMs: parsed.runtimeMs || 1.5,
            memoryMb: parsed.memoryMb || 24.0,
            diff: !parsed.passed
              ? `Expected: ${parsed.expected || orig.expectedOutput}\nActual:   ${parsed.actual}`
              : undefined,
            error: parsed.error,
          });
        } catch (e) {
          // Ignore JSON parse errors for malformed individual lines
        }
      }
    }

    return results;
  }

  // ── HELPER: GET DRIVER SPEC ────────────────────────────────────────
  private getDriverSpec(problemSlugOrId: string): DriverSpec {
    const slug = problemSlugOrId.toLowerCase().trim();
    const prob = CurriculumRepository.getProblemBySlug(slug) || CurriculumRepository.getProblemById(slug);

    if (prob) {
      const detail = getProblemDetailInfo(prob);
      return {
        problemSlug: slug,
        funcDef: detail.functionDefinition,
        isInPlaceArray: slug === 'remove-element' || slug === 'remove-duplicates-from-sorted-array' || slug === 'move-zeroes',
        isTwoSum: slug === 'two-sum',
      };
    }

    return {
      problemSlug: slug,
      funcDef: {
        name: 'solve',
        parameters: [{ name: 'input', type: 'any' }],
        returnType: 'any',
      },
    };
  }
}

export const judgeEvaluator = new JudgeEvaluator();
