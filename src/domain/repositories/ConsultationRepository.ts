import { db } from "../../infrastructure/database/prisma";
import { Consultation } from "../entities/Consultation";
import { Medical } from "../entities/Medical";
import { Patient } from "../entities/Patient";
import type { IConsultationRepository, ICreateConsultation } from "./interface/IConsultationRepository";
import type { ISpecialityRepository } from "./interface/ISpecialityRepository";

class ConsultationRepository implements IConsultationRepository {

  private readonly database = db.consultation;

  constructor(
    private specialityRepository: ISpecialityRepository
  ) { }

  async create({ initialHour, finalHour, patientId, professionalId }: ICreateConsultation) {

    const consultation = await this.database.create({
      data: {
        patientId,
        professionalId,
        initialHour,
        finalHour
      },
      select: {
        id: true,
        initialHour: true,
        finalHour: true,
        professional: {
          select: {
            id: true,
            name: true,
            crm: true,
            speciality: true
          }
        },
        patient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            birthDate: true,
          }
        }
      }
    });

    return new Consultation(
      consultation.id,
      new Medical(consultation.professional.id, consultation.professional.name, consultation.professional.name, await this.specialityRepository.getById(consultation.professional.speciality as string)),
      new Patient(consultation.patient.id, consultation.patient.name, consultation.patient.cpf, consultation.patient.birthDate),
      consultation.initialHour,
      consultation.finalHour
    )
  }


  async listByPatient(patientId: number) {
    const data: Consultation[] = [];
    const consultations = await this.database.findMany({
      where: {
        patientId: patientId
      },
      select: {
        id: true,
        initialHour: true,
        finalHour: true,
        professional: {
          select: {
            id: true,
            name: true,
            crm: true,
            speciality: true
          }
        },
        patient: {
          select: {
            id: true,
            name: true,
            cpf: true,
            birthDate: true,
          }
        }
      }
    });
    consultations.map(async (consultation) =>
      data.push(new Consultation(
        consultation.id,
        new Medical(consultation.professional.id, consultation.professional.name, consultation.professional.name, await this.specialityRepository.getById(consultation.professional.speciality as string)),
        new Patient(consultation.patient.id, consultation.patient.name, consultation.patient.cpf, consultation.patient.birthDate),
        consultation.initialHour,
        consultation.finalHour
      ))
    );
    return data;
  }
};

export { ConsultationRepository }
