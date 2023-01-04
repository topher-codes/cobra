import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
