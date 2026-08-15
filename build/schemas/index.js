import { z } from "zod";
export const listDocumentsInputSchema = z.object({});
export const searchNotesInputSchema = z.object({
    query: z
        .string()
        .min(1, "Query cannot be empty")
        .max(100, "Query is too long")
        .describe("The exact keyword or phrase to search for across local notes."),
    limit: z
        .number()
        .int()
        .positive()
        .max(10, "Limit cannot exceed 10 items")
        .optional()
        .describe("Maximum number of matching snippets to return.")
});
export const getFaqInputSchema = z.object({
    questionKey: z
        .string()
        .min(1, "Question key cannot be empty")
        .max(50, "Key is too long")
        .describe("The specific keyword or topic to look up in the FAQ.")
});
export const readDocumentContentInputSchema = z.object({
    fileName: z
        .string()
        .min(1, "Filename cannot be empty")
        .max(100, "Filename is too long")
        .describe("The exact name of the file to read (e.g., 'architecture_notes.md')")
});
export const getDocumentMetadataInputSchema = z.object({
    fileName: z
        .string()
        .min(1, "Filename cannot be empty")
        .max(100, "Filename is too long")
        .describe("The name of the file to get metadata for.")
});
