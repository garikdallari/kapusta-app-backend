const { Transaction } = require('../../models');

const createTransaction = async (req, res) => {
  const { _id } = req.user;
  const { type, amount, category, subcategory, date } = req.body;
  const transaction = {
    type,
    amount,
    category,
    subcategory,
    date,
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
