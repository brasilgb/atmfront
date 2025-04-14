import { z } from "zod";
import { isCNPJ } from 'validation-br'

export const formSchema = z.object({
    organizationId: z.string().min(1, { message: 'Selecione a organização!' }),
    CompanyId: z.string(),
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    email: z.string().min(1, { message: 'O e-mail deve ser preenchido!' }),
    password: z.string().min(1, { message: 'A senha deve ser preenchida!' }),
    retype_password: z.string().min(1, { message: 'A senha comparativa deve ser preenchida!' }),
    status: z.boolean()
})