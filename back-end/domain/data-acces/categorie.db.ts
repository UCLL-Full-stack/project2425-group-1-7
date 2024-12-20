import { PrismaClient } from '@prisma/client';
import { Categorie } from "../model/Categorie";

const prisma = new PrismaClient();

const getAllCategorieen = async (): Promise<Categorie[]> => {
    const categorieen = await prisma.categorie.findMany();
    return categorieen.map(Categorie.from);
};

const getCategorieById = async (id: number): Promise<Categorie | null> => {
    const categorie = await prisma.categorie.findUnique({ where: { id } });
    return categorie ? Categorie.from(categorie) : null;
};

const createCategorie = async (categorie: Categorie): Promise<Categorie> => {
    const nieuweCategorie = await prisma.categorie.create({
        data: { naam: categorie.naam }, // Alleen naam wordt meegegeven
    });
    return Categorie.from(nieuweCategorie); // Prisma-output wordt omgezet naar domeinobject
};

const updateCategorie = async (categorieInput: Categorie, id: number): Promise<Categorie> => {
    const categorie = await prisma.categorie.update({
        where: { id },
        data: { naam: categorieInput.naam },
    });
    return Categorie.from(categorie);
};

const deleteCategorieById = async (id: number): Promise<Categorie> => {
    const categorie = await prisma.categorie.delete({ where: { id } });
    return Categorie.from(categorie);
};

const getCategorieByName = async (naam: string): Promise<Categorie | null> => {
    const categorie = await prisma.categorie.findFirst({ where: { naam } });
    return categorie ? Categorie.from(categorie) : null;
}

export default {
    getAllCategorieen,
    getCategorieById,
    createCategorie,
    updateCategorie,
    deleteCategorieById,
    getCategorieByName,
};