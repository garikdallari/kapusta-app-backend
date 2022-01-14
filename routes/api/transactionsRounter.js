const express = require("express");
const router = express.Router();

const { listTransactions, createTransaction } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");

router.get("/", ctrlWrapper(listTransactions));
router.post("/", ctrlWrapper(createTransaction));

module.exports = router;
