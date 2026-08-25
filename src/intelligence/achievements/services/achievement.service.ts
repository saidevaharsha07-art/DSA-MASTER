/**
 * Achievement Engine — High-Level Application Service Facade
 * Provides unified entry points for unlocking badges, evaluating achievements,
 * and retrieving user progression awards.
 */

import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { AchievementEngine } from '../engine/achievement.engine';
import { AchievementStateService } from './achievement-state.service';
import { AchievementStorage } from '../storage/achievement.storage';
import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';

export class AchievementService {
  public readonly engine: AchievementEngine;
  public readonly stateService: AchievementStateService;
  private storage: AchievementStorage;

  constructor(engine?: AchievementEngine, stateService?: AchievementStateService, storage?: AchievementStorage) {
    this.engine = engine || new AchievementEngine();
    this.stateService = stateService || new AchievementStateService();
    this.storage = storage || new AchievementStorage();

    // Populate initial state with default items synchronously so listeners process events immediately
    const res = this.engine.processEvent({ id: 'init-evt', type: 'ProfileUpdated', payload: {}, timestamp: new Date().toISOString() }, []);
    this.stateService.setState({ items: res.updatedItems, badges: res.newBadges, titles: res.newTitles });

    // Synchronous EventBus listener
    EventBus.subscribeAll((event: AppEvent) => {
      this.handleEvent(event);
    });

    this.init();
  }

  private async init(): Promise<void> {
    // Optional async storage load if needed
  }

  public handleEvent(event: AppEvent): void {
    const currentState = this.stateService.getState();
    const result = this.engine.processEvent(event, currentState.items);

    if (result.unlockedAchievements.length > 0) {
      const updatedBadges = [...currentState.badges, ...result.newBadges];
      const updatedTitles = [...currentState.titles, ...result.newTitles];

      result.unlockedAchievements.forEach((item) => {
        EventBus.publish('AchievementUnlocked', { achievementId: item.id, name: item.name });
      });

      const newState = {
        items: result.updatedItems,
        badges: updatedBadges,
        titles: updatedTitles,
      };

      this.stateService.setState(newState);
    }
  }

  public getAll(): ReadonlyArray<AchievementItem> {
    return this.stateService.getState().items;
  }

  public getUnlocked(): ReadonlyArray<AchievementItem> {
    return this.stateService.getState().items.filter((i) => i.completed);
  }

  public getLocked(): ReadonlyArray<AchievementItem> {
    return this.stateService.getState().items.filter((i) => !i.completed);
  }

  public getBadges(): ReadonlyArray<Badge> {
    return this.stateService.getState().badges;
  }

  public getTitles(): ReadonlyArray<UserTitle> {
    return this.stateService.getState().titles;
  }
}
