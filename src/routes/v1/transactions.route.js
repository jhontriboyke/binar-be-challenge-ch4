const { Router } = require("express");
const {
  validateUser,
  validateTransaction,
} = require("../../middlewares/validateInputs");
const { TransactionsController } =
  require("../../controllers/index").V1_CONTROLLER;

const router = Router();

router.get("/", TransactionsController.getAllTranscactions);

router.post("/", validateTransaction, TransactionsController.createTransaction);

module.exports = router;
