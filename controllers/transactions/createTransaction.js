const { Transaction } = require('../../models');
const { updateBalance, removeLeadZeroString } = require('../../helpers');

const createTransaction = async (req, res) => {
  const { _id } = req.user;
  const { type, amount, category, subcategory, date } = req.body;

  const normalizedDate = {
    day: removeLeadZeroString(date.day),
    month: removeLeadZeroString(date.month),
    year: date.year,
  };

  const transaction = {
    type,
    amount,
    category,
    subcategory,
    date: normalizedDate,
  };

  const newTransaction = await Transaction.create({
    ...transaction,
    owner: _id,
  });

  const balance = await updateBalance(_id, amount, type);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: newTransaction,
    balance,
  });
};

module.exports = createTransaction;
