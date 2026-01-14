import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { Role } from '../../generated/prisma/client.js';

// Définir un type pour req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: Role; 
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).json({ message : "Token JWT manquant." });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(400).json({ message : "Token JWT manquant." });


    try{
        const payload = verifyToken(token) as { id: string, email: string, role: Role, iat: number, exp: number }; // type assertion pour obtenir les types de l'objet payload
        req.user = payload;
        next()
    }catch(error) {
        return res.status(401).json({ message : " token JWT invalide ou absent " });
    }
};
