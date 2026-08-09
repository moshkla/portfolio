import { z } from "zod";

/** Shared by the client form and the API route so validation can't drift. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "That name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(160),
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters")
    .max(4000, "Please keep it under 4000 characters"),
  /**
   * Honeypot — real users never fill this; bots usually do.
   *
   * Deliberately permissive: if the schema rejected a filled honeypot, the API
   * would answer 422 and name the offending field, which just teaches a bot how
   * to get past it. Validation lets it through and the route drops the message
   * silently instead.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
