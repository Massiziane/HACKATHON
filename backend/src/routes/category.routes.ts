import { Router } from "express";
import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";
import { requireRole } from "../middleware/role.middleware.js";


const router = Router();

// Routes publiques
router.get("/", getAllCategories);          
router.get("/:id", getCategoryById);       

// Routes protégées → enseignants ou admin seulement
router.post(
  "/",
  requireRole("enseignant", "admin"),
  createCategory
);

router.put(
  "/:id",
  requireRole("enseignant", "admin"),
  updateCategory
);

router.delete(
  "/:id",
  requireRole("admin"),
  deleteCategory
)

export default router;