-- DropForeignKey
ALTER TABLE "public"."tb_stock_moviment" DROP CONSTRAINT "tb_stock_moviment_supplierId_fkey";

-- AlterTable
ALTER TABLE "public"."tb_stock_moviment" ADD COLUMN     "saleId" INTEGER,
ALTER COLUMN "supplierId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "public"."tb_supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_stock_moviment" ADD CONSTRAINT "tb_stock_moviment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."tb_sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
