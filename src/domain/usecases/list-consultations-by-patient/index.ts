import type { IConsultationRepository } from "../../repositories/interface/IConsultationRepository";
import type { IPatientRepository } from "../../repositories/interface/IPatitentRepository";
import type { IListConsultationsByPatientUseCase } from "./typing";

class ListConsultationsByPatientUseCase implements IListConsultationsByPatientUseCase {
  constructor(
    private patientRepository: IPatientRepository
  ) { }

  async execute(patientId: number) {
    return await this.patientRepository.listConsultantsById(patientId);
  }
};

export { ListConsultationsByPatientUseCase }