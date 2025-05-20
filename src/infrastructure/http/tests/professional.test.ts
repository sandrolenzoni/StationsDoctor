import request from 'supertest';
import { app } from '../../../index';
import { describe, it, expect } from '@jest/globals';

describe('POST /api/profissionais/disponiveis', () => {
  it('Consultar os profissionais disponíveis para a data, portanto deve retornar um array com sycesso',
    async () => {
      const newConsult = {
        specialityId: "cardiologista",
        date: "2025-05-20T15:00"
      };

      const response = await request(app)
        .post('/api/profissionais/disponiveis')
        .send(newConsult)
        .expect(200)

      expect(Array.isArray(response.body))
    }
  )
})


describe('POST /api/profissionais', () => {
  it('Insere um novo profissional',
    async () => {
      const newProfessional = {
        name: "José Osvaldino",
        specialityId: "dermatologista",
        crm: "34323242"
      };

      const response = await request(app)
        .post('/api/profissionais')
        .send(newProfessional)
        .expect(201)

      expect(Array.isArray(response.body))
    }
  )
})

describe('GET /api/profissionais/id/consultas', () => {
  it('Lista as consultas do profissional',
    async () => {


      const response = await request(app)
        .get(`/api/profissionais/${1}/consultas`)
        .expect(200)

      expect(Array.isArray(response.body))
    }
  )
})
