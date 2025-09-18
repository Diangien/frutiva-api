/*
  Warnings:

  - Added the required column `productId` to the `tb_stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_stock" ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."tb_stock" ADD CONSTRAINT "tb_stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."tb_produts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
