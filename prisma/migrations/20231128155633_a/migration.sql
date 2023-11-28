/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `bthumbnail` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `nbrand` on the `Product` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "bthumbnail",
DROP COLUMN "nbrand",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
