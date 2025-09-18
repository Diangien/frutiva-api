import { Prisma, Stock } from "generated/prisma";
import { StockRepository } from "../stock-repository";
import { prisma } from "@/lib/prisma";

export class PrismaStockRepository implements StockRepository {
  async create(data: Prisma.StockUncheckedCreateInput) {
    const stock = await prisma.stock.create({ data:{
        ...data,
        currentQuantity:data.initialQuantity
    }});
    return stock;
  }

  async findByBatch(batch: string) {
    const stock = await prisma.stock.findUnique({ where: { batch } });

    return stock;
  }
}
