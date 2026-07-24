import { z } from "zod";

export const uploadVideoSchema = z.object({
    body: z.object({
        title: z
            .string()
            .trim()
            .min(3, "Title must be at least 3 characters long.")
            .max(100, "Title cannot exceed 100 characters."),

        description: z
            .string()
            .trim()
            .min(10, "Description must be at least 10 characters long.")
            .max(1000, "Description cannot exceed 1000 characters."),

        category: z
            .string()
            .trim()
            .min(2, "Category is required."),

        isPremium: z.coerce.boolean(),
    }),
});