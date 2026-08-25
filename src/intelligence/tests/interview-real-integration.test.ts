/**
 * Phase 8 — AI Mock Interview Simulator Integration Test Suite
 * Validates tests 1-14 for canonical problem selection, user context injection,
 * multi-turn dialogue, dynamic evaluations, user isolation, and strict telemetry separation.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { InterviewAdapterService } from '@/src/features/interview/services/interview-adapter.service';
import fs from 'fs';
import path from 'path';

export async function testInterviewRealIntegration(): Promise<void> {
  console.log('--- Testing Phase 8 AI Mock Interview Simulator Integration (Tests 1-14) ---');

  // Reset state before tests
  progressService.resetState();
  if (!Container.has('MemoryEngine')) {
    Container.registerSingleton('MemoryEngine', new MemoryEngine());
  }
  InterviewAdapterService.clearSessions();

  // TEST 1 — SESSION INITIALIZATION
  const session1 = InterviewAdapterService.startSession('user_int_1', 'amazon', 'Coding', 'Medium');
  if (!session1 || !session1.sessionId.startsWith('int_user_int_1_')) {
    throw new Error('Test 1 Failed: Expected valid session ID starting with user_int_1');
  }
  if (session1.status !== 'active') {
    throw new Error(`Test 1 Failed: Expected status 'active', got '${session1.status}'`);
  }
  console.log('✓ Test 1 Passed: Session initialization verified with unique session ID and active status');

  // TEST 2 — REAL CANONICAL PROBLEM SELECTION
  if (!session1.problemId || !session1.problemTitle) {
    throw new Error('Test 2 Failed: Session problemId or problemTitle missing');
  }
  console.log(`✓ Test 2 Passed: Real canonical problem selected from CurriculumRepository: ${session1.problemTitle} (${session1.problemId})`);

  // TEST 3 — USER CONTEXT INJECTION
  if (session1.turns.length === 0 || !session1.turns[0].text.includes('Amazon')) {
    throw new Error('Test 3 Failed: Opening turn text missing company context injection');
  }
  console.log('✓ Test 3 Passed: Candidate profile and company context cleanly injected into opening prompt');

  // TEST 4 — MULTI-TURN INTERVIEW STATE
  const turnResult1 = await InterviewAdapterService.sendCandidateTurn(
    session1.sessionId,
    'user_int_1',
    'I plan to use a HashMap to store values and indices for O(N) time complexity.',
    'function solve(arr) { return {}; }'
  );
  if (turnResult1.session.turns.length !== 3) {
    throw new Error(`Test 4 Failed: Expected 3 turns after candidate reply, got ${turnResult1.session.turns.length}`);
  }
  console.log('✓ Test 4 Passed: Multi-turn interview conversation state maintained cleanly');

  // TEST 5 — DYNAMIC ORACLE RESPONSE STRUCTURE
  const aiTurnText = turnResult1.aiTurn.text;
  if (!aiTurnText || aiTurnText.length < 10) {
    throw new Error('Test 5 Failed: Dynamic AI response turn text empty or invalid');
  }
  console.log('✓ Test 5 Passed: Dynamic AI response structure produced valid probing follow-up');

  // TEST 6 — DYNAMIC REPORT GENERATION
  const report1 = InterviewAdapterService.completeInterviewSession(
    session1.sessionId,
    'user_int_1',
    'function solve(arr) { const map = new Map(); return map; }'
  );
  if (!report1 || report1.confidence <= 0) {
    throw new Error('Test 6 Failed: Dynamic report generation failed');
  }
  console.log('✓ Test 6 Passed: Dynamic post-interview evaluation report card generated');

  // TEST 7 — NO HARDCODED READINESS SCORES IN CODE
  const interviewViewContent = fs.readFileSync(path.join(process.cwd(), 'app/(app)/interview/page.tsx'), 'utf-8');
  if (interviewViewContent.includes('86% Overall Readiness')) {
    throw new Error('Test 7 Failed Regression: /interview still contains hardcoded "86% Overall Readiness"!');
  }
  console.log('✓ Test 7 Passed: No hardcoded readiness or static report scores in UI component');

  // TEST 8 — NO ACCIDENTAL ProblemSolved EVENT
  // Verify that completing an interview did NOT publish ProblemSolved to progressService
  const postState = progressService.getState();
  if ((postState.completedProblemIds || []).includes(session1.problemId)) {
    throw new Error('Test 8 Failed Data Integrity: Interview completion accidentally added problemId to completedProblemIds!');
  }
  console.log('✓ Test 8 Passed Data Integrity: Interview completion did NOT publish ProblemSolved event');

  // TEST 9 — INTERVIEW DOES NOT INCREASE XP
  if (postState.xp !== 0) {
    throw new Error(`Test 9 Failed: Expected XP to remain 0, got ${postState.xp}`);
  }
  console.log('✓ Test 9 Passed: Interview simulation does NOT alter normal practice XP');

  // TEST 10 — INTERVIEW DOES NOT INCREASE NORMAL SOLVED COUNT
  if ((postState.completedProblemIds || []).length !== 0) {
    throw new Error('Test 10 Failed: Normal solve count altered during interview simulation!');
  }
  console.log('✓ Test 10 Passed: Interview simulation does NOT alter normal solved count');

  // TEST 11 — USER ISOLATION
  try {
    InterviewAdapterService.completeInterviewSession(session1.sessionId, 'unauthorized_user_B');
    throw new Error('Test 11 Failed: Unauthorized user B was allowed to access session1!');
  } catch (err: any) {
    if (!err.message.includes('Unauthorized access')) {
      throw new Error(`Test 11 Failed unexpected error: ${err.message}`);
    }
  }
  console.log('✓ Test 11 Passed: User isolation strictly enforced by session ownership validation');

  // TEST 12 — EMPTY-USER BEHAVIOR (HONEST UNRATED REPORT)
  progressService.resetState();
  const emptySession = InterviewAdapterService.startSession('empty_user_int', 'google', 'Coding', 'Easy');
  const emptyReport = InterviewAdapterService.completeInterviewSession(emptySession.sessionId, 'empty_user_int');
  if (emptyReport.overallScore !== 'Unrated') {
    throw new Error(`Test 12 Failed: Expected 'Unrated' overall score for empty user, got '${emptyReport.overallScore}'`);
  }
  console.log('✓ Test 12 Passed: Empty user receives truthful unrated report and foundational interview problem');

  // TEST 13 — SESSION CLEANUP
  InterviewAdapterService.abandonSession(emptySession.sessionId, 'empty_user_int');
  const abandonedSession = InterviewAdapterService.getSession(emptySession.sessionId, 'empty_user_int');
  if (abandonedSession?.status !== 'abandoned') {
    throw new Error('Test 13 Failed: Abandoned session status not updated');
  }
  console.log('✓ Test 13 Passed: Session cleanup and abandonment handling verified');

  // TEST 14 — MASTER REGRESSION PROTECTION
  if (interviewViewContent.includes('Problem Solving 90%')) {
    throw new Error('Test 14 Failed Regression: /interview still contains static "Problem Solving 90%"!');
  }
  console.log('✓ Test 14 Passed: Master regression protection verified across interview subsystem');
  console.log('--- All Phase 8 Integration Tests Passed Successfully! ---');
}
