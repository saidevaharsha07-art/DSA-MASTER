/**
 * Public Achievement API Facade
 */

import { Container } from '@/src/core/container/container';
import { AchievementService } from '../services/achievement.service';
import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';

export class AchievementApi {
  private static get service(): AchievementService {
    if (!Container.has('AchievementService')) {
      Container.registerSingleton('AchievementService', new AchievementService());
    }
    return Container.resolve<AchievementService>('AchievementService');
  }

  public static getAll(): ReadonlyArray<AchievementItem> {
    return this.service.getAll();
  }

  public static getUnlocked(): ReadonlyArray<AchievementItem> {
    return this.service.getUnlocked();
  }

  public static getLocked(): ReadonlyArray<AchievementItem> {
    return this.service.getLocked();
  }

  public static getBadges(): ReadonlyArray<Badge> {
    return this.service.getBadges();
  }

  public static getTitles(): ReadonlyArray<UserTitle> {
    return this.service.getTitles();
  }
}
