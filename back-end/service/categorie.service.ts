import categorieDb from '../domain/data-acces/categorie.db';
import { Categorie } from '../domain/model/Categorie';
import { CategorieInput } from '../types/types';

const getAllCategorieen = async (): Promise<Categorie[]> => {
    return await categorieDb.getAllCategorieen();
};


const createCategorie = async ({ naam }: CategorieInput): Promise<Categorie> => {
    // Controleer of de categorie al bestaat
    const bestaandeCategorie = await categorieDb.getCategorieByName(naam);
    if (bestaandeCategorie) {
        throw new Error("Categorie met deze naam bestaat al");
    }

    // Maak een nieuwe categorie zonder id
    const categorie = new Categorie({ naam });
    return await categorieDb.createCategorie(categorie);
};

const getCategorieById = async (id: number): Promise<Categorie> => {
    const categorie = await categorieDb.getCategorieById(id);
    if (!categorie) {
        throw new Error("Categorie niet gevonden");
    }
    return categorie;
};

const updateCategorie = async (id: number, { naam }: CategorieInput): Promise<Categorie> => {
    const bestaandeCategorie = await categorieDb.getCategorieById(id);
    if (!bestaandeCategorie) {
        throw new Error("Categorie niet gevonden");
    }

    const updatedCategorie = new Categorie({ ...bestaandeCategorie, naam });
    return await categorieDb.updateCategorie(updatedCategorie, id);
};

const deleteCategorieById = async (id: number): Promise<boolean> => {
    const categorie = await categorieDb.getCategorieById(id);
    if (!categorie) {
        throw new Error("Categorie niet gevonden");
    }

    const deletedCategorieBy = await categorieDb.deleteCategorieById(id);
    return Boolean(deletedCategorieBy); // Return true if category was deleted, false otherwise
};

export default {
    getAllCategorieen,
    createCategorie,
    getCategorieById,
    updateCategorie,
    deleteCategorieById,
};