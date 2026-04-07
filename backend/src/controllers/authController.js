import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { generateToken } from '../utils/token.js';

export const register = async (req, res) => {
  const { email, password, role = 'admin', tenant_id: tenantId } = req.body;

  if (!email || !password || !tenantId) {
    return res.status(400).json({ message: 'Email, password, and tenant_id are required' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashedPassword, role, tenantId });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
    tenant_id: user.tenant_id
  });

  return res.status(201).json({ token, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    tenant_id: user.tenant_id
  };

  const token = generateToken(safeUser);

  return res.status(200).json({ token, user: safeUser });
};

export const me = (req, res) => {
  return res.status(200).json({ user: req.user });
};
