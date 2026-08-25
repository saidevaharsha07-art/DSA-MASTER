/**
 * Memory Engine — Facade & Orchestration Layer
 * Orchestrates Concept Memory CRUD, Spaced Repetition (SRS) state machine transitions, decay calculation, and review scheduling.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewOutcome, RevisionQueueItem, ReviewSessionPlan, ReviewEvent } from '../models/review.models';
import { MemoryHealthReport } from '../models/retention.models';
import { MemoryStorage } from '../storage/memory.storage';
import { ReviewEngine } from './review.engine';
import { ForgettingEngine } from './forgetting.engine';
import { RetentionEngine } from './retention.engine';
import { RevisionQueueBuilder } from '../scheduler/revision.queue';
import { DailyReviewBuilder } from '../scheduler/daily.review';

export class MemoryEngine {
  private storage: MemoryStorage;

  constructor(storage?: MemoryStorage) {
    this.storage = storage || new MemoryStorage();
  }

  public getConcept(userId: string, conceptId: string): ConceptMemory | null {
    return this.storage.getConcept(userId, conceptId) || null;
  }

  public saveConcept(userId: string, concept: ConceptMemory): void {
    this.storage.saveConcept(userId, concept);
  }

  public getAllConcepts(userId: string): ConceptMemory[] {
    const concepts = this.storage.getAllConcepts(userId);
    return concepts.map((concept) => {
      const recallProb = ForgettingEngine.getLiveRecallProbability(concept);
      const forgettingRisk = ForgettingEngine.calculateForgettingRisk(recallProb);
      return {
        ...concept,
        estimatedRecallProbability: recallProb,
        forgettingRisk,
      };
    });
  }

  public processReview(userId: string, conceptId: string, outcome: ReviewOutcome, reviewDate?: Date): ConceptMemory {
    let concept = this.getConcept(userId, conceptId);
    if (!concept) {
      concept = {
        conceptId,
        userId,
        topic: 'General',
        pattern: 'Basic',
        state: 'New',
        masteryScore: 50,
        memoryStrength: 50,
        stabilityScore: 1.0,
        retentionRate: 80,
        forgettingRisk: 20,
        reviewCount: 0,
        successfulReviews: 0,
        failedReviews: 0,
        firstLearned: new Date().toISOString(),
        lastReviewed: new Date().toISOString(),
        nextReview: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        estimatedRecallProbability: 1.0,
      };
    }

    const { updatedConcept, reviewEvent } = ReviewEngine.processReview(concept, outcome, reviewDate);
    this.storage.saveConcept(userId, updatedConcept);
    this.storage.recordReviewEvent(userId, reviewEvent);
    return updatedConcept;
  }

  public getRevisionQueue(userId: string): RevisionQueueItem[] {
    const concepts = this.getAllConcepts(userId);
    return [...RevisionQueueBuilder.buildQueue(concepts)];
  }

  public generateReviewPlan(userId: string, targetMinutes: number = 30): ReviewSessionPlan {
    const concepts = this.getAllConcepts(userId);
    return DailyReviewBuilder.buildDailyPlan(concepts, new Date(), targetMinutes);
  }

  public getMemoryHealth(userId: string): MemoryHealthReport {
    const concepts = this.getAllConcepts(userId);
    return RetentionEngine.generateHealthReport(concepts);
  }

  public getMemoryHealthReport(userId: string): MemoryHealthReport {
    return this.getMemoryHealth(userId);
  }

  public getReviewHistory(userId: string): ReviewEvent[] {
    return [...this.storage.getReviewHistory(userId)];
  }

  public explainReview(item: RevisionQueueItem): any {
    return {
      conceptId: item.conceptId,
      reason: item.reason,
      urgency: item.priority,
      suggestedDuration: item.suggestedPracticeDurationMinutes,
    };
  }
}
