/*
  Warnings:

  - You are about to drop the column `cidade` on the `tb_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `tb_supplier` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `tb_supplier` table. All the data in the column will be lost.
  - Added the required column `address` to the `tb_supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `tb_supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observations` to the `tb_supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_supplier" DROP COLUMN "cidade",
DROP COLUMN "endereco",
DROP COLUMN "observacoes",
ADD COLUMN     "address" BOOLEAN NOT NULL,
ADD COLUMN     "city" BOOLEAN NOT NULL,
ADD COLUMN     "observations" BOOLEAN NOT NULL;
