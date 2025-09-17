import { Prisma, Product } from "generated/prisma";
import { ProductsRepository } from "../products-repository";
import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({ data });
    return product;
  }

  async findByBarCode(barCode: string) {
    const product = await prisma.product.findUnique({ where: { barCode } });

    return product;
  }

  async findByName(name: string) {
    const product = await prisma.product.findUnique({ where: { name} });

    return product;
  }

  async findById(id: string) {
    // console.log("Find By ID In Products");
    const product = await prisma.product.findUnique({ where: { id} });

    return product;
  }
}
