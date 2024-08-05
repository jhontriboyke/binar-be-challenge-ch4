const prisma = require("../../../config/prisma");

class ProfileModel {
  async getProfileByUserId(user_id) {
    return await prisma.profile.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }

  async getProfileByIdentityNumber(identity_number) {
    return await prisma.profile.findUnique({
      where: {
        identity_number: identity_number,
      },
    });
  }

  async getProfileByPhoneNumber(phone_number) {
    return await prisma.profile.findUnique({
      where: {
        phone_number: phone_number,
      },
    });
  }
}

module.exports = new ProfileModel();
