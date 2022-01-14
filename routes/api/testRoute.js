const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../middlewares");

const { testList } = require("../../controllers");

router.get("/", ctrlWrapper(testList));

module.exports = router;
