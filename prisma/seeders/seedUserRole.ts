import { Role, type UserRole } from "@prisma/client";
import { Seeder } from "prisma/Seeder";

export class seedUserRole extends Seeder {
  public params: Partial<UserRole>;

  constructor(params: Partial<UserRole>) {
    super();
    this.params = params;
  }

  public async run() {
    // Clone the record so we don't mutate the original
    const record = { ...this.params };

    if (!record.name) {
      record.name = this.faker.helpers.enumValue(Role);
    }

    if (!record.id) {
      record.id = record.name;
    }

    const userRole = await this.prisma.userRole.upsert({
      where: { id: record.id },
      update: record,
      create: record,
    });

    return userRole;
  }
}
