const { Router } = require("express");
const router = Router();
const UserController = require("../controllers/users.controller");

// GET all users
router.get("/", UserController.getAllUsers);

// GET user by id
router.get("/:id", UserController.getUserById);

// POST user
router.post("/", UserController.createUser);

// DELETE user
router.delete("/:id", UserController.deleteUserById);

module.exports = router;
