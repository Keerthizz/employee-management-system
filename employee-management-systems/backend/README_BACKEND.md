# Backend (Node/Express + Sequelize + MySQL)

1. Copy `.env.example` to `.env` and fill DB credentials and JWT_SECRET.
2. Create the MySQL database name you set in DB_NAME.
3. Install:
   ```
   cd backend
   npm install
   ```
4. Seed an admin user:
   ```
   npm run seed
   ```
5. Start server:
   ```
   npm run dev
   ```
API endpoints:
- POST /api/auth/register  {username,password,role}
- POST /api/auth/login     {username,password} -> returns {token}
- GET /api/employees       (Auth required)
- POST /api/employees      (Admin only)
- PUT /api/employees/:id   (Admin only)
- DELETE /api/employees/:id (Admin only)
