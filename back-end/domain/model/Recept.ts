import { Recept as ReceptPrisma } from '@prisma/client';
import { Categorie } from './Categorie';

export class Recept {
    readonly id?: number;
    readonly naam: string;
    readonly beschrijving: string;
    readonly categorie: Categorie;

    constructor(recept: {
        id?: number;
        naam: string;
        beschrijving: string;
        categorie: Categorie;
    }) {
        this.id = recept.id;

        if (recept.naam.trim().length === 0) throw new Error("Invalid naam");
        this.naam = recept.naam;

        if (recept.beschrijving.trim().length === 0) throw new Error("Invalid beschrijving");
        this.beschrijving = recept.beschrijving;

        this.categorie = recept.categorie;
    }

    equals(recept: Recept): boolean {
        return (
            this.naam === recept.naam &&
            this.beschrijving === recept.beschrijving &&
            this.categorie.equals(recept.categorie)
        );
    }

    static from({
        id,
        naam,
        beschrijving,
        categorie,
    }: {
        id?: number;
        naam: string;
        beschrijving: string;
        categorie: { id: number; naam: string };
    }): Recept {
        return new Recept({
            id,
            naam,
            beschrijving,
            categorie: Categorie.from(categorie), // Gebruik Categorie.from
        });
    }

}
