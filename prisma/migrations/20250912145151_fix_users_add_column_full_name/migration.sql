/*
  Warnings:

  - Added the required column `full_name` to the `tb_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."tb_users" ADD COLUMN     "full_name" TEXT NOT NULL;
