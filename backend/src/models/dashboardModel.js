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
    recent_students: recentStudents
  };
};
