import { prisma } from "~/server/db";
import { CARS } from "./const";

const main = async () => {
  for (const car of CARS) {
    const uniqueCarId = car.id;
    await prisma.car.upsert({
      where: {
        id: uniqueCarId,
      },
      create: {
        ...car,
        id: uniqueCarId,
      },
      update: {
        ...car,
        id: uniqueCarId,
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
