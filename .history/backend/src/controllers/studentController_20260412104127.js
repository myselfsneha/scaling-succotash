import Student from "../models/Student.js";

// ➕ Create
export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
};

// 📖 Read
export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

// ✏️ Update
export const updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

// ❌ Delete
export const deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};