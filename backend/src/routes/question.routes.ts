import { Router } from "express";
import {
    createQuestion,
    getQuestionsByQuiz,
    updateQuestion,
    deleteQuestion,
} from "../controllers/question.controller.js";


const router = Router();

// question.routes.ts
router.post("/", createQuestion);
router.get("/quiz/:quizId", getQuestionsByQuiz);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
