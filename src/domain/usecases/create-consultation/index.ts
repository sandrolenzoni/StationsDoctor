import { ConsultationService } from "../../../services/ConsultationService";
import type { Medical } from "../../entities/Medical";
import type { IConsultationRepository } from "../../repositories/interface/IConsultationRepository";
import type { IMedicalRepository } from "../../repositories/interface/IMedicalRepository";
import type { ISpecialityRepository } from "../../repositories/interface/ISpecialityRepository";
import type { ICreateConsusltationUseCase, IExecuteError, IRequestCreateConsultation } from "./typing";



class CreateConsultationUseCase implements ICreateConsusltationUseCase {
  private consultionService: ConsultationService;

  constructor(
    private consultationRepository: IConsultationRepository,
    private specialityRepository: ISpecialityRepository,
    private medicalRepository: IMedicalRepository
  ) {
    this.consultionService = new ConsultationService(medicalRepository);
  };

  async isPatientAvailable(initialHour: Date, endHour: Date, patientId: number) {
    const consultants = await this.consultationRepository.listByPatient(patientId);

    const overlappingConsultation = consultants.find(consultant => {
      return consultant.initialHour < endHour && initialHour < consultant.finalHour;
    });

    return !overlappingConsultation;
  }

  async execute({ initialHour, patientId, professionalId }: IRequestCreateConsultation) {
    const medical = await this.medicalRepository.getById(professionalId) as Medical;
    const speciality = await this.specialityRepository.getById(medical.speciality.id);
    const finalHour = this.consultionService.calculateFinalHour(initialHour, speciality.consultationDurationMinutes)
    const isWithinOperatingHours = this.consultionService.isWithinOperatingHours(initialHour, finalHour);

    if (!isWithinOperatingHours) {
      return { "message": "Fora do horário de serviço" };
    }

    const isMedicalAvailable = await this.consultionService.isMedicalAvailable(
      professionalId,
      speciality,
      initialHour
    );

    const isPatientAvailable = await this.isPatientAvailable(initialHour, finalHour, patientId);
    const isInHoliday = await this.consultionService.isInHoliday(initialHour)
    if (isInHoliday) return { "message": "Não pode solicitar serviço no feriado" }
    if (!isPatientAvailable) return { "message": "O paciente possui outra consulta no mesmo horário" };
    if (!isMedicalAvailable) {
      return { "message": "O profissional não está disponível para o horário solicitado" };
    }

    return await this.consultationRepository.create({ initialHour, finalHour, patientId, professionalId });
  }
};

export { CreateConsultationUseCase }