import { fakerEN_GB } from "@faker-js/faker";
import { prisma } from "~/server/db";
import { seedUsersWithRoles } from "./scenarios/seedUsersWithRoles";

const main = async () => {
  fakerEN_GB.seed(0);

  await seedUsersWithRoles();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
