import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { Role } from "../../generated/prisma/client.js";

import {
  getAllFormations,
  getFormationById,
  createFormation,
  updateFormation,
  deleteFormation,
} from "../controllers/formation.controller.js";

const router = Router();

// Routes publiques
router.get("/", getAllFormations);           // Lire toutes les formations
router.get("/:id", getFormationById);       // Lire une formation spécifique

// Routes protégées → enseignants ou admin seulement
router.post(
  "/",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  createFormation
);

router.put(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  updateFormation
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole(Role.enseignant, Role.admin),
  deleteFormation
);

export default router;