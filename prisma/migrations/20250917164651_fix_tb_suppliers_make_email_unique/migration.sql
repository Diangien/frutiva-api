/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tb_supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_supplier_email_key" ON "public"."tb_supplier"("email");
