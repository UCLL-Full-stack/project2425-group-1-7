import { Router, Request, Response, NextFunction } from 'express';
import kookstapService from '../service/kookstap.service';
import { KookstapInput } from '../types/types';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Kookstap:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                  stapBeschrijving:
 *                      type: string
 *                      description: Beschrijving van de kookstap.
 *                  receptId:
 *                      type: number
 *                      description: ID van het gekoppelde recept.
 *          KookstapInput:
 *              type: object
 *              properties:
 *                  stapBeschrijving:
 *                      type: string
 *                      description: Beschrijving van de kookstap.
 *                  receptId:
 *                      type: number
 *                      description: ID van het gekoppelde recept.
 */

/**
 * @swagger
 * /kookstappen:
 *  get:
 *      summary: Haal alle kookstappen op.
 *      tags:
 *          - Kookstappen
 *      responses:
 *          200:
 *              description: Een lijst van kookstappen.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Kookstap'
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const receptId = req.query.receptId ? parseInt(req.query.receptId as string, 10) : undefined;

        // Als receptId is opgegeven, haal kookstappen op die bij dat recept horen
        const kookstappen = receptId !== undefined
            ? await kookstapService.getKookstapById(receptId)
            : await kookstapService.getAllKookstappen(); // Anders haal alle kookstappen op

        res.status(200).json(kookstappen);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /kookstappen/{id}:
 *  get:
 *      summary: Haal een specifieke kookstap op.
 *      tags:
 *          - Kookstappen
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de kookstap.
 *      responses:
 *          200:
 *              description: De opgevraagde kookstap.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Kookstap'
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const kookstap = await kookstapService.getKookstapById(id);
        res.status(200).json(kookstap);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /kookstappen:
 *  post:
 *      summary: Maak een nieuwe kookstap aan.
 *      tags:
 *          - Kookstappen
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/KookstapInput'
 *      responses:
 *          201:
 *              description: De aangemaakte kookstap.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Kookstap'
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const kookstapInput: KookstapInput = req.body;
        const nieuweKookstap = await kookstapService.createKookstap(kookstapInput);
        res.status(201).json(nieuweKookstap);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /kookstappen/{id}:
 *  put:
 *      summary: Werk een bestaande kookstap bij.
 *      tags:
 *          - Kookstappen
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de kookstap die moet worden bijgewerkt.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/KookstapInput'
 *      responses:
 *          200:
 *              description: De bijgewerkte kookstap.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Kookstap'
 */
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const kookstapInput: KookstapInput = req.body;
        const role = req.body.role; // Assuming role is part of the request body
        const updatedKookstap = await kookstapService.updateKookstap(id, kookstapInput);
        res.status(200).json(updatedKookstap);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /kookstappen/{id}:
 *  delete:
 *      summary: Verwijder een kookstap.
 *      tags:
 *          - Kookstappen
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: integer
 *            required: true
 *            description: ID van de kookstap die verwijderd moet worden.
 *      responses:
 *          204:
 *              description: De kookstap is succesvol verwijderd.
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const role = req.body.role; // Assuming role is part of the request body
        await kookstapService.deleteKookstapById(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;