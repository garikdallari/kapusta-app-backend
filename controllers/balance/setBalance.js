const {
  auth: { User },
} = require('../../models');

const setBalance = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;
  const newBalance = balance.toFixed(2);

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
