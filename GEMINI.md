## Gemini Project Context

This file provides context for the Gemini CLI agent to understand the project better.

### Project Overview

This is a Pictionary-like web application built with Angular. The application allows users to play a Pictionary game with two teams, managing team names, scores, and displaying words to be drawn.

### Key Technologies

- **Framework**: Angular (v21.1.0)
- **UI**: Angular Material (v21.1.4)
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: Angular Signals
- **HTTP Client**: Angular's `HttpClient` for fetching words.
- **Animations**: `@angular/animations` for UI animations.

### Development Environment

- A development server is already running on port 4200. **Do not start a new server.**
- Do not run `ng build` or `npm run lint` unless specifically asked to.

### Application Structure and Flow

- **Routes**:
    - `/` (Home): Displays team names, allows editing team names, and provides a button to start the game.
    - `/game` (Game): The main game interface where words are displayed.
- **Components**:
    - `App`: Root component.
    - `Home`: Manages team name display and editing via `EditTeamName` dialog.
    - `Game`: Displays the current word, provides navigation (previous/next word), and show/hide word functionality. The navigation buttons are laid out in a 3-column centered fashion, and the home button is positioned at the bottom of the display.
    - `EditTeamName`: A dialog component for editing team names.
- **Services**:
    - `TeamService`: Manages `team1` and `team2` names, and `score1` and `score2` using Angular Signals. Provides methods to increment, decrement, and reset scores.
    - `WordService`: Fetches words from `assets/words.txt`, shuffles them, and provides reactive access to the current word and navigation through the word list using Angular Signals.
- **MaterialModule**: A custom module (`src/app/material.module.ts`) that imports and exports all necessary Angular Material components used across the application, including `MatButtonModule`, `MatDialogModule`, `MatFormFieldModule`, `MatIconModule`, and `MatInputModule`.
- **Material Icons**: The Material Icons font is loaded via `index.html` to ensure icons display correctly.

### Deployment

- The application is deployed to GitHub Pages using a GitHub Actions workflow (`.github/workflows/deploy.yml`).
- The deployment leverages `peaceiris/actions-gh-pages @v4`.
- During the build process, the `base-href` is dynamically set to `/pictionary/` to ensure correct asset loading and routing for the application when hosted on GitHub Pages as a project page.
- A `public/404.html` file is included in the build output. This file contains a JavaScript redirect to `index.html`, which is a common workaround to handle 404 errors and enable proper routing for single-page applications on GitHub Pages.
