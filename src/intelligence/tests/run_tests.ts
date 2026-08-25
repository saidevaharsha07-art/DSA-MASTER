/**
 * Intelligence Layer & Master Production Test Runner
 * Master test runner executing unit, integration, infrastructure, benchmark, stress, and offline tests.
 */

import { testProfileService } from './profile.test';
import { testDomainRules } from './domain.test';
import { testAnalyzers } from './analyzers.test';
import { testRecommendations } from './recommendations.test';

import { testAdaptiveEngine } from './adaptive.test';
import { testAdaptiveRealIntegration } from './adaptive-real-integration.test';
import { testSessionEngine } from './session.test';
import { testPracticeScheduler } from './scheduler.test';

import { testContestEngine } from './contest.test';
import { testRatingEngine } from './rating.test';

import { testMemoryEngine } from '../memory/tests/memory.test';
import { testForgettingEngine } from '../memory/tests/forgetting.test';
import { testReviewScheduler } from '../memory/tests/review.test';
import { testMemoryEventIntegration } from '../memory/tests/memory-integration.test';

import { testOracleEngine } from '../oracle/tests/oracle.test';
import { testRankingEngine } from '../oracle/tests/ranking.test';
import { testSimulationEngine } from '../oracle/tests/simulation.test';
import { testOraclePlanners } from '../oracle/tests/planner.test';
import { testDashboardSnapshot } from '../oracle/tests/dashboard.test';
import { testProductionIntegration } from './integration.test';

import { testContainer } from './container.test';
import { testPluginArchitecture } from './plugin.test';
import { testMigrations } from './migration.test';
import { testEventBus } from './event-bus.test';
import { testQueryCache } from './cache.test';
import { testOfflineQueue } from './offline.test';
import { testPerformanceBenchmarks } from './benchmark.test';
import { testLargeDatasetStress } from './stress.test';
import { testAuthFramework } from './auth.test';
import { testSyncEngine } from './sync.test';
import { testPlatformConnectors } from './connectors.test';
import { testAchievementEngine } from './achievements.test';
import { testLeaderboardEngine } from './leaderboards.test';
import { testNotificationFramework } from './notifications.test';
import { testAnalyticsEngine } from './analytics.test';
import { testBackupSystem } from './backup.test';
import { testRealtimeSystem } from './realtime.test';
import { runMasterProductionSuite } from './master.test';

import { testProgressActivityTelemetry } from './progress-activity.test';
import { testAnalyticsRealIntegration } from './analytics-real-integration.test';
import { testDashboardRealIntegration } from './dashboard-real-integration.test';
import { testOracleMentorRealIntegration } from './oracle-mentor-real-integration.test';
import { testCampaignRealIntegration } from './campaign-real-integration.test';
import { testInterviewRealIntegration } from './interview-real-integration.test';
import { testCareerRealIntegration } from './career-real-integration.test';
import { testInterviewSimulatorRealIntegration } from './interview-simulator-real-integration.test';
import { testInterviewPrepRealIntegration } from './interview-prep-real-integration.test';
import { testFullSystemIntelligence } from './full-system-intelligence.test';
import { testFinalProductionReadiness } from './final-production-readiness.test';
import { testCanonicalActivityRealIntegration } from './canonical-activity-real-integration.test';
import { testProductionPersistenceRealIntegration } from './production-persistence-real-integration.test';
import { testPlatformIntelligenceRealIntegration } from './platform-intelligence-real-integration.test';

