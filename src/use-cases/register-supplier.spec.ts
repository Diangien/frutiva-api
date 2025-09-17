import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { UserNameAlreadyExistsError } from "./errors/username-already-exists-error";
import { compare } from "bcryptjs";
import { InMemorySuppliersRepository } from "@/repositories/in-memory/in-memory-suppliers-repository";
import { RegisterSupplierUseCase } from "./register-supplier";
import { ResourceAlreadyExistsError } from "./errors/resourse-already-exists-error";

describe("Register Supplier Use Case", () => {
  let suppliersRepository: InMemorySuppliersRepository;
  let sut: RegisterSupplierUseCase;

  beforeEach(() => {
    suppliersRepository = new InMemorySuppliersRepository();
    sut = new RegisterSupplierUseCase(suppliersRepository);
  });

  it("should be able to register a supplier", async () => {
    const { supplier } = await sut.execute({
      name:"supplier-01",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    });

    expect(supplier.id).toEqual(expect.any(String));
  });

  it("should not be able to register a supplier with same name twice", async () => {
    await sut.execute({
      name:"supplier-01",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    });

    await expect(
      sut.execute({
      name:"supplier-01",
      nickname:"sup-02",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup02@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

   it("should not be able to register a supplier with same nickname twice", async () => {
    await sut.execute({
      name:"supplier-01",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    });

    await expect(
      sut.execute({
      name:"supplier-02",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup02@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

   it("should not be able to register a supplier with same email twice", async () => {
    await sut.execute({
      name:"supplier-01",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    });

    await expect(
      sut.execute({
      name:"supplier-02",
      nickname:"sup-02",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });


  
  it("should not be able to register a supplier with same nif twice", async () => {
    await sut.execute({
      name:"supplier-01",
      nickname:"sup-01",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup01@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    });

    await expect(
      sut.execute({
      name:"supplier-02",
      nickname:"sup-02",
      address:"Bairro Azul, Rua Dack Doy",
      email:"sup02@gmail.com",
      nif:"12345",
      city:"Luanda",
      phone:"912216481",
      observations:""
    })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

});
