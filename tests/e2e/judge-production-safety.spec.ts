import { test, expect } from 'playwright/test';
import { isLocalExecutionAllowed, sandboxRunner } from '../../backend/judge/sandbox/runner';
import { Judge0ServerProvider } from '../../backend/judge/server/judge0-server.provider';
import { LocalServerProvider } from '../../backend/judge/server/local-server.provider';
import { MockServerProvider } from '../../backend/judge/server/mock-server.provider';
import { getServerJudgeProvider, setTestJudgeProvider } from '../../backend/judge/server/provider-factory';
import { judgeEvaluator } from '../../backend/judge/evaluator';

test.describe('DSA Magna — Production Isolated Judge & Safety Verification', () => {

  test.afterEach(() => {
    // Reset test provider overrides after each test
    setTestJudgeProvider(null);
    delete process.env.REQUIRE_AUTH_FOR_SUBMISSIONS;
  });

  // ── TEST A: Production runner flag false → local child_process runner is NOT invoked ──
  test('A. Production runner flag false blocks local child_process runner execution', async () => {
    const originalNextPublic = process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER;
    const originalEnable = process.env.ENABLE_LOCAL_RUNNER;
    const originalNodeEnv = process.env.NODE_ENV;

    try {
      // Simulate production configuration
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = 'false';
      process.env.ENABLE_LOCAL_RUNNER = 'false';
      (process.env as any).NODE_ENV = 'production';

      expect(isLocalExecutionAllowed()).toBe(false);

      // Attempting to call sandboxRunner.execute must throw immediately without spawning
      await expect(
        sandboxRunner.execute({
          language: 'python',
          code: 'print("hello unsafe world")',
        })
      ).rejects.toThrow('Unsafe host code execution is disabled in production');

      // LocalServerProvider also returns a safe failure without spawning
      const localProvider = new LocalServerProvider();
      const result = await localProvider.execute({
        language: 'python',
        code: 'print("hello unsafe world")',
      });

      expect(result.status).toBe('runtime_error');
      expect(result.stderr).toContain('Unsafe host code execution is disabled in production');
    } finally {
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = originalNextPublic;
      process.env.ENABLE_LOCAL_RUNNER = originalEnable;
      (process.env as any).NODE_ENV = originalNodeEnv;
    }
  });

  // ── TEST B: Production execution → external judge provider is invoked ──
  test('B. In production environment, server judge factory resolves to isolated Judge0 provider', () => {
    const originalNextPublic = process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER;
    const originalNodeEnv = process.env.NODE_ENV;

    try {
      (process.env as any).NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = 'false';

      const provider = getServerJudgeProvider();
      expect(provider.id).toBe('judge0');
      expect(provider.name).toBe('Judge0 Isolated Sandbox');
      expect(provider).toBeInstanceOf(Judge0ServerProvider);
    } finally {
      process.env.NEXT_PUBLIC_ENABLE_LOCAL_RUNNER = originalNextPublic;
      (process.env as any).NODE_ENV = originalNodeEnv;
    }
  });

  // ── TEST C: Judge API key → never appears in client output ──
  test('C. Sensitive judge credentials (JUDGE0_API_KEY) are never leaked in execution results', async () => {
    const secretApiKey = 'super-secret-judge0-api-token-998877';
    process.env.JUDGE0_API_KEY = secretApiKey;
    process.env.JUDGE0_URL = 'https://fake-judge0-api.example.com';

    const provider = new Judge0ServerProvider();

    // Simulate an execution that encounters an error or returns text containing the key
    const mockOutputWithSecret = `Debug log with key: ${secretApiKey} and internal error`;
    const normalized = (provider as any).normalizeJudge0Response(
      {
        stdout: mockOutputWithSecret,
        stderr: `Failed with token ${secretApiKey}`,
        compile_output: `Compiler notes: ${secretApiKey}`,
        status: { id: 3, description: 'Accepted' },
      },
      50
    );

    expect(normalized.stdout).not.toContain(secretApiKey);
    expect(normalized.stdout).toContain('[REDACTED]');
    expect(normalized.stderr).not.toContain(secretApiKey);
    expect(normalized.stderr).toContain('[REDACTED]');

    delete process.env.JUDGE0_API_KEY;
    delete process.env.JUDGE0_URL;
  });

  // ── TEST D: Unauthenticated submission → rejected where authentication is required ──
  test('D. Unauthenticated submissions are rejected when auth is strictly required', async ({ request }) => {
    const res = await request.post('/api/judge/submit', {
      headers: {
        'x-require-auth': 'true',
      },
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: 'def twoSum(nums, target): return [0, 1]',
      },
    });

    expect(res.status()).toBe(401);
    const json = await res.json();
    expect(json.error).toContain('Authentication required to submit solutions');
  });

  // ── TEST E: Malformed source code request → rejected with 400 Bad Request ──
  test('E. Malformed source code requests are rejected with 400 Bad Request', async ({ request }) => {
    // 1. Empty code
    const resEmpty = await request.post('/api/judge/run', {
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: '   ',
      },
    });
    expect(resEmpty.status()).toBe(400);
    const emptyJson = await resEmpty.json();
    expect(emptyJson.error).toContain('Source code is required and cannot be empty');

    // 2. Unsupported language
    const resLang = await request.post('/api/judge/run', {
      data: {
        problemId: 'two-sum',
        language: 'malbolge_unsupported',
        code: 'print("hello")',
      },
    });
    expect(resLang.status()).toBe(400);
    const langJson = await resLang.json();
    expect(langJson.error).toContain('Unsupported or invalid programming language');

    // 3. Invalid problem ID (e.g. path traversal)
    const resSlug = await request.post('/api/judge/run', {
      data: {
        problemId: '../../etc/passwd',
        language: 'python',
        code: 'print("hello")',
      },
    });
    expect(resSlug.status()).toBe(400);
    const slugJson = await resSlug.json();
    expect(slugJson.error).toContain('Invalid or missing problemId parameter');
  });

  // ── TEST F: Oversized request → rejected ──
  test('F. Oversized code and customInput requests are rejected', async ({ request }) => {
    // 1. Code > 50,000 characters (e.g. 52,000 chars)
    const oversizedCode = 'a'.repeat(52000);
    const resCode = await request.post('/api/judge/run', {
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: oversizedCode,
      },
    });
    expect(resCode.status()).toBe(400);
    const codeJson = await resCode.json();
    expect(codeJson.error).toContain('exceeds maximum allowed size');

    // 2. Total payload > 64KB (triggers 413 Payload Too Large)
    const giantPayload = 'x'.repeat(70000);
    const resPayload = await request.post('/api/judge/run', {
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: giantPayload,
      },
    });
    expect(resPayload.status()).toBe(413);

    // 3. customInput > 10,000 characters
    const giantInput = '1 '.repeat(5500); // 11,000 characters
    const resInput = await request.post('/api/judge/run', {
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: 'print(1)',
        customInput: giantInput,
      },
    });
    expect(resInput.status()).toBe(400);
    const inputJson = await resInput.json();
    expect(inputJson.error).toContain('customInput exceeds maximum limit');
  });

  // ── TEST G: Provider timeout → safe timeout result ──
  test('G. Provider timeout yields a safe time_limit verdict without leaking stack traces', async () => {
    const mock = new MockServerProvider('time_limit');
    setTestJudgeProvider(mock);

    const runResult = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: 'while True: pass',
    });

    expect(runResult.status).toBe('time_limit');
    expect(runResult.exitCode).toBe(124);
    expect(runResult.stderr).toContain('Time Limit Exceeded');

    const submitResult = await judgeEvaluator.evaluateSubmit({
      problemId: 'two-sum',
      language: 'python',
      code: 'while True: pass',
      userId: 'test_user',
    });

    expect(submitResult.verdict).toBe('Time Limit Exceeded');
    expect(submitResult.testcasesPassed).toBe(0);
  });

  // ── TEST H: Provider 5xx / Unavailable → safe failure result ──
  test('H. External judge 5xx/unavailable yields a user-friendly message without host fallback', async () => {
    const mock = new MockServerProvider('unavailable');
    setTestJudgeProvider(mock);

    const runResult = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: 'def solve(): pass',
    });

    expect(runResult.status).toBe('runtime_error');
    expect(runResult.stderr).toBe('Code execution is temporarily unavailable. Please try again shortly.');
    expect(runResult.providerUsed).toBe('unavailable');

    const submitResult = await judgeEvaluator.evaluateSubmit({
      problemId: 'two-sum',
      language: 'python',
      code: 'def solve(): pass',
      userId: 'test_user',
    });

    expect(submitResult.verdict).toBe('Runtime Error');
    expect(submitResult.errorLog).toBe('Code execution is temporarily unavailable. Please try again shortly.');
    expect(submitResult.providerUsed).toBe('unavailable');
  });

  // ── TEST I: Provider malformed response → safely handled ──
  test('I. Corrupted or malformed provider response is handled gracefully', async () => {
    const mock = new MockServerProvider('malformed');
    setTestJudgeProvider(mock);

    const runResult = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: 'print("hello")',
    });

    expect(runResult.status).toBe('runtime_error');
    expect(runResult.testcaseResults).toEqual([]);
  });

  // ── TEST J: Java/Python/C++ → correct provider language mapping ──
  test('J. DSA Magna languages map correctly to standard Judge0 language IDs', () => {
    const provider = new Judge0ServerProvider();

    const py = provider.mapLanguage('python');
    expect(py.languageId).toBe(71);

    const java = provider.mapLanguage('java');
    expect(java.languageId).toBe(62);

    const cpp = provider.mapLanguage('cpp');
    expect(cpp.languageId).toBe(54);

    const c = provider.mapLanguage('c');
    expect(c.languageId).toBe(50);

    const js = provider.mapLanguage('javascript');
    expect(js.languageId).toBe(63);

    const ts = provider.mapLanguage('typescript');
    expect(ts.languageId).toBe(74);

    const go = provider.mapLanguage('go');
    expect(go.languageId).toBe(60);

    const rust = provider.mapLanguage('rust');
    expect(rust.languageId).toBe(73);
  });

  // ── TEST K: Submission ownership → cross-user submission prevented ──
  test('K. Cross-user submission attempts are rejected with 403 Forbidden', async ({ request }) => {
    const res = await request.post('/api/judge/submit', {
      headers: {
        'x-user-id': 'legitimate_user_123',
      },
      data: {
        problemId: 'two-sum',
        language: 'python',
        code: 'def twoSum(nums, target): return [0, 1]',
        userId: 'victim_user_456', // Attempting to submit as a different user
      },
    });

    expect(res.status()).toBe(403);
    const json = await res.json();
    expect(json.error).toContain('Unauthorized: Cross-user submission prohibited');
  });

  // ── TEST L: Integration Test Mode with Mock Provider (Requirement 10) ──
  test('L. Mock judge provider deterministically validates all evaluation states', async () => {
    const mock = new MockServerProvider();
    setTestJudgeProvider(mock);

    // 1. Success mode
    mock.setMode('success');
    const successRes = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: 'def twoSum(nums, target): return [0, 1]',
    });
    expect(successRes.status).toBe('accepted');
    expect(successRes.passedTestcases).toBe(3);

    // 2. Compilation error mode
    mock.setMode('compile_error');
    const compileRes = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: 'syntax error',
    });
    expect(compileRes.status).toBe('compile_error');
    expect(compileRes.stderr).toContain('Compilation Error');

    // 3. Runtime error mode
    mock.setMode('runtime_error');
    const runtimeRes = await judgeEvaluator.evaluateRun({
      problemId: 'two-sum',
      language: 'python',
      code: '1 / 0',
    });
    expect(runtimeRes.status).toBe('runtime_error');
    expect(runtimeRes.stderr).toContain('ZeroDivisionError');
  });

});
