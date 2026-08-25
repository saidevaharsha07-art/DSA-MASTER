/**
 * Security & Input Validation Utilities
 * XSS protection, input sanitization, and immutability guarantees.
 */

export class Security {
  public static sanitizeString(input: string): string {
    if (!input) return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  public static freezeState<T extends object>(obj: T): Readonly<T> {
    return Object.freeze(obj);
  }
}
