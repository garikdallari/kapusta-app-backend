const { Transaction } = require('../../models');
const {
  updateBalance,
  removeLeadZeroString,
  normalizeSum,
} = require('../../helpers');

const createTransaction = async (req, res) => {
  const { _id } = req.user;
  const { type, amount, category, subcategory, date } = req.body;

  const normalizedDate = {
    day: removeLeadZeroString(date.day),
    month: removeLeadZeroString(date.month),
    year: date.year,
  };

  const normalizedAmount = normalizeSum(amount);

  const balance = await updateBalance(_id, normalizedAmount, type);

  const transaction = {
    type,
    amount: normalizedAmount,
    category,
    subcategory,
    balance,
    date: normalizedDate,
  };

  const newTransaction = await Transaction.create({
    ...transaction,
    owner: _id,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: newTransaction,
  });
};

module.exports = createTransaction;
