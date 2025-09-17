import { PrismaSuppliersRepository } from "@/repositories/prisma/prisma-suppliers-repository";
import { RegisterSupplierUseCase } from "../register-supplier";


export function makeRegisterSupplierUseCase(){
    const suppliersRepository = new PrismaSuppliersRepository();
    const useCase = new RegisterSupplierUseCase(suppliersRepository);

    return useCase;
}