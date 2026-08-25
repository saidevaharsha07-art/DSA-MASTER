/**
 * Unit Test: What-If Simulation Engine
 */

import { SimulationEngine } from '../engine/simulation.engine';
import { OracleDashboardSnapshot } from '../models/dashboard.models';

export function testSimulationEngine(): void {
  console.log('--- Testing What-If Simulation Engine ---');

  const mockSnapshot: OracleDashboardSnapshot = {
    userId: 'u-sim',
    overallLearningScore: {
      overallScore: 65,
      memoryContribution: 18,
      masteryContribution: 18,
      contestContribution: 10,
      ratingContribution: 10,
      consistencyContribution: 5,
      adaptiveContribution: 4,
    },
    xp: 200,
    streak: 4,
    dailyGoal: 'Goal',
    weeklyGoal: 'Goal',
    memoryHealth: 70,
    contestReadiness: 'Intermediate',
    ratingProjection: 1500,
    revisionQueue: Object.freeze([]),
    todayPractice: { morning: { title: 'M', durationMinutes: 20, problems: [], revision: [], goals: [], reason: '' }, afternoon: { title: 'A', durationMinutes: 45, problems: [], revision: [], goals: [], reason: '' }, evening: { title: 'E', durationMinutes: 30, problems: [], revision: [], goals: [], reason: '' }, totalMinutes: 95, generatedAt: '' },
    weeklyPractice: { weeklyFocus: 'F', targetRating: 1500, plannedContestsCount: 1, targetMasteryTopics: [], dailySchedules: [], totalMinutes: 450, generatedAt: '' },
    recommendations: Object.freeze([]),
    alerts: Object.freeze([]),
    insights: {
      biggestStrength: { title: 'S', metricName: 'M', value: 'V', trend: 'improving', explanation: 'E' },
      biggestWeakness: { title: 'W', metricName: 'M', value: 'V', trend: 'declining', explanation: 'E' },
      fastestImprovingTopic: { title: 'V', metricName: 'M', value: 'V', trend: 'improving', explanation: 'E' },
      highestForgettingRisk: { title: 'R', metricName: 'M', value: 'V', trend: 'stable', explanation: 'E' },
      contestReadinessInsight: { title: 'C', metricName: 'M', value: 'V', trend: 'improving', explanation: 'E' },
      ratingTrendInsight: { title: 'R', metricName: 'M', value: 1500, trend: 'improving', explanation: 'E' },
      learningConsistencyInsight: { title: 'L', metricName: 'M', value: 5, trend: 'stable', explanation: 'E' },
      reviewEfficiencyInsight: { title: 'E', metricName: 'M', value: '80%', trend: 'improving', explanation: 'E' },
      generatedAt: new Date().toISOString(),
    },
    activeStrategy: 'Balanced',
    lastUpdated: new Date().toISOString(),
    engineVersions: Object.freeze({}),
  };

  const simResult = SimulationEngine.simulate(mockSnapshot, 'solve_10_arrays');
  if (simResult.projectedScoreDelta <= 0 || simResult.projectedDashboard.overallLearningScore.overallScore <= mockSnapshot.overallLearningScore.overallScore) {
    throw new Error('SimulationEngine failed to calculate positive projected score delta!');
  }
  console.log(`[PASS] What-If Simulation scenario verified (Delta: +${simResult.projectedScoreDelta} pts).`);
}
