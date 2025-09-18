import { Prisma, Supplier } from "generated/prisma";
import { SuppliersRepository } from "../suppliers-repository";

export class InMemorySuppliersRepository implements SuppliersRepository {
  private suppliers: Supplier[] = [];
  async create(data: Prisma.SupplierCreateInput) {
    const supplier: Supplier = {
      id:  data.id ?? crypto.randomUUID(),
      name: data.name,
      nickname: data.nickname,
      email: data.email,
      city: data.city,
      address: data.address,
      nif: data.nif,
      created_at: new Date(),
      phone: data.phone,
      active: true,
      observations: data.observations || null,
    };

    this.suppliers.push(supplier);

    return supplier;
  }
  async findByName(name: string) {
    const supplier = this.suppliers.find((supplier) => supplier.name == name);

    return supplier || null;
  }
  async findById(id: string) {
    const supplier = this.suppliers.find((supplier) => supplier.id == id);

    return supplier || null;
  }
  async findByNickName(nickname: string) {
    const supplier = this.suppliers.find((supplier) => supplier.nickname == nickname);

    return supplier || null;
  }
  async findByEmail(email: string) {
    const supplier = this.suppliers.find((supplier) => supplier.email == email);

    return supplier || null;
  }

  async findByNif(nif: string) {
    const supplier = this.suppliers.find((supplier) => supplier.nif == nif);

    return supplier || null;
  }
}
