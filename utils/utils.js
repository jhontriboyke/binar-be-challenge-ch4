const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const checkReqBodyInputs = (obj) => {
  for (const prop in obj) {
    if (obj[prop] === "" || obj[prop].length === 0) {
      throw new Error(`${prop} should not be empty`);
    }
  }
};

module.exports = {
  hashPassword,
  checkReqBodyInputs,
};
