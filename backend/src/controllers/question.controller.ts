import type { Request, Response } from "express";
import prisma from "../prisma/client.js";


// CREATE a question for a quiz

export const createQuestion = async (req: Request, res: Response) => {
  const { text, quizId } = req.body;

  if (!text || !quizId) {
    return res.status(400).json({ message: "text et quizId requis" });
  }

  try {
    const question = await prisma.question.create({
      data: {
        text,
        quizId,
      },
    });

    return res.status(201).json(question);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


 // lire toutes les questions
 
export const getQuestionsByQuiz = async (req: Request, res: Response) => {
  const { quizId } = req.params;

  try {
    const questions = await prisma.question.findMany({
      where: { quizId: quizId as string },
      include: {
        options: true, // réponses
      },
    });

    return res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


 // UPDATE a question
 
export const updateQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const question = await prisma.question.update({
      where: { id: id as string },
      data: { text },
    });

    return res.status(200).json(question);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


// DELETE a question (cascade deletes answers)

export const deleteQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.question.delete({ where: { id: id as string } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
