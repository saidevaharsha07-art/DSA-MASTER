/**
 * Adaptive Engine — Progression Rules & Engine
 * Returns structured progression decisions evaluating whether to increase/decrease difficulty or switch topics.
 */

import { LearningProfile } from '../models/learning-profile';
import { WeaknessAnalysis } from '../models/weakness';

export type ProgressionAction =
  | 'IncreaseDifficulty'
  | 'MaintainDifficulty'
  | 'DecreaseDifficulty'
  | 'ReviewTopic'
  | 'SwitchTopic'
  | 'AttemptContest'
  | 'BeginRevisionCycle';

export interface ProgressionDecision {
  readonly action: ProgressionAction;
  readonly reasoning: string;
  readonly targetTopic: string;
  readonly targetDifficulty: string;
  readonly confidenceScore: number; // 0 to 100
  readonly contributingFactors: ReadonlyArray<string>;
}

export class ProgressionEngine {
  /**
   * Pure function: calculates a structured ProgressionDecision for a topic/difficulty level.
   */
  public evaluateProgression(
    profile: LearningProfile,
    weakness: WeaknessAnalysis,
    currentTopic: string = 'Arrays',
    currentDifficulty: string = 'Easy'
  ): ProgressionDecision {
    const topicState = profile.topicMastery.get(currentTopic);
    const accuracy = topicState?.accuracy || 0;
    const solvedCount = topicState?.solvedCount || 0;

    const factors: string[] = [];
    factors.push(`Topic '${currentTopic}' accuracy: ${(accuracy * 100).toFixed(0)}%`);
    factors.push(`Total solved in '${currentTopic}': ${solvedCount}`);

    // 1. High accuracy & high solve count -> Increase difficulty
    if (solvedCount >= 5 && accuracy >= 0.80) {
      factors.push('Mastery threshold met for current difficulty tier.');
      return {
        action: 'IncreaseDifficulty',
        reasoning: `Strong performance in '${currentTopic}' (${(accuracy * 100).toFixed(0)}% accuracy across ${solvedCount} problems). Ready for next difficulty tier.`,
        targetTopic: currentTopic,
        targetDifficulty: this.getNextDifficulty(currentDifficulty),
        confidenceScore: 90,
        contributingFactors: Object.freeze(factors),
      };
    }

    // 2. High weakness score -> Decrease difficulty / Review
    if (accuracy < 0.40 && topicState && topicState.totalAttempts >= 3) {
      factors.push('Accuracy fell below 40% threshold with >= 3 attempts.');
      return {
        action: 'DecreaseDifficulty',
        reasoning: `Struggling in '${currentTopic}' (Accuracy: ${(accuracy * 100).toFixed(0)}%). Lowering difficulty tier for concept reinforcement.`,
        targetTopic: currentTopic,
        targetDifficulty: this.getPreviousDifficulty(currentDifficulty),
        confidenceScore: 85,
        contributingFactors: Object.freeze(factors),
      };
    }

    // 3. Topic switch if topic is mastered (>80 mastery score)
    if (topicState && topicState.masteryScore >= 80) {
      factors.push(`Topic '${currentTopic}' mastery score reached ${topicState.masteryScore}/100.`);
      return {
        action: 'SwitchTopic',
        reasoning: `Mastery achieved in '${currentTopic}'. Switching focus to next unmastered core domain.`,
        targetTopic: weakness.weakTopics[0]?.topic || 'Dynamic Programming',
        targetDifficulty: currentDifficulty,
        confidenceScore: 88,
        contributingFactors: Object.freeze(factors),
      };
    }

    // Default: Maintain current difficulty
    factors.push('Performance within expected learning boundary.');
    return {
      action: 'MaintainDifficulty',
      reasoning: `Maintaining ${currentDifficulty} tier in '${currentTopic}' to build solve volume.`,
      targetTopic: currentTopic,
      targetDifficulty: currentDifficulty,
      confidenceScore: 80,
      contributingFactors: Object.freeze(factors),
    };
  }

  private getNextDifficulty(current: string): string {
    const tiers = ['Beginner', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard', 'Expert'];
    const idx = tiers.indexOf(current);
    if (idx >= 0 && idx < tiers.length - 1) return tiers[idx + 1];
    return current;
  }

  private getPreviousDifficulty(current: string): string {
    const tiers = ['Beginner', 'Easy', 'Easy-Medium', 'Medium', 'Medium-Hard', 'Hard', 'Expert'];
    const idx = tiers.indexOf(current);
    if (idx > 0) return tiers[idx - 1];
    return current;
  }
}
