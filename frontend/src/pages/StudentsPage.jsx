import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { studentApi } from '../services/api';

const initialForm = { name: '', email: '', course: '' };

export const StudentsPage = () => {
  const { token } = useAuth();
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadStudents = async () => {
    try {
      const data = await studentApi.list(token);
      setStudents(data.students);
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      if (editingId) {
        await studentApi.update(token, editingId, formData);
      } else {
        await studentApi.create(token, formData);
      }

      setFormData(initialForm);
      setEditingId(null);
      await loadStudents();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course
    });
  };

  const handleDelete = async (id) => {
    try {
      await studentApi.remove(token, id);
      await loadStudents();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl space-y-6">
      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Student Management</h1>
          <Link to="/dashboard" className="text-sm font-medium text-blue-600">
            ← Back to Dashboard
          </Link>
        </div>

        {error && <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Student name"
            className="rounded border border-slate-300 px-3 py-2"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Student email"
            className="rounded border border-slate-300 px-3 py-2"
            required
          />
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="rounded border border-slate-300 px-3 py-2"
            required
          />
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 font-medium text-white">
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t border-slate-200">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">{student.course}</td>
                <td className="space-x-2 px-4 py-3">
                  <button
                    onClick={() => handleEdit(student)}
                    className="rounded bg-amber-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No students yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
