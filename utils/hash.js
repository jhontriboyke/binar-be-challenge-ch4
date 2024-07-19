const bcrypt = require("bcrypt");

const hashStr = async (str) => {
  let hashedStr = "";
  try {
    const salt = 10;
    hashedStr = await bcrypt.hash(str, salt);
  } catch (error) {
    throw new Error(error.message);
  } finally {
    return hashedStr;
  }
};

module.exports = hashStr;
