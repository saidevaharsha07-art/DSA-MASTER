/**
 * Memory Repository
 */

import { ConceptMemory } from '@/src/intelligence/memory/models/memory.models';
import { IStorageProvider } from '../storage/storage-provider.interface';
import { MemoryStorageProvider } from '../storage/memory.storage';

export class MemoryRepository {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async getConcepts(userId: string): Promise<ReadonlyArray<ConceptMemory>> {
    const concepts = await this.storage.get<ConceptMemory[]>(`memory-${userId}`);
    return concepts ? Object.freeze(concepts) : Object.freeze([]);
  }

  public async saveConcepts(userId: string, concepts: ReadonlyArray<ConceptMemory>): Promise<void> {
    await this.storage.set(`memory-${userId}`, Array.from(concepts));
  }
}
