import type { Request, Response } from "express";
import type { ICreateConsusltationUseCase } from "../../domain/usecases/create-consultation/typing";
import { createConsultantSchema } from "../../schemas/CreateConsultantSchema";

class ConsultationController {
  constructor(
    private readonly createConsultationUseCase: ICreateConsusltationUseCase
  ) { }

  create = async (request: Request, response: Response): Promise<void> => {
    const { data, success, error } = createConsultantSchema.safeParse(request.body);
    if (!success) {
      response.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((e) => ({
          campo: e.path.join("."),
          mensagem: e.message
        }))
      });
      return;
    };
    const { date, patientId, professionalId } = data;
    const created = await this.createConsultationUseCase.execute({ initialHour: date, patientId, professionalId });

    response.status(created.hasOwnProperty('message') ? 400 : 201).json(created);
    return;
  }
};

export { ConsultationController }