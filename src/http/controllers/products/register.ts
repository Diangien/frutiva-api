import { makeCreateProductsUseCase } from "@/use-cases/factories/make-create-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().nonempty(),
    barCode: z.string().nonempty(),
    sellingPrice: z.coerce.number(),
    buyingPrice: z.coerce.number(),
    expirationDays: z.coerce.number(),
    unitType: z.enum(["kilo", "unit"]).default("unit"),
    description: z.string().default("no-description"),
    pictureUrl: z.string().default("/caminho-foto"),
    userId: z.string().nonempty(),
    categoryId: z.string().default("no-category"),
  });

  const {
    name,
    barCode,
    buyingPrice,
    categoryId,
    expirationDays,
    sellingPrice,
    unitType,
    userId,
    description,
    pictureUrl,
  } = registerBodySchema.parse(request.body);

  try {
    const useCase = makeCreateProductsUseCase();

    await useCase.execute({
      name,
      barCode,
      buyingPrice,
      categoryId,
      expirationDays,
      sellingPrice,
      unitType,
      userId,
      description,
      pictureUrl,
    });
  } catch (error) {

    console.log(error)
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message });
    }
    
    throw error
  }

  return reply.status(201).send();

  //Ha possibilidade de um produto nao ter categoria
}
