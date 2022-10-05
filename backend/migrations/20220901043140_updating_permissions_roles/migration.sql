-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "user" UUID;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "isAwesome" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Product_user_idx" ON "Product"("user");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
