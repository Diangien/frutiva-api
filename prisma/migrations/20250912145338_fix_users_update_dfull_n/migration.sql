/*
  Warnings:

  - A unique constraint covering the columns `[full_name]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_users_full_name_key" ON "public"."tb_users"("full_name");
