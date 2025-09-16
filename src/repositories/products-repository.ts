import { Prisma, Product } from "generated/prisma";

export interface ProductsRepository{
    create(data: Prisma.ProductUncheckedCreateInput):Promise<Product>;
    findByBarCode(barcode: string):Promise<Product | null>;
    findByName(name: string):Promise<Product | null>;
    findById(id: string):Promise<Product | null>;

}