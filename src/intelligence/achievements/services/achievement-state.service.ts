/**
 * Immutable Achievement State Store & Subscriber
 */

import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';

export interface AchievementStateSnapshot {
  readonly items: ReadonlyArray<AchievementItem>;
  readonly badges: ReadonlyArray<Badge>;
  readonly titles: ReadonlyArray<UserTitle>;
  readonly unlockedCount: number;
  readonly totalPoints: number;
}

export class AchievementStateService {
  private state: AchievementStateSnapshot = {
    items: [],
    badges: [],
    titles: [],
    unlockedCount: 0,
    totalPoints: 0,
  };

  private listeners: Set<(state: AchievementStateSnapshot) => void> = new Set();

  public getState(): AchievementStateSnapshot {
    return this.state;
  }

  public setState(next: Partial<AchievementStateSnapshot>): void {
    const items = next.items !== undefined ? next.items : this.state.items;
    const badges = next.badges !== undefined ? next.badges : this.state.badges;
    const titles = next.titles !== undefined ? next.titles : this.state.titles;

    const unlockedCount = items.filter((i) => i.completed).length;
    const totalPoints = items.filter((i) => i.completed).reduce((sum, i) => sum + i.points, 0);

    this.state = Object.freeze({
      items,
      badges,
      titles,
      unlockedCount,
      totalPoints,
    });

    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: AchievementStateSnapshot) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
