/*
  Warnings:

  - You are about to drop the column `minimumQuantity` on the `tb_stock` table. All the data in the column will be lost.
  - Added the required column `minimumQuantity` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `tb_produts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_produts" ADD COLUMN     "minimumQuantity" INTEGER NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_stock" DROP COLUMN "minimumQuantity";
