import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.comments.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comments.findUnique({
        where: { id: input.id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        authorId: z.string(),
        postId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.create({
        data: {
          content: input.content,
          authorId: input.authorId,
          postId: input.postId,
        },
      });
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.update({
        where: { id: input.id },
        data: {
          content: input.content,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.comments.delete({
        where: { id: input.id },
      });
    }),
});
