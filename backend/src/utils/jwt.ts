import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'def_secret';

// expires in 3 hours pour la pause de diner
export const generateToken = (user: any): string => jwt.sign(user, JWT_SECRET, { expiresIn: '3h' });

export const verifyToken = (token: string): any => jwt.verify(token, JWT_SECRET);
