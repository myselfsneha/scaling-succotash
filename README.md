# Multi-Tenant Student Management SaaS Starter

A full-stack starter for a **Student Management System** with:

- **Frontend**: React + Tailwind + React Router
- **Backend**: Node.js + Express + MySQL
- **Auth**: JWT login/register
- **Multi-tenant isolation** using `tenant_id`
- **Student CRUD** scoped per tenant
- **Dashboard stats API + modern SaaS dashboard UI**
- **Fees management** (payments, revenue, pending fees)

## Folder Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── feeController.js
│   │   │   └── studentController.js
│   │   ├── db
│   │   │   └── schema.sql
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   ├── models
│   │   │   ├── dashboardModel.js
│   │   │   ├── feeModel.js
│   │   │   ├── studentModel.js
│   │   │   └── userModel.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── feeRoutes.js
│   │   │   └── studentRoutes.js
│   │   ├── utils
│   │   │   ├── asyncHandler.js
│   │   │   └── token.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── pages
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── FeesPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── StudentsPage.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Database Schema

Run SQL in `backend/src/db/schema.sql` to create:

- `users(id, email, password, role, tenant_id)`
- `courses(id, name, tenant_id)`
- `students(id, name, email, course, tenant_id)`
- `fees(id, student_id, amount_paid, tenant_id, paid_at)`

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Students (protected)
- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:id`
- `DELETE /api/students/:id`

### Fees (protected)
- `POST /api/fees` → add payment
- `GET /api/fees` → list payments
- `GET /api/fees/summary` → `{ total_revenue, pending_fees }`

### Dashboard (protected)
- `GET /api/dashboard/stats`
  - `total_students`
  - `total_courses`
  - `total_revenue`
  - `recent_students` (last 5)

All student, fees, and dashboard routes only operate on rows matching the logged-in user's `tenant_id`.

## Quick Start

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
# create DB and run backend/src/db/schema.sql in MySQL
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
