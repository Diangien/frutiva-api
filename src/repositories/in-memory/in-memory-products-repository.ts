import { Prisma, Product } from "generated/prisma";
import { ProductsRepository } from "../products-repository";

export class InMemoryProductsRepository implements ProductsRepository {
  private products: Product[] = [];
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product: Product = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      barCode: data.barCode,
      buyingPrice: new Prisma.Decimal(data.buyingPrice.toString()),
      sellingPrice: new Prisma.Decimal(data.sellingPrice.toString()),
      categoryId: data.categoryId,
      createdAt: new Date(),
      description: data.description ?? null,
      expirationDays: data.expirationDays,
      unitType: data.unitType!,
      userId: data.userId,
      active: false,
      pictureUrl: data.pictureUrl ?? null,
      totalQuantity: 0,
      minimumQuantity: data.minimumQuantity,
    };

    this.products.push(product);

    return product;
  }

  async findByBarCode(barCode: string) {
    const product = this.products.find((product) => product.barCode == barCode);

    return product || null;
  }

  async findByName(name: string) {
    const product = this.products.find((product) => product.name == name);

    return product || null;
  }

  async findById(id: string) {
    const product = this.products.find((product) => product.id == id);

    return product || null;
  }

  async addQuantity(id: string, quantity: number) {
    const productIndex = this.products.findIndex((product) => product.id == id);

    this.products[productIndex].totalQuantity += quantity;
  }
}
