import fastify from "fastify";
import { userRoutes } from "./http/routes/users.js";

export const app = fastify();

app.register(userRoutes, { prefix: "/users" });
