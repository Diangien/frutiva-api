import type { FastifyInstance, } from "fastify";
import { register } from "../controllers/users/register.js";
import { Fetch } from "../controllers/users/fetch.js";
import { authenticate } from "../controllers/users/authenticate.js";

export async function userRoutes(app: FastifyInstance) {
  app.get("/", Fetch);

  app.post("/register", register);

  app.post("/session", authenticate);
}
