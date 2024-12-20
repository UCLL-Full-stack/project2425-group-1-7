export class Kookstap {
    readonly id?: number;
    readonly stapBeschrijving: string;
    readonly receptId: number;

    constructor(kookstap: { id?: number; stapBeschrijving: string; receptId: number }) {
        this.validate(kookstap);
        this.id = kookstap.id;
        this.stapBeschrijving = kookstap.stapBeschrijving;
        this.receptId = kookstap.receptId;
    }

    validate(kookstap: { stapBeschrijving: string; receptId: number }): void {
        if (!kookstap.stapBeschrijving || kookstap.stapBeschrijving.trim().length === 0) {
            throw new Error("Invalid stapBeschrijving");
        }
        if (!kookstap.receptId || kookstap.receptId <= 0) {
            throw new Error("Invalid receptId");
        }
    }

    equals(kookstap: Kookstap): boolean {
        return (
            this.stapBeschrijving === kookstap.stapBeschrijving &&
            this.receptId === kookstap.receptId &&
            this.id === kookstap.id
        );
    }

    static from(prismaKookstap: { id: number; stapBeschrijving: string; receptId: number }): Kookstap {
        return new Kookstap(prismaKookstap);
    }
}