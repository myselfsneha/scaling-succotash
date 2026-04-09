import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Student Management',
    description: 'Create and manage students with tenant-isolated data and clean workflows.'
  },
  {
    title: 'Fees Tracking',
    description: 'Track payments, monitor revenue, and identify pending fees in real time.'
  },
  {
    title: 'Attendance Insights',
    description: 'Mark attendance and instantly identify students with low attendance trends.'
  },
  {
    title: 'Smart Dashboard',
    description: 'Get key metrics across students, courses, revenue, and attendance at a glance.'
  }
];

export const LandingPage = () => {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
        <p className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Built for modern schools
        </p>
        <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-slate-900">
          Manage students, attendance, and fees from one SaaS platform.
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Launch your institute operations with a startup-grade dashboard, tenant-safe architecture, and real-time insights.
        </p>
        <div className="flex gap-3">
          <Link to="/register" className="rounded-lg bg-slate-900 px-5 py-3 font-medium text-white">
            Start for Free
          </Link>
          <Link to="/pricing" className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700">
            View Pricing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-3xl font-bold text-slate-900">Features</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">About EduSaaS</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            EduSaaS helps institutions centralize operations across admissions, attendance, and finance. It is designed to be fast,
            secure, and simple for teams scaling from one campus to many.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EduSaaS. All rights reserved.</p>
          <p>Built for modern education teams.</p>
        </div>
      </footer>
    </div>
  );
};
