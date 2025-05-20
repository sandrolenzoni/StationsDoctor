import type { IConsultation } from "../../entities/interface/IConsultation";
import type { IMedical } from "../../entities/interface/IMedical";

interface ICreateNewMedical {
  name: string;
  crm: string;
  specialityId: string;
}

interface IAvailableMedical {
  initialHour: Date;
  endHour: Date;
  specialityId: string;
}

interface IListConsultantsByProfessionalIdResponse {
  medical: IMedical,
  consultations: Omit<IConsultation, 'medical'>[]
}


interface IMedicalRepository {
  getById(id: number): Promise<IMedical | null>;
  getByCRM(crm: string): Promise<IMedical | null>;
  findAvailableMedical(data: IAvailableMedical): Promise<IMedical[]>;
  listConsultantsByProfessionalId(professionalId: number): Promise<IListConsultantsByProfessionalIdResponse | number>;
  listAll(): Promise<IMedical[]>;
  create(medical: ICreateNewMedical): Promise<IMedical[]>;
}

export { IMedicalRepository, ICreateNewMedical, IAvailableMedical, IListConsultantsByProfessionalIdResponse };