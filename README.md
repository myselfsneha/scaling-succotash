# Multi-Tenant Student Management SaaS Starter

A full-stack starter for a **Student Management System** with:

- **Frontend**: React + Tailwind + React Router
- **Backend**: Node.js + Express + MySQL
- **Auth**: JWT login/register
- **Multi-tenant isolation** using `tenant_id`
- **Student CRUD** scoped per tenant
- **Fees management** (payments, revenue, pending fees)
- **Attendance tracking + insights**
- **Modern dashboard** with cards and analytics sections

## Folder Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   │   ├── attendanceController.js
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── feeController.js
│   │   │   └── studentController.js
│   │   ├── db
│   │   │   └── schema.sql
│   │   ├── middleware
│   │   ├── models
│   │   │   ├── attendanceModel.js
│   │   │   ├── dashboardModel.js
│   │   │   ├── feeModel.js
│   │   │   ├── studentModel.js
│   │   │   └── userModel.js
│   │   ├── routes
│   │   │   ├── attendanceRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── feeRoutes.js
│   │   │   └── studentRoutes.js
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   │   ├── AttendancePage.jsx
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
│   └── ...
└── README.md
```

## Database Schema

Run SQL in `backend/src/db/schema.sql` to create:

- `users(id, email, password, role, tenant_id)`
- `courses(id, name, tenant_id)`
- `students(id, name, email, course, tenant_id)`
- `fees(id, student_id, amount_paid, tenant_id, paid_at)`
- `attendance(id, student_id, status, date, tenant_id)`

## API Endpoints

### Attendance (protected)
- `POST /api/attendance` → mark attendance
- `GET /api/attendance` → list records
- `GET /api/attendance/summary` → `{ attendance_percentage, low_attendance_students }`

### Fees (protected)
- `POST /api/fees` → add payment
- `GET /api/fees` → list payments
- `GET /api/fees/summary` → `{ total_revenue, pending_fees }`

### Dashboard (protected)
- `GET /api/dashboard/stats`
  - `total_students`
  - `total_courses`
  - `total_revenue`
  - `average_attendance_percentage`
  - `low_attendance_students`
  - `recent_students`

All APIs are tenant-filtered by authenticated user's `tenant_id`.
