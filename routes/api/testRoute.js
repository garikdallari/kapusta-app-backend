const express = require("express");
const router = express.Router();

const { testList } = require("../../controllers");
const { ctrlWrapper } = require("../../middlewares");

router.get("/", ctrlWrapper(testList));

module.exports = router;
