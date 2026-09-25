# DSA Magna — Database Seeds & Datasets

## Curriculum & Problem Data
DSA Magna's 4,000+ problem catalog (LeetCode, CodeChef, Codeforces, GeeksForGeeks) is packaged as high-performance, statically generated TypeScript data modules within the application.

User state tables (`profiles`, `progress`, `settings`, `user_onboarding`) are automatically seeded per-user via the `public.handle_new_user()` trigger on initial signup.

## Local & Testing Seed Data
For automated tests and local environments:
* Authenticated test users are initialized in Playwright test setups with isolated session state.
* Multi-user isolation verification tests ensure User A and User B cannot access each other's progress or submissions.
