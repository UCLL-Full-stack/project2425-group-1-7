export class Categorie {
    readonly id?: number; // id blijft optioneel
    readonly naam: string;

    constructor({ id, naam }: { id?: number; naam: string }) {
        this.id = id;
        this.naam = naam;
    }

    equals(categorie: Categorie): boolean {
        return !!this.id && this.id === categorie.id && this.naam === categorie.naam;
    }

    static from(prismaCategorie: { id: number; naam: string }): Categorie {
        // Prisma retourneert altijd een id, dus hier maken we een geldig object
        return new Categorie(prismaCategorie);
    }
}