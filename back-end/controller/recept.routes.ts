import { Router, Request, Response, NextFunction } from 'express';
import receptService from '../service/recept.service';
import { ReceptInput } from '../types/types';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Recept:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  naam:
 *                      type: string
 *                      description: Naam van het recept.
 *                  beschrijving:
 *                      type: string
 *                      description: Beschrijving van het recept.
 *                  categorieId:
 *                      type: number
 *                      description: ID van de categorie waartoe het recept behoort.
 *                  kookstappen:
 *                      type: array
 *                      items:
 *                          type: object
 *                      description: Lijst van kookstappen.
 *          ReceptInput:
 *              type: object
 *              properties:
 *                  naam:
 *                      type: string
 *                      description: Naam van het recept.
 *                  beschrijving:
 *                      type: string
 *                      description: Beschrijving van het recept.
 *                  categorieId:
 *                      type: number
 *                      description: ID van de categorie waartoe het recept behoort.
 */

/**
 * @swagger
 * /recepten:
 *  get:
 *      summary: Haal alle recepten op.
 *      tags:
 *          - Recepten
 *      responses:
 *          200:
 *              description: Een lijst van recepten.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Recept'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recepten = await receptService.getAllRecepten();
        res.status(200).json(recepten);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recepten/{id}:
 *  get:
 *      summary: Haal een specifiek recept op.
 *      tags:
 *          - Recepten
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van het recept.
 *      responses:
 *          200:
 *              description: Het opgevraagde recept.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Recept'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const recept = await receptService.getReceptById(id);
        res.status(200).json(recept);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recepten:
 *  post:
 *      summary: Maak een nieuw recept aan.
 *      tags:
 *          - Recepten
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReceptInput'
 *      responses:
 *          201:
 *              description: Het aangemaakte recept.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Recept'
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const receptInput: ReceptInput = req.body;
        const nieuwRecept = await receptService.createRecept(receptInput);
        res.status(201).json(nieuwRecept);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recepten/{id}:
 *  put:
 *      summary: Werk een bestaand recept bij.
 *      tags:
 *          - Recepten
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van het recept dat bijgewerkt moet worden.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ReceptInput'
 *      responses:
 *          200:
 *              description: Het bijgewerkte recept.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Recept'
 */

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const receptInput: ReceptInput = req.body;
        const role = req.body.role; // Assuming role is part of the request body
        const updatedRecept = await receptService.updateRecept(id, receptInput, { role });
        res.status(200).json(updatedRecept);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /recepten/{id}:
 *  delete:
 *      summary: Verwijder een recept.
 *      tags:
 *          - Recepten
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van het recept dat verwijderd moet worden.
 *      responses:
 *          204:
 *              description: Het recept is succesvol verwijderd.
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const role = req.body.role; // Assuming role is part of the request body
        await receptService.deleteRecept(id, { role });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;