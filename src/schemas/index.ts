import { z } from "zod";

export const listDocumentsInputSchema = z.object({});

export const searchNotesInputSchema = z.object({
    query: z
        .string()
        .min(1)
        .max(150)
        .describe("The exact text, n-gram, or keyword to search for across local notes and study materials."),
    limit: z
        .number()
        .int()
        .positive()
        .max(20)
        .optional()
        .describe("Maximum number of matching text snippets to return. Defaults to 5.")
});

export const getFaqInputSchema = z.object({
    topic: z
        .string()
        .min(2)
        .max(100)
        .describe("The specific topic or concept to retrieve the standard answer for.")
});