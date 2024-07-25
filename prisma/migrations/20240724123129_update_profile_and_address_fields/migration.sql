/*
  Warnings:

  - A unique constraint covering the columns `[identity_number]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone_number]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_identity_number_key" ON "Profile"("identity_number");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phone_number_key" ON "Profile"("phone_number");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
