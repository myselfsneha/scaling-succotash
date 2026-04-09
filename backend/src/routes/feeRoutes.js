import { Router } from 'express';
import { addFeePayment, feeSummary, listFees } from '../controllers/feeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireProPlan } from '../middleware/planMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(requireAuth);
router.post('/', asyncHandler(addFeePayment));
router.get('/', asyncHandler(listFees));
router.get('/summary', requireProPlan, asyncHandler(feeSummary));

export default router;
