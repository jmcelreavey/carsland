import { type addCustomerSchema } from "~/schema/customer.schema";
import { UseCase } from "~/server/usecase";

export class CreateCustomerUseCase extends UseCase {
  public async execute(data: addCustomerSchema) {
    const customer = await this.prisma.customer.create({
      data,
    });

    return customer;
  }
}
