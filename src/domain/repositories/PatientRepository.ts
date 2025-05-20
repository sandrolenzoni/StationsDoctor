import { db } from "../../infrastructure/database/prisma";
import type { IConsultation } from "../entities/interface/IConsultation";
import { Patient } from "../entities/Patient";
import type { ICreateNewPatient, IListConsultantsByPatientIdResponse, IPatientRepository } from "./interface/IPatitentRepository";
import type { SpecialityRepository } from "./SpecialityRepository";

class PatientRepository implements IPatientRepository {

  private readonly databasePatient = db.patient;

  constructor(
    private specialityRepository: SpecialityRepository
  ) { };

  async existsCPF(cpf: string) {
    return await this.databasePatient.findUnique({
      where: {
        cpf: cpf
      }
    }) ? true : false;
  }

  async list() {
    const data: Patient[] = []
    const patients = await this.databasePatient.findMany({});
    patients.map(patient => {
      data.push(new Patient(patient.id, patient.name, patient.cpf, patient.birthDate))
    });
    return data;
  }


  async listConsultantsById(id: number) {
    const data = await this.databasePatient.findUnique({
      where: { id },
      select: {
        birthDate: true,
        name: true,
        cpf: true,
        consultations: {
          select: {
            finalHour: true,
            id: true,
            initialHour: true,
            professional: {
              select: {
                id: true,
                name: true,
                crm: true,
                speciality: true
              }
            }
          }
        }
      }
    });

    if (!data) return 404;
    const consultations: Omit<IConsultation, 'patient'>[] = []

    data.consultations.map(async (consultantion) => {
      const speciality = await this.specialityRepository.getById(consultantion.professional.speciality as string);
      const professional = { id: consultantion.professional.id, crm: consultantion.professional.crm as string, name: consultantion.professional.name, speciality }
      consultations.push({
        id: consultantion.id,
        initialHour: consultantion.initialHour,
        finalHour: consultantion.finalHour,
        medical: professional
      })
    })
    return {
      patient: {
        id,
        cpf: data.cpf,
        birthDate: data.birthDate,
        name: data.name
      },
      consultations
    } as IListConsultantsByPatientIdResponse
  }

  async create(patient: ICreateNewPatient) {

    await this.databasePatient.create({
      data: {
        cpf: patient.cpf,
        birthDate: patient.birthDate,
        name: patient.name
      }
    });

    return this.list();
  }
}

export { PatientRepository }