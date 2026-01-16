import type { Request, Response } from "express";
import prisma from "../prisma/client.js";

/**
 * CREATE an answer for a question
 */
export const createReponse = async (req: Request, res: Response) => {
  const { text, bonneReponse, questionID } = req.body;

  if (!text || questionID === undefined) {
    return res.status(400).json({ message: "text et questionID requis" });
  }

  try {
    const reponse = await prisma.reponse.create({
      data: {
        text,
        bonneReponse: Boolean(bonneReponse),
        questionID,
      },
    });

    return res.status(201).json(reponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * GET answers for a question
 */
export const getReponsesByQuestion = async (req: Request, res: Response) => {
  const { questionId } = req.params;

  try {
    const reponses = await prisma.reponse.findMany({
      where: { questionID: questionId as string },
    });

    return res.status(200).json(reponses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * UPDATE an answer
 */
export const updateReponse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, bonneReponse } = req.body;

  try {
    const reponse = await prisma.reponse.update({
      where: { id : id as string },
      data: {
        text,
        bonneReponse,
      },
    });

    return res.status(200).json(reponse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * DELETE an answer
 */
export const deleteReponse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.reponse.delete({ where: { id : id as string } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
