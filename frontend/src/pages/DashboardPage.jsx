import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-xl bg-white p-8 shadow">
      <h1 className="text-3xl font-bold text-slate-800">Student Management Dashboard</h1>
      <p className="mt-3 text-slate-600">Logged in as {user?.email}</p>
      <p className="text-slate-600">Tenant: {user?.tenant_id}</p>

      <div className="mt-6 flex gap-3">
        <Link to="/students" className="rounded bg-blue-600 px-4 py-2 font-medium text-white">
          Manage Students
        </Link>
        <button onClick={logout} className="rounded bg-slate-700 px-4 py-2 font-medium text-white">
          Logout
        </button>
      </div>
    </div>
  );
};
