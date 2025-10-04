import { makeCreateStockUseCase } from "@/use-cases/factories/make-create-stock-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

/**
interface CreateStockUseCaseRequest{
    location:string,
    observations: string,
    : number,
    status?: StockStatus,
    supplierId: string;
    userId: string;
    productId:string;
} */
export async function Create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    batch: z.string().nonempty(),
    quantity: z.coerce.number(),
    entryDate: z.coerce.date().default(new Date()),
    location: z.string().default("no-location"),
    purchasePrice: z.coerce.number(),
    observations: z.string().default("no-observation"),
    status: z.enum(["available", "expired", "blocked"]).default("available"),
    userId: z.string().nonempty(),
    supplierId: z.string().nonempty(),
    productId: z.string().nonempty(),
  });

  const data = bodySchema.parse(request.body);

  try {
    const useCase = makeCreateStockUseCase();
    await useCase.execute(data)
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
