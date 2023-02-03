/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { Prisma } from "@prisma/client";
import { prisma } from "../db";

export const createRequest = async (input: Prisma.RequestCreateInput) => {
    const newReq = await prisma.request.create({
        data: input
    });
    return newReq.id;
  };

export const updateRequestFeedback = async (id: string, feedback: boolean) => {
    console.log("SERVICE GOT THIS VALUE: ", id, feedback);
    await prisma.request
        .update({
            where: {
                id: id
            },
            data: {
                isCorrect: feedback
            }
        })
        .then((response) => {
            console.log(response);
        });
}