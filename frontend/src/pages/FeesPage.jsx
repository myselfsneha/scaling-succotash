import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { feeApi, studentApi } from '../services/api';

const initialPayment = { student_id: '', amount_paid: '' };

export const FeesPage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({ total_revenue: 0, pending_fees: 0 });
  const [formData, setFormData] = useState(initialPayment);
  const [error, setError] = useState('');

  const loadPageData = async () => {
    try {
      const [studentData, feeData, feeSummary] = await Promise.all([
        studentApi.list(token),
        feeApi.list(token),
        feeApi.summary(token)
      ]);

      setStudents(studentData.students);
      setPayments(feeData.payments);
      setSummary(feeSummary);
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadPageData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await feeApi.create(token, {
        student_id: Number(formData.student_id),
        amount_paid: Number(formData.amount_paid)
      });
      setFormData(initialPayment);
      await loadPageData();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fees Management</h1>
          <p className="text-sm text-slate-600">Track payments and monitor pending fees.</p>
        </div>
        <Link to="/dashboard" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Back to Dashboard
        </Link>
      </div>

      {error && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-emerald-100">Total Revenue</p>
          <p className="mt-3 text-4xl font-bold">${summary.total_revenue.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-sm">
          <p className="text-sm uppercase tracking-wide text-orange-100">Pending Fees</p>
          <p className="mt-3 text-4xl font-bold">{summary.pending_fees}</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add Payment</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-3">
          <select
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
            required
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>

          <input
            name="amount_paid"
            type="number"
            min="1"
            step="0.01"
            value={formData.amount_paid}
            onChange={handleChange}
            placeholder="Amount paid"
            className="rounded-lg border border-slate-300 px-3 py-2"
            required
          />

          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white">
            Add Payment
          </button>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Payments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100">
                  <td className="px-6 py-3 text-slate-800">{payment.student_name}</td>
                  <td className="px-6 py-3 text-slate-700">${Number(payment.amount_paid).toLocaleString()}</td>
                  <td className="px-6 py-3 text-slate-500">
                    {new Date(payment.paid_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-slate-500">
                    No payments yet.
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
