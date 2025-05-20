import type { ISpeciality } from "./interface/ISpeciality";

class Speciality implements ISpeciality {
  constructor(
    public readonly id: string,
    public name: string,
    public consultationDurationMinutes: number,
  ) { }
};

export { Speciality };