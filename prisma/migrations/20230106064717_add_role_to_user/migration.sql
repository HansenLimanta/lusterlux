/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Guestbook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CartItem_productId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Guestbook";
