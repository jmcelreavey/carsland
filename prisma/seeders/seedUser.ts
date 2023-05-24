import { type User } from "@prisma/client";
import { Seeder } from "prisma/Seeder";
import { seedUserRole } from "./seedUserRole";

export class seedUser extends Seeder {
  public params: Partial<User>;

  constructor(params: Partial<User>) {
    super();
    this.params = params;
  }

  public async run() {
    // Clone the record so we don't mutate the original
    const record = { ...this.params };

    if (!record.email) {
      record.email = this.faker.internet.email();
    }

    if (!record.id) {
      record.id = record.email;
    }

    if (!record.userRoleId) {
      const userRoleSeeder = new seedUserRole({
        name: "USER",
      });

      const userRole = await userRoleSeeder.run();
      record.userRoleId = userRole.id;
    }

    const user = await this.prisma.user.upsert({
      where: { id: record.id },
      update: record,
      create: record,
    });

    return user;
  }
}
