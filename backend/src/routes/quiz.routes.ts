import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";

import {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.js";

const router = Router();

// Routes publiques

router.get("/:id", getQuizById);    

// Routes protégées → enseignants ou admin seulement
router.post(
  "/",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  createQuiz
);

router.put(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  updateQuiz
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  deleteQuiz
);

export default router;
