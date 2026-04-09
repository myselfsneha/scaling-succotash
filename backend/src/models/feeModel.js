import { db } from '../config/db.js';

const MIN_EXPECTED_FEE = 1000;

export const createFeePayment = async ({ studentId, amountPaid, tenantId, paidAt }) => {
  const [studentRows] = await db.execute(
    'SELECT id FROM students WHERE id = ? AND tenant_id = ? LIMIT 1',
    [studentId, tenantId]
  );

  if (studentRows.length === 0) {
    return null;
  }

  const [result] = await db.execute(
    'INSERT INTO fees (student_id, amount_paid, tenant_id, paid_at) VALUES (?, ?, ?, ?)',
    [studentId, amountPaid, tenantId, paidAt || new Date()]
  );

  return { id: result.insertId, student_id: Number(studentId), amount_paid: Number(amountPaid), tenant_id: tenantId };
};

export const listFeesByTenant = async (tenantId) => {
  const [rows] = await db.execute(
    `SELECT f.id, f.student_id, s.name AS student_name, f.amount_paid, f.paid_at
     FROM fees f
     INNER JOIN students s ON s.id = f.student_id AND s.tenant_id = f.tenant_id
     WHERE f.tenant_id = ?
     ORDER BY f.paid_at DESC`,
    [tenantId]
  );

  return rows;
};

export const getFeeSummaryByTenant = async (tenantId) => {
  const [[revenueRow]] = await db.execute(
    'SELECT COALESCE(SUM(amount_paid), 0) AS total_revenue FROM fees WHERE tenant_id = ?',
    [tenantId]
  );

  const [[pendingRow]] = await db.execute(
    `SELECT COUNT(*) AS pending_fees
     FROM students s
     LEFT JOIN (
      SELECT student_id, COALESCE(SUM(amount_paid), 0) AS total_paid
      FROM fees
      WHERE tenant_id = ?
      GROUP BY student_id
     ) paid ON paid.student_id = s.id
     WHERE s.tenant_id = ?
       AND COALESCE(paid.total_paid, 0) < ?`,
    [tenantId, tenantId, MIN_EXPECTED_FEE]
  );

  return {
    total_revenue: Number(revenueRow.total_revenue),
    pending_fees: Number(pendingRow.pending_fees)
  };
};
