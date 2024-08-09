const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const account_types = [
  { id: 1, name: "Basic", description: "This a basic account for everyone" },
  { id: 2, name: "Premium", description: "For you to overcome everything" },
  { id: 3, name: "Deluxe", description: "The best among the bests" },
];

const valid_admin_data = {
  email: "admin@mail.com",
  first_name: "admin",
  last_name: "admin",
  password: "admin123",
  role: "Admin",
};

const valid_user_data = {
  email: "jhontriboyke@example.com",
  first_name: "Jhontri",
  last_name: "Boyke",
  password: "123456",
};

const valid_user_complete_data = {
  email: "janedoe@example.com",
  first_name: "Jane",
  last_name: "Doe",
  password: "123456",
  date_of_birth: new Date("2000-04-11").toISOString(),
  gender: "female",
  identity_type: "KTP",
  identity_number: "1234567842344478",
  phone_number: "081234554342",
  occupation: "Web Developer",
  nationality: "Indonesian",
  street: "Patih Rumbih",
  zip_code: "119021",
  city: "Jakarta",
  province: "DKI Jakarta",
  country: "Indonesia",
};

module.exports = {
  valid_user_data,
  valid_admin_data,
};

const init = async () => {
  await prisma.$transaction(async (prisma) => {
    // Account_Types
    for (const type of account_types) {
      await prisma.account_Types.create({
        data: type,
      });
    }

    // Admin
    await prisma.user.create({
      data: valid_admin_data,
    });

    // User
    const hashed_password1 = await bcrypt.hash(valid_user_data.password, 10);
    const user1 = await prisma.user.create({
      data: {
        ...valid_user_data,
        password: hashed_password1,
      },
    });

    await prisma.profile.create({
      data: {
        user_id: user1.id,
        date_of_birth: null,
        gender: null,
        identity_type: null,
        identity_number: null,
        phone_number: null,
        occupation: null,
      },
    });

    await prisma.address.create({
      data: {
        user_id: user1.id,
        street: null,
        village: null,
        zip_code: null,
        city: null,
        province: null,
        country: null,
      },
    });

    // Complete user
    const hashed_password2 = await bcrypt.hash(
      valid_user_complete_data.password,
      10
    );
    const user2 = await prisma.user.create({
      data: {
        email: valid_user_complete_data.email,
        first_name: valid_user_complete_data.first_name,
        last_name: valid_user_complete_data.last_name,
        password: hashed_password2,
      },
    });

    await prisma.profile.create({
      data: {
        user_id: user2.id,
        date_of_birth: valid_user_complete_data.date_of_birth,
        gender: valid_user_complete_data.gender,
        identity_type: valid_user_complete_data.identity_type,
        identity_number: valid_user_complete_data.identity_number,
        phone_number: valid_user_complete_data.phone_number,
        occupation: valid_user_complete_data.occupation,
      },
    });

    await prisma.address.create({
      data: {
        user_id: user2.id,
        street: valid_user_complete_data.street,
        village: null,
        zip_code: valid_user_complete_data.zip_code,
        city: valid_user_complete_data.city,
        province: valid_user_complete_data.province,
        country: valid_user_complete_data.country,
      },
    });

    await prisma.accounts.create({
      data: {
        account_type_id: 1,
        bank_name: "Binar",
        number: "112233445566",
        pin_number: "123123",
        balance: 100_000,
        user_id: user2.id,
      },
    });
  });
};

init();
