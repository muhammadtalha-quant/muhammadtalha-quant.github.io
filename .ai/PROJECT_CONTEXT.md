# Project Context — muhammadtalha-quant.github.io

## What this project is
A terminal-based portfolio website built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion. Deployed to GitHub Pages via GitHub Actions. The terminal is the entire UI — no nav, no sections, no scrollable page. Users interact exclusively by typing commands.

## The person this portfolio represents
Muhammad Talha. 20 years old. BSCS student from Pakistan. Targeting Algorithm Developer at HRT and Quantitative Researcher at Citadel Securities and Two Sigma. Native language Pashto. Current real skills: solid single-threaded C++20, one real project (mmqli interpreter), basic Python awareness but not in active use, mathematics foundations in progress. Contacts exposed: GitHub, LinkedIn, email only.

## Tech stack
React 18, TypeScript (strict), Vite 5, Tailwind CSS 3, Framer Motion 11, react-helmet-async, vite-plugin-sitemap. Node 20. Deployed on GitHub Pages. No backend. No database. No authentication. No paid services.

## Repository structure
- `src/`
    - `App.tsx` — Root component, HelmetProvider wrapper
    - `main.tsx` — Vite entry point, React DOM mount
    - `index.css` — CSS variables, Tailwind, CRT overlay, cursor animation
    - `components/`
        - `Terminal.tsx` — Main terminal container, scroll management, keyboard handling, PageUp/PageDown, mobile overlay
        - `BootSequence.tsx` — Boot animation line-by-line renderer
        - `Input.tsx` — Prompt display, hidden input, blinking cursor
        - `OutputLine.tsx` — Single output entry with Framer Motion fade animation
    - `commands/`
        - `index.tsx` — Command registry factory, maps command names to handler components
        - `handlers/`
            - `whoami.tsx` — Identity card output
            - `bio.tsx` — Multi-paragraph bio with typing effect
            - `nitch.tsx` — System info panel with uptime calculator
            - `projects.tsx` — Live GitHub API fetch + pinned mmqli card
            - `skills.tsx` — Skill matrix with animated reveal
            - `contacts.tsx` — linkedin, gh, mailto handlers
            - `system.tsx` — help, clear, reboot, wget/getCV, shutdown
    - `data/`
        - `profile.ts` — Single source of truth for all personal data
        - `skills.ts` — Skill category data
    - `hooks/`
        - `useTerminal.ts` — History state, addEntry, clearHistory, containerRef, terminalEndRef, 500-entry cap
        - `useCommandHistory.ts` — Up/down arrow command cycling, 100-command cap
        - `useTabCompletion.ts` — Prefix-matching tab completion
        - `useBootSequence.ts` — Boot line timing with random delays
        - `useTypingLines.ts` — Per-line reveal animation with skip on keydown
    - `types/`
        - `index.ts` — All TypeScript interfaces

## Coding conventions
- TypeScript strict mode — no explicit any, no unused vars
- Prettier: singleQuote, no semi, 2 spaces, trailingComma es5
- ESLint: zero warnings, zero errors policy (--max-warnings 0)
- All personal data lives in `src/data/profile.ts` and `src/data/skills.ts` — never hardcode in components
- All custom hooks live in `src/hooks/`
- All command handlers are React functional components in `src/commands/handlers/`
- Framer Motion: named imports only, never barrel imports
- No class components anywhere
- No global state manager — all state in React hooks
- Output history capped at 500 entries (useTerminal.ts)
- IDs use `crypto.randomUUID()`

## Command system
Commands are registered in `src/commands/index.tsx` as an array of Command objects. Each has: name, aliases, description, category, handler. The handler returns `React.ReactNode`. The registry is created by `createCommandRegistry(clearHistory)` which takes `clearHistory` as a dependency injection.

## Known design decisions and why
- No Easter eggs: intentional, the site is professional
- No mail command: removed, only linkedin/gh/mailto exposed
- CRT flicker animation removed: performance + photosensitivity (Note: The flicker effect is defined in CSS but intentionally kept stable).
- overflow: hidden removed from body: allows PageUp/PageDown
- Mobile overlay is blocking (fixed inset-0): not just a banner
- mmqli is pinned manually in projects.tsx: lives under same GitHub account now but needs the paused note which the API description field does not contain
- Python claims are intentionally hedged in all three commands that mention it (whoami, nitch, skills): honest representation
- Jekyll SEO plugin is NOT used: incompatible with Vite/React. SEO is handled by `react-helmet-async` + `vite-plugin-sitemap`

## Files that must never be modified without reading first
- `src/data/profile.ts` — single source of truth for all personal data including resume URL and prompt user/host
- `src/types/index.ts` — changing interfaces here breaks all handlers
- `index.html` — contains all SEO meta tags, JSON-LD structured data, and font preloading
- `.github/workflows/deploy.yml` — changing this breaks the deployment pipeline

## How to add a new command
1. Create `src/commands/handlers/mycommand.tsx`
2. Export a React.FC component
3. Import in `src/commands/index.tsx`
4. Add Command object to the registry array
5. Run `npm run validate` — must pass with zero errors

## Current test coverage
[Placeholder: Updated by Addition 3 after tests are written]

## Open issues as of last update
- Resume PDF must be placed at the URL in `profile.resumeUrl` for the wget command to actually download a file
- GitHub API unauthenticated rate limit: 60 req/hour per IP

---

## AI instructions for working on this project

When helping with this project:
- Always read `src/data/profile.ts` before suggesting any content changes — it is the source of truth
- Never suggest adding Easter eggs — they were deliberately removed
- Never suggest Jekyll, Ruby, or Jekyll plugins — incompatible
- Never suggest adding a visual UI alongside the terminal — the terminal is the intentional entire UI
- Never add new commands without updating the help output — the help command reads from the registry automatically, so adding to the registry is sufficient
- Always run `npm run validate` mentally before suggesting any code change — if it would fail typecheck or lint, revise the suggestion before presenting it
- Maintain content honesty: Python is not yet in active use, formal DSA has not been studied yet — do not suggest adding these as current skills
- The prompt user is 'muhammadtalha' and prompt host is 'quant' — these come from `profile.ts`, never hardcode them
