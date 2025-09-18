import { Prisma, Stock } from "generated/prisma";
import { StockRepository } from "../stock-repository";

export class InMemoryStockRepository implements StockRepository{
    private stocks:Stock[] = []
    async create(data: Prisma.StockUncheckedCreateInput) {
        const stock:Stock = {
            id: data.id ?? crypto.randomUUID(),
            batch:data.batch,
            initialQuantity:data.initialQuantity,
            createdAt: new Date(),
            currentQuantity:data.initialQuantity,
            entryDate:new Date(data.entryDate),
            expirationDate: new Date(data.expirationDate),
            location:data.location,
            minimumQuantity:data.minimumQuantity,
            observations: data.observations,
            purchasePrice: new Prisma.Decimal(data.purchasePrice.toString()),
            status: data.status || "available",
            supplierId: data.supplierId,
            userId: data.userId,
            productId: data.productId
        }

        this.stocks.push(stock);
        return stock;
        
    }

    async findByBatch(batch: string){
        const stock = this.stocks.find(stock => stock.batch == batch);

        return stock || null;
    }
}