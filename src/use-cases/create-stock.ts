import { StockRepository } from "@/repositories/stock-repository";
import { Stock, StockMovement, StockStatus } from "generated/prisma";
import { ResourceAlreadyExistsError } from "./errors/resourse-already-exists-error";
import { SuppliersRepository } from "@/repositories/suppliers-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { DesorderedDatesError } from "./errors/disordered-dates-error";
import { ProductsRepository } from "@/repositories/products-repository";
import { StockMovementRepository } from "@/repositories/stock-movement-repository";
import { getAmount } from "@/utils/get-amount";


/*No caso do produto aumentar o preco no valor da entrada, avisar que se precisa actualizar o preco do produto
// Por isso returei o campo purchasePrice, (Por enquanto)

2. Trabalhar no funcionamento do PreviousQuantity

*/

interface CreateStockUseCaseRequest {
  batch: string;
  quantity: number;
  entryDate: Date;
  location: string;
  observations: string;
  status?: StockStatus;
  supplierId: string;
  userId: string;
  productId: string;
}

interface CreateStockUseCaseResponse {
  stock: Stock;
  entryMovement: StockMovement;
}

export class CreateStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private suppliersRepository: SuppliersRepository,
    private usersRepository: UsersRepository,
    private productsRepository: ProductsRepository,
    private stockMovementRepository: StockMovementRepository
  ) {}

  async execute({
    batch,
    entryDate,
    quantity,
    location,
    observations,
    productId,
    supplierId,
    userId,
    status,
  }: CreateStockUseCaseRequest): Promise<CreateStockUseCaseResponse> {
    const stockWithSameBatch = await this.stockRepository.findByBatch(batch);
    if (stockWithSameBatch) {
      throw new ResourceAlreadyExistsError("Batch");
    }

    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new ResourceNotFoundError("Product");
    }

    const supplier = await this.suppliersRepository.findById(supplierId);

    if (!supplier) {
      throw new ResourceNotFoundError("Supplier");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError("User");
    }

    //maybe will can convert expirationDate to dayjs
    /*const entryDateIsLessThanExpiration = dayjs(entryDate).isBefore(expirationDate);
    if (!entryDateIsLessThanExpiration) {
      throw new DesorderedDatesError();
    }*/

    const quantityIsLessThanMinimum =
      quantity + product.totalQuantity < product.minimumQuantity;

    if (quantityIsLessThanMinimum) {
      throw new Error("Entry Quantity is less than minimum quantity");
    }

    await this.productsRepository.addQuantity(product.id, quantity);

    const stock = await this.stockRepository.create({
      batch,
      entryDate,
      expirationDate: dayjs(entryDate).add(product.expirationDays, "day").toDate(),
      location,
      observations,
      productId,
      purchasePrice: product.buyingPrice,
      supplierId,userId,
      initialQuantity: quantity,
    });

    const entryMovement = await this.stockMovementRepository.create({
      currentQuantity: quantity,
      movementType: "entry",
      productId: product.id,
      quantity: quantity,
      stockId: stock.id,
      previousQuantity: quantity,
      totalAmount: getAmount(quantity, product.buyingPrice.toNumber()),
      unitPrice: product.buyingPrice,
      userId: userId,
      supplierId: supplierId,
    });

    return {
      stock,
      entryMovement,
    };
  }
}
