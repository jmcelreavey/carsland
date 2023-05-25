import { z } from "zod";
import { addCustomerSchema } from "~/schema/customer.schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { CreateCustomerUseCase } from "~/server/customers/usecase/customer.usecase";

export const customerRouter = createTRPCRouter({
  getAll: protectedProcedure().query(({ ctx }) => {
    return ctx.prisma.customer.findMany();
  }),
  add: protectedProcedure()
    .input(addCustomerSchema)
    .mutation(({ input, ctx }) => {
      return new CreateCustomerUseCase(ctx.prisma).execute(input);
    }),
  delete: protectedProcedure()
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.customer.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
