# Project Architecture

This document describes the technical architecture and high-level design of the muhammadtalha-quant.github.io terminal portfolio.

## Project Structure

The project follows a standard React + Vite + TypeScript structure. All source code resides in the `src/` directory:

- `src/`
    - `App.tsx` — Root component, wraps the application in `HelmetProvider` for SEO.
    - `main.tsx` — Vite entry point, mounts the React application to the DOM.
    - `index.css` — Global styles, CSS variables, CRT overlay effects, and cursor animations.
    - `components/`
        - `Terminal.tsx` — Main terminal container. Handles scroll management, keyboard events (PageUp/PageDown), and the mobile blocking overlay.
        - `BootSequence.tsx` — Line-by-line renderer for the initial boot animation.
        - `Input.tsx` — Terminal prompt display with a hidden input and a custom blinking cursor.
        - `OutputLine.tsx` — Renders individual history entries with Framer Motion fade-in animations.
    - `commands/`
        - `index.tsx` — Command registry factory. Maps command names to their respective handler components.
        - `handlers/` — Functional components for each terminal command (e.g., `whoami.tsx`, `bio.tsx`, `system.tsx`).
    - `data/`
        - `profile.ts` — Single source of truth for personal data (name, links, resume URL).
        - `skills.ts` — Structured data for the technical skills matrix.
    - `hooks/`
        - `useTerminal.ts` — Manages terminal history state, `addEntry`, `clearHistory`, and scroll references. Caps history at 500 entries.
        - `useCommandHistory.ts` — Handles Up/Down arrow cycling through command history. Caps history at 100 entries.
        - `useTabCompletion.ts` — Provides prefix-matching logic for command tab completion.
        - `useBootSequence.ts` — Manages boot animation timing with random delays between lines.
        - `useTypingLines.ts` — Controls per-line reveal animations with a skip mechanism.
    - `types/`
        - `index.ts` — Centralized TypeScript interfaces and types.

## Data Flow

When a user interacts with the terminal, the following flow occurs:

1.  **Input**: The user types into a hidden input field in `Input.tsx`.
2.  **Trigger**: Pressing `Enter` triggers the `handleCommand` function in `Terminal.tsx`.
3.  **Parsing**: The input is trimmed and split into a command name and arguments.
4.  **Lookup**: The command registry is searched for a matching name or alias.
5.  **Execution**: If found, the command's handler component is called, returning a `React.ReactNode`.
6.  **State Update**: `addEntry` is called, adding the new output to the terminal history state (managed by `useTerminal`).
7.  **Scrolling**: A `useEffect` in `useTerminal` automatically scrolls to the bottom of the container.
8.  **Rendering**: `OutputLine` renders the new entry using Framer Motion for a smooth entry animation.

## State Management

The project deliberately avoids global state managers like Redux or Zustand. All state is managed locally within React hooks (`useState`, `useReducer`) or passed via props. This keeps the architecture simple and aligned with the project's scope.

## Key Systems

### Typing Effect (`useTypingLines`)
The typing effect increments a `visibleCount` state based on a defined speed interval. It includes a skip mechanism: any `keydown` event immediately sets `visibleCount` to the total number of lines, completing the animation instantly. It also resets automatically when the input lines change.

### CRT Overlay
The retro aesthetic is achieved through a CSS-only overlay in `index.css`. It uses gradients to simulate scanlines, RGB channel noise, and a subtle vignette. The flicker animation is kept stable (no actual color shifting) to ensure performance and accessibility.

### Boot Sequence
The boot sequence uses `useBootSequence` to render a series of system-like logs with random delays (60-100ms) between lines, followed by an `onComplete` callback that triggers the main terminal interface.
