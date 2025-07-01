import { ActionType } from "@prisma/client";
import { z } from "zod";

const createInventoryZodSchema = z.object({
    body: z.object({
        productId: z.string(),
        quantity: z.number().int().nonnegative().optional().default(0),
        sku: z.string()
    })
});
const updateInventoryZodSchema = z.object({
    body: z.object({
        quantity: z.number().int().nonnegative().optional(),
        action: z.enum([ActionType.IN, ActionType.OUT]).optional()
    })
})

export const inventoryZodSchema = {
    createInventoryZodSchema,
    updateInventoryZodSchema
}
