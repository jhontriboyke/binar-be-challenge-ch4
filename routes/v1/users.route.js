const { Router } = require("express");
const checkIfExistById = require("../../middlewares/checkIfExistsById");
const { validateUser } = require("../../middlewares/validateInputs");
const checkIfExistsAllRows = require("../../middlewares/checkIfExistsAllRows");

const { UserController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

// GET all users
router.get("/", checkIfExistsAllRows("users"), UserController.getAllUsers);

// GET user by id
router.get("/:id", checkIfExistById("users"), UserController.getUserById);

// POST user
router.post("/", validateUser, UserController.createUser);

// PUT user by id
router.put(
  "/:id",
  validateUser,
  checkIfExistById("users"),
  UserController.updateUserById
);

// DELETE user
router.delete("/:id", checkIfExistById("users"), UserController.deleteUserById);

module.exports = router;
