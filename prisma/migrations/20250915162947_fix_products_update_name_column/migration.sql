/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tb_produts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_produts_name_key" ON "public"."tb_produts"("name");
