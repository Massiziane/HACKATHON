
import type { Role } from '../../generated/prisma/client';


export interface SignUpRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role; // etudiant, enseignant, admin
}

export interface SignInRequest {
    email: string;
    password: string;
}





