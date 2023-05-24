import { seedUser } from "prisma/seeders/seedUser";
import { seedUserRole } from "prisma/seeders/seedUserRole";
import { logger } from "~/utils/logger";

export async function seedUsersWithRoles() {
  const adminEmail = "admin@gcdtech.com";
  const userEmail = "user@gcdtech.com";

  const roleSeeder = new seedUserRole({
    name: "USER",
  });
  const regularUserRole = await roleSeeder.run();

  const userSeeder = new seedUser({
    email: userEmail,
    userRoleId: regularUserRole.id,
    name: "User",
  });
  const regularUser = await userSeeder.run();

  logger.info(`Seeded regular user: ${regularUser.id}`);

  roleSeeder.params.name = "ADMIN";
  const adminUserRole = await roleSeeder.run();

  userSeeder.params.email = adminEmail;
  userSeeder.params.userRoleId = adminUserRole.id;
  userSeeder.params.name = "Admin";
  const adminUser = await userSeeder.run();

  logger.info(`Seeded admin user: ${adminUser.id}`);
}
