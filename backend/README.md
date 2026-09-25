# DSA Magna — Backend Architecture

This directory houses the server-side business logic, code evaluation abstraction, AI mentoring service, database synchronization services, and platform integrations.

## Directory Structure

```text
backend/
├── ai/             # AI Mentor services (Gemini integration & offline fallback guards)
│   └── mentor.service.ts
├── db/             # User data sync and persistence services
│   └── sync.service.ts
├── judge/          # Code evaluation & runner abstraction
│   ├── comparator/ # Output and verdict normalization
│   ├── drivers/    # Language test harness generators
│   ├── health/     # Provider heartbeat monitoring
│   ├── providers/  # Execution provider adapters
│   ├── queue/      # In-flight execution queue
│   ├── sandbox/    # Sandboxed runner with production execution guards
│   ├── server/     # Server-only provider factory & clients
│   ├── testcases/  # Testcase structures and validators
│   ├── types/      # Judge types and metrics
│   ├── evaluator.ts# Core submission evaluator
│   └── languages.ts# Supported language definitions
├── platform/       # External platform profile fetchers (CodeChef, Codeforces, LeetCode)
│   └── platform.service.ts
├── types/          # Backend types and interface aggregations
│   └── index.ts
├── utils/          # Backend utilities, security, and auth guards
│   └── auth-guard.ts
└── README.md
```

## Architecture Pattern
All Next.js API route handlers in `app/api/*` operate as **thin HTTP adapters**.
They handle:
1. HTTP request parsing and method validation.
2. Authentication and header verification.
3. Delegating execution to the appropriate service under `backend/`.
4. Returning standardized, typed JSON HTTP responses.

## Note on Code Execution
Live code execution is not enabled in the first free release. The Run/Submit interface is present, but real code execution infrastructure is planned for a future release. The evaluator safely reports an `unavailable` execution status without invoking local system processes.
