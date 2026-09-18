# DSA MASTER — Curriculum + Journey + Practice Arena Redesign

## Phase B — Canonical curriculum data model
- [x] `src/curriculum/types/index.ts` — mark `kingdomTitle` as `@deprecated`
- [x] `src/curriculum/models/categories.ts` — `ALL_KINGDOMS.title` → `cat.title`

## Phase C — Legacy compatibility mapping
- [x] `src/curriculum/repository/index.ts` — add `getLegacyKingdomTitle()` compat helper

## Phase D — Journey data logic
- [x] `src/features/journey/services/adaptive-roadmap.service.ts` — fix slugs in CANONICAL_TOPICS, update actionUrl `?topic=` → `?area=`

## Phase E — Journey UI redesign
- [x] `app/(app)/journey/page.tsx` — toggle label "Kingdoms Campaign" → "Learning Areas", view mode `campaign` → `areas`
- [x] `src/features/journey/components/VerticalCinematicJourneyView.tsx` — full redesign: removed Kingdom terminology, display Learning Area cards with per-platform breakdowns

## Phase F — `/journey/[area]` detail page
- [x] `app/(app)/journey/[area]/page.tsx` — NEW dynamic route rendering category details, subtopic patterns, cross-platform challenge distribution, and deep-link CTAs

## Phase G — Cross-platform coverage cards
- [x] Included in Phase E rewrite of `VerticalCinematicJourneyView` and Phase F detail page

## Phase H — Practice Arena filter URL persistence
- [x] `src/features/practice/components/PracticeArenaView.tsx` — `?kingdom=` and `?topic=` backwards-compatible alias to `?area=`, persist all filters to URL (`area`, `division`, `pattern`, `difficulty`, `status`, `search`)

## Phase I — Journey → Practice deep-linking
- [x] `/practice?area=...` deep-links active across `TopicDetailModal`, `AdaptiveRoadmapService`, `VerticalCinematicJourneyView`, and `/journey/[area]`

## Phase J — Secondary surfaces label cleanup
- [x] `src/features/learn/components/LearnRoadmapView.tsx` — updated section links to `?area=`, removed Kingdom fallbacks
- [x] `src/features/journey/components/Serpentine5x5CampaignView.tsx` — updated header subtitle to "ALL 25 LEARNING AREAS"

## Phase K — Regression QA
- [x] TypeScript clean: `npx tsc --noEmit` exited code 0
- [x] Lint clean: `npm run lint` exited code 0 (0 errors, only pre-existing warnings)
- [x] Build passes: `npm run build` compiled 30/30 routes including `/journey/[area]` with 0 errors
- [ ] Git commit + push
