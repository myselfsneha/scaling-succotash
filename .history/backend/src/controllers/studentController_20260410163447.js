import {
  createStudent,
  listStudentsByTenant,
  updateStudentByTenant,
  deleteStudentByTenant,
} from "../models/studentModel.js";

const tenantId = 1;

export const listStudents = async (req, res) => {
  try {
    const students = await listStudentsByTenant(tenantId);
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = await createStudent({
      name,
      email,
      course,
      tenantId,
    });

    res.status(201).json({ student });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    const updated = await updateStudentByTenant({
      id,
      tenantId,
      name,
      email,
      course,
    });

    if (!updated) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Updated" });
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteStudentByTenant({ id, tenantId });

    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Error" });
  }
};