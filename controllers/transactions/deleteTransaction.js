const {
  Transaction,
  auth: { User },
} = require('../../models');
const { NotFound } = require('http-errors');

const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  const result = await Transaction.findByIdAndRemove({ _id: id });
  if (!result) {
    throw new NotFound(`Transaction not found`);
  }
  const { type, amount, owner } = result;

  const user = await User.findOne({ _id: owner });

  if (type === 'income') {
    const balance = user.balance - amount;
    await User.findOneAndUpdate({ _id: owner }, { balance });
  }
  if (type === 'expense') {
    const balance = user.balance + amount;
    await User.findOneAndUpdate({ _id: owner }, { balance });
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'transaction deleted',
    result,
  });
};

module.exports = deleteTransaction;
