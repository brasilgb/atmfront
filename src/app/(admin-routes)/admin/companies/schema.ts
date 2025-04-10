import { z } from "zod";
import { isCNPJ } from 'validation-br'

export const formSchema = z.object({
    organizationId: z.string().min(1, { message: 'Selecione a organização!' }),
    corpreason: z.string().min(1, { message: 'A razão social deve ser preenchido!' }),
    cnpj: z.string().min(1, { message: 'O CNPJ deve ser preenchido!' }).refine((data) => isCNPJ(data), { message: 'O CNPJ deve ser válido!' }),
    subname: z.string().min(1, { message: 'O nome da filial deve ser preenchido!' }),
    subnumber: z.string().min(1, { message: 'O número da filial deve ser preenchido!' }),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    district: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    telefone: z.string().min(1, { message: 'O número dotelefone deve ser preenchido!' }),
    status: z.boolean(),
    whatsapp: z.string(),
    observation: z.string(),
})