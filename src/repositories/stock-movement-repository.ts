import { Prisma, StockMovement } from "generated/prisma";

export interface StockMovementRepository{
    create(data:Prisma.StockMovementUncheckedCreateInput):Promise<StockMovement>;
}