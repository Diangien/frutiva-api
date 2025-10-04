import { Prisma, Sale, SaleItem } from "generated/prisma";

export interface SalesItemsRepository{
    create(data:Prisma.SaleItemCreateInput):Promise<SaleItem>;
}