const express = require('express');
const router = express.Router();

const {
  listTransactions,
  createTransaction,
  getAllByMonth,
  updateBalance,
  getAllByType,
  deleteTransaction,
  getBalanceByMonth,

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
router.get('/getAllByType/:type', authenticate, ctrlWrapper(getAllByType));
router.delete('/:id', authenticate, ctrlWrapper(deleteTransaction));
router.get('/getBalanceByMonth/:type', authenticate, ctrlWrapper(getBalanceByMonth));

module.exports = router;
