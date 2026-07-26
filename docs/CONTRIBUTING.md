# Contributing

## Adding Content
If you are adding a new problem or pattern, please read `CONTENT_GUIDE.md` first.

## Validation Rules
All content MUST pass `npm run validate-content` before merging. The CI pipeline will automatically run this validator and reject any PRs with missing metadata, broken relational links, or invalid schema types.

## Metadata Guidelines
- `createdAt` and `updatedAt` should be ISO 8601 strings.
- `author` should be your GitHub username.
- Set `verified: false` until a maintainer has formally reviewed the problem's AI Metadata for coaching accuracy.
