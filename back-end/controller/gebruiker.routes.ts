import { Router, Request, Response, NextFunction } from 'express';
import gebruikerService from '../service/gebruiker.service';
import { AuthenticatedRequest, GebruikerInput } from '../types/types';

const gebruikerRouter = Router();

/**
 * @swagger
 * /gebruikers:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Haal alle gebruikers op.
 *      tags:
 *          - Gebruikers
 *      responses:
 *          200:
 *              description: Lijst van gebruikers.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Gebruiker'
 */


gebruikerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gebruikers = await gebruikerService.getAllGebruikers();
        res.status(200).json(gebruikers);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /gebruikers/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Haal een specifieke gebruiker op.
 *      tags:
 *          - Gebruikers
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de gebruiker.
 *      responses:
 *          200:
 *              description: Gezochte gebruiker.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Gebruiker'
 */
gebruikerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const gebruiker = await gebruikerService.getGebruikerById(id);
        res.status(200).json(gebruiker);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /gebruikers:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Maak een nieuwe gebruiker aan.
 *      tags:
 *          - Gebruikers
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GebruikerInput'
 *      responses:
 *          201:
 *              description: Aangemaakte gebruiker.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Gebruiker'
 */
gebruikerRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gebruikerInput: GebruikerInput = req.body;
        const nieuweGebruiker = await gebruikerService.createGebruiker(gebruikerInput);
        res.status(201).json(nieuweGebruiker);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /gebruikers/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: Verwijder een gebruiker.
 *      tags:
 *          - Gebruikers
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de gebruiker.
 *      responses:
 *          204:
 *              description: Gebruiker verwijderd.
 */


gebruikerRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const { role } = (req as AuthenticatedRequest).auth;
        console.log(role, 'eerst');
        const deleted = await gebruikerService.deleteGebruikerById(id, { role });
        res.status(204).json(deleted);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /gebruikers/login:
 *  post:
 *      summary: Log een gebruiker in.
 *      tags:
 *          - Gebruikers
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GebruikerInput'
 *      responses:
 *          200:
 *              description: Ingelogd met token.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 */
gebruikerRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gebruikerInput: GebruikerInput = req.body;
        const authResponse = await gebruikerService.authenticate(gebruikerInput);
        res.status(200).json(authResponse);
    } catch (error) {
        next(error);
    }
});

export default gebruikerRouter;