import { z } from "zod";

const createMedicalSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  specialityId: z.string().min(1, "Especialidade é obrigatória"),
  crm: z.string().min(1, "CRM é obrigatório")
});

type CreateMedicalType = z.infer<typeof createMedicalSchema>;

export { createMedicalSchema, CreateMedicalType };