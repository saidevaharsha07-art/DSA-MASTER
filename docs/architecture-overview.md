# Platform Architecture Overview

## Principles
1. **Local-First Architecture**: All core features (practice, memory decay, oracle recommendation, rating prediction, notifications, analytics, backups, real-time stream) operate 100% offline without external server dependencies.
2. **Provider-Agnostic Core**: Interfaces isolate cloud infrastructure (Firebase, Supabase, AWS S3, OAuth, PostgreSQL, Redis, PostHog, OneSignal).
3. **Decoupled EventBus**: Subsystems communicate strictly over `EventBus` without direct class coupling.
4. **IoC Dependency Injection**: Global container (`Container`) manages service singletons cleanly.
