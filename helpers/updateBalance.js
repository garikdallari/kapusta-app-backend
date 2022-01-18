const {
  auth: { User },
} = require('../models');

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
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { balance },
    { new: true },
  );
  return updatedUser.balance;
};

module.exports = updateBalance;
