import { z } from "zod";
import openai from "../../openai";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const generateRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async ({ input }) => {
      const promise = await generateRegex(input.prompt);
      return { response: promise };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});

const generateRegex = async (promptText: string) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
      Generate a regex pattern with the following requirements.
      Requirements: A regex that matches "${promptText}"
      Result:`,
      max_tokens: 150,
      temperature: 0,
      stop: [":"]
    });
    console.log(completion.data.choices[0]?.text);
    return completion.data.choices[0]?.text;
  }
  catch (error: any) {
    console.error("OpenAI error: ", error);
  }
}
