import { Router } from 'express';
import {
  addStudent,
  deleteStudent,
  listStudents,
  updateStudent
} from '../controllers/studentController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.use(requireAuth);
router.get('/', asyncHandler(listStudents));
router.post('/', asyncHandler(addStudent));
router.put('/:id', asyncHandler(updateStudent));
router.delete('/:id', asyncHandler(deleteStudent));

export default router;
