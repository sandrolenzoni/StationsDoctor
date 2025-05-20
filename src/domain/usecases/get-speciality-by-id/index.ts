import type { ISpecialityRepository } from "../../repositories/interface/ISpecialityRepository";
import type { IGetSpecialityByIdUseCase } from "./typing";

class GetSpecialityByIdUseCase implements IGetSpecialityByIdUseCase {
  constructor(
    private specialityRepository: ISpecialityRepository
  ) { }

  async execute(specialityId: string) {
    return await this.specialityRepository.getById(specialityId);
  }
};

export { GetSpecialityByIdUseCase }