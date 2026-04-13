import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://scaling-succotash-w5aw.onrender.com/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const getStudents = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL, form);
      getStudents();
      setForm({ name: "", email: "", course: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Manager 🚀</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} - {s.email} - {s.course}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;