const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running ✅");
});

// STUDENTS ROUTES
const students = [
  { id: 1, name: "Sneha", email: "sneha@gmail.com", course: "BCA" },
];

app.get("/api/students", (req, res) => {
  res.json({ students });
});

app.post("/api/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body,
  };
  students.push(newStudent);
  res.json(newStudent);
});

app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const filtered = students.filter((s) => s.id !== id);
  res.json({ message: "Deleted" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on http://192.168.29.2:5000");
});