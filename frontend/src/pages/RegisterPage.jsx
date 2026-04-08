import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin',
    plan: 'free',
    tenant_id: ''
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="mx-auto mt-16 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold text-slate-800">Register</h1>
      {error && <p className="mt-3 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          name="tenant_id"
          type="text"
          placeholder="Tenant ID (e.g. school-001)"
          value={formData.tenant_id}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2"
          required
        />
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="w-full rounded border border-slate-300 px-3 py-2"
        >
          <option value="free">Free Plan</option>
          <option value="pro">Pro Plan</option>
        </select>
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
          minLength={6}
        />
        <button type="submit" className="w-full rounded bg-blue-600 py-2 font-semibold text-white">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-blue-600">
          Login here
        </Link>
      </p>
    </div>
  );
};
