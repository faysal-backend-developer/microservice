import { z } from "zod";

const createUserSchema = z.object({
    body: z.object({
        authUserId: z.string(),
        email: z.string().email(),
        name: z.string().min(1, "Name is required"),
        address: z.string().optional(),
        phone: z.string().optional(),
    })
});

const updateUserSchema = z.object({
    body: z.object({
        email: z.string().email().optional(),
        name: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
    })
});


export const UserSchema = {
    createUserSchema,
    updateUserSchema
}