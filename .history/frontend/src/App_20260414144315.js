import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const loadStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/students", form);
    setForm({ name: "", email: "", course: "" });
    loadStudents();
  };

  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    loadStudents();
  };

  return (
    <div className="container">
      <h1>EduNexus 🚀</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            setForm({ ...form, course: e.target.value })
          }
        />
        <button>Add Student</button>
      </form>

      <div className="list">
        {students.map((s) => (
          <div className="card" key={s._id}>
            <h3>{s.name}</h3>
            <p>{s.email}</p>
            <p>{s.course}</p>

            <button onClick={() => handleDelete(s._id)}>
              Delete ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;