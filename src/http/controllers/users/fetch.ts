import { makeFetchUsersUseCase } from "@/use-cases/factories/make-fetch-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function Fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchBodySchema = z.object({
    page: z.coerce.number(),
  });
  //console.log("err");
    console.log(request.body);
  const { page } = fetchBodySchema.parse(request.query);

  const useCase = makeFetchUsersUseCase();
  const { users } = await useCase.execute({ page });

  return reply.status(200).send({ users });
}
