import { describe, expect, it, type jest } from "@jest/globals";
import { prismaMock } from "jest-singleton";
import { CreateCustomerUseCase } from "./create-customer.usecase";

describe("CreateCustomerUseCase", () => {
  it("should create a customer", async () => {
    const createCustomer = new CreateCustomerUseCase();
    const customer = {
      name: "Example",
      email: "example@gcdtech.com",
      phone: "0123456789",
      addressLine1: "123 Fake Street",
      addressLine2: "Fake Town",
      addressLine3: "Fake County",
    };

    (prismaMock.customer.create as jest.Mock).mockResolvedValue(customer);

    await expect(createCustomer.execute(customer)).resolves.toEqual({
      id: 1,
      name: "Rich",
      email: "hello@prisma.io",
      acceptTermsAndConditions: true,
    });
  });
});
