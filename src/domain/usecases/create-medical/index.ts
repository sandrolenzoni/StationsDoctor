import type { IMedicalRepository } from "../../repositories/interface/IMedicalRepository";
import type { ICreateMedicalUseCase, IRequestCreateMedical } from "./typing";

class CreateMedicalUseCase implements ICreateMedicalUseCase {
  constructor(
    private medicalRepository: IMedicalRepository
  ) { }

  async execute({ crm, name, specialityId }: IRequestCreateMedical) {
    return await this.medicalRepository.create({ crm, name, specialityId });
  }
};

export { CreateMedicalUseCase }