import request from 'supertest';
import { app } from '../../../index';
import { describe, it, expect } from '@jest/globals';


describe('POST /api/consultas', () => {
  it('Insere uma nova consulta',
    async () => {
      const response = await request(app)
        .post('/api/consultas')
        .send({
          "patientId": 1,
          "professionalId": 2,
          "date": "2025-05-23 8:20"
        })
        .expect(201)

      expect(response.body).toHaveProperty('id');
    }
  )
})

describe('POST /api/consultas', () => {
  it('Tenta inserir a mesma consulta',
    async () => {

      const response = await request(app)
        .post('/api/consultas')
        .send({
          "patientId": 1,
          "professionalId": 2,
          "date": "2025-05-23 8:20"
        })
        .expect(400)

      expect(response.body).toHaveProperty('message');
    }
  )
})

describe('POST /api/consultas', () => {
  it('Tenta inserir uma consulta para o médico, enquanto ele está atendendo outro paciente',
    async () => {
      const response = await request(app)
        .post('/api/consultas')
        .send({
          "patientId": 2,
          "professionalId": 2,
          "date": "2025-05-23 08:20"
        })
        .expect(400)

      expect(response.body).toHaveProperty('message');
    }
  )
})

describe('POST /api/consultas', () => {
  it('Tenta inserir uma consulta no feriado',
    async () => {
      const response = await request(app)
        .post('/api/consultas')
        .send({
          "patientId": 2,
          "professionalId": 2,
          "date": "2025-12-25 16:20"
        })
        .expect(400)

      expect(response.body).toHaveProperty('message');
    }
  )
})


describe('POST /api/consultas', () => {
  it('Tenta inserir uma consulta fora do expediente',
    async () => {
      const response = await request(app)
        .post('/api/consultas')
        .send({
          "patientId": 2,
          "professionalId": 2,
          "date": "2025-05-23 23:20"
        })
        .expect(400)

      expect(response.body).toHaveProperty('message');
    }
  )
})