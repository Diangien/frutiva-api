import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty(),
  });

  const { email, password } = bodySchema.parse(request.body);

  try {
    const useCase = makeAuthenticateUseCase();
    const { user } = await useCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(201).send({ token });
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
