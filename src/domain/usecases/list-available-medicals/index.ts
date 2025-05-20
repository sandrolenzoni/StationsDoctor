import { ConsultationService } from "../../../services/ConsultationService";
import type { IMedicalRepository } from "../../repositories/interface/IMedicalRepository";
import type { ISpecialityRepository } from "../../repositories/interface/ISpecialityRepository";
import type { IListAviableMedicalsUseCase, IRequestListAvailableMedical } from "./typing";

class ListAvailableMedicalUseCase implements IListAviableMedicalsUseCase {
  private consultationService: ConsultationService;

  constructor(
    private medicalRepository: IMedicalRepository,
    private specialityRepository: ISpecialityRepository

  ) {
    this.consultationService = new ConsultationService(this.medicalRepository)
  }

  async execute({ initialHour, specialityId }: IRequestListAvailableMedical) {
    const speciality = await this.specialityRepository.getById(specialityId);
    const endHour = this.consultationService.calculateFinalHour(initialHour, speciality.consultationDurationMinutes)
    return await this.medicalRepository.findAvailableMedical({ initialHour, endHour, specialityId });
  }
};

export { ListAvailableMedicalUseCase }