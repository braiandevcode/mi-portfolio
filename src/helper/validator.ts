// contactSchema.ts
import { z } from "zod";

// Lista parcial de dominios temporales
const temporaryEmailDomains = [
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "discard.email",
  "fakeinbox.com",
  "getnada.com",
  "emailondeck.com",
];

export const contactSchema = z.object({
  nameContact: z
    .string({ required_error: "El nombre es obligatorio" })
    .min(1, "El nombre no puede estar vacío")
    .max(50, "El nombre es demasiado largo")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras y espacios"),

  emailContact: z
    .string({ required_error: "El email es obligatorio" })
    .min(1, "El email no puede estar vacío")
    .email("Debe ser un email válido")
    .max(100, "El email es demasiado largo")
    .refine((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      return !temporaryEmailDomains.some((tempDomain) =>
        domain?.endsWith(tempDomain)
      );
    }, {
      message: "No se permite el uso de correos temporales",
    }),

  subjectContact: z
    .string({ required_error: "El asunto es obligatorio" })
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(100, "El asunto es demasiado largo")
    .regex(/^[\w\s.,¡!¿?áéíóúÁÉÍÓÚñÑ-]+$/, "El asunto contiene caracteres no permitidos")
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El asunto solo puede contener letras y espacios"),

  message: z
    .string({ required_error: "El mensaje es obligatorio" })
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(1000, "El mensaje es demasiado largo"),
});
