import { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';

const App = () => {
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login, signup } = useAuth();

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signup(formData);
      } else {
        await login(formData);
      }
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <Dashboard />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-slate-800">SaaS Starter</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          {mode === 'signup' ? 'Create your account' : 'Log into your account'}
        </p>

        {error && <p className="mt-4 rounded-md bg-red-100 p-2 text-sm text-red-700">{error}</p>}

        <div className="mt-6">
          <AuthForm mode={mode} onSubmit={handleSubmit} loading={loading} />
        </div>

        <button
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          className="mt-4 w-full text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {mode === 'signup' ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </main>
  );
};

export default App;
