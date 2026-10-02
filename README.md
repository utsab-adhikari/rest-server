
# REST Server

A small REST API backend built with Express, TypeScript, and MongoDB. It handles user accounts with hashed passwords, validates every request through Zod schemas, and exposes system metrics for health checks.

Live at [rest.utsab.space](https://rest.utsab.space)

## What it does

- Full CRUD for users (create, list, update, patch, delete)
- Passwords hashed with bcrypt before storage
- Request payloads validated with Zod before they reach the database
- Rate limiting per IP to reduce abuse
- Helmet headers, CORS, and a 10kb JSON body limit
- System metrics endpoint for CPU, memory, and process uptime
- Interactive UI to test every endpoint in the browser
- Full API documentation page

## Endpoints

| Method | Path                   | Description                            |
|--------|------------------------|----------------------------------------|
| GET    | `/api/users`           | List all users (passwords stripped)    |
| POST   | `/api/users`           | Create a new user                      |
| PUT    | `/api/users/:id`       | Replace a user's name and email        |
| PATCH  | `/api/users/:id`       | Update only the provided fields        |
| DELETE | `/api/users/:id`       | Delete a user                          |
| GET    | `/api/system/metrics`  | Return OS-level telemetry              |

Update and delete routes require the user's current password in the request body to authorize the change.

## Tech stack

- Node.js with Express 5
- TypeScript with strict mode
- MongoDB with Mongoose
- Zod for request validation
- bcrypt for password hashing
- Helmet, CORS, and express-rate-limit for security

## Project structure

```
src/
  controllers/    Route handlers and business logic
  models/         Mongoose schemas
  routes/         Express routers
  validations/    Zod schemas
  middlewares/    Rate limiter and other middleware
  server.ts       App entry point
public/
  index.html      Landing page
  docs.html       API documentation
  ui.html         Interactive API tester
```

## Getting started

### Requirements

- Node.js 20 or newer
- A MongoDB connection string (local or Atlas)

### Install

```bash
git clone https://github.com/utsab-adhikari/rest-server.git
cd rest-server
npm install
```

### Configure

Create a `.env` file at the project root:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Run

```bash
npm run dev
```

The server starts on `http://localhost:3000`. Visit `/` for the landing page, `/docs` for the API reference, or `/ui` for the interactive tester.

### Build

```bash
npm run build
npm start
```

## Notes on security

- Passwords are hashed with bcrypt at cost 10
- The `GET /api/users` response strips the password field
- Rate limiting is applied at the `/api` level
- Helmet is configured with a content security policy that allows the inline styles and scripts used by the UI page
- Request body size is capped at 10kb

## Author

Utsab Adhikari

- Site: [utsabadhikari.dev](https://utsabadhikari.dev)
- Projects: [utsab.space](https://utsab.space)
- GitHub: [@utsab-adhikari](https://github.com/utsab-adhikari)
- LinkedIn: [utsabadhikari](https://linkedin.com/in/utsabadhikari)
- Email: contact@utsabadhikari.dev

## License

ISC