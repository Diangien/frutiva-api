/*
  Warnings:

  - You are about to drop the column `ativo` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `codigo_barras` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `dias_validade` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `foto_url` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `preco_compra` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `preco_venda` on the `tb_produts` table. All the data in the column will be lost.
  - You are about to drop the column `unidade_medida` on the `tb_produts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bar_code]` on the table `tb_produts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bar_code` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buying_price` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration_days` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tb_produts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selling_price` to the `tb_produts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UnitType" AS ENUM ('unit', 'kilo');

-- DropIndex
DROP INDEX "public"."tb_produts_codigo_barras_key";

-- AlterTable
ALTER TABLE "public"."tb_produts" DROP COLUMN "ativo",
DROP COLUMN "codigo_barras",
DROP COLUMN "descricao",
DROP COLUMN "dias_validade",
DROP COLUMN "foto_url",
DROP COLUMN "nome",
DROP COLUMN "preco_compra",
DROP COLUMN "preco_venda",
DROP COLUMN "unidade_medida",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bar_code" TEXT NOT NULL,
ADD COLUMN     "buying_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "expiration_days" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "picture_url" TEXT,
ADD COLUMN     "selling_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "unit_type" "public"."UnitType" NOT NULL DEFAULT 'unit';

-- DropEnum
DROP TYPE "public"."UnidadeMedida";

-- CreateIndex
CREATE UNIQUE INDEX "tb_produts_bar_code_key" ON "public"."tb_produts"("bar_code");
