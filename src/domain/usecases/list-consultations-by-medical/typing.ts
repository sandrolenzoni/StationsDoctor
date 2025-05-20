import type { IConsultation } from "../../entities/interface/IConsultation";
import type { IMedical } from "../../entities/interface/IMedical";

interface IListConsultantsByProfessionalIdResponse {
  medical: IMedical,
  consultations: Omit<IConsultation, 'medical'>[]
}

interface IListConsultationsByProfessionalUseCase {
  execute: (professionalId: number) => Promise<IListConsultantsByProfessionalIdResponse | number>;
}

export { IListConsultationsByProfessionalUseCase };