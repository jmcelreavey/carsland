import { fakerEN_GB, type Faker } from "@faker-js/faker";
import { type PrismaClient } from "@prisma/client";
import prisma from "~/server/db";

export class Seeder {
  protected static faker: Faker;
  protected static prisma: PrismaClient;

  public static setPrisma(prisma: PrismaClient) {
    Seeder.prisma = prisma;
  }

  protected static setFaker(faker: Faker) {
    Seeder.faker = faker;
  }

  protected get faker(): Faker {
    if (!Seeder.faker) {
      Seeder.faker = fakerEN_GB;
    }
    return Seeder.faker;
  }

  protected get prisma(): PrismaClient {
    return prisma;
  }
}
