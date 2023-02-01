import { createTRPCRouter } from "./trpc";
import { regexRouter } from "./routers/regex";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  regex: regexRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
