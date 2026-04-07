import { db } from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
};

export const createUser = async ({ email, password, role, tenantId }) => {
  const [result] = await db.execute(
    'INSERT INTO users (email, password, role, tenant_id) VALUES (?, ?, ?, ?)',
    [email, password, role, tenantId]
  );

  return {
    id: result.insertId,
    email,
    role,
    tenant_id: tenantId
  };
};
