import { db } from '../config/db.js';

export const createStudent = async ({ name, email, course, tenantId }) => {
  const [result] = await db.execute(
    'INSERT INTO students (name, email, course, tenant_id) VALUES (?, ?, ?, ?)',
    [name, email, course, tenantId]
  );

  return {
    id: result.insertId,
    name,
    email,
    course,
    tenant_id: tenantId
  };
};

export const listStudentsByTenant = async (tenantId) => {
  const [rows] = await db.execute(
    'SELECT id, name, email, course, tenant_id FROM students WHERE tenant_id = ? ORDER BY id DESC',
    [tenantId]
  );
  return rows;
};

export const updateStudentByTenant = async ({ id, tenantId, name, email, course }) => {
  const [result] = await db.execute(
    'UPDATE students SET name = ?, email = ?, course = ? WHERE id = ? AND tenant_id = ?',
    [name, email, course, id, tenantId]
  );

  return result.affectedRows > 0;
};

export const deleteStudentByTenant = async ({ id, tenantId }) => {
  const [result] = await db.execute('DELETE FROM students WHERE id = ? AND tenant_id = ?', [id, tenantId]);
  return result.affectedRows > 0;
};
