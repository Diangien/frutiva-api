import { ResourceAlreadyExistsError } from "@/use-cases/errors/resourse-already-exists-error";
import { makeRegisterSupplierUseCase } from "@/use-cases/factories/make-register-supplier-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function Register(request:FastifyRequest, reply:FastifyReply){
    const bodySchema = z.object({
        name:z.string().nonempty(),
        nickname:z.string().nonempty(),
        email:z.email().nonempty(),
        phone:z.string().nonempty(),
        city:z.string().default("no-city"),
        address:z.string().default("no-address"),
        nif:z.string().default("no-nif"),
        observations:z.string().default("no-observations")
    })

    const data = bodySchema.parse(request.body);

    try {
        const useCase = makeRegisterSupplierUseCase();
        await useCase.execute(data);
    } catch (error) {
        if(error instanceof ResourceAlreadyExistsError){
            return reply.status(409).send({ message: error.message });
        }

        throw error
    }

    return reply.status(201).send();
}