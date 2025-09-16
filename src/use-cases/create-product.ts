import { CategoriesRepository } from "@/repositories/categories-repository";
import { ProductsRepository } from "@/repositories/products-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Category, Product } from "generated/prisma";
import { ProductNameAlreadyExistsError } from "./errors/product-name-already-exists-error";
import { BarCodeAlreadyExistsError } from "./errors/bar-code-already-exists-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export type UnitType = "unit" | "kilo";

interface CreateProductUseCaseRequest{
    barCode: string;
    name: string;
    description:string;
    unitType: UnitType;
    sellingPrice:number;
    buyingPrice:number;
    expirationDays:number;
    categoryId:string;
    userId:string;
    pictureUrl: string;
}

interface CreateProductUseCaseResponse{
    product: Product;
}

export class CreateProductUseCase{
    constructor(
        private productsRepository:ProductsRepository, 
        private categoriesRepository:CategoriesRepository,
        private usersRepository:UsersRepository){}

    async execute({barCode,name,buyingPrice,categoryId,expirationDays,sellingPrice,unitType,userId,description, pictureUrl}:CreateProductUseCaseRequest):Promise<CreateProductUseCaseResponse>{

        const productWithSameBarCode = await this.productsRepository.findByBarCode(barCode);

        if(productWithSameBarCode){
            throw new BarCodeAlreadyExistsError();
        }

        const productWithSameName = await this.productsRepository.findByName(name);

        if(productWithSameName){
            throw new ProductNameAlreadyExistsError();
        }

        const category = await this.categoriesRepository.findById(categoryId);

        if(!category){
            throw new ResourceNotFoundError();
        }
        
        const user = await this.usersRepository.findById(userId);

        if(!user){
            throw new ResourceNotFoundError();
        }
        

        

        const product = await this.productsRepository.create({
            bar_code: barCode,
            name,
            buying_price: buyingPrice,
            selling_price: sellingPrice,
            categoryId,
            userId,
            expiration_days: expirationDays,
            description: description,
            unit_type:unitType,
            picture_url: pictureUrl
        })

        return { product }
        
    }
}