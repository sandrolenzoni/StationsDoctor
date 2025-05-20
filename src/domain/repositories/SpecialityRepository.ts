import type { ISpecialityRepository } from "./interface/ISpecialityRepository";
import db from '../../infrastructure/database/specialities.json';
import type { Speciality } from "../entities/Speciality";


class SpecialityRepository implements ISpecialityRepository {

  constructor(
    private readonly databaseSpeciality = db
  ) { }

  async getById(id: string) {
    return this.databaseSpeciality.find(speciality => speciality.id === id) as Speciality;
  }
}

export { SpecialityRepository };