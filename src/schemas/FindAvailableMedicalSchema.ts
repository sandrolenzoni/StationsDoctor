import { z } from "zod";

const findAvailableMedicalSchema = z.object({
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
  specialityId: z.string().min(1, "Especialidade é obrigatória"),
});

type FindAvailableMedicalType = z.infer<typeof findAvailableMedicalSchema>;

export { findAvailableMedicalSchema, FindAvailableMedicalType };