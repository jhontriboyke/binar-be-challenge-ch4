const { Router } = require("express");
const validateTransferTransaction = require("../../middlewares/validations/transaction/transfer-validation.middleware");
const validateDepositTransaction = require("../../middlewares/validations/transaction/deposit-validation.middleware");
const validateWithdrawTransaction = require("../../middlewares/validations/transaction/withdraw-validation.middleware");
const { TransactionsController } =
  require("../../controllers/index").V1_CONTROLLER;

const router = Router();

// GET all transactions
router.get("/", TransactionsController.getAllTranscactions);

// GET a transaction by id
router.get("/:id", TransactionsController.getTransactionById);

// POST a transfer transaction
router.post(
  "/transfer",
  validateTransferTransaction,
  TransactionsController.createTransferTransaction
);

// POST a deposit transaction
router.post(
  "/deposit",
  validateDepositTransaction,
  TransactionsController.createDepositTransaction
);

// POST a withdraw transaction
router.post(
  "/withdraw",
  validateWithdrawTransaction,
  TransactionsController.createWithdrawTransaction
);

// PUT an transaction by id

// DELETE an transaction by id

module.exports = router;
