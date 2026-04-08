import { db } from '../config/db.js';

export const createAttendanceRecord = async ({ studentId, status, date, tenantId }) => {
  const [studentRows] = await db.execute(
    'SELECT id FROM students WHERE id = ? AND tenant_id = ? LIMIT 1',
    [studentId, tenantId]
  );

  if (studentRows.length === 0) {
    return null;
  }

  await db.execute(
    `INSERT INTO attendance (student_id, status, date, tenant_id)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status)`,
    [studentId, status, date, tenantId]
  );

  return { student_id: Number(studentId), status, date, tenant_id: tenantId };
};

export const listAttendanceByTenant = async (tenantId) => {
  const [rows] = await db.execute(
    `SELECT a.id, a.student_id, s.name AS student_name, a.status, a.date
     FROM attendance a
     INNER JOIN students s ON s.id = a.student_id AND s.tenant_id = a.tenant_id
     WHERE a.tenant_id = ?
     ORDER BY a.date DESC, a.id DESC`,
    [tenantId]
  );

  return rows;
};

export const getAttendanceSummaryByTenant = async (tenantId) => {
  const [perStudentRows] = await db.execute(
    `SELECT
       s.id AS student_id,
       s.name AS student_name,
       ROUND(
         (COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0)
         / NULLIF(COUNT(a.id), 0)) * 100,
         2
       ) AS attendance_percentage
     FROM students s
     LEFT JOIN attendance a ON a.student_id = s.id AND a.tenant_id = s.tenant_id
     WHERE s.tenant_id = ?
     GROUP BY s.id, s.name
     ORDER BY s.name ASC`,
    [tenantId]
  );

  const normalized = perStudentRows.map((row) => ({
    student_id: row.student_id,
    student_name: row.student_name,
    attendance_percentage: Number(row.attendance_percentage || 0)
  }));

  const lowAttendanceStudents = normalized.filter((row) => row.attendance_percentage < 75);

  return {
    attendance_percentage: normalized,
    low_attendance_students: lowAttendanceStudents
  };
};
