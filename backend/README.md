# DSA Magna — Backend Architecture

This directory houses the server-side business logic, isolated judge infrastructure abstraction, AI mentoring engine, database synchronization services, and platform integrations.

## Directory Structure

```text
backend/
├── ai/             # AI Mentor services (Gemini integration & fallback guards)
│   └── mentor.service.ts
├── db/             # User data sync and persistence services
│   └── sync.service.ts
├── judge/          # Isolated Judge & evaluation engine
│   ├── comparator/ # Output and verdict normalization
│   ├── drivers/    # Language test harness generators
│   ├── health/     # Provider heartbeat monitoring
│   ├── providers/  # Execution provider adapters (Judge0, Piston, Docker)
│   ├── queue/      # In-flight execution queue
│   ├── sandbox/    # Safe sandboxed runner with production execution guards
│   ├── server/     # Server-only Judge0 client and factory
│   ├── testcases/  # Testcase structures and validators
│   ├── types/      # Judge types and metrics
│   ├── evaluator.ts# Core submission evaluator
│   └── languages.ts# Supported language definitions
├── platform/       # External platform profiles (CodeChef, Codeforces, LeetCode)
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
