import { Prisma, Sale } from "generated/prisma";

export interface SalesRepository {
  create(data: Prisma.SaleCreateInput): Promise<Sale>;
}
