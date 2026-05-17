# Task Management App Backend

Express, Sequelize, PostgreSQL, Passport Google OAuth, and JWT power the backend API.

## Environment Variables

Copy the example file before running locally:

```bash
cp .env.example .env
```

Set these values in your local `.env` file and in your hosting provider dashboard:

- `PORT` - API server port.
- `CLIENT_URL` - Frontend URL allowed by CORS and used for Google OAuth redirects.
- `CLIENT_URLS` - Optional comma-separated list of extra frontend URLs allowed for Google redirects.
- `DB_HOST` - PostgreSQL host.
- `DB_PORT` - PostgreSQL port.
- `DB_NAME` - PostgreSQL database name.
- `DB_USER` - PostgreSQL username.
- `DB_PASSWORD` - PostgreSQL password.
- `JWT_SECRET` - Long random secret used to sign JWT tokens.
- `ADMIN_EMAIL` - Email address that should receive the admin role during registration.
- `GOOGLE_CLIENT_ID` - Google OAuth client ID.
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret.
- `GOOGLE_CALLBACK_URL` - Backend Google OAuth callback URL.

Never commit a real `.env` file or real secret values. The repository only includes `.env.example` placeholders.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm install
npm start
```
