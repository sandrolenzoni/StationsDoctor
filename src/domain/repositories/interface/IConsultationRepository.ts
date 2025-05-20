import type { Consultation } from "../../entities/Consultation";

interface ICreateConsultation {
  initialHour: Date;
  finalHour: Date;
  professionalId: number;
  patientId: number;
}

interface IConsultationRepository {
  listByPatient(patientId: number): Promise<Consultation[]>;
  create(data: ICreateConsultation): Promise<Consultation>;
}

export { IConsultationRepository, ICreateConsultation };