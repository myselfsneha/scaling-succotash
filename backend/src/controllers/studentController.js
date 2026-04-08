import {
  createStudent,
  deleteStudentByTenant,
  listStudentsByTenant,
  updateStudentByTenant
} from '../models/studentModel.js';

export const listStudents = async (req, res) => {
  const students = await listStudentsByTenant(req.user.tenant_id);
  return res.status(200).json({ students });
};

export const addStudent = async (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: 'Name, email, and course are required' });
  }

  const student = await createStudent({ name, email, course, tenantId: req.user.tenant_id });
  return res.status(201).json({ student });
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ message: 'Name, email, and course are required' });
  }

  const updated = await updateStudentByTenant({
    id,
    tenantId: req.user.tenant_id,
    name,
    email,
    course
  });

  if (!updated) {
    return res.status(404).json({ message: 'Student not found' });
  }

  return res.status(200).json({ message: 'Student updated' });
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteStudentByTenant({ id, tenantId: req.user.tenant_id });

  if (!deleted) {
    return res.status(404).json({ message: 'Student not found' });
  }

  return res.status(200).json({ message: 'Student deleted' });
};
