/**
 * Provider-Independent Rate Limiting Service (Token Bucket + Burst Control)
 */

import { EventBus } from '@/src/core/events/event-bus';

interface TokenBucket {
  tokens: number;
  lastRefillAt: number;
}

export class RateLimitService {
  private static buckets: Map<string, TokenBucket> = new Map();
  private static readonly MAX_TOKENS = 10;
  private static readonly REFILL_RATE_PER_SEC = 2;

  public static async acquireToken(platformId: string): Promise<boolean> {
    let bucket = this.buckets.get(platformId);
    const now = Date.now();

    if (!bucket) {
      bucket = { tokens: this.MAX_TOKENS, lastRefillAt: now };
      this.buckets.set(platformId, bucket);
    } else {
      const elapsedSec = (now - bucket.lastRefillAt) / 1000;
      bucket.tokens = Math.min(this.MAX_TOKENS, bucket.tokens + elapsedSec * this.REFILL_RATE_PER_SEC);
      bucket.lastRefillAt = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    EventBus.publish('RateLimitReached', { platformId });
    return false;
  }
}
