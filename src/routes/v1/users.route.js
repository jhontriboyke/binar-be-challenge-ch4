const { Router } = require("express");
const { UserController } = require("../../controllers").V1_CONTROLLER;
const validateUser = require("../../middlewares/validations/user-validation.middleware");
const authenticateToken = require("../../middlewares/auths/authenticate-token.middleware");
const authorizeUser = require("../../middlewares/auths/authorize-user.middleware");
const Role = require("../../_helpers/role");

const router = Router();

/* GET all users */
router.get(
  "/",
  authenticateToken,
  authorizeUser(Role.Admin),
  UserController.getAllUsers
);

/* Get user by id */
router.get(
  "/:id",
  authenticateToken,
  authorizeUser([Role.User, Role.Admin]),
  UserController.getUserById
);

/* POST a new user */
router.post("/", validateUser, UserController.createUser);

/* PUT to update a user by id */
router.put(
  "/:id",
  validateUser,
  authenticateToken,
  authorizeUser(Role.User),
  UserController.updateUserById
);

/* DELETE an user by id */
router.delete(
  "/:id",
  authenticateToken,
  authorizeUser(Role.User),
  UserController.deleteUserById
);

/* PATCH: upgrade user role by id with SECRET_KEY from .env */
router.patch(
  "/:id/upgrade",
  authenticateToken,
  authorizeUser(Role.User),
  UserController.upgradeUserRoleById
);

module.exports = router;
