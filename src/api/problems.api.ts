/**
 * API Layer — Problems API
 */

import { Container } from '@/src/core/container/container';
import { ProblemRepository } from '@/src/core/repositories/problem.repository';
import { PracticeAttempt } from '@/src/intelligence/models/practice-history';

export class ProblemsApi {
  private static get repo(): ProblemRepository {
    if (!Container.has('ProblemRepository')) {
      Container.registerSingleton('ProblemRepository', new ProblemRepository());
    }
    return Container.resolve<ProblemRepository>('ProblemRepository');
  }

  public static async getAttempts(userId: string): Promise<ReadonlyArray<PracticeAttempt>> {
    return this.repo.getAttempts(userId);
  }

  public static async recordAttempt(attempt: PracticeAttempt): Promise<void> {
    await this.repo.saveAttempt(attempt);
  }
}
