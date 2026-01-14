import type { Request, Response } from "express";
import prisma from "../prisma/client.js";


// Créer un cours → admin ou enseignant
export async function createCours(req: Request, res: Response) {
  const { title, description, categorieId, formationId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Non authentifié." });
  }

  // Vérification des permissions
  if (!["admin", "enseignant"].includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  }

  try {
    const cours = await prisma.cours.create({
      data: {
        title,
        description,
        categorieId,
        formationId: formationId || null,
        teacherId: req.user.id,
      },
    });

    res.status(201).json({ cours, message: "Cours créé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du cours." });
  }
}

// Lire un cours par ID
export async function getCoursById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID requis." });
  }

  try {
    const cours = await prisma.cours.findUnique({
      where: { id : id as string },
      include: { lecons: true, formation: true, categorie: true },
    });

    if (!cours) {
      return res.status(404).json({ message: "Cours introuvable." });
    }

    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Lire tous les cours
export async function getAllCours(req: Request, res: Response) {
  try {
    const cours = await prisma.cours.findMany({
      include: { lecons: true, formation: true, categorie: true },
    });
    res.status(200).json(cours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur." });
  }
}

// Mettre à jour un cours → admin ou enseignant
export async function updateCours(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID requis." });
  }

  const { title, description, categorieId, formationId } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Non authentifié." });
  }

  // Vérification des permissions
  if (!["admin", "enseignant"].includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  }

  try {
    // Optionnel : vérifier que l’enseignant est propriétaire ou admin
    const coursExist = await prisma.cours.findUnique({ where: { id : id as string } });
    if (!coursExist) {
      return res.status(404).json({ message: "Cours introuvable — impossible de mettre à jour." });
    }

    if (req.user.role === "enseignant" && coursExist.teacherId !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur de ce cours." });
    }

    const cours = await prisma.cours.update({
      where: { id : id as string },
      data: {
        title,
        description,
        categorieId,
        formationId: formationId || null,
      },
    });

    res.status(200).json({ cours, message: "Cours mis à jour avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du cours." });
  }
}

// Supprimer un cours → admin ou enseignant
export async function deleteCours(req: Request, res: Response) {
  const { id : id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID requis." });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Non authentifié." });
  }

  // Vérification des permissions
  if (!["admin", "enseignant"].includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé — rôle non autorisé." });
  }

  try {
    const coursExist = await prisma.cours.findUnique({ where: { id : id as string } });
    if (!coursExist) {
      return res.status(404).json({ message: "Cours introuvable — impossible de supprimer." });
    }

    if (req.user.role === "enseignant" && coursExist.teacherId !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé — vous n’êtes pas le créateur de ce cours." });
    }

    await prisma.cours.delete({ where: { id : id as string } });
    res.status(200).json({ message: "Cours supprimé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression du cours." });
  }
}
