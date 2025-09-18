import { FastifyInstance } from "fastify";
import { Create } from "../controllers/stock/create";

export async function stockRoutes(app: FastifyInstance){
    app.post("/",Create);
}