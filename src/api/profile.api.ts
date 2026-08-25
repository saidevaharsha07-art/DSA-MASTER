/**
 * API Layer — Profile Service API
 */

import { Container } from '@/src/core/container/container';
import { ProfileRepository } from '@/src/core/repositories/profile.repository';
import { LearningProfile } from '@/src/intelligence/models/learning-profile';

export class ProfileApi {
  private static get repo(): ProfileRepository {
    if (!Container.has('ProfileRepository')) {
      Container.registerSingleton('ProfileRepository', new ProfileRepository());
    }
    return Container.resolve<ProfileRepository>('ProfileRepository');
  }

  public static async getProfile(userId: string): Promise<LearningProfile> {
    return this.repo.findByUserId(userId);
  }

  public static async updateProfile(profile: LearningProfile): Promise<void> {
    await this.repo.save(profile);
  }
}
