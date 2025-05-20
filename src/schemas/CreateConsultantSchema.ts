import { z } from "zod";

const createConsultantSchema = z.object({
  professionalId: z.number().min(1, "Nome é obrigatório"),
  patientId: z.number().min(1, "Especialidade é obrigatória"),
  date: z.string()
    .transform((val) => {
      let dateString = val;
      if (!val.endsWith('Z') && !val.match(/[+-]\d{2}:\d{2}$/)) {
        dateString = val + 'Z';
      }
      return new Date(dateString);
    })
    .refine((val) => !isNaN(val.getTime()), {
      message: "Data inválida",
    }),
});

type CreateConsultantType = z.infer<typeof createConsultantSchema>;

export { createConsultantSchema, CreateConsultantType };