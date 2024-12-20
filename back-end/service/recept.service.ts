import { UnauthorizedError } from "express-jwt";
import receptDb from "../domain/data-acces/recept.db";
import { ReceptInput } from "../types/types";
import { Recept } from "../domain/model/Recept";
import { Categorie } from "../domain/model/Categorie";

const getAllRecepten = (): Promise<Recept[]> => {
    return receptDb.getAllRecepten();
};

const createRecept = async ({ naam, beschrijving, categorieId }: ReceptInput): Promise<Recept> => {
    if (!categorieId) {
        throw new Error("Categorie ID is vereist om een recept aan te maken.");
    }

    const receptInput = new Recept({
        naam,
        beschrijving,
        categorie: new Categorie({ id: categorieId, naam: "" }), // Naam kan leeg blijven omdat Prisma alleen `id` gebruikt
    });

    const bestaandeRecepten = await receptDb.getAllRecepten();
    bestaandeRecepten.forEach(function (recept) {
        if (recept.equals(receptInput)) throw new Error("Recept already exists");
    });

    return receptDb.createRecept(receptInput);
};


const getReceptById = async (id: number): Promise<Recept> => {
    const recept = await receptDb.getReceptById(id);
    if (!recept) throw new Error("Recept not found");
    return recept;
};

const updateRecept = async (id: number, { naam, beschrijving, categorieId }: ReceptInput, { role }: { role: string }): Promise<Recept> => {
    if (role !== "admin") {
        throw new UnauthorizedError("credentials_required", { message: "You are not authorized to update this resource." });
    }

    if (!categorieId) {
        throw new Error("Categorie ID is vereist om een recept bij te werken.");
    }

    const receptInput = new Recept({
        naam,
        beschrijving,
        categorie: new Categorie({ id: categorieId, naam: "" }), // Dummy naam als placeholder
    });

    return receptDb.updateRecept(receptInput, id);
};

const deleteRecept = async (id: number, { role }: { role: string }): Promise<Recept> => {
    if (role !== "admin") {
        throw new UnauthorizedError("credentials_required", { message: "You are not authorized to delete this resource." });
    }

    const recept = await receptDb.getReceptById(id);
    if (!recept) {
        throw new Error("Recept not found");
    }

    return receptDb.deleteReceptById(id);
};

export default {
    getAllRecepten,
    createRecept,
    getReceptById,
    updateRecept,
    deleteRecept,
};