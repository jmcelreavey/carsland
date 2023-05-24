import { z } from "zod";

export const addCarSchema = z.object({
  make: z.string().nonempty("Make is required"),
  model: z.string().nonempty("Model is required"),
  year: z.coerce.number().min(1900, "Must be after 1900"),
  color: z.string().nonempty("Color is required"),
});
