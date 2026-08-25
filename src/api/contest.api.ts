/**
 * API Layer — Contest API
 */

import { Container } from '@/src/core/container/container';
import { ContestEngine } from '@/src/intelligence/contests/contest.engine';
import { ContestAnalysis } from '@/src/intelligence/contests/contest.models';

export class ContestApi {
  private static get engine(): ContestEngine {
    if (!Container.has('ContestEngine')) {
      Container.registerSingleton('ContestEngine', new ContestEngine());
    }
    return Container.resolve<ContestEngine>('ContestEngine');
  }

  public static async analyzeContests(userId: string): Promise<ContestAnalysis> {
    return this.engine.analyzeContests(userId);
  }
}
