import { Prisma, Product } from "generated/prisma";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements ProductsRepository{
    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({data});
        return product;
    }
    
}