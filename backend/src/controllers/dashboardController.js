import { getDashboardStatsByTenant } from '../models/dashboardModel.js';

export const getDashboardStats = async (req, res) => {
  const stats = await getDashboardStatsByTenant(req.user.tenant_id);
  return res.status(200).json(stats);
};
