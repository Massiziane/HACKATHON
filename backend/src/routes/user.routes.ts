import { Router } from 'express';
import { getUserById, updateUser, getAllUsers, deleteUser } from '../controllers/user.controller';
import { requireRole } from '../middleware/role.middleware';
import { authMiddleware } from '../middleware/auth.middleware';


const router = Router();

router.get('/', authMiddleware, requireRole('enseignant', 'admin'), getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, requireRole('etudiant', 'enseignant', 'admin'), updateUser);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteUser);

export default router;

