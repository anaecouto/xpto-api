/*
  Warnings:

  - Added the required column `totalValue` to the `products_customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products_customers" ADD COLUMN     "totalValue" DOUBLE PRECISION NOT NULL;
