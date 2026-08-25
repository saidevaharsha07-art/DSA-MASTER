/**
 * API Layer — Memory API
 */

import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { MemoryHealthReport } from '@/src/intelligence/memory/models/retention.models';

export class MemoryApi {
  private static get engine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  public static async getMemoryHealth(userId: string): Promise<MemoryHealthReport> {
    return this.engine.getMemoryHealth(userId);
  }
}
