import type { Request, Response } from "express";
import prisma from "../prisma/client.js";


// GET all categories (public)

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.categorie.findMany({
      orderBy: { name: "asc" },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET category by id (public)

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const categorie = await prisma.categorie.findUnique({
      where: { id : id as string },
      include: {
        cours: true,
        formations: true,
      },
    });

    if (!categorie) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    return res.status(200).json(categorie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


// CREATE category (ADMIN / ENSEIGNANT)

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = req.user;

  if (!user || !["admin", "enseignant"].includes(user.role)) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  if (!name) {
    return res.status(400).json({ message: "Nom requis" });
  }

  try {
    const categorie = await prisma.categorie.create({
      data: { name },
    });

    return res.status(201).json(categorie);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Catégorie déjà existante" });
    }

    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE category (ADMIN / ENSEIGNANT)

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = req.user;

  if (!user || !["admin", "enseignant"].includes(user.role)) {
    return res.status(403).json({ message: "Accès refusé" });
  }

  try {
    const categorie = await prisma.categorie.update({
      where: { id : id as string },
      data: { name },
    });

    return res.status(200).json(categorie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};


// DELETE category (ADMIN only — safer)
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Accès refusé" });
  }

  try {
    await prisma.categorie.delete({
      where: { id : id as string },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
