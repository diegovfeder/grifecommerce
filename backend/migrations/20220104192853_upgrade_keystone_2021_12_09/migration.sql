/*
  Warnings:

  - Made the column `quantity` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "quantity" SET NOT NULL;
