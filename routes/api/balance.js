const express = require('express');

const { ctrlWrapper, authenticate } = require('../../middlewares');
const {
  getBalance,
  setBalance,
  firstSetBalance,
} = require('../../controllers');
const { validation } = require('../../middlewares');
const {
  auth: { joiBalanceSchema },
} = require('../../models');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(getBalance));
router.patch(
  '/',
  authenticate,
  validation(joiBalanceSchema),
  ctrlWrapper(setBalance),
);
router.patch('/firstSetBalance', authenticate, ctrlWrapper(firstSetBalance));

module.exports = router;
