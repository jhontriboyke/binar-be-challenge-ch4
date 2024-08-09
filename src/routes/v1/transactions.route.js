const { Router } = require("express");
const validateTransferTransaction = require("../../middlewares/validations/transaction/transfer-validation.middleware");
const validateDepositTransaction = require("../../middlewares/validations/transaction/deposit-validation.middleware");
const validateWithdrawTransaction = require("../../middlewares/validations/transaction/withdraw-validation.middleware");
const authenticateToken = require("../../middlewares/auths/authenticate-token.middleware");
const authorizeUser = require("../../middlewares/auths/authorize-user.middleware");

const Role = require("../../_helpers/role");
const { TransactionsController } =
  require("../../controllers/index").V1_CONTROLLER;

const router = Router();

// GET all transactions
router.get(
  "/",
  authenticateToken,
  authorizeUser([Role.Admin, Role.User]),
  TransactionsController.getAllTranscactions
);

// GET a transaction by id
router.get(
  "/:id",
  authenticateToken,
  authorizeUser([Role.Admin, Role.User]),
  TransactionsController.getTransactionById
);

// POST a transfer transaction
router.post(
  "/transfer",
  authenticateToken,
  authorizeUser(Role.User),
  validateTransferTransaction,
  TransactionsController.createTransferTransaction
);

// POST a deposit transaction
router.post(
  "/deposit",
  authenticateToken,
  authorizeUser(Role.User),

  validateDepositTransaction,
  TransactionsController.createDepositTransaction
);

// POST a withdraw transaction
router.post(
  "/withdraw",
  authenticateToken,
  authorizeUser(Role.User),

  validateWithdrawTransaction,
  TransactionsController.createWithdrawTransaction
);

// PUT an transaction by id

// DELETE an transaction by id

module.exports = router;
