import type { Consultation } from "../../entities/Consultation";

interface IRequestCreateConsultation {
  initialHour: Date;
  professionalId: number;
  patientId: number;
}

interface IExecuteError {
  message: string;
}

interface ICreateConsusltationUseCase {
  execute: (data: IRequestCreateConsultation) => Promise<Consultation | IExecuteError>;
  isPatientAvailable: (initialHour: Date, endHour: Date, patientId: number) => Promise<boolean>;
}

export {
  ICreateConsusltationUseCase,
  IRequestCreateConsultation,
  IExecuteError
}
