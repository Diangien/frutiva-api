import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    full_name: z.string(),
    phone: z.string().min(9),
    password: z.string().min(6),
    privilege: z.enum(["admin", "stock", "sales"]).default("sales"),
  });

  const { name, full_name, password, phone, privilege } = registerBodySchema.parse(request.body);

  try {
    const useCase = makeRegisterUseCase()

    await useCase.execute({ full_name, name, password, phone, privilege });
  } catch (error) {
    return reply.status(409).send();
  }

  return reply.status(200).send({
    message: "User created!",
  });
}
