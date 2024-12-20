import { Gebruiker as GebruikerPrisma } from '@prisma/client';

export class Gebruiker {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: string;

    constructor(gebruiker: {
        id?: number;
        username: string;
        password: string;
        role: string;
    }) {
        this.id = gebruiker.id;

        if (gebruiker.username.trim().length === 0) throw new Error("Invalid username");
        this.username = gebruiker.username;

        if (gebruiker.password.trim().length === 0) throw new Error("Invalid password");
        this.password = gebruiker.password;

        if (gebruiker.role.trim().length === 0) throw new Error("Invalid role");
        this.role = gebruiker.role;
    }

    equals(gebruiker: Gebruiker): boolean {
        return (
            this.username === gebruiker.username &&
            this.role === gebruiker.role
        );
    }
    

    static from({
        id,
        username,
        password,
        role,
    }: GebruikerPrisma): Gebruiker {
        return new Gebruiker({ id, username, password, role });
    }
}