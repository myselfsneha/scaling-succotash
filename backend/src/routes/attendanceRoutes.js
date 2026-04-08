import { Router } from 'express';
import {
  attendanceSummary,
  listAttendance,
  markAttendance
} from '../controllers/attendanceController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(requireAuth);
router.post('/', asyncHandler(markAttendance));
router.get('/', asyncHandler(listAttendance));
router.get('/summary', asyncHandler(attendanceSummary));

export default router;
