# EduSaaS Starter (Multi-Tenant Student Management)

## Highlights
- React + Tailwind frontend with modern public marketing pages
- Express + MySQL backend with JWT auth and tenant isolation
- Students, Fees, Attendance, and Dashboard analytics
- Pricing model with user `plan` (`free` / `pro`)

## New in this version
- **Landing page** with Hero, Features, About, and Footer
- **Pricing page** with Free and Pro cards
- Top navigation for **Home**, **Pricing**, **Login/Register**
- `users.plan` in DB schema (`free` or `pro`)
- Optional feature gating: `GET /api/fees/summary` restricted to **Pro** users

## Core Schema (MySQL)
- `users(id, email, password, role, plan, tenant_id)`
- `students(...)`
- `fees(...)`
- `attendance(...)`
- `courses(...)`

See: `backend/src/db/schema.sql`.

## Key Routes
- Public frontend:
  - `/` landing
  - `/pricing`
  - `/login`, `/register`
- Protected frontend:
  - `/dashboard`, `/students`, `/fees`, `/attendance`
- Backend APIs:
  - `/api/auth/*`
  - `/api/students/*`
  - `/api/fees/*`
  - `/api/attendance/*`
  - `/api/dashboard/stats`

## Run
```bash
# backend
cd backend
cp .env.example .env
npm install
npm run dev

# frontend
cd ../frontend
npm install
npm run dev
```


## React Native API Service
A reusable fetch-based service is available at `frontend/src/services/reactNativeApi.js`.

- Configurable base URL via `createApiService(baseUrl)`
- Login API: `POST /login`
- Returns parsed JSON response


### React Native Login Screen
A ready screen is available at `frontend/src/screens/LoginScreen.js`.

- Inputs: email + password
- On submit: calls `apiService.login(...)`
- On success: `navigation.replace('Dashboard')`
- On failure: shows `Alert.alert(...)`


### React Native Navigation
React Navigation stack is configured in `frontend/src/navigation/AppNavigator.js` with:
- `Login` screen (`frontend/src/screens/LoginScreen.js`)
- `Dashboard` screen (`frontend/src/screens/DashboardScreen.js`)

On successful login, `LoginScreen` redirects using `navigation.replace('Dashboard')`.
