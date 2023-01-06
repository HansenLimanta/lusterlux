import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

export const cartRouter = router({
  addCartItem: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
        productId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const itemExists = await ctx.prisma.cartItem.findFirst({
          where: {
            productId: input.productId,
            userId: input.userId,
          },
        });
        if (itemExists) {
          await ctx.prisma.cartItem.update({
            where: {
              id: itemExists.id,
            },
            data: {
              quantity: itemExists.quantity + input.quantity,
              total: (itemExists.quantity + input.quantity) * input.price,
            },
          });
          return;
        } else {
          await ctx.prisma.cartItem.create({
            data: {
              name: input.name,
              quantity: input.quantity,
              price: input.price,
              total: input.quantity * input.price,
              userId: input.userId,
              productId: input.productId,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }),
  deleteSingleCartItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const itemExists = await ctx.prisma.cartItem.findFirst({
          where: {
            id: input.id,
          },
        });
        if (itemExists && itemExists.quantity > 1) {
          await ctx.prisma.cartItem.update({
            where: {
              id: itemExists.id,
            },
            data: {
              quantity: itemExists.quantity - 1,
              total: (itemExists.quantity - 1) * itemExists.price,
            },
          });
          return;
        } else {
          await ctx.prisma.cartItem.delete({
            where: {
              id: input.id,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    }),
  deleteCartItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.cartItem.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getCartItems: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return ctx.prisma.cartItem.findMany({
          where: {
            userId: input.id,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
