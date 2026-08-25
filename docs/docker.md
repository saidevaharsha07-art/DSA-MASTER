# Docker Infrastructure

- **Multi-Stage Build**: `deps` -> `builder` -> `runner`
- **Minimal Image**: Alpine-based Node 20 LTS runtime under non-root user `nextjs`.
- **Health Check**: Native HTTP health probe at `/`.
