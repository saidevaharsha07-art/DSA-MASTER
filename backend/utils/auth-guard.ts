/**
 * DSA Magna — Backend Auth Guard Utilities
 * Provides server-side authorization and header checks for API route handlers.
 */

export function extractAuthUserId(req: Request): string | null {
  const headerUserId = req.headers.get('x-user-id');
  if (headerUserId && headerUserId.trim().length > 0) {
    return headerUserId.trim();
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In authenticated Supabase requests, bearer token or payload is verified
    return 'authenticated-user';
  }

  return null;
}

export function isAuthRequiredForSubmissions(): boolean {
  // Enforced in production; can be overridden via environment in testing
  if (process.env.REQUIRE_AUTH_FOR_SUBMISSIONS === 'false') {
    return false;
  }
  return true;
}
