import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const productRouter = router({
  addProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        price: z.number(),
        stock: z.number(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.create({
          data: {
            name: input.name,
            price: input.price,
            stock: input.stock,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  editProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        stock: z.number(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            price: input.price,
            stock: input.stock,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
