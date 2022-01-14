const express = require("express");

const { ctrlWrapper, validation, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { auth } = require("../../models");
const { joiRegisterSchema, joiLoginSchema } = auth;

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
