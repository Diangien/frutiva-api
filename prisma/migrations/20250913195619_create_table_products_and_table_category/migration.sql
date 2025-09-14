-- CreateEnum
CREATE TYPE "public"."UnidadeMedida" AS ENUM ('unidade', 'kilo');

-- CreateTable
CREATE TABLE "public"."tb_produts" (
    "id" TEXT NOT NULL,
    "codigo_barras" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "unidade_medida" "public"."UnidadeMedida" NOT NULL DEFAULT 'unidade',
    "preco_venda" DECIMAL(65,30) NOT NULL,
    "preco_compra" DECIMAL(65,30) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "dias_validade" INTEGER NOT NULL,
    "foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "tb_produts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#ffffff3d',

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_produts_codigo_barras_key" ON "public"."tb_produts"("codigo_barras");

-- AddForeignKey
ALTER TABLE "public"."tb_produts" ADD CONSTRAINT "tb_produts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tb_produts" ADD CONSTRAINT "tb_produts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."tb_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
