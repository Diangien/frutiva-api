import type { FastifyInstance, } from "fastify";
import { register } from "../controllers/users/register.js";
import { Fetch } from "../controllers/users/fetch.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", Fetch);

  app.post("/register", register);
}
