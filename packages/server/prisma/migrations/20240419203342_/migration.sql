/*
  Warnings:

  - You are about to drop the column `purchase_made` on the `UserSession` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "purchase_made";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "nationalIDNumber" TEXT,
    "nationality" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthRecord" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "weightInKg" DOUBLE PRECISION NOT NULL,
    "lengthInCm" DOUBLE PRECISION NOT NULL,
    "fatherId" INTEGER,
    "motherId" INTEGER,

    CONSTRAINT "BirthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BirthCertificate" (
    "id" SERIAL NOT NULL,
    "birthRecordId" INTEGER NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL,
    "registrationDistrict" TEXT NOT NULL,
    "informantId" INTEGER NOT NULL,
    "serialNumber" TEXT NOT NULL,

    CONSTRAINT "BirthCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BirthCertificate_birthRecordId_key" ON "BirthCertificate"("birthRecordId");

-- AddForeignKey
ALTER TABLE "BirthRecord" ADD CONSTRAINT "BirthRecord_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthRecord" ADD CONSTRAINT "BirthRecord_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthRecord" ADD CONSTRAINT "BirthRecord_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthCertificate" ADD CONSTRAINT "BirthCertificate_birthRecordId_fkey" FOREIGN KEY ("birthRecordId") REFERENCES "BirthRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BirthCertificate" ADD CONSTRAINT "BirthCertificate_informantId_fkey" FOREIGN KEY ("informantId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
