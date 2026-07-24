import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Te rugăm să introduci numele tău.").max(100),
  email: z.string().trim().email("Te rugăm să introduci o adresă de email validă.").max(200),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.length >= 6, "Te rugăm să introduci un număr de telefon valid."),
  message: z.string().trim().min(10, "Povestește-ne puțin mai mult despre proiectul tău.").max(5000),
  // Honeypot: real visitors never see or fill this field. Any value here means a bot filled the form.
  company: z.string().max(200).optional(),
  // Timestamp (ms) the form was rendered, sent back on submit so the server can reject
  // submissions that arrive faster than a human could plausibly fill the form.
  formRenderedAt: z.number().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
