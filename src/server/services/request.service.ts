/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Prisma, Request } from "@prisma/client";
import { prisma } from "../db";

export const createRequest = async (input: Prisma.RequestCreateInput) => {
    return (await prisma.request.create({
        data: input
    })) as Request;
  };