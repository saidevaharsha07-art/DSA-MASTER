/**
 * Remote Database Adapter (Phase 13)
 * Production-safe remote database client interface supporting PostgreSQL / Supabase connection strings
 * via server environment variables (DATABASE_URL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).
 * Provides robust retry logic, timeout handling, and graceful offline fallback.
 */

export interface RemoteQueryOptions {
  timeoutMs?: number;
  retries?: number;
}

export interface RemoteQueryResult<T> {
  success: boolean;
  data: T | null;
  error?: string;
  isOfflineFallback?: boolean;
}

export class RemoteDatabaseAdapter {
  private static instance: RemoteDatabaseAdapter;
  private isConfigured: boolean = false;
  private dbUrl?: string;

  private constructor() {
    this.checkConfiguration();
  }

  public static getInstance(): RemoteDatabaseAdapter {
    if (!RemoteDatabaseAdapter.instance) {
      RemoteDatabaseAdapter.instance = new RemoteDatabaseAdapter();
    }
    return RemoteDatabaseAdapter.instance;
  }

  public checkConfiguration(): boolean {
    if (typeof process === 'undefined') return false;
    this.dbUrl = process.env.DATABASE_URL || process.env.SUPABASE_URL;
    this.isConfigured = !!this.dbUrl;
    return this.isConfigured;
  }

  /**
   * Executes a remote database sync mutation via server proxy endpoint.
   */
  public async executeSync<T>(
    domain: string,
    userId: string,
    payload: T,
    authToken?: string,
    options: RemoteQueryOptions = {}
  ): Promise<RemoteQueryResult<T>> {
    const timeout = options.timeoutMs || 8000;
    const maxRetries = options.retries || 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const baseUrl = typeof window !== 'undefined' ? '' : (process.env.TEST_BASE_URL || 'http://localhost:3000');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }
        headers['x-user-id'] = userId;

        const res = await fetch(`${baseUrl}/api/db/sync`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ userId, domain, payload }),
          signal: controller.signal,
        });

        clearTimeout(timer);

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }

        const data = await res.json();
        return {
          success: true,
          data: data.payload || payload,
        };
      } catch (err: any) {
        if (attempt === maxRetries) {
          return {
            success: false,
            data: null,
            error: err.message || 'Remote database sync failed after retries',
            isOfflineFallback: true,
          };
        }
        // Small backoff before retry
        await new Promise((r) => setTimeout(r, 100 * (attempt + 1)));
      }
    }

    return {
      success: false,
      data: null,
      error: 'Max retries exceeded',
      isOfflineFallback: true,
    };
  }
}

export const remoteDatabaseAdapter = RemoteDatabaseAdapter.getInstance();
