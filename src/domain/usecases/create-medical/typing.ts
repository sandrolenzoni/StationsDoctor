import type { Medical } from "../../entities/Medical";

interface IRequestCreateMedical {
  name: string;
  crm: string;
  specialityId: string;
};

interface ICreateMedicalUseCase {
  execute: (data: IRequestCreateMedical) => Promise<Medical[]>;
}

export { IRequestCreateMedical, ICreateMedicalUseCase };