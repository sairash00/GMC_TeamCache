import { z } from "zod";

export const createSkillRequestSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3)
        .max(100),

    description: z
        .string()
        .trim()
        .min(10)
        .max(1000),
});