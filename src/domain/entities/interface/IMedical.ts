import type { ISpeciality } from "./ISpeciality";

interface IMedical {
  id: number;
  name: string;
  speciality: ISpeciality;
  crm: string;
};

export {
  IMedical
}