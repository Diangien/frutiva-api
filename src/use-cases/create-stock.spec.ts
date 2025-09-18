import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";
import { InMemoryStockRepository } from "@/repositories/in-memory/in-memory-stock-repository";
import { CreateStockUseCase } from "./create-stock";
import { InMemorySuppliersRepository } from "@/repositories/in-memory/in-memory-suppliers-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ResourceAlreadyExistsError } from "./errors/resourse-already-exists-error";
import { DesorderedDatesError } from "./errors/disordered-dates-error";

describe("Create Stock Use Case", () => {
  let stockRepository: InMemoryStockRepository;
  let sut: CreateStockUseCase;
  let usersRepository: InMemoryUsersRepository;
  let productsRepository: InMemoryProductsRepository;
  let suppliersRepository: InMemorySuppliersRepository;

  beforeEach(() => {
    stockRepository = new InMemoryStockRepository();
    usersRepository = new InMemoryUsersRepository();
    productsRepository = new InMemoryProductsRepository();
    suppliersRepository = new InMemorySuppliersRepository();
    sut = new CreateStockUseCase(
      stockRepository,
      suppliersRepository,
      usersRepository,
      productsRepository
    );

    usersRepository.create({
      id: "user-01",
      name: "user-01",
      full_name: "user-01",
      password_hash: "1234",
      phone: "9891111",
    });

    productsRepository.create({
      id:"product-01",
      barCode: "1234",
      buyingPrice: 1000,
      sellingPrice: 2000,
      name: "Maca",
      unitType: "unit",
      expirationDays: 10,
      description: "Maca muito doce",
      userId: "user-01",
      categoryId: "category-01",
    });

    suppliersRepository.create({
      id:"sup-01",
      name: "supplier-01",
      nickname: "sup-01",
      address: "Bairro Azul, Rua Dack Doy",
      email: "sup01@gmail.com",
      nif: "12345",
      city: "Luanda",
      phone: "912216481",
      observations: "",
    });
  });

  it("should be able to create a stock", async () => {
    const { stock } = await sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,1),
      expirationDate: new Date(2025,0,20),
      initialQuantity:20,
      location:"Prateleira A",
      minimumQuantity:5,
      observations:"",
      productId:"product-01",
      purchasePrice:50.0,
      supplierId:"sup-01",
      userId:"user-01"
    });

    expect(stock.batch).toEqual("batch-001");
  });


   it("should be able to create a stock in twice with same batch", async () => {
    await sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,1),
      expirationDate: new Date(2025,0,20),
      initialQuantity:20,
      location:"Prateleira A",
      minimumQuantity:5,
      observations:"",
      productId:"product-01",
      purchasePrice:50.0,
      supplierId:"sup-01",
      userId:"user-01"
    });

    await expect(sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,1),
      expirationDate: new Date(2025,0,20),
      initialQuantity:29,
      location:"Prateleira B",
      minimumQuantity:5,
      observations:"",
      productId:"product-01",
      purchasePrice:50.0,
      supplierId:"sup-01",
      userId:"user-01"
    })).rejects.toBeInstanceOf(ResourceAlreadyExistsError);

  });


  it("should not be able to create a stock with undefined product_id", async () => {

    await expect(sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,1),
      expirationDate: new Date(2025,0,20),
      initialQuantity:20,
      location:"Prateleira A",
      minimumQuantity:5,
      observations:"",
      productId:"xxxxxxxxx",
      purchasePrice:50.0,
      supplierId:"sup-01",
      userId:"user-01"
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });


  
  it("should not be able to create a stock with undefined supplier_id", async () => {
    await expect(sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,1),
      expirationDate: new Date(2025,0,20),
      initialQuantity:20,
      location:"Prateleira A",
      minimumQuantity:5,
      observations:"",
      productId:"product-01",
      purchasePrice:50.0,
      supplierId:"xxxxxxxxx",
      userId:"user-01"
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });


  
  it("should not be able to create a stock with expired_date less than entry_date", async () => {

    await expect(sut.execute({
      batch:"batch-001",
      entryDate: new Date(2025,0,20),
      expirationDate: new Date(2025,0,10),
      initialQuantity:20,
      location:"Prateleira A",
      minimumQuantity:5,
      observations:"",
      productId:"product-01",
      purchasePrice:50.0,
      supplierId:"sup-01",
      userId:"user-01"
    })).rejects.toBeInstanceOf(DesorderedDatesError);
  });

});
