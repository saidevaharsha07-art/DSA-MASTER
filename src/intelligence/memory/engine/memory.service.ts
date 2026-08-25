/**
 * Memory Engine — High-Level Memory Service
 * Wraps MemoryEngine and provides convenient high-level management methods for the Intelligence Layer and Oracle AI.
 */

import { MemoryEngine } from './memory.engine';
import { ConceptMemory } from '../models/memory.models';
import { MemoryHealthReport } from '../models/retention.models';
import { RevisionQueueItem, ReviewEvent } from '../models/review.models';
import { ReviewExplanation } from '../models/explanation.models';

export class MemoryService {
  private engine: MemoryEngine;

  constructor() {
    this.engine = new MemoryEngine();
  }

  public getConcept(userId: string, conceptId: string): ConceptMemory | null {
    return this.engine.getConcept(userId, conceptId);
  }

  public getAllConcepts(userId: string): ReadonlyArray<ConceptMemory> {
    return this.engine.getAllConcepts(userId);
  }

  public recordReviewOutcome(userId: string, conceptId: string, outcome: 'success' | 'failure' | 'partial'): ConceptMemory {
    return this.engine.processReview(userId, conceptId, outcome);
  }

  public getMemoryHealth(userId: string): MemoryHealthReport {
    return this.engine.getMemoryHealth(userId);
  }

  public getReviewQueue(userId: string): ReadonlyArray<RevisionQueueItem> {
    return this.engine.getRevisionQueue(userId);
  }

  public getReviewHistory(userId: string): ReadonlyArray<ReviewEvent> {
    return this.engine.getReviewHistory(userId);
  }

  public getRevisionRecommendations(userId: string): ReadonlyArray<ReviewExplanation> {
    const queue = this.getReviewQueue(userId);
    return Object.freeze(queue.map((item) => this.engine.explainReview(item)));
  }
}
