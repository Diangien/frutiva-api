import fastify from "fastify";
import { userRoutes } from "./http/routes/users.js";
import { categoriesRoutes } from "./http/routes/category.js";
import { productsRoutes } from "./http/routes/products.js";
import { suppliersRoutes } from "./http/routes/supplier.js";
import { stockRoutes } from "./http/routes/stock.js";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { ZodError } from "zod";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(userRoutes, { prefix: "/users" });
app.register(categoriesRoutes, { prefix: "/categories" });
app.register(productsRoutes, { prefix: "/products" });
app.register(suppliersRoutes, { prefix: "/suppliers" });
app.register(stockRoutes, { prefix: "/entry" });

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: "Validation Error", issues: error.format() });
  }

  if(env.NODE_ENV !== "production"){
    console.error(error)
  }else{
    //SomeThing
  }

  return reply.status(500).send({message:"Internal server error."});
});
