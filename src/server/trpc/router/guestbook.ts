import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const guestbookRouter = router({
  postMessage: protectedProcedure
    .input(z.object({ name: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const messages = await ctx.prisma.guestbook.findMany({
        select: {
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  }),
});
