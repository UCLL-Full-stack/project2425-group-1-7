import gebruikerDb from '../domain/data-acces/gebruiker.db';
import { Gebruiker } from '../domain/model/Gebruiker';
import { GebruikerInput,AuthenticationResponse } from '../types/types';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from 'express-jwt';
import { generateJwtToken } from "../util/jwt";


const getAllGebruikers = async (): Promise<Gebruiker[]> => {
    return await gebruikerDb.getAllGebruikers();
};

const createGebruiker = async ({ username, password, role }: GebruikerInput): Promise<Gebruiker> => {
    // Controleer of gebruiker al bestaat
    const existingGebruiker = await gebruikerDb.getGebruikerByUsername(username);
    if (existingGebruiker) {
        throw new Error("Gebruiker met deze gebruikersnaam bestaat al");
    }

    // Wachtwoord versleutelen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creëer een nieuwe gebruiker
    const gebruikerInput = new Gebruiker({ username, password: hashedPassword, role });
    return await gebruikerDb.createGebruiker(gebruikerInput);
};

const getGebruikerById = async (id: number): Promise<Gebruiker> => {
    const gebruiker = await gebruikerDb.getGebruikerById(id);
    if (!gebruiker) {
        throw new Error("Gebruiker niet gevonden");
    }
    return gebruiker;
};

const deleteGebruikerById = async (id: number, { role }: { role: string }): Promise<boolean> => {
    if (role.toLowerCase() !== 'admin') {
        throw new UnauthorizedError('credentials_required', { message: "Je hebt geen toestemming om deze gebruiker te verwijderen" });
    }

    const deletedGebruiker = await gebruikerDb.deleteGebruikerById(id);
    return Boolean(deletedGebruiker); // Return true if user was deleted, false otherwise
};
// function to get a user by username
const getGebruikerByUsername = async ({ username }: { username: string }): Promise<Gebruiker> => {
    const user = await gebruikerDb.getGebruikerByUsername(username);
    if(!user){
        throw new Error(`User with username ${username} does not exist.`);
    }
    return user;
}

//functie to authenticate a user 
const authenticate =async ({ username, password }: GebruikerInput): Promise<AuthenticationResponse> => {
    const user = await getGebruikerByUsername({username});

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        throw new Error(`Incorrect password.`);
    }

    return {
        token: generateJwtToken({ username, role: user.role }),
        username,
        role: user.role,

    }
};

export default {
    getAllGebruikers,
    createGebruiker,
    getGebruikerById,
    deleteGebruikerById,
    getGebruikerByUsername,
    authenticate,

};