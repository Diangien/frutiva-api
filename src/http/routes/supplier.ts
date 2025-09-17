import { FastifyInstance } from "fastify";
import { Register } from "../controllers/suppliers/register";

export async function suppliersRoutes(app: FastifyInstance){
    app.post("/",Register);
}