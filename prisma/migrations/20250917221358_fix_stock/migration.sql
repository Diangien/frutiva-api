/*
  Warnings:

  - You are about to drop the column `lote` on the `tb_stock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[batch]` on the table `tb_stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batch` to the `tb_stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."tb_stock_lote_key";

-- AlterTable
ALTER TABLE "public"."tb_stock" DROP COLUMN "lote",
ADD COLUMN     "batch" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_stock_batch_key" ON "public"."tb_stock"("batch");
