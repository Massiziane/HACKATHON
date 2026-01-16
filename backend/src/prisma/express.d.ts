
import type { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            email: string;
            role: string;
        } | User;
    }
}