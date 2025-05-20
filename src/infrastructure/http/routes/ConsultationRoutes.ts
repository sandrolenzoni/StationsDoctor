import { Router, type Response } from "express";
import { consultationController } from "../../../factories/ConsultationFactory";

const router = Router();


/** 
 * @swagger
 * /api/consultas:
 *   post:
 *     tags:
 *       - Consultas
 *     summary: Criar um nova consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                patientId:
 *                  type: number
 *                professionalId:
 *                  type: number
 *                date:
 *                  type: string
 *                  format: date
 *              required:
 *                - patientId
 *                - professionalId
 *                - date
 *     responses:
 *       200:
 *         description: Retorna a consulta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
*/
router.post('/consultas', consultationController.create.bind(consultationController));
export { router as consultantRoutes };
