import { Router } from "express";
import {
    createReponse,
    getReponsesByQuestion,
    updateReponse,
    deleteReponse
} from "../controllers/reponse.controller.js";


const router = Router();

// reponse.routes.ts
router.post("/", createReponse);
router.get("/question/:questionId", getReponsesByQuestion);
router.put("/:id", updateReponse);
router.delete("/:id", deleteReponse);

export default router;
