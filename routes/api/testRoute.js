const express = require("express");
const router = express.Router();

const { testList } = require("../../controllers");

router.get("/", testList);

module.exports = router;
