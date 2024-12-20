/**
 * @description Types voor de vier entiteiten: Recept, Kookstap, Categorie en Gebruiker
 */

export type ReceptInput = {
    naam: string;
    beschrijving: string;
    categorieId: number; // Verwijzing naar de gekoppelde categorie
};

export type Recept = {
    id: number;
    naam: string;
    beschrijving: string;
    categorieId: number;
    kookstappen?: Kookstap[]; // Wordt alleen geladen als expliciet opgevraagd
};

export type KookstapInput = {
    stapBeschrijving: string;
    receptId: number;
};

export type Kookstap = {
    id: number;
    stapBeschrijving: string;
    receptId: number;
};

export type CategorieInput = {
    naam: string;
};

export type Categorie = {
    id: number;
    naam: string;
    recepten?: Recept[]; // Optioneel, alleen geladen bij behoefte
};

export type GebruikerInput = {
    username: string;
    password: string;
    role: "admin" | "editor" | "viewer"; // Bekende rollen in het domein
};

export type Gebruiker = {
    id: number;
    username: string;
    password: string; // In praktijk wordt dit gehashed opgeslagen
    role: string; // Rollen zoals "admin", "editor", of "viewer"
};

export type AuthenticationResponse = {
    token: string,
    username: string,
    role:string
};

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    auth: {
        id: number;
        role: string;
        username: string;
    };
}

