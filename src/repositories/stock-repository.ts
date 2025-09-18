import { Prisma, Stock } from "generated/prisma";

export interface StockRepository{
    create(data:Prisma.StockUncheckedCreateInput):Promise<Stock>;
    findByBatch(batch:string):Promise<Stock | null>;
}