const prisma = require("../../../config/prisma");

class UserModel {
  async getAllUsers() {
    try {
      const result = await prisma.user.findMany();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUserById(user_id) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
        include: {
          profile: true,
        },
      });

      if (!result) {
        throw new Error("User not found");
      }

      const result_with_profile = {
        ...result,
        ...result.profile,
      };

      delete result_with_profile.profile;

      return {
        ...result_with_profile,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  async createUser(first_name, last_name, email, password) {
    try {
      const user = await prisma.user.create({
        data: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        },
      });

      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createProfile(
    user_id,
    identity_type,
    identity_number,
    phone_number,
    nationality,
    job
  ) {
    try {
      const profile = await prisma.profile.create({
        data: {
          user_id: user_id,
          identity_type: identity_type,
          identity_number: identity_number,
          phone_number: phone_number,
          nationality: nationality,
          job: job,
        },
      });

      return profile;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createAddress(
    profile_id,
    street,
    village,
    postal_code,
    city,
    province,
    country
  ) {
    try {
      const address = await prisma.address.create({
        data: {
          profile_id: profile_id,
          street: street,
          village: village,
          postal_code: postal_code,
          city: city,
          province: province,
          country: country,
        },
      });

      return address;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new UserModel();
