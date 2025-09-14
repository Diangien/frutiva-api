import { ProductsRepository } from "@/repositories/products-repository";
import { Product } from "generated/prisma";

export type UnitType = "unit" | "kilo";

interface CreateProductUseCaseRequest{
    barCode: string;
    name: string;
    description?:string;
    unitType: UnitType;
    sellingPrice:Number;
    buyingPrice:Number;
    expirationDays:Number;
    categoryId:Number;
    userId:Number;
}

interface CreateProductUseCaseResponse{
    product: Product;
}

export class CreateProductUseCase{
    constructor(private productsRepository:ProductsRepository){}

    async execute(){
        
    }
}