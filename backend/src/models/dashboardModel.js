import { db } from '../config/db.js';

export const getDashboardStatsByTenant = async (tenantId) => {
  const [[studentCountRow]] = await db.execute(
    'SELECT COUNT(*) AS total_students FROM students WHERE tenant_id = ?',
    [tenantId]
  );

  const [[courseCountRow]] = await db.execute(
    'SELECT COUNT(*) AS total_courses FROM courses WHERE tenant_id = ?',
    [tenantId]
  );

  const [[revenueRow]] = await db.execute(
    'SELECT COALESCE(SUM(amount_paid), 0) AS total_revenue FROM fees WHERE tenant_id = ?',
    [tenantId]
  );

  const [[avgAttendanceRow]] = await db.execute(
    `SELECT ROUND(AVG(student_attendance.attendance_percentage), 2) AS average_attendance_percentage
     FROM (
       SELECT
         s.id,
         (COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0) / NULLIF(COUNT(a.id), 0)) * 100 AS attendance_percentage
       FROM students s
       LEFT JOIN attendance a ON a.student_id = s.id AND a.tenant_id = s.tenant_id
       WHERE s.tenant_id = ?
       GROUP BY s.id
     ) AS student_attendance`,
    [tenantId]
  );

  const [lowAttendanceStudents] = await db.execute(
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
     HAVING COALESCE(attendance_percentage, 0) < 75
     ORDER BY attendance_percentage ASC
     LIMIT 5`,
    [tenantId]
  );

  const [recentStudents] = await db.execute(
    `SELECT id, name, email, course, created_at
     FROM students
     WHERE tenant_id = ?
     ORDER BY created_at DESC
     LIMIT 5`,
    [tenantId]
  );

  return {
    total_students: Number(studentCountRow.total_students),
    total_courses: Number(courseCountRow.total_courses),
    total_revenue: Number(revenueRow.total_revenue),
    average_attendance_percentage: Number(avgAttendanceRow.average_attendance_percentage || 0),
    low_attendance_students: lowAttendanceStudents.map((row) => ({
      student_id: row.student_id,
      student_name: row.student_name,
      attendance_percentage: Number(row.attendance_percentage || 0)
    })),
    recent_students: recentStudents
  };
};
