# Employee Management System (Full-stack)

Includes:
- backend/ : Node.js + Express + Sequelize + MySQL (auth + role-based)
- frontend/: React app (simple UI)

I created this project as you requested. Follow steps below.

## Quick start (recommended)
1. Install MySQL and create a database (e.g., `ems_db`).
2. Backend:
   - Copy `backend/.env.example` → `backend/.env` and fill values.
   - `cd backend` → `npm install`
   - `npm run seed` (creates admin/admin123)
   - `npm run dev`
3. Frontend:
   - `cd frontend` → `npm install`
   - edit `frontend/src/config.js` if backend URL differs
   - `npm start`

Default seeded admin: **username: admin**, **password: admin123**

## Uploading to GitHub (Option 1)
1. Extract the provided zip.
2. On GitHub create a new repo.
3. Use the repo's "Upload files" and drag the project folder(s).
4. Commit.

If you want, I can further simplify (single Docker compose, or a single README with screenshots).
