import { z } from "zod";
import { AddCustomerSchema } from "~/schema/customer.schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getAll: protectedProcedure().query(({ ctx }) => {
    return ctx.prisma.customer.findMany();
  }),
  add: protectedProcedure()
    .input(AddCustomerSchema)
    .mutation(async ({ input, ctx }) => {
      const customer = await ctx.prisma.customer.create({
        data: input,
      });

      return customer;
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
