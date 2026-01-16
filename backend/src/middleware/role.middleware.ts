import type { Request, Response, NextFunction } from 'express';
import type { User } from '../../generated/prisma/client';

export function requireRole(...roles : User['role'][]) {
    return (req : Request, res: Response , next : NextFunction) => {
        if(!req.user) {
            return res.status(401).json({ message : "Non authentifié — token JWT invalide ou absent." 

            });
        }

        const userRole = req.user.role;

        if(!roles.includes(userRole)) {
            return res.status(403).json({ message : "Accès refusé — vous ne pouvez pas acceder aux ressources de ce type" });
        }
        next();
    };
}
