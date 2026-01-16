import { Router } from 'express';
import {
  getProgressForStudent,
  createProgress,
  completeProgress,
  deleteProgress
} from '../controllers/progress.controller.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();


router.get('/:studentId', requireRole('etudiant', 'enseignant', 'admin'), getProgressForStudent)
router.post('/', requireRole('enseignant', 'admin'), createProgress);
router.post('/complete', requireRole('etudiant'), completeProgress);
router.delete('/:id', requireRole('admin'), deleteProgress);

export default router;
