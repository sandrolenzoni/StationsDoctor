import type { Patient } from "../../entities/Patient";

interface IRequestCreatePatient {
  name: string;
  cpf: string;
  birthDate: Date;
};

interface ICreatePatientUseCase {
  execute: (data: IRequestCreatePatient) => Promise<Patient[]>;
  existsCPF: (cpf: string) => Promise<boolean>;
}

export { ICreatePatientUseCase, IRequestCreatePatient };