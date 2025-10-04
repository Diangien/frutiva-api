import { Prisma, StockMovement } from "generated/prisma";
import { StockMovementRepository } from "../stock-movement-repository";
import { prisma } from "@/lib/prisma";

export class PrismaStockMovementRepository implements StockMovementRepository {
  //private stockMovements: StockMovement[] = [];
  async create(data: Prisma.StockMovementUncheckedCreateInput) {
    const stockMovement = await prisma.stockMovement.create({ data:{
      ...data,
      previousQuantity:data.currentQuantity
    } });
    return stockMovement;
  }
}
