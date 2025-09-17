import { ProductsRepository } from "@/repositories/products-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./create-product";
import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCategorysRepository } from "@/repositories/in-memory/in-memory-categories-repository";

describe("Create Product Use Case", ()=>{

    let productsRepository:InMemoryProductsRepository;
    let sut: CreateProductUseCase;
    let usersRepository:InMemoryUsersRepository;
    let categoriesRepository:InMemoryCategorysRepository;

    beforeEach(()=>{
        productsRepository= new InMemoryProductsRepository();
        usersRepository = new InMemoryUsersRepository();
        categoriesRepository = new InMemoryCategorysRepository();
        sut = new CreateProductUseCase(productsRepository,categoriesRepository,usersRepository);

        usersRepository.create({
            id:"user-01",
            name:"user-01",
            full_name:"user-01",
            password_hash:"1234",
            phone:"9891111"
        })

        categoriesRepository.create({
            id:"category-01",
            name:"legumes"
        })
        
    })

    it("should be able to create a product", async()=>{

        const { product } = await sut.execute({
            barCode: "1234",
            buyingPrice: 1000,
            sellingPrice:2000,
            name:"Maca Gala",
            unitType:"unit",
            expirationDays:10,
            description:"Maca muito doce",
            userId: 'user-01',
            categoryId: 'category-01',
            pictureUrl:""
        })

        expect(product.name).toEqual("Maca Gala");
    })

    it("should be not able to create a product in twice with same barcode", async()=>{

        productsRepository.create({
            barCode: "1234",
            buyingPrice: 1000,
            sellingPrice:2000,
            name:"Maca",
            unitType:"unit",
            expirationDays:10,
            description:"Maca muito doce",
            userId: 'user-01',
            categoryId: 'category-01'
        })

        await expect(sut.execute({
            barCode: "1234",
            buyingPrice: 1000,
            sellingPrice:2000,
            name:"Maca Gala",
            unitType:"unit",
            expirationDays:10,
            description:"Maca muito doce",
            userId: 'user-01',
            categoryId: 'category-01',
            pictureUrl:"/"
        })).rejects.toBeInstanceOf(Error);
    })

    it("should be not able to create a product in twice with same name", async()=>{

        productsRepository.create({
            barCode: "1234",
            name:"Maca",
            buyingPrice: 1000,
            sellingPrice:2000,
            
            unitType:"unit",
            expirationDays:10,
            description:"Maca muito doce",
            userId: 'user-01',
            categoryId: 'category-01'
        })

        await expect(sut.execute({
            barCode: "3456",
            name:"Maca",
            buyingPrice: 1000,
            sellingPrice:2000,
            
            unitType:"unit",
            expirationDays:10,
            description:"Maca muito doce",
            userId: 'user-01',
            categoryId: 'category-01',
            pictureUrl:""
        })).rejects.toBeInstanceOf(Error);
    })
})