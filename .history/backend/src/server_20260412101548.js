import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let students = [];
let idCounter = 1;

// ➕ Create
app.post("/api/students", (req, res) => {
  const { name, age } = req.body;

  const newStudent = {
    id: idCounter++,
    name,
    age,
  };

  students.push(newStudent);
  res.json(newStudent);
});

// 📖 Read
app.get("/api/students", (req, res) => {
  res.json(students);
});

// ✏️ Update
app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const student = students.find((s) => s.id === id);

  if (student) {
    student.name = name;
    student.age = age;
    res.json(student);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

// ❌ Delete
app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);

  res.json({ message: "Deleted successfully" });
});

// 🚀 Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});