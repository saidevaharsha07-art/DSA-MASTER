# Configuration System Guide

## Overview
Centralized configuration managed via `src/lib/config/`:
- `EnvironmentManager`: Safe process variable access.
- `FeatureFlagsService`: Dynamic runtime feature flags.
- `ProviderSelectionManager`: Registry-driven provider selection.
- `ConfigService`: Unified configuration snapshot.
