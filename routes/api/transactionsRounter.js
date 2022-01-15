const express = require('express');
const router = express.Router();

const {
  listTransactions,
  createTransaction,
  getAllByMonth,
  getMonthByPeriod,
} = require('../../controllers');
const { authenticate, ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(listTransactions));
router.post('/', authenticate, ctrlWrapper(createTransaction));
router.get('/getAllByMonth/:date', authenticate, ctrlWrapper(getAllByMonth));
router.get(
  '/getMonthByPeriod/:date',
  authenticate,
  ctrlWrapper(getMonthByPeriod),
);

module.exports = router;
