const {
  auth: { User },
} = require('../models');

const _id = '61e59aa01f2cc5f7a18be6eb';
const amount = 10.222;
const type = 'income';

const updateBalance = async (_id, amount, type) => {
  console.log(_id, amount, type);
  const user = await User.findOne({ _id });
  let balance = user.balance;
  if (type === 'income') {
    balance += amount;
  }
  if (type === 'expense') {
    balance -= amount;
  }
  balance = balance.toFixed(2);
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { balance },
    { new: true },
  );
  return updatedUser.balance;
};

module.exports = updateBalance;
