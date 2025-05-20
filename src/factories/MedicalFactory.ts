import { MedicalRepository } from "../domain/repositories/MedicalRepository";
import { CreateMedicalUseCase } from "../domain/usecases/create-medical";
import { GetSpecialityByIdUseCase } from "../domain/usecases/get-speciality-by-id";
import { ListAvailableMedicalUseCase } from "../domain/usecases/list-available-medicals";
import { ListConsultationsByMedicalUseCase } from "../domain/usecases/list-consultations-by-medical";
import { MedicalController } from "../presentation/controllers/MedicalController";

import { getSpecialityByIdUseCase, specialityRepository } from "./SpecialityFactory";

const medicalRepository = new MedicalRepository(specialityRepository);

const createMedicalUseCase = new CreateMedicalUseCase(medicalRepository);
const listAvailableMedicalUseCase = new ListAvailableMedicalUseCase(medicalRepository, specialityRepository);
const listConsultationsByMedicalUseCase = new ListConsultationsByMedicalUseCase(medicalRepository)

const medicalController = new MedicalController(
  createMedicalUseCase,
  listAvailableMedicalUseCase,
  listConsultationsByMedicalUseCase,
  getSpecialityByIdUseCase
);

export { medicalController, medicalRepository };