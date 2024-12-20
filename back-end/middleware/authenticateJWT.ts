import { AuthenticatedRequest } from '../types/types';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET || '', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token is ongeldig.' });
            }

            (req as AuthenticatedRequest).auth = user as { id: number; role: string; username: string };
            next();
        });
    } else {
        res.status(401).json({ message: 'Geen token verstrekt.' });
    }
};