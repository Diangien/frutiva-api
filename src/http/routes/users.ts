import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { register } from "../controllers/users/register.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send("All Users");
  });

  app.post("/register", register);
}
