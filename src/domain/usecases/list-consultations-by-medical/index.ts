import type { IMedicalRepository } from "../../repositories/interface/IMedicalRepository";
import type { IListConsultationsByProfessionalUseCase } from "./typing";

class ListConsultationsByMedicalUseCase implements IListConsultationsByProfessionalUseCase {
  constructor(
    private medicalRepository: IMedicalRepository
  ) { }

  async execute(professionalId: number) {
    return await this.medicalRepository.listConsultantsByProfessionalId(professionalId);
  }
};

export { ListConsultationsByMedicalUseCase }