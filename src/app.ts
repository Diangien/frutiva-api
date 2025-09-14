import fastify from "fastify";
import { userRoutes } from "./http/routes/users.js";
import { categoriesRoutes } from "./http/routes/category.js";

export const app = fastify();

app.register(userRoutes, { prefix: "/users" });
app.register(categoriesRoutes, { prefix: "/categories"})
