/**
 * Memory Engine — In-Memory Storage Abstraction
 * Persists ConceptMemory models, immutable ReviewEvent logs, and MemoryTimelinePoint snapshots.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewEvent } from '../models/review.models';
import { MemoryTimelinePoint } from '../models/forgetting.models';

export class MemoryStorage {
  private concepts: Map<string, Map<string, ConceptMemory>> = new Map(); // userId -> (conceptId -> ConceptMemory)
  private reviewHistory: Map<string, ReviewEvent[]> = new Map(); // userId -> ReviewEvent[]
  private timelines: Map<string, Map<string, MemoryTimelinePoint[]>> = new Map(); // userId -> (conceptId -> timeline)

  public getConcept(userId: string, conceptId: string): ConceptMemory | undefined {
    return this.concepts.get(userId)?.get(conceptId);
  }

  public getAllConcepts(userId: string): ReadonlyArray<ConceptMemory> {
    const map = this.concepts.get(userId);
    return map ? Object.freeze(Array.from(map.values())) : Object.freeze([]);
  }

  public saveConcept(userId: string, concept: ConceptMemory): void {
    let map = this.concepts.get(userId);
    if (!map) {
      map = new Map();
      this.concepts.set(userId, map);
    }
    map.set(concept.conceptId, concept);

    // Also append timeline point
    let userTimelines = this.timelines.get(userId);
    if (!userTimelines) {
      userTimelines = new Map();
      this.timelines.set(userId, userTimelines);
    }
    let timeline = userTimelines.get(concept.conceptId);
    if (!timeline) {
      timeline = [];
      userTimelines.set(concept.conceptId, timeline);
    }
    timeline.push({
      timestamp: new Date().toISOString(),
      memoryStrength: concept.memoryStrength,
      stabilityScore: concept.stabilityScore,
      retentionRate: concept.retentionRate,
      recallProbability: concept.estimatedRecallProbability,
    });
  }

  public recordReviewEvent(userId: string, event: ReviewEvent): void {
    let history = this.reviewHistory.get(userId);
    if (!history) {
      history = [];
      this.reviewHistory.set(userId, history);
    }
    history.unshift(event);
  }

  public getReviewHistory(userId: string): ReadonlyArray<ReviewEvent> {
    return Object.freeze(this.reviewHistory.get(userId) || []);
  }

  public getTimeline(userId: string, conceptId: string): ReadonlyArray<MemoryTimelinePoint> {
    return Object.freeze(this.timelines.get(userId)?.get(conceptId) || []);
  }

  public clear(): void {
    this.concepts.clear();
    this.reviewHistory.clear();
    this.timelines.clear();
  }
}
