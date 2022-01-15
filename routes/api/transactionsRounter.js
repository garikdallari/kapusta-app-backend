const express = require('express');
const router = express.Router();

const {
  listTransactions,
  createTransaction,
  getAllByMonth,
  getAllByType,
} = require('../../controllers');
const { authenticate, ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(listTransactions));
router.post('/', authenticate, ctrlWrapper(createTransaction));
router.get('/getAllByMonth/:date', authenticate, ctrlWrapper(getAllByMonth));
router.get('/getAllByType/:type', authenticate, ctrlWrapper(getAllByType));

module.exports = router;
