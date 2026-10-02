import { parseArgs } from "node:util";
import { z } from "zod";

const objectIdSchema = z.string().regex(/^[0-9a-zA-Z]{24}$/, "Invalid user ID format");

export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email addeess"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })
});

export const updateUserSchema = z.object({
    params: z.object({
        id: objectIdSchema
    }),
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(1, "Current password is required to update"),
    })
});

export const patchUserSchema = z.object({
    params: z.object({id: objectIdSchema}),
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(1, "Current password is required to update"),
    })
});

export const deleteUserSchema = z.object({
    pareams: z.object({
        id: objectIdSchema
    }),
    body: z.object({
        password: z.string().min(1, "Current Password is required to delete user")
    }),
});

export type CreateUserBody = z.infer<typeof createUserSchema>['body']
export type UpdateUserBody = z.infer<typeof updateUserSchema>['body']
export type PatchUserBody = z.infer<typeof patchUserSchema>['body']
export type DeleteUserBody = z.infer<typeof deleteUserSchema>['body']