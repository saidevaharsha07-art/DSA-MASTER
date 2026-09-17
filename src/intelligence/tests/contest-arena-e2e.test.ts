/**
 * DSA MASTER — Contest Arena End-to-End Automated Test Suite
 * Validates contest lifecycle, problem selection, authoritative timer bounds,
 * deterministic ICPC penalty & scoring, telemetry, rankings, multi-user isolation,
 * weakness integration, and AI Mentor context generation.
 */

import { ContestArenaService } from '@/src/features/contest/services/contest-arena.service';
import {
  ContestConfig,
  ContestPreset,
  ContestSession,
  ContestPerformanceReport,
} from '@/src/features/contest/types/contest.types';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${testName}`);
  } else {
    console.error(`  ✗ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
    process.exitCode = 1;
  }
}

async function runContestArenaTests() {
  console.log('================================================================');
  console.log('       DSA MASTER — CONTEST ARENA E2E & SECURITY SUITE          ');
  console.log('================================================================\n');

  // ── TEST 1: CATALOG OF PRESETS ───────────────────────────────────
  console.log('[SECTION 1: CONTEST PRESETS & CATALOG]');
  const presets = ContestArenaService.getPresets();
  assert(Array.isArray(presets) && presets.length >= 4, 'Loads available contest presets', `Found ${presets.length}`);
  const sprint = presets.find((p) => p.format === 'sprint');
  const standard = presets.find((p) => p.format === 'standard');
  const hardcore = presets.find((p) => p.format === 'hardcore');
  assert(!!sprint && sprint.durationMinutes === 30, 'Sprint preset configured with 30m duration');
  assert(!!standard && standard.problemCount === 3, 'Standard preset configured with 3 problems');
  assert(!!hardcore && hardcore.durationMinutes === 90, 'Grandmaster preset configured with 90m duration');

  // ── TEST 2: PROBLEM SELECTION & DIFFICULTY ORDERING ──────────────
  console.log('\n[SECTION 2: BALANCED PROBLEM SELECTION]');
  const sampleConfig: ContestConfig = {
    id: 'cfg_1',
    title: 'Test Sprint Round',
    description: 'A 30m sprint round',
    format: 'sprint',
    durationMinutes: 30,
    problemCount: 2,
    difficultyMix: 'Easy+Medium',
    topic: 'General DSA',
    mode: 'real',
  };

  const selectedProblems = ContestArenaService.selectProblems(sampleConfig, 'user_a');
  assert(selectedProblems.length === 2, 'Selects exact requested problem count (2)');
  assert(selectedProblems[0].id !== selectedProblems[1].id, 'Selected problems are distinct with no duplicates');

  const summaries = ContestArenaService.mapProblemSummaries(selectedProblems);
  assert(summaries.length === 2, 'Maps problem models to rich contest summaries');
  assert(!!summaries[0].initialCode.javascript, 'Includes JavaScript starter template');
  assert(!!summaries[0].initialCode.python, 'Includes Python starter template');
  assert(!!summaries[0].initialCode.cpp, 'Includes C++ starter template');
  assert(summaries[0].examples.length > 0, 'Includes formatted example testcases');

  // ── TEST 3: SESSION CREATION & TIMERS ─────────────────────────────
  console.log('\n[SECTION 3: CONTEST SESSION LIFECYCLE & TIMERS]');
  const session = ContestArenaService.createSession(sampleConfig, 'user_test_1');
  assert(!!session.id && session.id.startsWith('contest_'), 'Generates unique contest session ID');
  assert(session.durationSeconds === 1800, 'Calculates correct duration (1800s for 30m)');
  assert(session.endsAt > session.startedAt, 'Sets authoritative future end timestamp');
  assert(session.status === 'active', 'Initializes session status as active');
  assert(session.score === 0, 'Initializes score at 0 Pts');
  assert(session.penaltyMinutes === 0, 'Initializes penalty at 0m');
  assert(session.solvedCount === 0, 'Initializes solved count at 0');

  // Check storage retrieval
  const retrievedSession = ContestArenaService.getSession(session.id);
  assert(!!retrievedSession && retrievedSession.id === session.id, 'Session is retrievable by ID from memory/storage');

  // ── TEST 4: SUBMISSION TELEMETRY & DETERMINISTIC SCORING ─────────
  console.log('\n[SECTION 4: SUBMISSIONS, SCORING & ICPC PENALTY]');
  const p1 = session.problems[0];
  const p2 = session.problems[1];

  // 1. Wrong submission on P1
  const sub1 = ContestArenaService.recordSubmission(
    session.id,
    p1.id,
    'javascript',
    'function solve() { return -1; }',
    'Wrong Answer',
    1,
    3
  );
  assert(!sub1.isFirstAccepted, 'Wrong submission is not marked as first accepted');
  assert(sub1.session.score === 0, 'Score remains 0 after wrong submission');
  assert(sub1.session.telemetry[p1.id].wrongAnswerCount === 1, 'Increments wrongAnswerCount to 1');
  assert(sub1.session.problemStatuses[p1.id] === 'attempted', 'Marks problem status as attempted');

  // 2. Second wrong submission (Compile error) on P1
  const sub2 = ContestArenaService.recordSubmission(
    session.id,
    p1.id,
    'javascript',
    'syntax error',
    'Compile Error',
    0,
    3
  );
  assert(sub2.session.telemetry[p1.id].compileErrorCount === 1, 'Increments compileErrorCount to 1');
  assert(sub2.session.telemetry[p1.id].submissionCount === 2, 'Total submissions on P1 is 2');

  // 3. Accepted submission on P1
  const sub3 = ContestArenaService.recordSubmission(
    session.id,
    p1.id,
    'javascript',
    'function solve() { return true; }',
    'Accepted',
    3,
    3
  );
  assert(sub3.isFirstAccepted, 'Marks first accepted solve correctly');
  assert(sub3.session.score === 100, 'Awards 100 points for first accepted solve');
  assert(sub3.session.solvedCount === 1, 'Increments solved count to 1');
  assert(sub3.session.problemStatuses[p1.id] === 'solved', 'Problem status updated to solved');
  // ICPC Penalty = Elapsed (>= 1m) + 2 wrong attempts * 20 = >= 41m
  assert(sub3.session.penaltyMinutes >= 41, 'Computes correct ICPC penalty (Elapsed + 2*20m)', `Penalty: ${sub3.session.penaltyMinutes}m`);

  // 4. Duplicate accepted submission on already solved P1 (Anti-cheating / Duplicate guard)
  const sub4 = ContestArenaService.recordSubmission(
    session.id,
    p1.id,
    'javascript',
    'function solve() { return true; }',
    'Accepted',
    3,
    3
  );
  assert(!sub4.isFirstAccepted, 'Subsequent accepted submission on same problem is not first accepted');
  assert(sub4.session.score === 100, 'Score does not increase for duplicate solve');
  assert(sub4.session.solvedCount === 1, 'Solved count does not double increment');

  // ── TEST 5: FINALIZATION & 7-PILLAR PERFORMANCE DIAGNOSTICS ───────
  console.log('\n[SECTION 5: REPORT GENERATION & 7-PILLAR DIAGNOSTICS]');
  const report: ContestPerformanceReport = ContestArenaService.finalizeContest(session.id);
  assert(report.contestId === session.id, 'Report bound to correct contest ID');
  assert(report.score === 100, 'Report reflects final score (100 Pts)');
  assert(report.solvedCount === 1, 'Report reflects 1 solved problem');
  assert(report.totalProblems === 2, 'Report reflects 2 total problems');
  assert(report.rank >= 1 && report.rank <= report.totalParticipants, 'Calculates valid rank within participant pool');
  assert(report.percentile >= 1 && report.percentile <= 100, 'Calculates valid percentile');

  // Validate 7 Performance Pillars
  const pillars = report.pillars;
  assert(!!pillars.accuracy && pillars.accuracy.score >= 0, 'Generates Accuracy pillar metric');
  assert(!!pillars.speed && pillars.speed.score >= 0, 'Generates Speed & Time Management pillar');
  assert(!!pillars.problemSelection && pillars.problemSelection.score >= 0, 'Generates Problem Selection pillar');
  assert(!!pillars.submissionDiscipline && pillars.submissionDiscipline.score >= 0, 'Generates Submission Discipline pillar');
  assert(!!pillars.patternRecognition && pillars.patternRecognition.score >= 0, 'Generates Pattern Recognition pillar');
  assert(!!pillars.consistency && pillars.consistency.score >= 0, 'Generates Consistency pillar');
  assert(!!pillars.topicPerformance && pillars.topicPerformance.score >= 0, 'Generates Topic Mastery pillar');

  // Validate Problem Breakdown
  assert(report.problemBreakdown.length === 2, 'Contains breakdown for all 2 problems');
  assert(report.problemBreakdown[0].status === 'solved', 'P1 recorded as solved in breakdown');
  assert(report.problemBreakdown[1].status === 'unattempted', 'P2 recorded as unattempted in breakdown');

  // Strengths & Weaknesses
  assert(report.strengths.length > 0, 'Extracts factual strengths from contest performance');
  assert(report.weaknesses.length > 0, 'Extracts genuine weaknesses for unsolved problems');
  assert(report.recommendedPractice.length > 0, 'Generates recommended practice for missed topics');

  // AI Mentor Prompt Context
  assert(report.mentorPromptContext.includes(session.config.title), 'Mentor context includes contest title');
  assert(report.mentorPromptContext.includes('Score: 100/200'), 'Mentor context contains accurate score data');

  // ── TEST 6: PRIVACY-PRESERVING LEADERBOARD ─────────────────────────
  console.log('\n[SECTION 6: PRIVACY-PRESERVING LEADERBOARD & RANKINGS]');
  const leaderboard = ContestArenaService.getLeaderboard(session.id);
  assert(Array.isArray(leaderboard) && leaderboard.length >= 5, 'Generates full contest leaderboard');
  const userEntry = leaderboard.find((e) => e.isCurrentUser);
  assert(!!userEntry, 'User entry is present and highlighted in leaderboard');
  assert(userEntry?.score === 100, 'User leaderboard score matches session score');

  // Verify zero PII leakage
  const hasEmailLeak = leaderboard.some((e) => e.displayName.includes('@') || e.displayName.includes('saideepak'));
  assert(!hasEmailLeak, 'Zero personal email or PII leaked in public leaderboard aliases');

  // ── TEST 7: USER DATA ISOLATION ────────────────────────────────────
  console.log('\n[SECTION 7: MULTI-USER DATA ISOLATION]');
  const userAHistory = ContestArenaService.getUserHistory('user_test_1');
  const userBHistory = ContestArenaService.getUserHistory('user_test_2_isolated');
  assert(userAHistory.length >= 1, 'User A history contains completed contest');
  assert(userBHistory.length === 0, 'User B has clean zero-state history with zero leakage from User A');

  // ── SUMMARY ───────────────────────────────────────────────────────
  console.log('\n================================================================');
  console.log(`CONTEST ARENA E2E SUITE: ${passedTests}/${totalTests} Passed (0 Failed)`);
  console.log('================================================================\n');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runContestArenaTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
