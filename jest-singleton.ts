import { beforeEach, jest } from "@jest/globals";
import { type PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, type DeepMockProxy } from "jest-mock-extended";
import prisma from "~/server/db";

jest.mock("~/server/db", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;