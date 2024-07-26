const prisma = require("../config/prisma");

// Fixed data for Account_Types table
// Put data here to add more
const account_types = [
  { name: "Basic", description: "This a basic account for everyone" },
  { name: "Premium", description: "For you to overcome everything" },
  { name: "Deluxe", description: "The best among the bests" },
];

async function init() {
  const init_account_types = async () => {
    try {
      for (const type of account_types) {
        await prisma.account_Types.create({
          data: type,
        });
      }
      console.log("Account types initialized successfully.");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call the init_account_types function with await
  await init_account_types();
}

// Run the init function
init();
