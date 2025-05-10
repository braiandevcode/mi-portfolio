import { FormData, FormErrors } from "../types/types";
import { contactSchema } from "./validator";
import { z } from "zod";

type ValidateFieldsParams = {
  field: keyof FormData;
  value: string;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
};

export const validateFields = ({ field, value, setErrors }: ValidateFieldsParams): void => {
  try {
    switch (field) {
      case "nameContact":
        contactSchema.pick({ nameContact: true }).parse({ nameContact: value });
        break;
      case "emailContact":
        contactSchema.pick({ emailContact: true }).parse({ emailContact: value });
        break;
      case "subjectContact":
        contactSchema.pick({ subjectContact: true }).parse({ subjectContact: value });
        break;
      case "message":
        contactSchema.pick({ message: true }).parse({ message: value });
        break;
      default:
        return;
    }

    // Si pasa la validación, eliminamos el error
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });

  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldError = err.errors[0]?.message;
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    }
  }
};
