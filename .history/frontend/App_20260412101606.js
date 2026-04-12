import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000/api/students";

  const getStudents = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSubmit = async () => {
    if (!name || !age) return;

    if (editingId) {
      await fetch(`${API}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      setEditingId(null);
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
    }

    setName("");
    setAge("");
    getStudents();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getStudents();
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setEditingId(student.id);
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🎓 Student Manager</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingId ? "Update" : "Add"}
      </button>

      <ul>
        {filtered.map((s) => (
          <li key={s.id}>
            {s.name} - {s.age}
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;