# Data Migration Guide

## Schema Versioning
All user state records maintain a `schemaVersion` numeric property (current: `1`).

## Adding a New Migration
Implement `IMigration` from `src/core/migrations/migration.interface.ts`:

```typescript
import { MigrationRegistry } from '@/src/core/migrations/migration.registry';

MigrationRegistry.register({
  version: 2,
  description: 'Add default user preferences',
  up: (data) => ({ ...data, theme: 'dark' }),
  down: (data) => {
    const copy = { ...data };
    delete copy.theme;
    return copy;
  },
});
```

Migrations run automatically via `MigrationEngine.migrate(data)`.
