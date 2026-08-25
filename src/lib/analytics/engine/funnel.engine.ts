/**
 * Learning Funnel Aggregator Engine
 */

import { AnalyticsEvent } from '../models/analytics-event.models';
import { LearningFunnelReport, FunnelStageMetric, FunnelStage } from '../models/funnel.models';

export class FunnelEngine {
  public static calculateFunnel(events: ReadonlyArray<AnalyticsEvent>): LearningFunnelReport {
    const stageCounts: Record<FunnelStage, number> = {
      'Problem Viewed': 0,
      'Problem Started': 0,
      'Hint Used': 0,
      'Solution Viewed': 0,
      Solved: 0,
      Revised: 0,
      Mastered: 0,
    };

    events.forEach((e) => {
      if (e.type === 'problem_viewed') stageCounts['Problem Viewed']++;
      if (e.type === 'problem_started') stageCounts['Problem Started']++;
      if (e.type === 'hint_used') stageCounts['Hint Used']++;
      if (e.type === 'solution_viewed') stageCounts['Solution Viewed']++;
      if (e.type === 'problem_solved') stageCounts['Solved']++;
      if (e.type === 'concept_revised') stageCounts['Revised']++;
      if (e.type === 'concept_mastered') stageCounts['Mastered']++;
    });

    const viewed = Math.max(1, stageCounts['Problem Viewed']);
    const stages: FunnelStageMetric[] = (Object.keys(stageCounts) as FunnelStage[]).map((stage) => ({
      stage,
      count: stageCounts[stage],
      conversionRatePercent: Math.round((stageCounts[stage] / viewed) * 100),
    }));

    const solved = stageCounts['Solved'];
    const overallConversionPercent = Math.round((solved / viewed) * 100);

    return {
      stages: Object.freeze(stages),
      overallConversionPercent,
    };
  }
}
