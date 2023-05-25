import { z } from "zod";

export const addCustomerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  addressLine1: z.string().nonempty("First line of address is required"),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  email: z.string().email("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
});

export type addCustomerSchema = z.input<typeof addCustomerSchema>;
