const { NotFound } = require('http-errors');
const { auth } = require('../../models');
const { User } = auth;
const { normalizeSum } = require('../../helpers');

const getBalance = async (req, res) => {
  const { _id, balance } = req.user;
  const user = await User.find({ _id: _id });
  if (!user) {
    throw new NotFound(`User with ${_id} not found`);
  }

  const normalizedBalance = normalizeSum(balance);

  res.json({
    status: 'success',
    code: 200,
    data: {
      balance: normalizedBalance,
    },
  });
};

module.exports = getBalance;
