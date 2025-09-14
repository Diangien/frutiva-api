import { Prisma, Product } from "generated/prisma";
import { ProductsRepository } from "../products-repository";

export class InMemoryProductsRepository implements ProductsRepository{
    create(data: Prisma.ProductCreateInput): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
}