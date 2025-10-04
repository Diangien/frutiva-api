import { Prisma, StockMovement } from "generated/prisma";
import { StockMovementRepository } from "../stock-movement-repository";
import { prisma } from "@/lib/prisma";

export class InMemoryStockMovementRepository implements StockMovementRepository {
  private stockMovements: StockMovement[] = [];
  async create(data: Prisma.StockMovementUncheckedCreateInput) {
    const stockMovement:StockMovement = {
        id:Math.floor(Math.random() * 1000000000000 + 1),
        currentQuantity:data.currentQuantity,
        movementDate: new Date(),
        movementType:data.movementType,
        previousQuantity: data.currentQuantity,
        productId: data.productId,
        quantity:data.quantity,
        reasion: data.reasion ?? 'no-reasion',
        saleId: data.saleId ?? 0,
        stockId: data.stockId,
        supplierId: data.supplierId ?? 'no-supplier',
        totalAmount: new Prisma.Decimal(data.totalAmount.toString()),
        unitPrice:new Prisma.Decimal(data.unitPrice.toString()),
        userId: data.userId
    }

    return stockMovement;
  }
}
