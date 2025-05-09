import { z } from "zod";

export const formSchemaEdit = z.object({
    organizationId: z.string().optional(),
    name: z.string().min(1, { message: 'O nome deve ser preenchido!' }),
    email: z.string().email().min(1, { message: 'O e-mail deve ser preenchido!' }),
    password: z.string().optional(),
    retype_password: z.string().optional(),
    is_admin: z.boolean().optional(),
    status: z.boolean().optional(),
    roles: z.string().optional()
})