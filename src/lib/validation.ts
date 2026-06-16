import { z } from "zod";

/**
 * Escapes characters that can lead to HTML injection/XSS attacks.
 */
export function sanitizeString(val: string): string {
  if (typeof val !== "string") return "";
  return val
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export const uuidSchema = z.string().uuid("Invalid UUID format");

export const symptomsSchema = z
  .string()
  .min(1, "Symptoms cannot be empty")
  .max(2000, "Symptoms cannot exceed 2000 characters")
  .transform(sanitizeString);

export const urlSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (!val) return true;
      // Allow relative paths, http/https URLs, and base64 data URIs
      const isWebUrl = /^(https?:\/\/)/i.test(val);
      const isDataUri = /^data:image\/[a-zA-Z+-]+;base64,/i.test(val);
      const isPath = /^\//.test(val) || /^[\w.-]+(\/[\w.-]+)*$/.test(val);
      return isWebUrl || isDataUri || isPath;
    },
    {
      message: "Invalid image path or URL format",
    }
  );

export const facilitySlidePostSchema = z.object({
  src: urlSchema,
  label: z
    .string()
    .max(100, "Label cannot exceed 100 characters")
    .optional()
    .transform((v) => sanitizeString(v || "")),
});

export const heroSlidePostSchema = z.object({
  src: urlSchema,
  alt: z
    .string()
    .max(100, "Alt caption cannot exceed 100 characters")
    .optional()
    .transform((v) => sanitizeString(v || "")),
});

export const reorderSchema = z.object({
  ids: z.array(uuidSchema).min(1, "Array cannot be empty"),
});

export const updatePostSchema = z.object({
  id: uuidSchema.optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .transform(sanitizeString),
  description: z
    .string()
    .max(5000, "Description cannot exceed 5000 characters")
    .transform(sanitizeString),
  image: urlSchema,
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export const updatePatchSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters")
    .optional()
    .transform((v) => (v ? sanitizeString(v) : undefined)),
  description: z
    .string()
    .max(5000, "Description cannot exceed 5000 characters")
    .optional()
    .transform((v) => (v ? sanitizeString(v) : undefined)),
  image: urlSchema.optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .optional(),
});
