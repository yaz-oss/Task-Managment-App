# Task Management App Frontend

React, TypeScript, Vite, Tailwind CSS, Axios, React Router, and Lucide icons power the frontend for the Task Management App.

## Features

- Modern login and register pages with responsive glass-style layouts.
- Password visibility toggle on login and register forms.
- Remember me support on login for saving the user's email locally.
- Google authentication buttons connected to the backend OAuth route.
- Role-based login redirect for admin and user dashboards.
- User dashboard for creating, editing, searching, filtering, paginating, deleting, and updating task status.
- Admin dashboard for viewing users, blocking or unblocking users, deleting users, assigning tasks, and monitoring all tasks.
- Light and dark theme support with polished dark panels and colorful dashboard accents.

## Pages

- `/` - Login
- `/register` - Register
- `/dashboard` - User dashboard
- `/admin` - Admin dashboard
- `/google-success` - Google OAuth success handler

## Requirements

- Node.js
- npm
- Backend API running on `http://localhost:5000`

## Setup

```bash
npm install
```

Copy the frontend environment example and update it for your backend URL:

```bash
cp .env.example .env
```

For local development:

```bash
VITE_API_URL=http://localhost:5000/api
```

For hosting, set `VITE_API_URL` to your deployed backend API URL.

## Development

```bash
npm run dev
```

The Vite app usually starts on `http://localhost:5173`. If that port is busy, Vite will use the next available port.

## Build

```bash
npm run build
```

This runs the TypeScript build and creates the production bundle in `dist`.

## Lint

```bash
npm run lint
```

## Notes

- Auth tokens, roles, theme preference, username, and remembered email are stored in `localStorage`.
- Do not commit real `.env` files. They are ignored by git.
- The frontend reads the backend API base URL from `VITE_API_URL`.
