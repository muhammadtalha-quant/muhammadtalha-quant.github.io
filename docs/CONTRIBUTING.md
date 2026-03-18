# Contributing Guidelines

Thank you for contributing to the terminal portfolio! Please follow these guidelines to keep the codebase clean and consistent.

## Code Style
- **TypeScript**: Use strict mode. Avoid `any`. No unused variables.
- **Formatting**: Code is formatted via Prettier (see `.prettierrc`).
- **ESLint**: Zero warnings policy is enforced.

## Adding a New Command
1.  **Create Handler**: Create a new React component in `src/commands/handlers/your-command.tsx`.
2.  **Export**: Export the component as a named constant.
3.  **Register**: Import your component in `src/commands/index.tsx` and add a `Command` object to the `registry` array.
4.  **Validate**: Run `npm run validate` to ensure everything is correct.

## Updating Personal Data
- All personal information (name, links, bio) lives in `src/data/profile.ts`.
- Skill data lives in `src/data/skills.ts`.
- **Never hardcode data** directly into components if it belongs in these data files.

## Documentation
- If you add a feature or command, update the relevant files in the `docs/` folder.

## Git Workflow

### Commit Messages
Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features (e.g., a new command).
- `fix:` for bug fixes.
- `docs:` for documentation updates.
- `test:` for adding or updating tests.
- `refactor:` for code changes that neither fix a bug nor add a feature.

### Branch Naming
- `feat/description`
- `fix/description`
- `docs/description`

## PR Checklist
- [ ] `npm run validate` passes locally.
- [ ] No new `console.log` statements.
- [ ] No hardcoded strings that belong in data files.
- [ ] Documentation updated if necessary.
