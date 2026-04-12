import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Sneha", email: "sneha@gmail.com", course: "BCA" },
];

// GET
app.get("/api/students", (req, res) => {
  res.json({ students });
});

// POST
app.post("/api/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    ...req.body,
  };
  students.push(newStudent);
  res.json(newStudent);
});

// PUT
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.map((s) =>
    s.id === id ? { ...s, ...req.body } : s
  );

  res.json({ message: "Updated" });
});

// DELETE
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter((s) => s.id !== id);

  res.json({ message: "Deleted" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://192.168.29.2:${PORT}`);
});