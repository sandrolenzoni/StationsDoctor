import type { Medical } from "../../entities/Medical";

interface IRequestListAvailableMedical {
  initialHour: Date;
  specialityId: string;
};

interface IListAviableMedicalsUseCase {
  execute: (data: IRequestListAvailableMedical) => Promise<Medical[]>;
}

export { IRequestListAvailableMedical, IListAviableMedicalsUseCase };