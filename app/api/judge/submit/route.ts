import { NextRequest, NextResponse } from 'next/server';
import { judgeEvaluator } from '@/src/services/judge/evaluator';
import { SUPPORTED_LANGUAGES } from '@/src/services/judge/languages';
import { LanguageId } from '@/src/services/judge/types';

const MAX_PAYLOAD_BYTES = 64 * 1024; // 64KB max request payload
const MAX_CODE_CHARS = 50 * 1000;    // 50,000 chars code limit
const VALID_SLUG_REGEX = /^[a-zA-Z0-9_-]{1,100}$/;
const VALID_USER_ID_REGEX = /^[a-zA-Z0-9_@.-]{1,128}$/;

export async function POST(req: NextRequest) {
  try {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: 'Payload Too Large: Submission payload exceeds 64KB limit.' },
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

    const { problemId, language, code, userId } = body || {};

    const authHeader = req.headers.get('authorization');
    const headerUserId = req.headers.get('x-user-id');
    const requireAuthHeader = req.headers.get('x-require-auth') === 'true';

    // 1. Authentication requirement check
    if (requireAuthHeader || process.env.REQUIRE_AUTH_FOR_SUBMISSIONS === 'true' || (!headerUserId && !authHeader && !userId)) {
      if (!headerUserId && !authHeader) {
        return NextResponse.json(
          { error: 'Unauthorized: Authentication required to submit solutions.' },
          { status: 401 }
        );
      }
    }

    // 2. Cross-user spoofing prevention
    if (headerUserId && userId && headerUserId !== userId && !headerUserId.startsWith('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized: Cross-user submission prohibited.' },
        { status: 403 }
      );
    }

    // 3. Validate Code
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

    // 4. Validate Language
    if (!language || typeof language !== 'string' || !(language in SUPPORTED_LANGUAGES)) {
      return NextResponse.json(
        { error: `Bad Request: Unsupported or invalid programming language '${language}'.` },
        { status: 400 }
      );
    }

    // 5. Validate Problem ID
    if (!problemId || typeof problemId !== 'string' || !VALID_SLUG_REGEX.test(problemId)) {
      return NextResponse.json(
        { error: 'Bad Request: Invalid or missing problemId parameter.' },
        { status: 400 }
      );
    }

    // 6. Sanitize and validate effective user ID
    const rawUserId = headerUserId || userId || 'anonymous_user';
    if (!VALID_USER_ID_REGEX.test(rawUserId) || rawUserId.includes('..')) {
      return NextResponse.json(
        { error: 'Bad Request: Malformed user identification.' },
        { status: 400 }
      );
    }

    const effectiveUserId = rawUserId;

    // Server-controlled limits are enforced inside evaluateSubmit
    const result = await judgeEvaluator.evaluateSubmit({
      problemId,
      language: language as LanguageId,
      code,
      userId: effectiveUserId,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      {
        submissionId: `sub_${Date.now()}`,
        verdict: 'Runtime Error',
        testcasesPassed: 0,
        totalTestcases: 1,
        runtimeMs: 0,
        memoryMb: 0,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: 'Code execution is coming soon.\nExecution unavailable in the first release.\nLive code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience.',
        providerUsed: 'unavailable',
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  }
}
