// import { createRequest } from './../../services/request.service';
// import { createRequestSchema } from './../../db';
import { z } from "zod";
import { generateRegex } from "../../services/openai.service";
import { createRequest } from "../../services/request.service";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const regexRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const regex = await generateRegex(input.prompt);
      await createRequest({
        prompt: input.prompt,
        response: typeof regex === "string" ? regex : "No Response"
      })
      return { response: regex };
    }),
  // logResponse: publicProcedure
  //   .input(createRequestSchema)
  //   .query(({ input }) => {
  //     return createRequest(input);
  //   }),
});
