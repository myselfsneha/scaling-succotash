import {
  createAttendanceRecord,
  getAttendanceSummaryByTenant,
  listAttendanceByTenant
} from '../models/attendanceModel.js';

export const markAttendance = async (req, res) => {
  const { student_id: studentId, status, date } = req.body;

  if (!studentId || !status || !date) {
    return res.status(400).json({ message: 'student_id, status, and date are required' });
  }

  if (!['present', 'absent'].includes(status)) {
    return res.status(400).json({ message: 'status must be present or absent' });
  }

  const record = await createAttendanceRecord({
    studentId,
    status,
    date,
    tenantId: req.user.tenant_id
  });

  if (!record) {
    return res.status(404).json({ message: 'Student not found for this tenant' });
  }

  return res.status(201).json({ attendance: record });
};

export const listAttendance = async (req, res) => {
  const records = await listAttendanceByTenant(req.user.tenant_id);
  return res.status(200).json({ records });
};

export const attendanceSummary = async (req, res) => {
  const summary = await getAttendanceSummaryByTenant(req.user.tenant_id);
  return res.status(200).json(summary);
};
