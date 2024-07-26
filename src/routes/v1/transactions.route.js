const { Router } = require("express");
const {
  validateUser,
  validateTransaction,
} = require("../../middlewares/validateInputs");
const { TransactionsController } =
  require("../../controllers/index").V1_CONTROLLER;

const router = Router();

// GET all transactions
router.get("/", TransactionsController.getAllTranscactions);

// GET an transaction by id
router.get("/:id", TransactionsController.getTransactionById);

// POSt an transaction
router.post("/", validateTransaction, TransactionsController.createTransaction);

// PUT an transaction by id

// DELETE an transaction by id

module.exports = router;
