import { Role } from "@prisma/client";
import type { Session } from "next-auth";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { type AddCustomerSchema } from "~/schema/customer.schema";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import prismaMock from "~/server/mocks/db";

// mock prisma module
vi.mock("~/server/db");

describe("using the customer router", () => {
  // 3- Reset everything
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 4- session mocked
  const session: Session = {
    expires: "1",
    user: {
      id: "example",
      role: {
        name: Role.USER,
        id: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  };

  // init tRPC for test
  const ctx = createInnerTRPCContext({ session });
  const caller = appRouter.createCaller({ ...ctx, prisma: prismaMock });

  test("I can add a new customer", async () => {
    const customerModel: AddCustomerSchema = {
      name: "test",
      email: "example@gcdtech.com",
      phone: "123456789",
      addressLine1: "test",
    };

    // mock prisma procedure
    prismaMock.customer.create.mockResolvedValue({
      ...customerModel,
      id: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
      addressLine2: null,
      addressLine3: null,
    });

    const customer = await caller.customer.add(customerModel);

    expect(customer).toMatchObject(customerModel);
  });
});
