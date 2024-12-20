import { PrismaClient } from '@prisma/client';
import { Gebruiker } from "../model/Gebruiker";

const prisma = new PrismaClient();

const getAllGebruikers = async (): Promise<Gebruiker[]> => {
    const gebruikers = await prisma.gebruiker.findMany();
    return gebruikers.map(Gebruiker.from);
};

const getGebruikerById = async (id: number): Promise<Gebruiker | null> => {
    const gebruiker = await prisma.gebruiker.findUnique({ where: { id } });
    return gebruiker ? Gebruiker.from(gebruiker) : null;
};

const getGebruikerByUsername = async (username: string): Promise<Gebruiker | null> => {
    const gebruiker = await prisma.gebruiker.findUnique({ where: { username } });
    return gebruiker ? Gebruiker.from(gebruiker) : null;
};

const createGebruiker = async (gebruikerInput: Gebruiker): Promise<Gebruiker> => {
    const gebruiker = await prisma.gebruiker.create({
        data: {
            username: gebruikerInput.username,
            password: gebruikerInput.password,
            role: gebruikerInput.role,
        },
    });
    return Gebruiker.from(gebruiker);
};

const deleteGebruikerById = async (id: number): Promise<Gebruiker> => {
    const gebruiker = await prisma.gebruiker.delete({ where: { id } });
    return Gebruiker.from(gebruiker);
};

export default {
    getAllGebruikers,
    getGebruikerById,
    getGebruikerByUsername,
    createGebruiker,
    deleteGebruikerById,
};