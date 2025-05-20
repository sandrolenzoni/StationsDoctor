import path from 'node:path';
import { Express } from 'express'

import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Stations Doctor API',
      version: '1.0.0',
      description: 'Documentação da API de Agendamento de Consultas',
    },
  },
  apis: [path.resolve(__dirname, '../infrastructure/http/routes/*.ts')]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}