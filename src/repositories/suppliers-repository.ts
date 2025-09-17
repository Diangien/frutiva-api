import { Prisma, Supplier } from "generated/prisma";

export interface SuppliersRepository {
    create(data:Prisma.SupplierCreateInput):Promise<Supplier>;
    findByName(name: string):Promise<Supplier | null>;
    findById(id: string):Promise<Supplier | null>;
    findByNickName(nickname: string):Promise<Supplier | null>;
    findByEmail(email: string):Promise<Supplier | null>;
    findByNif(nif: string):Promise<Supplier | null>;
}