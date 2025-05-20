import { db } from "../../infrastructure/database/prisma";
import { consultantRoutes } from "../../infrastructure/http/routes/ConsultationRoutes";
import { Consultation } from "../entities/Consultation";
import { Medical } from "../entities/Medical";
import type { IAvailableMedical, ICreateNewMedical, IListConsultantsByProfessionalIdResponse, IMedicalRepository } from "./interface/IMedicalRepository";
import type { SpecialityRepository } from "./SpecialityRepository";

class MedicalRepository implements IMedicalRepository {

  private readonly databaseProfessional = db.professional;

  constructor(
    private readonly specialityRepository: SpecialityRepository
  ) { }

  async getById(id: number) {
    const data = await this.databaseProfessional.findUnique({ where: { id } });
    if (!data) return null;
    return new Medical(
      data.id,
      data.name,
      data.crm as string,
      await this.specialityRepository.getById(data.speciality as string)
    )
  }

  async getByCRM(crm: string) {
    const data = await this.databaseProfessional.findUnique({
      where: { crm },
    });

    if (!data) return null;

    return new Medical(
      data.id,
      data.name,
      data.crm as string,
      await this.specialityRepository.getById(data.speciality as string)
    );
  }

  async listAll() {
    let data: Medical[] = []
    const listMedicals = await this.databaseProfessional.findMany({
      where: {
        professionalType: "MEDICAL"
      }
    });

    if (listMedicals.length === 0) return [];

    listMedicals.map(async (medical) => {
      const speciality = await this.specialityRepository.getById(medical.speciality as string)
      data.push(new Medical(
        medical.id,
        medical.name,
        medical.crm as string,
        speciality
      ))

    })

    return data;

  }

  async findAvailableMedical({ initialHour, endHour, specialityId }: IAvailableMedical) {

    const speciality = await this.specialityRepository.getById(specialityId);

    const availableMedicals = await this.databaseProfessional.findMany({
      where: {
        speciality: speciality.id,
        professionalType: "MEDICAL",
        consultations: {
          none: {
            AND: [
              { initialHour: { lt: endHour } },
              { finalHour: { gt: initialHour } }
            ]
          }
        }
      },
    });

    if (availableMedicals.length === 0) return [];

    return await Promise.all(
      availableMedicals.map(async (medical) =>
        new Medical(
          medical.id,
          medical.name,
          medical.crm as string,
          await this.specialityRepository.getById(medical.speciality as string)
        ))
    )
  }

  async listConsultantsByProfessionalId(id: number) {
    const data = await this.databaseProfessional.findUnique({
      where: { id },
      select: {
        crm: true,
        name: true,
        speciality: true,
        consultations: {
          select: {
            finalHour: true,
            id: true,
            initialHour: true,
            patient: {
              select: {
                id: true,
                name: true,
                cpf: true,
              }
            }
          }
        }
      }
    });

    if (!data) return 404;
    const speciality = await this.specialityRepository.getById(data.speciality as string);
    const consultations = data.consultations.map(consultantion => {
      return {
        id: consultantion.id,
        initialHour: consultantion.initialHour,
        finalHour: consultantion.finalHour,
        patient: consultantion.patient
      }
    })
    return {
      medical: {
        id,
        crm: data.crm,
        name: data.name,
        speciality
      },
      consultations: consultations
    } as IListConsultantsByProfessionalIdResponse

  }

  async create(newMedical: ICreateNewMedical) {
    const { crm, name, specialityId } = newMedical;

    await this.databaseProfessional.create({
      data: {
        name,
        crm,
        speciality: specialityId,
        professionalType: "MEDICAL"
      }
    });
    return this.listAll();
  }

};

export { MedicalRepository };