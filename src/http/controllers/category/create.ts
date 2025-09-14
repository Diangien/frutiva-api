import { makeCreateCategoryUseCase } from "@/use-cases/factories/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string().nonempty(),
    color: z.string().optional(),
  });

  const dados = createBodySchema.parse(request.body);
  

  try {
    const useCase = makeCreateCategoryUseCase();

    await useCase.execute(dados);
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(200).send({
    message: "category created!",
  });
}
