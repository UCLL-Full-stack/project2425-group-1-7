import { PrismaClient } from '@prisma/client';
import { Recept } from "../model/Recept";
import { Categorie } from 'domain/model/Categorie';

const prisma = new PrismaClient();


const getAllRecepten = async (): Promise<Recept[]> => {
    const recepten = await prisma.recept.findMany({
        include: {
            categorie: true, // Zorg ervoor dat categorie wordt opgenomen
        },
    });

    return recepten.map((recept) =>
        Recept.from({
            id: recept.id,
            naam: recept.naam,
            beschrijving: recept.beschrijving,
            categorie: {
                id: recept.categorie.id, // Prisma garandeert een geldig id
                naam: recept.categorie.naam,
            },
        })
    );
};



const getReceptById = async (id: number): Promise<Recept | null> => {
    const recept = await prisma.recept.findUnique({
        where: { id },
        include: {
            kookstappen: true,
            categorie: true, // Inclusief categorie
        },
    });

    return recept
        ? Recept.from({
            id: recept.id,
            naam: recept.naam,
            beschrijving: recept.beschrijving,
            categorie: {
                id: recept.categorie.id!, // Assert that id is not undefined
                naam: recept.categorie.naam,
            }, // Gebruik Categorie.from
        })
        : null;
};

const createRecept = async (receptInput: Recept): Promise<Recept> => {
    if (!receptInput.categorie.id) {
        throw new Error("Categorie ID is vereist om een recept aan te maken.");
    }

    const recept = await prisma.recept.create({
        data: {
            naam: receptInput.naam,
            beschrijving: receptInput.beschrijving,
            categorieId: receptInput.categorie.id, // categorieId is nu gegarandeerd een `number`
        },
        include: {
            kookstappen: true,
            categorie: true,
        },
    });

    return Recept.from(recept);
};

const updateRecept = async (receptInput: Recept, id: number): Promise<Recept> => {
    const recept = await prisma.recept.update({
        where: { id },
        data: {
            naam: receptInput.naam,
            beschrijving: receptInput.beschrijving,
            categorieId: receptInput.categorie.id, // Update categorie-verwijzing
        },
        include: {
            kookstappen: true,
            categorie: true, // Inclusief categorie
        },
    });
    return Recept.from(recept);
};

const deleteReceptById = async (id: number): Promise<Recept> => {
    const recept = await prisma.recept.delete({
        where: { id },
        include: {
            kookstappen: true,
            categorie: true, // Inclusief categorie voor consistentie
        },
    });
    return Recept.from(recept);
};

export default {
    getAllRecepten,
    getReceptById,
    createRecept,
    updateRecept,
    deleteReceptById,
};