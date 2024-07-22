const { Router } = require("express");
const { TransactionsController } =
  require("../../../controllers/").V1_CONTROLLER;

const router = Router();

router.get("/", TransactionsController.getAllTransactions);

router.get("/:id", TransactionsController.getTransactionById);

module.exports = router;
