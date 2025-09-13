import { makeFetchUsersUseCase } from "@/use-cases/factories/make-fetch-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function Fetch(request:FastifyRequest, reply:FastifyReply){

    const useCase = makeFetchUsersUseCase()
    const { users } = await useCase.execute()

    return reply.status(200).send({users})
}