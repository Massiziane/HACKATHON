import type { Request, Response } from "express";
import prisma from "../prisma/client.js";

// Créer un quiz → admin ou enseignant
export async function createQuiz(req: Request, res: Response) {
  const { title, description, leconId } = req.body;

  if (!req.user) return res.status(401).json({ message: "Non authentifié." });

  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  
  if (!title || typeof title !== "string")
    return res.status(400).json({ message: "Le titre est requis." });
  if (!leconId || typeof leconId !== "string")
    return res.status(400).json({ message: "Leçon requise." });

  try {
    // Vérifie qu'un quiz n'existe pas déjà pour cette leçon
    const existingQuiz = await prisma.quiz.findFirst({
      where: { lecon: { id: leconId } },
    });

    if (existingQuiz)
      return res.status(400).json({
        message: "Un quiz existe déjà pour cette leçon.",
      });

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description: description ?? null,
        teacher: { connect: { id: req.user.id } },
        lecon: { connect: { id: leconId } },
      },
      include: { lecon: true, questions: true, teacher: true },
    });

    return res.status(201).json({ quiz, message: "Quiz créé avec succès." });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur lors de la création du quiz.",
      details: error.message,
    });
  }
}

// Lire un quiz par ID
export async function getQuizById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID requis." });

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id : id as string },
      include: { lecon: true, questions: true, teacher: true },
    });

    if (!quiz) return res.status(404).json({ message: "Quiz introuvable." });

    return res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
}

// Mettre à jour un quiz → admin ou enseignant
export async function updateQuiz(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!id) return res.status(400).json({ message: "ID requis." });
  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id : id as string },
      include: { lecon: true },
    });

    if (!quiz) return res.status(404).json({ message: "Quiz introuvable." });

    if (req.user.role === "enseignant") {
      if (!quiz.lecon)
        return res.status(400).json({ message: "Quiz non attaché à une leçon." });
      if (quiz.lecon.teacherId !== req.user.id)
        return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id : id as string },
      data: {
        title: title ?? quiz.title,
        description: description ?? quiz.description,
      },
      include: { lecon: true, questions: true, teacher: true },
    });

    return res.status(200).json({ quiz: updatedQuiz, message: "Quiz mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
}

// Supprimer un quiz → admin ou enseignant
export async function deleteQuiz(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "ID requis." });
  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id : id as string },
      include: { lecon: true },
    });

    if (!quiz) return res.status(404).json({ message: "Quiz introuvable." });

    if (req.user.role === "enseignant") {
      if (!quiz.lecon)
        return res.status(400).json({ message: "Quiz non attaché à une leçon." });
      if (quiz.lecon.teacherId !== req.user.id)
        return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });
    }

    await prisma.quiz.delete({ where: { id : id as string } });
    return res.status(200).json({ message: "Quiz supprimé avec succès." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression." });
  }
}
