/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tb_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."tb_users_full_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_name_key" ON "public"."tb_users"("name");
