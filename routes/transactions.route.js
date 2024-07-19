const pool = require("../db/index");
const { Router } = require("express");
const TransactionsController = require("../controllers/transcations.controller");

const router = Router();

router.get("/", TransactionsController.getAllTransactions);

router.get("/:id", TransactionsController.getTransactionById);

module.exports = router;
