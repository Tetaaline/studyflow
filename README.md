
# StudyFlow

A responsive, multi-page React website that helps a student organise study tasks, track progress, run a focus timer and set personal preferences.

## Features

- **Dashboard (`/`)**: greeting, task counts, progress bar, upcoming tasks and a link to Focus.
- **Tasks (`/tasks`)**: add, edit, delete and complete tasks; search, filter by category or status, and sort. Search, filters and sort all work together.
- **Focus (`/focus`)**: study/break timer with Start, Pause and Reset.
- **Settings (`/settings`)**: display name, study length, break length and a compact-cards preference.
- **Not Found (`*`)**: friendly message with a link back to the Dashboard.
- Tasks and settings are saved in `localStorage` and survive a refresh.

## Tech stack

React 19 · Vite · Tailwind CSS · React Router DOM. Frontend only: no API, backend or database.

## Run locally

```bash
git clone https://github.com/Tetaaline/studyflow.git
cd studyflow
npm install
npm run dev
```

## Component tree

```
main.jsx (BrowserRouter)
└── App (shared tasks + settings state)
    └── SiteLayout (header, Navbar, Outlet)
        ├── DashboardPage → SummaryCard, SectionCard, Badge, EmptyState
        ├── TasksPage → TaskForm, TaskFilters, TaskCard, EmptyState
        ├── FocusPage → FocusTimer → TimerControls
        ├── SettingsPage → SectionCard, Button
        └──