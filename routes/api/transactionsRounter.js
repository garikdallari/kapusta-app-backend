const express = require('express');
const router = express.Router();

const {
  listTransactions,
  createTransaction,
  getAllByMonth,
  deleteTransaction,
} = require('../../controllers');
const { authenticate, ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(listTransactions));
router.post('/', authenticate, ctrlWrapper(createTransaction));
router.get('/getAllByMonth/:date', authenticate, ctrlWrapper(getAllByMonth));
router.delete('/:id', authenticate, ctrlWrapper(deleteTransaction));

module.exports = router;
