-- CreateEnum
CREATE TYPE "Identity_Type" AS ENUM ('KTP', 'KK', 'Passport');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "identity_type" "Identity_Type" NOT NULL,
    "identity_number" VARCHAR(16) NOT NULL,
    "phone_number" VARCHAR(16) NOT NULL,
    "nationality" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "village" TEXT,
    "postal_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account_Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Account_Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "number" VARCHAR(12) NOT NULL,
    "pin_number" VARCHAR(6) NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "bank_name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "account_type_id" INTEGER NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction_Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Transaction_Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "from_account_id" TEXT NOT NULL,
    "to_account_id" TEXT NOT NULL,
    "transaction_type_id" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_profile_id_key" ON "Address"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Types_id_key" ON "Account_Types"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_Types_name_key" ON "Account_Types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_number_key" ON "Accounts"("number");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_account_type_id_fkey" FOREIGN KEY ("account_type_id") REFERENCES "Account_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_transaction_type_id_fkey" FOREIGN KEY ("transaction_type_id") REFERENCES "Transaction_Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
