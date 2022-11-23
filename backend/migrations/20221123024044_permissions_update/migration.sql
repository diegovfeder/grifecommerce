-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "canOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canReadProducts" BOOLEAN NOT NULL DEFAULT false;
