const { Router } = require("express");
const checkIfExistById = require("../../middlewares/checkIfExistsById");
const { validateUser } = require("../../middlewares/validateInputs");
const checkIfExistsAllRows = require("../../middlewares/checkIfExistsAllRows");

const { UserController } = require("../../controllers").V1_CONTROLLER;

const router = Router();

// GET all users
router.get("/", UserController.getAllUsers);

// GET an user by id
router.get("/:id", UserController.getUserById);

// POST an user
router.post("/", validateUser, UserController.createUser);

// PUT
router.put("/:id", validateUser, UserController.updateUserById);

// DELETE
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
