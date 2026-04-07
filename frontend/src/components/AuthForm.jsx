import { useState } from 'react';

const initialState = {
  name: '',
  email: '',
  password: ''
};

export const AuthForm = ({ mode = 'login', onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialState);

  const isSignup = mode === 'signup';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSignup && (
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          required
          minLength={6}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Please wait...' : isSignup ? 'Create account' : 'Log in'}
      </button>
    </form>
  );
};
