import { type PrismaClient } from "@prisma/client";
import prisma from "~/server/db";

export class UseCase {
  protected static prisma?: PrismaClient;

  constructor(prisma?: PrismaClient) {
    UseCase.prisma = prisma;
  }

  public static setPrisma(prisma: PrismaClient) {
    UseCase.prisma = prisma;
  }

  protected get prisma(): PrismaClient {
    return prisma;
  }
}
