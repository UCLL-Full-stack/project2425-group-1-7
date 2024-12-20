import { Router, Request, Response, NextFunction } from 'express';
import categorieService from '../service/categorie.service';
import { CategorieInput } from '../types/types';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Categorie:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  naam:
 *                      type: string
 *                      description: Naam van de categorie.
 *          CategorieInput:
 *              type: object
 *              properties:
 *                  naam:
 *                      type: string
 *                      description: Naam van de categorie.
 */

/**
 * @swagger
 * /categorieen:
 *  get:
 *      summary: Haal alle categorieën op.
 *      tags:
 *          - Categorieën
 *      responses:
 *          200:
 *              description: Een lijst van categorieën.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Categorie'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categorieen = await categorieService.getAllCategorieen();
        res.status(200).json(categorieen);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categorieen/{id}:
 *  get:
 *      summary: Haal een specifieke categorie op.
 *      tags:
 *          - Categorieën
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de categorie.
 *      responses:
 *          200:
 *              description: De opgevraagde categorie.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categorie'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const categorie = await categorieService.getCategorieById(id);
        res.status(200).json(categorie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categorieen:
 *  post:
 *      summary: Maak een nieuwe categorie aan.
 *      tags:
 *          - Categorieën
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CategorieInput'
 *      responses:
 *          201:
 *              description: De aangemaakte categorie.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categorie'
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categorieInput: CategorieInput = req.body;
        const nieuweCategorie = await categorieService.createCategorie(categorieInput);
        res.status(201).json(nieuweCategorie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /categorieen/{id}:
 *  delete:
 *      summary: Verwijder een categorie.
 *      tags:
 *          - Categorieën
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de categorie die verwijderd moet worden.
 *      responses:
 *          204:
 *              description: De categorie is succesvol verwijderd.
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const role = req.body.role; // Assuming role is part of the request body
        await categorieService.deleteCategorieById(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;