const prisma = require("../../../config/prisma");

class UserModel {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
      },
    });
  }

  async getUserById(user_id) {
    return await prisma.user.findUnique({
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
            phone_number: true,
            identity_type: true,
            identity_number: true,
            gender: true,
          },
        },
        addresses: {
          select: {
            street: true,
            village: true,
            zip_code: true,
            city: true,
            province: true,
            country: true,
          },
        },
      },
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        profile: true,
      },
    });
  }

  async createUser(user_obj, profile_obj, address_obj) {
    try {
      return await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: user_obj,
        });

        const profile = await prisma.profile.create({
          data: {
            ...profile_obj,
            user_id: user.id,
          },
        });

        const address = await prisma.address.create({
          data: {
            ...address_obj,
            user_id: user.id,
          },
        });

        return {
          user,
          profile,
          address,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  // async getUserById(user_id) {
  //   try {
  //     const result = await prisma.user.findUnique({
  //       where: {
  //         id: user_id,
  //       },
  //       select: {
  //         id: true,
  //         first_name: true,
  //         last_name: true,
  //         email: true,
  //         profile: {
  //           select: {
  //             id: true,
  //             identity_number: true,
  //             identity_type: true,
  //             nationality: true,
  //             phone_number: true,
  //             job: true,
  //           },
  //         },
  //         address: {
  //           select: {
  //             id: true,
  //             street: true,
  //             village: true,
  //             postal_code: true,
  //             city: true,
  //             province: true,
  //             country: true,
  //           },
  //         },
  //       },
  //     });

  //     if (!result) {
  //       throw new Error("User not found");
  //     }

  //     return result;
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // }

  async updateUser(user_id, user_obj, profile_obj, address_obj) {
    try {
      await prisma.$transaction(async (prisma) => {
        // User
        const user = await prisma.user.update({
          where: {
            id: user_id,
          },
          data: user_obj,
        });

        // Update profile and address table by user_id

        // Profile
        await prisma.profile.update({
          where: {
            user_id: user_id,
          },
          data: profile_obj,
        });

        const address = await prisma.address.findFirst({
          where: {
            user_id: user_id,
          },
        });

        // Address
        await prisma.address.update({
          where: {
            id: address.id,
          },
          data: address_obj,
        });
      });
      return await this.getUserById(user_id);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(user_id) {
    return await prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  }
}

module.exports = new UserModel();
