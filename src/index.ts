import express from 'express';
import { setupSwagger } from './config/swagger';

import { professionalRoutes } from './infrastructure/http/routes/ProfessionalRoutes';
import { patientRoutes } from './infrastructure/http/routes/PatienteRoutes';
import { consultantRoutes } from './infrastructure/http/routes/ConsultationRoutes';

export const app = express();

app.use(express.json());
app.use('/api', professionalRoutes)
app.use('/api', patientRoutes)
app.use('/api', consultantRoutes)

setupSwagger(app);

app.listen(3000, '0.0.0.0', () => {
  console.log('🚀 Rodando no http://localhost:3000')
})