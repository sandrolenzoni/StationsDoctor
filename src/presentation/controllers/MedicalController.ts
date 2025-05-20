import type { Request, Response } from "express";
import { createMedicalSchema, type CreateMedicalType } from "../../schemas/CreateMedicalSchema";
import { findAvailableMedicalSchema, type FindAvailableMedicalType } from "../../schemas/FindAvailableMedicalSchema";
import type { ICreateMedicalUseCase } from "../../domain/usecases/create-medical/typing";
import type { IGetSpecialityByIdUseCase } from "../../domain/usecases/get-speciality-by-id/typing";
import type { IListAviableMedicalsUseCase } from "../../domain/usecases/list-available-medicals/typing";
import type { IListConsultationsByProfessionalUseCase } from "../../domain/usecases/list-consultations-by-medical/typing";

class MedicalController {

  constructor(
    private readonly createMedicalUseCase: ICreateMedicalUseCase,
    private readonly listAvailableMedicalUseCase: IListAviableMedicalsUseCase,
    private readonly listConsultationsByMedicalUseCase: IListConsultationsByProfessionalUseCase,
    private readonly getSpecialityByIdUseCase: IGetSpecialityByIdUseCase
  ) { }


  consultants = async (request: Request, response: Response): Promise<void> => {
    const consultants = await this.listConsultationsByMedicalUseCase.execute(parseInt(request.params.id));
    response.status(200).json(consultants)
    return;
  }

  findAvailable = async (request: Request, response: Response): Promise<void> => {
    const { data, success, error } = findAvailableMedicalSchema.safeParse(request.body);
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

    const { date, specialityId } = data as FindAvailableMedicalType;

    const speciality = await this.getSpecialityByIdUseCase.execute(specialityId as string);

    if (!speciality) {
      response.status(400).json({
        message: "Especialidade não encontrada"
      });
      return;
    }

    const availableMedicals = await this.listAvailableMedicalUseCase.execute({ initialHour: date, specialityId });
    response.status(200).json(availableMedicals);
    return;

  }

  create = async (request: Request, response: Response): Promise<void> => {
    console.log(request.body)
    const { data, success, error } = createMedicalSchema.safeParse(request.body);
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
    const newMedical = await this.createMedicalUseCase.execute(data as CreateMedicalType);
    response.status(201).json(newMedical);
    return;
  }
};

export { MedicalController }