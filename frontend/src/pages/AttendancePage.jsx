import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { attendanceApi, studentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  student_id: '',
  status: 'present',
  date: new Date().toISOString().slice(0, 10)
};

export const AttendancePage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({
    attendance_percentage: [],
    low_attendance_students: []
  });
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');

  const loadAttendanceData = async () => {
    try {
      const [studentsData, recordsData, summaryData] = await Promise.all([
        studentApi.list(token),
        attendanceApi.list(token),
        attendanceApi.summary(token)
      ]);

      setStudents(studentsData.students);
      setRecords(recordsData.records);
      setSummary(summaryData);
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await attendanceApi.create(token, {
        student_id: Number(formData.student_id),
        status: formData.status,
        date: formData.date
      });
      await loadAttendanceData();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-6xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance Tracking</h1>
          <p className="text-sm text-slate-600">Mark attendance and monitor insights.</p>
        </div>
        <Link to="/dashboard" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Back to Dashboard
        </Link>
      </div>

      {error && <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Mark Attendance</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-4">
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
                {student.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="rounded-lg border border-slate-300 px-3 py-2"
            required
          />

          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">
            Save Attendance
          </button>
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Low Attendance (&lt; 75%)</h2>
          </div>
          <div className="p-4">
            {summary.low_attendance_students.length === 0 ? (
              <p className="text-sm text-slate-500">No low attendance students right now.</p>
            ) : (
              <ul className="space-y-2">
                {summary.low_attendance_students.map((student) => (
                  <li key={student.student_id} className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {student.student_name} — {student.attendance_percentage}%
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Attendance % by Student</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {summary.attendance_percentage.map((student) => (
                <li key={student.student_id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <span className="text-slate-700">{student.student_name}</span>
                  <span className="font-medium text-slate-900">{student.attendance_percentage}%</span>
                </li>
              ))}
              {summary.attendance_percentage.length === 0 && (
                <li className="text-sm text-slate-500">No attendance data yet.</li>
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Attendance Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-t border-slate-100">
                  <td className="px-6 py-3 text-slate-800">{record.student_name}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        record.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{record.date}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                    No attendance records yet.
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
