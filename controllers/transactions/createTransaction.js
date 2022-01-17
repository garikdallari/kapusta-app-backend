const { Transaction } = require('../../models');
const { updateBalance, removeLeadZeroString } = require('../../helpers');

const createTransaction = async (req, res) => {
  const { _id } = req.user;
  const { type, amount, category, subcategory, date } = req.body;

  const normalizeDate = {
    day: removeLeadZeroString(date.day),
    month: removeLeadZeroString(date.month),
    year: date.year,
  };

  const transaction = {
    type,
    amount,
    category,
    subcategory,
    date: normalizeDate,
  };

  const newTransaction = await Transaction.create({
    ...transaction,
    owner: _id,
  });

  await updateBalance(_id, amount, type);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: newTransaction,
  });
};

module.exports = createTransaction;
