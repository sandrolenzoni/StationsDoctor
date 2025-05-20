import { PatientRepository } from "../domain/repositories/PatientRepository";
import { CreatePatientUseCase } from "../domain/usecases/create-patient";
import { ListConsultationsByPatientUseCase } from "../domain/usecases/list-consultations-by-patient";
import { PatientController } from "../presentation/controllers/PatientController";
import { specialityRepository } from "./SpecialityFactory";


const patientRepository = new PatientRepository(
  specialityRepository
)

const createPatientUseCase = new CreatePatientUseCase(patientRepository)
const listConsultByPatientUseCase = new ListConsultationsByPatientUseCase(
  patientRepository
)

const patientController = new PatientController(
  createPatientUseCase,
  listConsultByPatientUseCase
);

export { patientController }