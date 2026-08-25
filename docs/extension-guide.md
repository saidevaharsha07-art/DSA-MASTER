# System Extension Guide

## Extending Platforms
1. Implement `PlatformProvider` interface under `src/platforms/`.
2. Register the platform in `PlatformRegistry`.
3. Optionally package as a plugin implementing `IPlugin` under `src/core/plugins/`.

## Extending Recommendation Strategies
1. Implement `IOracleStrategy` interface under `src/intelligence/oracle/strategies/`.
2. Register strategy in `OracleEngine`.
3. Strategy weights are dynamically evaluated without duplicating engine business logic.
