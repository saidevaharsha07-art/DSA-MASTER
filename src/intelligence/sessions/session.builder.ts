/**
 * Session Management — Session Builder
 * Assembles complete structured practice sessions with structured SessionGoal.
 */

import { AdaptiveSession, SessionGoal } from '../adaptive/adaptive.session';
import { PlatformProblem, PlatformId } from '@/src/platforms/types';

export class SessionBuilder {
  private id: string = `session-${Date.now()}`;
  private userId: string = 'anonymous';
  private title: string = 'Custom Practice Session';
  private strategyName: string = 'Custom';
  private targetPlatform: PlatformId = 'codechef';
  private problems: PlatformProblem[] = [];
  private goalObjective: string = 'Complete targeted practice session.';
  private targetTopics: string[] = [];
  private targetPatterns: string[] = [];
  private targetDifficulty: string = 'Easy';
  private expectedAccuracy: number = 0.75;
  private successCriteria: string = 'Complete all session problems.';

  public setUserId(userId: string): this {
    this.userId = userId;
    return this;
  }

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public setStrategyName(name: string): this {
    this.strategyName = name;
    return this;
  }

  public setTargetPlatform(platform: PlatformId): this {
    this.targetPlatform = platform;
    return this;
  }

  public setProblems(problems: ReadonlyArray<PlatformProblem>): this {
    this.problems = [...problems];
    return this;
  }

  public setGoal(goal: Partial<SessionGoal>): this {
    if (goal.objective) this.goalObjective = goal.objective;
    if (goal.targetTopics) this.targetTopics = [...goal.targetTopics];
    if (goal.targetPatterns) this.targetPatterns = [...goal.targetPatterns];
    if (goal.targetDifficulty) this.targetDifficulty = goal.targetDifficulty;
    if (typeof goal.expectedAccuracy === 'number') this.expectedAccuracy = goal.expectedAccuracy;
    if (goal.successCriteria) this.successCriteria = goal.successCriteria;
    return this;
  }

  public build(): AdaptiveSession {
    const estTime = this.problems.reduce((sum, p) => sum + (p.estimatedTime || 30), 0);
    const xp = this.problems.reduce((sum, p) => sum + (p.xp || 20), 0);

    const goal: SessionGoal = {
      objective: this.goalObjective,
      targetTopics: Object.freeze(this.targetTopics.length > 0 ? this.targetTopics : ['General']),
      targetPatterns: Object.freeze(this.targetPatterns),
      targetDifficulty: this.targetDifficulty,
      expectedAccuracy: this.expectedAccuracy,
      estimatedDurationMinutes: estTime,
      successCriteria: this.successCriteria,
    };

    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      strategyName: this.strategyName,
      goal,
      selectedProblems: Object.freeze(this.problems),
      targetPlatform: this.targetPlatform,
      totalXpAvailable: xp,
      createdAt: new Date().toISOString(),
    };
  }
}
