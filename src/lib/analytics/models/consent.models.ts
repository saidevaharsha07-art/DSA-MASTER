/**
 * Analytics Privacy & Consent Model
 */

export interface ConsentState {
  readonly analyticsAllowed: boolean;
  readonly anonymizedUserId: string;
  readonly consentGrantedAt?: string;
  readonly consentRevokedAt?: string;
}
