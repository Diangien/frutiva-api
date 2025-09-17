-- AlterTable
ALTER TABLE "public"."tb_supplier" ALTER COLUMN "observations" DROP NOT NULL,
ALTER COLUMN "observations" SET DATA TYPE TEXT;
