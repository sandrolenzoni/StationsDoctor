import type { IConsultation } from "../../entities/interface/IConsultation";
import type { IPatient } from "../../entities/interface/IPatient";

interface IListConsultantsByPatientIdResponse {
  patient: IPatient,
  consultations: Omit<IConsultation, 'patient'>[]
}

interface IListConsultationsByPatientUseCase {
  execute: (patientId: number) => Promise<IListConsultantsByPatientIdResponse | number>;
}

export { IListConsultationsByPatientUseCase };