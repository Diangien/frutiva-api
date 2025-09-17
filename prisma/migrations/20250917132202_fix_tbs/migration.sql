/*
  Warnings:

  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Stock" DROP CONSTRAINT "Stock_supplierId_fkey";

-- DropTable
DROP TABLE "public"."Stock";

-- DropTable
DROP TABLE "public"."Supplier";

-- CreateTable
CREATE TABLE "public"."tb_supplier" (
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

    CONSTRAINT "tb_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_stock" (
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

    CONSTRAINT "tb_stock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_supplier_name_key" ON "public"."tb_supplier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_supplier_nickname_key" ON "public"."tb_supplier"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "tb_supplier_nif_key" ON "public"."tb_supplier"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "tb_stock_lote_key" ON "public"."tb_stock"("lote");

-- AddForeignKey
ALTER TABLE "public"."tb_stock" ADD CONSTRAINT "tb_stock_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."tb_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
