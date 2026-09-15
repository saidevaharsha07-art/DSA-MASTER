import { NextRequest, NextResponse } from 'next/server';
import { judgeEvaluator } from '@/src/services/judge/evaluator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemId, language, code, customInput, sampleIndex } = body;

    const headerUserId = req.headers.get('x-user-id');

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json({
        status: 'compile_error',
        stdout: '',
        stderr: 'Compilation Error: No source code provided.',
        compileOutput: 'Empty source code.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        totalTestcases: 0,
        passedTestcases: 0,
        testcaseResults: [],
        providerUsed: 'DSA Sandboxed Engine',
      });
    }

    if (code.length > 50000) {
      return NextResponse.json({
        status: 'compile_error',
        stdout: '',
        stderr: 'Compilation Error: Code payload exceeds maximum allowed size (50KB).',
        compileOutput: 'Payload too large.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        totalTestcases: 0,
        passedTestcases: 0,
        testcaseResults: [],
        providerUsed: 'DSA Sandboxed Engine',
      }, { status: 400 });
    }

    const result = await judgeEvaluator.evaluateRun({
      problemId: problemId || 'two-sum',
      language: language || 'python',
      code,
      customInput,
      sampleIndex,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'runtime_error',
        stdout: '',
        stderr: error.message || 'Internal Execution Sandbox Error',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        totalTestcases: 0,
        passedTestcases: 0,
        testcaseResults: [],
        providerUsed: 'DSA Sandboxed Engine',
      },
      { status: 500 }
    );
  }
}
