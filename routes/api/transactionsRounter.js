const express = require('express');
const router = express.Router();

const {
  createTransaction,
  getAllByMonth,
  getAllByType,
  deleteTransaction,
  getBalanceBy6Month,
  listAllTransactions,
} = require('../../controllers');
const { authenticate, ctrlWrapper, validation } = require('../../middlewares');
const { joiTransactionsSchema } = require('../../models');

router.post(
  '/',
  authenticate,
  validation(joiTransactionsSchema),
  ctrlWrapper(createTransaction),
);
router.get('/getAllByMonth/:date', authenticate, ctrlWrapper(getAllByMonth));
router.get('/getAllByType/:type', authenticate, ctrlWrapper(getAllByType));
router.delete('/:id', authenticate, ctrlWrapper(deleteTransaction));
router.get(
  '/getBalanceBy6Month/:type',
  authenticate,
  ctrlWrapper(getBalanceBy6Month),
);
router.get('/', authenticate, ctrlWrapper(listAllTransactions));

module.exports = router;
