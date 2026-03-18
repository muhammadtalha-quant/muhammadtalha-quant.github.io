# Custom Hooks API

The project uses several custom hooks to encapsulate terminal logic and animations.

## `useTerminal`
- **File**: `src/hooks/useTerminal.ts`
- **Return Value**:
    - `history: OutputEntry[]` — Array of terminal output lines.
    - `addEntry: (entry) => void` — Function to add a new line to history.
    - `clearHistory: () => void` — Function to empty the history.
    - `terminalEndRef: React.RefObject` — Ref used for auto-scrolling to the bottom.
- **Constraints**: History is capped at 500 entries to maintain performance.

## `useCommandHistory`
- **File**: `src/hooks/useCommandHistory.ts`
- **Return Value**:
    - `addToHistory: (cmd) => void` — Adds a command to the record.
    - `getPrevious: () => string | null` — Cycles backward (ArrowUp).
    - `getNext: () => string` — Cycles forward (ArrowDown).
- **Constraints**: Stores up to 100 unique commands. Deduplicates by moving existing entries to the front.

## `useTabCompletion`
- **File**: `src/hooks/useTabCompletion.ts`
- **Parameters**: `commands: string[]` — List of valid command names.
- **Return Value**:
    - `complete: (input) => string | null` — Returns a match if exactly one prefix match exists.
- **Behavior**: Case-insensitive prefix matching.

## `useBootSequence`
- **File**: `src/hooks/useBootSequence.ts`
- **Parameters**: `onComplete: () => void` — Callback triggered after sequence finish.
- **Internal Behavior**: Renders pre-defined boot lines with random delays between 60ms and 100ms.

## `useTypingLines`
- **File**: `src/hooks/useTypingLines.ts`
- **Parameters**:
    - `lines: string[]` — Lines to animate.
    - `speed: number` — Delay between lines (default 30ms).
- **Return Value**:
    - `visibleCount: number` — Number of lines currently visible.
    - `isComplete: boolean` — True when all lines are visible.
    - `skip: () => void` — Immediately reveals all lines.
- **Usage Example**:
```typescript
const { visibleCount, skip } = useTypingLines(lines, 50);
```
