CREATE DATABASE db_bank;

CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
);

CREATE TABLE profiles (
    id UUID PRIMARY KEY NOT NULL,
    user_id UUID NOT NULL,
    identity_type VARCHAR(50) NOT NULL,
    identity_number VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    bank_name VARCHAR(50) NOT NULL,
    bank_account_number VARCHAR(12) NOT NULL UNIQUE,
    balance FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE transactions (
    id UUID PRIMRAY KEY DEFAULT gen_random_uuid(),
    source_account_id UUID NOT NULL,
    destination_account_id UUID NOT NULL,
    amount FLOAT NOT NULL,
    FOREIGN KEY (source_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (destination_account_id) REFERENCES bank_accounts(id)
);