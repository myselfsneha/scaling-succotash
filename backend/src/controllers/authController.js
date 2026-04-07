import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { userStore } from '../models/userStore.js';
import { generateToken } from '../utils/token.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existingUser = userStore.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = userStore.create({
    id: randomUUID(),
    name,
    email,
    passwordHash
  });

  const token = generateToken({ id: user.id, email: user.email, name: user.name });

  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = userStore.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user.id, email: user.email, name: user.name });

  return res.status(200).json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

export const getMe = (req, res) => {
  return res.status(200).json({ user: req.user });
};
