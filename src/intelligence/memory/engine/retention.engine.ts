/**
 * Memory Engine — Retention & Memory Health Calculator
 * Computes structured MemoryHealthReport and RetentionReport.
 */

import { ConceptMemory } from '../models/memory.models';
import { MemoryHealthReport, RetentionReport } from '../models/retention.models';
import { ForgettingEngine } from './forgetting.engine';

export class RetentionEngine {
  /**
   * Generates a comprehensive MemoryHealthReport for a user's collection of ConceptMemory objects.
   */
  public static generateHealthReport(concepts: ReadonlyArray<ConceptMemory>, now: Date = new Date()): MemoryHealthReport {
    if (concepts.length === 0) {
      return {
        overallMemoryScore: 0,
        averageRetention: 0,
        totalConceptsTracked: 0,
        conceptsAtRiskCount: 0,
        overdueReviewsCount: 0,
        stableConceptsCount: 0,
        forgottenConceptsCount: 0,
        reviewCoveragePercentage: 100,
        estimatedWeeklyWorkloadMinutes: 0,
        generatedAt: now.toISOString(),
      };
    }

    let totalRetention = 0;
    let totalMastery = 0;
    let atRisk = 0;
    let overdue = 0;
    let stable = 0;
    let forgotten = 0;

    for (const c of concepts) {
      const evalRisk = ForgettingEngine.evaluateRisk(c, now);
      totalRetention += c.retentionRate;
      totalMastery += c.masteryScore;

      if (evalRisk.urgency === 'Critical' || evalRisk.urgency === 'High') atRisk++;
      if (evalRisk.daysOverdue > 0) overdue++;
      if (c.state === 'Stable' || c.state === 'Mastered') stable++;
      if (c.state === 'Forgotten') forgotten++;
    }

    const avgRetention = Math.round(totalRetention / concepts.length);
    const avgMastery = Math.round(totalMastery / concepts.length);
    const overallMemoryScore = Math.round(avgRetention * 0.6 + avgMastery * 0.4);
    const reviewCoverage = Math.round(((concepts.length - overdue) / concepts.length) * 100);
    const estimatedWeeklyWorkload = Math.max(15, (overdue + atRisk) * 15);

    return {
      overallMemoryScore,
      averageRetention: avgRetention,
      totalConceptsTracked: concepts.length,
      conceptsAtRiskCount: atRisk,
      overdueReviewsCount: overdue,
      stableConceptsCount: stable,
      forgottenConceptsCount: forgotten,
      reviewCoveragePercentage: reviewCoverage,
      estimatedWeeklyWorkloadMinutes: estimatedWeeklyWorkload,
      generatedAt: now.toISOString(),
    };
  }
}
