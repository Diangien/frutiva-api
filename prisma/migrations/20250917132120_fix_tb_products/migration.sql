/*
  Warnings:

  - You are about to drop the column `bar_code` on the `tb_produts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barCode]` on the table `tb_produts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barCode` to the `tb_produts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."tb_produts_bar_code_key";

-- AlterTable
ALTER TABLE "public"."tb_produts" DROP COLUMN "bar_code",
ADD COLUMN     "barCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_produts_barCode_key" ON "public"."tb_produts"("barCode");
