/**
 * Learning Funnel Models
 */

export type FunnelStage =
  | 'Problem Viewed'
  | 'Problem Started'
  | 'Hint Used'
  | 'Solution Viewed'
  | 'Solved'
  | 'Revised'
  | 'Mastered';

export interface FunnelStageMetric {
  readonly stage: FunnelStage;
  readonly count: number;
  readonly conversionRatePercent: number;
}

export interface LearningFunnelReport {
  readonly stages: ReadonlyArray<FunnelStageMetric>;
  readonly overallConversionPercent: number;
}
