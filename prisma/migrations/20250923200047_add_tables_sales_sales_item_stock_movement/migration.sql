/*
  Warnings:

  - The primary key for the `tb_stock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tb_stock` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentType" AS ENUM ('money', 'debit_card', 'credit_card', 'express');

-- CreateEnum
CREATE TYPE "public"."MovementType" AS ENUM ('entry', 'exit', 'loss');

-- AlterTable
ALTER TABLE "public"."tb_stock" DROP CONSTRAINT "tb_stock_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tb_stock_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."Sale" (
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

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sale_Item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "itemDiscount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "itemSubTotal" DECIMAL(65,30) NOT NULL,
    "stockId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Sale_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StockMovement" (
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

    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale_Item" ADD CONSTRAINT "Sale_Item_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."tb_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale_Item" ADD CONSTRAINT "Sale_Item_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale_Item" ADD CONSTRAINT "Sale_Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."tb_produts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockMovement" ADD CONSTRAINT "StockMovement_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "public"."tb_stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockMovement" ADD CONSTRAINT "StockMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."tb_produts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockMovement" ADD CONSTRAINT "StockMovement_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."tb_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StockMovement" ADD CONSTRAINT "StockMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
