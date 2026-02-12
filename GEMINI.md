## Gemini Project Context

This file provides context for the Gemini CLI agent to understand the project better.

### Project Overview

This is a Pictionary game web application built with Angular.

### Key Technologies

- **Framework**: Angular
- **UI**: Angular Material
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: Angular Signals

### Development Environment

- A development server is already running on port 4200. **Do not start a new server.**
- Do not run `ng build` or `npm run lint` unless specifically asked to.

### Application Structure

- The application has two main routes: `/` (Home) and `/game` (Game).
- `TeamService` manages team names and scores.
- `WordService` manages the list of words.
- A custom `MaterialModule` is used to manage Angular Material components.
