import type { Request, Response } from 'express';
import prisma from '../prisma/client.js';
import type User from '../types/user.type.js';



// Lire tout les utilisateurs
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
            }
        });
        res.status(200).json({ users });
    }catch(error) {
        console.log(error);
        res.status(500).json({ message : "Erreur serveur"});
    }
}

// Lire un utilisateur
export async function getUserById(req: Request<User>, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({message : "ID manquant"});

    try {
        if (req.user!.role === 'etudiant' && req.user!.id !== id) {
        return res.status(403).json({ message: "Accès refusé — vous ne pouvez voir que votre profil" });
        }

        const user = await prisma.user.findUnique({
            where : { id },
            select: { id : true, email: true, firstName: true, lastName: true, role: true }
        })

        if(!user) return res.status(404).json({ message : "Utilisateur non trouvé" });
        res.status(200).json({ user });
    } catch(error){
        console.error(error);
        res.status(500).json({ message : "Erreur serveur"});
    }
}


export async function updateUser(req: Request<User>, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({message : "ID manquant"});


    // admin seulement peut modifier
    if(req.user!.role === "admin" && req.user!.id !== id) {
        return res.status(403).json({ message: "Accès refusé — vous ne pouvez modifier que votre profil" });
    }

    try {
        const updated = await prisma.user.update({
            where : { id },
            data : req.body,
            select: { id : true, email: true, firstName: true, lastName: true, role: true }
        });

        res.status(200).json({ user : updated, message: "Utilisateur mis à jour" });
    } catch(error){
        console.error(error);
        res.status(500).json({ message : "Erreur serveur"});
    }
}

export async function deleteUser(req: Request<User>, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({message : "ID manquant"});

    // admin seulement peut modifier
    if(req.user!.role === "admin" && req.user!.id !== id) {
        return res.status(403).json({ message: "Accès refusé — vous ne pouvez modifier que votre profil" });
    }

    try {
        await prisma.user.delete({ where : { id } });
        res.status(200).json({ message : "Utilisateur supprimé" });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message : "Erreur serveur"});
    }
}


