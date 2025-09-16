import { PrismaProductsRepository } from "@/repositories/prisma/prisma-products-repository";
import { CreateProductUseCase } from "../create-product";
import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-category-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeCreateProductsUseCase(){
    const productsRepository = new PrismaProductsRepository();
    const categoriesRepository = new PrismaCategoriesRepository();
    const usersRepository = new PrismaUsersRepository();
    const useCase = new CreateProductUseCase(productsRepository,categoriesRepository, usersRepository);

    return useCase;
}