import express from "express";

const router = express.Router();

// TEMP DATA (for testing)
let students = [
  { id: 1, name: "Sneha", email: "sneha@gmail.com", course: "BCA" }
];

// GET
router.get("/", (req, res) => {
  res.json({ students });
});

// POST
router.post("/", (req, res) => {
  const newStudent = {
    id: Date.now(),
    ...req.body,
  };
  students.push(newStudent);
  res.json(newStudent);
});

// PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.map((s) =>
    s.id === id ? { ...s, ...req.body } : s
  );

  res.json({ message: "Updated" });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  students = students.filter((s) => s.id !== id);

  res.json({ message: "Deleted" });
});

export default router;