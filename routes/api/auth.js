const express = require('express');

const { ctrlWrapper, validation, authenticate } = require('../../middlewares');
const { login, logout, current, register } = require('../../controllers');
const { auth } = require('../../models');
const { joiRegisterSchema, joiLoginSchema } = auth;

const router = express.Router();

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(register));

router.post('/login', validation(joiLoginSchema), ctrlWrapper(login));

router.get('/logout', authenticate, ctrlWrapper(logout));

router.get('/current', authenticate, ctrlWrapper(current));

module.exports = router;
