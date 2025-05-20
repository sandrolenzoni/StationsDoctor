import { ConsultationRepository } from "../domain/repositories/ConsultationRepository";
import { CreateConsultationUseCase } from "../domain/usecases/create-consultation";
import { ConsultationController } from "../presentation/controllers/ConsultationController";
import { medicalRepository } from "./MedicalFactory";
import { specialityRepository } from "./SpecialityFactory";

const consultationRepository = new ConsultationRepository(
  specialityRepository
);

const createConsultationUseCase = new CreateConsultationUseCase(
  consultationRepository,
  specialityRepository,
  medicalRepository
);


const consultationController = new ConsultationController(
  createConsultationUseCase

)
export { consultationRepository, consultationController };