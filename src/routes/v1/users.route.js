const { Router } = require("express");
const { UserController } = require("../../controllers").V1_CONTROLLER;
const validateUser = require("../../middlewares/validations/user-validation.middleware");

const router = Router();

/* GET all users */
router.get("/", UserController.getAllUsers);

/* Get user by id */
router.get("/:id", UserController.getUserById);

/* POST a new user */
router.post("/", validateUser, UserController.createUser);

/* PUT to update a user by id */
router.put("/:id", validateUser, UserController.updateUserById);

/* DELETE an user by id */
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
