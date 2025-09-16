import { FastifyInstance } from "fastify";
import { Register } from "../controllers/products/register";

export async function productsRoutes(app: FastifyInstance){
    app.post("/",Register);
}