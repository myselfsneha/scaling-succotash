import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // 📥 Get students
  const getStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // ➕ Add student
  const handleAdd = async () => {
    await fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, age }),
    });

    setName("");
    setAge("");
    getStudents();
  };

  // ❌ Delete student
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });

    getStudents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Manager</h2>

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

      <button onClick={handleAdd}>Add</button>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} - {s.age}
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;