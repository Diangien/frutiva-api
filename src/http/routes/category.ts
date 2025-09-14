import { FastifyInstance } from "fastify";
import { create } from "../controllers/category/create";

export async function categoriesRoutes(app:FastifyInstance){
    app.post("/",create);
}