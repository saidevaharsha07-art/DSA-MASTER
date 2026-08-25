/**
 * Oracle AI Engine — Insight Models
 * Defines OracleInsightReport and MetricInsight.
 */

export interface MetricInsight {
  readonly title: string;
  readonly metricName: string;
  readonly value: string | number;
  readonly trend: 'improving' | 'declining' | 'stable';
  readonly explanation: string;
}

export interface OracleInsightReport {
  readonly biggestStrength: MetricInsight;
  readonly biggestWeakness: MetricInsight;
  readonly fastestImprovingTopic: MetricInsight;
  readonly highestForgettingRisk: MetricInsight;
  readonly contestReadinessInsight: MetricInsight;
  readonly ratingTrendInsight: MetricInsight;
  readonly learningConsistencyInsight: MetricInsight;
  readonly reviewEfficiencyInsight: MetricInsight;
  readonly generatedAt: string;
}
