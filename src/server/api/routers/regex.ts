/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import { generateRegex } from "../../services/openai.service";
import { createRequest } from "../../services/request.service";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { updateRequestFeedback } from './../../services/request.service';

export const regexRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const regex = await generateRegex(input.prompt);
      const id = await createRequest({
        prompt: input.prompt,
        response: typeof regex === "string" ? regex : "No Response"
      })
      return { id: id, response: typeof regex === 'string' ? regex : "Error..." };
    }),
    feedback: publicProcedure
      .input(z.object({ id: z.string(), feedback: z.boolean() }))
      .mutation(async ({ input }) => {
        return await updateRequestFeedback(input.id, input.feedback);
      })
});
