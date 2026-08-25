/**
 * Token Management Service
 */

export class TokenService {
  public static isTokenExpired(expiresAt: number): boolean {
    return Date.now() >= expiresAt;
  }

  public static generateMockToken(userId: string): string {
    return `tok_${userId}_${Date.now()}`;
  }
}
