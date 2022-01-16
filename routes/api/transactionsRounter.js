const express = require('express');
const router = express.Router();

const {
  listTransactions,
  createTransaction,
  getAllByMonth,
  updateBalance,
  deleteTransaction,
} = require('../../controllers');
const { authenticate, ctrlWrapper, validation } = require('../../middlewares');
const { joiTransactionsSchema } = require('../../models');

router.get('/', ctrlWrapper(listTransactions));
router.post(
  '/',
  authenticate,
  validation(joiTransactionsSchema),
  ctrlWrapper(createTransaction),
);
router.get('/getAllByMonth/:date', authenticate, ctrlWrapper(getAllByMonth));
router.patch('/updateBalance', authenticate, ctrlWrapper(updateBalance));
router.delete('/:id', authenticate, ctrlWrapper(deleteTransaction));

module.exports = router;
