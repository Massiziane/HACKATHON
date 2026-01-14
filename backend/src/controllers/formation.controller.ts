import type { Request, Response } from "express";
import prisma from "../prisma/client.js";

// Créer une formation  admin ou enseignant
export async function createFormation(req: Request, res: Response) {
  const { title, description, categories } = req.body;

  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  if (!title || typeof title !== "string")
    return res.status(400).json({ message: "Le titre est requis et doit être une chaîne." });

  try {
    const formation = await prisma.formation.create({
      data: {
        title,
        description: description ?? null,
        teacherId: req.user.id, 
        inheritedCategories: { connect: Array.isArray(categories) ? categories.map((id: string) => ({ id })) : [] },
      },
    });

    res.status(201).json({ formation, message: "Formation créée avec succès." });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la formation.", details: error.message });
  }
}

// Line une formation 
export async function getFormationById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID requis." });

  try {
    const formation = await prisma.formation.findUnique({
      where: { id: id as string },
      include: { cours: true, inheritedCategories: true },
    });

    if (!formation) return res.status(404).json({ message: "Formation introuvable." });

    res.status(200).json(formation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Lire toutes les formations
export async function getAllFormations(req: Request, res: Response) {
  try {
    const formations = await prisma.formation.findMany({
      include: { cours: true, inheritedCategories: true },
    });

    res.status(200).json(formations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Mettre à jour une formation → admin ou enseignant
export async function updateFormation(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID requis." });

  const { title, description, categories } = req.body;

  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const formationExist = await prisma.formation.findUnique({ where: { id: id as string } });
    if (!formationExist) return res.status(404).json({ message: "Formation introuvable." });
    if (req.user.role === "enseignant" && formationExist.teacherId !== req.user.id)
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });

    const formation = await prisma.formation.update({
      where: { id : id as string },
      data: {
        title,
        description,
        inheritedCategories: { set: [], connect: Array.isArray(categories) ? categories.map((id: string) => ({ id })) : [] },
      },
    });

    res.status(200).json({ formation, message: "Formation mise à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la formation." });
  }
}

// Supprimer une formation → admin ou enseignant
export async function deleteFormation(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "ID requis." });
  if (!req.user) return res.status(401).json({ message: "Non authentifié." });
  if (!["admin", "enseignant"].includes(req.user.role))
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });

  try {
    const formationExist = await prisma.formation.findUnique({ where: { id: id as string } });
    if (!formationExist) return res.status(404).json({ message: "Formation introuvable." });
    if (req.user.role === "enseignant" && formationExist.teacherId !== req.user.id)
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur." });
    
    await prisma.formation.delete({ where: { id: id as string } });
    res.status(200).json({ message: "Formation supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la formation." });
  }
}