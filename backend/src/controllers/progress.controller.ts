import type { Request, Response } from 'express';
import prisma from '../prisma/client.js';

// GET all progress for a student (student can see own, teacher/admin can see all)
export const getProgressForStudent = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;

  try {
    if (req.user!.role === 'etudiant' && req.user!.id !== studentId) {
      return res.status(403).json({ message: "Accès refusé — vous ne pouvez voir que votre propre progression" });
    }

    const progresses = await prisma.progress.findMany({
      where: { studentId },
      include: { cours: true },
    });

    res.status(200).json({ progresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// CREATE / INIT progress for a course
export const createProgress = async (req: Request, res: Response) => {
  const { studentId, coursId } = req.body;

  if (!studentId || !coursId) {
    return res.status(400).json({ message: "studentId et coursId sont requis" });
  }

  try {
    const progress = await prisma.progress.create({
      data: { studentId, coursId },
    });

    res.status(201).json(progress);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: "Progression déjà existante pour cet étudiant et cours" });
    }
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// MARK course as completed
export const completeProgress = async (req: Request, res: Response) => {
  const { studentId, coursId } = req.body;

  try {
    const progress = await prisma.progress.update({
      where: { studentId_coursId: { studentId, coursId } },
      data: { completed: true },
    });

    res.status(200).json({ message: "Cours complété", progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE a progress (admin only)
export const deleteProgress = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.user!.role !== 'admin') {
    return res.status(403).json({ message: "Accès refusé" });
  }

  try {
    await prisma.progress.delete({ where: { id } });
    res.status(200).json({ message: "Progression supprimée" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
