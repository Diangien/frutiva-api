/*
  Warnings:

  - You are about to drop the column `buying_price` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `expiration_days` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `picture_url` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `unit_type` on the `tb_produts` table. All the data in the column will be lost.
  - Added the required column `buyingPrice` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirationDays` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `tb_produts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."StockStatus" AS ENUM ('available', 'expired', 'blocked');

-- AlterTable
ALTER TABLE "public"."tb_produts" DROP COLUMN "buying_price",
DROP COLUMN "created_at",
DROP COLUMN "expiration_days",
DROP COLUMN "picture_url",
DROP COLUMN "selling_price",
DROP COLUMN "unit_type",
ADD COLUMN     "buyingPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expirationDays" INTEGER NOT NULL,
ADD COLUMN     "pictureUrl" TEXT,
ADD COLUMN     "sellingPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unitType" "public"."UnitType" NOT NULL DEFAULT 'unit';

-- CreateTable
CREATE TABLE "public"."Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "endereco" BOOLEAN NOT NULL,
    "cidade" BOOLEAN NOT NULL,
    "observacoes" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stock" (
    "id" TEXT NOT NULL,
    "lote" TEXT NOT NULL,
    "currentQuantity" INTEGER NOT NULL,
    "minimumQquantity" INTEGER NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "purchasePrice" DECIMAL(65,30) NOT NULL,
    "status" "public"."StockStatus" NOT NULL DEFAULT 'available',
    "location" TEXT NOT NULL,
    "observations" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "public"."Supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_nickname_key" ON "public"."Supplier"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_nif_key" ON "public"."Supplier"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_lote_key" ON "public"."Stock"("lote");

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
