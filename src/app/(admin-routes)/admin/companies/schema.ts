import { z } from "zod";
import { isCNPJ } from 'validation-br'

export const formSchema = z.object({
    organizationId: z.string(),
    altername: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    corpreason: z.string(),
    cnpj: z.string().min(1, { message: 'O CNPJ deve ser preenchido!' }).refine((data) => isCNPJ(data), { message: 'O CNPJ deve ser válido!' }),
    subnumber: z.string(),
    subname: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    district: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    telefone: z.string(),
    status: z.boolean(),
    whatsapp: z.string(),
    observation: z.string(),
})