# Command Reference

This document provides a complete reference for every command available in the terminal.

## Identity Commands

### `whoami`
- **Category**: identity
- **Description**: Display a summary of who I am and my career goals.
- **Behavior**: Renders an identity card with name, role, targets, and locations.

### `bio`
- **Category**: identity
- **Description**: Extended background and professional philosophy.
- **Behavior**: Renders multiple paragraphs of text with a typing effect. Includes a quote section after completion.

### `nitch`
- **Category**: identity
- **Description**: System information panel summarizing the profile.
- **Behavior**: Renders a "fetch"-style side panel with OS, Age, Uptime (calculated from birthdate), and core skills.

## Work Commands

### `projects`
- **Category**: work
- **Description**: List C++ and Python projects fetched from GitHub.
- **Behavior**: Fetches live data from the GitHub API. Filters for repositories where the primary language is C++ or Python.
- **Sub-commands**:
    - `projects:done` — Filter for completed projects (Note: current implementation shows all).
    - `projects:planned` — Filter for planned/in-progress projects.
- **Edge Cases**: Handles GitHub API rate limits (60 req/hour for unauthenticated IPs) with a friendly error message.

### `skills`
- **Category**: work
- **Description**: Display the full technical skill matrix.
- **Behavior**: Categorized reveal of skills (C++, Python, Mathematics, etc.).
- **Sub-commands**:
    - `skills:cpp` — Show only C++ related skills.
    - `skills:python` — Show only Python related skills.
    - `skills:math` — Show only Mathematics related skills.

## Contact Commands

### `linkedin`
- **Category**: contact
- **Description**: Open LinkedIn profile in a new tab.
- **Side Effects**: Calls `window.open` to the developer's LinkedIn URL.

### `gh`
- **Category**: contact
- **Description**: Open GitHub profile in a new tab.
- **Side Effects**: Calls `window.open` to the developer's GitHub URL.

### `mailto`
- **Category**: contact
- **Description**: Open default mail client.
- **Side Effects**: Opens a `mailto:` link to the developer's email.

## System Commands

### `help`
- **Category**: system
- **Description**: List all available commands grouped by category.
- **Behavior**: Automatically reads from the command registry to ensure descriptions are always up to date.

### `clear`
- **Category**: system
- **Description**: Clear the terminal history.
- **Side Effects**: Resets the history state in `useTerminal`.

### `reboot`
- **Category**: system
- **Description**: Restart the terminal session.
- **Side Effects**: Simulates a system reboot sequence and calls `window.location.reload()`.

### `get-cv` (documented as `wget`)
- **Category**: system
- **Description**: Download the resume PDF.
- **Behavior**: Simulates a `wget` download sequence (Connecting, Request sent, Saving...).
- **Side Effects**: Automatically triggers a download for the file specified in `profile.resumeUrl`.

### `shutdown`
- **Category**: system
- **Description**: Deactivate the terminal.
- **Behavior**: Simulates a kernel panic sequence.
- **Side Effects**: Renders a "portal-based" crash overlay that blocks all interaction until the "[ Start ]" button is clicked to reload the page.
