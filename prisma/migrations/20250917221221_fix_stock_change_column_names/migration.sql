/*
  Warnings:

  - Added the required column `initialQuantity` to the `tb_stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `tb_stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_stock" ADD COLUMN     "initialQuantity" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."tb_stock" ADD CONSTRAINT "tb_stock_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
