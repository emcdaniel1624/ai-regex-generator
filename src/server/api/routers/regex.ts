import { createRequest } from './../../services/request.service';
import { createRequestSchema } from './../../db';
import { z } from "zod";
import { generateRegex } from "../../services/openai.service";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const regexRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const promise = await generateRegex(input.prompt);
      return { response: promise };
    }),
  logResponse: publicProcedure
    .input(createRequestSchema)
    .query(({ input }) => {
      return createRequest(input);
    }),
});
