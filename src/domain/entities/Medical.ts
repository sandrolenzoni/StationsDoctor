import type { ProfessionalType } from "../../infrastructure/database/prisma/generated/prisma";
import type { IMedical } from "./interface/IMedical";
import type { Speciality } from "./Speciality";

class Medical implements IMedical {
  constructor(
    public readonly id: number,
    public name: string,
    public crm: string,
    public speciality: Speciality,
  ) { }

};

export { Medical }