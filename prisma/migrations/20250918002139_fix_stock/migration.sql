/*
  Warnings:

  - You are about to drop the column `minimumQquantity` on the `tb_stock` table. All the data in the column will be lost.
  - Added the required column `minimumQuantity` to the `tb_stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_stock" DROP COLUMN "minimumQquantity",
ADD COLUMN     "minimumQuantity" INTEGER NOT NULL;
