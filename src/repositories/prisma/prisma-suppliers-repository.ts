import { Prisma, Supplier } from "generated/prisma";
import { SuppliersRepository } from "../suppliers-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSuppliersRepository implements SuppliersRepository {
  async create(data: Prisma.SupplierCreateInput) {
    const supplier = await prisma.supplier.create({ data });
    return supplier;
  }
  async findByName(name: string) {
    const supplier = await prisma.supplier.findUnique({ where: { name } });
    return supplier;
  }
  async findById(id: string) {
    const supplier = await prisma.supplier.findUnique({ where: { id } });
    return supplier;
  }
  async findByNickName(nickname: string) {
    const supplier = await prisma.supplier.findUnique({ where: { nickname } });
    return supplier;
  }
  async findByEmail(email: string) {
    const supplier = await prisma.supplier.findUnique({ where: { email } });
    return supplier;
  }

  async findByNif(nif: string) {
    const supplier = await prisma.supplier.findUnique({ where: { nif } });
    return supplier;
  }
}
