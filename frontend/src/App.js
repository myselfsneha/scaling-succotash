import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";
import { motion } from "framer-motion";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // 🔐 AUTH PROTECTION
  if (!token) {
    return <Login setToken={setToken} />;
  }

  // 🔄 LOAD STUDENTS
  const loadStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/students/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/students", form);
      }

      setForm({ name: "", email: "", course: "" });
      loadStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      loadStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // ✏️ EDIT
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course
    });
    setEditId(student._id);
  };

  // 🔍 SEARCH
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      {/* 🔝 HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        EduNexus 🚀
      </motion.h1>

      {/* 🚪 LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      >
        Logout 🚪
      </button>

      {/* 🔍 SEARCH */}
      <input
        className="search"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📝 FORM */}
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

        <button>
          {editId ? "Update Student ✏️" : "Add Student ➕"}
        </button>
      </form>

      {/* 📊 DASHBOARD */}
      <Dashboard students={students} />

      {/* 📋 LIST */}
      <div className="list">
        {filteredStudents.map((s) => (
          <motion.div
            className="card"
            key={s._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3>{s.name}</h3>
            <p>{s.email}</p>
            <p>{s.course}</p>

            <button onClick={() => handleEdit(s)}>
              Edit ✏️
            </button>

            <button onClick={() => handleDelete(s._id)}>
              Delete ❌
            </button>
          </motion.div>
        ))}

        {role === "admin" && (
  <button onClick={() => handleEdit(s)}>Edit ✏️</button>
)}

{role === "admin" && (
  <button onClick={() => handleDelete(s._id)}>Delete ❌</button>
)}
      </div>
    </div>
  );
}

export default App;