
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-category-repository";
import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { PrismaStockRepository } from "@/repositories/prisma/prisma-stock-repository";
import { PrismaSuppliersRepository } from "@/repositories/prisma/prisma-suppliers-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateStockUseCase } from "../create-stock";

export function makeCreateStockUseCase(){
    const stockRepository = new PrismaStockRepository();
    const suppliersRepository =new PrismaSuppliersRepository();
    const productsRepository = new PrismaProductsRepository();
    const usersRepository = new PrismaUsersRepository();
    const useCase = new CreateStockUseCase(stockRepository,suppliersRepository, usersRepository, productsRepository);

    return useCase;
}