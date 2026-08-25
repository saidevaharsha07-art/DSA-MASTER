/**
 * Profile Repository
 * Separates profile persistence from engine logic.
 */

import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { IStorageProvider } from '../storage/storage-provider.interface';
import { MemoryStorageProvider } from '../storage/memory.storage';
import { ProfileService } from '@/src/intelligence/services/profile.service';

export class ProfileRepository {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async findByUserId(userId: string): Promise<LearningProfile> {
    const profile = await this.storage.get<LearningProfile>(`profile-${userId}`);
    if (profile) return profile;
    const clean = ProfileService.createEmptyProfile(userId);
    await this.save(clean);
    return clean;
  }

  public async save(profile: LearningProfile): Promise<void> {
    await this.storage.set(`profile-${profile.userId}`, profile);
  }
}
