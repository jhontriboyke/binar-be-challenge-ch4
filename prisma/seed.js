const prisma = require("../config/prisma");

// Fixed data for Account_Types table
// Put data here to add more
const account_types = [
  { name: "Basic", description: "This a basic account for everyone" },
  { name: "Premium", description: "For you to overcome everything" },
  { name: "Deluxe", description: "The best among the bests" },
];

const transaction_types = [
  { name: "Deposit" },
  { name: "Withdrawal" },
  { name: "Transfer" },
];

async function init() {
  for (const type of transaction_types) {
    await prisma.transaction_Types.create({
      data: type,
    });
  }
}

init();
