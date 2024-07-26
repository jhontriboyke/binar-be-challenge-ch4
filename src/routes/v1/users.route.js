const { Router } = require("express");
const {
  validateUser,
  validateProfileAndAddress,
} = require("../../middlewares/validateInputs");

const { UserController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

// GET all users
router.get("/", UserController.getAllUsers);

// GET an user by id
router.get("/:id", UserController.getUserById);

// POST an user
router.post(
  "/",
  validateUser,
  validateProfileAndAddress,
  UserController.createUser
);

// PUT an user by id
router.put(
  "/:id",
  validateUser,
  validateProfileAndAddress,
  UserController.updateUserById
);

// DELETE an user by id
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
