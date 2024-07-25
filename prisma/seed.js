const prisma = require("../config/prisma");

const account_types = [
  { name: "Basic", description: "This a basic account for everyone" },
  { name: "Premium", description: "For you to overcome everything" },
  { name: "Deluxe", description: "The best among the bests" },
];

async function init() {
  for (const type of account_types) {
    await prisma.account_Types.create({
      data: type,
    });
  }
}

init();
