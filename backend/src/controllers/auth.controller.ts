import type { Request, Response } from "express";
import prisma from '../prisma/client.js';
import { HashPassword, ComparePassword } from "../utils/hashpassword.js";
import { generateToken } from "../utils/jwt.js";
import type { SignUpRequest, SignInRequest } from "../types/auth.types.js";

// create a user
export const signUp = async (req: Request<{}, {}, SignUpRequest>, res: Response) => {
    const { firstName, lastName, email, password, role } = req.body;

    if(!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({message : "Tous les champs sont obligatoires"});
    }

    try {
        // verification si l'utilisateur existe via email : unique dans la db
        const existingUser = await prisma.user.findUnique({ where : { email } });

        if(existingUser) { return res.status(400).json({message : "Utilisateur existe deja"})};

        const hashedPassword = await HashPassword(password);
        const user = await prisma.user.create({
            data : {    firstName, 
                        lastName, 
                        email, 
                        password: hashedPassword, 
                        role },
        })

        const { password: _, ...userWithoutPassword } = user;

        return res.status(201).json({ user : userWithoutPassword });
    }catch(error) {
        return res.status(500).json({ message : "Erreur serveur"});
    }
} ;

// sign in user

export const signIn = async (req: Request<{}, {}, SignInRequest>, res: Response) => {
    const { email, password } = req.body;

    // sign in requirements
    if(!email || !password) {
        return res.status(400).json({message : "Email et mot de passe sont obligatoires"});
    }

    try{
        const user = await prisma.user.findUnique({ where : { email } });
        if(!user) { 
            return res.status(404).json({message : "Utilisateur introuvable"})
        };

        // compare password (hashage)
        const validPassword = await ComparePassword(password, user.password);
        if(!validPassword) { 
            return res.status(401).json({message : "Mot de passe incorrect"});
        }

        const token = generateToken({ 
            id: user.id, 
            email: user.email, 
            role: user.role
        });

        return res.status(200).json({ user, token });

    }catch(error) {
        return res.status(500).json({ message : "Erreur serveur"});
    }
};