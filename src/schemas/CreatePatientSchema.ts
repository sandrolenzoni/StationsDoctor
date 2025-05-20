import { z } from "zod";
import { validateCPF } from "../utils/validateCPF";

const createPatientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z
    .string()
    .regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos numéricos")
    .refine(validateCPF, { message: "CPF inválido" }),
  birthDate: z.string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Data inválida",
    }),
});

type CreatePatientType = z.infer<typeof createPatientSchema>;

export { createPatientSchema, CreatePatientType };