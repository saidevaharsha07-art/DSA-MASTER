# DSA Magna — Database Architecture

This directory contains the database schema, migration tracking, type definitions, and documentation for the DSA Magna platform.

## Directory Structure

```text
database/
├── docs/           # Database schema, entity relationships, and RLS documentation
│   └── SCHEMA.md
├── migrations/     # Versioned SQL migration scripts
│   └── 001_initial_schema.sql
├── schema/         # Canonical PostgreSQL schema definition
│   └── schema.sql
├── seeds/          # Seed data and dataset initialization guidelines
│   └── README.md
├── types/          # TypeScript definitions for database entities
│   └── index.ts
└── README.md
```

## Supabase CLI Compatibility
The root `supabase/schema.sql` file is retained to preserve 100% compatibility with native Supabase CLI commands (`supabase db reset`, `supabase db push`).
The `database/schema/schema.sql` file provides the architectural reference and schema definition.
