import { SpecialityRepository } from "../domain/repositories/SpecialityRepository";
import { GetSpecialityByIdUseCase } from "../domain/usecases/get-speciality-by-id";

const specialityRepository = new SpecialityRepository();

const getSpecialityByIdUseCase = new GetSpecialityByIdUseCase(specialityRepository);


export { specialityRepository, getSpecialityByIdUseCase };