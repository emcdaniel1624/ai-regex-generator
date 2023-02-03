import { PrismaClient } from "@prisma/client";
import type { TypeOf} from "zod";
import { z } from "zod";
import { env } from "../env/server.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export const createRequestSchema = z.object({
  prompt: z.string({
    required_error: 'Prompt is required',
  }),
  response: z.string({
    required_error: 'Response is required'
  }),
})

export type CreateRequestInput = TypeOf<typeof createRequestSchema>;
