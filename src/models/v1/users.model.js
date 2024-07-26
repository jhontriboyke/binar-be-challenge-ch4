const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const prisma = require("../../../config/prisma");

class UserModel {
  async getAllUsers() {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserById(user_id) {
    try {
      const result = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          profile: {
            select: {
              id: true,
              identity_type: true,
              identity_number: true,
              phone_number: true,
              job: true,
              nationality: true,
              address: {
                select: {
                  id: true,
                  street: true,
                  village: true,
                  postal_code: true,
                  city: true,
                  province: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      if (!result) {
        throw new Error("User not found");
      }

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async createUserProfileAddress(user_obj, profile_obj, address_obj) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: user_obj,
        });

        const profile = await prisma.profile.create({
          data: {
            user_id: user.id,
            ...profile_obj,
          },
        });

        const address = await prisma.address.create({
          data: {
            profile_id: profile.id,
            ...address_obj,
          },
        });

        return {
          user: user,
          profile: profile,
          address: address,
        };
      });

      return result;
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
      return error;
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
      return error;
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
      return error;
    }
  }

  async updateUser(user_id, user_obj, profile_obj, address_obj) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        let updated_user = await prisma.user.update({
          where: {
            id: user_id,
          },
          data: user_obj,
        });

        // Check if user have profile
        let profile = await prisma.profile.findUnique({
          where: {
            user_id: user_id,
          },
        });

        // Update profile and address table by id if profile exist
        // or
        // Create new profile and new address if profile doesn't exist
        let updated_profile;
        let updated_address;
        if (profile) {
          updated_profile = await prisma.profile.update({
            where: {
              user_id: user_id,
            },
            data: profile_obj,
          });

          updated_address = await prisma.address.update({
            where: {
              profile_id: updated_profile.id,
            },
            data: address_obj,
          });
        } else {
          updated_profile = await prisma.profile.create({
            data: {
              ...profile_obj,
              user: {
                connect: { id: user_id },
              },
            },
          });

          updated_address = await prisma.address.create({
            data: {
              ...address_obj,
              profile: {
                connect: { id: updated_profile.id },
              },
            },
          });
        }

        return {
          user: updated_user,
          profile: updated_profile,
          address: updated_address,
        };
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteUser(user_id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const user_accounts = await prisma.accounts.count({
        where: {
          user_id: user_id,
        },
      });

      if (user_accounts) {
        throw new Error("You must delete your account(s) first");
      }

      const result = await prisma.user.delete({
        where: {
          id: user_id,
        },
      });

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = new UserModel();
