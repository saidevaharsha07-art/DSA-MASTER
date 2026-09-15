import { NextRequest, NextResponse } from 'next/server';
import { judgeEvaluator } from '@/src/services/judge/evaluator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemId, language, code, userId } = body;

    const authHeader = req.headers.get('authorization');
    const headerUserId = req.headers.get('x-user-id');
    const effectiveUserId = headerUserId || (userId && typeof userId === 'string' && !userId.includes('..') ? userId : 'anonymous_user');

    // Security Check: Prevent submitting on behalf of a different user ID
    if (headerUserId && userId && headerUserId !== userId && !headerUserId.startsWith('admin')) {
      return NextResponse.json({ error: 'Unauthorized: Cross-user submission prohibited' }, { status: 403 });
    }

    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json({
        submissionId: `sub_${Date.now()}`,
        verdict: 'Compilation Error',
        testcasesPassed: 0,
        totalTestcases: 1,
        runtimeMs: 0,
        memoryMb: 0,
        xpEarned: 0,
        beatsRuntimePct: 0,
        beatsMemoryPct: 0,
        testcaseDetails: [],
        errorLog: 'Compilation Error: Empty submission provided.',
        providerUsed: 'DSA Sandboxed Engine',
        timestamp: new Date().toISOString(),
      });
    }

    const result = await judgeEvaluator.evaluateSubmit({
      problemId: problemId || 'two-sum',
      language: language || 'python',
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
        errorLog: error.message || 'Internal Submission Error',
        providerUsed: 'DSA Sandboxed Engine',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
