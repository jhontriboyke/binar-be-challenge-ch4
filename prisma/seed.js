const prisma = require("../config/prisma");

const account_types = [
  { name: "Basic", description: "This a basic account for everyone" },
  { name: "Premium", description: "For you to overcome everything" },
  { name: "Deluxe", description: "The best among the bests" },
];

const valid_user_data = {
  email: "jhontri@mail.com",
  first_name: "jhontri",
  last_name: "boyke",
  password: "123456",
};

const create_complete_user = async () => {
  try {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: valid_user_data,
      });

      await prisma.profile.create({
        data: {},
      });
    });
  } catch (error) {}
};

const init_account_types = async () => {
  try {
    for (const type of account_types) {
      await prisma.account_Types.create({
        data: type,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

async function generateAdmin() {
  try {
    await prisma.user.create({
      data: {
        email: "admin@mail.com",
        first_name: "admin",
        last_name: "admin",
        password: "admin123",
        role: "Admin",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// Run functions
init_account_types();
generateAdmin();
