import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import receptRoutes from './controller/recept.routes';
import gebruikerRoutes from './controller/gebruiker.routes';
import categorieRoutes from './controller/categorie.routes'; // Voeg categorie routes toe
import kookstapRoutes from './controller/kookstap.routes'; // Voeg kookstap routes toe

dotenv.config();

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());
// Registreer routes
app.use('/recepten', receptRoutes);   // Recept routes
app.use('/gebruikers', gebruikerRoutes); // Gebruiker routes
app.use('/categorieen', categorieRoutes); // Categorie routes
app.use('/kookstappen', kookstapRoutes); // Kookstap routes

// Swagger API-documentatie
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup({}));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is gestart op http://localhost:${PORT}`);
});