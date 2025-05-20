import type { Medical } from "../../entities/Medical";

interface IListAllMedicalsUseCase {
  execute: () => Promise<Medical[]>;
}

export { IListAllMedicalsUseCase };