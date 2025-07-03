import { z } from "zod";


const emailCreateSchema = z.object({
    body: z.object({
        sender: z.string().email().optional(),
        recipient: z.string(),
        subject: z.string(),
        body: z.string(),
        source: z.string()
    })
});

export const emailSchema = {
    emailCreateSchema
}