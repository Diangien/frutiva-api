/*
  Warnings:

  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StockMovement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sale_Item" DROP CONSTRAINT "Sale_Item_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sale_Item" DROP CONSTRAINT "Sale_Item_saleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sale_Item" DROP CONSTRAINT "Sale_Item_stockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockMovement" DROP CONSTRAINT "StockMovement_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockMovement" DROP CONSTRAINT "StockMovement_stockId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockMovement" DROP CONSTRAINT "StockMovement_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StockMovement" DROP CONSTRAINT "StockMovement_userId_fkey";

-- DropTable
DROP TABLE "public"."Sale";

-- DropTable
DROP TABLE "public"."Sale_Item";

-- DropTable
DROP TABLE "public"."StockMovement";

-- CreateTable
CREATE TABLE "public"."tb_sales" (
    "id" SERIAL NOT NULL,
    "saleNumber" SERIAL NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subTotal" DECIMAL(65,30) NOT NULL,
    "totalDiscount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "PaymentType" "public"."PaymentType" NOT NULL,
    "amountPaid" DECIMAL(65,30) NOT NULL,
    "change" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tb_sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_sale_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "itemDiscount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "itemSubTotal" DECIMAL(65,30) NOT NULL,
    "stockId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "tb_sale_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_stock_moviment" (
    "id" SERIAL NOT NULL,
    "movementType" "public"."MovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "previousQuantity" INTEGER NOT NULL,
    "currentQuantity" INTEGER NOT NULL,
    "movementDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reasion" TEXT NOT NULL DEFAULT '',
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "stockId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tb_stock_moviment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."tb_sales" ADD CONSTRAINT "tb_sales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_sale_item" ADD CONSTRAINT "tb_sale_item_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."tb_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_sale_item" ADD CONSTRAINT "tb_sale_item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."tb_sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_sale_item" ADD CONSTRAINT "tb_sale_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."tb_produts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."tb_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."tb_produts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."tb_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
