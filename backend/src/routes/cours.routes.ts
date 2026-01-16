import { Router } from "express";
import {
  createCours,
  getCoursById,
  getAllCours,
  updateCours,
  deleteCours,
} from "../controllers/cours.controller.js";
import { requireRole } from "../middleware/role.middleware.js";

const router = Router();

// Public
router.get("/", getAllCours);
router.get("/:id", getCoursById);

// Protégé → enseignant ou admin (authMiddleware sera exécuté avant)
router.post("/", requireRole("enseignant", "admin"), createCours);
router.put("/:id", requireRole("enseignant", "admin"), updateCours);
router.delete("/:id", requireRole("enseignant", "admin"), deleteCours);

export default router;
