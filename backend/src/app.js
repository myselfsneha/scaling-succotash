import cors from 'cors';
import express from 'express';
import attendanceRoutes from './routes/attendanceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use((error, _req, res, _next) => {
  if (error?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Duplicate entry detected for this tenant' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
});

export default app;
