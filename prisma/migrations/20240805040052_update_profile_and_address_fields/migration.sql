/*
  Warnings:

  - Made the column `street` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `zip_code` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date_of_birth` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identity_type` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identity_number` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `occupation` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "zip_code" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "province" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "date_of_birth" SET NOT NULL,
ALTER COLUMN "date_of_birth" SET DATA TYPE DATE,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "identity_type" SET NOT NULL,
ALTER COLUMN "identity_number" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "occupation" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL;
