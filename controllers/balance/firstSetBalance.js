const {
  auth: { User },
} = require('../../models');

const firstSetBalance = async (req, res, next) => {
  const { _id } = req.user;

  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { isBalanceSet: true },
    { new: true },
  );

  res.status(201).json({
    status: 'success',
    code: 201,
    balance: updatedUser,
  });
};

module.exports = firstSetBalance;
