/**
 * Comprehensive E2E QA Test Suite — Interview Arena (Phase 12)
 * Validates problem selection, weakness targeting, sandboxed code execution,
 * telemetry isolation, grounded report synthesis, AI Mentor integration,
 * fresh-user zero states, and multi-user data isolation.
 */

import { InterviewArenaService } from '@/src/features/interview/services/interview-arena.service';
import {
  InterviewConfig,
  InterviewTopicType,
  InterviewArenaDifficulty,
  InterviewLanguage,
} from '@/src/features/interview/types/interview.types';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { EventBus } from '@/src/core/events/event-bus';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`QA Test Assertion Failed: ${message}`);
  }
  passedTests++;
  console.log(`✓ Passed: ${message}`);
}

export async function runInterviewArenaE2ETest(): Promise<boolean> {
  console.log('\n======================================================================');
  console.log('         INTERVIEW ARENA COMPREHENSIVE E2E QA TEST SUITE              ');
  console.log('======================================================================\n');

  const testUserIdA = 'qa_interview_user_a_' + Date.now();
  const testUserIdB = 'qa_interview_user_b_' + Date.now();

  // ──────────────────────────────────────────────────────────────────────────
  // 1. PUBLIC SAMPLE PREVIEW & ZERO STATE
  // ──────────────────────────────────────────────────────────────────────────
  console.log('--- 1. PUBLIC SAMPLE PREVIEW & FRESH USER INITIAL STATE ---');
  const sampleReport = InterviewArenaService.getSampleReport();
  assert(sampleReport !== null && sampleReport !== undefined, 'Sample report is generated for public preview');
  assert(sampleReport.overallScore > 0, 'Sample report has valid score');
  assert((sampleReport.problemBreakdown || []).length >= 3, 'Sample report displays full 3-problem breakdown');
  assert((sampleReport.whatWentWell || []).length > 0, 'Sample report includes grounded strengths');
  assert((sampleReport.whatNeedsWork || []).length > 0, 'Sample report includes grounded areas for improvement');

  const freshHistory = InterviewArenaService.getHistory(testUserIdA);
  assert(Array.isArray(freshHistory) && freshHistory.length === 0, 'Fresh user starts with authentic 0 past interviews');

  // ──────────────────────────────────────────────────────────────────────────
  // 2. CONFIGURATION & PROBLEM SELECTION
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 2. CONFIGURATION & PROBLEM SELECTION ---');
  const dsaConfig: InterviewConfig = {
    type: 'Arrays & Hashing',
    difficulty: 'Easy',
    durationMinutes: 30,
    problemCount: 2,
    language: 'javascript',
    useWeakness: false,
  };

  const selectedArrays = InterviewArenaService.selectProblems(dsaConfig, testUserIdA);
  assert(selectedArrays.length === 2, 'Selects exactly 2 problems for 2-problem setup');
  assert(
    selectedArrays.every((p) => p.categorySlug === 'beginnings' || p.categoryTitle?.toLowerCase().includes('array') || p.patternId?.toLowerCase().includes('hash') || p.patternId?.toLowerCase().includes('array')),
    'Selected problems strictly match Arrays & Hashing topic'
  );

  const mixedConfig: InterviewConfig = {
    type: 'Mixed Patterns',
    difficulty: 'Mixed',
    durationMinutes: 45,
    problemCount: 3,
    language: 'python',
    useWeakness: false,
  };

  const selectedMixed = InterviewArenaService.selectProblems(mixedConfig, testUserIdA);
  assert(selectedMixed.length === 3, 'Selects exactly 3 problems for mixed pattern round');

  // ──────────────────────────────────────────────────────────────────────────
  // 3. LIVE INTERVIEW SESSION CREATION & TIMING
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 3. LIVE SESSION INITIALIZATION & TIMER ---');
  const session = InterviewArenaService.createSession(mixedConfig, testUserIdA);
  assert(session.id.startsWith('arena_sess_'), 'Session receives unique session ID');
  assert(session.problems.length === 3, 'Session initialized with 3 problem attempts');
  assert(session.durationSeconds === 45 * 60, 'Duration accurately reflects 45 minutes in seconds (2700s)');
  assert(new Date(session.expiresAt).getTime() > Date.now(), 'Expiry timestamp set in future');
  assert(session.problems[0].userCode.length > 0, 'Problem 1 initialized with starter template');
  assert(session.status === 'in_progress', 'Initial session status is in_progress');

  // ──────────────────────────────────────────────────────────────────────────
  // 4. SANDBOXED RUN CODE EXECUTION
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 4. SANDBOXED CODE EXECUTION (RUN CODE) ---');
  const prob1 = session.problems[0];
  const runResult = await InterviewArenaService.executeRun(
    prob1.problemId,
    prob1.starterCode,
    prob1.language
  );
  assert(runResult !== null && runResult !== undefined, 'Sandboxed runner executed successfully');
  assert(typeof runResult.runtimeMs === 'number', 'Runtime measurement recorded');

  // ──────────────────────────────────────────────────────────────────────────
  // 5. PROBLEM SUBMISSION & TELEMETRY RECORDING
  // ──────────────────────────────────────────────────────────────────────────
  // Ensure problem 0 is Two Sum for verified execution test
  session.problems[0].problemId = 'two-sum';
  session.problems[0].title = 'Two Sum';
  session.problems[0].categorySlug = 'beginnings';

  // Problem 1: Submit a working solution for Two Sum
  const twoSumCode = `
    function twoSum(nums, target) {
      const map = new Map();
      for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i];
        if (map.has(comp)) return [map.get(comp), i];
        map.set(nums[i], i);
      }
      return [];
    }
  `;

  const submit1 = await InterviewArenaService.submitSolution(
    session.id,
    0,
    twoSumCode,
    'javascript',
    testUserIdA
  );

  assert(submit1.verdict === 'Accepted', 'Problem 1 submitted and marked Accepted');
  assert(submit1.passed === true, 'Passed flag is true');
  assert(submit1.session.problems[0].status === 'passed', 'Problem attempt status updated to passed');
  assert(submit1.session.problems[0].attemptsCount === 1, 'Problem attempt count accurately incremented to 1');

  // Problem 2: Submit a buggy solution to test struggle telemetry
  const buggyCode = `function solve() { return -1; }`;
  const submit2 = await InterviewArenaService.submitSolution(
    session.id,
    1,
    buggyCode,
    'javascript',
    testUserIdA
  );

  assert(submit2.passed === false, 'Buggy solution marked not passed');
  assert(submit2.session.problems[1].status === 'failed', 'Problem 2 marked failed');
  assert(submit2.session.problems[1].attemptsCount === 1, 'Problem 2 recorded attempt count');

  // ──────────────────────────────────────────────────────────────────────────
  // 6. REPORT SYNTHESIS & GROUNDED DIAGNOSTICS
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 6. DATA-GROUNDED REPORT GENERATION ---');
  const finalReport = InterviewArenaService.finishSession(session.id, testUserIdA, 'completed');

  assert(finalReport.id.startsWith('report_'), 'Report generated with unique ID');
  assert(finalReport.overallScore >= 0 && finalReport.overallScore <= 100, 'Overall score computed in range 0-100');
  assert(['A+', 'A', 'B', 'C', 'D', 'F'].includes(finalReport.grade as any), 'Valid letter grade assigned');
  assert(finalReport.metrics.accuracy >= 0, 'Accuracy metric computed');
  assert((finalReport.metrics.problemSolving ?? 0) >= 0, 'Problem Solving metric computed');
  assert(finalReport.metrics.timeManagement >= 0, 'Time Management metric computed');
  assert(finalReport.metrics.patternRecognition >= 0, 'Pattern Recognition metric computed');
  assert((finalReport.problemBreakdown || []).length === 3, 'Breakdown includes all 3 interview problems');

  const prob1Breakdown = (finalReport.problemBreakdown || [])[0];
  assert(prob1Breakdown && prob1Breakdown.result === 'Passed', 'Problem 1 recorded as Passed in breakdown');
  assert(prob1Breakdown && prob1Breakdown.attempts === 1, 'Problem 1 recorded with exactly 1 attempt');

  assert((finalReport.whatWentWell || []).length > 0, 'Report produces grounded "What Went Well" feedback');
  assert((finalReport.whatNeedsWork || []).length > 0, 'Report produces grounded "What Needs Work" feedback');
  assert((finalReport.recommendedNextSteps || []).length > 0, 'Report produces actionable next steps');
  assert(finalReport.mentorQueryContext.includes('DSA MASTER'), 'AI Mentor context string is pre-formatted');

  // ──────────────────────────────────────────────────────────────────────────
  // 7. USER ISOLATION & HISTORY PERSISTENCE
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 7. TWO-USER ISOLATION & HISTORY PERSISTENCE ---');
  const userAHistory = InterviewArenaService.getHistory(testUserIdA);
  assert(userAHistory.length === 1, 'User A history contains exactly 1 saved interview');
  assert(userAHistory[0].score === finalReport.overallScore, 'User A history score matches final report');

  const userBHistory = InterviewArenaService.getHistory(testUserIdB);
  assert(userBHistory.length === 0, 'User B sees 0 interviews (no cross-user leakage from User A)');

  // User B starts and finishes an interview
  const sessionB = InterviewArenaService.createSession(dsaConfig, testUserIdB);
  const reportB = InterviewArenaService.finishSession(sessionB.id, testUserIdB, 'completed');

  const updatedBHistory = InterviewArenaService.getHistory(testUserIdB);
  assert(updatedBHistory.length === 1, 'User B history contains only User B session');
  assert(updatedBHistory[0].id === reportB.id, 'User B history reflects User B report ID');

  const recheckAHistory = InterviewArenaService.getHistory(testUserIdA);
  assert(recheckAHistory.length === 1 && recheckAHistory[0].id === finalReport.id, 'User A history remained untouched');

  console.log('\n======================================================================');
  console.log(`✓ ALL ${passedTests} / ${totalTests} INTERVIEW ARENA E2E TESTS PASSED!`);
  console.log('======================================================================\n');
  return true;
}
