const { UnauthorizedError } = require("../../errors/customErrors");
const { UserModel } = require("../../models/v1");

const authorizeUser = (roles = []) => {
  return async (req, res, next) => {
    if (typeof roles === "string") {
      roles = [roles];
    }

    try {
      // Check if req.user.role match with user.role by req.user.id from database
      const userFromDatabase = await UserModel.getUserById(req.user.id);

      // Check if user.role from database match with role parameter
      if (!roles.includes(userFromDatabase.role)) {
        throw new UnauthorizedError(
          "You do not have permission to access this resource"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/*
const authorizeUser = async (req, res, next) => {
  try {
    // Check if token payload not include user id
    const user_id_from_token = req.user.id;

    if (!user_id_from_token) {
      throw new UnauthorizedError("Invalid payload");
    }

    const user_id_from_param = req.params.id;

    // Check if user id from param valid
    const isUserExist = await UserServices.getUserById(user_id_from_param);

    if (!isUserExist) {
      throw error;
    }

    // Check if user id matches
    if (user_id_from_token !== user_id_from_param) {
      throw new UnauthorizedError(
        "You do not have permission to access this resource",
        null
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
*/

module.exports = authorizeUser;
