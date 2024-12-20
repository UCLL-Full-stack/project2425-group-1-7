import kookstapDb from '../domain/data-acces/kookstap.db';
import { Kookstap } from '../domain/model/Kookstap';
import { KookstapInput } from '../types/types';

const getAllKookstappen = async (): Promise<Kookstap[]> => {
    return await kookstapDb.getAllKookstappen();
};

const createKookstap = async ({ stapBeschrijving, receptId }: KookstapInput): Promise<Kookstap> => {
    const kookstap = new Kookstap({ stapBeschrijving, receptId });
    return await kookstapDb.createKookstap(kookstap);
};


const getKookstapById = async (id: number): Promise<Kookstap> => {
    const kookstap = await kookstapDb.getKookstapById(id);
    if (!kookstap) {
        throw new Error("Kookstap niet gevonden");
    }
    return kookstap;
};

const updateKookstap = async (id: number, { stapBeschrijving }: KookstapInput): Promise<Kookstap> => {
    const bestaandeKookstap = await kookstapDb.getKookstapById(id);
    if (!bestaandeKookstap) {
        throw new Error("Kookstap niet gevonden");
    }

    const updatedKookstap = new Kookstap({ ...bestaandeKookstap, stapBeschrijving }); // Create a new Kookstap with updated stapBeschrijving
    return await kookstapDb.updateKookstap(updatedKookstap, id);
};

const deleteKookstapById = async (id: number): Promise<boolean> => {
    const kookstap = await kookstapDb.getKookstapById(id);
    if (!kookstap) {
        throw new Error("Kookstap niet gevonden");
    }

    const deletedKookstap = await kookstapDb.deleteKookstapById(id);
    return Boolean(deletedKookstap); // Return true if kookstap was deleted, false otherwise
};

export default {
    getAllKookstappen,
    createKookstap,
    getKookstapById,
    updateKookstap,
    deleteKookstapById,
};