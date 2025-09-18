import { StockRepository } from "@/repositories/stock-repository";
import { Stock, StockStatus } from "generated/prisma";
import { ResourceAlreadyExistsError } from "./errors/resourse-already-exists-error";
import { SuppliersRepository } from "@/repositories/suppliers-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { DesorderedDatesError } from "./errors/disordered-dates-error";
import { ProductsRepository } from "@/repositories/products-repository";

interface CreateStockUseCaseRequest{
    batch:string;
    initialQuantity:number;
    entryDate:Date,
    expirationDate:Date,
    location:string,
    minimumQuantity:number,
    observations: string,
    purchasePrice: number,
    status?: StockStatus,
    supplierId: string;
    userId: string;
    productId:string;
}

interface CreateStockUseCaseResponse{
    stock:Stock;
}

export class CreateStockUseCase{
    constructor(
        private stockRepository:StockRepository,
        private suppliersRepository:SuppliersRepository,
        private usersRepository:UsersRepository,
        private productsRepository:ProductsRepository,

    ){};

    async execute(data:CreateStockUseCaseRequest):Promise<CreateStockUseCaseResponse>{
        
        const stockWithSameBatch = await this.stockRepository.findByBatch(data.batch);
        if(stockWithSameBatch){
            throw new ResourceAlreadyExistsError("Batch");
        }

        const product = await this.productsRepository.findById(data.productId);

        if(!product){
            throw new ResourceNotFoundError("Product");
        }

        const supplier = await this.suppliersRepository.findById(data.supplierId);

        if(!supplier){
            throw new ResourceNotFoundError("Supplier");
        }

        const user = await this.usersRepository.findById(data.userId);

        if(!user){
            throw new ResourceNotFoundError("User");
        }

        //maybe will can convert expirationDate to dayjs
        const entryDateIsLessThanExpiration = dayjs(data.entryDate).isBefore(data.expirationDate);
        if(!entryDateIsLessThanExpiration){
            throw new DesorderedDatesError();
        }

        const stock = await this.stockRepository.create(data);

        return {
            stock,
        }

    }
}