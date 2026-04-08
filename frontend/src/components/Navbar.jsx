import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-bold text-slate-900">
          EduSaaS
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
            Home
          </Link>
          <Link to="/pricing" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
            Pricing
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
                Dashboard
              </Link>
              <button onClick={logout} className="rounded-md bg-slate-900 px-3 py-2 text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100">
                Login
              </Link>
              <Link to="/register" className="rounded-md bg-slate-900 px-3 py-2 text-white">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
