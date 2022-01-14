const { Transaction } = require("../../models");

const createTransaction = async (req, res) => {
  const { type, amount, category, subcategory, date } = req.body;
  const transaction = {
    type,
    amount,
    category,
    subcategory,
    date,
  };
  const newTransaction = await Transaction.create(transaction);
  res.status(201).json(newTransaction);
};

module.exports = createTransaction;
