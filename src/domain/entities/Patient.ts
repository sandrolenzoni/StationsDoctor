import type { IPatient } from "./interface/IPatient";

class Patient implements IPatient {
  constructor(
    public readonly id: number,
    public name: string,
    public cpf: string,
    public birthDate: Date,
  ) { }
};

export { Patient };