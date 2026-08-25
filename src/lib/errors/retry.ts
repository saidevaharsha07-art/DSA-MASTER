/**
 * Exponential Backoff Retry Policy
 */

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 100
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, attempt - 1)));
      }
    }
  }
  throw lastError;
}
