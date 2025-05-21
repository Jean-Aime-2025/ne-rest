-- AlterTable
ALTER TABLE "car_entries" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "car_entries" ADD CONSTRAINT "car_entries_parkingCode_fkey" FOREIGN KEY ("parkingCode") REFERENCES "parkings"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_entries" ADD CONSTRAINT "car_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
