import { Link } from 'react-router-dom';

export const PricingPage = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">Simple Pricing</h1>
        <p className="mt-3 text-slate-600">Choose the plan that matches your school growth stage.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Free</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">$0</h2>
          <p className="mt-1 text-slate-600">For new schools testing the platform.</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Student management</li>
            <li>• Attendance tracking</li>
            <li>• Basic dashboard</li>
            <li>• Community support</li>
          </ul>
          <Link to="/register" className="mt-8 inline-block rounded-lg bg-slate-900 px-4 py-2 font-medium text-white">
            Get Started
          </Link>
        </article>

        <article className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Pro</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">$29 / month</h2>
          <p className="mt-1 text-slate-600">For growing institutions needing full analytics.</p>
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>• Everything in Free</li>
            <li>• Fees summary insights</li>
            <li>• Advanced analytics cards</li>
            <li>• Priority support</li>
          </ul>
          <Link to="/register" className="mt-8 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white">
            Choose Pro
          </Link>
        </article>
      </div>
    </div>
  );
};
