const {
  auth: { User },
} = require('../../models');
const { normalizeSum } = require('../../helpers');

const setBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;
  const newBalance = normalizeSum(balance);

  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { balance: newBalance },
    { new: true },
  );

  res.status(201).json({
    status: 'success',
    code: 201,
    balance: updatedUser.balance,
  });
};

module.exports = setBalance;
