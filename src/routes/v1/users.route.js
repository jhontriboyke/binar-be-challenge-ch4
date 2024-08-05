const { Router } = require("express");
const { UserController } = require("../../controllers").V1_CONTROLLER;
const validateUser = require("../../middlewares/validations/user-validation.middleware");

const router = Router();

// Get all existing users
router.get("/", UserController.getAllUsers);

// Get an user by user_id
router.get("/:id", UserController.getUserById);

// Create a new user
router.post("/", validateUser, UserController.createUser);

// // PUT an user by id
// router.put(
//   "/:id",
//   validateUserProfileAndAddress,
//   UserController.updateUserById
// );

// // DELETE an user by id
// router.delete("/:id", UserController.deleteUserById);

module.exports = router;
