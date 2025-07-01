import { Status } from "@prisma/client";
import { z } from "zod";

const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(5).max(255),
        sku: z.string(),
        description: z.string().max(10000).optional(),
        price: z.number().optional().default(0),
        status: z.nativeEnum(Status).optional().default(Status.DRAFTED)
    })
});

export const productSchema = {
    createProductSchema
}