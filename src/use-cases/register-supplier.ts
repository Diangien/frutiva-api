import { PrismaSuppliersRepository } from "@/repositories/prisma/prisma-suppliers-repository";
import { Supplier } from "generated/prisma";
import { ResourceAlreadyExistsError } from "./errors/resourse-already-exists-error";

interface RegisterSupplierUseCaseRequest{
    name:string;
    nickname:string;
    email:string;
    nif:string;
    phone:string;
    address:string;
    city:string;
    observations:string;
}

interface RegisterSupplierUseCaseResponse{
    supplier:Supplier;
}

export class RegisterSupplierUseCase{
    constructor(private suppliersReposioty:PrismaSuppliersRepository){};

    async execute({address,city,email,name,nickname,nif,observations,phone}:RegisterSupplierUseCaseRequest):Promise<RegisterSupplierUseCaseResponse>{

        const supplierWithSameName = await this.suppliersReposioty.findByName(name);
        if(supplierWithSameName){
            throw new ResourceAlreadyExistsError("name");
        }

        const supplierWithSameNickName = await this.suppliersReposioty.findByNickName(nickname);
        if(supplierWithSameNickName){
            throw new ResourceAlreadyExistsError("nickname");
        }

        const supplierWithSameEmail = await this.suppliersReposioty.findByEmail(email);
        if(supplierWithSameEmail){
            throw new ResourceAlreadyExistsError("email");
        }

        const supplierWithSameNif = await this.suppliersReposioty.findByNif(nif);
        if(supplierWithSameNif){
            throw new ResourceAlreadyExistsError("NIF");
        }

        const supplier = await this.suppliersReposioty.create({name, nickname,nif, email, phone,city, address, observations,});

        return {supplier}



    }
}