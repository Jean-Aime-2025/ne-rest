/*
  Warnings:

  - You are about to drop the column `userId` on the `car_entries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "car_entries" DROP CONSTRAINT "car_entries_parkingCode_fkey";

-- DropForeignKey
ALTER TABLE "car_entries" DROP CONSTRAINT "car_entries_userId_fkey";

-- AlterTable
ALTER TABLE "car_entries" DROP COLUMN "userId";
