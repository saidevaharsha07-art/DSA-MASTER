# Provider-Agnostic Authentication Framework (`src/lib/auth/`)

## Architecture
Decoupled, provider-agnostic authentication architecture designed for seamless switching between OAuth providers, Email/Password, and local Guest mode.

```text
UI Component -> AuthContext / useAuth() -> AuthService -> IAuthProvider (Google, GitHub, Email, Guest)
                                               │
                                               ├──────► SessionService & AuthStorage (IStorageProvider)
                                               └──────► EventBus (UserSignedIn, UserSignedOut, SessionRestored)
```

## Features
- **Provider Agnostic**: UI consumes identical interface (`IAuthProvider`) without knowing the active backend provider.
- **Persistent Sessions**: Automatic session restoration via `AuthStorage`.
- **Role-Based Permissions**: Granular permissions (`solve_problems`, `submit_contests`, `admin_access`) evaluated via `PermissionService`.
- **Event-Driven**: Emits strongly-typed system events over `EventBus`.
