import request from 'supertest';
import { app } from '../../../index';
import { describe, it, expect } from '@jest/globals';


describe('POST /api/pacientes', () => {
  it('Insere um novo paciente',
    async () => {
      const newProfessional = {
        name: "José Osvaldino",
        cpf: "24531234081",
        birthDate: "1985-12-05"
      };

      const response = await request(app)
        .post('/api/pacientes')
        .send(newProfessional)
        .expect(201)

      expect(Array.isArray(response.body))
    }
  )
})

describe('GET /api/pacientes/id/consultas', () => {
  it('Lista as consultas do paciente',
    async () => {


      const response = await request(app)
        .get(`/api/pacientes/${1}/consultas`)
        .expect(200)

      expect(Array.isArray(response.body))
    }
  )
})
