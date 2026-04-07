import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-slate-800">Login</h1>
      {error && <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2"
          required
        />
        <button type="submit" className="w-full rounded bg-blue-600 py-2 font-semibold text-white">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        No account?{' '}
        <Link to="/register" className="font-medium text-blue-600">
          Register here
        </Link>
      </p>
    </div>
  );
};
