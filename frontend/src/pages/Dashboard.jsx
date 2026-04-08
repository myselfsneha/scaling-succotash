import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
      <h2 className="text-2xl font-bold text-slate-800">Welcome, {user?.name} 👋</h2>
      <p className="mt-2 text-slate-600">This is your protected SaaS dashboard starter page.</p>
      <button
        onClick={logout}
        className="mt-6 rounded-md bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-900"
      >
        Logout
      </button>
    </div>
  );
};
