import { Router, type Response } from "express";
import { MedicalController } from "../../../presentation/controllers/MedicalController";
import { medicalController } from "../../../factories/MedicalFactory";

const router = Router();


/** 
 * @swagger
 * /api/profissionais:
 *   post:
 *     tags:
 *       - Profissionais
 *     summary: Criar um novo profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                specialityId:
 *                  type: string
 *                crm:
 *                  type: string
 *              required:
 *                - name
 *                - crm
 *                - specialityId
 *     responses:
 *       200:
 *         description: Retorna a lista de profissionais
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
router.post('/profissionais', medicalController.create.bind(medicalController));
/** 
 * @swagger
 * /api/profissionais/disponiveis:
*   post:
 *     tags:
 *       - Profissionais
 *     summary: Verifica quais profissionais estão disponíveis
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                specialityId:
 *                  type: string
 *                date:
 *                  type: string
 *                  formate: date
 *              required:
 *                - date
 *                - specialityId
 *     responses:
 *       200:
 *         description: Retorna a lista de profissionais
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
router.post('/profissionais/disponiveis', medicalController.findAvailable.bind(medicalController));

/**
 * @swagger
 * /api/profissionais/{id}/consultas:
 *   get:
 *     tags:
 *       - Profissionais
 *     summary: Listar consultas de um profissional por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Retorna a lista de consultas do profissional
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   initialHour:
 *                     type: string
 *                     format: date-time
 *                   finalHour:
 *                     type: string
 *                     format: date-time
 *                   patientId:
 *                     type: integer
 *                   professionalId:
 *                     type: integer
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/profissionais/:id/consultas', medicalController.consultants.bind(medicalController));


export { router as professionalRoutes };
