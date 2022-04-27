/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `products_customers` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `products_customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_customers_customerId_key";

-- DropIndex
DROP INDEX "products_customers_productId_key";

-- AlterTable
ALTER TABLE "products_customers" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
