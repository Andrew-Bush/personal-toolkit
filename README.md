
# Full Stack Dashboard Application

A modern full-stack dashboard application built with React, TypeScript, Express, and Supabase authentication.

## Features

- Authentication with email-based OTP
- Interactive dashboard with customizable tiles
- Notes management
- Task tracking
- Pace calculator
- Real-time updates with Vite HMR

## Prerequisites

- Node.js (v20 or newer)
- npm (included with Node.js)
- A Supabase account and project for authentication

## Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL=your_database_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server:

```bash
npm run dev
```

The application will be accessible at:
- Frontend: `http://0.0.0.0:5000`
- API: `http://0.0.0.0:5000/api`

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Express backend server
├── shared/          # Shared types and schemas
└── package.json     # Project configuration
```

## Building for Production

```bash
npm run build
```

## License

MIT
