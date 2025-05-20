import type { IMedical } from "./IMedical";
import type { IPatient } from "./IPatient";

interface IConsultation {
  id: number;
  medical: IMedical;
  patient: Omit<IPatient, 'birthDate'>;
  initialHour: Date;
  finalHour: Date;
}

export { IConsultation };