import type { Speciality } from "../../entities/Speciality";


interface IGetSpecialityByIdUseCase {
  execute: (specialityId: string) => Promise<Speciality>;
}

export {
  IGetSpecialityByIdUseCase
};