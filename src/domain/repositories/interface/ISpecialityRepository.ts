import type { Speciality } from "../../entities/Speciality";

interface ISpecialityRepository {
  getById(id: string): Promise<Speciality>;
}

export { ISpecialityRepository };