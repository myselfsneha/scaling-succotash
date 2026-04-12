import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let students = [];
let idCounter = 1;

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

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);

  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});