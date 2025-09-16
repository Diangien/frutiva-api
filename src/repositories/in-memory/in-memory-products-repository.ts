import { Prisma, Product } from "generated/prisma";
import { ProductsRepository } from "../products-repository";

export class InMemoryProductsRepository implements ProductsRepository {
  private products: Product[] = [];
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product: Product = {
      id: data.id ?? crypto.randomUUID(),
      name: data.name,
      bar_code: data.bar_code,
      buying_price: new Prisma.Decimal(data.buying_price.toString()),
      selling_price: new Prisma.Decimal(data.selling_price.toString()),
      categoryId: data.categoryId,
      created_at: new Date(),
      description: data.description ?? null,
      expiration_days: data.expiration_days,
      unit_type: data.unit_type!,
      userId: data.userId,
      active: false,
      picture_url: data.picture_url ?? null,
    };

    this.products.push(product);

    return product;
  }

  async findByBarCode(barcode: string) {
    const product = this.products.find((product) => product.bar_code == barcode);

    return product || null;
  }

  async findByName(name: string) {
    const product = this.products.find((product) => product.name == name);

    return product || null;
  }

  async findById(id: string){
    const product = this.products.find((product) => product.id == id);

    return product || null;
  }
}
