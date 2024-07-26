/*
  Warnings:

  - You are about to drop the column `destination_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `source_id` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_destination_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_source_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "destination_id",
DROP COLUMN "source_id",
ADD COLUMN     "from_account_number" TEXT,
ADD COLUMN     "to_account_number" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_from_account_number_fkey" FOREIGN KEY ("from_account_number") REFERENCES "Accounts"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_to_account_number_fkey" FOREIGN KEY ("to_account_number") REFERENCES "Accounts"("number") ON DELETE SET NULL ON UPDATE CASCADE;
