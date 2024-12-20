-- CreateTable
CREATE TABLE "Recept" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "beschrijving" TEXT NOT NULL,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "Recept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kookstap" (
    "id" SERIAL NOT NULL,
    "stapBeschrijving" TEXT NOT NULL,
    "receptId" INTEGER NOT NULL,

    CONSTRAINT "Kookstap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gebruiker" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Gebruiker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gebruiker_username_key" ON "Gebruiker"("username");

-- AddForeignKey
ALTER TABLE "Recept" ADD CONSTRAINT "Recept_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kookstap" ADD CONSTRAINT "Kookstap_receptId_fkey" FOREIGN KEY ("receptId") REFERENCES "Recept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
