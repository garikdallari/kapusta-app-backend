const { Transaction, auth } = require('../../models');
const { User } = auth;
const { BadRequest } = require('http-errors');

const updateBalance = async (req, res) => {
  const { balance, _id } = req.user;
  const { amount, type } = req.body;

  let updatedBalance;
  switch (type) {
    case 'income':
      updatedBalance = balance + amount;
      break;
    case 'cost':
      updatedBalance = balance - amount;
      break;
    default:
      throw new BadRequest('Wrong transaction type');
  }

  const doc = await User.findOneAndUpdate(
    { _id: _id },
    { balance: updatedBalance },
  );

  res.json({
    status: 'success',
    code: 200,

    data: {
      _id,
      updatedBalance,
    },
  });
};

module.exports = updateBalance;
