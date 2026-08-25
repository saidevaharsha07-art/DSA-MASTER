/**
 * Achievement State & Inventory Storage
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';

export interface AchievementStoreData {
  items: AchievementItem[];
  claimedRewardIds: string[];
  badges: Badge[];
  titles: UserTitle[];
}

export class AchievementStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async loadData(): Promise<AchievementStoreData> {
    const data = await this.storage.get<AchievementStoreData>('achievement_engine_data');
    return (
      data || {
        items: [],
        claimedRewardIds: [],
        badges: [],
        titles: [],
      }
    );
  }

  public async saveData(data: AchievementStoreData): Promise<void> {
    await this.storage.set('achievement_engine_data', data);
  }
}
