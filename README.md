# Enjazi · Smart Productivity Platform

Enjazi is a full‑stack productivity suite for students, professionals and anyone who enjoys a bit of friendly competition while getting things done.  
Think adaptive scheduling, goal‑tracking, competitive “rooms”, streak‑based leader‑boards and more — all wrapped in an engaging UI.

---

## Table of Contents
1. [Features](#features)
2. [Tech stack](#tech-stack)
3. [Quick start](#quick-start)
4. [Environment variables](#environment-variables)
5. [NPM scripts](#npm-scripts)
6. [Folder layout](#folder-layout)
7. [REST API overview](#rest-api-overview)
8. [Testing with Postman](#testing-with-postman)
9. [Contribution guide](#contribution-guide)
10. [Licence](#licence)

---

## Features

| Area | Highlights |
|------|------------|
| Task management | CRUD tasks, priorities, categories, deadlines |
| Adaptive scheduling | Tasks auto‑reschedule as workload changes |
| Calendar view | Native calendar with drag‑and‑drop events |
| Goal & streak system | Earn XP / digital medals; maintain streaks |
| Competitive rooms | Public • private • invite‑only; leader‑boards |
| Settings bundle | Profile, theme, Pomodoro, productivity, notifications, integrations |
| Admin dashboard | Role management, permission matrix, analytics |

---

## Tech stack

* **Frontend** – React 18 + Tailwind CSS
* **Backend**  – Node 20, Express 4
* **Database** – MongoDB 6 (with Mongoose ODM)
* **Auth**     – JWT (access cookie) + bcrypt
* **Testing**  – Jest + Supertest (API) / React‑Testing‑Library (UI)

---

## Quick‑Start 🚀

###  Prerequisites  
* **Node.js 18 +** (includes npm)  
* **MongoDB 6 +** running locally or an Atlas URI  

### 1 — Clone the repo

```bash
git clone https://github.com/MoFadel26/Enjazi.git
cd Enjazi
```

`Enjazi/` now contains:

```bash
client/   → Vite + React front‑end  
server/   → Express API & Mongoose models  
```

### 2 — Configure environment variables

```bash
cp .env.example .env     # create your local env file
```

- **`MONGODB_URI`**: `mongodb://localhost:27017/enjazi` (Atlas or local connection string).  
- **`JWT_SECRET`**: `a-long-random-string-change-me` (Used to sign access tokens).  
- **`PORT`** *(optional)*: `5000` (Change API port if needed).


### 3 — Install all dependencies

We use a single `package.json` at the root and rely on `[npm workspaces]` to wire both apps.

```bash
npm install
```
This command will:

install root tools (concurrently, nodemon, eslint, etc.)

install client deps inside `client/node_modules`

install server deps inside `server/node_modules`


### 4 — Run both servers in watch‑mode

```bash
npm run dev
```

The script is defined in `package.json` as

```bash
"dev": "concurrently \"npm:server\" \"npm:client\""
```
#### Vite dev server
* Running on: `http://localhost:5173`
* Serves: React UI with Hot Module Replacement (HMR)

#### Express API
* Running on: `http://localhost:5000`
* Serves: Swagger documentation available at /api/docs

### 5 — Create an account
Open the browser, navigate to `http://localhost:5173/signup`, register, and you’re ready to explore tasks, rooms, streaks etc.

### 6 — Production build
```bash
# builds static React files into client/dist
npm run build

# starts API + serves built client from /public
npm start
```

`npm start` is PM2‑ready, so on a VPS you can simply:

```bash
ENV=production pm2 start npm --name enjazi -- start
```

## REST API overview

### Authentication
- `POST /api/auth/signup`  
  Register new user (no auth required)
- `POST /api/auth/login`  
  User login (sets HTTP-only cookie)
- `POST /api/auth/logout`  
  Clear session cookie (requires auth)
- `POST /api/auth/me`  
  Get current user profile (requires auth)

### Password Management
- `POST /api/password/change`  
  Change password (requires auth)

### Tasks
- `POST /api/tasks`  
  Create new task (requires auth)
- `PATCH /api/tasks/:id`  
  Update task (requires auth)
- `DELETE /api/tasks/:id`  
  Delete task (requires auth)

### Calendar Events
- `POST /api/events`  
  Create event (requires auth)
- `PATCH /api/events/:id`  
  Update event (requires auth)
- `DELETE /api/events/:id`  
  Delete event (requires auth)

### Rooms
- `GET /api/rooms/public`  
  List public rooms (requires auth)
- `GET /api/rooms/enrolled`  
  List user's rooms (requires auth)
- `GET /api/rooms/:id`  
  Get room details (requires auth)
- `POST /api/rooms`  
  Create new room (requires auth)
- `PATCH /api/rooms/:id/join`  
  Join room (requires auth)
- `PATCH /api/rooms/:id/leave`  
  Leave room (requires auth)
- `PUT /api/rooms/:id`  
  Update room (requires auth)
- `DELETE /api/rooms/:id`  
  Delete room (requires auth)

### Settings
- `GET /api/settings`  
  Get all user settings (requires auth)
- `PATCH /api/settings/{section}`  
  Update settings for: profile • appearance • pomodoro • productivity • notifications • integrations (requires auth)

### User Profile
- `GET /api/users/me`  
  Get current user profile (requires auth)
- `PATCH /api/users/me`  
  Update profile (requires auth)

### Admin Endpoints
- `GET /api/users`  
  List all users (requires admin role)
- `PATCH /api/users/:id`  
  Update any user (requires admin role)
- `DELETE /api/users/:id`  
  Delete user (requires admin role)
- `GET /api/admin/users`  
  Permission-gated user list (requires admin role)
- `GET /api/admin/stats`  
  Platform analytics (requires admin role)
- `PUT /api/admin/users/:userId/role`  
  Change user role (requires admin role)
- `PUT /api/admin/users/:userId/permissions`  
  Manage granular permissions (requires admin role)


## Testing with Postman

1. **Import Collection**:  
   Use `docs/postman_collection.json` (generated via `npm run docs`)

2. **Authentication**:
   - Make a request to `Auth / Login`
   - Request body:
     ```json
     {
       "email": "...",
       "password": "..."
     }
     ```
   - On success, Postman automatically stores the JWT in the `auth` environment variable

3. **Protected Requests**:
   - All protected endpoints automatically include the token via a collection-level header:
     ```
     Authorization: Bearer {{auth}}
     ```
   - For cookie-based auth:
     - Enable "Send cookies" in Postman, or
     - Test directly in browser

## Contribution Guide

1. **Workflow**:
   - Fork the repository
   - Create a feature branch
   - Submit a Pull Request

2. **Requirements**:
   - All lint checks must pass (`npm run lint`)
   - All unit tests must pass (`npm test`)
   - Follow [Conventional Commits](https://www.conventionalcommits.org/) (e.g., `feat:`, `fix:`, `docs:`)

3. **Need Help?**
   Open an issue or contact our team

## License
MIT © 2025 Enjazi Team