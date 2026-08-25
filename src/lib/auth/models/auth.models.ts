/**
 * Authentication Result Models
 */

import { AuthSession } from './session.models';
import { AuthUser } from './user.models';

export interface SignInCredentials {
  readonly email?: string;
  readonly password?: string;
  readonly rememberMe?: boolean;
}

export interface AuthResult {
  readonly success: boolean;
  readonly session?: AuthSession;
  readonly user?: AuthUser;
  readonly error?: string;
}
