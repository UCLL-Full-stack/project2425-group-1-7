import { PrismaClient } from "@prisma/client";
import { Kookstap } from "../model/Kookstap";

const prisma = new PrismaClient();

const getAllKookstappen = async (): Promise<Kookstap[]> => {
    const kookstappen = await prisma.kookstap.findMany();
    return kookstappen.map(Kookstap.from);
};

const getKookstapById = async (id: number): Promise<Kookstap | null> => {
    const kookstap = await prisma.kookstap.findUnique({ where: { id } });
    return kookstap ? Kookstap.from(kookstap) : null;
};

const createKookstap = async (kookstap: Kookstap): Promise<Kookstap> => {
    const nieuweKookstap = await prisma.kookstap.create({
        data: {
            stapBeschrijving: kookstap.stapBeschrijving,
            receptId: kookstap.receptId,
        },
    });
    return Kookstap.from(nieuweKookstap);
};

const updateKookstap = async (kookstap: Kookstap, id: number): Promise<Kookstap> => {
    const updatedKookstap = await prisma.kookstap.update({
        where: { id },
        data: { stapBeschrijving: kookstap.stapBeschrijving },
    });
    return Kookstap.from(updatedKookstap);
};

const deleteKookstapById = async (id: number): Promise<boolean> => {
    try {
        await prisma.kookstap.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
};

export default {
    getAllKookstappen,
    getKookstapById,
    createKookstap,
    updateKookstap,
    deleteKookstapById,
};