/*
  Warnings:

  - The `privilege` column on the `tb_users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."UserPrivilege" AS ENUM ('admin', 'sales', 'stock');

-- AlterTable
ALTER TABLE "public"."tb_users" DROP COLUMN "privilege",
ADD COLUMN     "privilege" "public"."UserPrivilege" NOT NULL DEFAULT 'sales';
