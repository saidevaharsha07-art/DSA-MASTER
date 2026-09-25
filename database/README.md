# DSA Magna — Database Architecture

This directory contains the database documentation, migration baselines, and TypeScript type contracts for the DSA Magna platform.

## Canonical Database Source of Truth

> **Important**: The operational source of truth for the database schema is **`supabase/schema.sql`** located at the repository root. This is the exact schema executed by the Supabase CLI (`supabase db reset`, `supabase db push`) and applied in the live Supabase project.
>
> The file **`database/schema/schema.sql`** is an architectural documentation mirror and reference copy maintained for data engineering clarity.

## Directory Structure

```text
database/
├── docs/           # Database schema, entity relationships, and RLS documentation
│   └── SCHEMA.md
├── migrations/     # Versioned SQL migration baselines
│   └── 001_initial_schema.sql
├── schema/         # Architectural reference mirror of the schema
│   └── schema.sql
├── seeds/          # Seed data and dataset initialization guidelines
│   └── README.md
├── types/          # TypeScript definitions matching database entities
│   └── index.ts
└── README.md
```

## Security & Row Level Security (RLS)
All client-facing tables enforce strict PostgreSQL Row-Level Security policies ensuring that authenticated users can only read, insert, and update rows where `auth.uid() = user_id`.
