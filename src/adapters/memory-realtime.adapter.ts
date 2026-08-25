/**
 * Memory Realtime Adapter
 * Subscribes to application EventBus events (e.g. ProblemSolved) to update
 * ConceptMemory in MemoryEngine in real-time.
 */

import { EventBus } from '../core/events/event-bus';
import { Container } from '../core/container/container';
import { MemoryEngine } from '../intelligence/memory/engine/memory.engine';

export class MemoryRealtimeAdapter {
  private static isInitialized = false;
  private static processedEventIds = new Set<string>();

  public static initialize(): void {
    if (this.isInitialized) return;

    EventBus.subscribe('ProblemSolved', (event) => {
      this.handleProblemSolved(event);
    });

    this.isInitialized = true;
  }

  public static resetForTesting(): void {
    this.processedEventIds.clear();
    this.isInitialized = false;
  }

  public static resetDeduplicationForTests(): void {
    this.processedEventIds.clear();
  }

  public static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  private static handleProblemSolved(event: any): void {
    const payload = event.payload as any;
    if (!payload) return;

    // Idempotency check: deduplicate by event/attempt ID or problemId + timestamp
    const eventId = payload.id || `solve_${payload.problemId}_${payload.timestamp}`;
    if (this.processedEventIds.has(eventId)) {
      return;
    }
    this.processedEventIds.add(eventId);

    const conceptId = this.resolveConceptId(payload);
    if (!conceptId) {
      console.warn(`[MemoryRealtimeAdapter] ProblemSolved event missing resolvable concept/pattern. Skipping memory update for problemId: ${payload?.problemId}`);
      return;
    }

    const userId = payload.userId || 'default_user';

    let timestamp = new Date();
    if (payload.timestamp) {
      const parsed = new Date(payload.timestamp);
      if (!isNaN(parsed.getTime())) {
        timestamp = parsed;
      }
    }

    const updatedConcept = this.memoryEngine.processReview(userId, conceptId, 'success', timestamp);

    this.broadcastMemoryUpdate(conceptId, updatedConcept.stabilityScore);
  }

  public static resolveConceptId(payload: any): string | null {
    if (!payload) return null;
    if (payload.pattern && payload.pattern !== 'General' && typeof payload.pattern === 'string' && payload.pattern.trim().length > 0) {
      return 'concept-' + payload.pattern.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (payload.topic && payload.topic !== 'General' && typeof payload.topic === 'string' && payload.topic.trim().length > 0) {
      return 'concept-' + payload.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (payload.problemId && typeof payload.problemId === 'string' && payload.problemId.trim().length > 0) {
      return 'concept-' + payload.problemId.replace('leetcode:', '');
    }
    return null;
  }

  private static broadcastMemoryUpdate(conceptId: string, newStability: number): void {
    EventBus.publish('MemoryUpdated', {
      conceptId,
      newStability,
      timestamp: new Date().toISOString(),
    });
  }
}
