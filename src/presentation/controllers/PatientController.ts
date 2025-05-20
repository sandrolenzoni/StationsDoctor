import type { Request, Response } from "express";
import type { ICreatePatientUseCase } from "../../domain/usecases/create-patient/typing";
import { createPatientSchema, type CreatePatientType } from "../../schemas/CreatePatientSchema";
import type { IListConsultationsByPatientUseCase } from "../../domain/usecases/list-consultations-by-patient/typing";

class PatientController {

  constructor(
    private readonly createPatientUseCase: ICreatePatientUseCase,
    private readonly listConsultByPatientUseCase: IListConsultationsByPatientUseCase
  ) { }


  consultants = async (request: Request, response: Response): Promise<void> => {
    const consultants = await this.listConsultByPatientUseCase.execute(parseInt(request.params.id));
    response.status(200).json(consultants)
    return;
  };

  create = async (request: Request, response: Response): Promise<void> => {

    const { data, success, error } = createPatientSchema.safeParse(request.body);
    if (!success) {
      response.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map((e) => ({
          campo: e.code,
          mensagem: e.message
        }))
      });
      return;
    }

    if (await this.createPatientUseCase.existsCPF(data.cpf)) {
      response.status(400).json({ message: "CPF já cadastrado" });
      return;
    }

    const created = await this.createPatientUseCase.execute(data as CreatePatientType);
    response.status(201).json(created);
    return;

  }
};

export { PatientController }