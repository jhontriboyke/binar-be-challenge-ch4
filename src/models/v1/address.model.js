const prisma = require("../../../config/prisma");

class AddressModel {
  async getAddressByUserId(user_id) {
    return await prisma.address.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }

  async createAddress(user_id, address_obj) {
    return await prisma.address.create({
      data: {
        ...address_obj,
        user_id: user_id,
      },
    });
  }
}

module.exports = new AddressModel();
