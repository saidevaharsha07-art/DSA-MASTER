# System Troubleshooting Guide

## Error Hierarchy
- `AppError`: Base custom error.
- `PlatformError`: Platform provider lookup error.
- `EngineError`: Engine decision calculation error.
- `CacheError`: Query cache error.
- `SyncError`: Offline queue sync error.

## Diagnostics Tools
Use Developer Tools at `/dev/diagnostics` and `/dev/performance` to inspect metrics, cache hit ratios, and error logs in real time.