export async function runAllIntelligenceTests(): Promise<void> {
  console.log('==================================================');
  console.log('STARTING MASTER INTELLIGENCE LAYER TEST SUITE');
  console.log('==================================================\n');

  try {
    console.log('=== PHASE 1.0: USER PROFILE & PROGRESS ENGINE ===');
    testProfileService();

    console.log('\n=== PHASE 1.1: CANONICAL TELEMETRY & ACTIVITY LOG ===');
    testProgressActivityTelemetry();

    console.log('\n=== PHASE 1.2: DOMAIN RULES & HEURISTICS ===');
    testDomainRules();

    console.log('\n=== PHASE 1.3: PERFORMANCE & WEAKNESS ANALYZERS ===');
    testAnalyzers();

    console.log('\n=== PHASE 1.4: RECOMMENDATION ENGINE ===');
    testRecommendations();

    console.log('\n=== PHASE 2.0: ADAPTIVE PRACTICE ENGINE ===');
    testAdaptiveEngine();
    testAdaptiveRealIntegration();

    console.log('\n=== PHASE 2.1: SESSION ENGINE & STATE MANAGEMENT ===');
    testSessionEngine();

    console.log('\n=== PHASE 2.2: PRACTICE SCHEDULER & DAILY PLANNER ===');
    testPracticeScheduler();

    console.log('\n=== PHASE 3.0: CONTEST & TOURNAMENT ENGINE ===');
    testContestEngine();

    console.log('\n=== PHASE 3.1: RATING & LEADERBOARD SYSTEM ===');
    testRatingEngine();

    console.log('\n=== PHASE 3.2: SPACED REPETITION & MEMORY ENGINE ===');
    testMemoryEngine();
    testForgettingEngine();

    console.log('\n=== PHASE 3.3: REVISION SCHEDULER ===');
    testReviewScheduler();

    console.log('\n=== PHASE 3.4: REAL-TIME EVENT INTEGRATION ===');
    testMemoryEventIntegration();

    console.log('\n=== PHASE 3.5: ORACLE AI MENTOR ENGINE ===');
    testOracleEngine();
    testRankingEngine();
    testSimulationEngine();

    console.log('\n=== PHASE 3.6: ORACLE PLANNERS & DASHBOARD SNAPSHOT ===');
    testOraclePlanners();
    testDashboardSnapshot();

    console.log('\n=== PHASE 3.7: PRODUCTION UI INTEGRATION ===');
    testProductionIntegration();

    console.log('\n=== PHASE 5.0: DASHBOARD COMMAND CENTER INTEGRATION ===');
    await testDashboardRealIntegration();

    console.log('\n=== PHASE 6.0 & 6.5: ORACLE AI MENTOR & REVISION INTEGRATION ===');
    await testOracleMentorRealIntegration();

    console.log('\n=== PHASE 7.0: CANONICAL RPG LEARNING CAMPAIGN INTEGRATION ===');
    await testCampaignRealIntegration();

    console.log('\n=== PHASE 8.0: AI MOCK INTERVIEW SIMULATOR INTEGRATION ===');
    await testInterviewRealIntegration();

    console.log('\n=== PHASE 8.0: CAREER TARGET READINESS INTEGRATION ===');
    await testCareerRealIntegration();

    console.log('\n=== PHASE 9.0: REAL ADAPTIVE INTERVIEW SIMULATOR ===');
    await testInterviewSimulatorRealIntegration();

    console.log('\n=== PHASE 9.0: INTERVIEW PREPARATION INTEGRATION ===');
    await testInterviewPrepRealIntegration();

    console.log('\n=== PHASE 10.0: FULL SYSTEM INTELLIGENCE & PERSONALIZATION ===');
    await testFullSystemIntelligence();
    await testFinalProductionReadiness();

    console.log('\n=== PHASE 4.0: PRODUCTION HARDENING & INFRASTRUCTURE ===');
    testContainer();
    await testPluginArchitecture();
    await testMigrations();
    testEventBus();
    testQueryCache();
    await testOfflineQueue();
    testPerformanceBenchmarks();
    testLargeDatasetStress();

    console.log('\n=== PHASE 5.1: AUTHENTICATION FRAMEWORK ===');
    await testAuthFramework();

    console.log('\n=== PHASE 5.2: OFFLINE-FIRST CLOUD SYNC ENGINE ===');
    await testSyncEngine();

    console.log('\n=== PHASE 5.3: OFFICIAL PLATFORM CONNECTORS & GATEWAY ===');
    await testPlatformConnectors();

    console.log('\n=== PHASE 5.4: EVENT-DRIVEN ACHIEVEMENT ENGINE ===');
    await testAchievementEngine();

    console.log('\n=== PHASE 5.5: SCALABLE LEADERBOARDS & PUBLIC USER PROFILES ===');
    await testLeaderboardEngine();

    console.log('\n=== PHASE 5.6: UNIFIED NOTIFICATIONS & REMINDER FRAMEWORK ===');
    await testNotificationFramework();

    console.log('\n=== PHASE 5.7: ANONYMOUS PRODUCT ANALYTICS ENGINE ===');
    await testAnalyticsEngine();
    await testAnalyticsRealIntegration();

    console.log('\n=== PHASE 5.8: VERSIONED BACKUP, RESTORE & DATA INTEGRITY ===');
    await testBackupSystem();

    console.log('\n=== PHASE 5.9: REAL-TIME UPDATE LAYER & REACTIVE EVENT STREAMING ===');
    await testRealtimeSystem();

    console.log('\n=== PHASE 11.0: CANONICAL ACTIVITY, ANALYTICS & TELEMETRY ===');
    await testCanonicalActivityRealIntegration();

    console.log('\n=== PHASE 12.0: PRODUCTION PERSISTENCE, REAL PLATFORM SYNC & RELIABILITY ===');
    await testProductionPersistenceRealIntegration();
    await testPlatformIntelligenceRealIntegration();

    await runMasterProductionSuite();

    console.log('\n==================================================');
    console.log('[OK] ALL MASTER SYSTEM & PHASE 10.0 SUITE TESTS PASSED');
    console.log('==================================================');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('\n==================================================');
    console.error(`[FAIL] TEST SUITE FAILED: ${msg}`);
    console.error('==================================================');
    process.exit(1);
  }
}

runAllIntelligenceTests();
