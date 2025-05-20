import { Router, type Response } from "express";
import { patientController } from "../../../factories/PatientFactory";

const router = Router();


/** 
 * @swagger
 * /api/pacientes:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Criar um novo pacient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                cpf:
 *                  type: string
 *                birthDate:
 *                  type: string
 *                  formate: date
 *              required:
 *                - name
 *                - cpf
 *                - birthDate
 *     responses:
 *       200:
 *         description: Retorna o paciente
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
 *                   cpf:
 *                     type: string
 *                   birthDate:
 *                     type: date
*/
router.post('/pacientes', patientController.create.bind(patientController));
/**
 * @swagger
 * /api/pacientes/{id}/consultas:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Listar consultas de um paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Retorna a lista de consultas do paciente
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
router.get('/pacientes/:id/consultas', patientController.consultants.bind(patientController));

export { router as patientRoutes };
