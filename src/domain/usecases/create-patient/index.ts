import type { IPatientRepository } from "../../repositories/interface/IPatitentRepository";
import type { ICreatePatientUseCase, IRequestCreatePatient } from "./typing";

class CreatePatientUseCase implements ICreatePatientUseCase {
  constructor(
    private patientRepository: IPatientRepository
  ) { }

  async execute(data: IRequestCreatePatient) {
    return await this.patientRepository.create(data);
  };

  async existsCPF(cpf: string) {
    return await this.patientRepository.existsCPF(cpf);
  }
};

export {
  CreatePatientUseCase
}