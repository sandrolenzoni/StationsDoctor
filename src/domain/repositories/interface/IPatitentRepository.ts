import type { IConsultation } from "../../entities/interface/IConsultation";
import type { IPatient } from "../../entities/interface/IPatient";
import type { Patient } from "../../entities/Patient";

interface ICreateNewPatient {
  name: string;
  cpf: string;
  birthDate: Date;
}

interface IListConsultantsByPatientIdResponse {
  patient: IPatient,
  consultations: Omit<IConsultation, 'patient'>[]
}

interface IPatientRepository {
  create(patient: ICreateNewPatient): Promise<Patient[]>;
  listConsultantsById(patientId: number): Promise<IListConsultantsByPatientIdResponse | number>;
  existsCPF(cpf: string): Promise<boolean>;
}

export {
  ICreateNewPatient,
  IPatientRepository,
  IListConsultantsByPatientIdResponse
}