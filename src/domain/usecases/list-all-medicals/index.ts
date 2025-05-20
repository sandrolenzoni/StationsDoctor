import type { IMedicalRepository } from "../../repositories/interface/IMedicalRepository";
import type { IListAllMedicalsUseCase } from "./typing";

class ListAllMedicalsUseCase implements IListAllMedicalsUseCase {
  constructor(
    private medicalRepository: IMedicalRepository
  ) { }

  async execute() {
    return await this.medicalRepository.listAll();
  }
}
