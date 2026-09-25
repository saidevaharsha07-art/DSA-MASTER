import { NextRequest, NextResponse } from 'next/server';
import { judgeEvaluator } from '@/src/services/judge/evaluator';
import { SUPPORTED_LANGUAGES } from '@/src/services/judge/languages';
import { LanguageId } from '@/src/services/judge/types';

const MAX_PAYLOAD_BYTES = 64 * 1024; // 64KB max request payload
const MAX_CODE_CHARS = 50 * 1000;    // 50,000 chars code limit
const MAX_INPUT_CHARS = 10 * 1000;   // 10,000 chars stdin/customInput limit
const VALID_SLUG_REGEX = /^[a-zA-Z0-9_-]{1,100}$/;

export async function POST(req: NextRequest) {
  try {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: 'Payload Too Large: Execution request exceeds 64KB limit.' },
        { status: 413 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: 'Bad Request: Malformed JSON body.' },
        { status: 400 }
      );
    }

    const { problemId, language, code, customInput, sampleIndex } = body || {};

    // 1. Validate Code
    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Bad Request: Source code is required and cannot be empty.' },
        { status: 400 }
      );
    }

    if (code.length > MAX_CODE_CHARS) {
      return NextResponse.json(
        { error: `Bad Request: Source code exceeds maximum allowed size of ${MAX_CODE_CHARS} characters.` },
        { status: 400 }
      );
    }

    // 2. Validate Language
    if (!language || typeof language !== 'string' || !(language in SUPPORTED_LANGUAGES)) {
      return NextResponse.json(
        { error: `Bad Request: Unsupported or invalid programming language '${language}'.` },
        { status: 400 }
      );
    }

    // 3. Validate Problem ID
    if (!problemId || typeof problemId !== 'string' || !VALID_SLUG_REGEX.test(problemId)) {
      return NextResponse.json(
        { error: 'Bad Request: Invalid or missing problemId parameter.' },
        { status: 400 }
      );
    }

    // 4. Validate customInput if provided
    if (customInput !== undefined && customInput !== null) {
      if (typeof customInput !== 'string') {
        return NextResponse.json(
          { error: 'Bad Request: customInput must be a string.' },
          { status: 400 }
        );
      }
      if (customInput.length > MAX_INPUT_CHARS) {
        return NextResponse.json(
          { error: `Bad Request: customInput exceeds maximum limit of ${MAX_INPUT_CHARS} characters.` },
          { status: 400 }
        );
      }
    }

    // 5. Validate sampleIndex if provided
    if (sampleIndex !== undefined && sampleIndex !== null) {
      if (typeof sampleIndex !== 'number' || !Number.isInteger(sampleIndex) || sampleIndex < 0 || sampleIndex > 50) {
        return NextResponse.json(
          { error: 'Bad Request: sampleIndex must be an integer between 0 and 50.' },
          { status: 400 }
        );
      }
    }

    // Server dictates execution limits (client custom limits are safely ignored)
    const result = await judgeEvaluator.evaluateRun({
      problemId,
      language: language as LanguageId,
      code,
      customInput: typeof customInput === 'string' ? customInput : undefined,
      sampleIndex: typeof sampleIndex === 'number' ? sampleIndex : undefined,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'runtime_error',
        stdout: '',
        stderr: 'Code execution is coming soon.\nExecution unavailable in the first release.\nLive code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience.',
        runtimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        totalTestcases: 0,
        passedTestcases: 0,
        testcaseResults: [],
        providerUsed: 'DSA Sandboxed Engine',
      },
      { status: 200 }
    );
  }
}
