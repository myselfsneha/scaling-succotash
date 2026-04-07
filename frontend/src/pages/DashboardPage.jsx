import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dashboardApi } from '../services/api';

export const DashboardPage = () => {
  const { token, user, logout } = useAuth();
  const [stats, setStats] = useState({
    total_students: 0,
    total_courses: 0,
    total_revenue: 0,
    recent_students: []
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      setError('');

      try {
        const data = await dashboardApi.stats(token);
        setStats(data);
      } catch (loadError) {
        setError(loadError.message);
      }
    };

    loadStats();
  }, [token]);

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">SaaS Dashboard</h1>
          <p className="mt-1 text-sm text-slate-600">
            Welcome back, <span className="font-semibold">{user?.email}</span> · Tenant:{' '}
            <span className="font-semibold">{user?.tenant_id}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/students" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            Students
          </Link>
          <Link to="/fees" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">
            Fees
          </Link>
          <button onClick={logout} className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white">
            Logout
          </button>
        </div>
      </header>

      {error && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-blue-100">Total Students</p>
          <p className="mt-3 text-4xl font-bold">{stats.total_students}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-violet-100">Total Courses</p>
          <p className="mt-3 text-4xl font-bold">{stats.total_courses}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-emerald-100">Total Revenue</p>
          <p className="mt-3 text-4xl font-bold">${stats.total_revenue.toLocaleString()}</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Students</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Course</th>
                <th className="px-6 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_students.map((student) => (
                <tr key={student.id} className="border-t border-slate-100">
                  <td className="px-6 py-3 text-slate-800">{student.name}</td>
                  <td className="px-6 py-3 text-slate-700">{student.email}</td>
                  <td className="px-6 py-3 text-slate-700">{student.course}</td>
                  <td className="px-6 py-3 text-slate-500">
                    {new Date(student.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {stats.recent_students.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                    No recent students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
