import { z } from "zod";
import { addCarSchema } from "~/schema/car";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const carRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.car.findMany();
  }),
  add: protectedProcedure.input(addCarSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.car.create({
      data: input,
    });
  }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.car.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
