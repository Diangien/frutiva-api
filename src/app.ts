import fastify from "fastify";

export const app = fastify();

app.get("/hello", (request, reply) => {
  return reply.status(200).send({message: "Seja Bem Vindo ao Frutiva"})
});

