# Testing Strategy

This document outlines the testing approach for the muhammadtalha-quant.github.io terminal portfolio. The initial testing suite implementation and framework setup (using Vitest or Jest) faced intractable environmental issues where test runners hung indefinitely. As a result, automated testing is currently paused.

Automated verification happens locally through strict compilation and linting:
- `npm run validate`: Typechecks, lints, and verifies the build.
- `npm audit`: Run locally before deploy to verify dependency security.

## Future Plans 
Once the environment block is solved, testing should cover:

### Unit Tests (`src/test/unit/`)
Unit tests focus primarily on the custom React hooks that house the complex terminal logic:
- `useCommandHistory`: Verifies history cycling, deduplication, and max history limits.
- `useTabCompletion`: Verifies case-insensitive prefix matching and exact match logic.
- `useTypingLines`: Verifies the timed line reveal logic and the skip mechanism.
- `useTerminal`: Verifies entry ID generation, timestamping, history management, and the 500-entry capacity limit.

### Integration Tests (`src/test/integration/`)
Integration tests use `@testing-library/react` and `@testing-library/user-event` to simulate user interactions:
- `Terminal`: Tests end-to-end flows like typing unknown commands, running `help`, clearing the terminal (`Ctrl+L`), cycling history (`ArrowUp`), tab completion, and interrupting input (`Ctrl+C`).
- `commands`: Renders each command handler in isolation and verifies the correct DOM structure and content based on the `profile` and `skills` data.
