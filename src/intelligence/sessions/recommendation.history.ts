/**
 * Session Management — Recommendation History
 * Backend recommendation memory avoiding problem duplicates across recent sessions unless revision is explicit.
 */

export class RecommendationHistoryTracker {
  private recommendedProblemIds: Map<string, Set<string>> = new Map();

  /**
   * Tracks problem IDs recommended to a user.
   */
  public recordRecommendations(userId: string, problemIds: ReadonlyArray<string>): void {
    if (!this.recommendedProblemIds.has(userId)) {
      this.recommendedProblemIds.set(userId, new Set());
    }
    const set = this.recommendedProblemIds.get(userId)!;
    for (const id of problemIds) {
      set.add(id);
    }
  }

  /**
   * Gets set of recently recommended problem IDs for user.
   */
  public getRecommendedIds(userId: string): ReadonlySet<string> {
    return this.recommendedProblemIds.get(userId) || new Set();
  }

  /**
   * Clears recommendation memory for user.
   */
  public clear(userId: string): void {
    this.recommendedProblemIds.delete(userId);
  }
}
