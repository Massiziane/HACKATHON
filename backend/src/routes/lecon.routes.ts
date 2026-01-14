import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";

import {
  getLeconById,
  getAllLecons,
  createLecon,
  updateLecon,
  deleteLecon,
} from "../controllers/lecon.controller.js";

const router = Router();

// Routes publiques
router.get("/", getAllLecons);          // Lire toutes les leçons
router.get("/:id", getLeconById);       // Lire une leçon spécifique

// Routes protégées → enseignants ou admin seulement
router.post(
  "/",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  createLecon
);

router.put(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  updateLecon
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  deleteLecon
);

export default router;