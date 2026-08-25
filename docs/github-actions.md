# GitHub Actions CI/CD Pipeline

- `test.yml`: Runs master unit and integration test suite.
- `typecheck.yml`: Runs strict `npx tsc --noEmit`.
- `lint.yml`: Code quality checks.
- `build.yml`: Verifies production compilation.
- `deploy.yml`: Packages build artifacts safely.
