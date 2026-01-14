import type { Request, Response } from "express";
import prisma from "../prisma/client.js";

// Créer une leçon → admin ou enseignant
export async function createLecon(req: Request, res: Response) {
  const { title, description, body, coursId, quizId } = req.body;

  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  if (!title || typeof title !== "string") return res.status(400).json({ message: "Le titre est requis." });
  if (!coursId || typeof coursId !== "string") return res.status(400).json({ message: "Cours requis." });

  try {
    const lecon = await prisma.lecon.create({
      data: {
        title,
        description: description ?? null,
        body: body ?? null,
        teacherId: req.user.id,
        coursId,
        quizId: quizId ?? null, // optionnel
      },
    });

    res.status(201).json({ lecon, message: "Leçon créée avec succès." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la leçon.", details: error.message });
  }
}

// Lire une leçon par ID
export async function getLeconById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID requis." });

  try {
    const lecon = await prisma.lecon.findUnique({
      where: { id : id as string },
      include: { cours: true, quiz: true, teacher: true },
    });

    if (!lecon) return res.status(404).json({ message: "Leçon introuvable." });

    res.status(200).json(lecon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Lire toutes les leçons
export async function getAllLecons(req: Request, res: Response) {
  try {
    const lecons = await prisma.lecon.findMany({
      include: { cours: true, quiz: true, teacher: true },
    });

    res.status(200).json(lecons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Mettre à jour une leçon → admin ou enseignant
export async function updateLecon(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, body, coursId, quizId } = req.body;

  if (!id) return res.status(400).json({ message: "ID requis." });
  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const leconExist = await prisma.lecon.findUnique({ where: { id : id as string } });
    if (!leconExist) return res.status(404).json({ message: "Leçon introuvable." });
    if (req.user.role === "enseignant" && leconExist.teacherId !== req.user.id)
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });

    const lecon = await prisma.lecon.update({
      where: { id : id as string },
      data: {
        title,
        description,
        body,
        coursId,
        quizId: quizId ?? null,
      },
    });

    res.status(200).json({ lecon, message: "Leçon mise à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la leçon." });
  }
}

// Supprimer une leçon → admin ou enseignant
export async function deleteLecon(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "ID requis." });
  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const leconExist = await prisma.lecon.findUnique({ where: { id : id as string } });
    if (!leconExist) return res.status(404).json({ message: "Leçon introuvable." });
    if (req.user.role === "enseignant" && leconExist.teacherId !== req.user.id)
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });

    await prisma.lecon.delete({ where: { id : id as string } });
    res.status(200).json({ message: "Leçon supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la leçon." });
  }
}