import { Prisma, Product } from "generated/prisma";

export interface ProductsRepository{
    create(data: Prisma.ProductCreateInput):Promise<Product>;
    findByBarCode(barcode: string):Promise<Product | null>;
    
}