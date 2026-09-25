# DSA Magna — Database Schema Documentation

## Database Overview
DSA Magna uses a relational PostgreSQL schema deployed on Supabase.
All client-accessible tables strictly enforce **Row Level Security (RLS)**, ensuring that authenticated users can only query, modify, or insert their own records (`auth.uid() = user_id`).

---

## Entity Relationship Overview

| Table | Relationship | Description | RLS Policy |
| :--- | :--- | :--- | :--- |
| `public.profiles` | 1:1 with `auth.users(id)` | Public learner identity, username, and avatar | `auth.uid() = id` |
| `public.progress` | 1:1 with `auth.users(id)` | Gamification, level, XP, streaks, and solved IDs | `auth.uid() = user_id` |
| `public.submissions` | 1:N with `auth.users(id)` | Solution execution submissions & audit records | `auth.uid() = user_id` |
| `public.drafts` | 1:N with `auth.users(id)` | In-progress code editor drafts per problem/language | `auth.uid() = user_id` |
| `public.activities` | 1:N with `auth.users(id)` | Append-only activity stream for heatmap & stats | `auth.uid() = user_id` |
| `public.memory_progress` | 1:N with `auth.users(id)` | Spaced Repetition (SRS) memory stability & review intervals | `auth.uid() = user_id` |
| `public.settings` | 1:1 with `auth.users(id)` | Visual theme, editor typography, and platform handles | `auth.uid() = user_id` |
| `public.user_onboarding` | 1:1 with `auth.users(id)` | Diagnostic assessment, level self-reporting & step tracking | `auth.uid() = user_id` |

---

## Automatic Provisioning Trigger
When a user signs up through Supabase Auth, PostgreSQL executes `public.handle_new_user()` to automatically create:
1. `profiles` record with username / email.
2. `progress` record with 0 XP, level 1, streak 0.
3. `settings` record with light/dark preference.
4. `user_onboarding` record in `ONBOARDING_NOT_STARTED` state.
