/**
 * Key Performance Indicators (KPI) & Time-Series Models
 */

export interface TimeSeriesPoint {
  readonly timestamp: string;
  readonly value: number;
}

export interface KPIReport {
  readonly avgStudyDurationMins: number;
  readonly longestStreakDays: number;
  readonly weeklyRetentionPercent: number;
  readonly knowledgeGrowthRatePercent: number;
  readonly avgSolveTimeSec: number;
  readonly hardProblemAccuracyPercent: number;
  readonly revisionEfficiencyPercent: number;
  readonly oracleAccuracyPercent: number;
}
