const express = require('express');

const { ctrlWrapper, validation, authenticate } = require('../../middlewares');
const { getBalance, setBalance } = require('../../controllers');
const { auth } = require('../../models');
const {} = auth;

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(getBalance));
router.patch('/', authenticate, ctrlWrapper(setBalance));

module.exports = router;
