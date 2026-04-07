import { createFeePayment, getFeeSummaryByTenant, listFeesByTenant } from '../models/feeModel.js';

export const addFeePayment = async (req, res) => {
  const { student_id: studentId, amount_paid: amountPaid, paid_at: paidAt } = req.body;

  if (!studentId || !amountPaid) {
    return res.status(400).json({ message: 'student_id and amount_paid are required' });
  }

  const created = await createFeePayment({
    studentId,
    amountPaid,
    paidAt,
    tenantId: req.user.tenant_id
  });

  if (!created) {
    return res.status(404).json({ message: 'Student not found for this tenant' });
  }

  return res.status(201).json({ payment: created });
};

export const listFees = async (req, res) => {
  const payments = await listFeesByTenant(req.user.tenant_id);
  return res.status(200).json({ payments });
};

export const feeSummary = async (req, res) => {
  const summary = await getFeeSummaryByTenant(req.user.tenant_id);
  return res.status(200).json(summary);
};
