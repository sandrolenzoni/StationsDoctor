import type { IConsultation } from "./interface/IConsultation";
import type { IMedical } from "./interface/IMedical";
import type { IPatient } from "./interface/IPatient";

class Consultation implements IConsultation {
  constructor(
    public id: number,
    public medical: IMedical,
    public patient: IPatient,
    public initialHour: Date,
    public finalHour: Date
  ) { }
};

export { Consultation };